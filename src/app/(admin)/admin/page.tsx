'use client'

import { useEffect, useState } from 'react'

export default function AdminDashboard() {
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
      {[1,2,3,4].map(i => (
        <div key={i} style={{ background: '#252018', borderRadius: '12px', height: '100px', opacity: 0.5 }} />
      ))}
    </div>
  )

  const maxCount = Math.max(...(stats?.usersByDay?.map((d: any) => parseInt(d.count)) || [1]), 1)

  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#FFFFFF' }}>Dashboard SuperAdmin</h1>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Users', value: stats?.totalUsers || 0, icon: '👥' },
          { label: "Nouveaux aujourd'hui", value: stats?.newToday || 0, icon: '🆕' },
          { label: 'Sessions coaching', value: stats?.totalSessions || 0, icon: '💬' },
          { label: 'Entrées mémoire', value: stats?.memoryEntries || 0, icon: '🧠' },
        ].map(card => (
          <div key={card.label} style={{ background: '#252018', border: '1px solid #3A3020', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{card.icon}</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#E2B84A', marginBottom: '4px' }}>{card.value}</div>
            <div style={{ fontSize: '13px', color: '#C8B48E' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Graphique inscriptions 30 jours */}
      <div style={{ background: '#252018', border: '1px solid #3A3020', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#FFFFFF' }}>Inscriptions (30 derniers jours)</h2>
        {(!stats?.usersByDay || stats.usersByDay.length === 0) ? (
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C8B48E', fontSize: '14px' }}>
            Pas encore de données
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '200px' }}>
            {stats.usersByDay.map((day: any, idx: number) => {
              const h = (parseInt(day.count) / maxCount) * 200
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                  <div
                    style={{
                      width: '100%',
                      height: `${h}px`,
                      background: '#E2B84A',
                      borderRadius: '2px 2px 0 0',
                      transition: 'height 0.3s ease',
                      minHeight: h > 0 ? '2px' : '0px',
                    }}
                    title={`${day.date}: ${day.count} utilisateur(s)`}
                  />
                  <span style={{ fontSize: '10px', color: '#C8B48E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                    {new Date(day.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
