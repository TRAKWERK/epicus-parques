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
      <nav className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🏭 TRAKWERK PARQUES</h1>
        <div className="flex gap-6 items-center">
          <Link href="/dashboard" className="hover:opacity-80">Inicio</Link>
          <Link href="/dashboard/catalogo" className="hover:opacity-80">Catálogo</Link>
          <Link href="/dashboard/parques" className="hover:opacity-80">Parques</Link>
          <Link href="/dashboard/cotizador" className="hover:opacity-80">Cotizador</Link>
          <button
            onClick={handleLogout}
            className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Salir
          </button>
        </div>
      </nav>
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  )
}
