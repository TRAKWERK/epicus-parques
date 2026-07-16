import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('parques')
      .select('*')
      .order('nombre', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('GET /api/parques:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, descripcion, ciudad, estado, direccion, total_lotes, area_total_m2 } = body

    if (!nombre || !ciudad || !estado) {
      return NextResponse.json(
        { error: 'Missing required fields: nombre, ciudad, estado' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('parques')
      .insert([{
        nombre,
        descripcion: descripcion || null,
        ciudad,
        estado: estado,
        direccion: direccion || null,
        total_lotes: total_lotes || 0,
        area_total_m2: area_total_m2 || 0,
        tipo_parque: 'industrial',
        estado_parque: 'activo'
      }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('POST /api/parques:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
