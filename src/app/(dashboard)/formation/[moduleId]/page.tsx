'use client'
import { use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react'
import { getModuleById } from '@/lib/formation-data'
import type { Unit } from '@/lib/formation-data'
import LessonNode from '@/components/formation/LessonNode'
import CurrentLessonPopup from '@/components/formation/CurrentLessonPopup'

export default function ModuleDetail({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params)
  const router = useRouter()
  const mod = getModuleById(Number(moduleId))

  if (!mod) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🤔</div>
        <p style={{ color: 'var(--text-secondary)' }}>Module introuvable</p>
        <Link href="/formation" style={{ color: 'var(--gold)', marginTop: 16, display: 'inline-block' }}>
          ← Retour aux modules
        </Link>
      </div>
    )
  }

  if (mod.units.length === 0) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: 60 }}>
        <Link href="/formation" style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
          <ArrowLeft size={14} /> Formation
        </Link>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🚧</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Bientôt disponible</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Ce module sera disponible une fois le précédent terminé.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', paddingBottom: 60 }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #2A2018 0%, #1E1B14 100%)',
          border: '2px solid var(--gold)',
          borderRadius: 16,
          padding: '14px 20px',
          marginBottom: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          position: 'sticky',
          top: 0,
          zIndex: 20,
        }}
      >
        <button
          onClick={() => router.push('/formation')}
          style={{ background: 'transparent', border: 'none', color: 'white', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          aria-label="Retour"
        >
          <ArrowLeft size={22} />
        </button>
        <div style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>
            Module {mod.id} · {mod.progression}%
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {mod.title}
          </div>
        </div>
        <button
          style={{
            background: 'rgba(226,184,74,0.15)',
            border: '1.5px solid rgba(226,184,74,0.35)',
            borderRadius: 10,
            padding: '8px 14px',
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--gold)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap',
          }}
        >
          <BookOpen size={14} />
          Guide
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {mod.units.map((unit, unitIndex) => (
          <UnitSection key={unit.id} unit={unit} moduleId={mod.id} unitIndex={unitIndex} />
        ))}
      </div>
    </div>
  )
}

function UnitSection({ unit, moduleId, unitIndex }: { unit: Unit; moduleId: number; unitIndex: number }) {
  const lessonsAndBoss = [...unit.lessons]
  if (unit.bossLesson) lessonsAndBoss.push(unit.bossLesson)

  const allDone = lessonsAndBoss.every(l => l.status === 'done')
  const hasCurrent = lessonsAndBoss.some(l => l.status === 'current')
  const allLocked = lessonsAndBoss.every(l => l.status === 'locked')

  const unitStatus = allDone ? 'done' : hasCurrent ? 'current' : allLocked ? 'locked' : 'available'

  const unitColors = {
    done: { bg: 'rgba(88,204,2,0.1)', border: 'rgba(88,204,2,0.3)', color: '#58CC02', icon: '✓' },
    current: { bg: 'var(--gold-bg)', border: 'rgba(226,184,74,0.35)', color: 'var(--gold)', icon: '🔥' },
    available: { bg: 'var(--bg-card)', border: 'var(--border)', color: 'var(--text-secondary)', icon: '○' },
    locked: { bg: 'var(--bg-card)', border: 'var(--border)', color: 'var(--text-muted)', icon: '🔒' },
  }[unitStatus]

  const positions = ['center', 'right', 'left', 'right', 'center', 'left']
  const getOffset = (i: number) => {
    const pos = positions[i % positions.length]
    if (pos === 'left') return -90
    if (pos === 'right') return 90
    return 0
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          width: '100%',
          maxWidth: 420,
          margin: unitIndex === 0 ? '0 0 28px' : '40px 0 28px',
        }}
      >
        <div style={{ flex: 1, height: 1.5, background: 'var(--border)' }} />
        <div
          style={{
            background: unitColors.bg,
            border: `1.5px solid ${unitColors.border}`,
            borderRadius: 24,
            padding: '8px 16px',
            fontSize: 12,
            fontWeight: 700,
            color: unitColors.color,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>{unitColors.icon}</span>
          Unité {unitIndex + 1} — {unit.title}
        </div>
        <div style={{ flex: 1, height: 1.5, background: 'var(--border)' }} />
      </div>

      {unitStatus === 'current' && (
        <div
          style={{
            background: 'rgba(28,176,246,0.08)',
            border: '1.5px solid rgba(28,176,246,0.3)',
            borderRadius: 14,
            padding: '12px 16px',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            maxWidth: 420,
            width: '100%',
          }}
        >
          <Sparkles size={22} color="#1CB0F6" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1CB0F6', marginBottom: 2 }}>
              Tu connais déjà ?
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
              Réussis le test pour sauter l'unité
            </div>
          </div>
          <button
            style={{
              background: '#1CB0F6',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              padding: '8px 14px',
              fontSize: 11,
              fontWeight: 800,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              whiteSpace: 'nowrap',
            }}
          >
            Tester →
          </button>
        </div>
      )}

      {unit.lessons.map((lesson, i) => (
        <div
          key={lesson.id}
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            position: 'relative',
            marginBottom: 4,
          }}
        >
          <div style={{ transform: `translateX(${getOffset(i)}px)`, position: 'relative' }}>
            {lesson.status === 'current' && (
              <CurrentLessonPopup
                lesson={lesson}
                moduleId={moduleId}
                unitId={unit.id}
                unitTitle={`Leçon ${i + 1}`}
              />
            )}
            <LessonNode lesson={lesson} moduleId={moduleId} unitId={unit.id} showAtlas={lesson.status === 'current'} />
          </div>
          {(i < unit.lessons.length - 1 || unit.bossLesson) && (
            <div
              style={{
                position: 'absolute',
                bottom: -24,
                left: '50%',
                width: 4,
                height: 24,
                background: lesson.status === 'done' ? '#58CC02' : 'var(--border)',
                transform: 'translateX(-50%)',
                zIndex: -1,
              }}
            />
          )}
          <div style={{ height: 28 }} />
        </div>
      ))}

      {unit.bossLesson && (
        <div style={{ marginTop: 8, position: 'relative' }}>
          <LessonNode lesson={unit.bossLesson} moduleId={moduleId} unitId={unit.id} size="lg" />
        </div>
      )}
    </>
  )
}
