'use client'

import { useState } from 'react'

const PARQUES = [
  { id: 'epicus', nombre: 'EPICUS INDUSTRIAL' },
  { id: 'terra-regia', nombre: 'TERRA REGIA' },
  { id: 'palmar-ii', nombre: 'PALMAR II' }
]

export default function GaleriaPage() {
  const [archivos, setArchivos] = useState<any[]>([
    { id: '1', nombre: 'plano-epicus-001.pdf', tipo: 'PDF', parque: 'EPICUS INDUSTRIAL', fecha: '2026-07-10', tamaño: '2.3 MB' },
    { id: '2', nombre: 'foto-maquinaria.jpg', tipo: 'Imagen', parque: 'TERRA REGIA', fecha: '2026-07-09', tamaño: '856 KB' },
    { id: '3', nombre: 'manual-servicios.pdf', tipo: 'PDF', parque: 'PALMAR II', fecha: '2026-07-08', tamaño: '1.8 MB' }
  ])

  const [filtroParque, setFiltroParque] = useState('todos')
  const [nuevoArchivo, setNuevoArchivo] = useState({ nombre: '', parque: '', tipo: 'PDF' })

  const archivosFiltrados = filtroParque === 'todos'
    ? archivos
    : archivos.filter(a => a.parque === PARQUES.find(p => p.id === filtroParque)?.nombre)

  const handleAgregarArchivo = (e: React.FormEvent) => {
    e.preventDefault()
    if (nuevoArchivo.nombre && nuevoArchivo.parque) {
      setArchivos([...archivos, {
        id: Date.now().toString(),
        nombre: nuevoArchivo.nombre,
        tipo: nuevoArchivo.tipo,
        parque: PARQUES.find(p => p.id === nuevoArchivo.parque)?.nombre,
        fecha: new Date().toISOString().split('T')[0],
        tamaño: '0 KB'
      }])
      setNuevoArchivo({ nombre: '', parque: '', tipo: 'PDF' })
    }
  }

  const handleEliminar = (id: string) => {
    setArchivos(archivos.filter(a => a.id !== id))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Galería y Documentos</h1>
        <p className="text-gray-600">Administrar fotos, planos y documentación de parques</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORMULARIO DE CARGA */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Subir Archivo</h2>
            <form onSubmit={handleAgregarArchivo} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Nombre del archivo</label>
                <input
                  type="text"
                  value={nuevoArchivo.nombre}
                  onChange={(e) => setNuevoArchivo({ ...nuevoArchivo, nombre: e.target.value })}
                  required
                  placeholder="plano-parque.pdf"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Parque</label>
                <select
                  value={nuevoArchivo.parque}
                  onChange={(e) => setNuevoArchivo({ ...nuevoArchivo, parque: e.target.value })}
                  required
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  <option value="">Selecciona parque</option>
                  {PARQUES.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Tipo de archivo</label>
                <select
                  value={nuevoArchivo.tipo}
                  onChange={(e) => setNuevoArchivo({ ...nuevoArchivo, tipo: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  <option value="PDF">PDF</option>
                  <option value="Imagen">Imagen (JPG/PNG)</option>
                  <option value="Documento">Documento (DOCX/XLSX)</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600"
              >
                Subir Archivo
              </button>
            </form>
          </div>
        </div>

        {/* LISTA DE ARCHIVOS */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">Filtrar por Parque</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFiltroParque('todos')}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  filtroParque === 'todos'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              {PARQUES.map(p => (
                <button
                  key={p.id}
                  onClick={() => setFiltroParque(p.id)}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    filtroParque === p.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {p.nombre}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {archivosFiltrados.map(archivo => (
              <div key={archivo.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">
                    {archivo.tipo === 'PDF' ? '📄' :
                     archivo.tipo === 'Imagen' ? '🖼️' :
                     archivo.tipo === 'Documento' ? '📊' : '📎'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{archivo.nombre}</p>
                    <p className="text-sm text-gray-600">
                      {archivo.parque} • {archivo.fecha} • {archivo.tamaño}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    Descargar
                  </a>
                  <button
                    onClick={() => handleEliminar(archivo.id)}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {archivosFiltrados.length === 0 && (
            <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-600">
              <p>No hay archivos en este parque</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
