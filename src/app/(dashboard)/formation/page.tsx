'use client'
import Link from 'next/link'
import { modules, getGlobalStats } from '@/lib/formation-data'
import { Trophy, Lock, CheckCircle2, Flame } from 'lucide-react'

export default function FormationOverview() {
  const stats = getGlobalStats()

  const getStatusColors = (status: string) => {
    switch (status) {
      case 'done':
        return { bg: '#58CC02', border: '#3d9900', text: 'white', shadow: '#3d9900' }
      case 'current':
        return { bg: 'var(--gold)', border: 'var(--gold-hover)', text: '#161410', shadow: 'var(--gold-hover)' }
      case 'available':
        return { bg: 'var(--bg-card)', border: 'var(--gold)', text: 'var(--text)', shadow: 'var(--gold-hover)' }
      case 'locked':
      default:
        return { bg: 'var(--bg-card)', border: 'var(--border)', text: 'var(--text-muted)', shadow: 'var(--border)' }
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', paddingBottom: 40 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6, fontFamily: 'var(--font-title)' }}>
          Formation
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          Programme 12 semaines · Du débutant au professionnel
        </p>
      </div>

      <div
        style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border)',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
            Progression globale
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 12, background: 'var(--gold-muted)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ width: `${stats.globalProgress}%`, height: '100%', background: 'var(--gold)', borderRadius: 6, transition: 'width 0.5s' }} />
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--gold)' }}>{stats.globalProgress}%</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>{stats.completedLessons}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Leçons</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold)' }}>{stats.currentModule?.id || 1}/8</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Modules</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {modules.map((mod) => {
          const colors = getStatusColors(mod.status)
          const isLocked = mod.status === 'locked'

          const cardContent = (
            <div
              style={{
                background: 'var(--bg-card)',
                border: `2px solid ${mod.status === 'current' ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: 16,
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                opacity: isLocked ? 0.6 : 1,
                cursor: isLocked ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: mod.status === 'current' ? '0 0 0 4px rgba(226,184,74,0.1)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isLocked) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.borderColor = 'var(--gold)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLocked) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = mod.status === 'current' ? 'var(--gold)' : 'var(--border)'
                }
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  background: colors.bg,
                  border: `3px solid ${colors.border}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  fontWeight: 800,
                  color: colors.text,
                  boxShadow: `0 4px 0 ${colors.shadow}`,
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                {mod.status === 'done' ? <CheckCircle2 size={32} strokeWidth={2.5} /> : isLocked ? <Lock size={26} strokeWidth={2.5} /> : mod.id}
                {mod.status === 'current' && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -8,
                      right: -8,
                      background: '#FF9600',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px solid var(--bg-card)',
                    }}
                  >
                    <Flame size={14} color="white" strokeWidth={2.5} />
                  </div>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
                    Module {mod.id} · {mod.duree}
                  </span>
                  {mod.status === 'current' && (
                    <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--gold)', background: 'var(--gold-bg)', padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                      🔥 En cours
                    </span>
                  )}
                  {mod.status === 'done' && (
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#58CC02', background: 'rgba(88,204,2,0.15)', padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                      ✓ Terminé
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 6, fontFamily: 'var(--font-title)' }}>
                  {mod.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>
                  {mod.description}
                </div>

                {mod.progression > 0 && mod.progression < 100 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, height: 8, background: 'var(--gold-muted)', borderRadius: 4, overflow: 'hidden', maxWidth: 250 }}>
                      <div style={{ width: `${mod.progression}%`, height: '100%', background: 'var(--gold)', borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)' }}>{mod.progression}%</span>
                  </div>
                )}
                {mod.progression === 100 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#58CC02', fontSize: 12, fontWeight: 700 }}>
                    <Trophy size={14} strokeWidth={2.5} />
                    Module maîtrisé
                  </div>
                )}
                {mod.status === 'locked' && (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                    🔒 Termine le module {mod.id - 1} pour débloquer
                  </div>
                )}
              </div>
            </div>
          )

          return isLocked ? (
            <div key={mod.id}>{cardContent}</div>
          ) : (
            <Link key={mod.id} href={`/formation/${mod.id}`} style={{ textDecoration: 'none' }}>
              {cardContent}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
