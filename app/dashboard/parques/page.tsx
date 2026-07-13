'use client'

import Link from 'next/link'

const PARQUES = [
  {
    id: 'epicus',
    nombre: 'EPICUS INDUSTRIAL',
    ubicacion: 'Monterrey, Nuevo León',
    total: 45,
    disponibles: 12,
    vendidos: 28,
    separados: 5,
    precioMin: 1800000,
    precioMax: 8500000,
    tamaño: '45 hectáreas',
    servicios: ['Seguridad 24/7', 'Acceso de carga', 'Agua y drenaje', 'Energía trifásica'],
    descripcion: 'Parque industrial moderno con infraestructura completa y ubicación estratégica'
  },
  {
    id: 'terra-regia',
    nombre: 'TERRA REGIA',
    ubicacion: 'Salinas, Nuevo León',
    total: 58,
    disponibles: 28,
    vendidos: 25,
    separados: 5,
    precioMin: 2200000,
    precioMax: 12000000,
    tamaño: '58 hectáreas',
    servicios: ['Seguridad electrónica', 'Áreas verdes', 'Agua potable', 'Fibra óptica'],
    descripcion: 'Desarrollo inmobiliario industrial premium con servicios de clase mundial'
  },
  {
    id: 'palmar-ii',
    nombre: 'PALMAR II',
    ubicacion: 'Monterrey, Nuevo León',
    total: 34,
    disponibles: 15,
    vendidos: 16,
    separados: 3,
    precioMin: 2000000,
    precioMax: 10500000,
    tamaño: '34 hectáreas',
    servicios: ['Acceso principal', 'Drenaje sanitario', 'Caseta de vigilancia', 'Vías de acceso pavimentadas'],
    descripcion: 'Parque consolidado con excelente accesibilidad a principales vías'
  }
]

export default function ParquesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Parques Industriales</h1>
        <p className="text-gray-600">Descubre nuestros 3 parques industriales premium</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PARQUES.map((parque) => (
          <Link key={parque.id} href={`/dashboard/parques/${parque.id}`}>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden cursor-pointer transform hover:scale-105">
              {/* Header color */}
              <div className="h-24 bg-gradient-to-r from-orange-500 to-blue-600"></div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{parque.nombre}</h2>
                <p className="text-gray-600 text-sm mb-4">📍 {parque.ubicacion}</p>

                {/* Estadísticas */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-blue-50 rounded p-3">
                    <div className="text-xs text-gray-600">Total</div>
                    <div className="text-2xl font-bold text-blue-600">{parque.total}</div>
                  </div>
                  <div className="bg-green-50 rounded p-3">
                    <div className="text-xs text-gray-600">Disponibles</div>
                    <div className="text-2xl font-bold text-green-600">{parque.disponibles}</div>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{parque.descripcion}</p>

                {/* Servicios */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Servicios:</p>
                  <div className="flex flex-wrap gap-2">
                    {parque.servicios.slice(0, 2).map((s, i) => (
                      <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Precio */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Rango de precios:</p>
                  <p className="text-lg font-bold text-orange-600">
                    ${(parque.precioMin / 1000000).toFixed(1)}M - ${(parque.precioMax / 1000000).toFixed(1)}M
                  </p>
                </div>

                <button className="w-full mt-4 bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition">
                  Ver ficha completa →
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
