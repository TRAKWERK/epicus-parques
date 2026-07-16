import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Validate UUID format
 */
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * GET /api/lotes/[id]
 * Returns specific lote with all details
 */
export async function GET(
  request: NextRequest,
  context: any
) {
  try {
    const { id } = await context.params;

    // Validate UUID format
    if (!isValidUUID(id)) {
      return NextResponse.json(
        { error: 'Invalid lote ID format' },
        { status: 400 }
      );
    }

    // Fetch lote by ID
    const { data: lote, error } = await supabase
      .from('lotes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return NextResponse.json(
          { error: 'Lote not found' },
          { status: 404 }
        );
      }
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch lote' },
        { status: 500 }
      );
    }

    // Fetch associated parque details
    const { data: parque, error: parqueError } = await supabase
      .from('parques')
      .select('id, nombre, ubicacion')
      .eq('id', lote.parque_id)
      .single();

    if (parqueError) {
      console.error('Supabase parque error:', parqueError);
      // Continue without parque details
    }

    // Validate response
    if (!lote) {
      return NextResponse.json(
        { error: 'Invalid response format' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...lote,
        parque: parque || null,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('GET /api/lotes/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/lotes/[id]
 * Update lote (admin only)
 * Body params (all optional):
 * - numero: string/number
 * - estado: string (one of: disponible, vendido, reservado, separado)
 * - precio: number
 * - area: number
 * - descripcion: string
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Validate UUID format
    if (!isValidUUID(id)) {
      return NextResponse.json(
        { error: 'Invalid lote ID format' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Check if lote exists
    const { data: existingLote, error: checkError } = await supabase
      .from('lotes')
      .select('id, parque_id, numero')
      .eq('id', id)
      .single();

    if (checkError) {
      if (checkError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Lote not found' },
          { status: 404 }
        );
      }
      console.error('Supabase check error:', checkError);
      return NextResponse.json(
        { error: 'Failed to verify lote' },
        { status: 500 }
      );
    }

    // Prepare update data (only allow specific fields)
    const allowedFields = ['numero', 'estado', 'precio', 'area', 'descripcion'];
    const updateData: Record<string, any> = {};

    for (const field of allowedFields) {
      if (field in body && body[field] !== null && body[field] !== '') {
        if (field === 'numero') {
          updateData[field] = String(body[field]).trim();
        } else if (field === 'estado') {
          updateData[field] = body[field].toLowerCase();
        } else if (field === 'descripcion') {
          updateData[field] = body[field].trim();
        } else {
          updateData[field] = body[field];
        }
      }
    }

    // If no fields to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    // Validate estado if being updated
    if ('estado' in updateData) {
      const validStates = ['disponible', 'vendido', 'reservado', 'separado'];
      if (!validStates.includes(updateData.estado)) {
        return NextResponse.json(
          { error: `Invalid estado. Must be one of: ${validStates.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Validate precio if being updated
    if ('precio' in updateData && (typeof updateData.precio !== 'number' || updateData.precio < 0)) {
      return NextResponse.json(
        { error: 'Invalid precio (must be a positive number)' },
        { status: 400 }
      );
    }

    // Validate area if being updated
    if ('area' in updateData && (typeof updateData.area !== 'number' || updateData.area < 0)) {
      return NextResponse.json(
        { error: 'Invalid area (must be a positive number)' },
        { status: 400 }
      );
    }

    // Validate numero is unique within same parque if being updated
    if ('numero' in updateData && updateData.numero !== existingLote.numero) {
      const { data: duplicateLote } = await supabase
        .from('lotes')
        .select('id')
        .eq('parque_id', existingLote.parque_id)
        .eq('numero', updateData.numero)
        .neq('id', id)
        .single();

      if (duplicateLote) {
        return NextResponse.json(
          { error: 'Lote with this number already exists in this parque' },
          { status: 409 }
        );
      }
    }

    // Add update timestamp
    updateData.updated_at = new Date().toISOString();

    // Update lote
    const { data: updatedLote, error: updateError } = await supabase
      .from('lotes')
      .update(updateData)
      .eq('id', id)
      .select();

    if (updateError) {
      console.error('Supabase update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update lote' },
        { status: 500 }
      );
    }

    // Validate response
    if (!Array.isArray(updatedLote) || updatedLote.length === 0) {
      return NextResponse.json(
        { error: 'Invalid response format' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lote updated successfully',
      data: updatedLote[0],
    }, { status: 200 });

  } catch (error) {
    console.error('PUT /api/lotes/[id] error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/lotes/[id]
 * Delete lote (admin only)
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Validate UUID format
    if (!isValidUUID(id)) {
      return NextResponse.json(
        { error: 'Invalid lote ID format' },
        { status: 400 }
      );
    }

    // Check if lote exists
    const { data: existingLote, error: checkError } = await supabase
      .from('lotes')
      .select('id, numero, parque_id')
      .eq('id', id)
      .single();

    if (checkError) {
      if (checkError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Lote not found' },
          { status: 404 }
        );
      }
      console.error('Supabase check error:', checkError);
      return NextResponse.json(
        { error: 'Failed to verify lote' },
        { status: 500 }
      );
    }

    // Delete lote
    const { error: deleteError } = await supabase
      .from('lotes')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Supabase delete error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete lote' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lote deleted successfully',
      deleted_id: id,
      deleted_numero: existingLote.numero,
      parque_id: existingLote.parque_id,
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE /api/lotes/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
