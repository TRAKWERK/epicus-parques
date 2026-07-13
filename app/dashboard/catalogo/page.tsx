'use client'

import { useState, useEffect } from 'react'

interface Lote {
  id: string
  numero: string
  metros: number
  precio: number
  parque: string
  estado: 'disponible' | 'vendido' | 'separado'
}

const LOTES_INICIALES: Lote[] = [
  { id: '1', numero: 'C226', metros: 1003.17, precio: 3400, parque: 'Condesa', estado: 'disponible' },
  { id: '2', numero: 'C230', metros: 1003.17, precio: 3400, parque: 'Condesa', estado: 'disponible' },
  { id: '3', numero: 'C231', metros: 1003.17, precio: 3400, parque: 'Condesa', estado: 'disponible' },
  { id: '4', numero: 'C39', metros: 1003.17, precio: 3400, parque: 'Condesa', estado: 'disponible' },
  { id: '5', numero: 'G-001', metros: 1150, precio: 5100, parque: 'García', estado: 'disponible' },
  { id: '6', numero: 'G-002', metros: 1150, precio: 5100, parque: 'García', estado: 'disponible' },
  { id: '7', numero: 'G-003', metros: 1150, precio: 5100, parque: 'García', estado: 'disponible' },
  { id: '8', numero: 'G-004', metros: 1150, precio: 5100, parque: 'García', estado: 'disponible' },
  { id: '9', numero: 'G-005', metros: 1150, precio: 4800, parque: 'García', estado: 'disponible' },
  { id: '10', numero: 'IND-02', metros: 19337.53, precio: 2650, parque: 'Salinas', estado: 'disponible' },
  { id: '11', numero: 'IND-04', metros: 38003.51, precio: 2000, parque: 'Salinas', estado: 'disponible' },
  { id: '12', numero: 'IND-13', metros: 4093.85, precio: 3350, parque: 'Salinas', estado: 'disponible' },
  { id: '13', numero: 'IND-14', metros: 4093.85, precio: 3350, parque: 'Salinas', estado: 'disponible' },
  { id: '14', numero: 'IND-15', metros: 4093.85, precio: 3350, parque: 'Salinas', estado: 'vendido' },
  { id: '15', numero: 'IND-16', metros: 4093.85, precio: 3350, parque: 'Salinas', estado: 'disponible' },
  { id: '16', numero: 'IND-17', metros: 4093.85, precio: 3350, parque: 'Salinas', estado: 'separado' },
  { id: '17', numero: 'IND-19', metros: 7712.26, precio: 3000, parque: 'Salinas', estado: 'disponible' },
  { id: '18', numero: '385', metros: 1026.00, precio: 5200, parque: 'Santa Catarina III', estado: 'disponible' },
  { id: '19', numero: '384', metros: 1068.78, precio: 5400, parque: 'Santa Catarina III', estado: 'disponible' },
  { id: '20', numero: '372', metros: 1000.00, precio: 5600, parque: 'Santa Catarina IV', estado: 'disponible' },
  { id: '21', numero: '377', metros: 1000.00, precio: 11000, parque: 'Santa Catarina IV', estado: 'disponible' },
]

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'disponible':
      return 'bg-green-100 text-green-800'
    case 'vendido':
      return 'bg-red-100 text-red-800'
    case 'separado':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function CatalogoPage() {
  const [filtro, setFiltro] = useState('')
  const [lotes, setLotes] = useState(LOTES_INICIALES)

  useEffect(() => {
    if (filtro) {
      setLotes(LOTES_INICIALES.filter(l => l.parque === filtro))
    } else {
      setLotes(LOTES_INICIALES)
    }
  }, [filtro])

  const estadisticas = {
    total: lotes.length,
    disponibles: lotes.filter(l => l.estado === 'disponible').length,
    vendidos: lotes.filter(l => l.estado === 'vendido').length,
    separados: lotes.filter(l => l.estado === 'separado').length,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📋 Catálogo Completo</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Lotes</div>
          <div className="text-2xl font-bold text-orange-500 mt-1">{estadisticas.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Disponibles</div>
          <div className="text-2xl font-bold text-green-500 mt-1">{estadisticas.disponibles}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Vendidos</div>
          <div className="text-2xl font-bold text-red-500 mt-1">{estadisticas.vendidos}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Separados</div>
          <div className="text-2xl font-bold text-yellow-500 mt-1">{estadisticas.separados}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Filtrar por Parque:</label>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
        >
          <option value="">--- Todos ---</option>
          <option value="Condesa">TERRA PARK CONDESA</option>
          <option value="García">TERRA PARK GARCÍA II</option>
          <option value="Salinas">TERRA PARK SALINAS</option>
          <option value="Santa Catarina III">TERRA PARK SANTA CATARINA III</option>
          <option value="Santa Catarina IV">TERRA PARK SANTA CATARINA IV</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Parque</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Lote</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Metros (m²)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Precio/m²</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Precio Total</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {lotes.map((lote) => {
              const precioTotal = lote.metros * lote.precio
              return (
                <tr key={lote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">TERRA PARK {lote.parque}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{lote.numero}</td>
                  <td className="px-6 py-4 text-sm">{lote.metros.toLocaleString('es-MX', { maximumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 text-sm">${lote.precio.toLocaleString('es-MX')}</td>
                  <td className="px-6 py-4 text-sm">${precioTotal.toLocaleString('es-MX', { maximumFractionDigits: 0 })}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(lote.estado)}`}>
                      {lote.estado.charAt(0).toUpperCase() + lote.estado.slice(1)}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
