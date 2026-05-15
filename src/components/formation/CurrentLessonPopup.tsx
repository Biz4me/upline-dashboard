'use client'
import Link from 'next/link'
import type { Lesson } from '@/lib/formation-data'

interface CurrentLessonPopupProps {
  lesson: Lesson
  moduleId: number
  unitId: string
  unitTitle: string
}

export default function CurrentLessonPopup({ lesson, moduleId, unitId, unitTitle }: CurrentLessonPopupProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 90,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
        borderRadius: 14,
        padding: '14px 18px',
        width: 220,
        zIndex: 5,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '10px solid #6D5EF5',
        }}
      />
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
        {unitTitle}
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 12 }}>
        {lesson.title}
      </div>
      <Link
        href={`/formation/${moduleId}/${unitId}/${lesson.id}`}
        style={{
          display: 'block',
          background: 'rgba(255,255,255,0.15)',
          border: '1.5px solid rgba(255,255,255,0.3)',
          borderRadius: 10,
          padding: '10px 0',
          width: '100%',
          fontSize: 13,
          fontWeight: 800,
          color: 'white',
          cursor: 'pointer',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          textDecoration: 'none',
        }}
      >
        Commencer +{lesson.xp} XP
      </Link>
    </div>
  )
}
