'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

const PARQUES_DETALLE = {
  epicus: {
    nombre: 'EPICUS INDUSTRIAL',
    ubicacion: 'Monterrey, Nuevo León',
    total: 45,
    disponibles: 12,
    tamaño: '45 hectáreas',
    año: 2018,
    ubicacionMaps: 'https://maps.google.com/?q=25.6866,-100.3161',
    servicios: ['Seguridad 24/7', 'Acceso de carga', 'Agua y drenaje', 'Energía trifásica', 'Vías pavimentadas', 'Área verde'],
    infraestructura: ['Caseta de vigilancia', 'Portería electrónica', 'Calles iluminadas', 'Drenaje pluvial', 'Red de agua'],
    ventajas: ['Acceso principal privilegiado', 'Zona de expansión industrial', 'Servicios completos', 'Financiamiento disponible'],
    lotes: Array.from({ length: 45 }, (_, i) => ({
      numero: `E-${String(i + 1).padStart(3, '0')}`,
      metros: 1200 + (i % 5) * 300,
      precio: 1800000 + (i % 5) * 400000,
      estado: i < 12 ? 'Disponible' : i < 33 ? 'Vendido' : 'Separado'
    }))
  },
  'terra-regia': {
    nombre: 'TERRA REGIA',
    ubicacion: 'Salinas, Nuevo León',
    total: 58,
    disponibles: 28,
    tamaño: '58 hectáreas',
    año: 2015,
    ubicacionMaps: 'https://maps.google.com/?q=25.8566,-100.1211',
    servicios: ['Seguridad electrónica', 'Áreas verdes', 'Agua potable', 'Fibra óptica', 'Gasoducto', 'Saneamiento'],
    infraestructura: ['Centro de control', 'Subestación eléctrica', 'Planta tratamiento agua', 'Sistema alarma', 'Mantenimiento'],
    ventajas: ['Premium location', 'Servicios de clase mundial', 'Financiamiento flexible', 'Rentabilidad garantizada'],
    lotes: Array.from({ length: 58 }, (_, i) => ({
      numero: `TR-${String(i + 1).padStart(3, '0')}`,
      metros: 2400 + (i % 6) * 400,
      precio: 2200000 + (i % 6) * 500000,
      estado: i < 28 ? 'Disponible' : i < 49 ? 'Vendido' : 'Separado'
    }))
  },
  'palmar-ii': {
    nombre: 'PALMAR II',
    ubicacion: 'Monterrey, Nuevo León',
    total: 34,
    disponibles: 15,
    tamaño: '34 hectáreas',
    año: 2020,
    ubicacionMaps: 'https://maps.google.com/?q=25.7166,-100.3861',
    servicios: ['Acceso principal', 'Drenaje sanitario', 'Caseta vigilancia', 'Vías pavimentadas', 'Agua potable', 'Energía'],
    infraestructura: ['Portería, Control de acceso', 'Sistemas de vigilancia', 'Iluminación LED', 'Mantenimiento vías', 'Seguridad perimetral'],
    ventajas: ['Excelente accesibilidad', 'Precios competitivos', 'Ubicación consolidada', 'Crecimiento garantizado'],
    lotes: Array.from({ length: 34 }, (_, i) => ({
      numero: `P2-${String(i + 1).padStart(3, '0')}`,
      metros: 1700 + (i % 5) * 350,
      precio: 2000000 + (i % 5) * 350000,
      estado: i < 15 ? 'Disponible' : i < 26 ? 'Vendido' : 'Separado'
    }))
  }
}

export default function ParqueFichaPage() {
  const params = useParams()
  const id = params.id as string
  const parque = PARQUES_DETALLE[id as keyof typeof PARQUES_DETALLE]

  if (!parque) {
    return <div className="text-center py-12">Parque no encontrado</div>
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <Link href="/dashboard/parques" className="text-orange-500 hover:underline mb-4 block">
          ← Volver a parques
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{parque.nombre}</h1>
        <p className="text-gray-600 text-lg">📍 {parque.ubicacion}</p>
      </div>

      {/* INFORMACIÓN GENERAL */}
      <section className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Información General</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600">Total de lotes</p>
            <p className="text-3xl font-bold text-orange-500">{parque.total}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Disponibles</p>
            <p className="text-3xl font-bold text-green-500">{parque.disponibles}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Superficie total</p>
            <p className="text-3xl font-bold text-blue-500">{parque.tamaño}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Año de fundación</p>
            <p className="text-3xl font-bold text-purple-500">{parque.año}</p>
          </div>
        </div>
      </section>

      {/* UBICACIÓN EN MAPS */}
      <section className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ubicación en Google Maps</h2>
        <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Mapa interactivo</p>
            <a href={parque.ubicacionMaps} target="_blank" rel="noopener noreferrer" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
              Abrir en Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* SERVICIOS E INFRAESTRUCTURA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Servicios</h2>
          <ul className="space-y-3">
            {parque.servicios.map((s, i) => (
              <li key={i} className="flex items-center text-gray-700">
                <span className="text-green-500 font-bold mr-3">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Infraestructura</h2>
          <ul className="space-y-3">
            {parque.infraestructura.map((inf, i) => (
              <li key={i} className="flex items-center text-gray-700">
                <span className="text-blue-500 font-bold mr-3">▪</span>
                {inf}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* VENTAJAS */}
      <section className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ventajas y Cercanías</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parque.ventajas.map((v, i) => (
            <div key={i} className="bg-white rounded-lg p-4">
              <p className="text-gray-700 font-semibold">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LOTES DISPONIBLES */}
      <section className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Lotes ({parque.lotes.length} total)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Lote</th>
                <th className="px-4 py-2 text-left">Metros</th>
                <th className="px-4 py-2 text-left">Precio</th>
                <th className="px-4 py-2 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {parque.lotes.map((lote, i) => {
                let bgColor = 'bg-green-100 text-green-800'
                if (lote.estado === 'Vendido') bgColor = 'bg-red-100 text-red-800'
                if (lote.estado === 'Separado') bgColor = 'bg-yellow-100 text-yellow-800'
                return (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">{lote.numero}</td>
                    <td className="px-4 py-2">{lote.metros} m²</td>
                    <td className="px-4 py-2">${(lote.precio / 1000000).toFixed(2)}M</td>
                    <td className="px-4 py-2">
                      <span className={`${bgColor} px-3 py-1 rounded-full text-sm font-semibold`}>
                        {lote.estado}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-lg shadow p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Interesado en este parque?</h2>
        <p className="mb-6 text-lg opacity-90">Contacta con nuestro equipo para más información</p>
        <a href="https://wa.me/528184606294" target="_blank" rel="noopener noreferrer" className="bg-white text-orange-500 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block">
          Contactar por WhatsApp →
        </a>
      </section>
    </div>
  )
}
