'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PricingPage() {
  const [billing, setBilling] = useState<'m' | 'a'>('m')

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

  const Header = () => (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: c.bg, borderBottom: `1px solid ${c.darkBorder}`,
      padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <Logo />
      <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <a href="/landing#features" style={{ color: c.secondary, fontSize: 13, textDecoration: 'none' }}>Fonctionnalités</a>
        <a href="/landing#pricing" style={{ color: c.secondary, fontSize: 13, textDecoration: 'none' }}>Pricing</a>
        <a href="/landing#blog" style={{ color: c.secondary, fontSize: 13, textDecoration: 'none' }}>Blog</a>
        <Link href="/login" style={{ color: c.secondary, fontSize: 13, textDecoration: 'none' }}>Se connecter</Link>
      </nav>
      <Link href="/signup" className="btn-gold" style={{ padding: '8px 16px', fontSize: 13 }}>
        Essayer 1h gratuit
      </Link>
    </header>
  )

  const Footer = () => (
    <footer style={{ background: c.footerBg, padding: '48px 32px' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: 40, maxWidth: 1100, margin: '0 auto',
      }}>
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
        <div>
          <div style={{ color: '#FFF', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Produit</div>
          {[
            { label: 'Fonctionnalités', href: '/landing#features' },
            { label: 'Pricing', href: '/landing#pricing' },
            { label: 'Blog', href: '/landing#blog' },
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
  )

  const Section = ({ children, style = {}, id }: { children: React.ReactNode; style?: React.CSSProperties; id?: string }) => (
    <section id={id} style={{ width: '100%', ...style }}>{children}</section>
  )

  const renderCell = (val: string, isLast: boolean) => {
    if (val === '✓') return <span style={{ color: c.green, fontWeight: 700 }}>✓</span>
    if (val === '✗') return <span style={{ color: c.muted, opacity: 0.5 }}>✗</span>
    if (val.includes('or')) {
      const text = val.replace('(or)', '')
      return <span style={{ color: c.gold, fontWeight: 700 }}>{text}</span>
    }
    if (val.includes('orange')) {
      const text = val.replace('(orange)', '')
      return <span style={{ color: '#f59e0b', fontSize: 11 }}>{text}</span>
    }
    return <span style={{ color: c.text }}>{val}</span>
  }

  const rows = [
    {
      cat: 'ATLAS — TON COACH IA',
      items: [
        { label: 'Messages par jour', sub: 'Combien de fois tu peux parler à Atlas', vals: ['10/jour', 'Illimité(or)', 'Illimité(or)'] },
        { label: 'Atlas connaît ta société', sub: 'Conseils adaptés à Herbalife, Forever Living, etc.', vals: ['✗', '✓', '✓'] },
        { label: 'Atlas se souvient de toi', sub: 'Il reprend là où vous vous êtes arrêtés', vals: ['✗', '✓', '✓'] },
        { label: 'Réponses prioritaires', sub: 'Atlas répond plus vite — serveur dédié', vals: ['✗', '✗', '✓'] },
      ],
    },
    {
      cat: 'FORMATION',
      items: [
        { label: 'Modules disponibles', sub: 'Programme Go Pro — 12 semaines', vals: ['2/8', '8/8(or)', '8/8(or)'] },
        { label: 'Quiz et jeux de rôle', sub: 'Atlas joue le prospect pour t\'entraîner', vals: ['✗', '✓', '✓'] },
        { label: 'Plan de formation sur mesure', sub: 'Atlas adapte ton parcours à tes objectifs', vals: ['✗', '✗', '✓'] },
      ],
    },
    {
      cat: 'SUIVI DE TES PROSPECTS',
      items: [
        { label: 'Nombre de prospects', sub: 'Dans ton carnet de contacts Upline', vals: ['10 max', 'Illimité(or)', 'Illimité(or)'] },
        { label: 'Suivi visuel de tes prospects', sub: 'Vue pipeline — qui est où dans ton processus', vals: ['✗', '✓', '✓'] },
        { label: 'Conseil Atlas par prospect', sub: 'Atlas analyse et suggère la meilleure approche', vals: ['✗', '✓', '✓'] },
        { label: 'Exporter ta liste de prospects', sub: 'Télécharge en PDF ou Excel', vals: ['✗', '✗', '✓'] },
      ],
    },
    {
      cat: 'COMMUNAUTÉ & RAPPORTS',
      items: [
        { label: 'Accès communauté', sub: 'Partage tes victoires et apprends des autres', vals: ['Général seul.(orange)', '✓', '✓'] },
        { label: 'Espace réservé ta société', sub: 'Discute avec d\'autres distributeurs Herbalife, etc.', vals: ['✗', '✓', '✓'] },
        { label: 'Télécharge tes bilans coaching', sub: 'Export PDF de tes sessions avec Atlas', vals: ['✗', '✓', '✓'] },
        { label: 'Rapport mensuel automatique', sub: 'PDF envoyé le 1er du mois avec tes stats', vals: ['✗', '✗', '✓'] },
      ],
    },
    {
      cat: 'ÉQUIPE & REVENUS (Pro)',
      items: [
        { label: 'Gestion de ton équipe', sub: 'Stats de tes filleuls Upline.ai', vals: ['✗', '✗', '✓'] },
        { label: 'Commission cash 20%', sub: 'Sur chaque filleul Pro que tu parrain', vals: ['✗', '✗', '✓'] },
        { label: 'Badge Pro communauté', sub: 'Visible sur tous tes posts', vals: ['✗', '✗', '✓'] },
        { label: 'Page accueil personnalisée', sub: 'Tes filleuls voient ton lien de parrainage', vals: ['✗', '✗', '✓'] },
      ],
    },
  ]

  return (
    <div style={{ background: c.bg, minHeight: '100vh', color: c.text, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Header />

      <Section style={{ padding: '56px 32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#FFF', margin: '0 0 12px' }}>Pricing</h1>
        <p style={{ color: c.secondary, fontSize: 15, marginBottom: 32 }}>Choisis le plan qui correspond à ton ambition</p>

        {/* Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', gap: 4, background: c.card, padding: 4, borderRadius: 8 }}>
            <button
              onClick={() => setBilling('m')}
              style={{
                background: billing === 'm' ? c.gold : 'transparent',
                color: billing === 'm' ? c.bg : c.secondary,
                fontWeight: billing === 'm' ? 700 : 400,
                border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 13,
                cursor: 'pointer',
              }}
            >Mensuel</button>
            <button
              onClick={() => setBilling('a')}
              style={{
                background: billing === 'a' ? c.gold : 'transparent',
                color: billing === 'a' ? c.bg : c.secondary,
                fontWeight: billing === 'a' ? 700 : 400,
                border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 13,
                cursor: 'pointer',
              }}
            >Annuel <span style={{ fontSize: 10, opacity: 0.8 }}>-20%</span></button>
          </div>
        </div>

        {/* Bannière trial */}
        <div style={{
          background: 'rgba(226,184,74,0.08)', border: '1px solid rgba(226,184,74,0.25)',
          borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
          maxWidth: 700, margin: '0 auto 32px',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: c.gold,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 15, color: c.bg, flexShrink: 0,
          }}>1h</div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontWeight: 600, color: c.text, fontSize: 14 }}>Trial gratuit 1h — Accès complet Plan Coach</div>
            <div style={{ color: c.secondary, fontSize: 12, marginTop: 2 }}>Sans carte bancaire · Timer visible · Onboarding guidé par Atlas · Accès immédiat</div>
          </div>
          <Link href="/signup" style={{
            background: c.gold, color: c.bg, fontSize: 12, fontWeight: 700,
            padding: '8px 16px', borderRadius: 7, textDecoration: 'none', flexShrink: 0,
          }}>
            Essayer maintenant
          </Link>
        </div>

        {/* 3 cards plans */}
        <div style={{ display: 'flex', gap: 14, maxWidth: 800, margin: '0 auto 40px', alignItems: 'stretch' }}>
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
              ${billing === 'm' ? '19' : '15'}
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
              Démarrer à ${billing === 'm' ? '19' : '15'}/mois →
            </Link>
          </div>
          {/* Pro */}
          <div className="card" style={{ flex: 1, position: 'relative' }}>
            <div style={{ color: c.secondary, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 12 }}>PRO</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#FFF', marginBottom: 4 }}>
              ${billing === 'm' ? '39' : '31'}
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

        {/* Tableau comparaison */}
        <div style={{
          background: c.sidebar, borderRadius: 14, padding: '20px 24px',
          maxWidth: 900, margin: '0 auto',
        }}>
          {/* En-tête */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 0 12px', borderBottom: `0.5px solid ${c.border}` }}>
            <div style={{ flex: 1.6 }} />
            <div style={{ flex: 1, textAlign: 'center', color: c.secondary, fontSize: 11, fontWeight: 700 }}>STARTER</div>
            <div style={{ flex: 1, textAlign: 'center', color: c.gold, fontSize: 11, fontWeight: 700 }}>COACH</div>
            <div style={{ flex: 1, textAlign: 'center', color: c.secondary, fontSize: 11, fontWeight: 700 }}>PRO</div>
          </div>

          {rows.map((section, si) => (
            <div key={si}>
              <div style={{
                color: c.gold, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                marginTop: 18, marginBottom: 8, textTransform: 'uppercase',
              }}>
                {section.cat}
              </div>
              {section.items.map((item, ii) => {
                const isLast = ii === section.items.length - 1 && si === rows.length - 1
                return (
                  <div
                    key={ii}
                    style={{
                      display: 'flex', alignItems: 'center',
                      padding: '11px 0',
                      borderBottom: isLast ? 'none' : `0.5px solid ${c.border}`,
                    }}
                  >
                    <div style={{ flex: 1.6 }}>
                      <div style={{ fontSize: 13, color: c.text }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: c.secondary, display: 'block', marginTop: 2 }}>{item.sub}</div>
                    </div>
                    {item.vals.map((v, vi) => (
                      <div key={vi} style={{ flex: 1, textAlign: 'center' }}>
                        {renderCell(v, isLast)}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  )
}
