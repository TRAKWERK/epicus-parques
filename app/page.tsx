'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('auth_token')
    if (auth) {
      router.push('/dashboard')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (password === 'admin') {
      localStorage.setItem('auth_token', 'authenticated')
      router.push('/dashboard')
    } else {
      setError('❌ Contraseña incorrecta')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">🏭 EPICUS PARQUES</h1>
        <p className="text-2xl mb-2">INDUSTRIALES</p>
        <p className="text-lg opacity-90">Plataforma de Venta de Lotes Industriales</p>
      </div>

      {/* LOGIN SECTION */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Acceso Restringido</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition disabled:bg-gray-400"
            >
              {isLoading ? 'Entrando...' : 'Acceder'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-2">Información de contacto:</p>
            <p className="text-lg font-semibold text-orange-500">+52 8184606294</p>
            <p className="text-sm text-gray-600">josefraige@gmail.com</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-800 text-white text-center py-4 text-sm">
        <p>EPICUS PARQUES INDUSTRIALES © 2026 | Parques Industriales Premium</p>
      </div>
    </div>
  )
}
