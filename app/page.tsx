'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const parques = [
    {
      id: 'epicus',
      nombre: 'EPICUS INDUSTRIAL',
      ubicacion: 'Monterrey, NL',
      lotes: 45,
      disponibles: 12,
      descripcion: 'Parque industrial premium con infraestructura de clase mundial',
      imagen: '🏢',
      color: 'from-blue-400 to-blue-600',
      precio_promedio: '$4,200'
    },
    {
      id: 'terra-regia',
      nombre: 'TERRA REGIA',
      ubicacion: 'Salinas, NL',
      lotes: 58,
      disponibles: 28,
      descripcion: 'Ubicación estratégica con acceso a carreteras principales',
      imagen: '🏭',
      color: 'from-orange-400 to-orange-600',
      precio_promedio: '$3,800'
    },
    {
      id: 'palmar-ii',
      nombre: 'PALMAR II',
      ubicacion: 'Monterrey, NL',
      lotes: 34,
      disponibles: 15,
      descripcion: 'Espacio industrial moderno con servicios completos',
      imagen: '🌳',
      color: 'from-green-400 to-green-600',
      precio_promedio: '$4,100'
    }
  ]

  const recentListings = [
    {
      id: 1,
      nombre: 'Lote C226',
      parque: 'TERRA REGIA',
      area: '1,200 m²',
      precio: '$4,800',
      imagen: '🏗️'
    },
    {
      id: 2,
      nombre: 'Lote E45',
      parque: 'EPICUS INDUSTRIAL',
      area: '950 m²',
      precio: '$4,200',
      imagen: '🏗️'
    },
    {
      id: 3,
      nombre: 'Lote P15',
      parque: 'PALMAR II',
      area: '1,100 m²',
      precio: '$4,100',
      imagen: '🏗️'
    },
    {
      id: 4,
      nombre: 'Lote C230',
      parque: 'TERRA REGIA',
      area: '1,300 m²',
      precio: '$5,200',
      imagen: '🏗️'
    }
  ]

  const testimonials = [
    {
      nombre: 'Ing. Carlos Mendoza',
      empresa: 'Sistemas Logísticos MTY',
      texto: 'Excelente ubicación y servicio. El equipo de EPICUS fue muy profesional en todo el proceso.',
      rating: 5,
      foto: '👨‍💼'
    },
    {
      nombre: 'Lic. María González',
      empresa: 'Manufactura Global S.A.',
      texto: 'Los lotes de TERRA REGIA son ideales para nuestras operaciones. Muy recomendado.',
      rating: 5,
      foto: '👩‍💼'
    },
    {
      nombre: 'Arq. Roberto Sánchez',
      empresa: 'Construcciones Monterrey',
      texto: 'Infraestructura de primera clase y atención personalizada. Totalmente satisfecho.',
      rating: 5,
      foto: '👨‍💼'
    }
  ]

  const faqs = [
    {
      pregunta: '¿Cuáles son los requisitos para adquirir un lote?',
      respuesta: 'Los requisitos básicos incluyen: identificación oficial, comprobante de domicilio, capacidad económica demostrada y carta de intención de compra. Nuestro equipo te guiará en cada paso del proceso.'
    },
    {
      pregunta: '¿Ofrecen opciones de financiamiento?',
      respuesta: 'Sí, contamos con alianzas estratégicas con instituciones financieras que ofrecen plazos de hasta 10 años. Podemos conectarte con nuestros asesores especializados.'
    },
    {
      pregunta: '¿Cuál es el precio promedio de un lote?',
      respuesta: 'Los precios varían según ubicación, tamaño y disponibilidad. Generalmente fluctúan entre $3,800 y $5,200 por metro cuadrado, dependiendo del parque.'
    },
    {
      pregunta: '¿Qué servicios incluye cada parque?',
      respuesta: 'Nuestros parques cuentan con seguridad 24/7, alumbrado público, sistemas de drenaje, agua potable, y acceso a servicios de telecomunicaciones de alta velocidad.'
    },
    {
      pregunta: '¿Cuántos lotes están disponibles actualmente?',
      respuesta: 'Contamos con 55 lotes disponibles distribuidos entre nuestros tres parques. Te recomendamos contactarnos para conocer las opciones más recientes.'
    }
  ]

  const stats = [
    { label: 'Lotes Totales', valor: '137', icono: '📊' },
    { label: 'Disponibles', valor: '55', icono: '✅' },
    { label: 'Vendidos', valor: '70', icono: '🏆' },
    { label: 'Superficie Total', valor: '45 Ha', icono: '🗺️' }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Buscar:', searchQuery)
  }

  return (
    <div className="w-full">
      {/* HERO BANNER */}
      <section className="relative w-full overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <span className="text-6xl sm:text-7xl">🏢</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              EPICUS PARQUES INDUSTRIALES
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-4 max-w-3xl mx-auto">
              Acceso a los mejores lotes industriales de Nuevo León con infraestructura de clase mundial
            </p>
            <p className="text-base sm:text-lg opacity-75 mb-8 max-w-2xl mx-auto">
              Desde Monterrey hasta Salinas, encuentra tu espacios ideal para tu negocio
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/#parques">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition transform hover:scale-105">
                  Ver Todos los Parques
                </button>
              </Link>
              <Link href="/dashboard/cotizador">
                <button className="px-8 py-3 bg-white/20 hover:bg-white/30 border border-white rounded-lg font-semibold text-white transition transform hover:scale-105">
                  Solicitar Cotización
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="text-4xl sm:text-5xl mb-3">{stat.icono}</div>
              <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.valor}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH & FILTER BAR */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Busca tu Lote Ideal
          </h2>

          <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar por parque o ubicación
                </label>
                <input
                  type="text"
                  placeholder="TERRA REGIA, EPICUS, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área mínima (m²)
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Cualquiera</option>
                  <option>500 - 1000</option>
                  <option>1000 - 1500</option>
                  <option>1500+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rango de precio
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Cualquiera</option>
                  <option>$3,000 - $4,000</option>
                  <option>$4,000 - $5,000</option>
                  <option>$5,000+</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
            >
              Buscar Lotes
            </button>
          </form>
        </div>
      </section>

      {/* FEATURED PARQUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Nuestros Parques
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Descubre nuestras opciones de parques industriales con infraestructura de clase mundial
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {parques.map((parque) => (
            <Link key={parque.id} href={`/parques/${parque.id}`}>
              <div className="h-full bg-white rounded-xl shadow-md hover:shadow-2xl transition transform hover:scale-105 cursor-pointer overflow-hidden group">
                <div className={`bg-gradient-to-br ${parque.color} text-white p-8 text-center`}>
                  <div className="text-5xl mb-4">{parque.imagen}</div>
                  <h3 className="text-2xl font-bold mb-2">{parque.nombre}</h3>
                  <div className="flex items-center justify-center gap-2 opacity-90">
                    <span>📍</span>
                    <p>{parque.ubicacion}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 h-12">{parque.descripcion}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Lotes Totales</p>
                      <p className="text-2xl font-bold text-gray-900">{parque.lotes}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Disponibles</p>
                      <p className="text-2xl font-bold text-green-600">{parque.disponibles}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Precio promedio</p>
                      <p className="text-lg font-bold text-gray-900">{parque.precio_promedio}</p>
                    </div>
                    <div className="text-blue-600 group-hover:translate-x-1 transition">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LATEST LISTINGS */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
            Anuncios Recientes
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Los lotes disponibles más recientemente en nuestros parques
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-5">
                <div className="text-4xl mb-4">{listing.imagen}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{listing.nombre}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">{listing.parque}</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">{listing.area}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold text-blue-600">{listing.precio}</span>
                  <Link href={`/parques/${listing.parque.toLowerCase()}`}>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      Ver →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/dashboard/catalogo">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-105">
                Ver Todos los Lotes
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Listo para Invertir en tu Negocio?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Nuestro equipo está disponible para ayudarte a encontrar el lote perfecto para tu proyecto
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/contacto">
              <button className="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition transform hover:scale-105">
                Contactar Ahora
              </button>
            </Link>
            <Link href="/dashboard/mapa">
              <button className="px-8 py-3 bg-blue-700 hover:bg-blue-800 border border-white text-white font-semibold rounded-lg transition transform hover:scale-105">
                Ver en Mapa
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Lo Que Dicen Nuestros Clientes
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Experiencias reales de empresarios y emprendedores que confiaron en EPICUS
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{testimonial.foto}</div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.nombre}</p>
                  <p className="text-sm text-gray-600">{testimonial.empresa}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">
                "{testimonial.texto}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Resolvemos tus dudas sobre nuestros parques y proceso de compra
          </p>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="text-lg font-semibold text-gray-900 text-left">
                    {faq.pregunta}
                  </span>
                  <span className={`text-xl transition-transform ${
                      expandedFaq === idx ? 'transform rotate-180' : ''
                    }`}>
                    ▼
                  </span>
                </button>

                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.respuesta}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Branding */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">EPICUS</h3>
              <p className="text-sm leading-relaxed">
                Líder en parques industriales premium en Nuevo León, con infraestructura de clase mundial y atención personalizada.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Acceso Rápido</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#parques" className="hover:text-white transition">Parques</Link></li>
                <li><Link href="/dashboard/catalogo" className="hover:text-white transition">Catálogo de Lotes</Link></li>
                <li><Link href="/dashboard/mapa" className="hover:text-white transition">Mapa Interactivo</Link></li>
                <li><Link href="/dashboard/comparador" className="hover:text-white transition">Comparador</Link></li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-white font-bold mb-4">Información</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard/contacto" className="hover:text-white transition">Contacto</Link></li>
                <li><Link href="/dashboard/cotizador" className="hover:text-white transition">Cotizador</Link></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Términos y Condiciones</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="flex-shrink-0 mt-0.5">📱</span>
                  <a href="tel:+528184606294" className="hover:text-white transition">(818) 460-6294</a>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 mt-0.5">✉️</span>
                  <a href="mailto:contacto@epicus.com" className="hover:text-white transition">contacto@epicus.com</a>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 mt-0.5">📍</span>
                  <span>Monterrey, Nuevo León</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">
                © 2026 EPICUS PARQUES INDUSTRIALES. Todos los derechos reservados.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0 text-sm">
                <a href="#" className="hover:text-white transition">Privacidad</a>
                <a href="#" className="hover:text-white transition">Términos</a>
                <a href="#" className="hover:text-white transition">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
