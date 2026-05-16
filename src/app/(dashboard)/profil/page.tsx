'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useSidebar } from '@/context/SidebarContext'
import { Edit2, Check, User, Mail, Phone, MapPin, Globe, FileText, Trophy, Settings, CreditCard, Sparkles, Bell, Lock, Trash2, ChevronRight } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

const TABS = [
  { id: 'profil', label: 'Mon Profil', icon: User },
  { id: 'mlm', label: 'Mon MLM', icon: Trophy },
  { id: 'progression', label: 'Ma Progression', icon: Sparkles },
  { id: 'parametres', label: 'Paramètres', icon: Settings },
  { id: 'compte', label: 'Mon Compte', icon: CreditCard },
]

export default function ProfilPage() {
  const { data: session } = useSession()
  const { profileTab: tab, setProfileTab: setTab } = useSidebar()
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState({ email: true, push: true, rappels: true })
  const [profile, setProfile] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    ville: '', pays: '', bio: '',
    linkedin: '', instagram: '', facebook: '',
    societe: '', rang: '', dateDebut: '', upline: '',
    objectif90j: '', niveau: '', objectif: '',
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user/me')
        if (res.ok) {
          const data = await res.json()
          setProfile(prev => ({
            ...prev,
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
          }))
        }
      } catch {}
    }
    fetchProfile()
  }, [])

  const set = (k: string, v: string) => setProfile(prev => ({ ...prev, [k]: v }))

  const completionScore = () => {
    const fields = [profile.prenom, profile.nom, profile.email, profile.telephone, profile.ville, profile.pays, profile.bio, profile.societe, profile.niveau, profile.objectif, profile.linkedin, profile.rang, profile.dateDebut, profile.objectif90j]
    return Math.round((fields.filter(f => f?.trim()).length / fields.length) * 100)
  }

  const handleSave = async () => {
    try {
      await fetch('/api/user/update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) })
      setSaved(true); setEditing(false)
      setTimeout(() => setSaved(false), 2000)
    } catch {}
  }

  const score = completionScore()
  const initials = `${profile.prenom?.[0] || ''}${profile.nom?.[0] || ''}`.toUpperCase() || session?.user?.name?.[0]?.toUpperCase() || 'U'

  const inputStyle: React.CSSProperties = {
    width: '100%', background: editing ? 'var(--bg-page)' : 'transparent',
    border: editing ? '1.5px solid rgba(109,94,245,0.3)' : '1.5px solid transparent',
    borderRadius: 10, padding: '10px 14px', fontSize: 14,
    color: 'var(--text)', outline: 'none', boxSizing: 'border-box', transition: 'all 0.15s',
  }

  const Field = ({ label, k, type = 'text', placeholder = '' }: { label: string; k: string; type?: string; placeholder?: string }) => (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{label}</div>
      {editing ? (
        <input type={type} value={profile[k as keyof typeof profile]} onChange={e => set(k, e.target.value)} placeholder={placeholder} style={inputStyle}
          onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'rgba(109,94,245,0.3)'} />
      ) : (
        <div style={{ fontSize: 14, color: profile[k as keyof typeof profile] ? 'var(--text)' : 'var(--text-muted)', padding: '10px 14px' }}>
          {profile[k as keyof typeof profile] || '—'}
        </div>
      )}
    </div>
  )

  const Toggle = ({ label, desc, value, onChange }: { label: string; desc?: string; value: boolean; onChange: () => void }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{desc}</div>}
      </div>
      <button onClick={onChange} style={{ width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', background: value ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'var(--border)', position: 'relative', transition: 'all 0.2s', flexShrink: 0 }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: value ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
      </button>
    </div>
  )

  const Section = ({ title, icon: Icon, children }: { title: string; icon?: any; children: React.ReactNode }) => (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
      {title && (
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          {Icon && <Icon size={16} color="#6D5EF5" />}{title}
        </div>
      )}
      {children}
    </div>
  )

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '28px 32px 60px', overflowY: 'auto' }}>

      {/* Header section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 2, fontFamily: 'var(--font-title)' }}>
            {TABS.find(t => t.id === tab)?.label}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            {tab === 'profil' && 'Vos informations personnelles et réseaux sociaux'}
            {tab === 'mlm' && 'Votre activité et objectifs MLM'}
            {tab === 'progression' && 'Vos stats, badges et défis'}
            {tab === 'parametres' && 'Apparence, notifications et confidentialité'}
            {tab === 'compte' && 'Abonnement, sécurité et gestion du compte'}
          </p>
        </div>
        {(tab === 'profil' || tab === 'mlm') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {saved && <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22C55E', fontSize: 13, fontWeight: 700 }}><Check size={16} /> Sauvegardé !</div>}
            <button onClick={editing ? handleSave : () => setEditing(true)} style={{
              background: editing ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'rgba(109,94,245,0.1)',
              border: editing ? 'none' : '1.5px solid rgba(109,94,245,0.25)',
              color: editing ? 'white' : '#a78bfa', borderRadius: 10, padding: '9px 18px',
              fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {editing ? <><Check size={14} /> Sauvegarder</> : <><Edit2 size={14} /> Modifier</>}
            </button>
          </div>
        )}
      </div>

      {/* TAB PROFIL */}
      {tab === 'profil' && (
        <>
          <Section title="Informations personnelles" icon={User}>
            <div className="grid-2" style={{ marginBottom: 16 }}>
              <Field label="Prénom" k="prenom" placeholder="Votre prénom" />
              <Field label="Nom" k="nom" placeholder="Votre nom" />
              <Field label="Email" k="email" type="email" placeholder="votre@email.com" />
              <Field label="Téléphone" k="telephone" placeholder="+33 6 00 00 00 00" />
              <Field label="Ville" k="ville" placeholder="Paris" />
              <Field label="Pays" k="pays" placeholder="France" />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Bio</div>
              {editing ? (
                <textarea value={profile.bio} onChange={e => set('bio', e.target.value)} rows={3} placeholder="Parlez de vous..." style={{ ...inputStyle, resize: 'vertical' }} />
              ) : (
                <div style={{ fontSize: 14, color: profile.bio ? 'var(--text)' : 'var(--text-muted)', padding: '10px 14px', lineHeight: 1.6 }}>{profile.bio || '—'}</div>
              )}
            </div>
          </Section>
          <Section title="Réseaux sociaux" icon={Globe}>
            {[
              { label: 'LinkedIn', k: 'linkedin', icon: <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: 18, color: '#0A66C2' }} />, placeholder: 'linkedin.com/in/votre-profil' },
              { label: 'Instagram', k: 'instagram', icon: <FontAwesomeIcon icon={faInstagram} style={{ fontSize: 18, color: '#E1306C' }} />, placeholder: '@votre_pseudo' },
              { label: 'Facebook', k: 'facebook', icon: <FontAwesomeIcon icon={faFacebook} style={{ fontSize: 18, color: '#1877F2' }} />, placeholder: 'facebook.com/votre-profil' },
            ].map(({ label, k, icon, placeholder }) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(109,94,245,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {icon}
                </div>
                {editing ? (
                  <input value={profile[k as keyof typeof profile]} onChange={e => set(k, e.target.value)} placeholder={placeholder} style={{ ...inputStyle, flex: 1 }} />
                ) : (
                  <div style={{ fontSize: 14, color: profile[k as keyof typeof profile] ? '#6D5EF5' : 'var(--text-muted)', flex: 1, padding: '10px 14px' }}>
                    {profile[k as keyof typeof profile] || '—'}
                  </div>
                )}
              </div>
            ))}
          </Section>
        </>
      )}

      {/* TAB MLM */}
      {tab === 'mlm' && (
        <>
          <Section title="Mon activité MLM" icon={Trophy}>
            <div className="grid-2" style={{ marginBottom: 16 }}>
              <Field label="Société MLM" k="societe" placeholder="Ex: Herbalife, Amway..." />
              <Field label="Rang actuel" k="rang" placeholder="Ex: Distributeur, Manager..." />
              <Field label="Date de démarrage" k="dateDebut" type="date" />
              <Field label="Mon upline (parrain)" k="upline" placeholder="Nom de votre parrain" />
            </div>
            <Field label="Objectif à 90 jours" k="objectif90j" placeholder="Ex: Atteindre le rang Manager avant septembre" />
          </Section>
          <Section title="Mon marché & niveau" icon={MapPin}>
            <div className="grid-2" style={{ marginBottom: 16 }}>
              <Field label="Niveau actuel" k="niveau" placeholder="Débutant / Intermédiaire / Avancé / Leader" />
              <Field label="Objectif principal" k="objectif" placeholder="Ex: Rang Diamant en 6 mois" />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Marchés ciblés</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Marché chaud', 'Marché tiède', 'Marché froid', 'Réseaux sociaux', 'Événements'].map(m => (
                  <button key={m} style={{ background: 'rgba(109,94,245,0.1)', border: '1.5px solid rgba(109,94,245,0.25)', color: '#a78bfa', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{m}</button>
                ))}
              </div>
            </div>
          </Section>
        </>
      )}

      {/* TAB PROGRESSION */}
      {tab === 'progression' && (
        <>
          <Section title="Niveau & XP" icon={Sparkles}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
              <div style={{ width: 60, height: 60, borderRadius: 14, background: 'rgba(109,94,245,0.12)', border: '2px solid rgba(109,94,245,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>🏔️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>Explorateur</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>Prochain niveau : Prospecteur — encore 200 XP</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: '80%', height: '100%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>800 / 1000 XP</span>
                </div>
              </div>
            </div>
            <div className="grid-3">
              {[
                { icon: '🔥', label: 'Streak', value: '7 jours' },
                { icon: '🏅', label: 'Badges', value: '4 obtenus' },
                { icon: '📚', label: 'Modules', value: '2/8' },
                { icon: '💬', label: 'Sessions Atlas', value: '47' },
                { icon: '⚡', label: 'XP total', value: '800' },
                { icon: '🎯', label: 'Défis réussis', value: '3/4' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 2 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Badges obtenus" icon={Trophy}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ icon: '🏆', name: 'Premier contact' }, { icon: '🔥', name: 'Marathonien' }, { icon: '⭐', name: 'Explorateur' }, { icon: '👥', name: 'Leader en herbe' }].map((b, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'rgba(109,94,245,0.08)', border: '1px solid rgba(109,94,245,0.2)', borderRadius: 12, padding: '12px 16px', minWidth: 80 }}>
                  <span style={{ fontSize: 26 }}>{b.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>{b.name}</span>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* TAB PARAMÈTRES */}
      {tab === 'parametres' && (
        <>
          <Section title="Apparence" icon={Settings}>
            <Toggle label="Mode sombre" desc="Utiliser le thème sombre" value={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Section>
          <Section title="Notifications" icon={Bell}>
            <Toggle label="Notifications email" desc="Rappels et résumés par email" value={notifications.email} onChange={() => setNotifications(n => ({ ...n, email: !n.email }))} />
            <Toggle label="Notifications push" desc="Alertes dans le navigateur" value={notifications.push} onChange={() => setNotifications(n => ({ ...n, push: !n.push }))} />
            <Toggle label="Rappels Atlas" desc="Briefing quotidien à 8h" value={notifications.rappels} onChange={() => setNotifications(n => ({ ...n, rappels: !n.rappels }))} />
          </Section>
          <Section title="Confidentialité" icon={Lock}>
            <Toggle label="Profil public dans la communauté" value={true} onChange={() => {}} />
            <Toggle label="Statistiques visibles" value={false} onChange={() => {}} />
          </Section>
          <Section title="Langue" icon={Globe}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Langue de l'interface</div>
              <select style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 12px', fontSize: 13, color: 'var(--text)', cursor: 'pointer' }}>
                <option>🇫🇷 Français</option>
                <option>🇬🇧 English</option>
              </select>
            </div>
          </Section>
        </>
      )}

      {/* TAB COMPTE */}
      {tab === 'compte' && (
        <>
          <Section title="Mon abonnement" icon={CreditCard}>
            <div style={{ background: 'rgba(109,94,245,0.08)', border: '1.5px solid rgba(109,94,245,0.2)', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Plan actuel</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>✦ Premium Coach</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>$19/mois · Renouvellement le 15 juin 2026</div>
                </div>
                <button style={{ background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  Passer Pro →
                </button>
              </div>
            </div>
            {['Gérer mon abonnement', 'Historique des paiements', 'Mettre à jour ma carte'].map((item, i) => (
              <button key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '14px 0', cursor: 'pointer', color: 'var(--text)', fontSize: 14 }}
                onMouseEnter={e => e.currentTarget.style.color = '#6D5EF5'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
              >
                {item} <ChevronRight size={16} color="#6D5EF5" />
              </button>
            ))}
          </Section>
          <Section title="Sécurité" icon={Lock}>
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '14px 0', cursor: 'pointer', color: 'var(--text)', fontSize: 14 }}
              onMouseEnter={e => e.currentTarget.style.color = '#6D5EF5'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >
              Changer mon mot de passe <ChevronRight size={16} color="#6D5EF5" />
            </button>
            <div style={{ padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Email du compte</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{profile.email || session?.user?.email}</div>
            </div>
            <div style={{ padding: '14px 0' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Membre depuis</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Mai 2026</div>
            </div>
          </Section>
          <Section title="" icon={undefined}>
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, margin: '0 auto' }}>
                <Trash2 size={13} /> Supprimer mon compte
              </button>
            </div>
          </Section>
        </>
      )}
    </div>
  )
}
