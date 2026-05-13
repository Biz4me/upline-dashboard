'use client'

import { useSession } from 'next-auth/react'
import AtlasChat from '@/components/atlas/AtlasChat'

export default function Accueil() {
  const { data: session, status } = useSession()
  const userId = status === 'authenticated' ? session?.user?.id || 'anonymous' : 'anonymous'
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[var(--text-muted)]xl font-semibold mb-2" style={{ color: 'var(--text)' }}>
          Bonjour, Patrice 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Streak 7 jours · Niveau Explorateur</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { val: '12', label: 'Sessions' },
          { val: '84%', label: 'Formation' },
          { val: '3', label: 'Badges' },
          { val: '2', label: 'Filleuls' },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-4"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="text-[var(--text-muted)]xl font-bold" style={{ color: 'var(--gold)' }}>{s.val}</div>
            <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-6"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium" style={{ color: 'var(--text-on-card)' }}>Formation en cours</h2>
          <span className="text-sm font-medium" style={{ color: 'var(--gold)' }}>Module 3/8</span>
        </div>
        <div className="w-full rounded-full h-2 mb-2" style={{ background: 'var(--border)' }}>
          <div className="h-2 rounded-full" style={{ width: '37%', background: 'var(--gold)' }}></div>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Les techniques de prospection avancées
        </p>
      </div>

      <AtlasChat
        sessionId={userId}
        userId={userId}
        suggestions={[
          '💡 Conseil du jour',
          '📊 Analyser mon réseau',
        ]}
      />

      <div className="rounded-xl p-6"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <h2 className="font-medium mb-4" style={{ color: 'var(--text-on-card)' }}>Activité récente</h2>
        <div className="space-y-3">
          {[
            { texte: 'Module 3 — Leçon 2 complétée', temps: "Aujourd'hui", actif: true },
            { texte: 'Badge "Prospecteur" débloqué', temps: 'Hier', actif: false },
            { texte: 'Nouveau filleul ajouté', temps: 'Il y a 2 jours', actif: false },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: a.actif ? 'var(--gold)' : 'var(--border)' }}></div>
                <span className="text-sm" style={{ color: a.actif ? 'var(--text-secondary-on-card)' : 'var(--text-muted)' }}>
                {a.texte}
              </span>
              <span className="text-xs ml-auto flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                {a.temps}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
