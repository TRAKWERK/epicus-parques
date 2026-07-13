'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (password === 'Trakwerk72661%') {
      localStorage.setItem('auth_token', 'authenticated')
      router.push('/dashboard')
    } else {
      setError('❌ Contraseña incorrecta')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">🏭 TRAKWERK PARQUES INDUSTRIALES</h1>
        <p className="text-lg">Terrenos y lotes para tu negocio en Monterrey</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Acceso Restringido</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
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
              className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition disabled:bg-gray-400"
            >
              {isLoading ? 'Entrando...' : 'Acceder'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
