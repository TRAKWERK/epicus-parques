'use client'

import { useState } from 'react'

export default function CotizadorPage() {
  const [formData, setFormData] = useState({
    parque: '',
    lote: '',
    nombre: '',
    telefono: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.parque || !formData.lote || !formData.nombre || !formData.telefono) {
      alert('⚠️ Por favor completa todos los campos')
      return
    }

    const mensaje = `Hola, estoy interesado en el lote *${formData.lote}* del parque *${formData.parque}*. Mi nombre es *${formData.nombre}* y mi número es *${formData.telefono}*. Quisiera recibir más información sobre este lote.`

    const urlWhatsApp = `https://wa.me/528184606294?text=${encodeURIComponent(mensaje)}`
    window.open(urlWhatsApp, '_blank')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">💬 Solicitar Cotización</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Formulario de Cotización</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Parque: *</label>
              <select
                name="parque"
                value={formData.parque}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="">Selecciona un parque</option>
                <option value="Condesa">TERRA PARK CONDESA</option>
                <option value="García">TERRA PARK GARCÍA II</option>
                <option value="Salinas">TERRA PARK SALINAS</option>
                <option value="Santa Catarina III">TERRA PARK SANTA CATARINA III</option>
                <option value="Santa Catarina IV">TERRA PARK SANTA CATARINA IV</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Lote: *</label>
              <input
                type="text"
                name="lote"
                value={formData.lote}
                onChange={handleChange}
                placeholder="Ej: C226, G-001"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo: *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp/Teléfono: *</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+52 8181234567"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition text-lg"
            >
              📲 Enviar por WhatsApp
            </button>
          </form>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">ℹ️ Información de Contacto</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-600 text-sm">WhatsApp Directo:</p>
              <p className="text-2xl font-bold text-green-500">+52 8184606294</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-600 text-sm">Horario de Atención:</p>
              <p className="font-semibold text-gray-800">Lunes a Viernes 9:00 AM - 6:00 PM</p>
              <p className="text-sm text-gray-600">Sábados 9:00 AM - 1:00 PM</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-600 text-sm">Ubicación:</p>
              <p className="font-semibold text-gray-800">Monterrey, Nuevo León</p>
            </div>
          </div>

          <div className="mt-6 bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
            <h4 className="font-bold text-orange-700 mb-2">💡 Tip</h4>
            <p className="text-sm text-gray-700">
              Al enviar el formulario, se abrirá automáticamente WhatsApp con tu cotización. Nuestro equipo responderá en las próximas 24 horas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
