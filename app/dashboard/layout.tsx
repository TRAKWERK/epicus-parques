'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('auth_token')
    if (!auth) {
      router.push('/')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    router.push('/')
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/dashboard" className="text-2xl font-bold hover:opacity-80">
            🏭 TRAKWERK PARQUES
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* NAVEGACIÓN */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-0 flex flex-wrap gap-0 overflow-x-auto">
          <Link href="/dashboard" className="px-4 py-4 hover:bg-gray-100 border-b-2 border-transparent hover:border-orange-500 transition text-sm font-semibold text-gray-700">
            Inicio
          </Link>
          <Link href="/dashboard/parques" className="px-4 py-4 hover:bg-gray-100 border-b-2 border-transparent hover:border-orange-500 transition text-sm font-semibold text-gray-700">
            Parques
          </Link>
          <Link href="/dashboard/catalogo" className="px-4 py-4 hover:bg-gray-100 border-b-2 border-transparent hover:border-orange-500 transition text-sm font-semibold text-gray-700">
            Catálogo
          </Link>
          <Link href="/dashboard/mapa" className="px-4 py-4 hover:bg-gray-100 border-b-2 border-transparent hover:border-orange-500 transition text-sm font-semibold text-gray-700">
            Mapa
          </Link>
          <Link href="/dashboard/comparador" className="px-4 py-4 hover:bg-gray-100 border-b-2 border-transparent hover:border-orange-500 transition text-sm font-semibold text-gray-700">
            Comparador
          </Link>
          <Link href="/dashboard/contacto" className="px-4 py-4 hover:bg-gray-100 border-b-2 border-transparent hover:border-orange-500 transition text-sm font-semibold text-gray-700">
            Contacto
          </Link>
          <Link href="/dashboard/admin" className="px-4 py-4 hover:bg-gray-100 border-b-2 border-transparent hover:border-orange-500 transition text-sm font-semibold text-gray-700">
            Admin
          </Link>
        </div>
      </nav>

      {/* CONTENIDO */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white text-center py-4 text-sm">
        <p>TRAKWERK PARQUES © 2026 | Parques Industriales Premium | WhatsApp: +52 8184606294</p>
      </footer>
    </div>
  )
}
