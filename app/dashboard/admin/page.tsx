'use client'

import Link from 'next/link'

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Panel Administrativo</h1>
        <p className="text-gray-600">Gestión de contenido y configuración</p>
      </div>

      {/* RESUMEN RÁPIDO */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Lotes</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">137</p>
          <p className="text-sm text-gray-500 mt-2">En 3 parques</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Disponibles</p>
          <p className="text-4xl font-bold text-green-600 mt-2">55</p>
          <p className="text-sm text-gray-500 mt-2">Listos para venta</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm">Consultas</p>
          <p className="text-4xl font-bold text-orange-600 mt-2">24</p>
          <p className="text-sm text-gray-500 mt-2">Este mes</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm">Conversión</p>
          <p className="text-4xl font-bold text-purple-600 mt-2">18%</p>
          <p className="text-sm text-gray-500 mt-2">Promedio</p>
        </div>
      </div>

      {/* SECCIONES ADMIN */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/admin/lotes" className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition cursor-pointer block">
          <div className="text-3xl mb-4">📋</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Gestionar Lotes</h3>
          <p className="text-gray-600 text-sm mb-4">Agregar, editar o eliminar lotes de los parques</p>
          <span className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
            Administrar →
          </span>
        </Link>

        <div className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition">
          <div className="text-3xl mb-4">🏢</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Gestionar Parques</h3>
          <p className="text-gray-600 text-sm mb-4">Actualizar información de parques</p>
          <button className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
            Próximamente →
          </button>
        </div>

        <Link href="/dashboard/admin/consultas" className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition cursor-pointer block">
          <div className="text-3xl mb-4">📱</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Consultas</h3>
          <p className="text-gray-600 text-sm mb-4">Ver y responder consultas de clientes</p>
          <span className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
            Ver consultas →
          </span>
        </Link>

        <Link href="/dashboard/admin/reportes" className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition cursor-pointer block">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Reportes</h3>
          <p className="text-gray-600 text-sm mb-4">Estadísticas y análisis de ventas</p>
          <span className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
            Ver reportes →
          </span>
        </Link>

        <Link href="/dashboard/admin/galeria" className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition cursor-pointer block">
          <div className="text-3xl mb-4">🖼️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Galería</h3>
          <p className="text-gray-600 text-sm mb-4">Subir y gestionar imágenes y documentos</p>
          <span className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
            Administrar →
          </span>
        </Link>

        <Link href="/dashboard/admin/configuracion" className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition cursor-pointer block">
          <div className="text-3xl mb-4">⚙️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Configuración</h3>
          <p className="text-gray-600 text-sm mb-4">Ajustes generales del sitio</p>
          <span className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
            Configurar →
          </span>
        </Link>
      </div>

      {/* ÚLTIMA ACTIVIDAD */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Última Actividad</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <p className="font-semibold text-gray-800">Nueva consulta recibida</p>
              <p className="text-sm text-gray-600">Cliente interesado en TERRA REGIA</p>
            </div>
            <span className="text-sm text-gray-500">Hace 2 horas</span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <p className="font-semibold text-gray-800">Lote actualizado</p>
              <p className="text-sm text-gray-600">EPICUS-003 pasó a vendido</p>
            </div>
            <span className="text-sm text-gray-500">Hace 5 horas</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">Contenido agregado</p>
              <p className="text-sm text-gray-600">Nuevas fotos en galería</p>
            </div>
            <span className="text-sm text-gray-500">Ayer</span>
          </div>
        </div>
      </div>

      {/* NOTA */}
      <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
        <p className="text-green-900">
          <strong>✓ Panel Activo:</strong> Todos los módulos están funcionando. Puedes gestionar lotes, consultas, reportes, galería y configuración.
        </p>
      </div>
    </div>
  )
}
