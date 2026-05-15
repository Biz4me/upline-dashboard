'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { getModuleById } from '@/lib/formation-data'
import { unlockTestQuestions, recordUnlockSuccess, recordUnlockFailure } from '@/lib/unlock-test'

const PASSING_SCORE = 80 // %

export default function UnlockTestPage({ params }: { params: { moduleId: string } }) {
  const { moduleId } = params
  const router = useRouter()
  const mod = getModuleById(Number(moduleId))

  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [validated, setValidated] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [finalPct, setFinalPct] = useState(0)

  if (!mod) {
    return <div style={{ textAlign: 'center', padding: 60 }}>Module introuvable</div>
  }

  const current = unlockTestQuestions[step]
  const totalQuestions = unlockTestQuestions.length
  const progress = ((step + (validated ? 1 : 0)) / totalQuestions) * 100

  const handleValidate = () => {
    if (selected === null) return
    if (current.choices[selected].correct) {
      setScore(s => s + 1)
    }
    setValidated(true)
  }

  const handleNext = () => {
    if (step + 1 >= totalQuestions) {
      const currentCorrect = current.choices[selected!].correct ? 1 : 0
      const finalScore = score + currentCorrect
      const pct = Math.round((finalScore / totalQuestions) * 100)
      setFinalPct(pct)
      if (pct >= PASSING_SCORE) {
        recordUnlockSuccess(Number(moduleId))
      } else {
        recordUnlockFailure(Number(moduleId))
      }
      setFinished(true)
    } else {
      setStep(step + 1)
      setSelected(null)
      setValidated(false)
    }
  }

  // Écran final
  if (finished) {
    const passed = finalPct >= PASSING_SCORE
    const finalScore = Math.round((finalPct / 100) * totalQuestions)

    return (
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>{passed ? '🎉' : '😔'}</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: passed ? '#58CC02' : '#FF4B4B', marginBottom: 12 }}>
          {passed ? 'Module débloqué !' : 'Pas encore prêt'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 16 }}>
          {passed
            ? `Tu as obtenu ${finalPct}% — le Module ${moduleId} est maintenant accessible.`
            : `Tu as obtenu ${finalPct}% — il faut ${PASSING_SCORE}% pour débloquer.`}
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
            <div style={{ fontSize: 28, fontWeight: 800, color: passed ? '#58CC02' : '#FF4B4B' }}>{finalPct}%</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Score</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)' }}>{finalScore}/{totalQuestions}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Bonnes réponses</div>
          </div>
        </div>

        {!passed && (
          <div
            style={{
              background: 'rgba(239,68,68,0.06)',
              border: '1.5px solid rgba(239,68,68,0.2)',
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
              fontSize: 13,
              color: 'var(--text-secondary)',
            }}
          >
            ⏰ Tu pourras refaire le test dans 24h, ou suivre le module normalement en finissant les unités.
          </div>
        )}

        <button
          onClick={() => router.push('/formation')}
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
          Retour à la formation
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', maxWidth: 700, margin: '0 auto' }}>
      {/* Topbar */}
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
          onClick={() => router.push('/formation')}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
          aria-label="Quitter"
        >
          <X size={22} />
        </button>
        <div style={{ flex: 1, height: 12, background: 'var(--bg-card)', borderRadius: 6, overflow: 'hidden' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#1CB0F6',
              borderRadius: 6,
              transition: 'width 0.3s',
            }}
          />
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#1CB0F6' }}>
          {step + 1}/{totalQuestions}
        </div>
      </div>

      {/* Header test */}
      <div
        style={{
          background: 'rgba(109,94,245,0.08)',
          border: '1.5px solid rgba(109,94,245,0.3)',
          borderRadius: 12,
          padding: '10px 16px',
          marginBottom: 24,
          textAlign: 'center',
          fontSize: 12,
          fontWeight: 700,
          color: '#a78bfa',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        ⚡ Test de déblocage — Module {moduleId} · {mod.title}
      </div>

      {/* Question */}
      <div style={{ flex: 1, padding: '20px 0 40px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 32, textAlign: 'center' }}>
          {current.q}
        </h2>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 32, justifyContent: 'center' }}>
          <div style={{ fontSize: 56 }}>🏔️</div>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '2px solid var(--border)',
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
            const showCorrect = validated && choice.correct
            const isWrong = validated && isSelected && !choice.correct

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

      {/* Footer */}
      <div
        style={{
          padding: '20px 0',
          borderTop: '1.5px solid var(--border)',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
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
              background: current.choices[selected!].correct ? '#58CC02' : '#FF4B4B',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              padding: '14px 40px',
              fontSize: 14,
              fontWeight: 800,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              boxShadow: current.choices[selected!].correct ? '0 4px 0 #3d9900' : '0 4px 0 #cc3636',
            }}
          >
            {step + 1 >= totalQuestions ? 'Voir résultat →' : 'Suivant →'}
          </button>
        )}
      </div>
    </div>
  )
}
