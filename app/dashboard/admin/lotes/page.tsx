'use client'

import { useState } from 'react'

const PARQUES = [
  { id: 'epicus', nombre: 'EPICUS INDUSTRIAL' },
  { id: 'terra-regia', nombre: 'TERRA REGIA' },
  { id: 'palmar-ii', nombre: 'PALMAR II' }
]

export default function GestionarLotesPage() {
  const [lotes, setLotes] = useState<any[]>([
    { id: '1', parque_id: 'epicus', numero: 'EP-001', metros: 2500, precio: 1800000, estado: 'disponible' },
    { id: '2', parque_id: 'epicus', numero: 'EP-002', metros: 2800, precio: 2100000, estado: 'vendido' },
    { id: '3', parque_id: 'terra-regia', numero: 'TR-001', metros: 3000, precio: 2500000, estado: 'disponible' }
  ])

  const [formData, setFormData] = useState({
    numero: '',
    parque_id: '',
    metros: '',
    precio: '',
    estado: 'disponible'
  })

  const [editingId, setEditingId] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setLotes(lotes.map(l => l.id === editingId ? { ...formData, id: editingId } : l))
      setEditingId(null)
    } else {
      setLotes([...lotes, { ...formData, id: Date.now().toString() }])
    }
    setFormData({ numero: '', parque_id: '', metros: '', precio: '', estado: 'disponible' })
  }

  const handleDelete = (id: string) => {
    setLotes(lotes.filter(l => l.id !== id))
  }

  const handleEdit = (lote: any) => {
    setFormData(lote)
    setEditingId(lote.id)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Gestionar Lotes</h1>
        <p className="text-gray-600">Agregar, editar o eliminar lotes de los parques</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar' : 'Nuevo'} Lote</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Parque</label>
                <select
                  name="parque_id"
                  value={formData.parque_id}
                  onChange={handleChange}
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
                <label className="block text-sm font-semibold mb-1">Número de Lote</label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  required
                  placeholder="EP-001"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Metros Cuadrados</label>
                <input
                  type="number"
                  name="metros"
                  value={formData.metros}
                  onChange={handleChange}
                  required
                  placeholder="2500"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Precio (MXN)</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                  placeholder="1800000"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Estado</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  <option value="disponible">Disponible</option>
                  <option value="vendido">Vendido</option>
                  <option value="separado">Separado</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600"
              >
                {editingId ? 'Actualizar' : 'Agregar'} Lote
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ numero: '', parque_id: '', metros: '', precio: '', estado: 'disponible' })
                  }}
                  className="w-full bg-gray-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancelar
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Parque</th>
                  <th className="px-4 py-3 text-left">Lote</th>
                  <th className="px-4 py-3 text-left">M²</th>
                  <th className="px-4 py-3 text-left">Precio</th>
                  <th className="px-4 py-3 text-left">Estado</th>
                  <th className="px-4 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {lotes.map(lote => (
                  <tr key={lote.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{PARQUES.find(p => p.id === lote.parque_id)?.nombre}</td>
                    <td className="px-4 py-3 font-semibold">{lote.numero}</td>
                    <td className="px-4 py-3">{lote.metros}</td>
                    <td className="px-4 py-3">${(lote.precio / 1000000).toFixed(1)}M</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        lote.estado === 'disponible' ? 'bg-green-100 text-green-800' :
                        lote.estado === 'vendido' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {lote.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(lote)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(lote.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
