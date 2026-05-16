'use client'
import { useState } from 'react'
import { Heart, MessageSquare, Share2, Plus, Trophy, Users, Copy, Check, Gift, TrendingUp, UserCheck, Lock, Star } from 'lucide-react'

const posts = [
  { id: 1, author: 'Marie D.', initials: 'M', company: 'Herbalife', time: 'Il y a 2h', content: "J'ai recruté mon 1er distributeur aujourd'hui ! 6 mois de travail, 47 invitations, 12 présentations. La persévérance paie toujours 🎉", likes: 24, comments: 8, color: '#FF9600' },
  { id: 2, author: 'Patrice H.', initials: 'P', company: 'Herbalife', time: 'Il y a 5h', content: "Tip du jour : La technique Feel/Felt/Found de Tom Schreiter est magique pour l'objection 'c'est une pyramide'. Testez-la ce soir !", likes: 19, comments: 5, color: '#6D5EF5', isMe: true },
  { id: 3, author: 'Sophie B.', initials: 'S', company: 'Forever Living', time: 'Il y a 1j', content: "Question : Comment vous gérez les prospects qui disent 'je dois en parler à mon conjoint' ? Atlas m'a donné une technique incroyable hier.", likes: 31, comments: 12, color: '#22D3EE' },
]

const badges = [
  { icon: '🏆', title: 'Premier contact', xp: 100, unlocked: true },
  { icon: '🔥', title: 'Marathonien', xp: 150, unlocked: true },
  { icon: '⭐', title: 'Explorateur', xp: 200, unlocked: true },
  { icon: '👥', title: 'Leader en herbe', xp: 250, unlocked: true },
  { icon: '💬', title: 'Bavard productif', xp: 120, unlocked: false },
  { icon: '📚', title: 'Studieux', xp: 300, unlocked: false },
]

const defis = [
  { category: 'TERRAIN', categoryColor: '#EF4444', categoryBg: 'rgba(239,68,68,0.1)', title: 'Contacter 3 prospects réels aujourd\'hui', status: 'done', xp: 30 },
  { category: 'FORMATION', categoryColor: '#6D5EF5', categoryBg: 'rgba(109,94,245,0.1)', title: 'Regarder 2 leçons du module en cours', status: 'todo', xp: 20 },
  { category: 'ATLAS', categoryColor: '#22D3EE', categoryBg: 'rgba(34,211,238,0.1)', title: 'Faire 1 jeu de rôle objections avec Atlas', status: 'todo', xp: 40 },
]

const filleuls = [
  { name: 'Sophie M.', plan: 'Coach', color: '#22C55E' },
  { name: 'Jean-Marc R.', plan: 'Pro', color: '#6D5EF5' },
  { name: 'Alice D.', plan: 'Starter', color: '#FF9600' },
]

const spaces = [
  { name: 'Herbalife', members: 47, color: '#FF9600', active: true },
  { name: 'Forever Living', members: 23, color: '#22C55E' },
  { name: 'Amway', members: 31, color: '#22D3EE' },
]

const TABS = [
  { id: 'communaute', label: '💬 Communauté', },
  { id: 'succes', label: '🏆 Succès' },
  { id: 'parrainage', label: '🔗 Parrainage' },
]

export default function CroissancePage() {
  const [tab, setTab] = useState('communaute')
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [copied, setCopied] = useState(false)
  const [badgeTab, setBadgeTab] = useState<'badges'|'defis'>('badges')

  const toggleLike = (id: number) => setLikedPosts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])

  const copyLink = () => {
    navigator.clipboard.writeText('https://atline.ai/u/patrice')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="overflow-x-fix" style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 28px 60px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 4, fontFamily: 'var(--font-title)' }}>Croissance</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Communauté · Succès · Parrainage</p>
        </div>
        {tab === 'communaute' && (
          <button style={{ background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(109,94,245,0.35)' }}>
            <Plus size={16} /> Publier
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 5, marginBottom: 28, width: 'fit-content' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: tab === t.id ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'transparent',
            border: 'none', color: tab === t.id ? 'white' : 'var(--text-secondary)',
            borderRadius: 10, padding: '9px 20px', fontSize: 13, fontWeight: 700,
            cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ===== COMMUNAUTÉ ===== */}
      {tab === 'communaute' && (
        <div className="grid-auto">
          <div>
            {/* Posts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {posts.map(post => (
                <div key={post.id} style={{ background: 'var(--bg-card)', border: `1px solid ${post.isMe ? 'rgba(109,94,245,0.3)' : 'var(--border)'}`, borderRadius: 16, padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: post.isMe ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : `${post.color}30`, border: `2px solid ${post.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: post.isMe ? 'white' : post.color, flexShrink: 0 }}>
                      {post.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{post.author} {post.isMe && <span style={{ fontSize: 11, color: '#6D5EF5' }}>← toi</span>}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: `${post.color}20`, color: post.color }}>{post.company}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{post.time}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>{post.content}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                    <button onClick={() => toggleLike(post.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: likedPosts.includes(post.id) ? '#FF4B4B' : 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                      <Heart size={16} fill={likedPosts.includes(post.id) ? '#FF4B4B' : 'none'} />
                      {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                      <MessageSquare size={16} /> {post.comments}
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontWeight: 600, marginLeft: 'auto' }}>
                      <Share2 size={14} /> Partager
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={16} color="#6D5EF5" /> Espaces société
              </div>
              {spaces.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, marginBottom: 6, background: s.active ? 'rgba(109,94,245,0.08)' : 'transparent', border: s.active ? '1px solid rgba(109,94,245,0.2)' : '1px solid transparent', cursor: 'pointer' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, fontWeight: s.active ? 700 : 500, color: s.active ? '#a78bfa' : 'var(--text-secondary)' }}>{s.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.members} membres</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Trophy size={16} color="#F59E0B" /> Meilleurs membres
              </div>
              {[{ name: 'Marie Dupont', posts: 42, medal: '🥇' }, { name: 'Patrice H.', posts: 18, medal: '🥈', isMe: true }, { name: 'Sophie B.', posts: 31, medal: '🥉' }].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 18 }}>{c.medal}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: c.isMe ? 700 : 500, color: c.isMe ? '#a78bfa' : 'var(--text)' }}>{c.name} {c.isMe && '← toi'}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.posts} posts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== SUCCÈS ===== */}
      {tab === 'succes' && (
        <>
          {/* XP Card */}
          <div style={{ background: 'linear-gradient(135deg, rgba(109,94,245,0.15), rgba(34,211,238,0.08))', border: '1.5px solid rgba(109,94,245,0.25)', borderRadius: 20, padding: '24px 28px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(109,94,245,0.2)', border: '2px solid rgba(109,94,245,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏔️</div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>Explorateur</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Prochain : Prospecteur — encore 200 XP</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 5 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>800 / 1000 XP</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
              {[{ val: '4', label: 'Badges', color: 'var(--text)' }, { val: '7 🔥', label: 'Streak', color: '#FF9600' }, { val: '800', label: 'XP total', color: '#6D5EF5' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sous-tabs */}
          <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 5, marginBottom: 24, width: 'fit-content' }}>
            {[['badges', '🏅 Badges'], ['defis', '⚡ Défis']].map(([id, label]) => (
              <button key={id} onClick={() => setBadgeTab(id as any)} style={{ background: badgeTab === id ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'transparent', border: 'none', color: badgeTab === id ? 'white' : 'var(--text-secondary)', borderRadius: 10, padding: '9px 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                {label}
              </button>
            ))}
          </div>

          {badgeTab === 'badges' && (
            <div className="grid-3">
              {badges.map((b, i) => (
                <div key={i} style={{ background: 'var(--bg-card)', border: `1.5px solid ${b.unlocked ? 'rgba(109,94,245,0.25)' : 'var(--border)'}`, borderRadius: 16, padding: 20, textAlign: 'center', opacity: b.unlocked ? 1 : 0.5, position: 'relative' }}>
                  {!b.unlocked && <div style={{ position: 'absolute', top: 12, right: 12 }}><Lock size={14} color="var(--text-muted)" /></div>}
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{b.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{b.title}</div>
                  <span style={{ fontSize: 12, fontWeight: 800, color: b.unlocked ? '#6D5EF5' : 'var(--text-muted)', background: b.unlocked ? 'rgba(109,94,245,0.1)' : 'transparent', padding: '2px 10px', borderRadius: 20 }}>+{b.xp} XP</span>
                </div>
              ))}
            </div>
          )}

          {badgeTab === 'defis' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {defis.map((d, i) => (
                <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 20, background: d.categoryBg, color: d.categoryColor, whiteSpace: 'nowrap' }}>{d.category}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{d.title}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: d.status === 'done' ? 'rgba(34,197,94,0.1)' : 'rgba(148,163,184,0.1)', color: d.status === 'done' ? '#22C55E' : '#94A3B8' }}>
                      {d.status === 'done' ? '✅ Fait' : '📋 À faire'}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#6D5EF5' }}>+{d.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ===== PARRAINAGE ===== */}
      {tab === 'parrainage' && (
        <>
          {/* Stats */}
          <div className="grid-3" style={{ marginBottom: 24 }}>
            {[
              { icon: Users, label: 'Filleuls actifs', value: '2', color: '#6D5EF5' },
              { icon: Gift, label: 'Mois gratuits', value: '2', color: '#22C55E' },
              { icon: TrendingUp, label: 'En attente', value: '1', color: '#FF9600' },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={20} color={s.color} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)' }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Lien */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Share2 size={16} color="#6D5EF5" /> Mon lien unique
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200, background: 'var(--primary-bg)', border: '1.5px solid rgba(109,94,245,0.25)', borderRadius: 12, padding: '12px 16px', fontSize: 14, color: '#a78bfa', fontWeight: 600 }}>
                atline.ai/u/patrice
              </div>
              <button onClick={copyLink} style={{ background: copied ? '#22C55E' : 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', borderRadius: 12, padding: '12px 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                {copied ? <><Check size={16} /> Copié !</> : <><Copy size={16} /> Copier</>}
              </button>
            </div>
            <div className="grid-4">
              {[{ icon: '💬', label: 'WhatsApp', color: '#22C55E' }, { icon: '📧', label: 'Email', color: '#6D5EF5' }, { icon: '💼', label: 'LinkedIn', color: '#22D3EE' }, { icon: '📱', label: 'SMS', color: '#F59E0B' }].map((opt, i) => (
                <button key={i} style={{ background: 'var(--bg-page)', border: '1.5px solid var(--border)', borderRadius: 12, padding: '12px 8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
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
                <Gift size={16} color="#F59E0B" /> Mes récompenses
              </div>
              <div style={{ background: 'rgba(109,94,245,0.06)', border: '1.5px solid rgba(109,94,245,0.2)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>Phase 1 — Mois gratuits</div>
                  <div style={{ fontSize: 10, fontWeight: 700, background: 'rgba(34,197,94,0.15)', color: '#22C55E', padding: '3px 8px', borderRadius: 20 }}>Active</div>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>Chaque filleul Premium = <strong style={{ color: '#6D5EF5' }}>1 mois gratuit</strong></p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: '40%', height: '100%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa' }}>2/5</span>
                </div>
              </div>
              {/* Fondateur */}
              <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(217,119,6,0.06))', border: '1.5px solid rgba(245,158,11,0.3)', borderRadius: 14, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>🏆</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F59E0B', marginBottom: 4 }}>Statut Fondateur</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Plus que <strong style={{ color: 'white' }}>3 filleuls</strong> pour Coach à vie !</div>
                <div style={{ fontSize: 10, color: 'rgba(245,158,11,0.6)', marginTop: 6 }}>⏳ 187/200 Fondateurs</div>
              </div>
            </div>

            {/* Filleuls */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={16} color="#6D5EF5" /> Mes filleuls ({filleuls.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filleuls.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--primary-bg)', border: '1px solid rgba(109,94,245,0.12)', borderRadius: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${f.color}20`, border: `2px solid ${f.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: f.color, flexShrink: 0 }}>
                      {f.name[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{f.name}</div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: `${f.color}15`, color: f.color }}>{f.plan}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
