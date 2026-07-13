'use client'

export default function MapaPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Mapa General de Parques</h1>
        <p className="text-gray-600">Ubicación de todos nuestros parques industriales en Nuevo León</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <iframe
          width="100%"
          height="600"
          frameBorder={0}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14270.93867217823!2d-100.3161!3d25.6866!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQxJzExLjgiTiAxMDBCAgswjoxOCczNyIx!5e0!3m2!1ses!2smx!4v1234567890"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
          <h3 className="font-bold text-lg mb-2">EPICUS INDUSTRIAL</h3>
          <p className="text-sm text-gray-600 mb-4">Monterrey, NL</p>
          <a href="https://maps.google.com/?q=25.6866,-100.3161" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Ver en Google Maps →
          </a>
        </div>

        <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
          <h3 className="font-bold text-lg mb-2">TERRA REGIA</h3>
          <p className="text-sm text-gray-600 mb-4">Salinas, NL</p>
          <a href="https://maps.google.com/?q=25.8566,-100.1211" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
            Ver en Google Maps →
          </a>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
          <h3 className="font-bold text-lg mb-2">PALMAR II</h3>
          <p className="text-sm text-gray-600 mb-4">Monterrey, NL</p>
          <a href="https://maps.google.com/?q=25.7166,-100.3861" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
            Ver en Google Maps →
          </a>
        </div>
      </div>
    </div>
  )
}
