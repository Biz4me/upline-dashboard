'use client'
import { useState } from 'react'
import { Heart, MessageSquare, Share2, Plus, Trophy, Users } from 'lucide-react'

const posts = [
  {
    id: 1, author: 'Marie D.', initials: 'M', company: 'Herbalife', time: 'Il y a 2h',
    content: "J'ai recruté mon 1er distributeur aujourd'hui ! 6 mois de travail, 47 invitations, 12 présentations. La persévérance paie toujours 🎉",
    likes: 24, comments: 8, color: '#FF9600',
  },
  {
    id: 2, author: 'Patrice H.', initials: 'P', company: 'Herbalife', time: 'Il y a 5h',
    content: "Tip du jour : La technique Feel/Felt/Found de Tom Schreiter est magique pour l'objection 'c'est une pyramide'. Testez-la ce soir !",
    likes: 19, comments: 5, color: '#6D5EF5', isMe: true,
  },
  {
    id: 3, author: 'Sophie B.', initials: 'S', company: 'Forever Living', time: 'Il y a 1j',
    content: "Question : Comment vous gérez les prospects qui disent 'je dois en parler à mon conjoint' ? Atlas m'a donné une technique incroyable hier.",
    likes: 31, comments: 12, color: '#22D3EE',
  },
]

const spaces = [
  { name: 'Herbalife', members: 47, color: '#FF9600', active: true },
  { name: 'Forever Living', members: 23, color: '#22C55E' },
  { name: 'Amway', members: 31, color: '#22D3EE' },
  { name: 'Autres', members: 89, color: '#64748B' },
]

const topContributors = [
  { name: 'Marie Dupont', posts: 42, initials: 'M', color: '#FF9600', medal: '🥇' },
  { name: 'Patrice H.', posts: 18, initials: 'P', color: '#6D5EF5', medal: '🥈', isMe: true },
  { name: 'Sophie B.', posts: 31, initials: 'S', color: '#22D3EE', medal: '🥉' },
]

export default function CommunautePage() {
  const [activeTab, setActiveTab] = useState('general')
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedPosts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])
  }

  const tabs = [
    { id: 'general', label: '🌍 Général' },
    { id: 'herbalife', label: '🟠 Herbalife' },
    { id: 'equipe', label: '👥 Mon équipe' },
  ]

  return (
    <div className="overflow-x-fix page-padding" style={{ maxWidth: 1100, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 4, fontFamily: 'var(--font-title)' }}>
            Communauté
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Partagez vos victoires et progressez ensemble</p>
        </div>
        <button style={{
          background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
          border: 'none', color: 'white', borderRadius: 12,
          padding: '10px 20px', fontSize: 13, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 12px rgba(109,94,245,0.35)',
        }}>
          <Plus size={16} strokeWidth={2.5} />
          Publier
        </button>
      </div>

      <div className="grid-auto">

        {/* LEFT — Posts */}
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 6 }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                flex: 1, background: activeTab === tab.id ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'transparent',
                border: 'none', color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {posts.map(post => (
              <div key={post.id} style={{
                background: 'var(--bg-card)',
                border: `1px solid ${post.isMe ? 'rgba(109,94,245,0.3)' : 'var(--border)'}`,
                borderRadius: 16, padding: '20px 22px',
                boxShadow: post.isMe ? '0 0 0 3px rgba(109,94,245,0.08)' : 'none',
                transition: 'border-color 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(109,94,245,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = post.isMe ? 'rgba(109,94,245,0.3)' : 'var(--border)'}
              >
                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: post.isMe ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : `${post.color}30`,
                    border: `2px solid ${post.color}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 14, color: post.isMe ? 'white' : post.color,
                  }}>
                    {post.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>
                        {post.author} {post.isMe && <span style={{ fontSize: 11, color: '#6D5EF5' }}>← toi</span>}
                      </span>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                        background: `${post.color}20`, color: post.color,
                      }}>
                        {post.company}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{post.time}</div>
                  </div>
                </div>

                {/* Content */}
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                  {post.content}
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                  <button
                    onClick={() => toggleLike(post.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: 'transparent', border: 'none',
                      color: likedPosts.includes(post.id) ? '#FF4B4B' : 'var(--text-muted)',
                      cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    }}
                  >
                    <Heart size={16} fill={likedPosts.includes(post.id) ? '#FF4B4B' : 'none'} />
                    {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                    <MessageSquare size={16} />
                    {post.comments}
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13, fontWeight: 600, marginLeft: 'auto' }}>
                    <Share2 size={14} />
                    Partager
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Espaces société */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={16} color="#6D5EF5" />
              Espaces société
            </div>
            {spaces.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, marginBottom: 6,
                background: s.active ? 'rgba(109,94,245,0.08)' : 'transparent',
                border: s.active ? '1px solid rgba(109,94,245,0.2)' : '1px solid transparent',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
                onMouseEnter={e => { if (!s.active) e.currentTarget.style.background = 'var(--primary-muted)' }}
                onMouseLeave={e => { if (!s.active) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 13, fontWeight: s.active ? 700 : 500, color: s.active ? '#a78bfa' : 'var(--text-secondary)' }}>{s.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.members} membres</span>
                {s.active && <span style={{ color: '#6D5EF5', fontSize: 14, fontWeight: 700 }}>✓</span>}
              </div>
            ))}
          </div>

          {/* Top contributeurs */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Trophy size={16} color="#F59E0B" />
              Top contributeurs
            </div>
            {topContributors.map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
                borderBottom: i < topContributors.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{ fontSize: 18 }}>{c.medal}</span>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: c.isMe ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : `${c.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, color: c.isMe ? 'white' : c.color,
                }}>
                  {c.initials}
                </div>
                <span style={{ flex: 1, fontSize: 13, fontWeight: c.isMe ? 700 : 500, color: c.isMe ? '#a78bfa' : 'var(--text)' }}>
                  {c.name} {c.isMe && '← toi'}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.posts} posts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
