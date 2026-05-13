'use client'

import { useEffect, useState } from 'react'

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(data => {
        setUsers(data.users || [])
        setLoading(false)
      })
  }, [])

  const filtered = users.filter((u: any) =>
    (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.username || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.prenom || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.nom || '').toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div style={{ background: '#252018', borderRadius: '12px', height: '300px', opacity: 0.5 }} />
  )

  return (
    <div>
      <h1 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#FFFFFF' }}>Utilisateurs</h1>

      {/* Barre de recherche */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Rechercher par email, pseudo, prénom ou nom..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            background: '#252018',
            border: '1px solid #3A3020',
            borderRadius: '8px',
            padding: '10px 14px',
            color: '#FFFFFF',
            fontSize: '14px',
            outline: 'none',
          }}
        />
      </div>

      {/* Tableau */}
      <div style={{ background: '#252018', border: '1px solid #3A3020', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#1E1B14', borderBottom: '1px solid #3A3020' }}>
                {['Email', 'Pseudo', 'Nom', 'Société', 'Niveau', 'Rôle', 'Inscrit le', 'Actif'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#C8B48E', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u: any) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #3A3020' }}>
                  <td style={{ padding: '12px 16px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>{u.email}</td>
                  <td style={{ padding: '12px 16px', color: '#C8B48E' }}>@{u.username}</td>
                  <td style={{ padding: '12px 16px', color: '#FFFFFF' }}>{u.prenom} {u.nom}</td>
                  <td style={{ padding: '12px 16px', color: '#C8B48E' }}>{u.societe || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#C8B48E' }}>{u.niveau || '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      background: u.role === 'admin' ? '#E2B84A' : '#3A3020',
                      color: u.role === 'admin' ? '#161410' : '#C8B48E',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#C8B48E', whiteSpace: 'nowrap' }}>
                    {u.created_at ? new Date(u.created_at).toLocaleDateString('fr-FR') : '—'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      background: u.is_active ? '#1a3a1a' : '#3a1a1a',
                      color: u.is_active ? '#4ade80' : '#f87171',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}>
                      {u.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: '#C8B48E' }}>Aucun utilisateur trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
