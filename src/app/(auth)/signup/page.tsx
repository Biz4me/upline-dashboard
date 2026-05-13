'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SOCIETES = ['Herbalife', 'Forever Living', 'Amway', 'Nu Skin', 'doTERRA', 'Autres']
const NIVEAUX = ['Débutant', 'Intermédiaire', 'Expert']
const OBJECTIFS = [
  'Recruter des distributeurs',
  'Augmenter mes ventes',
  'Me former au MLM',
  'Développer mon leadership',
]

function getPasswordStrength(pw: string): { label: string; color: string; width: string } {
  if (!pw) return { label: '', color: 'transparent', width: '0%' }
  let score = 0
  if (pw.length >= 8) score++
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^a-zA-Z0-9]/.test(pw)) score++

  if (score <= 1) return { label: 'Faible', color: '#ef4444', width: '33%' }
  if (score === 2) return { label: 'Moyen', color: '#f59e0b', width: '66%' }
  return { label: 'Fort', color: '#22c55e', width: '100%' }
}

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  // Step 1
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [societe, setSociete] = useState('')
  const [autreSociete, setAutreSociete] = useState('')

  // Step 2
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [niveau, setNiveau] = useState('')
  const [objectif, setObjectif] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const usernameValid = username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_]+$/.test(username)
  const usernameTouched = username.length > 0
  const pwStrength = getPasswordStrength(password)
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

  const step1Valid =
    email.includes('@') &&
    password.length >= 6 &&
    passwordsMatch &&
    usernameValid &&
    societe !== '' &&
    (societe !== 'Autres' || autreSociete.trim() !== '')

  const finalSociete = societe === 'Autres' ? autreSociete.trim() : societe

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!step1Valid) return
    setStep(2)
  }

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          prenom: '',
          nom: '',
          username,
          societe: finalSociete,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erreur lors de l\'inscription')
        setLoading(false)
        return
      }

      // Connexion automatique après inscription
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Compte créé mais erreur de connexion')
        setLoading(false)
        return
      }

      // Sauvegarde étape 2 si renseignée
      if (firstName || lastName || niveau || objectif) {
        await fetch('/api/user/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prenom: firstName,
            nom: lastName,
            niveau,
            objectif,
            societe: finalSociete,
          }),
        })
      }

      router.push('/')
    } catch {
      setError('Erreur serveur')
      setLoading(false)
    }
  }

  const skipStep2 = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          prenom: '',
          nom: '',
          username,
          societe: finalSociete,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erreur lors de l\'inscription')
        setLoading(false)
        return
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Compte créé mais erreur de connexion')
        setLoading(false)
        return
      }

      router.push('/')
    } catch {
      setError('Erreur serveur')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md px-6">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-1 text-2xl font-bold" style={{ fontFamily: 'var(--font-title), sans-serif' }}>
          <span style={{ color: 'var(--text)' }}>Upline.</span>
          <span style={{ color: 'var(--gold)' }}>ai</span>
          <span style={{ color: 'var(--gold)' }} className="text-3xl ml-0.5">A</span>
        </div>
      </div>

      {/* Progression */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
          <span>Étape {step}/2</span>
          <span>{step === 1 ? 'Obligatoire' : 'Optionnel'}</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: step === 1 ? '50%' : '100%',
              background: 'var(--gold)',
            }}
          />
        </div>
      </div>

      {step === 1 ? (
        <>
          <h1
            className="text-2xl font-bold text-center mb-2"
            style={{ fontFamily: 'var(--font-title), sans-serif', color: 'var(--text)' }}
          >
            Créer mon compte
          </h1>
          <p className="text-center mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
            Rejoignez Upline.ai et propulsez votre MLM
          </p>

          <form onSubmit={handleStep1} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                style={{
                  background: 'var(--bg-input)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                style={{
                  background: 'var(--bg-input)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
                placeholder="••••••••"
              />
              {password && (
                <div className="mt-2">
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: pwStrength.width, background: pwStrength.color }}
                    />
                  </div>
                  <p className="text-xs mt-1" style={{ color: pwStrength.color }}>
                    {pwStrength.label}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                style={{
                  background: 'var(--bg-input)',
                  color: 'var(--text)',
                  border: confirmPassword.length > 0
                    ? passwordsMatch
                      ? '1px solid #22c55e'
                      : '1px solid #ef4444'
                    : '1px solid var(--border)',
                }}
                placeholder="••••••••"
              />
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs mt-1" style={{ color: '#ef4444' }}>
                  Les mots de passe ne correspondent pas
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Pseudo
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                style={{
                  background: 'var(--bg-input)',
                  color: 'var(--text)',
                  border: usernameTouched
                    ? usernameValid
                      ? '1px solid #22c55e'
                      : '1px solid #ef4444'
                    : '1px solid var(--border)',
                }}
                placeholder="ex: patrice_mlm"
              />
              <p className="text-xs mt-1" style={{ color: usernameTouched ? (usernameValid ? '#22c55e' : '#ef4444') : 'var(--text-muted)' }}>
                3-20 caractères, lettres chiffres et _ uniquement
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Votre société MLM
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SOCIETES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSociete(s)}
                    className="px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: societe === s ? 'var(--gold)' : 'var(--bg-input)',
                      color: societe === s ? '#fff' : 'var(--text)',
                      border: societe === s ? '1px solid var(--gold)' : '1px solid var(--border)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {societe === 'Autres' && (
                <input
                  type="text"
                  value={autreSociete}
                  onChange={(e) => setAutreSociete(e.target.value)}
                  required
                  className="w-full mt-2 px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    background: 'var(--bg-input)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                  }}
                  placeholder="Nom de votre société"
                />
              )}
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!step1Valid}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
              style={{
                background: 'var(--gold)',
                color: '#fff',
              }}
              onMouseEnter={(e) => {
                if (step1Valid) (e.target as HTMLElement).style.background = 'var(--gold-hover)'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'var(--gold)'
              }}
            >
              Continuer →
            </button>
          </form>
        </>
      ) : (
        <>
          <h1
            className="text-2xl font-bold text-center mb-2"
            style={{ fontFamily: 'var(--font-title), sans-serif', color: 'var(--text)' }}
          >
            Personnalise ton expérience
          </h1>
          <p className="text-center mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
            Ces infos aident Atlas à mieux te coacher — tu peux les compléter plus tard
          </p>

          <form onSubmit={handleStep2} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Prénom
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    background: 'var(--bg-input)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                  }}
                  placeholder="Jean"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Nom
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    background: 'var(--bg-input)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                  }}
                  placeholder="Dupont"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Votre niveau
              </label>
              <div className="flex gap-2">
                {NIVEAUX.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNiveau(n)}
                    className="flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: niveau === n ? 'var(--gold)' : 'var(--bg-input)',
                      color: niveau === n ? '#fff' : 'var(--text)',
                      border: niveau === n ? '1px solid var(--gold)' : '1px solid var(--border)',
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Objectif principal
              </label>
              <div className="grid grid-cols-1 gap-2">
                {OBJECTIFS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setObjectif(o)}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition-all text-left"
                    style={{
                      background: objectif === o ? 'var(--gold)' : 'var(--bg-input)',
                      color: objectif === o ? '#fff' : 'var(--text)',
                      border: objectif === o ? '1px solid var(--gold)' : '1px solid var(--border)',
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
              style={{
                background: 'var(--gold)',
                color: '#fff',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'var(--gold-hover)'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'var(--gold)'
              }}
            >
              {loading ? 'Création...' : 'Démarrer avec Atlas →'}
            </button>

            <button
              type="button"
              onClick={skipStep2}
              disabled={loading}
              className="w-full text-center text-sm transition-colors disabled:opacity-50"
              style={{ color: 'var(--text-secondary)' }}
            >
              Passer cette étape →
            </button>
          </form>
        </>
      )}

      {/* Lien connexion */}
      <p className="text-center mt-6 text-sm" style={{ color: 'var(--text-muted)' }}>
        Déjà un compte ?{' '}
        <Link
          href="/login"
          className="font-medium transition-colors"
          style={{ color: 'var(--gold)' }}
        >
          Se connecter
        </Link>
      </p>
    </div>
  )
}
