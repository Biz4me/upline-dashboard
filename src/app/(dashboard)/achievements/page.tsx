'use client'
import { useState } from 'react'
import { Trophy, Flame, Zap, Star, Target, Users, BookOpen, MessageCircle, Lock } from 'lucide-react'

const badges = [
  { id: 1, icon: '🏆', title: 'Premier contact', desc: '10 prospects contactés', xp: 100, unlocked: true, date: 'Il y a 2 jours' },
  { id: 2, icon: '🔥', title: 'Marathonien', desc: '7 jours de streak', xp: 150, unlocked: true, date: 'Il y a 1 semaine' },
  { id: 3, icon: '⭐', title: 'Explorateur', desc: 'Module 1 terminé', xp: 200, unlocked: true, date: 'Il y a 2 sem' },
  { id: 4, icon: '💬', title: 'Bavard productif', desc: '50 messages Atlas', xp: 120, unlocked: false },
  { id: 5, icon: '👥', title: 'Leader en herbe', desc: '3 filleuls formés', xp: 250, unlocked: true, date: 'Il y a 4 jours' },
  { id: 6, icon: '📚', title: 'Studieux', desc: '3 modules terminés', xp: 300, unlocked: false },
  { id: 7, icon: '🎯', title: 'Sniper', desc: '5 prospects convertis', xp: 400, unlocked: false },
  { id: 8, icon: '🚀', title: 'Décollage', desc: 'Premier filleul Coach', xp: 500, unlocked: false },
  { id: 9, icon: '💎', title: 'Diamant', desc: 'Top 3 du leaderboard', xp: 1000, unlocked: false },
]

const defis = [
  { id: 1, category: 'TERRAIN', categoryColor: '#EF4444', categoryBg: 'rgba(239,68,68,0.1)', title: 'Contacter 3 prospects réels aujourd\'hui', desc: 'Dans ton business Herbalife', status: 'done', xp: 30 },
  { id: 2, category: 'TERRAIN', categoryColor: '#EF4444', categoryBg: 'rgba(239,68,68,0.1)', title: 'Faire 1 présentation cette semaine', desc: 'Marquer un prospect comme Présenté dans le CRM', status: 'progress', xp: 50 },
  { id: 3, category: 'FORMATION', categoryColor: '#6D5EF5', categoryBg: 'rgba(109,94,245,0.1)', title: 'Regarder 2 leçons du module en cours', desc: 'Module 2 — Trouver des prospects', status: 'todo', xp: 20 },
  { id: 4, category: 'ATLAS', categoryColor: '#22D3EE', categoryBg: 'rgba(34,211,238,0.1)', title: 'Faire 1 jeu de rôle objections avec Atlas', desc: 'Entraîne-toi à répondre aux 10 objections types', status: 'todo', xp: 40 },
]

const statusConfig = {
  done: { label: 'Fait', color: '#22C55E', bg: 'rgba(34,197,94,0.1)', icon: '✅' },
  progress: { label: 'En cours', color: '#6D5EF5', bg: 'rgba(109,94,245,0.1)', icon: '⏳' },
  todo: { label: 'À faire', color: '#94A3B8', bg: 'rgba(148,163,184,0.1)', icon: '📋' },
}

export default function AchievementsPage() {
  const [tab, setTab] = useState<'badges' | 'defis'>('badges')

  const totalXP = badges.filter(b => b.unlocked).reduce((sum, b) => sum + b.xp, 0)
  const unlockedCount = badges.filter(b => b.unlocked).length

  return (
    <div className="overflow-x-fix page-padding" style={{ maxWidth: 900, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 4, fontFamily: 'var(--font-title)' }}>
          Succès & Badges
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Tes accomplissements terrain et formation</p>
      </div>

      {/* XP Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(109,94,245,0.15), rgba(34,211,238,0.08))',
        border: '1.5px solid rgba(109,94,245,0.25)',
        borderRadius: 20, padding: '24px 28px', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(109,94,245,0.2)', border: '2px solid rgba(109,94,245,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              🏔️
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>Explorateur</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Prochain niveau : Prospecteur — encore 200 XP</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ width: '80%', height: '100%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 5 }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa', whiteSpace: 'nowrap' }}>{totalXP} / 1000 XP</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)' }}>{unlockedCount}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Badges</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#FF9600' }}>7 🔥</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Streak</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#6D5EF5' }}>{totalXP}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>XP total</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 5, marginBottom: 24, width: 'fit-content' }}>
        {([['badges', '🏅 Badges'], ['defis', '⚡ Défis de la semaine']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            background: tab === id ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'transparent',
            border: 'none', color: tab === id ? 'white' : 'var(--text-secondary)',
            borderRadius: 10, padding: '9px 22px', fontSize: 13, fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* BADGES */}
      {tab === 'badges' && (
        <div className="grid-3">
          {badges.map(badge => (
            <div key={badge.id} style={{
              background: badge.unlocked ? 'var(--bg-card)' : 'var(--bg-card)',
              border: `1.5px solid ${badge.unlocked ? 'rgba(109,94,245,0.25)' : 'var(--border)'}`,
              borderRadius: 16, padding: '20px', textAlign: 'center',
              opacity: badge.unlocked ? 1 : 0.5,
              transition: 'all 0.2s',
              position: 'relative',
            }}
              onMouseEnter={e => badge.unlocked && (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {!badge.unlocked && (
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                  <Lock size={14} color="var(--text-muted)" />
                </div>
              )}
              <div style={{
                width: 56, height: 56, borderRadius: '50%', margin: '0 auto 12px',
                background: badge.unlocked ? 'rgba(109,94,245,0.12)' : 'var(--muted)',
                border: `2px solid ${badge.unlocked ? 'rgba(109,94,245,0.25)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
              }}>
                {badge.icon}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{badge.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>{badge.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: badge.unlocked ? '#6D5EF5' : 'var(--text-muted)', background: badge.unlocked ? 'rgba(109,94,245,0.1)' : 'transparent', padding: '2px 10px', borderRadius: 20 }}>
                  +{badge.xp} XP
                </span>
                {badge.unlocked && badge.date && (
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{badge.date}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DEFIS */}
      {tab === 'defis' && (
        <div>
          {/* Atlas intro */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 20px', marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>
              🏔️
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>Atlas — Défis de la semaine</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Les défis TERRAIN sont à réaliser dans ton business Herbalife — pas dans la formation !
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {defis.map(defi => {
              const s = statusConfig[defi.status as keyof typeof statusConfig]
              return (
                <div key={defi.id} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 16,
                  transition: 'border-color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(109,94,245,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 20, background: defi.categoryBg, color: defi.categoryColor, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {defi.category}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{defi.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{defi.desc}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: s.bg, color: s.color, display: 'flex', alignItems: 'center', gap: 4 }}>
                      {s.icon} {s.label}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#6D5EF5' }}>+{defi.xp} XP</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Total semaine */}
          <div style={{ marginTop: 20, background: 'rgba(109,94,245,0.06)', border: '1.5px solid rgba(109,94,245,0.2)', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Total semaine</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#6D5EF5' }}>
              {defis.filter(d => d.status === 'done').reduce((sum, d) => sum + d.xp, 0)} / {defis.reduce((sum, d) => sum + d.xp, 0)} XP
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
