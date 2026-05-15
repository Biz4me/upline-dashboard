'use client'
import { useState } from 'react'
import { Copy, Check, Share2, Users, Gift, TrendingUp, Zap } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function ParrainagePage() {
  const { data: session } = useSession()
  const username = session?.user?.name?.toLowerCase().replace(' ', '') || 'patrice'
  const [copied, setCopied] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(`https://atline.ai/u/${username}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filleuls = [
    { name: 'Sophie M.', date: 'Il y a 3j', plan: 'Coach', status: 'actif', color: '#22C55E' },
    { name: 'Jean-Marc R.', date: 'Il y a 1 sem', plan: 'Pro', status: 'actif', color: '#6D5EF5' },
    { name: 'Alice D.', date: 'Il y a 2 sem', plan: 'Starter', status: 'trial', color: '#FF9600' },
  ]

  const shareOptions = [
    { icon: '💬', label: 'WhatsApp', color: '#22C55E', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' },
    { icon: '📧', label: 'Email', color: '#6D5EF5', bg: 'rgba(109,94,245,0.1)', border: 'rgba(109,94,245,0.25)' },
    { icon: '💼', label: 'LinkedIn', color: '#22D3EE', bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.25)' },
    { icon: '📱', label: 'SMS', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  ]

  return (
    <div className="overflow-x-fix page-padding" style={{ maxWidth: 900, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 4, fontFamily: 'var(--font-title)' }}>
          Parrainage
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Partagez Atline.ai et gagnez des mois gratuits</p>
      </div>

      {/* Stats rapides */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {[
          { icon: Users, label: 'Filleuls actifs', value: '2', color: '#6D5EF5' },
          { icon: Gift, label: 'Mois gratuits gagnés', value: '2', color: '#22C55E' },
          { icon: TrendingUp, label: 'En attente de conversion', value: '1', color: '#FF9600' },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color={s.color} strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{s.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Lien unique */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px', marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Share2 size={16} color="#6D5EF5" />
          Mon lien unique
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{
            flex: 1, background: 'var(--primary-bg)', border: '1.5px solid rgba(109,94,245,0.25)',
            borderRadius: 12, padding: '12px 16px', fontSize: 14, color: '#a78bfa', fontWeight: 600,
          }}>
            atline.ai/u/{username}
          </div>
          <button onClick={copyLink} style={{
            background: copied ? '#22C55E' : 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
            border: 'none', color: 'white', borderRadius: 12, padding: '12px 22px',
            fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(109,94,245,0.3)',
          }}>
            {copied ? <><Check size={16} /> Copié !</> : <><Copy size={16} /> Copier</>}
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {shareOptions.map((opt, i) => (
            <button key={i} style={{
              background: opt.bg, border: `1.5px solid ${opt.border}`,
              borderRadius: 12, padding: '12px 8px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: 22 }}>{opt.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: opt.color }}>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid-2">

        {/* Récompenses */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Gift size={16} color="#F59E0B" />
            Mes récompenses
          </div>

          {/* Phase 1 */}
          <div style={{ background: 'rgba(109,94,245,0.06)', border: '1.5px solid rgba(109,94,245,0.2)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>Phase 1 — Mois gratuits</div>
              <div style={{ fontSize: 10, fontWeight: 700, background: 'rgba(34,197,94,0.15)', color: '#22C55E', padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase' }}>Active</div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>
              Chaque filleul Premium converti = <strong style={{ color: '#6D5EF5' }}>1 mois gratuit</strong> pour toi et pour lui
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '40%', height: '100%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 4 }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#a78bfa', whiteSpace: 'nowrap' }}>2/5 filleuls</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>Prochain palier : 5 filleuls → 2 mois bonus</div>
          </div>

          {/* Phase 2 */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 14, padding: 16, opacity: 0.6 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>Phase 2 — Commission cash</div>
              <div style={{ fontSize: 10, fontWeight: 700, background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase' }}>Bientôt</div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              20% de commission sur chaque abonnement de vos filleuls via Stripe Connect
            </p>
          </div>
        </div>

        {/* Filleuls */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Users size={16} color="#6D5EF5" />
            Mes filleuls ({filleuls.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filleuls.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--primary-bg)', border: '1px solid rgba(109,94,245,0.12)', borderRadius: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${f.color}20`, border: `2px solid ${f.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: f.color, flexShrink: 0 }}>
                  {f.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{f.date}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: `${f.color}15`, color: f.color }}>
                  {f.plan}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Fondateur */}
          <div style={{ marginTop: 16, background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(217,119,6,0.06))', border: '1.5px solid rgba(245,158,11,0.3)', borderRadius: 14, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>🏆</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#F59E0B', marginBottom: 4 }}>Statut Fondateur</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Plus que <strong style={{ color: 'white' }}>3 filleuls</strong> pour obtenir Coach à vie !
            </div>
            <div style={{ fontSize: 10, color: 'rgba(245,158,11,0.6)', marginTop: 6 }}>⏳ 187/200 Fondateurs</div>
          </div>
        </div>
      </div>

      {/* Fondateur section */}
      <div style={{ marginTop: 20, background: 'linear-gradient(135deg, rgba(109,94,245,0.15), rgba(34,211,238,0.08))', border: '1px solid rgba(109,94,245,0.25)', borderRadius: 16, padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ fontSize: 48, flexShrink: 0 }}>⚡</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Devenez Fondateur Atline.ai</div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Convertissez 5 filleuls Coach ou Pro en 14 jours → Coach à vie ou -50% permanent Pro + Badge Fondateur visible + accès bêta
          </p>
        </div>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#6D5EF5', marginBottom: 4, textAlign: 'center' }}>187/200</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>Places restantes</div>
        </div>
      </div>
    </div>
  )
}
