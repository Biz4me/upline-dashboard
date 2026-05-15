'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, X, Sparkles, ArrowRight, Zap } from 'lucide-react'

export default function PricingPage() {
  const [billing, setBilling] = useState<'mensuel' | 'annuel'>('mensuel')

  const plans = [
    {
      name: 'Starter',
      price: { mensuel: 0, annuel: 0 },
      desc: 'Pour découvrir',
      color: 'rgba(255,255,255,0.04)',
      border: 'rgba(255,255,255,0.08)',
      cta: 'Commencer gratuitement',
      ctaStyle: { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' },
      features: [
        { label: 'Messages Atlas', value: '5/jour' },
        { label: 'Leçons accessibles', value: 'Module 1 uniquement' },
        { label: 'Mémoire Atlas', value: false },
        { label: 'Prospects', value: '5 max' },
        { label: 'Pipeline visuel', value: false },
        { label: 'Export PDF', value: false },
        { label: 'Rapport mensuel', value: false },
        { label: 'Gestion équipe', value: false },
        { label: 'Commission 20%', value: false },
        { label: 'Communauté', value: 'Général' },
      ],
    },
    {
      name: 'Coach',
      price: { mensuel: 19, annuel: 15 },
      desc: 'Pour performer',
      color: 'rgba(109,94,245,0.12)',
      border: '#6D5EF5',
      popular: true,
      cta: 'Essayer 7 jours →',
      ctaStyle: { background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', boxShadow: '0 8px 24px rgba(109,94,245,0.4)' },
      features: [
        { label: 'Messages Atlas', value: 'Illimité' },
        { label: 'Leçons accessibles', value: '8/8 modules' },
        { label: 'Mémoire Atlas', value: true },
        { label: 'Prospects', value: 'Illimité' },
        { label: 'Pipeline visuel', value: true },
        { label: 'Export PDF sessions', value: true },
        { label: 'Rapport mensuel', value: false },
        { label: 'Gestion équipe', value: false },
        { label: 'Commission 20%', value: false },
        { label: 'Communauté', value: 'Espace société MLM' },
      ],
    },
    {
      name: 'Pro',
      price: { mensuel: 39, annuel: 31 },
      desc: 'Pour les leaders',
      color: 'rgba(34,211,238,0.06)',
      border: '#22D3EE',
      cta: 'Passer Pro →',
      ctaStyle: { background: 'rgba(34,211,238,0.15)', border: '2px solid #22D3EE', color: '#22D3EE' },
      features: [
        { label: 'Messages Atlas', value: 'Illimité + Prioritaire' },
        { label: 'Leçons accessibles', value: '8/8 + Plan perso' },
        { label: 'Mémoire Atlas', value: true },
        { label: 'Prospects', value: 'Illimité' },
        { label: 'Pipeline visuel', value: true },
        { label: 'Export PDF + CRM', value: true },
        { label: 'Rapport mensuel auto', value: true },
        { label: 'Gestion équipe', value: true },
        { label: 'Commission 20% cash', value: true },
        { label: 'Communauté', value: 'Badge Pro + Priorité' },
      ],
    },
  ]

  const comparaison = [
    { feature: 'Messages Atlas/jour', starter: '5', coach: 'Illimité', pro: 'Illimité + Prioritaire' },
    { feature: 'Atlas se souvient de toi', starter: false, coach: true, pro: true },
    { feature: 'Modules de formation', starter: '1/8', coach: '8/8', pro: '8/8 + plan perso' },
    { feature: 'Quiz & jeux de rôle', starter: false, coach: true, pro: true },
    { feature: 'Prospects', starter: '5 max', coach: 'Illimité', pro: 'Illimité' },
    { feature: 'Pipeline visuel Kanban', starter: false, coach: true, pro: true },
    { feature: 'Télécharge tes bilans coaching', starter: false, coach: true, pro: true },
    { feature: 'Rapport mensuel PDF auto', starter: false, coach: false, pro: true },
    { feature: 'Gestion équipe & stats filleuls', starter: false, coach: false, pro: true },
    { feature: 'Commission cash 20%', starter: false, coach: false, pro: true },
    { feature: 'Badge Pro communauté', starter: false, coach: false, pro: true },
    { feature: 'Page filleuls personnalisée', starter: false, coach: false, pro: true },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', color: 'white', fontFamily: 'var(--font-body, DM Sans, sans-serif)' }}>

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/landing" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>A</div>
            <span style={{ fontSize: 20, fontWeight: 800, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Atline.ai</span>
          </Link>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/login" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 10, padding: '8px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Se connecter</Link>
            <Link href="/signup" style={{ background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', color: 'white', borderRadius: 10, padding: '8px 20px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Essayer 7 jours →</Link>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ textAlign: 'center', padding: '80px 32px 60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(109,94,245,0.1)', border: '1px solid rgba(109,94,245,0.3)', borderRadius: 50, padding: '6px 16px', marginBottom: 24 }}>
          <Zap size={14} color="#a78bfa" />
          <span style={{ fontSize: 13, color: '#a78bfa', fontWeight: 600 }}>Trial 7 jours gratuits • Sans carte bancaire</span>
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, marginBottom: 16, fontFamily: 'var(--font-title)' }}>
          Des prix simples et transparents
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>
          Commencez gratuitement. Évoluez quand vous êtes prêt.
        </p>

        {/* Toggle mensuel/annuel */}
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50, padding: 4 }}>
          {(['mensuel', 'annuel'] as const).map(b => (
            <button key={b} onClick={() => setBilling(b)} style={{
              background: billing === b ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'transparent',
              border: 'none', color: 'white', borderRadius: 50, padding: '8px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>
              {b === 'mensuel' ? 'Mensuel' : 'Annuel'}{b === 'annuel' ? ' (-20%)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* PLANS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 80px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }}>
        {plans.map((plan, i) => (
          <div key={i} style={{
            background: plan.color,
            border: `2px solid ${plan.border}`,
            borderRadius: 24,
            padding: '32px 28px',
            position: 'relative',
            boxShadow: plan.popular ? '0 0 0 4px rgba(109,94,245,0.15)' : 'none',
          }}>
            {plan.popular && (
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 20, padding: '4px 16px', fontSize: 11, fontWeight: 800, letterSpacing: 1, whiteSpace: 'nowrap' }}>
                ⭐ POPULAIRE
              </div>
            )}
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{plan.name}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>{plan.desc}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 52, fontWeight: 900 }}>${plan.price[billing]}</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>/mois</span>
            </div>
            {billing === 'annuel' && plan.price.annuel > 0 && (
              <div style={{ fontSize: 12, color: '#22C55E', marginBottom: 16, fontWeight: 600 }}>
                Économisez ${(plan.price.mensuel - plan.price.annuel) * 12}/an
              </div>
            )}
            <Link href="/signup" style={{ display: 'block', textAlign: 'center', borderRadius: 12, padding: '13px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 28, textDecoration: 'none', ...plan.ctaStyle }}>
              {plan.cta}
            </Link>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {plan.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                  {f.value === false ? (
                    <X size={16} color="rgba(255,255,255,0.2)" strokeWidth={2.5} />
                  ) : (
                    <Check size={16} color="#22C55E" strokeWidth={2.5} />
                  )}
                  <span style={{ color: f.value === false ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.85)' }}>
                    {f.label}{typeof f.value === 'string' ? ` — ${f.value}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FONDATEUR */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px 80px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.08))', border: '2px solid rgba(245,158,11,0.4)', borderRadius: 24, padding: '40px 48px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🏆</div>
          <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#F59E0B' }}>Statut Fondateur</h3>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginBottom: 24, lineHeight: 1.7 }}>
            Convertissez <strong style={{ color: 'white' }}>5 filleuls Coach ou Pro</strong> en 14 jours depuis n'importe quel plan payant et obtenez le statut Fondateur à vie.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            {['Coach à vie OU -50% permanent Pro', 'Badge Fondateur visible', 'Accès bêta nouvelles fonctionnalités', 'Nom dans la page À propos'].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#F59E0B' }}>
                <Check size={14} />
                {r}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>⏳ Limité à 200 Fondateurs</div>
        </div>
      </div>

      {/* COMPARAISON TABLEAU */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 80px' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: 'center', marginBottom: 48, fontFamily: 'var(--font-title)' }}>Comparaison détaillée</h2>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ padding: '16px 24px', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>Fonctionnalité</div>
            {['Starter', 'Coach', 'Pro'].map((p, i) => (
              <div key={i} style={{ padding: '16px 16px', textAlign: 'center', fontSize: 14, fontWeight: 800, color: i === 1 ? '#a78bfa' : i === 2 ? '#22D3EE' : 'white' }}>{p}</div>
            ))}
          </div>
          {comparaison.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: i < comparaison.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
              <div style={{ padding: '14px 24px', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{row.feature}</div>
              {[row.starter, row.coach, row.pro].map((val, j) => (
                <div key={j} style={{ padding: '14px 16px', textAlign: 'center', fontSize: 13 }}>
                  {val === false ? <X size={16} color="rgba(255,255,255,0.2)" style={{ margin: '0 auto' }} /> :
                   val === true ? <Check size={16} color="#22C55E" style={{ margin: '0 auto' }} /> :
                   <span style={{ color: 'rgba(255,255,255,0.7)' }}>{val}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '0 32px 80px' }}>
        <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16 }}>Prêt à commencer ?</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>7 jours gratuits • Sans carte bancaire • Annulation immédiate</p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', color: 'white', borderRadius: 14, padding: '16px 40px', fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 32px rgba(109,94,245,0.4)' }}>
          <Sparkles size={18} />
          Essayer 7 jours gratuitement
          <ArrowRight size={18} />
        </Link>
      </div>

    </div>
  )
}
