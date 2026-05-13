'use client'

import { useEffect, useState } from 'react'

export default function AdminAtlas() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#FFFFFF' }}>Atlas — Stats IA</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ background: '#252018', borderRadius: '12px', height: '100px', opacity: 0.5 }} />
        ))}
      </div>
      <div style={{ background: '#252018', borderRadius: '12px', height: '300px', opacity: 0.5 }} />
    </div>
  )

  const conversations = stats?.latestConversations || []

  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#FFFFFF' }}>Atlas — Stats IA</h1>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Entrées mémoire', value: stats?.memoryEntries || 0, icon: '🧠' },
          { label: "Sessions aujourd'hui", value: stats?.totalSessions || 0, icon: '💬' },
          { label: 'Messages envoyés', value: stats?.messagesSent || 0, icon: '📨' },
        ].map(card => (
          <div key={card.label} style={{ background: '#252018', border: '1px solid #3A3020', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{card.icon}</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#E2B84A', marginBottom: '4px' }}>{card.value}</div>
            <div style={{ fontSize: '13px', color: '#C8B48E' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Dernières conversations */}
      <div style={{ background: '#252018', border: '1px solid #3A3020', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #3A3020' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF' }}>Dernières conversations</h2>
          <p style={{ fontSize: '12px', color: '#C8B48E', marginTop: '4px' }}>Mises à jour récentes dans user_memory</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#1E1B14', borderBottom: '1px solid #3A3020' }}>
                {['Utilisateur', 'Clé', 'Catégorie', 'Mis à jour'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#C8B48E', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {conversations.map((c: any, idx: number) => (
                <tr key={idx} style={{ borderBottom: '1px solid #3A3020' }}>
                  <td style={{ padding: '12px 16px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                    {c.prenom || c.nom ? `${c.prenom || ''} ${c.nom || ''}`.trim() : c.email || '—'}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#C8B48E' }}>{c.cle}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      background: c.categorie === 'conversation' ? '#1a3a1a' : '#3A3020',
                      color: c.categorie === 'conversation' ? '#4ade80' : '#C8B48E',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}>
                      {c.categorie || '—'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#C8B48E', whiteSpace: 'nowrap' }}>
                    {c.updated_at ? new Date(c.updated_at).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}
                  </td>
                </tr>
              ))}
              {conversations.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#C8B48E' }}>Aucune conversation en mémoire</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
