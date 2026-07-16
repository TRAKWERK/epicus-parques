'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { EMPRESAS, RANGOS_PRECIOS } from '@/app/data/parques'

// Página de búsqueda con filtros
export default function ParquesSearchPage() {
  const [empresaFilter, setEmpresaFilter] = useState('')
  const [parqueFilter, setParqueFilter] = useState('')
  const [ubicacionFilter, setUbicacionFilter] = useState('')
  const [precioFilter, setPrecioFilter] = useState('0')

  // Obtener todos los parques
  const todosParques = useMemo(() => {
    return EMPRESAS.flatMap(empresa =>
      empresa.parques.map(parque => ({
        ...parque,
        empresaId: empresa.id,
        empresaNombre: empresa.nombre
      }))
    )
  }, [])

  // Filtrar parques
  const parquesFiltrados = useMemo(() => {
    return todosParques.filter(parque => {
      if (empresaFilter && parque.empresaId !== empresaFilter) return false
      if (parqueFilter && parque.id !== parqueFilter) return false
      if (ubicacionFilter && !parque.ubicacion.toLowerCase().includes(ubicacionFilter.toLowerCase())) return false

      const rango = RANGOS_PRECIOS[parseInt(precioFilter)]
      if (parque.precioMin > rango.max || parque.precioMax < rango.min) return false

      return true
    })
  }, [empresaFilter, parqueFilter, ubicacionFilter, precioFilter])

  // Obtener opciones de parques basadas en empresa seleccionada
  const parquesDisponibles = empresaFilter
    ? EMPRESAS.find(e => e.id === empresaFilter)?.parques || []
    : todosParques

  // Obtener ubicaciones únicas
  const ubicacionesUnicas = [...new Set(todosParques.map(p => p.ubicacion))]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-orange-500 hover:underline mb-4 inline-block">
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Busca tu Lote Ideal</h1>
          <p className="text-gray-600 text-lg">Encuentra el parque industrial perfecto para tu negocio</p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Filtros de Búsqueda</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Empresa */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🏢 Buscar Empresa
              </label>
              <select
                value={empresaFilter}
                onChange={(e) => {
                  setEmpresaFilter(e.target.value)
                  setParqueFilter('')
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Todas las empresas</option>
                {EMPRESAS.map(empresa => (
                  <option key={empresa.id} value={empresa.id}>
                    {empresa.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Parque */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🏗️ Buscar Parque
              </label>
              <select
                value={parqueFilter}
                onChange={(e) => setParqueFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Todos los parques</option>
                {parquesDisponibles.map(parque => (
                  <option key={parque.id} value={parque.id}>
                    {parque.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📍 Buscar Ubicación
              </label>
              <select
                value={ubicacionFilter}
                onChange={(e) => setUbicacionFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Todas las ubicaciones</option>
                {ubicacionesUnicas.map(ubicacion => (
                  <option key={ubicacion} value={ubicacion}>
                    {ubicacion}
                  </option>
                ))}
              </select>
            </div>

            {/* Rango de Precios */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                💰 Rango de Precio
              </label>
              <select
                value={precioFilter}
                onChange={(e) => setPrecioFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {RANGOS_PRECIOS.map((rango, idx) => (
                  <option key={idx} value={idx}>
                    {rango.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Parques Encontrados: <span className="text-orange-500">{parquesFiltrados.length}</span>
          </h2>

          {parquesFiltrados.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
              <p className="text-yellow-800 text-lg">❌ No encontramos parques con esos filtros</p>
              <p className="text-yellow-700 mt-2">Intenta cambiar los criterios de búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parquesFiltrados.map(parque => (
                <Link
                  key={parque.id}
                  href={`/parques/${parque.id}`}
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 cursor-pointer h-full">
                    <div className="mb-4">
                      <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                        {parque.empresaNombre}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800">{parque.nombre}</h3>
                      <p className="text-gray-600 mt-2">📍 {parque.ubicacion}</p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Lotes Totales</p>
                          <p className="text-2xl font-bold text-orange-500">{parque.lotes}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Rango de Precios</p>
                          <p className="text-sm font-semibold text-gray-800">
                            ${(parque.precioMin / 1000000).toFixed(1)}M - ${(parque.precioMax / 1000000).toFixed(1)}M
                          </p>
                        </div>
                      </div>
                    </div>

                    <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition font-semibold">
                      Ver Detalles →
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
