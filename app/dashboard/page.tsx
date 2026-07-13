'use client'

import Link from 'next/link'

export default function DashboardHome() {
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

      {/* OPCIONES PRINCIPALES */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/parques">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-t-4 border-orange-500">
            <div className="text-3xl mb-2">🗺️</div>
            <h3 className="font-bold text-lg mb-1">Parques</h3>
            <p className="text-sm text-gray-600">Ver todos los parques</p>
          </div>
        </Link>

        <Link href="/dashboard/catalogo">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-t-4 border-blue-500">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="font-bold text-lg mb-1">Catálogo</h3>
            <p className="text-sm text-gray-600">Todos los lotes disponibles</p>
          </div>
        </Link>

        <Link href="/dashboard/mapa">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-t-4 border-green-500">
            <div className="text-3xl mb-2">🌐</div>
            <h3 className="font-bold text-lg mb-1">Mapa</h3>
            <p className="text-sm text-gray-600">Ubicaciones en tiempo real</p>
          </div>
        </Link>

        <Link href="/dashboard/comparador">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-t-4 border-purple-500">
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-bold text-lg mb-1">Comparador</h3>
            <p className="text-sm text-gray-600">Compara lotes</p>
          </div>
        </Link>
      </section>

      {/* PARQUES DESTACADOS */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Parques Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {parques.map((parque) => (
            <Link key={parque.id} href={`/dashboard/parques/${parque.id}`}>
              <div className={`bg-gradient-to-br ${parque.color} text-white rounded-lg shadow-lg p-8 hover:shadow-xl transition cursor-pointer transform hover:scale-105`}>
                <div className="text-5xl mb-4">{parque.imagen}</div>
                <h3 className="text-2xl font-bold mb-2">{parque.nombre}</h3>
                <p className="opacity-90 mb-4">{parque.ubicacion}</p>

                <div className="bg-black bg-opacity-20 rounded-lg p-4 mb-4">
                  <div className="text-sm opacity-80">Total de lotes</div>
                  <div className="text-3xl font-bold">{parque.lotes}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white bg-opacity-20 rounded p-3 text-center">
                    <div className="text-sm opacity-80">Disponibles</div>
                    <div className="text-2xl font-bold">{parque.disponibles}</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded p-3 text-center">
                    <div className="text-sm opacity-80">% Ocu.</div>
                    <div className="text-2xl font-bold">{Math.round(((parque.lotes - parque.disponibles) / parque.lotes) * 100)}%</div>
                  </div>
                </div>

                <button className="w-full mt-4 bg-white text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-100 transition">
                  Ver detalles →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ESTADÍSTICAS GLOBALES */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Estadísticas Generales</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="text-gray-600 text-sm font-semibold">Total de Lotes</div>
            <div className="text-4xl font-bold text-orange-500 mt-2">137</div>
            <p className="text-sm text-gray-500 mt-2">En 3 parques</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-gray-600 text-sm font-semibold">Disponibles</div>
            <div className="text-4xl font-bold text-green-500 mt-2">55</div>
            <p className="text-sm text-gray-500 mt-2">Listos para venta</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-gray-600 text-sm font-semibold">Ocupación</div>
            <div className="text-4xl font-bold text-blue-500 mt-2">60%</div>
            <p className="text-sm text-gray-500 mt-2">Promedio</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="text-gray-600 text-sm font-semibold">Rango Precios</div>
            <div className="text-2xl font-bold text-purple-500 mt-2">$1.8M - $15M</div>
            <p className="text-sm text-gray-500 mt-2">Por lote</p>
          </div>
        </div>
      </section>

      {/* LLAMADA A ACCIÓN */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-10 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">¿Interesado en invertir?</h2>
        <p className="text-gray-600 mb-6">Contacta con nuestro equipo para más información</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard/contacto">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition">
              Contactar
            </button>
          </Link>
          <Link href="/dashboard/catalogo">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition">
              Ver catálogo
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
