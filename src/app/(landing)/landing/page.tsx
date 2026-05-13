'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LandingPage() {
  const [billing, setBilling] = useState<'mensuel' | 'annuel'>('mensuel')
  const [faqOpen, setFaqOpen] = useState<boolean[]>([false, false, false, false, false, false])

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  const c = {
    bg: '#161410',
    sidebar: '#1E1B14',
    card: '#252018',
    border: '#3A3020',
    gold: '#E2B84A',
    goldHover: '#ECC85E',
    text: '#F5F0E8',
    secondary: '#C8B48E',
    muted: '#6A5A3A',
    darkBorder: '#2A2318',
    footerBg: '#0F0D0A',
    green: '#22c55e',
  }

  const styles = `
    .btn-gold {
      background: ${c.gold};
      color: ${c.bg};
      font-weight: 700;
      padding: 13px 26px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      transition: background 0.2s;
    }
    .btn-gold:hover { background: ${c.goldHover}; }
    .btn-outline {
      background: transparent;
      color: #FFF;
      border: 1px solid ${c.border};
      padding: 13px 26px;
      border-radius: 10px;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      transition: border-color 0.2s;
    }
    .btn-outline:hover { border-color: ${c.gold}; }
    .card {
      background: ${c.sidebar};
      border: 1px solid ${c.border};
      border-radius: 12px;
      padding: 20px;
    }
    .tag {
      background: rgba(226,184,74,0.12);
      color: ${c.gold};
      font-size: 10px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 20px;
      border: 1px solid rgba(226,184,74,0.3);
      letter-spacing: 0.05em;
      display: inline-block;
    }
    .stars { color: ${c.gold}; font-size: 13px; }
  `

  const Logo = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8, background: c.gold,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 13, color: c.bg,
      }}>A</div>
      <span style={{ fontWeight: 700, fontSize: 16, color: '#FFF' }}>Upline</span>
      <span style={{ fontWeight: 700, fontSize: 16, color: c.gold }}>.ai</span>
    </div>
  )

  const Section = ({ children, style = {}, id }: { children: React.ReactNode; style?: React.CSSProperties; id?: string }) => (
    <section id={id} style={{ width: '100%', ...style }}>{children}</section>
  )

  return (
    <div style={{ background: c.bg, minHeight: '100vh', color: c.text, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* ===== SECTION 1 — Header ===== */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: c.bg, borderBottom: `1px solid ${c.darkBorder}`,
        padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <Logo />
        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="#features" style={{ color: c.secondary, fontSize: 13, textDecoration: 'none' }}>Fonctionnalités</a>
          <a href="#pricing" style={{ color: c.secondary, fontSize: 13, textDecoration: 'none' }}>Pricing</a>
          <a href="#blog" style={{ color: c.secondary, fontSize: 13, textDecoration: 'none' }}>Blog</a>
          <Link href="/login" style={{ color: c.secondary, fontSize: 13, textDecoration: 'none' }}>Se connecter</Link>
        </nav>
        <Link href="/signup" className="btn-gold" style={{ padding: '8px 16px', fontSize: 13 }}>
          Essayer 1h gratuit
        </Link>
      </header>

      {/* ===== SECTION 2 — Hero ===== */}
      <Section style={{ padding: '72px 32px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="tag" style={{ marginBottom: 20 }}>
            COACH MLM IA — AGNOSTIQUE — TOUTES SOCIÉTÉS
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 700, color: '#FFF', lineHeight: 1.15, margin: '0 0 20px' }}>
            Le coach MLM qui<br />
            <span style={{ color: c.gold }}>ne dort jamais</span>
          </h1>
          <p style={{ color: c.secondary, fontSize: 16, lineHeight: 1.75, marginBottom: 32 }}>
            Atlas, ton coach IA spécialisé MLM, te guide 24/7 pour trouver des prospects,
            gérer les objections et structurer ton business.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
            <Link href="/signup" className="btn-gold">
              Essayer Atlas 1h gratuitement →
            </Link>
            <a href="#demo" className="btn-outline">
              Voir la démo
            </a>
          </div>
          <p style={{ color: c.muted, fontSize: 12 }}>
            Sans carte bancaire · Accès immédiat · Timer visible
          </p>
        </div>
      </Section>

      {/* ===== SECTION 2b — Chat Atlas mockup ===== */}
      <Section style={{ padding: '0 32px 32px' }}>
        <div style={{
          background: c.sidebar, borderRadius: 14, padding: 20,
          maxWidth: 500, margin: '0 auto', border: `1px solid ${c.border}`,
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%', background: c.gold,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 12, color: c.bg,
            }}>A</div>
            <span style={{ color: c.secondary, fontSize: 12 }}>Atlas — Coach IA · En ligne</span>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.green, marginLeft: 'auto' }} />
          </div>
          {/* Bulle Atlas 1 */}
          <div style={{
            background: c.card, borderRadius: '4px 14px 14px 14px',
            padding: '10px 14px', fontSize: 13, color: c.text, maxWidth: '85%', marginBottom: 10,
          }}>
            Bonjour ! Je suis Atlas. Dis-moi ta société MLM et ton objectif — je t'aide à passer au niveau supérieur 🏔️
          </div>
          {/* Bulle User */}
          <div style={{
            background: c.gold, borderRadius: '14px 4px 14px 14px',
            color: c.bg, fontWeight: 500, padding: '10px 14px', fontSize: 13,
            marginLeft: 'auto', maxWidth: '70%', marginBottom: 10,
          }}>
            Comment trouver plus de prospects ?
          </div>
          {/* Bulle Atlas 2 */}
          <div style={{
            background: c.card, borderRadius: '4px 14px 14px 14px',
            padding: '10px 14px', fontSize: 13, color: c.text, maxWidth: '85%', marginBottom: 16,
            whiteSpace: 'pre-line',
          }}>
            Commence par ta liste chaude. Note 10 personnes que tu connais sans pression. Pas pour les recruter — juste pour identifier qui pourrait être intéressé.{"\n\n"}→ Quel est ton marché principal : famille, amis ou collègues ?
          </div>
          {/* Input fake */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              flex: 1, background: c.bg, border: `1px solid ${c.border}`,
              borderRadius: 8, padding: '9px 12px', color: c.text, fontSize: 13,
            }}>
              <span style={{ color: c.muted }}>Écrire à Atlas...</span>
            </div>
            <button className="btn-gold" style={{ padding: '9px 14px', fontSize: 13 }}>→</button>
          </div>
        </div>
      </Section>

      {/* ===== SECTION 3 — Stats bar ===== */}
      <Section style={{ borderBottom: `1px solid ${c.darkBorder}` }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 32px 40px' }}>
          {[
            { num: '500+', label: 'Distributeurs coachés' },
            { num: '12+', label: 'Sociétés MLM' },
            { num: '24/7', label: 'Coach disponible' },
            { num: '4.9★', label: 'Note moyenne' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '0 32px',
              borderRight: i < 3 ? `1px solid ${c.darkBorder}` : 'none',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: c.gold }}>{stat.num}</div>
              <div style={{ fontSize: 12, color: c.secondary, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{
          padding: '16px 32px', display: 'flex', gap: 24,
          alignItems: 'center', justifyContent: 'center',
          borderBottom: `1px solid ${c.darkBorder}`,
        }}>
          <span style={{ color: c.muted, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em' }}>COMPATIBLE AVEC</span>
          {['Herbalife', 'Forever Living', 'Amway', 'Nu Skin', 'doTERRA'].map((name, i) => (
            <span key={name} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <span style={{ color: c.secondary, fontSize: 13, fontWeight: 600 }}>{name}</span>
              {i < 4 && <span style={{ color: c.border }}>·</span>}
            </span>
          ))}
          <span style={{ color: c.secondary, fontSize: 13, fontWeight: 600 }}>et toutes les autres</span>
        </div>
      </Section>

      {/* ===== SECTION 4 — Comment ça marche ===== */}
      <Section id="how" style={{ padding: '56px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#FFF', margin: '0 0 8px' }}>Comment ça marche</h2>
          <p style={{ color: c.secondary, fontSize: 15 }}>3 étapes pour transformer ton business MLM</p>
        </div>
        <div style={{ display: 'flex', maxWidth: 800, margin: '0 auto', alignItems: 'flex-start', justifyContent: 'center', gap: 0 }}>
          {[
            { n: '1', title: 'Inscris-toi', desc: 'Email + pseudo + ta société MLM. 30 secondes et tu es dans le dashboard.' },
            { n: '2', title: 'Atlas te coache', desc: 'Formation, prospects, objections — Atlas s\'adapte à ta société et ton niveau.' },
            { n: '3', title: 'Tu performes', desc: 'Plus de prospects, meilleur suivi, équipe motivée. Résultats mesurables dès la 1ère semaine.' },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', maxWidth: 220, padding: '0 16px' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', background: c.gold,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, color: c.bg, fontWeight: 700,
                  margin: '0 auto 12px',
                }}>{step.n}</div>
                <div style={{ color: '#FFF', fontWeight: 600, marginBottom: 6 }}>{step.title}</div>
                <div style={{ color: c.secondary, fontSize: 13 }}>{step.desc}</div>
              </div>
              {i < 2 && (
                <div style={{ color: c.border, fontSize: 24, padding: '0 8px', alignSelf: 'center' }}>→</div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ===== SECTION 5 — Fonctionnalités ===== */}
      <Section id="features" style={{ padding: '56px 32px', background: c.sidebar }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#FFF', margin: '0 0 8px' }}>Fonctionnalités</h2>
          <p style={{ color: c.secondary, fontSize: 15 }}>Tout ce qu'il te faut pour performer en MLM</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
          maxWidth: 800, margin: '0 auto',
        }}>
          {[
            { emoji: '🚀', title: 'Formation structurée', desc: '8 modules progressifs Go Pro. Quiz, jeux de rôle et exercices pratiques avec Atlas.' },
            { emoji: '📊', title: 'Suivi de tes prospects', desc: 'Pipeline visuel 5 étapes. Qualification par personnalité. Appel direct depuis mobile.' },
            { emoji: '🏆', title: 'Gamification motivante', desc: 'Badges, XP, streak quotidien. Défis terrain et formation. Leaderboard équipe.' },
            { emoji: '💬', title: 'Communauté active', desc: 'Espaces par société MLM. Victoires, techniques, objections. Top contributeurs.' },
          ].map((f, i) => (
            <div key={i} className="card">
              <div style={{ fontSize: 22, marginBottom: 10 }}>{f.emoji}</div>
              <div style={{ color: '#FFF', fontWeight: 600, marginBottom: 6 }}>{f.title}</div>
              <div style={{ color: c.secondary, fontSize: 13 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== SECTION 6 — Témoignages ===== */}
      <Section style={{ padding: '56px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#FFF', margin: '0 0 8px' }}>Témoignages</h2>
          <p style={{ color: c.secondary, fontSize: 15 }}>Des distributeurs MLM de toutes sociétés</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14,
          maxWidth: 900, margin: '0 auto',
        }}>
          {[
            {
              stars: 5, citation: 'Atlas m\'a aidée à structurer mon approche prospection. J\'ai doublé mes contacts qualifiés en 3 semaines.',
              author: 'Marie D.', company: 'Herbalife',
              avatarBg: c.gold, avatarColor: c.bg,
            },
            {
              stars: 5, citation: 'La formation Go Pro intégrée est un game changer. Je me sens enfin équipée pour parler à n\'importe qui.',
              author: 'Sophie B.', company: 'Forever Living',
              avatarBg: c.border, avatarColor: c.gold, border: `2px solid ${c.gold}`,
            },
            {
              stars: 5, citation: 'Le suivi de prospects visuel m\'a fait gagner un temps fou. Mon équipe a grandi de 8 personnes en 2 mois.',
              author: 'Jean-Marc T.', company: 'Amway',
              avatarBg: c.border, avatarColor: c.gold,
            },
          ].map((t, i) => (
            <div key={i} className="card" style={t.border ? { border: t.border } : {}}>
              <div className="stars" style={{ marginBottom: 12 }}>{'★'.repeat(t.stars)}</div>
              <p style={{ color: c.text, fontSize: 14, lineHeight: 1.6, marginBottom: 16, fontStyle: 'italic' }}>
                "{t.citation}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', background: t.avatarBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 12, color: t.avatarColor,
                }}>{t.author[0]}</div>
                <div>
                  <div style={{ color: '#FFF', fontSize: 13, fontWeight: 600 }}>{t.author}</div>
                  <div style={{ color: c.muted, fontSize: 11 }}>{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== SECTION 7 — Pricing ===== */}
      <Section id="pricing" style={{ padding: '56px 32px', background: c.sidebar }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#FFF', margin: '0 0 8px' }}>Pricing</h2>
          <p style={{ color: c.secondary, fontSize: 15 }}>Choisis le plan qui correspond à ton ambition</p>
        </div>
        {/* Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', gap: 4, background: c.card, padding: 4, borderRadius: 8 }}>
            <button
              onClick={() => setBilling('mensuel')}
              style={{
                background: billing === 'mensuel' ? c.gold : 'transparent',
                color: billing === 'mensuel' ? c.bg : c.secondary,
                fontWeight: billing === 'mensuel' ? 700 : 400,
                border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 13,
                cursor: 'pointer',
              }}
            >Mensuel</button>
            <button
              onClick={() => setBilling('annuel')}
              style={{
                background: billing === 'annuel' ? c.gold : 'transparent',
                color: billing === 'annuel' ? c.bg : c.secondary,
                fontWeight: billing === 'annuel' ? 700 : 400,
                border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 13,
                cursor: 'pointer',
              }}
            >Annuel <span style={{ fontSize: 10, opacity: 0.8 }}>-20%</span></button>
          </div>
        </div>
        {/* Plans */}
        <div style={{ display: 'flex', gap: 14, maxWidth: 800, margin: '0 auto', alignItems: 'stretch' }}>
          {/* Starter */}
          <div className="card" style={{ flex: 1, position: 'relative' }}>
            <div style={{ color: c.secondary, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 12 }}>STARTER</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#FFF', marginBottom: 4 }}>$0</div>
            <div style={{ color: c.secondary, fontSize: 13, marginBottom: 16 }}>pour toujours</div>
            <div className="tag" style={{ marginBottom: 20 }}>Je découvre le MLM</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', color: c.secondary, fontSize: 13, lineHeight: 2 }}>
              <li>✓ Accès limité à Atlas</li>
              <li>✓ 2 modules de formation</li>
              <li>✓ Communauté publique</li>
            </ul>
            <Link href="/signup" style={{
              display: 'block', textAlign: 'center',
              background: c.card, border: `1px solid ${c.border}`,
              color: c.text, padding: '12px', borderRadius: 10,
              textDecoration: 'none', fontSize: 13, fontWeight: 600,
            }}>Commencer gratuitement</Link>
          </div>
          {/* Coach */}
          <div className="card" style={{ flex: 1, position: 'relative', border: `2px solid ${c.gold}` }}>
            <div style={{
              position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
              background: c.gold, color: c.bg, fontSize: 10, fontWeight: 700,
              padding: '4px 12px', borderRadius: 20, letterSpacing: '0.05em',
            }}>PLUS POPULAIRE</div>
            <div style={{ color: c.gold, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 12 }}>COACH</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#FFF', marginBottom: 4 }}>
              ${billing === 'mensuel' ? '19' : '15'}
            </div>
            <div style={{ color: c.secondary, fontSize: 13, marginBottom: 16 }}>/mois</div>
            <div className="tag" style={{ marginBottom: 20 }}>Je veux performer</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', color: c.secondary, fontSize: 13, lineHeight: 2 }}>
              <li>✓ Atlas illimité</li>
              <li>✓ 8 modules Go Pro complets</li>
              <li>✓ Pipeline prospects</li>
              <li>✓ Gamification + badges</li>
            </ul>
            <Link href="/signup" className="btn-gold" style={{ display: 'block', textAlign: 'center' }}>
              Démarrer à ${billing === 'mensuel' ? '19' : '15'}/mois →
            </Link>
          </div>
          {/* Pro */}
          <div className="card" style={{ flex: 1, position: 'relative' }}>
            <div style={{ color: c.secondary, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 12 }}>PRO</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#FFF', marginBottom: 4 }}>
              ${billing === 'mensuel' ? '39' : '31'}
            </div>
            <div style={{ color: c.secondary, fontSize: 13, marginBottom: 16 }}>/mois</div>
            <div className="tag" style={{ marginBottom: 20 }}>Je dirige une équipe</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', color: c.secondary, fontSize: 13, lineHeight: 2 }}>
              <li>✓ Tout le plan Coach</li>
              <li>✓ Leaderboard équipe</li>
              <li>✓ Analytics avancées</li>
              <li>✓ Parrainage commission 20%</li>
            </ul>
            <Link href="/signup" style={{
              display: 'block', textAlign: 'center',
              background: c.card, border: `1px solid ${c.border}`,
              color: c.text, padding: '12px', borderRadius: 10,
              textDecoration: 'none', fontSize: 13, fontWeight: 600,
            }}>Passer Pro →</Link>
          </div>
        </div>
        {/* Garanties */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
          {[
            { icon: '🛡️', text: 'Remboursé 7j' },
            { icon: '⚡', text: 'Trial 1h', highlight: true },
            { icon: '🔄', text: 'Sans engagement' },
            { icon: '💰', text: 'Pro s\'autofinance' },
          ].map((g, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: g.highlight ? 'rgba(226,184,74,0.08)' : 'transparent',
              border: g.highlight ? `1px solid rgba(226,184,74,0.25)` : `1px solid ${c.border}`,
              color: g.highlight ? c.gold : c.secondary,
              padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
            }}>
              <span>{g.icon}</span> {g.text}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href="/pricing" style={{ color: c.gold, fontSize: 13, textDecoration: 'none' }}>
            Voir la comparaison complète →
          </Link>
        </div>
      </Section>

      {/* ===== SECTION 8 — Parrainage ===== */}
      <Section style={{ padding: '56px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#FFF', margin: '0 0 8px' }}>Parrainage</h2>
          <p style={{ color: c.secondary, fontSize: 15 }}>Fais grandir la communauté et fais-toi rémunérer</p>
        </div>
        <div style={{ display: 'flex', gap: 20, maxWidth: 700, margin: '0 auto', alignItems: 'stretch' }}>
          {[
            {
              phase: 'Phase 1', title: 'Mois gratuits',
              desc: 'Parraine tes premiers filleuls et gagne des mois gratuits sur ton abonnement. Chaque filleul actif = 1 mois offert.',
            },
            {
              phase: 'Phase 2', title: 'Commission 20% cash',
              desc: 'Dès que tu as 3 filleuls actifs, tu passes en commission cash : 20% de leurs abonnements versés chaque mois.',
              border: `2px solid ${c.gold}`,
            },
            {
              phase: 'Exemple', title: '',
              desc: '',
              custom: (
                <div>
                  <div style={{ color: c.gold, fontWeight: 700, fontSize: 20, marginBottom: 4 }}>5 filleuls Pro</div>
                  <div style={{ color: c.gold, fontWeight: 700, fontSize: 24, marginBottom: 8 }}>= $39/mois</div>
                  <div style={{ color: c.secondary, fontSize: 13 }}>Ton plan Pro financé + $0 net</div>
                </div>
              ),
            },
          ].map((p, i) => (
            <div key={i} className="card" style={{
              flex: 1, textAlign: 'center',
              border: p.border || `1px solid ${c.border}`,
            }}>
              {p.custom || (
                <>
                  <div style={{ color: c.gold, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8 }}>{p.phase}</div>
                  <div style={{ color: '#FFF', fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{p.title}</div>
                  <div style={{ color: c.secondary, fontSize: 13, lineHeight: 1.6 }}>{p.desc}</div>
                </>
              )}
              {i < 2 && (
                <div style={{ color: c.border, fontSize: 24, position: 'absolute', right: -18, top: '50%', transform: 'translateY(-50%)' }}>→</div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ===== SECTION 9 — FAQ ===== */}
      <Section style={{ padding: '56px 32px', background: c.sidebar }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#FFF', margin: '0 0 8px' }}>FAQ</h2>
          <p style={{ color: c.secondary, fontSize: 15 }}>Les questions les plus fréquentes</p>
        </div>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {[
            {
              q: 'Atlas fonctionne-t-il avec ma société MLM ?',
              a: 'Oui ! Atlas est agnostique et fonctionne avec toutes les sociétés MLM : Herbalife, Forever Living, Amway, Nu Skin, doTERRA, et toutes les autres. Il s\'adapte à ton contexte spécifique.',
            },
            {
              q: 'Puis-je vraiment essayer gratuitement ?',
              a: 'Absolument. Tu as 1 heure gratuite sans carte bancaire. Un timer est visible pour que tu saches exactement où tu en es.',
            },
            {
              q: 'Comment Atlas m\'aide-t-il à trouver des prospects ?',
              a: 'Atlas te guide étape par étape : liste chaude, approche personnalisée par personnalité, gestion des objections, et suivi structuré dans un pipeline visuel.',
            },
            {
              q: 'Puis-je annuler mon abonnement à tout moment ?',
              a: 'Oui, sans engagement et sans frais. Tu peux annuler depuis ton dashboard en un clic. Remboursement sous 7 jours si tu n\'es pas satisfait.',
            },
            {
              q: 'Quelle est la différence entre Coach et Pro ?',
              a: 'Coach te donne accès à toute la formation, Atlas illimité et le suivi prospects. Pro ajoute le leaderboard équipe, les analytics avancées et le parrainage avec commission.',
            },
            {
              q: 'Le parrainage fonctionne comment ?',
              a: 'Parraine des filleuls et gagne des mois gratuits (Phase 1) puis 20% de commission cash sur leurs abonnements (Phase 2). 5 filleuls Pro = ton plan Pro financé.',
            },
          ].map((faq, i) => (
            <div
              key={i}
              onClick={() => toggleFaq(i)}
              style={{
                borderBottom: `0.5px solid ${c.border}`,
                padding: '16px 0', cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 500, color: '#FFF', fontSize: 14 }}>{faq.q}</span>
                <span style={{ color: c.gold, fontSize: 18, fontWeight: 300 }}>{faqOpen[i] ? '−' : '+'}</span>
              </div>
              {faqOpen[i] && (
                <p style={{ color: c.secondary, fontSize: 13, lineHeight: 1.7, margin: '12px 0 0', paddingRight: 24 }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ===== SECTION 10 — Blog aperçu ===== */}
      <Section id="blog" style={{ padding: '56px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#FFF', margin: '0 0 8px' }}>Blog</h2>
          <p style={{ color: c.secondary, fontSize: 15 }}>Conseils, techniques et success stories</p>
        </div>
        <div style={{ display: 'flex', gap: 14, maxWidth: 900, margin: '0 auto' }}>
          {[
            { tag: 'PROSPECTION', title: '5 phrases pour briser la glace avec n\'importe quel prospect', time: '5 min', author: 'Atlas' },
            { tag: 'FORMATION', title: 'Comment Atlas utilise Go Pro pour structurer ta formation', time: '8 min', author: 'Patrice' },
            { tag: 'SUCCESS STORY', title: 'De 0 à 15 distributeurs en 90 jours avec Upline.ai', time: '4 min', author: 'Marie D.' },
          ].map((article, i) => (
            <div key={i} className="card" style={{ flex: 1 }}>
              <div style={{
                height: 60, background: 'rgba(226,184,74,0.08)',
                border: `1px solid ${c.border}`, borderRadius: 8,
                marginBottom: 12,
              }} />
              <div className="tag" style={{ marginBottom: 10 }}>{article.tag}</div>
              <div style={{ color: '#FFF', fontWeight: 600, fontSize: 15, marginBottom: 8, lineHeight: 1.4 }}>
                {article.title}
              </div>
              <p style={{ color: c.secondary, fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>
                Découvre les stratégies et techniques qui ont fait la différence pour des distributeurs comme toi.
              </p>
              <div style={{ color: c.muted, fontSize: 11 }}>
                {article.author} · {article.time}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/blog" className="btn-outline">
            Voir tous les articles →
          </Link>
        </div>
      </Section>

      {/* ===== SECTION 11 — CTA final ===== */}
      <Section style={{ padding: '72px 32px', background: c.gold, textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: c.bg, margin: '0 0 12px' }}>
          Prêt à passer au niveau supérieur ?
        </h2>
        <p style={{ color: 'rgba(22,20,16,0.7)', fontSize: 15, marginBottom: 32 }}>
          Rejoins 500+ distributeurs qui coachent avec Atlas.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
          <Link href="/signup" style={{
            background: c.bg, color: c.gold, fontWeight: 700,
            padding: '14px 28px', borderRadius: 10, textDecoration: 'none', display: 'inline-block',
          }}>
            Essayer 1h gratuitement →
          </Link>
          <a href="#pricing" style={{
            background: 'transparent', color: c.bg,
            border: '1.5px solid rgba(22,20,16,0.3)',
            padding: '14px 28px', borderRadius: 10, textDecoration: 'none', display: 'inline-block',
            fontWeight: 600,
          }}>
            Voir les plans
          </a>
        </div>
        <p style={{ color: 'rgba(22,20,16,0.5)', fontSize: 12, marginTop: 16 }}>
          Sans carte bancaire · Annulable à tout moment
        </p>
      </Section>

      {/* ===== SECTION 12 — Footer ===== */}
      <footer style={{ background: c.footerBg, padding: '48px 32px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 40, maxWidth: 1100, margin: '0 auto',
        }}>
          {/* Col 1 */}
          <div>
            <Logo />
            <p style={{ color: c.muted, fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>
              La plateforme IA qui forme et coache les distributeurs MLM.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              {['X', 'in', 'ig'].map((social) => (
                <div key={social} style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: `1px solid ${c.darkBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: c.secondary, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                }}>{social}</div>
              ))}
            </div>
          </div>
          {/* Col 2 */}
          <div>
            <div style={{ color: '#FFF', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Produit</div>
            {[
              { label: 'Fonctionnalités', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Blog', href: '#blog' },
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Se connecter', href: '/login' },
            ].map((link) => (
              <div key={link.label} style={{ marginBottom: 8 }}>
                <Link href={link.href} style={{ color: c.secondary, fontSize: 13, textDecoration: 'none' }}>
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
          {/* Col 3 */}
          <div>
            <div style={{ color: '#FFF', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Ressources</div>
            {[
              { label: 'Formation MLM', href: '#' },
              { label: 'Guide prospection', href: '#' },
              { label: 'Gestion objections', href: '#' },
              { label: 'À propos', href: '#' },
            ].map((link) => (
              <div key={link.label} style={{ marginBottom: 8 }}>
                <a href={link.href} style={{ color: c.secondary, fontSize: 13, textDecoration: 'none' }}>
                  {link.label}
                </a>
              </div>
            ))}
          </div>
          {/* Col 4 */}
          <div>
            <div style={{ color: '#FFF', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Légal</div>
            {[
              { label: 'Confidentialité', href: '#' },
              { label: 'CGU', href: '#' },
              { label: 'Cookies', href: '#' },
              { label: 'Contact', href: '#' },
            ].map((link) => (
              <div key={link.label} style={{ marginBottom: 8 }}>
                <a href={link.href} style={{ color: c.secondary, fontSize: 13, textDecoration: 'none' }}>
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          borderTop: `1px solid ${c.darkBorder}`,
          marginTop: 32, paddingTop: 24, textAlign: 'center',
        }}>
          <p style={{ color: c.muted, fontSize: 12 }}>© 2026 Upline.ai — Tous droits réservés</p>
        </div>
      </footer>
    </div>
  )
}
