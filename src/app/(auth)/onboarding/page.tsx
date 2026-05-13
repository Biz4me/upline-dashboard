'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SOCIETES = ['Herbalife', 'Forever Living', 'Amway', 'Nu Skin', 'doTERRA', 'Autres']
const NIVEAUX = ['Débutant', 'Intermédiaire', 'Expert']
const OBJECTIFS_LIST = [
  'Recruter plus de distributeurs',
  'Augmenter mes ventes',
  'Développer mon leadership',
  'Créer du contenu sur les réseaux',
  'Automatiser mon business',
  'Me former au MLM',
]
const EXPERIENCES = [
  { value: '0-6', label: 'Moins de 6 mois' },
  { value: '6-12', label: '6 à 12 mois' },
  { value: '1-3', label: '1 à 3 ans' },
  { value: '3+', label: 'Plus de 3 ans' },
]

export default function OnboardingPage() {
  const router = useRouter()

  // ─── Étapes ───
  const [step, setStep] = useState(1)
  const totalSteps = 5

  // ─── Données formulaire ───
  const [societe, setSociete] = useState('')
  const [autresSociete, setAutresSociete] = useState('')
  const [niveau, setNiveau] = useState('')
  const [objectifs, setObjectifs] = useState<string[]>([])
  const [experience, setExperience] = useState('')
  const [telephone, setTelephone] = useState('')
  const [pays, setPays] = useState('')
  const [ville, setVille] = useState('')

  // ─── UI ───
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  // ─── Helpers ───
  const toggleObjectif = (obj: string) => {
    setObjectifs((prev) =>
      prev.includes(obj) ? prev.filter((o) => o !== obj) : [...prev, obj]
    )
  }

  const canGoNext = () => {
    switch (step) {
      case 1:
        return societe && (societe !== 'Autres' || autresSociete.trim())
      case 2:
        return !!niveau
      case 3:
        return objectifs.length > 0
      case 4:
        return true // optionnel
      case 5:
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    if (!canGoNext()) return
    setDirection('next')
    setStep((s) => Math.min(s + 1, totalSteps))
  }

  const prevStep = () => {
    setDirection('prev')
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleSubmit = async () => {
    if (!canGoNext()) return
    setLoading(true)
    const societeFinale = societe === 'Autres' && autresSociete ? autresSociete : societe
    localStorage.setItem('upline_societe', societeFinale)
    localStorage.setItem('upline_niveau', niveau)
    window.location.href = '/'
  }

  // ─── Barre de progression ───
  const ProgressBar = () => (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                background: i + 1 <= step ? 'var(--gold)' : 'var(--bg-input)',
                color: i + 1 <= step ? '#fff' : 'var(--text-muted)',
                border: `2px solid ${i + 1 <= step ? 'var(--gold)' : 'var(--border)'}`,
              }}
            >
              {i + 1 < step ? '✓' : i + 1}
            </div>
            {i < totalSteps - 1 && (
              <div
                className="h-1 flex-1 mx-2 rounded-full transition-all duration-300"
                style={{
                  background:
                    i + 1 < step ? 'var(--gold)' : 'var(--border)',
                }}
              />
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        Étape {step} sur {totalSteps}
      </p>
    </div>
  )

  // ─── Étapes ───
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label
                className="block text-sm font-medium mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                Votre société MLM
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SOCIETES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSociete(c)}
                    className="py-3 px-4 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background:
                        societe === c ? 'var(--gold-bg)' : 'var(--bg-input)',
                      color:
                        societe === c ? 'var(--gold)' : 'var(--text-secondary)',
                      border: `1px solid ${
                        societe === c ? 'var(--gold)' : 'var(--border)'
                      }`,
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {societe === 'Autres' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Précisez votre société
                </label>
                <input
                  type="text"
                  value={autresSociete}
                  onChange={(e) => setAutresSociete(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    background: 'var(--bg-input)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                  }}
                  placeholder="Nom de votre société"
                />
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label
                className="block text-sm font-medium mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                Votre niveau d'expérience
              </label>
              <div className="grid grid-cols-3 gap-2">
                {NIVEAUX.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setNiveau(l)}
                    className="py-3 px-2 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background:
                        niveau === l ? 'var(--gold-bg)' : 'var(--bg-input)',
                      color:
                        niveau === l ? 'var(--gold)' : 'var(--text-secondary)',
                      border: `1px solid ${
                        niveau === l ? 'var(--gold)' : 'var(--border)'
                      }`,
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                Depuis combien de temps ?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {EXPERIENCES.map((exp) => (
                  <button
                    key={exp.value}
                    type="button"
                    onClick={() => setExperience(exp.value)}
                    className="py-3 px-4 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background:
                        experience === exp.value
                          ? 'var(--gold-bg)'
                          : 'var(--bg-input)',
                      color:
                        experience === exp.value
                          ? 'var(--gold)'
                          : 'var(--text-secondary)',
                      border: `1px solid ${
                        experience === exp.value ? 'var(--gold)' : 'var(--border)'
                      }`,
                    }}
                  >
                    {exp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label
                className="block text-sm font-medium mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                Vos objectifs (sélectionnez au moins un)
              </label>
              <div className="grid grid-cols-1 gap-2">
                {OBJECTIFS_LIST.map((obj) => {
                  const selected = objectifs.includes(obj)
                  return (
                    <button
                      key={obj}
                      type="button"
                      onClick={() => toggleObjectif(obj)}
                      className="py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center gap-3 text-left"
                      style={{
                        background: selected ? 'var(--gold-bg)' : 'var(--bg-input)',
                        color: selected ? 'var(--gold)' : 'var(--text-secondary)',
                        border: `1px solid ${
                          selected ? 'var(--gold)' : 'var(--border)'
                        }`,
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-md flex items-center justify-center text-xs transition-all"
                        style={{
                          background: selected ? 'var(--gold)' : 'transparent',
                          border: `1.5px solid ${
                            selected ? 'var(--gold)' : 'var(--border)'
                          }`,
                          color: selected ? '#fff' : 'transparent',
                        }}
                      >
                        ✓
                      </span>
                      {obj}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Téléphone <span className="text-xs" style={{ color: 'var(--text-muted)' }}>(optionnel)</span>
              </label>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                style={{
                  background: 'var(--bg-input)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Pays
                </label>
                <input
                  type="text"
                  value={pays}
                  onChange={(e) => setPays(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    background: 'var(--bg-input)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                  }}
                  placeholder="France"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Ville
                </label>
                <input
                  type="text"
                  value={ville}
                  onChange={(e) => setVille(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    background: 'var(--bg-input)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                  }}
                  placeholder="Paris"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2
              className="text-xl font-bold text-center"
              style={{ fontFamily: 'var(--font-title), sans-serif', color: 'var(--text)' }}
            >
              Récapitulatif
            </h2>

            <div
              className="rounded-xl p-5 space-y-4"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Société
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {societe === 'Autres' ? autresSociete : societe}
                </span>
              </div>
              <div className="h-px" style={{ background: 'var(--border)' }} />
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Niveau
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {niveau}
                </span>
              </div>
              <div className="h-px" style={{ background: 'var(--border)' }} />
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Expérience
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {EXPERIENCES.find((e) => e.value === experience)?.label || 'Non précisé'}
                </span>
              </div>
              <div className="h-px" style={{ background: 'var(--border)' }} />
              <div>
                <span className="text-sm block mb-2" style={{ color: 'var(--text-muted)' }}>
                  Objectifs
                </span>
                <div className="flex flex-wrap gap-2">
                  {objectifs.map((obj) => (
                    <span
                      key={obj}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'var(--gold-bg)',
                        color: 'var(--gold)',
                      }}
                    >
                      {obj}
                    </span>
                  ))}
                </div>
              </div>
              {(telephone || pays || ville) && (
                <>
                  <div className="h-px" style={{ background: 'var(--border)' }} />
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      Localisation
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                      {[ville, pays].filter(Boolean).join(', ') || telephone}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-md px-6 py-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div
          className="flex items-center gap-1 text-2xl font-bold"
          style={{ fontFamily: 'var(--font-title), sans-serif' }}
        >
          <span style={{ color: 'var(--text)' }}>Upline.</span>
          <span style={{ color: 'var(--gold)' }}>ai</span>
          <span style={{ color: 'var(--gold)' }} className="text-3xl ml-0.5">
            A
          </span>
        </div>
      </div>

      {/* Titre */}
      <h1
        className="text-3xl font-bold text-center mb-2"
        style={{ fontFamily: 'var(--font-title), sans-serif', color: 'var(--text)' }}
      >
        Bienvenue sur Upline.ai 🏔️
      </h1>
      <p className="text-center mb-8" style={{ color: 'var(--text-muted)' }}>
        Personnalisons votre expérience en quelques étapes
      </p>

      <ProgressBar />

      {/* Contenu de l'étape */}
      {renderStep()}

      {/* Erreur */}
      {error && (
        <div
          className="mt-4 px-4 py-3 rounded-xl text-sm"
          style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
        >
          {error}
        </div>
      )}

      {/* Boutons navigation */}
      <div className="mt-8 flex gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: 'var(--bg-input)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            ← Retour
          </button>
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canGoNext()}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{
              background: 'var(--gold)',
              color: '#fff',
            }}
            onMouseEnter={(e) => {
              if (canGoNext())
                (e.target as HTMLElement).style.background = 'var(--gold-hover)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'var(--gold)'
            }}
          >
            Continuer →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{
              background: 'var(--gold)',
              color: '#fff',
            }}
            onMouseEnter={(e) => {
              if (!loading)
                (e.target as HTMLElement).style.background = 'var(--gold-hover)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = 'var(--gold)'
            }}
          >
            {loading ? 'Démarrage...' : 'Démarrer avec Atlas →'}
          </button>
        )}
      </div>
    </div>
  )
}
