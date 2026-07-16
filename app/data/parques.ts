export const EMPRESAS = [
  {
    id: 'terra-regia',
    nombre: 'TERRA REGIA',
    descripcion: 'Parques industriales premium con ubicaciones estratégicas',
    parques: [
      {
        id: 'terra-park-garcia-ii',
        nombre: 'TERRA PARK GARCIA II',
        ubicacion: 'Monterrey, Nuevo León',
        lotes: 35,
        precioMin: 2000000,
        precioMax: 5000000
      },
      {
        id: 'terrapark-salinas-i',
        nombre: 'TERRAPARK SALINAS I',
        ubicacion: 'Salinas, Nuevo León',
        lotes: 28,
        precioMin: 1800000,
        precioMax: 4500000
      },
      {
        id: 'terrapark-salinas-ii',
        nombre: 'TERRAPARK SALINAS II',
        ubicacion: 'Salinas, Nuevo León',
        lotes: 22,
        precioMin: 2200000,
        precioMax: 4800000
      },
      {
        id: 'condesa-iii',
        nombre: 'CONDESA III',
        ubicacion: 'Monterrey, Nuevo León',
        lotes: 18,
        precioMin: 2400000,
        precioMax: 5200000
      },
      {
        id: 'condesa-i',
        nombre: 'CONDESA I',
        ubicacion: 'Monterrey, Nuevo León',
        lotes: 15,
        precioMin: 2600000,
        precioMax: 5500000
      }
    ]
  },
  {
    id: 'ibp-interra',
    nombre: 'IBP-INTERRA',
    descripcion: 'Parques industriales con infraestructura moderna',
    parques: [
      {
        id: 'ibp-400',
        nombre: 'IBP-400',
        ubicacion: 'Santa Catarina, Nuevo León',
        lotes: 32,
        precioMin: 1600000,
        precioMax: 4200000
      },
      {
        id: 'ibp-salinas-i',
        nombre: 'IBP SALINAS I',
        ubicacion: 'Salinas, Nuevo León',
        lotes: 26,
        precioMin: 1700000,
        precioMax: 3800000
      },
      {
        id: 'ibp-salinas-ii',
        nombre: 'IBP SALINAS II',
        ubicacion: 'Salinas, Nuevo León',
        lotes: 24,
        precioMin: 1900000,
        precioMax: 4100000
      }
    ]
  },
  {
    id: 'el-palmar',
    nombre: 'EL PALMAR',
    descripcion: 'Parques industriales de clase mundial',
    parques: [
      {
        id: 'el-palmar-ii',
        nombre: 'EL PALMAR II',
        ubicacion: 'Santa Catarina, Nuevo León',
        lotes: 34,
        precioMin: 2000000,
        precioMax: 5100000
      }
    ]
  }
]

export const RANGOS_PRECIOS = [
  { label: 'Cualquiera', min: 0, max: Infinity },
  { label: '$1M - $2M', min: 1000000, max: 2000000 },
  { label: '$2M - $3M', min: 2000000, max: 3000000 },
  { label: '$3M - $4M', min: 3000000, max: 4000000 },
  { label: '$4M - $5M', min: 4000000, max: 5000000 },
  { label: '$5M+', min: 5000000, max: Infinity }
]
