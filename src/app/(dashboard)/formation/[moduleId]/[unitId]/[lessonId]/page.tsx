'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, Heart, FileText, Save, StickyNote } from 'lucide-react'
import { getModuleById, getUnitById, getLessonById } from '@/lib/formation-data'

const sampleQuestions = [
  {
    q: 'Choisis la bonne technique d\'approche',
    atlas: 'Tu as l\'air épanoui ces derniers temps !',
    choices: [
      { text: 'Compliment → question d\'intérêt → présentation produit', correct: false },
      { text: 'Compliment sincère → curiosité naturelle → écoute active', correct: true },
      { text: 'Proposition directe avec argument financier', correct: false },
    ],
  },
  {
    q: 'Quel est le meilleur moment pour relancer un prospect ?',
    atlas: 'Quand penses-tu relancer ?',
    choices: [
      { text: 'Immédiatement après la première rencontre', correct: false },
      { text: 'Entre 24h et 72h après le premier contact', correct: true },
      { text: 'Une semaine plus tard pour ne pas insister', correct: false },
    ],
  },
  {
    q: 'Que faire face à un "Je vais y réfléchir" ?',
    atlas: 'Le prospect hésite — ta réponse ?',
    choices: [
      { text: 'Lui laisser tout le temps qu\'il faut sans relancer', correct: false },
      { text: 'Insister pour qu\'il décide maintenant', correct: false },
      { text: 'Identifier l\'objection réelle avec une question ouverte', correct: true },
    ],
  },
]

export default function LessonPage({
  params,
}: {
  params: { moduleId: string; unitId: string; lessonId: string }
}) {
  const { moduleId, unitId, lessonId } = params
  const router = useRouter()

  const mod = getModuleById(Number(moduleId))
  const unit = getUnitById(Number(moduleId), unitId)
  const lesson = getLessonById(Number(moduleId), unitId, lessonId)

  const questions = sampleQuestions
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [validated, setValidated] = useState(false)
  const [hearts, setHearts] = useState(5)
  const [finished, setFinished] = useState(false)

  const [showNote, setShowNote] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [noteSaved, setNoteSaved] = useState(false)

  // Charger la note depuis localStorage au montage
  useEffect(() => {
    const key = `note-${moduleId}-${unitId}-${lessonId}`
    const saved = localStorage.getItem(key)
    if (saved) setNoteText(saved)
  }, [moduleId, unitId, lessonId])

  const saveNote = () => {
    const key = `note-${moduleId}-${unitId}-${lessonId}`
    localStorage.setItem(key, noteText)
    setNoteSaved(true)
    setTimeout(() => setNoteSaved(false), 2000)
  }

  const hasNote = noteText.trim().length > 0

  if (!mod || !unit || !lesson) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <p style={{ color: 'var(--text-secondary)' }}>Leçon introuvable</p>
      </div>
    )
  }

  const current = questions[step]
  const progress = ((step + (validated ? 1 : 0)) / questions.length) * 100

  const handleValidate = () => {
    if (selected === null) return
    const isCorrect = current.choices[selected].correct
    if (!isCorrect) setHearts(h => Math.max(0, h - 1))
    setValidated(true)
  }

  const handleNext = () => {
    if (step + 1 >= questions.length) {
      setFinished(true)
    } else {
      setStep(step + 1)
      setSelected(null)
      setValidated(false)
    }
  }

  if (finished) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>🎉</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#6D5EF5', marginBottom: 12 }}>
          Leçon terminée !
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
          Tu as gagné <strong style={{ color: '#6D5EF5' }}>+{lesson.xp} XP</strong>
        </p>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1.5px solid var(--border)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#22C55E' }}>+{lesson.xp}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>XP gagnés</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#FF4B4B' }}>❤️ {hearts}/5</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Cœurs restants</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1CB0F6' }}>{questions.length}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Questions</div>
          </div>
        </div>
        <button
          onClick={() => router.push(`/formation/${moduleId}`)}
          style={{
            background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '14px 40px',
            fontSize: 14,
            fontWeight: 800,
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            boxShadow: '0 8px 24px rgba(109,94,245,0.35)',
          }}
        >
          Continuer le parcours →
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', maxWidth: 700, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '12px 0',
          borderBottom: '1.5px solid var(--border)',
          marginBottom: 24,
        }}
      >
        <button
          onClick={() => router.push(`/formation/${moduleId}`)}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
          aria-label="Quitter"
        >
          <X size={22} />
        </button>
        <button
          onClick={() => setShowNote(!showNote)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: hasNote ? 'rgba(109,94,245,0.15)' : 'rgba(255,255,255,0.08)',
            border: hasNote ? '1.5px solid rgba(109,94,245,0.4)' : '1.5px solid rgba(255,255,255,0.15)',
            color: hasNote ? '#a78bfa' : 'rgba(255,255,255,0.7)',
            borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}
        >
          <StickyNote size={15} />
          {hasNote ? '📝 Ma note' : 'Notes'}
        </button>
        <div style={{ flex: 1, height: 12, background: 'var(--bg-card)', borderRadius: 6, overflow: 'hidden' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#6D5EF5',
              borderRadius: 6,
              transition: 'width 0.3s',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#FF4B4B', fontWeight: 800 }}>
          <Heart size={20} fill="#FF4B4B" />
          <span style={{ fontSize: 14 }}>{hearts}</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: '20px 0 40px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 32, textAlign: 'center' }}>
          {current.q}
        </h2>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 32, justifyContent: 'center' }}>
          <div style={{ fontSize: 56 }}>🏔️</div>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '2px solid rgba(109,94,245,0.2)',
              borderRadius: 16,
              borderBottomLeftRadius: 4,
              padding: '14px 20px',
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--text)',
              maxWidth: 400,
            }}
          >
            "{current.atlas}"
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560, margin: '0 auto' }}>
          {current.choices.map((choice, i) => {
            const isSelected = selected === i
            const showFeedback = validated && isSelected
            const showCorrect = validated && choice.correct
            const isWrong = showFeedback && !choice.correct

            let bg = 'var(--bg-card)'
            let border = 'var(--border)'
            let numBg = 'rgba(109,94,245,0.1)'
            let numColor = '#a78bfa'

            if (showCorrect) {
              bg = 'rgba(34,197,94,0.1)'
              border = '#22C55E'
              numBg = '#22C55E'
              numColor = 'white'
            } else if (isWrong) {
              bg = 'rgba(239,68,68,0.08)'
              border = '#EF4444'
              numBg = '#EF4444'
              numColor = 'white'
            } else if (isSelected) {
              bg = 'rgba(109,94,245,0.08)'
              border = '#6D5EF5'
              numBg = '#6D5EF5'
              numColor = 'white'
            }

            return (
              <button
                key={i}
                onClick={() => !validated && setSelected(i)}
                disabled={validated}
                style={{
                  background: bg,
                  border: `2px solid ${border}`,
                  borderRadius: 14,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  cursor: validated ? 'default' : 'pointer',
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: 'left',
                  color: 'var(--text)',
                  transition: 'all 0.15s',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: numBg,
                    color: numColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                {choice.text}
              </button>
            )
          })}
        </div>
      </div>

      <div
        style={{
          padding: '20px 0',
          borderTop: '1.5px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => router.push(`/formation/${moduleId}`)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          Plus tard
        </button>
        {!validated ? (
          <button
            onClick={handleValidate}
            disabled={selected === null}
            style={{
              background: selected === null ? 'var(--gold-muted)' : '#6D5EF5',
              color: selected === null ? 'var(--text-muted)' : 'white',
              border: 'none',
              borderRadius: 12,
              padding: '14px 40px',
              fontSize: 14,
              fontWeight: 800,
              cursor: selected === null ? 'not-allowed' : 'pointer',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              boxShadow: selected === null ? 'none' : '0 4px 0 #5B4DD4',
            }}
          >
            Valider
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              background: current.choices[selected!].correct ? '#22C55E' : '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              padding: '14px 40px',
              fontSize: 14,
              fontWeight: 800,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              boxShadow: current.choices[selected!].correct ? '0 4px 0 #16A34A' : '0 4px 0 #dc2626',
            }}
          >
            Continuer →
          </button>
        )}
      </div>

      {/* Panneau Notes */}
      {showNote && (
        <div style={{
          position: 'fixed', right: 0, top: 64, bottom: 0, width: 340,
          background: 'var(--bg-card)', borderLeft: '1px solid var(--border)',
          zIndex: 40, display: 'flex', flexDirection: 'column',
          boxShadow: '-8px 0 24px rgba(0,0,0,0.15)',
          animation: 'slideInRight 0.2s ease',
        }}>
          <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
          
          {/* Header note */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StickyNote size={18} color="#6D5EF5" />
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Ma note</span>
            </div>
            <button onClick={() => setShowNote(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Context leçon */}
          <div style={{ padding: '12px 20px', background: 'var(--primary-bg)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Leçon en cours</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Module {moduleId} · Unité {unitId} · Leçon {lessonId}</div>
          </div>

          {/* Textarea */}
          <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Prends des notes sur cette leçon...\n\nEx: La technique Feel/Felt/Found fonctionne bien avec les sceptiques. Tester demain avec Jean."
              style={{
                flex: 1, width: '100%', background: 'var(--bg-page)',
                border: '1.5px solid var(--border)', borderRadius: 12,
                padding: '14px', fontSize: 14, color: 'var(--text)',
                outline: 'none', resize: 'none', lineHeight: 1.6,
                fontFamily: 'inherit', boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = '#6D5EF5'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button
              onClick={saveNote}
              style={{
                background: noteSaved ? '#22C55E' : 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
                border: 'none', color: 'white', borderRadius: 10,
                padding: '12px 0', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(109,94,245,0.3)',
              }}
            >
              {noteSaved ? '✅ Note sauvegardée !' : <><Save size={16} /> Sauvegarder</>}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
