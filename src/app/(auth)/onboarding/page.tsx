'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MLM_COMPANIES = ['Herbalife', 'Forever Living', 'Amway', 'Autres']
const LEVELS = ['Débutant', 'Intermédiaire', 'Expert']

export default function OnboardingPage() {
  const router = useRouter()
  const [company, setCompany] = useState('')
  const [level, setLevel] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!company || !level) return

    setLoading(true)
    // Ici on pourrait sauvegarder les préférences utilisateur
    // Pour l'instant on redirige directement vers le dashboard
    router.push('/')
  }

  return (
    <div className="w-full max-w-md px-6">
      {/* Titre */}
      <h1
        className="text-3xl font-bold text-center mb-2"
        style={{ fontFamily: 'var(--font-title), sans-serif', color: 'var(--text)' }}
      >
        Bienvenue sur Upline.ai 🏔️
      </h1>
      <p className="text-center mb-10" style={{ color: 'var(--text-muted)' }}>
        Quelques infos pour personnaliser Atlas
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Société MLM */}
        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
            Votre société MLM
          </label>
          <div className="grid grid-cols-2 gap-2">
            {MLM_COMPANIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCompany(c)}
                className="py-3 px-4 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: company === c ? 'var(--gold-bg)' : 'var(--bg-input)',
                  color: company === c ? 'var(--gold)' : 'var(--text-secondary)',
                  border: `1px solid ${company === c ? 'var(--gold)' : 'var(--border)'}`,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Niveau */}
        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
            Votre niveau
          </label>
          <div className="grid grid-cols-3 gap-2">
            {LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                className="py-3 px-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: level === l ? 'var(--gold-bg)' : 'var(--bg-input)',
                  color: level === l ? 'var(--gold)' : 'var(--text-secondary)',
                  border: `1px solid ${level === l ? 'var(--gold)' : 'var(--border)'}`,
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !company || !level}
          className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
          {loading ? 'Démarrage...' : 'Démarrer avec Atlas →'}
        </button>
      </form>
    </div>
  )
}
