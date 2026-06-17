'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (!res.ok) {
      setError('Incorrect password. Please try again.')
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#050A14] px-4">
      <div className="w-full max-w-sm glass-card-cyan rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center mb-4">
            <Lock size={20} className="text-[#00D4FF]" />
          </div>
          <h1 className="font-poppins font-bold text-xl text-[#F0F4FF]">Admin Login</h1>
          <p className="text-[#6B7FA3] text-sm mt-1">TruEye Blog Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-[#6B7FA3] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#00D4FF] text-black font-semibold text-sm rounded-full hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </section>
  )
}
