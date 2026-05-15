'use client'
import { useState } from 'react'
import { Plus, Phone, Search, Users, TrendingUp, UserCheck, Target } from 'lucide-react'

const initialProspects = [
  { id: 1, name: 'Marie Dupont', initials: 'M', note: 'Relancer jeudi', temp: 'Chaud', status: 'Suivi', color: '#EF4444' },
  { id: 2, name: 'Jean Martin', initials: 'J', note: 'Présentation lundi', temp: 'Tiède', status: 'Invité', color: '#F59E0B' },
  { id: 3, name: 'Sophie Bernard', initials: 'S', note: 'Appeler cette semaine', temp: 'Chaud', status: 'Liste', color: '#EF4444' },
  { id: 4, name: 'Pierre Dubois', initials: 'P', note: 'Suivi dans 3 jours', temp: 'Froid', status: 'Présenté', color: '#22D3EE' },
  { id: 5, name: 'Laura Petit', initials: 'L', note: 'Démarrage lundi', temp: 'Tiède', status: 'Oui !', color: '#F59E0B' },
]

const tempColors: Record<string, { bg: string; color: string }> = {
  'Chaud': { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
  'Tiède': { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  'Froid': { bg: 'rgba(34,211,238,0.12)', color: '#22D3EE' },
}

const statusColors: Record<string, { bg: string; color: string }> = {
  'Liste': { bg: 'rgba(100,116,139,0.12)', color: '#94A3B8' },
  'Invité': { bg: 'rgba(109,94,245,0.12)', color: '#a78bfa' },
  'Présenté': { bg: 'rgba(34,211,238,0.12)', color: '#22D3EE' },
  'Suivi': { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  'Oui !': { bg: 'rgba(34,197,94,0.12)', color: '#22C55E' },
}

export default function BusinessPage() {
  const [view, setView] = useState<'liste' | 'pipeline'>('liste')
  const [search, setSearch] = useState('')
  const prospects = initialProspects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { label: 'En liste', value: 1, icon: Users, color: '#6D5EF5' },
    { label: 'Invités', value: 1, icon: TrendingUp, color: '#22D3EE' },
    { label: 'En suivi', value: 1, icon: UserCheck, color: '#FF9600' },
    { label: 'Convertis', value: 1, icon: Target, color: '#22C55E' },
  ]

  const pipeline = ['Liste', 'Invité', 'Présenté', 'Suivi', 'Oui !']

  return (
    <div className="overflow-x-fix page-padding" style={{ maxWidth: 1100, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 4, fontFamily: 'var(--font-title)' }}>
            Mon Business
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Pipeline Herbalife · {prospects.length} prospects actifs</p>
        </div>
        <button style={{
          background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
          border: 'none', color: 'white', borderRadius: 12,
          padding: '10px 20px', fontSize: 13, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 12px rgba(109,94,245,0.35)',
        }}>
          <Plus size={16} strokeWidth={2.5} />
          + Prospect
        </button>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          )
        })}
      </div>

      {/* Tabs + Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 4 }}>
          {(['liste', 'pipeline'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              background: view === v ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'transparent',
              border: 'none', color: view === v ? 'white' : 'var(--text-secondary)',
              borderRadius: 9, padding: '8px 20px', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s',
            }}>
              {v === 'liste' ? 'Liste' : 'Pipeline'}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un prospect..."
            style={{
              width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '10px 14px 10px 38px', fontSize: 13,
              color: 'var(--text)', outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Vue Liste */}
      {view === 'liste' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {prospects.map((p, i) => (
            <div key={p.id} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
              borderBottom: i < prospects.length - 1 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.15s', cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-bg)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: `${p.color}20`, border: `2px solid ${p.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: p.color,
              }}>
                {p.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.note}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: tempColors[p.temp]?.bg, color: tempColors[p.temp]?.color }}>
                  {p.temp}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: statusColors[p.status]?.bg, color: statusColors[p.status]?.color, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {p.status === 'Oui !' ? '✅' : p.status === 'Présenté' ? '👁' : p.status === 'Invité' ? '📞' : p.status === 'Suivi' ? '📋' : '📝'} {p.status}
                </span>
                <button style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(109,94,245,0.1)', border: '1px solid rgba(109,94,245,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Phone size={14} color="#a78bfa" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vue Pipeline */}
      {view === 'pipeline' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {pipeline.map(stage => (
            <div key={stage} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {stage}
                <span style={{ background: 'rgba(109,94,245,0.1)', color: '#a78bfa', fontSize: 11, fontWeight: 800, padding: '2px 7px', borderRadius: 20 }}>
                  {prospects.filter(p => p.status === stage).length}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {prospects.filter(p => p.status === stage).map(p => (
                  <div key={p.id} style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.note}</div>
                    <div style={{ marginTop: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: tempColors[p.temp]?.bg, color: tempColors[p.temp]?.color }}>
                        {p.temp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
