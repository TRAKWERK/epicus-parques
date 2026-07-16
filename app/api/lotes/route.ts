import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const parque_id = searchParams.get('parque_id')
    const estado = searchParams.get('estado')
    const limit = parseInt(searchParams.get('limit') || '100', 10)

    let query = supabase
      .from('lotes')
      .select('*', { count: 'exact' })

    if (parque_id) {
      query = query.eq('parque_id', parque_id)
    }
    if (estado) {
      query = query.eq('estado_lote', estado)
    }

    const { data, error, count } = await query
      .order('numero_lote', { ascending: true })
      .limit(limit)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data, total: count }, { status: 200 })
  } catch (error) {
    console.error('GET /api/lotes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { parque_id, numero_lote, area_m2, precio_unitario, estado_lote } = body

    if (!parque_id || !numero_lote || !area_m2 || !precio_unitario) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('lotes')
      .insert([{
        parque_id,
        numero_lote,
        area_m2: parseFloat(area_m2),
        precio_unitario: parseFloat(precio_unitario),
        estado_lote: estado_lote || 'disponible',
        frente_metros: body.frente_metros || null,
        fondo_metros: body.fondo_metros || null,
        caracteristicas: body.caracteristicas || {},
      }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('POST /api/lotes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
