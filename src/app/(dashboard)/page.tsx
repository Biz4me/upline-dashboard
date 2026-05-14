'use client'

import { useSession } from 'next-auth/react'
import AtlasChat from '@/components/atlas/AtlasChat'

export default function Accueil() {
  const { data: session, status } = useSession()
  const userId = status === 'authenticated' ? session?.user?.id || 'anonymous' : 'anonymous'
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-[36px] font-bold mb-3.5" style={{ color: 'var(--text)', letterSpacing: '-0.5px' }}>
          Bonjour, Patrice 👋
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '14px' }}>Streak 7 jours · Niveau Explorateur</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { val: '12', label: 'Sessions' },
          { val: '84%', label: 'Formation' },
          { val: '3', label: 'Badges' },
          { val: '2', label: 'Filleuls' },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-6"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', minHeight: '90px', justifyContent: 'center', flexDirection: 'column', display: 'flex' }}>
            <div className="text-[var(--text-muted)]xl font-bold" style={{ color: 'var(--gold)', fontSize: '32px', fontWeight: '800', lineHeight: '1' }}>{s.val}</div>
            <div className="text-sm mt-1" style={{ color: 'var(--text-muted)', marginTop: '6px', fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-6"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium" style={{ color: 'var(--text-on-card)', fontSize: '16px', fontWeight: '600' }}>Formation en cours</h2>
          <span className="text-sm font-medium" style={{ color: 'var(--gold)', fontSize: '13px' }}>Module 3/8</span>
        </div>
        <div className="w-full rounded-full h-2.5 mb-2" style={{ background: 'var(--border)', borderRadius: '99px' }}>
          <div className="h-2.5 rounded-full" style={{ width: '37%', background: 'var(--gold)', borderRadius: '99px' }}></div>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
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
        <h2 className="font-medium mb-4" style={{ color: 'var(--text-on-card)', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Activité récente</h2>
        <div>
          {[
            { texte: 'Module 3 — Leçon 2 complétée', temps: "Aujourd'hui", actif: true },
            { texte: 'Badge "Prospecteur" débloqué', temps: 'Hier', actif: false },
            { texte: 'Nouveau filleul ajouté', temps: 'Il y a 2 jours', actif: false },
          ].map((a, i, arr) => (
            <div key={i} className="flex items-center gap-3"
              style={{ paddingTop: '10px', paddingBottom: '10px', borderBottom: i === arr.length - 1 ? 'none' : '0.5px solid var(--border)' }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: a.actif ? 'var(--gold)' : 'var(--border)' }}></div>
                <span className="text-sm" style={{ color: a.actif ? 'var(--text-secondary-on-card)' : 'var(--text-muted)', fontSize: '13px' }}>
                {a.texte}
              </span>
              <span className="text-xs ml-auto flex-shrink-0" style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                {a.temps}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
