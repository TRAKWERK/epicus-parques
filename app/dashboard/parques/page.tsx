'use client'

const PARQUES = [
  {
    nombre: 'Terra Park Condesa',
    ubicacion: 'Monterrey, MTY',
    total: 91,
    disponibles: 4,
    vendidos: 86,
    separados: 1,
    precioMin: 3400,
    precioMax: 5500,
  },
  {
    nombre: 'Terra Park García II',
    ubicacion: 'García, MTY',
    total: 88,
    disponibles: 46,
    vendidos: 0,
    separados: 0,
    precioMin: 4800,
    precioMax: 5100,
  },
  {
    nombre: 'Terra Park Salinas',
    ubicacion: 'Salinas, MTY',
    total: 8,
    disponibles: 6,
    vendidos: 1,
    separados: 1,
    precioMin: 2000,
    precioMax: 3350,
  },
  {
    nombre: 'Terra Park Santa Catarina III',
    ubicacion: 'Santa Catarina, MTY',
    total: 2,
    disponibles: 2,
    vendidos: 0,
    separados: 0,
    precioMin: 5200,
    precioMax: 5400,
  },
  {
    nombre: 'Terra Park Santa Catarina IV',
    ubicacion: 'Santa Catarina, MTY',
    total: 2,
    disponibles: 2,
    vendidos: 0,
    separados: 0,
    precioMin: 5600,
    precioMax: 11000,
  },
]

export default function ParquesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🗺️ TERRA PARK - Parques Disponibles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PARQUES.map((parque) => (
          <div key={parque.nombre} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition border-t-4 border-orange-500">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{parque.nombre}</h3>
              <p className="text-gray-600 text-sm mb-4">📍 {parque.ubicacion}</p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Lotes:</span>
                  <span className="font-semibold">{parque.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">✅ Disponibles:</span>
                  <span className="font-semibold text-green-600">{parque.disponibles}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600">❌ Vendidos:</span>
                  <span className="font-semibold text-red-600">{parque.vendidos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-600">⏳ Separados:</span>
                  <span className="font-semibold text-yellow-600">{parque.separados}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between">
                  <span className="text-gray-600">Rango de Precios:</span>
                  <span className="font-semibold text-orange-500">
                    ${parque.precioMin.toLocaleString('es-MX')} - ${parque.precioMax.toLocaleString('es-MX')}/m²
                  </span>
                </div>
              </div>

              <button className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
