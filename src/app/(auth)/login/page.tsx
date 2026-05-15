'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier,
        password,
      })
      if (result?.error) {
        setError('Email/pseudo ou mot de passe incorrect')
      } else {
        router.push('/')
      }
    } catch {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -100, left: '10%', width: 400, height: 400, background: '#6D5EF5', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.1 }} />
      <div style={{ position: 'absolute', bottom: -100, right: '10%', width: 300, height: 300, background: '#22D3EE', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.08 }} />
      <div style={{ width: '100%', maxWidth: 440, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/landing" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(109,94,245,0.4)' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: 20 }}>A</span>
            </div>
            <span style={{ fontSize: 24, fontWeight: 800, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Atline.ai</span>
          </Link>
        </div>
        <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '40px 36px', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'white', marginBottom: 8, textAlign: 'center' }}>Bon retour 👋</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginBottom: 32 }}>Connectez-vous à votre espace Atline.ai</p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 8 }}>Email ou pseudo</label>
              <input type="text" value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="votre@email.com ou @pseudo" required
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '13px 16px', fontSize: 14, color: 'white', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#6D5EF5'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 8 }}>Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '13px 48px 13px 16px', fontSize: 14, color: 'white', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#6D5EF5'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#EF4444' }}>{error}</div>}
            <button type="submit" disabled={loading}
              style={{ background: loading ? 'rgba(109,94,245,0.5)' : 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', borderRadius: 12, padding: '14px 0', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', width: '100%', marginTop: 8, boxShadow: loading ? 'none' : '0 4px 16px rgba(109,94,245,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {loading ? 'Connexion...' : <><Sparkles size={16} /> Se connecter <ArrowRight size={16} /></>}
            </button>
          </form>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Pas encore de compte ?</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <Link href="/signup" style={{ display: 'block', textAlign: 'center', background: 'rgba(109,94,245,0.1)', border: '1.5px solid rgba(109,94,245,0.25)', color: '#a78bfa', borderRadius: 12, padding: '13px 0', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            Créer un compte gratuit →
          </Link>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 24 }}>✓ Aucune carte requise &nbsp;•&nbsp; ✓ 7 jours gratuits &nbsp;•&nbsp; ✓ Annulation immédiate</p>
      </div>
    </div>
  )
}
