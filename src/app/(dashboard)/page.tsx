'use client'
import { useSession } from 'next-auth/react'
import { TrendingUp, MessageSquare, Clock, Target, Award } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const weeklyActivity = [
  { day: 'Lun', sessions: 8 },
  { day: 'Mar', sessions: 5 },
  { day: 'Mer', sessions: 12 },
  { day: 'Jeu', sessions: 9 },
  { day: 'Ven', sessions: 16 },
  { day: 'Sam', sessions: 7 },
  { day: 'Dim', sessions: 4 },
]

const skillProgress = [
  { skill: 'Prospection', progress: 85, color: '#6D5EF5' },
  { skill: 'Présentation', progress: 72, color: '#22D3EE' },
  { skill: "Gestion d'équipe", progress: 65, color: '#22C55E' },
  { skill: 'Social Media', progress: 58, color: '#FF9600' },
  { skill: 'Closing', progress: 78, color: '#8B5CF6' },
]

const recentAchievements = [
  { title: 'Premier contact', description: '10 nouveaux prospects cette semaine', date: 'Il y a 2 jours' },
  { title: 'Leader en herbe', description: 'Formation de 3 nouveaux membres', date: 'Il y a 4 jours' },
  { title: 'Marathonien', description: '7 jours de connexion consécutifs', date: 'Il y a 1 semaine' },
]

const stats = [
  { label: 'Sessions de coaching', value: '47', change: '+12%', icon: MessageSquare, color: 'from-[#6D5EF5] to-[#8B5CF6]' },
  { label: "Temps d'apprentissage", value: '24h', change: '+8%', icon: Clock, color: 'from-[#22D3EE] to-[#06B6D4]' },
  { label: 'Objectifs atteints', value: '18/25', change: '72%', icon: Target, color: 'from-[#22C55E] to-[#16A34A]' },
  { label: 'Badges obtenus', value: '12', change: '+3 nouveau', icon: Award, color: 'from-[#F59E0B] to-[#D97706]' },
]

export default function Accueil() {
  const { data: session } = useSession()
  const prenom = session?.user?.name?.split(' ')[0] || 'toi'

  return (
    <div style={{ minHeight: '100vh', padding: '32px 32px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: 'var(--text)', marginBottom: 8, fontFamily: 'var(--font-title)', letterSpacing: -0.5 }}>
            Tableau de bord
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            Suivez vos progrès et célébrez vos victoires
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(109,94,245,0.15)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: `linear-gradient(135deg, ${stat.color.includes('6D5EF5') ? '#6D5EF5, #8B5CF6' : stat.color.includes('22D3EE') ? '#22D3EE, #06B6D4' : stat.color.includes('22C55E') ? '#22C55E, #16A34A' : '#F59E0B, #D97706'})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color="white" strokeWidth={2} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#22C55E' }}>{stat.change}</span>
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Graphique + Achievements */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, marginBottom: 32 }}>

          {/* Graphique */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>Activité de la semaine</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyActivity} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-muted)" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    color: 'var(--text)',
                    fontSize: 13,
                  }}
                  cursor={{ fill: 'rgba(109,94,245,0.08)' }}
                />
                <Bar dataKey="sessions" fill="#6D5EF5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Achievements */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>Achievements récents</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {recentAchievements.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
                  }}>
                    <Award size={18} color="white" strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>{a.description}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progression compétences */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>Progression des compétences</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {skillProgress.map((s, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{s.skill}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>{s.progress}%</span>
                </div>
                <div style={{ height: 10, background: 'var(--muted)', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${s.progress}%`,
                    background: s.color,
                    borderRadius: 5,
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA gradient */}
        <div style={{
          background: 'linear-gradient(135deg, #6D5EF5 0%, #22D3EE 100%)',
          borderRadius: 16,
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(109,94,245,0.3)',
        }}>
          <TrendingUp size={48} color="white" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 8 }}>
            Continuez sur votre lancée !
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 24 }}>
            Vous avez progressé de 15% ce mois-ci. Gardez le rythme !
          </p>
          <button style={{
            background: 'white',
            color: '#6D5EF5',
            border: 'none',
            borderRadius: 10,
            padding: '12px 32px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}>
            Planifier ma prochaine session
          </button>
        </div>

      </div>
    </div>
  )
}
