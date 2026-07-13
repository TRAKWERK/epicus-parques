'use client'

import { useState } from 'react'

export default function ReportesPage() {
  const [tipoReporte, setTipoReporte] = useState('ventas')

  const reporteVentas = {
    titulo: 'Reporte de Ventas',
    datos: [
      { parque: 'EPICUS INDUSTRIAL', vendidos: 33, separados: 0, disponibles: 12, ingresos: '59.4M' },
      { parque: 'TERRA REGIA', vendidos: 30, separados: 0, disponibles: 28, ingresos: '66M' },
      { parque: 'PALMAR II', vendidos: 19, separados: 0, disponibles: 15, ingresos: '38.5M' }
    ]
  }

  const reporteConsultas = {
    titulo: 'Reporte de Consultas',
    datos: [
      { parque: 'EPICUS INDUSTRIAL', consultas: 12, respondidas: 10, tasaRespuesta: '83%' },
      { parque: 'TERRA REGIA', consultas: 8, respondidas: 7, tasaRespuesta: '88%' },
      { parque: 'PALMAR II', consultas: 4, respondidas: 3, tasaRespuesta: '75%' }
    ]
  }

  const reportePromedio = {
    titulo: 'Precios Promedio por Parque',
    datos: [
      { parque: 'EPICUS INDUSTRIAL', minimo: '$1.8M', maximo: '$8.5M', promedio: '$3.2M' },
      { parque: 'TERRA REGIA', minimo: '$2.2M', maximo: '$12M', promedio: '$4.1M' },
      { parque: 'PALMAR II', minimo: '$2M', maximo: '$10.5M', promedio: '$3.6M' }
    ]
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Reportes</h1>
        <p className="text-gray-600">Estadísticas y análisis de desempeño</p>
      </div>

      {/* SELECTOR DE REPORTES */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setTipoReporte('ventas')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tipoReporte === 'ventas'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            📊 Reporte de Ventas
          </button>
          <button
            onClick={() => setTipoReporte('consultas')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tipoReporte === 'consultas'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            📱 Reporte de Consultas
          </button>
          <button
            onClick={() => setTipoReporte('precios')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tipoReporte === 'precios'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            💰 Precios Promedio
          </button>
        </div>
      </div>

      {/* REPORTE SELECCIONADO */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {tipoReporte === 'ventas' && reporteVentas.titulo}
            {tipoReporte === 'consultas' && reporteConsultas.titulo}
            {tipoReporte === 'precios' && reportePromedio.titulo}
          </h2>
        </div>
        <table className="w-full">
          <thead className="bg-orange-500 text-white">
            <tr>
              {tipoReporte === 'ventas' && (
                <>
                  <th className="px-6 py-3 text-left">Parque</th>
                  <th className="px-6 py-3 text-left">Vendidos</th>
                  <th className="px-6 py-3 text-left">Separados</th>
                  <th className="px-6 py-3 text-left">Disponibles</th>
                  <th className="px-6 py-3 text-left">Ingresos Est.</th>
                </>
              )}
              {tipoReporte === 'consultas' && (
                <>
                  <th className="px-6 py-3 text-left">Parque</th>
                  <th className="px-6 py-3 text-left">Total Consultas</th>
                  <th className="px-6 py-3 text-left">Respondidas</th>
                  <th className="px-6 py-3 text-left">Tasa de Respuesta</th>
                </>
              )}
              {tipoReporte === 'precios' && (
                <>
                  <th className="px-6 py-3 text-left">Parque</th>
                  <th className="px-6 py-3 text-left">Mínimo</th>
                  <th className="px-6 py-3 text-left">Máximo</th>
                  <th className="px-6 py-3 text-left">Promedio</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {(tipoReporte === 'ventas' ? reporteVentas.datos :
              tipoReporte === 'consultas' ? reporteConsultas.datos :
              reportePromedio.datos
            ).map((row: any, idx: number) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{row.parque}</td>
                {tipoReporte === 'ventas' && (
                  <>
                    <td className="px-6 py-4">{row.vendidos}</td>
                    <td className="px-6 py-4">{row.separados}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">{row.disponibles}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">{row.ingresos}</td>
                  </>
                )}
                {tipoReporte === 'consultas' && (
                  <>
                    <td className="px-6 py-4">{row.consultas}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">{row.respondidas}</td>
                    <td className="px-6 py-4">{row.tasaRespuesta}</td>
                  </>
                )}
                {tipoReporte === 'precios' && (
                  <>
                    <td className="px-6 py-4">{row.minimo}</td>
                    <td className="px-6 py-4">{row.maximo}</td>
                    <td className="px-6 py-4 font-bold text-orange-600">{row.promedio}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RESUMEN EJECUTIVO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total de Lotes</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">137</p>
          <p className="text-sm text-gray-500 mt-2">En 3 parques</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Ocupación</p>
          <p className="text-4xl font-bold text-green-600 mt-2">60%</p>
          <p className="text-sm text-gray-500 mt-2">82 lotes vendidos</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm">Ingresos Est.</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">163.9M</p>
          <p className="text-sm text-gray-500 mt-2">Pesos mexicanos</p>
        </div>
      </div>
    </div>
  )
}
