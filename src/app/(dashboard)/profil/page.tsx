'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Edit2, Check, User, Mail, Phone, MapPin, Globe, FileText, Calendar, Trophy, Sparkles } from 'lucide-react'

export default function ProfilPage() {
  const { data: session } = useSession()
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    ville: '', pays: '', bio: '', societe: '', niveau: '', objectif: ''
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user/me')
        if (res.ok) {
          const data = await res.json()
          setProfile({
            prenom: data.prenom || '',
            nom: data.nom || '',
            email: data.email || '',
            telephone: data.telephone || '',
            ville: data.ville || '',
            pays: data.pays || '',
            bio: data.bio || '',
            societe: data.societe || '',
            niveau: data.niveau || '',
            objectif: data.objectif || '',
          })
        }
      } catch {}
    }
    fetchProfile()
  }, [])

  const completionScore = () => {
    const fields = [profile.prenom, profile.nom, profile.email, profile.telephone,
      profile.ville, profile.pays, profile.bio, profile.societe, profile.niveau, profile.objectif]
    const filled = fields.filter(f => f && f.trim() !== '').length
    return Math.round((filled / fields.length) * 100)
  }

  const score = completionScore()
  const scoreColor = score >= 90 ? '#22C55E' : score >= 60 ? '#6D5EF5' : score >= 30 ? '#FF9600' : '#EF4444'
  const scoreMsg = score >= 90 ? '✨ Profil complet — Atlas te connaît parfaitement !'
    : score >= 60 ? '💪 Bon début ! Quelques infos manquantes.'
    : score >= 30 ? '📝 Complète ton profil pour un coaching personnalisé 📋'
    : '🚀 Commence par remplir tes infos de base !'

  const handleSave = async () => {
    try {
      await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      setSaved(true)
      setEditing(false)
      setTimeout(() => setSaved(false), 2000)
    } catch {}
  }

  const initials = `${profile.prenom?.[0] || ''}${profile.nom?.[0] || ''}`.toUpperCase() || 'U'

  const inputStyle = {
    background: editing ? 'var(--bg-page)' : 'transparent',
    border: editing ? '1.5px solid rgba(109,94,245,0.3)' : '1.5px solid transparent',
    borderRadius: 10, padding: '10px 14px', fontSize: 14,
    color: 'var(--text)', outline: 'none', width: '100%',
    transition: 'all 0.15s',
  }

  return (
    <div className="overflow-x-fix page-padding" style={{ maxWidth: 800, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 4, fontFamily: 'var(--font-title)' }}>
          Mon Profil
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Gérez votre compte et vos préférences</p>
      </div>

      {/* Avatar + infos principales */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, fontWeight: 800, color: 'white',
          boxShadow: '0 4px 16px rgba(109,94,245,0.35)',
        }}>
          {initials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>
            {profile.prenom} {profile.nom}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{profile.email}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 700, background: 'rgba(109,94,245,0.1)', color: '#a78bfa', padding: '3px 10px', borderRadius: 20 }}>
              @{session?.user?.name?.toLowerCase().replace(' ', '') || 'utilisateur'}
            </span>
            {profile.societe && (
              <span style={{ fontSize: 12, fontWeight: 700, background: 'rgba(34,211,238,0.1)', color: '#22D3EE', padding: '3px 10px', borderRadius: 20 }}>
                {profile.societe}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          {saved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22C55E', fontSize: 13, fontWeight: 700 }}>
              <Check size={16} /> Sauvegardé !
            </div>
          )}
          <button
            onClick={editing ? handleSave : () => setEditing(true)}
            style={{
              background: editing ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'rgba(109,94,245,0.1)',
              border: editing ? 'none' : '1.5px solid rgba(109,94,245,0.25)',
              color: editing ? 'white' : '#a78bfa',
              borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: editing ? '0 4px 12px rgba(109,94,245,0.3)' : 'none',
            }}
          >
            {editing ? <><Check size={14} /> Sauvegarder</> : <><Edit2 size={14} /> Modifier</>}
          </button>
        </div>
      </div>

      {/* Complétion profil */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} color="#6D5EF5" />
            Complétion du profil
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: scoreColor }}>{score}%</span>
        </div>
        <div style={{ height: 10, background: 'var(--muted)', borderRadius: 5, overflow: 'hidden', marginBottom: 10 }}>
          <div style={{ width: `${score}%`, height: '100%', background: `linear-gradient(135deg, #6D5EF5, #22D3EE)`, borderRadius: 5, transition: 'width 0.5s' }} />
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{scoreMsg}</p>
      </div>

      {/* Informations personnelles */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <User size={16} color="#6D5EF5" />
            Informations personnelles
          </div>
        </div>
        <div className="grid-2">
          {[
            { label: 'Prénom', key: 'prenom', icon: User },
            { label: 'Nom', key: 'nom', icon: User },
            { label: 'Email', key: 'email', icon: Mail },
            { label: 'Téléphone', key: 'telephone', icon: Phone },
            { label: 'Ville', key: 'ville', icon: MapPin },
            { label: 'Pays', key: 'pays', icon: Globe },
          ].map(({ label, key, icon: Icon }) => (
            <div key={key}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon size={12} color="#6D5EF5" />
                {label}
              </div>
              {editing ? (
                <input
                  value={profile[key as keyof typeof profile]}
                  onChange={e => setProfile(prev => ({ ...prev, [key]: e.target.value }))}
                  style={inputStyle}
                />
              ) : (
                <div style={{ fontSize: 14, color: profile[key as keyof typeof profile] ? 'var(--text)' : 'var(--text-muted)', padding: '10px 14px' }}>
                  {profile[key as keyof typeof profile] || '—'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bio */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <FileText size={12} color="#6D5EF5" />
            Bio
          </div>
          {editing ? (
            <textarea
              value={profile.bio}
              onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          ) : (
            <div style={{ fontSize: 14, color: profile.bio ? 'var(--text)' : 'var(--text-muted)', padding: '10px 14px', lineHeight: 1.6 }}>
              {profile.bio || '—'}
            </div>
          )}
        </div>
      </div>

      {/* MLM */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Trophy size={16} color="#6D5EF5" />
          Mon activité MLM
        </div>
        <div className="grid-2">
          {[
            { label: 'Société MLM', key: 'societe' },
            { label: 'Niveau actuel', key: 'niveau' },
          ].map(({ label, key }) => (
            <div key={key}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{label}</div>
              {editing ? (
                <input value={profile[key as keyof typeof profile]} onChange={e => setProfile(prev => ({ ...prev, [key]: e.target.value }))} style={inputStyle} />
              ) : (
                <div style={{ fontSize: 14, color: profile[key as keyof typeof profile] ? 'var(--text)' : 'var(--text-muted)', padding: '10px 14px' }}>
                  {profile[key as keyof typeof profile] || '—'}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Objectif principal</div>
          {editing ? (
            <input value={profile.objectif} onChange={e => setProfile(prev => ({ ...prev, objectif: e.target.value }))} style={inputStyle} placeholder="Ex: Atteindre le rang Diamant en 6 mois..." />
          ) : (
            <div style={{ fontSize: 14, color: profile.objectif ? 'var(--text)' : 'var(--text-muted)', padding: '10px 14px' }}>
              {profile.objectif || '—'}
            </div>
          )}
        </div>
      </div>

      {/* Infos compte */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={16} color="#6D5EF5" />
          Informations du compte
        </div>
        <div className="grid-2">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Email</div>
            <div style={{ fontSize: 14, color: 'var(--text)', padding: '10px 14px' }}>{profile.email}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Membre depuis</div>
            <div style={{ fontSize: 14, color: 'var(--text)', padding: '10px 14px' }}>mai 2026</div>
          </div>
        </div>
      </div>
    </div>
  )
}
