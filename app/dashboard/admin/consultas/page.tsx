'use client'

import { useState } from 'react'

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<any[]>([
    {
      id: '1',
      nombre: 'Carlos García',
      email: 'carlos@example.com',
      telefono: '8184605555',
      parque: 'EPICUS INDUSTRIAL',
      mensaje: 'Interesado en lotes de 3000m²',
      respondida: false,
      fecha: '2026-07-13'
    },
    {
      id: '2',
      nombre: 'María López',
      email: 'maria@example.com',
      telefono: '8185551234',
      parque: 'TERRA REGIA',
      mensaje: 'Consulta sobre financiamiento',
      respondida: true,
      fecha: '2026-07-12',
      respuesta: 'Se envió información de planes de financiamiento por correo.'
    }
  ])

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [respuesta, setRespuesta] = useState('')

  const handleResponder = (id: string) => {
    if (respuesta.trim()) {
      setConsultas(consultas.map(c =>
        c.id === id ? { ...c, respondida: true, respuesta } : c
      ))
      setRespuesta('')
      setSelectedId(null)
    }
  }

  const handleEliminar = (id: string) => {
    setConsultas(consultas.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Consultas de Clientes</h1>
        <p className="text-gray-600">Ver y responder a consultas de clientes</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {consultas.map(consulta => (
          <div key={consulta.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{consulta.nombre}</h3>
                <p className="text-sm text-gray-600">{consulta.fecha}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                consulta.respondida
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {consulta.respondida ? 'Respondida' : 'Pendiente'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <a href={`mailto:${consulta.email}`} className="text-blue-600 hover:underline">
                  {consulta.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <a href={`https://wa.me/52${consulta.telefono.replace(/\D/g, '')}`} className="text-green-600 hover:underline">
                  {consulta.telefono}
                </a>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Parque de interés</p>
                <p className="font-semibold">{consulta.parque}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Mensaje:</p>
              <p className="bg-gray-50 p-3 rounded">{consulta.mensaje}</p>
            </div>

            {consulta.respuesta && (
              <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-3 rounded">
                <p className="text-sm text-gray-600 mb-1">Respuesta enviada:</p>
                <p>{consulta.respuesta}</p>
              </div>
            )}

            {!consulta.respondida && (
              <div className="space-y-2">
                {selectedId !== consulta.id ? (
                  <button
                    onClick={() => setSelectedId(consulta.id)}
                    className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
                  >
                    Responder Consulta
                  </button>
                ) : (
                  <>
                    <textarea
                      value={respuesta}
                      onChange={(e) => setRespuesta(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      rows={3}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResponder(consulta.id)}
                        className="flex-1 bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600"
                      >
                        Enviar Respuesta
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(null)
                          setRespuesta('')
                        }}
                        className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-400"
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            <button
              onClick={() => handleEliminar(consulta.id)}
              className="mt-4 text-red-600 hover:text-red-800 font-semibold text-sm"
            >
              Eliminar consulta
            </button>
          </div>
        ))}
      </div>

      {consultas.length === 0 && (
        <div className="bg-gray-100 rounded-lg p-12 text-center text-gray-600">
          <p>No hay consultas registradas</p>
        </div>
      )}
    </div>
  )
}
