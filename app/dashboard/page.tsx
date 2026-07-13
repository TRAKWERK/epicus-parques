'use client'

import Link from 'next/link'

export default function DashboardHome() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido a TRAKWERK PARQUES</h2>
        <p className="text-gray-600 mb-6">
          Descubre los mejores terrenos y lotes industriales en Monterrey y su área metropolitana.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/catalogo">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-t-4 border-orange-500">
            <h3 className="text-xl font-bold text-orange-500 mb-2">📋 Catálogo Completo</h3>
            <p className="text-gray-600">Explora todos los lotes disponibles con filtros avanzados</p>
          </div>
        </Link>

        <Link href="/dashboard/parques">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-t-4 border-blue-600">
            <h3 className="text-xl font-bold text-blue-600 mb-2">🗺️ TERRA PARK</h3>
            <p className="text-gray-600">Descubre los parques industriales disponibles</p>
          </div>
        </Link>

        <Link href="/dashboard/cotizador">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-t-4 border-green-500">
            <h3 className="text-xl font-bold text-green-500 mb-2">💬 Cotizador</h3>
            <p className="text-gray-600">Solicita una cotización por WhatsApp</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-semibold">Total de Lotes</div>
          <div className="text-4xl font-bold text-orange-500 mt-2">21+</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-semibold">Disponibles</div>
          <div className="text-4xl font-bold text-green-500 mt-2">18+</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm font-semibold">Parques</div>
          <div className="text-4xl font-bold text-blue-600 mt-2">5</div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">✨ Características</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-bold text-orange-600 mb-2">📍 Ubicaciones Premium</h4>
            <p className="text-sm text-gray-700">Lotes en los principales parques industriales de Monterrey</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-600 mb-2">💰 Precios Competitivos</h4>
            <p className="text-sm text-gray-700">Desde $2,000/m² - Financiamiento hasta 36 meses</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-bold text-green-600 mb-2">📊 Información Completa</h4>
            <p className="text-sm text-gray-700">Planos, especificaciones y detalles de cada lote</p>
          </div>
        </div>
      </div>
    </div>
  )
}
