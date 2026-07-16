import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Validate UUID format
 */
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * GET /api/parques/[id]
 * Returns specific parque with all lotes
 */
export async function GET(
  request: NextRequest,
  context: any
) {
  try {
    const { id } = context.params;

    // Validate UUID format
    if (!isValidUUID(id)) {
      return NextResponse.json(
        { error: 'Invalid parque ID format' },
        { status: 400 }
      );
    }

    // Fetch parque by ID
    const { data: parque, error } = await supabase
      .from('parques')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return NextResponse.json(
          { error: 'Parque not found' },
          { status: 404 }
        );
      }
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch parque' },
        { status: 500 }
      );
    }

    // Fetch lotes for this parque
    const { data: lotes, error: lotesError } = await supabase
      .from('lotes')
      .select('*')
      .eq('parque_id', id)
      .order('numero', { ascending: true });

    if (lotesError) {
      console.error('Supabase lotes error:', lotesError);
      return NextResponse.json(
        { error: 'Failed to fetch lotes' },
        { status: 500 }
      );
    }

    // Validate response
    if (!parque) {
      return NextResponse.json(
        { error: 'Invalid response format' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...parque,
        lotes: Array.isArray(lotes) ? lotes : [],
        lotes_count: Array.isArray(lotes) ? lotes.length : 0,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('GET /api/parques/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/parques/[id]
 * Update parque (admin only)
 */
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // Validate UUID format
    if (!isValidUUID(id)) {
      return NextResponse.json(
        { error: 'Invalid parque ID format' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Check if parque exists
    const { data: existingParque, error: checkError } = await supabase
      .from('parques')
      .select('id')
      .eq('id', id)
      .single();

    if (checkError) {
      if (checkError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Parque not found' },
          { status: 404 }
        );
      }
      console.error('Supabase check error:', checkError);
      return NextResponse.json(
        { error: 'Failed to verify parque' },
        { status: 500 }
      );
    }

    // Prepare update data (only allow specific fields)
    const allowedFields = ['nombre', 'ubicacion', 'estado', 'descripcion', 'lotes_totales', 'lotes_disponibles'];
    const updateData: Record<string, any> = {};

    for (const field of allowedFields) {
      if (field in body) {
        if (field === 'nombre' || field === 'ubicacion' || field === 'estado' || field === 'descripcion') {
          updateData[field] = body[field]?.trim() || null;
        } else {
          updateData[field] = body[field];
        }
      }
    }

    // Validate data types
    if (updateData.nombre && typeof updateData.nombre !== 'string') {
      return NextResponse.json(
        { error: 'Invalid nombre type' },
        { status: 400 }
      );
    }

    if (updateData.lotes_totales && typeof updateData.lotes_totales !== 'number') {
      return NextResponse.json(
        { error: 'Invalid lotes_totales type' },
        { status: 400 }
      );
    }

    if (updateData.lotes_disponibles && typeof updateData.lotes_disponibles !== 'number') {
      return NextResponse.json(
        { error: 'Invalid lotes_disponibles type' },
        { status: 400 }
      );
    }

    // Add update timestamp
    updateData.updated_at = new Date().toISOString();
    updateData.updated_by = auth.sub;

    // Update parque
    const { data: updatedParque, error: updateError } = await supabase
      .from('parques')
      .update(updateData)
      .eq('id', id)
      .select();

    if (updateError) {
      console.error('Supabase update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update parque' },
        { status: 500 }
      );
    }

    // Validate response
    if (!Array.isArray(updatedParque) || updatedParque.length === 0) {
      return NextResponse.json(
        { error: 'Invalid response format' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Parque updated successfully',
      data: updatedParque[0],
    }, { status: 200 });

  } catch (error) {
    console.error('PUT /api/parques/[id] error:', error);

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
 * DELETE /api/parques/[id]
 * Delete parque (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: ParqueParams
) {
  try {
    // Verify authentication
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check admin role
    if (auth.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const { id } = params;

    // Validate UUID format
    if (!isValidUUID(id)) {
      return NextResponse.json(
        { error: 'Invalid parque ID format' },
        { status: 400 }
      );
    }

    // Check if parque exists
    const { data: existingParque, error: checkError } = await supabase
      .from('parques')
      .select('id')
      .eq('id', id)
      .single();

    if (checkError) {
      if (checkError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Parque not found' },
          { status: 404 }
        );
      }
      console.error('Supabase check error:', checkError);
      return NextResponse.json(
        { error: 'Failed to verify parque' },
        { status: 500 }
      );
    }

    // Check if parque has lotes
    const { data: lotesCount, error: lotesCheckError } = await supabase
      .from('lotes')
      .select('id', { count: 'exact', head: true })
      .eq('parque_id', id);

    if (lotesCheckError) {
      console.error('Supabase lotes check error:', lotesCheckError);
      return NextResponse.json(
        { error: 'Failed to verify lotes' },
        { status: 500 }
      );
    }

    if (lotesCount && lotesCount.length > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete parque with existing lotes. Delete all lotes first.',
          lotes_count: lotesCount.length,
        },
        { status: 409 }
      );
    }

    // Delete parque
    const { error: deleteError } = await supabase
      .from('parques')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Supabase delete error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete parque' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Parque deleted successfully',
      deleted_id: id,
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE /api/parques/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
