'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { modules, getGlobalStats } from '@/lib/formation-data'
import { getUnlockTestState } from '@/lib/unlock-test'
import { Trophy, Lock, CheckCircle2, Flame, Sparkles, Clock, RotateCcw, StickyNote, Play, Zap } from 'lucide-react'

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

          return (
            <div
              key={mod.id}
              onClick={() => setExpandedId(expandedId === mod.id ? null : mod.id)}
              style={{
                background: 'var(--bg-card)',
                border: `2px solid ${effectiveStatus === 'current' ? '#6D5EF5' : 'var(--border)'}`,
                borderRadius: 16,
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                opacity: effectiveLocked ? 0.75 : 1,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: effectiveStatus === 'current' ? '0 0 0 4px rgba(109,94,245,0.1)' : 'none',
              }}
              onMouseEnter={e => { if (!effectiveLocked) e.currentTarget.style.borderColor = '#6D5EF5' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = effectiveStatus === 'current' ? '#6D5EF5' : 'var(--border)' }}
            >
              {/* Ligne principale */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

                {/* Icône ronde */}
                <div style={{
                  width: 56, height: 56,
                  background: colors.bg,
                  border: `3px solid ${colors.border}`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, fontWeight: 800, color: colors.text,
                  boxShadow: `0 4px 0 ${colors.shadow}`,
                  flexShrink: 0, position: 'relative',
                }}>
                  {isDone ? <CheckCircle2 size={26} strokeWidth={2.5} /> : effectiveLocked ? <Lock size={20} strokeWidth={2.5} /> : mod.id}
                  {mod.status === 'current' && (
                    <div style={{ position: 'absolute', bottom: -4, right: -4, background: '#FF9600', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg-card)' }}>
                      <Flame size={11} color="white" strokeWidth={2.5} />
                    </div>
                  )}
                  {effectiveLocked && !testPassed && (
                    <div style={{ position: 'absolute', bottom: -4, right: -4, background: '#64748B', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg-card)' }}>
                      <Lock size={10} color="white" strokeWidth={2.5} />
                    </div>
                  )}
                </div>

                {/* Contenu */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Module X · durée */}
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>
                    Module {mod.id} · {mod.duree}
                  </div>
                  {/* Titre */}
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-title)', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {mod.title}
                  </div>
                  {/* Zone action */}
                  <div style={{ display: 'flex', alignItems: 'center', height: 28 }}>

                    {/* Badge gauche */}
                    {isDone && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: '#22C55E' }}>
                        <CheckCircle2 size={14} strokeWidth={2.5} /> Maîtrisé
                      </span>
                    )}
                    {mod.status === 'current' && mod.progression > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 60, height: 5, background: 'rgba(109,94,245,0.15)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${mod.progression}%`, height: '100%', background: '#6D5EF5', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#6D5EF5' }}>{mod.progression}%</span>
                      </div>
                    )}
                    {!isDone && !effectiveLocked && mod.status !== 'current' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 60, height: 5, background: 'rgba(109,94,245,0.15)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${mod.progression || 0}%`, height: '100%', background: '#6D5EF5', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>{mod.progression || 0}%</span>
                      </div>
                    )}

                    {/* Bouton droit — largeur fixe 110px */}
                    {isDone && (
                      <button
                        onClick={e => { e.stopPropagation(); router.push(`/formation/${mod.id}`) }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'transparent', border: '1.5px solid #22C55E', color: '#22C55E', borderRadius: 8, height: 28, width: 110, fontSize: 12, fontWeight: 700, cursor: 'pointer', marginLeft: 'auto', flexShrink: 0 }}
                      >
                        <RotateCcw size={13} strokeWidth={2.5} /> Réviser
                      </button>
                    )}
                    {!isDone && !effectiveLocked && (
                      <button
                        onClick={e => { e.stopPropagation(); router.push(`/formation/${mod.id}`) }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(109,94,245,0.1)', border: '1.5px solid #6D5EF5', color: '#6D5EF5', borderRadius: 8, height: 28, width: 110, fontSize: 12, fontWeight: 700, cursor: 'pointer', marginLeft: 'auto', flexShrink: 0 }}
                      >
                        <Play size={13} strokeWidth={2.5} /> Apprendre
                      </button>
                    )}
                    {effectiveLocked && !testPassed && (
                      <button
                        onClick={e => { e.stopPropagation(); router.push(`/formation/${mod.id}/unlock-test`) }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(28,176,246,0.1)', border: '1.5px solid #1CB0F6', color: '#1CB0F6', borderRadius: 8, height: 28, width: 110, fontSize: 12, fontWeight: 700, cursor: 'pointer', marginLeft: 'auto', flexShrink: 0 }}
                      >
                        <Zap size={13} strokeWidth={2.5} /> Débloquer
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Accordéon */}
              {expandedId === mod.id && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {mod.description}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
