'use client'

import { useState } from 'react'

export default function ConfiguracionPage() {
  const [config, setConfig] = useState({
    nombreSitio: 'EPICUS PARQUES INDUSTRIALES',
    emailContacto: 'josefraige@gmail.com',
    telefonoWhatsApp: '8184606294',
    horarioInicio: '09:00',
    horarioFin: '18:00',
    descripcionSitio: 'Plataforma de venta de lotes industriales premium en Nuevo León',
    metaKeywords: 'parques industriales, lotes, Monterrey, Nuevo León',
    mostrarPreciosEnPublico: true,
    requiereAutenticacion: true,
    colorPrimario: '#FF8C42',
    colorSecundario: '#2E7DAF'
  })

  const [guardado, setGuardado] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? !prev[name as keyof typeof config] : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setGuardado(true)
    setTimeout(() => setGuardado(false), 3000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Configuración del Sitio</h1>
        <p className="text-gray-600">Ajustes generales y parámetros de la plataforma</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INFORMACIÓN GENERAL */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Información General</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del Sitio</label>
              <input
                type="text"
                name="nombreSitio"
                value={config.nombreSitio}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email de Contacto</label>
              <input
                type="email"
                name="emailContacto"
                value={config.emailContacto}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
              <input
                type="tel"
                name="telefonoWhatsApp"
                value={config.telefonoWhatsApp}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Zona Horaria</label>
              <select
                name="timezone"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option>America/Mexico_City</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Horario Inicio Atención</label>
              <input
                type="time"
                name="horarioInicio"
                value={config.horarioInicio}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Horario Fin Atención</label>
              <input
                type="time"
                name="horarioFin"
                value={config.horarioFin}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción del Sitio</label>
            <textarea
              name="descripcionSitio"
              value={config.descripcionSitio}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Keywords (SEO)</label>
            <textarea
              name="metaKeywords"
              value={config.metaKeywords}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* SEGURIDAD Y PRIVACIDAD */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Seguridad y Privacidad</h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="requiereAutenticacion"
                checked={config.requiereAutenticacion}
                onChange={handleChange}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <label className="ml-3 text-gray-700">
                <span className="font-semibold">Requerir autenticación para acceso</span>
                <p className="text-sm text-gray-600">Los usuarios deben ingresar contraseña</p>
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="mostrarPreciosEnPublico"
                checked={config.mostrarPreciosEnPublico}
                onChange={handleChange}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <label className="ml-3 text-gray-700">
                <span className="font-semibold">Mostrar precios públicamente</span>
                <p className="text-sm text-gray-600">Los precios serán visibles sin autenticación</p>
              </label>
            </div>
          </div>
        </div>

        {/* PERSONALIZACIÓN DE COLORES */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">Personalización Visual</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Color Primario</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  name="colorPrimario"
                  value={config.colorPrimario}
                  onChange={handleChange}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={config.colorPrimario}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg"
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Color Secundario</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  name="colorSecundario"
                  value={config.colorSecundario}
                  onChange={handleChange}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={config.colorSecundario}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400"
          >
            Restablecer Valores
          </button>
        </div>

        {guardado && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded">
            <p className="font-semibold">✓ Configuración guardada correctamente</p>
          </div>
        )}
      </form>
    </div>
  )
}
