'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { TrendingUp, MessageSquare, Clock, Target, Award, ChevronRight, Flame, Calendar, AlertCircle, Bell } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Link from 'next/link'

const alertesFilleuls = [
  { id: 1, name: 'Jean Martin', type: 'inactif', message: 'Inactif depuis 8 jours', color: '#FF9600', bg: 'rgba(255,150,0,0.1)', icon: '⚠️' },
  { id: 2, name: 'Sophie Bernard', type: 'succes', message: 'Vient de recruter son 1er distributeur !', color: '#22C55E', bg: 'rgba(34,197,94,0.1)', icon: '🎉' },
  { id: 3, name: 'Marc Dubois', type: 'formation', message: 'Module 4 terminé — encourage-le !', color: '#6D5EF5', bg: 'rgba(109,94,245,0.1)', icon: '📚' },
]

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
  { label: 'Sessions de coaching', value: '47', change: '+12%', icon: MessageSquare, color: '#6D5EF5' },
  { label: "Temps d'apprentissage", value: '24h', change: '+8%', icon: Clock, color: '#22D3EE' },
  { label: 'Objectifs atteints', value: '18/25', change: '72%', icon: Target, color: '#22C55E' },
  { label: 'Badges obtenus', value: '12', change: '+3', icon: Award, color: '#F59E0B' },
]

// Daily Briefing data (simulé — sera connecté à l'API)
const briefing = {
  rdvAujourdhui: [
    { time: '14h00', title: 'RDV Marie Dupont', tip: 'Préparer objection "c\'est une pyramide"', color: '#6D5EF5' },
    { time: '19h00', title: "Réunion d'info", tip: '3 invités confirmés — arriver 15min avant', color: '#22D3EE' },
  ],
  priorites: [
    { text: 'Relancer Jean Martin (7 jours sans contact)', icon: '⚠️', color: '#FF9600' },
    { text: 'Finir l\'unité 2 du Module 2 (80% complété)', icon: '📚', color: '#6D5EF5' },
    { text: 'Répondre à Sophie B. dans la Communauté', icon: '💬', color: '#22D3EE' },
  ],
  streak: 7,
  xp: 800,
  hier: [
    '2 prospects contactés ✅',
    'Leçon "Script d\'approche" terminée +20 XP ✅',
  ],
}

export default function Accueil() {
  const { data: session } = useSession()
  const prenom = session?.user?.name?.split(' ')[0] || 'toi'
  const heure = new Date().getHours()
  const salutation = heure < 12 ? 'Bonjour' : heure < 18 ? 'Bon après-midi' : 'Bonsoir'
  const [alertesDismissed, setAlerteDismissed] = useState<number[]>([])
  const alertesVisibles = alertesFilleuls.filter(a => !alertesDismissed.includes(a.id))

  return (
    <div className="page-container">
      <div className="page-inner">

        {/* ===== DAILY BRIEFING ===== */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)',
          border: '1px solid rgba(109,94,245,0.3)',
          borderRadius: 20,
          padding: '24px 28px',
          marginBottom: 32,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(109,94,245,0.15)',
        }}>
          {/* Blob déco */}
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: '#6D5EF5', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.15 }} />
          <div style={{ position: 'absolute', bottom: -40, left: '30%', width: 150, height: 150, background: '#22D3EE', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.1 }} />

          {/* Header briefing */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 4px 12px rgba(109,94,245,0.4)', flexShrink: 0 }}>
                🏔️
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>
                  {salutation} {prenom} 👋
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                  Voici ton briefing du jour par Atlas
                </div>
              </div>
            </div>
            <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#FF9600' }}>{briefing.streak} 🔥</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Streak</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#a78bfa' }}>{briefing.xp} XP</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Total</div>
              </div>
            </div>
          </div>

          {/* Contenu briefing en grille */}
          <div className="grid-3" style={{ gap: 16, position: 'relative' }}>

            {/* RDV du jour */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <Calendar size={14} color="#22D3EE" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#22D3EE', textTransform: 'uppercase', letterSpacing: 0.5 }}>Aujourd'hui</span>
              </div>
              {briefing.rdvAujourdhui.map((rdv, i) => (
                <div key={i} style={{ marginBottom: i < briefing.rdvAujourdhui.length - 1 ? 10 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: rdv.color, background: `${rdv.color}20`, padding: '2px 8px', borderRadius: 6, flexShrink: 0 }}>{rdv.time}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rdv.title}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 3, paddingLeft: 4 }}>→ {rdv.tip}</div>
                </div>
              ))}
            </div>

            {/* Priorités du jour */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <AlertCircle size={14} color="#FF9600" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#FF9600', textTransform: 'uppercase', letterSpacing: 0.5 }}>Priorités</span>
              </div>
              {briefing.priorites.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: i < briefing.priorites.length - 1 ? 8 : 0 }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{p.icon}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>{p.text}</span>
                </div>
              ))}
            </div>

            {/* Hier */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <Flame size={14} color="#22C55E" />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#22C55E', textTransform: 'uppercase', letterSpacing: 0.5 }}>Hier</span>
              </div>
              {briefing.hier.map((h, i) => (
                <div key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 8, lineHeight: 1.4 }}>{h}</div>
              ))}
              <Link href="/atlas" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 12, fontWeight: 700, color: '#a78bfa', textDecoration: 'none' }}>
                Parler à Atlas <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Widget alertes filleuls */}
        {alertesVisibles.length > 0 && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 24px', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bell size={16} color="#EF4444" />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Alertes filleuls</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{alertesVisibles.length} notification{alertesVisibles.length > 1 ? 's' : ''} en attente</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {alertesVisibles.map(alerte => (
                <div key={alerte.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: alerte.bg, border: `1px solid ${alerte.color}25`, borderRadius: 12, padding: '12px 16px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{alerte.icon}</span>
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{alerte.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{alerte.message}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap' }}>
                    {alerte.type === 'inactif' && (
                      <>
                        <Link href={`/atlas?context=appel-${alerte.name}`} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(109,94,245,0.1)', border: '1px solid rgba(109,94,245,0.25)', color: '#a78bfa', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                          🎯 Préparer avec Atlas
                        </Link>
                        <a href={`tel:`} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#22C55E', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                          📞 Appeler
                        </a>
                      </>
                    )}
                    {(alerte.type === 'succes' || alerte.type === 'formation') && (
                      <Link href={`/reseau?feliciter=${alerte.id}`} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#22C55E', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        🎉 Envoyer une card
                      </Link>
                    )}
                    <button onClick={() => setAlerteDismissed(prev => [...prev, alerte.id])} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px', borderRadius: 8, fontSize: 16 }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== STATS ===== */}
        <div style={{ marginBottom: 8 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 4, fontFamily: 'var(--font-title)', letterSpacing: -0.5 }}>
            Tableau de bord
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
            Suivez vos progrès et célébrez vos victoires
          </p>
        </div>

        <div className="grid-4" style={{ marginBottom: 32 }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(109,94,245,0.15)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${stat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={stat.color} strokeWidth={2} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#22C55E', whiteSpace: 'nowrap', flexShrink: 0 }}>{stat.change}</span>
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Graphique + Achievements */}
        <div className="grid-auto" style={{ marginBottom: 32 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>Activité de la semaine</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyActivity} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-muted)" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 13 }} cursor={{ fill: 'rgba(109,94,245,0.08)' }} />
                <Bar dataKey="sessions" fill="#6D5EF5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>Dernières récompenses</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {recentAchievements.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #F59E0B, #D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(245,158,11,0.3)', fontSize: 18 }}>🏅</div>
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
                <div style={{ height: 10, background: 'var(--border)', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.progress}%`, background: s.color, borderRadius: 5, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA gradient */}
        <div style={{ background: 'linear-gradient(135deg, #6D5EF5 0%, #22D3EE 100%)', borderRadius: 16, padding: '40px 32px', textAlign: 'center', boxShadow: '0 8px 32px rgba(109,94,245,0.3)' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📈</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 8 }}>Continuez sur votre lancée !</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 24 }}>
            Vous avez progressé de 15% ce mois-ci. Gardez le rythme !
          </p>
          <Link href="/agenda" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', color: '#6D5EF5', border: 'none', borderRadius: 10, padding: '12px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', textDecoration: 'none' }}>
            Planifier ma prochaine session <ChevronRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  )
}
