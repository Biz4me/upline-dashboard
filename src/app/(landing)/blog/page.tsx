'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BlogPage() {
  const [categorie, setCategorie] = useState('TOUS')

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

  const categories = ['TOUS', 'PROSPECTION', 'FORMATION', 'SUCCESS STORIES', 'OBJECTIONS']

  const articles = [
    {
      cat: 'PROSPECTION',
      title: '5 phrases pour briser la glace avec n\'importe quel prospect',
      excerpt: 'Découvre les formules exactes que les top distributeurs utilisent pour engager la conversation sans paraître commercial.',
      author: 'Marie D.',
      date: '12 Mai 2026',
      time: '5 min de lecture',
    },
    {
      cat: 'FORMATION',
      title: 'Comment Atlas utilise Go Pro pour structurer ta formation',
      excerpt: 'Les 8 modules de formation Upline.ai sont basés sur les principes de Keith Schreiter. Voici comment Atlas les adapte à ton niveau.',
      author: 'Équipe Upline',
      date: '10 Mai 2026',
      time: '8 min de lecture',
    },
    {
      cat: 'SUCCESS STORIES',
      title: 'De 0 à 15 distributeurs en 90 jours avec Upline.ai',
      excerpt: 'Thomas partage son parcours : comment il est passé de débutant à leader d\'une équipe de 15 avec le coaching quotidien d\'Atlas.',
      author: 'Thomas R.',
      date: '8 Mai 2026',
      time: '4 min de lecture',
    },
    {
      cat: 'OBJECTIONS',
      title: 'Les 7 objections MLM les plus fréquentes (et comment les retourner)',
      excerpt: 'C\'est une pyramide, je n\'ai pas le temps, je ne suis pas vendeur... Atlas te prépare à répondre sans stresser.',
      author: 'Équipe Upline',
      date: '5 Mai 2026',
      time: '6 min de lecture',
    },
    {
      cat: 'PROSPECTION',
      title: 'Liste chaude vs marché froid : quelle stratégie choisir ?',
      excerpt: 'Deux approches, deux états d\'esprit. Atlas analyse ton profil et te recommande la stratégie adaptée à ta personnalité.',
      author: 'Sophie B.',
      date: '2 Mai 2026',
      time: '7 min de lecture',
    },
    {
      cat: 'FORMATION',
      title: 'Gamification : pourquoi les badges et XP t\'aident vraiment à progresser',
      excerpt: 'La psychologie derrière la gamification Upline.ai : comment le streak quotidien et les défis transforment tes habitudes.',
      author: 'Équipe Upline',
      date: '28 Avr 2026',
      time: '5 min de lecture',
    },
  ]

  const filtered = categorie === 'TOUS' ? articles : articles.filter(a => a.cat === categorie)

  const MountainIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={c.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
      <path d="M8 18l4-8 4 8" />
      <path d="M4 22l6-12 4 8 6-12" />
    </svg>
  )

  return (
    <div style={{ background: c.bg, minHeight: '100vh', color: c.text, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Header />

      <section style={{ padding: '56px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#FFF', margin: '0 0 8px' }}>Blog</h1>
          <p style={{ color: c.secondary, fontSize: 15 }}>Conseils, techniques et success stories</p>
        </div>

        {/* Filtre pills */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const active = categorie === cat
            return (
              <button
                key={cat}
                onClick={() => setCategorie(cat)}
                style={{
                  background: active ? c.gold : c.sidebar,
                  color: active ? c.bg : c.secondary,
                  fontWeight: active ? 700 : 400,
                  border: active ? 'none' : `1px solid ${c.border}`,
                  padding: '7px 16px', borderRadius: 20, fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Grid articles */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
          maxWidth: 1000, margin: '0 auto',
        }}>
          {filtered.map((article, i) => (
            <div
              key={i}
              style={{
                background: c.sidebar,
                border: `1px solid ${c.border}`,
                borderRadius: 12,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <div style={{
                height: 140,
                background: 'rgba(226,184,74,0.08)',
                borderBottom: `1px solid ${c.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <MountainIcon />
              </div>
              <div style={{ padding: 16 }}>
                <div className="tag" style={{ marginBottom: 8 }}>{article.cat}</div>
                <div style={{ color: '#FFF', fontSize: 15, fontWeight: 600, margin: '8px 0', lineHeight: 1.4 }}>
                  {article.title}
                </div>
                <p style={{ color: c.secondary, fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  {article.excerpt}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                  <span style={{ color: c.muted, fontSize: 11 }}>{article.author}</span>
                  <span style={{ color: c.muted, fontSize: 11 }}>{article.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
