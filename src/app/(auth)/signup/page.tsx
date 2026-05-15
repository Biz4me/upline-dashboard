'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Sparkles, ArrowRight, Check } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    email: '', password: '', username: '', societe: '',
    prenom: '', nom: '', telephone: '', niveau: '', objectif: ''
  })

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password, username: form.username, societe: form.societe }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Erreur lors de la création du compte'); return }
      setStep(2)
    } catch { setError('Une erreur est survenue') }
    finally { setLoading(false) }
  }

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { signIn } = await import('next-auth/react')
      await signIn('credentials', { redirect: false, identifier: form.email, password: form.password })
      await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom: form.prenom, nom: form.nom, telephone: form.telephone, niveau: form.niveau, objectif: form.objectif }),
      })
      router.push('/onboarding')
    } catch { router.push('/') }
    finally { setLoading(false) }
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1.5px solid rgba(255,255,255,0.08)',
    borderRadius: 12, padding: '13px 16px',
    fontSize: 14, color: 'white', outline: 'none', boxSizing: 'border-box' as const,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -100, left: '10%', width: 400, height: 400, background: '#6D5EF5', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.1 }} />
      <div style={{ position: 'absolute', bottom: -100, right: '10%', width: 300, height: 300, background: '#22D3EE', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.08 }} />

      <div style={{ width: '100%', maxWidth: 480, position: 'relative' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/landing" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(109,94,245,0.4)' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>A</span>
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Atline.ai</span>
          </Link>
        </div>

        {/* Steps indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
          {[1, 2].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: step >= s ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'rgba(255,255,255,0.06)',
                border: step >= s ? 'none' : '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: step >= s ? 'white' : 'rgba(255,255,255,0.3)',
                boxShadow: step >= s ? '0 4px 12px rgba(109,94,245,0.3)' : 'none',
              }}>
                {step > s ? <Check size={14} /> : s}
              </div>
              {s < 2 && <div style={{ width: 40, height: 2, background: step > s ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'rgba(255,255,255,0.06)', borderRadius: 1 }} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '36px 32px', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>

          {step === 1 && (
            <>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 6, textAlign: 'center' }}>Créer votre compte</h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 28 }}>Étape 1/2 — Informations essentielles</p>
              <form onSubmit={handleStep1} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Email *</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="votre@email.com" required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Pseudo *</label>
                    <input type="text" value={form.username} onChange={e => set('username', e.target.value)} placeholder="@monpseudo" required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Mot de passe *</label>
                  <div style={{ position: 'relative' }}>
                    <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} placeholder="••••••••" required minLength={8}
                      style={{ ...inputStyle, paddingRight: 48 }}
                      onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Société MLM *</label>
                  <input type="text" value={form.societe} onChange={e => set('societe', e.target.value)} placeholder="Ex: Herbalife, Amway..." required style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                </div>
                {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#EF4444' }}>{error}</div>}
                <button type="submit" disabled={loading}
                  style={{ background: loading ? 'rgba(109,94,245,0.5)' : 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', borderRadius: 12, padding: '14px 0', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', width: '100%', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(109,94,245,0.35)' }}>
                  {loading ? 'Création...' : <><Sparkles size={16} /> Continuer <ArrowRight size={16} /></>}
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 6, textAlign: 'center' }}>Personnaliser votre profil</h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 28 }}>Étape 2/2 — Optionnel, vous pouvez passer</p>
              <form onSubmit={handleStep2} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Prénom</label>
                    <input type="text" value={form.prenom} onChange={e => set('prenom', e.target.value)} placeholder="Votre prénom" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Nom</label>
                    <input type="text" value={form.nom} onChange={e => set('nom', e.target.value)} placeholder="Votre nom" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Téléphone</label>
                  <input type="tel" value={form.telephone} onChange={e => set('telephone', e.target.value)} placeholder="+33 6 00 00 00 00" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Niveau actuel</label>
                  <select value={form.niveau} onChange={e => set('niveau', e.target.value)}
                    style={{ ...inputStyle, appearance: 'none' as const }}>
                    <option value="">Choisir...</option>
                    <option value="debutant">Débutant (0-6 mois)</option>
                    <option value="intermediaire">Intermédiaire (6-24 mois)</option>
                    <option value="avance">Avancé (2 ans+)</option>
                    <option value="leader">Leader d&apos;équipe</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 6 }}>Objectif principal</label>
                  <input type="text" value={form.objectif} onChange={e => set('objectif', e.target.value)} placeholder="Ex: Atteindre le rang Diamant en 6 mois" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#6D5EF5'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                  <button type="button" onClick={() => router.push('/')}
                    style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', borderRadius: 12, padding: '13px 0', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    Passer
                  </button>
                  <button type="submit" disabled={loading}
                    style={{ flex: 2, background: loading ? 'rgba(109,94,245,0.5)' : 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', borderRadius: 12, padding: '13px 0', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(109,94,245,0.35)' }}>
                    {loading ? 'Enregistrement...' : <><Check size={16} /> Terminer <ArrowRight size={16} /></>}
                  </button>
                </div>
              </form>
            </>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Déjà un compte ?</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <Link href="/login" style={{ display: 'block', textAlign: 'center', color: '#a78bfa', fontSize: 13, fontWeight: 600, textDecoration: 'none', marginTop: 14 }}>
            Se connecter →
          </Link>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 20 }}>
          ✓ Aucune carte requise &nbsp;•&nbsp; ✓ 7 jours gratuits
        </p>
      </div>
    </div>
  )
}
