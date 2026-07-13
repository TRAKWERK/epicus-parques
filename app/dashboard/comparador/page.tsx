'use client'

import { useState } from 'react'

const PARQUES = [
  { id: 'epicus', nombre: 'EPICUS INDUSTRIAL', lotes: 45, disponibles: 12, precioMin: 1.8, precioMax: 8.5, tamaño: 45 },
  { id: 'terra-regia', nombre: 'TERRA REGIA', lotes: 58, disponibles: 28, precioMin: 2.2, precioMax: 12, tamaño: 58 },
  { id: 'palmar-ii', nombre: 'PALMAR II', lotes: 34, disponibles: 15, precioMin: 2, precioMax: 10.5, tamaño: 34 }
]

export default function ComparadorPage() {
  const [seleccionados, setSeleccionados] = useState<string[]>(['epicus', 'terra-regia'])

  const toggle = (id: string) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const comparacion = PARQUES.filter(p => seleccionados.includes(p.id))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Comparador de Parques</h1>
        <p className="text-gray-600">Compara características de nuestros parques industriales</p>
      </div>

      {/* SELECTOR */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Selecciona parques a comparar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PARQUES.map(p => (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={`p-4 rounded-lg border-2 transition text-left ${
                seleccionados.includes(p.id)
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-300 bg-white hover:border-orange-300'
              }`}
            >
              <input type="checkbox" checked={seleccionados.includes(p.id)} readOnly className="mr-2" />
              <span className="font-semibold">{p.nombre}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TABLA COMPARATIVA */}
      {comparacion.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Característica</th>
                {comparacion.map(p => (
                  <th key={p.id} className="px-6 py-4 text-left">{p.nombre}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">Total de lotes</td>
                {comparacion.map(p => (
                  <td key={p.id} className="px-6 py-4">{p.lotes}</td>
                ))}
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">Disponibles</td>
                {comparacion.map(p => (
                  <td key={p.id} className="px-6 py-4 text-green-600 font-bold">{p.disponibles}</td>
                ))}
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">Ocupación</td>
                {comparacion.map(p => (
                  <td key={p.id} className="px-6 py-4">{Math.round(((p.lotes - p.disponibles) / p.lotes) * 100)}%</td>
                ))}
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">Rango de precios</td>
                {comparacion.map(p => (
                  <td key={p.id} className="px-6 py-4">${p.precioMin}M - ${p.precioMax}M</td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">Superficie total</td>
                {comparacion.map(p => (
                  <td key={p.id} className="px-6 py-4">{p.tamaño} hectáreas</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {comparacion.length === 0 && (
        <div className="bg-gray-100 rounded-lg p-12 text-center text-gray-600">
          <p>Selecciona al menos un parque para ver la comparación</p>
        </div>
      )}
    </div>
  )
}
