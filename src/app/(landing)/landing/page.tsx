'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, MessageSquare, Mic, BookOpen, Users, BarChart3, Zap, Check, X, ChevronDown, Star, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  const [billing, setBilling] = useState<'mensuel' | 'annuel'>('mensuel')
  const [faqOpen, setFaqOpen] = useState<boolean[]>([false, false, false, false, false, false])
  const [demoOpen, setDemoOpen] = useState(false)
  const [demoMessages, setDemoMessages] = useState<{role: 'user'|'atlas', text: string}[]>([
    { role: 'atlas', text: 'Bonjour ! Je suis Atlas, votre coach IA MLM. Dites-moi sur quoi vous voulez progresser aujourd\'hui ?' }
  ])
  const [demoInput, setDemoInput] = useState('')
  const [demoCount, setDemoCount] = useState(0)
  const [demoEmail, setDemoEmail] = useState('')
  const [demoStep, setDemoStep] = useState<'chat'|'email'>('chat')

  const toggleFaq = (i: number) => {
    setFaqOpen(prev => { const n = [...prev]; n[i] = !n[i]; return n })
  }

  const sendDemoMessage = () => {
    if (!demoInput.trim() || demoCount >= 3) return
    const newMessages = [...demoMessages, { role: 'user' as const, text: demoInput }]
    setDemoMessages(newMessages)
    setDemoInput('')
    const count = demoCount + 1
    setDemoCount(count)

    setTimeout(() => {
      if (count >= 3) {
        setDemoMessages(prev => [...prev, {
          role: 'atlas',
          text: 'Tu vois le potentiel ? Imagine avoir Atlas disponible 24h/24 pendant 7 jours complets. Crée ton compte maintenant — aucune carte requise.'
        }])
        setDemoStep('email')
      } else {
        const responses = [
          'Excellente question ! En MLM, la clé est de traiter chaque prospect comme une personne unique. → Commence par poser 2 questions ouvertes avant tout pitch. → Écoute 80% du temps, parle 20%. Tu veux qu\'on pratique ensemble ?',
          'Parfait ! Pour les objections, la méthode Feel/Felt/Found est redoutable. → "Je comprends ce que tu ressens (Feel)..." → "D\'autres ont ressenti la même chose (Felt)..." → "Mais ils ont trouvé que... (Found)". Quelle objection te pose le plus de problèmes ?',
        ]
        setDemoMessages(prev => [...prev, { role: 'atlas', text: responses[count - 1] || responses[0] }])
      }
    }, 800)
  }

  const features = [
    { icon: MessageSquare, title: 'Coaching IA personnalisé', desc: 'Atlas adapte ses conseils à votre niveau, vos objectifs et votre société MLM', color: '#6D5EF5' },
    { icon: Mic, title: 'Simulations vocales', desc: 'Entraînez-vous en conditions réelles : appels, invitations, présentations, closing', color: '#22D3EE' },
    { icon: BookOpen, title: 'Base de connaissances', desc: 'Scripts, méthodes, psychologie de vente, leadership et social selling', color: '#22C55E' },
    { icon: Users, title: "Communauté d'entraide", desc: 'Partagez vos résultats, scripts et participez à des challenges', color: '#F59E0B' },
    { icon: BarChart3, title: 'Analytics & Suivi', desc: 'Visualisez vos progrès et célébrez chaque victoire', color: '#8B5CF6' },
    { icon: Zap, title: 'Agnostique MLM', desc: 'Compatible avec Herbalife, Amway, Forever Living et toute autre société', color: '#06B6D4' },
  ]

  const stats = [
    { val: '500+', label: 'Distributeurs actifs' },
    { val: '12+', label: 'Sociétés MLM' },
    { val: '24/7', label: 'Disponibilité Atlas' },
    { val: '4.9★', label: 'Satisfaction' },
  ]

  const testimonials = [
    { name: 'Marie L.', company: 'Herbalife', text: 'Atlas m\'a aidé à doubler mes recrutements en 3 mois. Les simulations d\'objections sont bluffantes de réalisme.', stars: 5 },
    { name: 'Sophie K.', company: 'Forever Living', text: 'Enfin un outil qui comprend le MLM ! La formation est structurée et les conseils d\'Atlas sont toujours pertinents.', stars: 5 },
    { name: 'Jean-Marc D.', company: 'Amway', text: "Le meilleur investissement pour mon business. Mon équipe utilise aussi Atline et nos résultats s'envolent.", stars: 5 },
  ]

  const faqs = [
    { q: 'Atline.ai fonctionne avec ma société MLM ?', a: 'Oui ! Atline.ai est 100% agnostique — il fonctionne avec Herbalife, Amway, Forever Living, Oriflame, et toute autre société MLM. Atlas adapte ses conseils à votre société spécifique.' },
    { q: 'Que se passe-t-il après les 7 jours d\'essai ?', a: 'Vous passez automatiquement en plan Starter (gratuit) avec 5 messages Atlas/jour et accès au module 1. Aucune carte bancaire requise pour l\'essai.' },
    { q: 'Mes données sont-elles sécurisées ?', a: 'Absolument. Vos données sont chiffrées et ne sont jamais partagées avec des tiers ni avec votre société MLM.' },
    { q: 'Puis-je annuler à tout moment ?', a: 'Oui, sans engagement. Annulation en 1 clic depuis votre profil, effective immédiatement.' },
    { q: 'Atlas remplace-t-il mon upline ?', a: "Non, Atlas complète votre upline. Il est disponible 24h/24 pour les questions du quotidien, les entraînements et le suivi — des tâches que votre upline n'a pas toujours le temps de faire." },
    { q: 'Comment fonctionne la commission 20% Pro ?', a: 'En plan Pro, vous gagnez 20% de commission sur chaque abonnement Coach ou Pro souscrit via votre lien de parrainage, versé via Stripe Connect.' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', color: 'white', fontFamily: 'var(--font-body, DM Sans, sans-serif)' }}>

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, boxShadow: '0 4px 12px rgba(109,94,245,0.4)' }}>A</div>
            <span style={{ fontSize: 20, fontWeight: 800, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Atline.ai</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#features" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Fonctionnalités</a>
            <Link href="/pricing" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Tarifs</Link>
            <Link href="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Blog</Link>
            <Link href="/login" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Se connecter</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setDemoOpen(true)}
              style={{ background: 'rgba(109,94,245,0.15)', border: '1.5px solid #6D5EF5', color: '#a78bfa', borderRadius: 10, padding: '9px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
            >
              Démo Atlas →
            </button>
            <Link href="/signup" style={{
              background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
              color: 'white', borderRadius: 10, padding: '9px 20px', fontSize: 13, fontWeight: 700,
              textDecoration: 'none', boxShadow: '0 4px 12px rgba(109,94,245,0.35)',
            }}>
              Essayer 7 jours →
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '100px 32px 80px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: -100, left: '20%', width: 500, height: 500, background: '#6D5EF5', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.12 }} />
        <div style={{ position: 'absolute', bottom: -100, right: '20%', width: 400, height: 400, background: '#22D3EE', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.1 }} />
        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50, padding: '6px 16px', marginBottom: 32 }}>
            <Sparkles size={14} color="#22D3EE" />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Your AI Upline — Coach MLM disponible 24h/24</span>
          </div>
          <h1 style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.05, marginBottom: 24, fontFamily: 'var(--font-title, Plus Jakarta Sans, sans-serif)' }}>
            Le coach IA universel<br />
            pour les <span style={{ background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>leaders MLM</span>
          </h1>
          <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.7)', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.6 }}>
            Atline.ai transforme chaque distributeur MLM en professionnel du réseau grâce à un coach IA disponible 24h/24, quelle que soit votre société.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <button
              onClick={() => setDemoOpen(true)}
              style={{ background: 'rgba(109,94,245,0.15)', border: '2px solid #6D5EF5', color: 'white', borderRadius: 14, padding: '16px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Sparkles size={18} color="#a78bfa" />
              Démo avec Atlas
            </button>
            <Link href="/signup" style={{
              background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
              color: 'white', borderRadius: 14, padding: '16px 32px', fontSize: 16, fontWeight: 700,
              textDecoration: 'none', boxShadow: '0 8px 32px rgba(109,94,245,0.4)', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              Essayer 7 jours gratuitement
              <ArrowRight size={18} />
            </Link>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            ✓ Aucune carte requise &nbsp;•&nbsp; ✓ Accès immédiat &nbsp;•&nbsp; ✓ Compatible toutes sociétés MLM
          </p>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '0 32px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '24px 16px' }}>
              <div style={{ fontSize: 36, fontWeight: 800, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '80px 32px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, fontFamily: 'var(--font-title)' }}>
              Tout ce dont vous avez besoin<br />pour réussir
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>Train smarter. Recruit faster.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = f.color; e.currentTarget.style.background = `${f.color}10` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${f.color}20`, border: `1px solid ${f.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <Icon size={24} color={f.color} strokeWidth={2} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* POURQUOI ATLINE */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, fontFamily: 'var(--font-title)' }}>Pourquoi Atline.ai ?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { icon: '⚡', title: 'Agnostique MLM', desc: 'Compatible avec toutes les sociétés : Herbalife, Amway, Forever Living...', color: '#6D5EF5' },
              { icon: '🎯', title: 'Scalable mondialement', desc: 'Compétences universelles applicables partout dans le monde', color: '#22D3EE' },
              { icon: '📈', title: 'Forte rétention', desc: "Coaching quotidien qui crée l'habitude et les résultats", color: '#22C55E' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: `${item.color}20`, border: `2px solid ${item.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 20px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 32px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 48, fontWeight: 800, textAlign: 'center', marginBottom: 64, fontFamily: 'var(--font-title)' }}>Ce que disent nos membres</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={16} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, fontFamily: 'var(--font-title)' }}>Des prix simples et transparents</h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 48 }}>Commencez gratuitement, évoluez à votre rythme</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            {[
              { name: 'Starter', price: '$0', desc: 'Pour découvrir', color: 'rgba(255,255,255,0.06)' },
              { name: 'Coach', price: '$19', desc: 'Pour performer', color: 'rgba(109,94,245,0.2)', border: '#6D5EF5', popular: true },
              { name: 'Pro', price: '$39', desc: 'Pour les leaders', color: 'rgba(34,211,238,0.1)', border: '#22D3EE' },
            ].map((p, i) => (
              <div key={i} style={{ background: p.color, border: `2px solid ${p.border || 'rgba(255,255,255,0.08)'}`, borderRadius: 20, padding: '28px 32px', minWidth: 200, position: 'relative' }}>
                {p.popular && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 20, padding: '3px 14px', fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' }}>POPULAIRE</div>}
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontSize: 40, fontWeight: 900, marginBottom: 4 }}>{p.price}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>/mois · {p.desc}</div>
              </div>
            ))}
          </div>
          <Link href="/pricing" style={{ color: '#a78bfa', fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Voir le détail complet des plans <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 32px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 48, fontWeight: 800, textAlign: 'center', marginBottom: 64, fontFamily: 'var(--font-title)' }}>Questions fréquentes</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 0 }}>
              <button
                onClick={() => toggleFaq(i)}
                style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 16, fontWeight: 600, textAlign: 'left' }}
              >
                {faq.q}
                <ChevronDown size={20} style={{ transform: faqOpen[i] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
              </button>
              {faqOpen[i] && (
                <div style={{ paddingBottom: 20, fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', background: 'linear-gradient(135deg, rgba(109,94,245,0.2), rgba(34,211,238,0.1))', border: '1px solid rgba(109,94,245,0.3)', borderRadius: 24, padding: '64px 48px' }}>
          <h2 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, fontFamily: 'var(--font-title)' }}>
            Prêt à devenir un leader MLM ?
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginBottom: 40 }}>
            Scale your network with AI. Rejoignez des milliers de distributeurs qui utilisent Atline.ai.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setDemoOpen(true)}
              style={{ background: 'rgba(109,94,245,0.2)', border: '2px solid #6D5EF5', color: 'white', borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
            >
              Démo gratuite →
            </button>
            <Link href="/signup" style={{ background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', color: 'white', borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(109,94,245,0.35)' }}>
              Commencer maintenant
            </Link>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 24 }}>✓ Aucune carte • ✓ 7 jours gratuits • ✓ Annulation immédiate</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '48px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>A</div>
              <span style={{ fontWeight: 800, fontSize: 16, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Atline.ai</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>Le coach IA universel pour les distributeurs MLM. Formez, recrutez et développez votre réseau avec l'aide de l'IA.</p>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 14 }}>Produit</div>
            {['Fonctionnalités', 'Tarifs', 'Blog', 'Roadmap'].map(l => <div key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 10, cursor: 'pointer' }}>{l}</div>)}
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 14 }}>Légal</div>
            {['CGU', 'Politique de confidentialité', 'Cookies', 'Mentions légales'].map(l => <div key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 10, cursor: 'pointer' }}>{l}</div>)}
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 14 }}>Contact</div>
            {['hello@atline.ai', 'Support', 'Partenariats'].map(l => <div key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 10, cursor: 'pointer' }}>{l}</div>)}
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '32px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>© 2026 Atline.ai — Tous droits réservés</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Made with ❤️ for MLM professionals</span>
        </div>
      </footer>

      {/* DEMO MODAL */}
      {demoOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={(e) => { if (e.target === e.currentTarget) setDemoOpen(false) }}>
          <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, width: '100%', maxWidth: 560, maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Modal header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={18} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>Atlas — Coach IA</div>
                  <div style={{ fontSize: 12, color: '#22C55E' }}>● En ligne</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {demoCount < 3 && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{3 - demoCount} message{3 - demoCount > 1 ? 's' : ''} restant{3 - demoCount > 1 ? 's' : ''}</span>}
                <button onClick={() => setDemoOpen(false)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 20 }}>✕</button>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {demoMessages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%',
                    background: msg.role === 'user' ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'rgba(255,255,255,0.06)',
                    border: msg.role === 'atlas' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    padding: '12px 16px',
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'white',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input ou CTA email */}
            {demoStep === 'chat' && demoCount < 3 ? (
              <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 12 }}>
                <input
                  value={demoInput}
                  onChange={e => setDemoInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendDemoMessage()}
                  placeholder="Posez une question à Atlas..."
                  style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none' }}
                />
                <button
                  onClick={sendDemoMessage}
                  style={{ background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', borderRadius: 12, padding: '12px 20px', color: 'white', cursor: 'pointer', fontWeight: 700 }}
                >
                  →
                </button>
              </div>
            ) : (
              <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, textAlign: 'center' }}>
                  Continuez avec Atlas — 7 jours gratuits
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input
                    value={demoEmail}
                    onChange={e => setDemoEmail(e.target.value)}
                    placeholder="Votre email..."
                    style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', color: 'white', fontSize: 13, outline: 'none' }}
                  />
                  <Link
                    href={`/signup?email=${encodeURIComponent(demoEmail)}`}
                    style={{ background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', color: 'white', borderRadius: 10, padding: '11px 20px', fontSize: 13, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}
                  >
                    Démarrer →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
