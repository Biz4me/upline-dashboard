'use client'

import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
}

export default function Profil() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    fetch('/api/user/me')
      .then(r => r.json())
      .then(data => {
        setUserData(data)
        setForm(data.user || {})
        setLoading(false)
      })
  }, [])

  const calcScore = (user: any, memory: any) => {
    let score = 0
    if (user?.email) score += 10
    if (user?.username) score += 5
    if (user?.prenom && user?.nom) score += 10
    if (memory?.profil?.societe || memory?.profil_detail?.societe) score += 15
    if (user?.telephone) score += 5
    if (user?.ville && user?.pays) score += 5
    if (user?.bio) score += 5
    if (memory?.profil_detail?.niveau) score += 10
    if (memory?.profil_detail?.objectif) score += 10
    if (memory?.profil_detail?.temps_semaine) score += 5
    return Math.min(score, 100)
  }

  const handleSave = async () => {
    const res = await fetch('/api/user/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setEditing(false)
      window.location.reload()
    }
  }

  if (loading) return (
    <div style={{ padding: '24px' }}>
      {[1,2,3].map(i => (
        <div key={i} style={{ background: 'var(--bg-card)', borderRadius: '12px', height: '120px', marginBottom: '16px', opacity: 0.5 }} />
      ))}
    </div>
  )

  const user = userData?.user || {}
  const memory = userData?.memory || {}
  const score = userData ? calcScore(userData.user, userData.memory) : 0
  const scoreMessage = score <= 30 ? "Atlas manque d'infos pour bien te coacher 🤔"
    : score <= 60 ? "Bon début ! Complète ton profil pour un coaching personnalisé 📈"
    : score <= 90 ? "Presque parfait ! Encore quelques infos 🎯"
    : "Profil complet ! Atlas te connaît parfaitement 🏔️"

  const initials = user?.prenom && user?.nom
    ? `${user.prenom[0]}${user.nom[0]}`.toUpperCase()
    : (user?.username ? user.username[0].toUpperCase() : '?')

  const displayName = user?.prenom && user?.nom
    ? `${user.prenom} ${user.nom}`
    : (user?.username || 'Utilisateur')

  const societe = memory?.profil?.societe || memory?.profil_detail?.societe

  return (
    <div className="space-y-5 max-w-2xl">

      {/* Header */}
      <div>
        <h1 className="text-[var(--text-muted)]xl font-semibold text-[var(--text)]">Mon Profil</h1>
        <p className="text-[var(--text-secondary)] mt-1">Gérez votre compte et vos préférences</p>
      </div>

      {/* Identité */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#E2B84A] flex items-center justify-center text-black font-bold text-xl flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[var(--text-on-card)] text-base font-semibold truncate">{displayName}</h2>
            <p className="text-[var(--text-muted)] text-xs truncate">{user?.email || '—'}</p>
            <span className="text-xs bg-[#E2B84A]/15 text-[#E2B84A] border border-[#E2B84A]/20 px-2 py-0.5 rounded-full inline-block mt-1">@{user?.username || '—'}</span>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="flex-shrink-0 text-xs bg-[var(--gold-muted)] hover:bg-[var(--gold-muted)] text-[var(--text-secondary)] px-3 py-2 rounded-lg transition-colors"
          >
            ✏️
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[var(--text-muted)] text-xs mb-1">Email</div>
            <div className="text-[var(--text-secondary-on-card)] text-xs truncate">{user?.email || '—'}</div>
          </div>
          <div>
            <div className="text-[var(--text-muted)] text-xs mb-1">Membre depuis</div>
            <div className="text-[var(--text-secondary-on-card)] text-xs">{formatDate(user?.created_at)}</div>
          </div>
        </div>
      </div>

      {/* Barre de complétion */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ color: 'var(--text)', fontWeight: '600', fontSize: '14px' }}>Complétion du profil</span>
          <span style={{ color: 'var(--gold)', fontWeight: '700', fontSize: '14px' }}>{score}%</span>
        </div>
        <div style={{ background: 'var(--border)', borderRadius: '4px', height: '8px', marginBottom: '14px' }}>
          <div style={{ background: 'var(--gold)', borderRadius: '4px', height: '8px', width: `${score}%`, transition: 'width 0.5s ease' }} />
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>{scoreMessage}</p>
      </div>

      {/* Infos personnelles */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[var(--text-on-card)] font-medium">Informations personnelles</h3>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-xs bg-[var(--gold-muted)] hover:bg-[var(--gold-muted)] text-[var(--text-secondary)] px-3 py-1.5 rounded-lg transition-colors"
            >
              ✏️ Modifier
            </button>
          )}
        </div>
        {editing ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[var(--text-muted)] text-xs block mb-1">Prénom</label>
                <input
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)]"
                  value={form.prenom || ''}
                  onChange={e => setForm({ ...form, prenom: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[var(--text-muted)] text-xs block mb-1">Nom</label>
                <input
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)]"
                  value={form.nom || ''}
                  onChange={e => setForm({ ...form, nom: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-[var(--text-muted)] text-xs block mb-1">Téléphone</label>
              <input
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)]"
                value={form.telephone || ''}
                onChange={e => setForm({ ...form, telephone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[var(--text-muted)] text-xs block mb-1">Ville</label>
                <input
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)]"
                  value={form.ville || ''}
                  onChange={e => setForm({ ...form, ville: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[var(--text-muted)] text-xs block mb-1">Pays</label>
                <input
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)]"
                  value={form.pays || ''}
                  onChange={e => setForm({ ...form, pays: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-[var(--text-muted)] text-xs block mb-1">Bio</label>
              <textarea
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)]"
                rows={3}
                value={form.bio || ''}
                onChange={e => setForm({ ...form, bio: e.target.value })}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSave}
                className="text-xs bg-[#E2B84A] hover:bg-[#d4a83e] text-black px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Sauvegarder
              </button>
              <button
                onClick={() => { setEditing(false); setForm(user) }}
                className="text-xs bg-[var(--bg)] hover:bg-[var(--border)] text-[var(--text-secondary)] px-4 py-2 rounded-lg transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[var(--text-muted)] text-xs mb-1">Prénom</div>
              <div className="text-[var(--text-secondary-on-card)] text-xs">{user?.prenom || '—'}</div>
            </div>
            <div>
              <div className="text-[var(--text-muted)] text-xs mb-1">Nom</div>
              <div className="text-[var(--text-secondary-on-card)] text-xs">{user?.nom || '—'}</div>
            </div>
            <div>
              <div className="text-[var(--text-muted)] text-xs mb-1">Téléphone</div>
              <div className="text-[var(--text-secondary-on-card)] text-xs">{user?.telephone || '—'}</div>
            </div>
            <div>
              <div className="text-[var(--text-muted)] text-xs mb-1">Ville</div>
              <div className="text-[var(--text-secondary-on-card)] text-xs">{user?.ville || '—'}</div>
            </div>
            <div>
              <div className="text-[var(--text-muted)] text-xs mb-1">Pays</div>
              <div className="text-[var(--text-secondary-on-card)] text-xs">{user?.pays || '—'}</div>
            </div>
            <div className="col-span-2">
              <div className="text-[var(--text-muted)] text-xs mb-1">Bio</div>
              <div className="text-[var(--text-secondary-on-card)] text-xs">{user?.bio || '—'}</div>
            </div>
          </div>
        )}
      </div>

      {/* Société MLM */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[var(--text-on-card)] font-medium">Ma société MLM</h3>
          {!societe && (
            <button className="text-xs bg-[var(--gold-muted)] hover:bg-[var(--gold-muted)] text-[var(--text-secondary)] px-3 py-1.5 rounded-lg transition-colors">
              + Ajouter
            </button>
          )}
        </div>
        {societe ? (
          <div className="flex items-center gap-3 p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
            <div className="w-8 h-8 bg-[#E2B84A]/20 rounded-lg flex items-center justify-center text-[#E2B84A] text-sm font-bold">
              {societe[0].toUpperCase()}
            </div>
            <div>
              <div className="text-[var(--text-on-card)] text-sm font-medium">{societe}</div>
              <div className="text-[var(--text-muted)] text-xs">Distributeur</div>
            </div>
            <span className="ml-auto text-xs bg-[#E2B84A]/10 text-[#E2B84A] px-2 py-1 rounded-full">Active</span>
          </div>
        ) : (
          <p className="text-[var(--text-muted)] text-xs">Aucune société renseignée. Ajoutez-en une pour personnaliser votre coaching.</p>
        )}
        <p className="text-[var(--text-muted)] text-xs mt-3">Upline.ai est agnostique — vous pouvez ajouter plusieurs sociétés</p>
      </div>

      {/* Abonnement */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <h3 className="text-[var(--text-on-card)] font-medium mb-4">Abonnement</h3>
        <div className="flex items-center justify-between p-4 bg-[#E2B84A]/5 border border-[#E2B84A]/20 rounded-xl mb-4">
          <div>
            <div className="text-[#E2B84A] font-semibold">⭐ Premium</div>
            <div className="text-[var(--text-muted)] text-sm">Renouvellement le 12 Juin 2026</div>
          </div>
          <div className="text-right">
            <div className="text-[var(--text-on-card)] font-bold">$19<span className="text-[var(--text-muted)] text-sm">/mois</span></div>
            <button className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mt-1">Gérer</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-[var(--bg)] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-lg">∞</div>
            <div className="text-[var(--text-muted)] text-xs">Messages Atlas</div>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-lg">✅</div>
            <div className="text-[var(--text-muted)] text-xs">RAG société</div>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-lg">📄</div>
            <div className="text-[var(--text-muted)] text-xs">Export PDF</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <h3 className="text-[var(--text-on-card)] font-medium mb-4">Mes statistiques</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-[var(--bg)] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-xl">12</div>
            <div className="text-[var(--text-muted)] text-sm">Sessions Atlas</div>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-xl">7</div>
            <div className="text-[var(--text-muted)] text-sm">Streak actuel</div>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-xl">3</div>
            <div className="text-[var(--text-muted)] text-sm">Badges obtenus</div>
          </div>
          <div className="p-3 bg-[var(--bg)] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-xl">2</div>
            <div className="text-[var(--text-muted)] text-sm">Filleuls actifs</div>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <h3 className="text-[var(--text-on-card)] font-medium mb-4">Documents & Export</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between gap-2 p-3 bg-[var(--bg)] hover:bg-[var(--gold-muted)] rounded-lg transition-colors">
            <span className="text-[var(--text-secondary-on-card)] text-sm truncate">📄 Rapport mensuel Mai 2026</span>
            <span className="text-[#E2B84A] text-xs flex-shrink-0">PDF</span>
          </button>
          <button className="w-full flex items-center justify-between gap-2 p-3 bg-[var(--bg)] hover:bg-[var(--gold-muted)] rounded-lg transition-colors">
            <span className="text-[var(--text-secondary-on-card)] text-sm truncate">💳 Carte de visite digitale</span>
            <span className="text-[#E2B84A] text-xs flex-shrink-0">Voir</span>
          </button>
          <button className="w-full flex items-center justify-between gap-2 p-3 bg-[var(--bg)] hover:bg-[var(--gold-muted)] rounded-lg transition-colors">
            <span className="text-[var(--text-secondary-on-card)] text-sm truncate">📊 Historique coaching</span>
            <span className="text-[#E2B84A] text-xs flex-shrink-0">Export</span>
          </button>
        </div>
      </div>

      {/* Paramètres */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <h3 className="text-[var(--text-on-card)] font-medium mb-4">Paramètres</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[var(--bg)] rounded-lg">
            <span className="text-[var(--text-secondary-on-card)] text-sm">🌙 Mode sombre</span>
            <div className="w-10 h-5 bg-[#E2B84A] rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-black rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[var(--bg)] rounded-lg">
            <span className="text-[var(--text-secondary-on-card)] text-sm">🔔 Notifications push</span>
            <div className="w-10 h-5 bg-[#E2B84A] rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-black rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[var(--bg)] rounded-lg">
            <span className="text-[var(--text-secondary-on-card)] text-sm">🌍 Langue</span>
            <span className="text-[#E2B84A] text-sm">Français</span>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-[var(--bg-card)] border border-red-900/30 rounded-xl p-6 text-[var(--text-on-card)]">
        <h3 className="text-red-400 font-medium mb-3">Zone de danger</h3>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-sm text-red-400 hover:text-red-300 transition-colors block mb-2"
        >
          Se déconnecter
        </button>
        <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
          Supprimer mon compte
        </button>
      </div>

    </div>
  )
}
