'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          prenom: firstName,
          nom: lastName,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erreur lors de l\'inscription')
        setLoading(false)
        return
      }

      // Connexion automatique après inscription
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Compte créé mais erreur de connexion')
        setLoading(false)
        return
      }

      router.push('/onboarding')
    } catch {
      setError('Erreur serveur')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md px-6">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-1 text-2xl font-bold" style={{ fontFamily: 'var(--font-title), sans-serif' }}>
          <span style={{ color: 'var(--text)' }}>Upline.</span>
          <span style={{ color: 'var(--gold)' }}>ai</span>
          <span style={{ color: 'var(--gold)' }} className="text-3xl ml-0.5">A</span>
        </div>
      </div>

      {/* Titre */}
      <h1
        className="text-3xl font-bold text-center mb-2"
        style={{ fontFamily: 'var(--font-title), sans-serif', color: 'var(--text)' }}
      >
        Créer mon compte
      </h1>
      <p className="text-center mb-8" style={{ color: 'var(--text-muted)' }}>
        Rejoignez Upline.ai et propulsez votre MLM
      </p>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Prénom
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
              style={{
                background: 'var(--bg-input)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
              }}
              placeholder="Jean"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Nom
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
              style={{
                background: 'var(--bg-input)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
              }}
              placeholder="Dupont"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
            style={{
              background: 'var(--bg-input)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
            }}
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
            style={{
              background: 'var(--bg-input)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
            }}
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
            style={{
              background: 'var(--bg-input)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
            }}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
          style={{
            background: 'var(--gold)',
            color: '#fff',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = 'var(--gold-hover)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = 'var(--gold)'
          }}
        >
          {loading ? 'Création...' : 'Créer mon compte'}
        </button>
      </form>

      {/* Lien connexion */}
      <p className="text-center mt-6 text-sm" style={{ color: 'var(--text-muted)' }}>
        Déjà un compte ?{' '}
        <Link
          href="/login"
          className="font-medium transition-colors"
          style={{ color: 'var(--gold)' }}
        >
          Se connecter
        </Link>
      </p>
    </div>
  )
}
