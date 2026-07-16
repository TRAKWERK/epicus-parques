'use client'

import Link from 'next/link'

export default function HomePage() {
  const parques = [
    {
      id: 'epicus',
      nombre: 'EPICUS INDUSTRIAL',
      ubicacion: 'Monterrey, NL',
      lotes: 45,
      disponibles: 12,
      imagen: '🏢',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'terra-regia',
      nombre: 'TERRA REGIA',
      ubicacion: 'Salinas, NL',
      lotes: 58,
      disponibles: 28,
      imagen: '🏭',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'palmar-ii',
      nombre: 'PALMAR II',
      ubicacion: 'Monterrey, NL',
      lotes: 34,
      disponibles: 15,
      imagen: '🌳',
      color: 'from-green-400 to-green-600'
    }
  ]

  return (
    <div className="space-y-8">
      {/* BIENVENIDA */}
      <section className="bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-lg p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a EPICUS PARQUES INDUSTRIALES</h1>
        <p className="text-xl opacity-90">Acceso a los mejores lotes industriales de Nuevo León</p>
      </section>

      {/* PARQUES */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parques.map((parque) => (
          <Link key={parque.id} href={`/dashboard/parques/${parque.id}`}>
            <div className={`bg-gradient-to-br ${parque.color} rounded-lg p-8 text-white hover:shadow-xl transition cursor-pointer`}>
              <div className="text-5xl mb-4">{parque.imagen}</div>
              <h3 className="text-2xl font-bold mb-2">{parque.nombre}</h3>
              <p className="opacity-90 mb-4">{parque.ubicacion}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-75">Lotes Totales</p>
                  <p className="text-3xl font-bold">{parque.lotes}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Disponibles</p>
                  <p className="text-3xl font-bold">{parque.disponibles}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* FOOTER */}
      <div className="bg-gray-800 text-white text-center py-4 text-sm">
        <p>EPICUS PARQUES INDUSTRIALES © 2026 | Parques Industriales Premium</p>
      </div>
    </div>
  )
}
