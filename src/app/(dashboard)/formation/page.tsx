'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { modules, getGlobalStats } from '@/lib/formation-data'
import { getUnlockTestState } from '@/lib/unlock-test'
import { Trophy, Lock, CheckCircle2, Flame, Sparkles, Clock, RotateCcw, StickyNote } from 'lucide-react'

const getModuleNoteCount = (moduleId: number) => {
  if (typeof window === 'undefined') return 0
  let count = 0
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(`note-${moduleId}-`)) {
      const val = localStorage.getItem(key)
      if (val && val.trim().length > 0) count++
    }
  }
  return count
}

export default function FormationOverview() {
  const stats = getGlobalStats()
  const router = useRouter()
  const [unlockStates, setUnlockStates] = useState<Record<number, { state: string; cooldownHoursLeft?: number }>>({})
  const [expandedId, setExpandedId] = useState<number | null>(null)

  useEffect(() => {
    const states: Record<number, { state: string; cooldownHoursLeft?: number }> = {}
    modules.forEach(m => {
      if (m.status === 'locked') {
        states[m.id] = getUnlockTestState(m.id)
      }
    })
    setUnlockStates(states)
  }, [])

  const getStatusColors = (status: string) => {
    switch (status) {
      case 'done':
        return { bg: '#22C55E', border: '#16A34A', text: 'white', shadow: '#16A34A' }
      case 'current':
        return { bg: '#6D5EF5', border: '#5B4DD4', text: 'white', shadow: '#5B4DD4' }
      case 'available':
        return { bg: 'var(--bg-card)', border: '#6D5EF5', text: 'var(--text)', shadow: '#5B4DD4' }
      case 'locked':
      default:
        return { bg: 'var(--bg-card)', border: 'var(--border)', text: 'var(--text-muted)', shadow: 'var(--border)' }
    }
  }

  return (
    <div className="overflow-x-fix page-padding" style={{ maxWidth: 900, margin: '0 auto' }}>
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
            <div style={{ flex: 1, height: 12, background: 'rgba(109,94,245,0.15)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ width: `${stats.globalProgress}%`, height: '100%', background: '#6D5EF5', borderRadius: 6, transition: 'width 0.5s' }} />
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#6D5EF5' }}>{stats.globalProgress}%</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>{stats.completedLessons}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Leçons</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#6D5EF5' }}>{stats.currentModule?.id || 1}/8</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Modules</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {modules.map((mod) => {
          const colors = getStatusColors(mod.status)
          const isLocked = mod.status === 'locked'
          const isDone = mod.status === 'done'
          const unlockState = unlockStates[mod.id]
          const testPassed = unlockState?.state === 'passed'
          const inCooldown = unlockState?.state === 'cooldown'
          const effectiveStatus = isLocked && testPassed ? 'available' : mod.status
          const effectiveLocked = isLocked && !testPassed

          const handleCardClick = (e: React.MouseEvent) => {
            if (effectiveLocked) {
              e.preventDefault()
              return
            }
            if (expandedId === mod.id) {
              router.push(`/formation/${mod.id}`)
            } else {
              setExpandedId(expandedId === mod.id ? null : mod.id)
            }
          }

          return (
            <div
              key={mod.id}
              onClick={handleCardClick}
              style={{
                background: 'var(--bg-card)',
                border: `2px solid ${effectiveStatus === 'current' ? '#6D5EF5' : 'var(--border)'}`,
                borderRadius: 16,
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                opacity: effectiveLocked ? 0.85 : 1,
                cursor: effectiveLocked ? 'default' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: effectiveStatus === 'current' ? '0 0 0 4px rgba(109,94,245,0.1)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!effectiveLocked) {
                  e.currentTarget.style.borderColor = '#6D5EF5'
                }
              }}
              onMouseLeave={(e) => {
                if (!effectiveLocked) {
                  e.currentTarget.style.borderColor = effectiveStatus === 'current' ? '#6D5EF5' : 'var(--border)'
                }
              }}
            >
              {/* Ligne principale : icône + contenu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                
                {/* Icône ronde */}
                <div style={{
                  width: 64, height: 64,
                  background: colors.bg,
                  border: `3px solid ${colors.border}`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, fontWeight: 800, color: colors.text,
                  boxShadow: `0 4px 0 ${colors.shadow}`,
                  flexShrink: 0, position: 'relative',
                }}>
                  {isDone ? <CheckCircle2 size={28} strokeWidth={2.5} /> : effectiveLocked ? <Lock size={22} strokeWidth={2.5} /> : mod.id}
                  {mod.status === 'current' && (
                    <div style={{ position: 'absolute', bottom: -6, right: -6, background: '#FF9600', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg-card)' }}>
                      <Flame size={12} color="white" strokeWidth={2.5} />
                    </div>
                  )}
                </div>

                {/* Contenu texte */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Module X · durée */}
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>
                    Module {mod.id} · {mod.duree}
                  </div>
                  {/* Titre */}
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-title)', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {mod.title}
                  </div>
                  {/* Zone action — toujours à la même hauteur */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 32 }}>
                    {isDone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#22C55E', fontSize: 12, fontWeight: 700 }}>
                          <Trophy size={13} strokeWidth={2.5} />
                          Module maîtrisé
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); router.push(`/formation/${mod.id}`) }}
                          style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'transparent', border: '1.5px solid #22C55E', color: '#22C55E', borderRadius: 8, padding: '5px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', height: 32 }}
                        >
                          ↺ Réviser
                        </button>
                      </div>
                    )}
                    {mod.status === 'current' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#6D5EF5', background: 'rgba(109,94,245,0.12)', padding: '5px 12px', borderRadius: 8, textTransform: 'uppercase', letterSpacing: 1, height: 32, display: 'flex', alignItems: 'center' }}>
                          🔥 En cours
                        </span>
                        {mod.progression > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 80, height: 6, background: 'rgba(109,94,245,0.15)', borderRadius: 3, overflow: 'hidden' }}>
                              <div style={{ width: `${mod.progression}%`, height: '100%', background: '#6D5EF5', borderRadius: 3 }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#6D5EF5' }}>{mod.progression}%</span>
                          </div>
                        )}
                      </div>
                    )}
                    {testPassed && isLocked && (
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#1CB0F6', background: 'rgba(28,176,246,0.15)', padding: '5px 12px', borderRadius: 8, textTransform: 'uppercase', letterSpacing: 1, height: 32, display: 'flex', alignItems: 'center' }}>
                        ⚡ Test réussi
                      </span>
                    )}
                    {inCooldown && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,75,75,0.08)', border: '1.5px solid rgba(255,75,75,0.3)', borderRadius: 10, padding: '7px 12px', fontSize: 12, fontWeight: 700, color: '#FF4B4B', height: 32 }}>
                        <Clock size={13} strokeWidth={2.5} />
                        Test à nouveau dans {unlockState.cooldownHoursLeft}h
                      </div>
                    )}
                    {effectiveLocked && !inCooldown && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          🔒 Prérequis : module {mod.id - 1}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); router.push(`/formation/${mod.id}/unlock-test`) }}
                          style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(28,176,246,0.1)', border: '1.5px solid #1CB0F6', color: '#1CB0F6', borderRadius: 8, padding: '5px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', height: 32 }}
                        >
                          ⚡ Débloquer
                        </button>
                      </div>
                    )}
                    {!isDone && !effectiveLocked && mod.status !== 'current' && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', height: 32, display: 'flex', alignItems: 'center' }}>
                        Disponible
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Accordéon description */}
              {expandedId === mod.id && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {mod.description}
                  <div style={{ marginTop: 8, fontSize: 12, color: '#a78bfa', fontWeight: 600 }}>
                    Cliquer à nouveau pour ouvrir →
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
