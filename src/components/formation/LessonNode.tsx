'use client'
import Link from 'next/link'
import type { Lesson } from '@/lib/formation-data'
import { lessonTypeIcons } from '@/lib/formation-data'

interface LessonNodeProps {
  lesson: Lesson
  moduleId: number
  unitId: string
  showAtlas?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function LessonNode({ lesson, moduleId, unitId, showAtlas = false, size = 'lg' }: LessonNodeProps) {
  const isLocked = lesson.status === 'locked'
  const isDone = lesson.status === 'done'
  const isCurrent = lesson.status === 'current'
  const isBoss = lesson.id.includes('boss')

  const sizes = {
    sm: { node: 48, font: 18 },
    md: { node: 56, font: 22 },
    lg: { node: 72, font: 28 },
  }
  const { node: nodeSize, font: fontSize } = sizes[size]

  const getColors = () => {
    if (isLocked) return { bg: 'var(--bg-card)', border: 'var(--border)', shadow: 'none' }
    if (isDone) return { bg: '#58CC02', border: '#3d9900', shadow: '0 4px 0 #3d9900' }
    if (isCurrent) return { bg: 'var(--gold)', border: 'var(--gold-hover)', shadow: '0 0 0 6px rgba(226,184,74,0.2), 0 4px 0 var(--gold-hover)' }
    if (isBoss) return { bg: '#FF9600', border: '#CC7700', shadow: '0 4px 0 #CC7700' }
    if (lesson.type === 'theory') return { bg: '#7C5C2E', border: '#5A3E1A', shadow: '0 4px 0 #5A3E1A' }
    return { bg: 'var(--bg-card)', border: 'var(--gold)', shadow: '0 4px 0 var(--gold-hover)' }
  }

  const colors = getColors()
  const icon = isDone ? '✓' : isBoss ? '🏆' : lessonTypeIcons[lesson.type]

  const nodeElement = (
    <div
      style={{
        width: nodeSize,
        height: nodeSize,
        background: colors.bg,
        border: `3px solid ${colors.border}`,
        boxShadow: colors.shadow,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: fontSize,
        opacity: isLocked ? 0.5 : 1,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        transition: 'transform 0.15s',
        color: isDone ? 'white' : isCurrent ? '#161410' : isBoss ? 'white' : 'var(--text)',
        fontWeight: 800,
        position: 'relative',
      }}
      onMouseEnter={(e) => !isLocked && (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {icon}
      {showAtlas && isCurrent && (
        <div style={{ position: 'absolute', right: -90, top: -5, fontSize: 48 }}>
          🏔️
        </div>
      )}
    </div>
  )

  if (isLocked) {
    return <div>{nodeElement}</div>
  }

  return (
    <Link href={`/formation/${moduleId}/${unitId}/${lesson.id}`} style={{ textDecoration: 'none' }}>
      {nodeElement}
    </Link>
  )
}
