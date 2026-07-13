export interface Parque {
  id: string
  nombre: string
  ubicacion: string
  total: number
  disponibles: number
  vendidos: number
  separados: number
  precioMin: number
  precioMax: number
  tamaño: number
  servicios: string[]
  descripcion: string
  coordLatitude: number
  coordLongitude: number
  created_at?: string
}

export interface Lote {
  id: string
  parque_id: string
  numero: string
  metros: number
  precio: number
  estado: 'disponible' | 'vendido' | 'separado'
  contacto?: string
  telefono?: string
  created_at?: string
}

export interface Consulta {
  id: string
  nombre: string
  email: string
  telefono: string
  parque_id?: string
  mensaje: string
  respondida: boolean
  respuesta?: string
  created_at?: string
}

export interface Reporte {
  id: string
  tipo: string
  datos: Record<string, any>
  created_at?: string
}

export interface ArchivosGaleria {
  id: string
  nombre: string
  url: string
  tipo: string
  parque_id?: string
  created_at?: string
}

export interface ConfiguracionSitio {
  id: string
  clave: string
  valor: string
  updated_at?: string
}
