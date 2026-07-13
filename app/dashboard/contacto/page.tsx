'use client'

import { useState } from 'react'

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    parque: '',
    mensaje: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Nombre: ${formData.nombre}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\nParque: ${formData.parque}\nMensaje: ${formData.mensaje}`
    window.open(`https://wa.me/528184606294?text=${encodeURIComponent(msg)}`, '_blank')
    setFormData({ nombre: '', email: '', telefono: '', parque: '', mensaje: '' })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Contacto</h1>
        <p className="text-gray-600">¿Tienes preguntas? Ponte en contacto con nuestro equipo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORMULARIO */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Parque de interés</label>
                  <select
                    name="parque"
                    value={formData.parque}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  >
                    <option value="">Selecciona un parque</option>
                    <option value="EPICUS INDUSTRIAL">EPICUS INDUSTRIAL</option>
                    <option value="TERRA REGIA">TERRA REGIA</option>
                    <option value="PALMAR II">PALMAR II</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje *</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Cuéntanos tu interés..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Enviar por WhatsApp →
              </button>
            </form>
          </div>
        </div>

        {/* INFORMACIÓN DE CONTACTO */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Información de Contacto</h3>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">WhatsApp</p>
                <a href="https://wa.me/528184606294" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-green-500 hover:underline">
                  +52 818 460 6294
                </a>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-lg font-semibold text-gray-800">josefraige@gmail.com</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Horario de atención</p>
                <p className="text-gray-800">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-800">Sábados: 9:00 AM - 1:00 PM</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">💡 Respuesta en máximo 24 horas</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-blue-600 text-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold mb-4">Asesoría Profesional</h3>
            <p className="text-sm opacity-90 mb-4">Nuestro equipo está listo para ayudarte a encontrar el lote perfecto para tu negocio.</p>
            <p className="text-sm font-semibold">Respuesta rápida y profesional garantizada</p>
          </div>
        </div>
      </div>
    </div>
  )
}
