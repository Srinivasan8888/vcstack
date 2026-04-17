'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
      router.refresh()
    } else {
      const { error } = await res.json().catch(() => ({ error: 'Login failed' }))
      setError(error || 'Invalid password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--paper)' }}>
      <div className="w-full" style={{ maxWidth: 'var(--modal-max)' }}>
        <div className="masthead mb-8">
          <div className="masthead-title">IndianVCs</div>
          <div className="masthead-sub">Admin · Edition</div>
        </div>

        <div className="p-8" style={{ border: '1px solid var(--rule)', background: 'var(--paper)' }}>
          <div className="section-header">Authorized Personnel Only</div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Enter admin password"
              />
            </div>

            {error && <div className="error" style={{ padding: '12px' }}>{error}</div>}

            <button type="submit" className="btn btn--primary w-full justify-center" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="btn btn--ghost">← Return to paper</a>
        </div>
      </div>
    </div>
  )
}
