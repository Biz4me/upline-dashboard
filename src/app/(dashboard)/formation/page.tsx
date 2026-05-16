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
            router.push(`/formation/${mod.id}`)
          }

          return (
            <div
              key={mod.id}
              onClick={handleCardClick}
              style={{
                background: 'var(--bg-card)',
                border: `2px solid ${effectiveStatus === 'current' ? '#6D5EF5' : 'var(--border)'}`,
                borderRadius: 16,
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                height: 140,
                minHeight: 140,
                maxHeight: 140,
                overflow: 'hidden',
                gap: 20,
                opacity: effectiveLocked ? 0.85 : 1,
                cursor: effectiveLocked ? 'default' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: effectiveStatus === 'current' ? '0 0 0 4px rgba(109,94,245,0.1)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!effectiveLocked) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.borderColor = '#6D5EF5'
                }
              }}
              onMouseLeave={(e) => {
                if (!effectiveLocked) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = effectiveStatus === 'current' ? '#6D5EF5' : 'var(--border)'
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
                {isDone ? <CheckCircle2 size={32} strokeWidth={2.5} /> : effectiveLocked ? <Lock size={26} strokeWidth={2.5} /> : mod.id}
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

              <div style={{ flex: 1, minWidth: 0, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
                    Module {mod.id} · {mod.duree}
                  </span>
                  {mod.status === 'current' && (
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#6D5EF5', background: 'rgba(109,94,245,0.12)', padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                      🔥 En cours
                    </span>
                  )}
                  {isDone && (
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#22C55E', background: 'rgba(34,197,94,0.15)', padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                      ✓ Terminé
                    </span>
                  )}
                  {testPassed && isLocked && (
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#1CB0F6', background: 'rgba(28,176,246,0.15)', padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                      ⚡ Test réussi
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 2, fontFamily: 'var(--font-title)' }}>
                  {mod.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 4 }}>
                  {mod.description}
                </div>
                {(() => {
                  const noteCount = getModuleNoteCount(mod.id)
                  return noteCount > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                      <StickyNote size={12} color="#a78bfa" />
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa' }}>
                        {noteCount} note{noteCount > 1 ? 's' : ''}
                      </span>
                    </div>
                  ) : null
                })()}

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, flexWrap: 'nowrap' }}>
                {mod.progression > 0 && mod.progression < 100 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, height: 8, background: 'rgba(109,94,245,0.15)', borderRadius: 4, overflow: 'hidden', maxWidth: 150 }}>
                      <div style={{ width: `${mod.progression}%`, height: '100%', background: '#6D5EF5', borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#6D5EF5' }}>{mod.progression}%</span>
                  </div>
                )}

                {isDone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22C55E', fontSize: 12, fontWeight: 700 }}>
                      <Trophy size={14} strokeWidth={2.5} />
                      Module maîtrisé
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/formation/${mod.id}?mode=revision`)
                      }}
                      style={{
                        background: 'transparent',
                        border: '1.5px solid #22C55E',
                        color: '#22C55E',
                        borderRadius: 10,
                        padding: '6px 14px',
                        fontSize: 11,
                        fontWeight: 800,
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <RotateCcw size={12} strokeWidth={2.5} />
                      Réviser
                    </button>
                  </div>
                )}

                {effectiveLocked && (
                  <div>
                    {!unlockState || unlockState.state === 'available' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'nowrap' }}>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                          🔒 Termine le module {mod.id - 1} d'abord
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/formation/${mod.id}/unlock-test`)
                          }}
                          style={{
                            background: 'rgba(28,176,246,0.12)',
                            border: '1.5px solid #1CB0F6',
                            color: '#1CB0F6',
                            borderRadius: 10,
                            padding: '7px 14px',
                            fontSize: 11,
                            fontWeight: 800,
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <Sparkles size={12} strokeWidth={2.5} />
                          Débloquer
                        </button>
                      </div>
                    ) : inCooldown ? (
                      <div
                        style={{
                          alignItems: 'center',
                          gap: 8,
                          background: 'rgba(255,75,75,0.08)',
                          border: '1.5px solid rgba(255,75,75,0.3)',
                          borderRadius: 10,
                          padding: '7px 12px',
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#FF4B4B',
                          display: 'inline-flex',
                        }}
                      >
                        <Clock size={13} strokeWidth={2.5} />
                        Test à nouveau dans {unlockState.cooldownHoursLeft}h
                      </div>
                    ) : null}
                  </div>
                )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
