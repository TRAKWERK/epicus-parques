export interface Parque {
  id: string
  nombre: string
  ubicacion: string
  total_lotes: number
  lotes_disponibles: number
  lotes_vendidos: number
  lotes_separados: number
  precio_min: number
  precio_max: number
  created_at: string
}

export interface Lote {
  id: string
  parque_id: string
  numero: string
  metros: number
  precio_por_metro: number
  precio_total: number
  estado: 'disponible' | 'vendido' | 'separado'
  created_at: string
}

export interface Usuario {
  id: string
  email: string
  nombre: string
  telefono?: string
  created_at: string
}
