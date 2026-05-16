'use client'
import { useState } from 'react'
import { Plus, Phone, Search, Users, TrendingUp, UserCheck, Target, Mail } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

const initialProspects = [
  { id: 1, name: 'Marie Dupont', initials: 'M', note: 'Relancer jeudi', temp: 'Chaud', status: 'Suivi', color: '#EF4444' },
  { id: 2, name: 'Jean Martin', initials: 'J', note: 'Présentation lundi', temp: 'Tiède', status: 'Invité', color: '#F59E0B' },
  { id: 3, name: 'Sophie Bernard', initials: 'S', note: 'Appeler cette semaine', temp: 'Chaud', status: 'Liste', color: '#EF4444' },
  { id: 4, name: 'Pierre Dubois', initials: 'P', note: 'Suivi dans 3 jours', temp: 'Froid', status: 'Présenté', color: '#22D3EE' },
  { id: 5, name: 'Laura Petit', initials: 'L', note: 'Démarrage lundi', temp: 'Tiède', status: 'Oui !', color: '#F59E0B' },
]

const tempColors: Record<string, { bg: string; color: string }> = {
  'Chaud': { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
  'Tiède': { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  'Froid': { bg: 'rgba(34,211,238,0.12)', color: '#22D3EE' },
}

const statusColors: Record<string, { bg: string; color: string }> = {
  'Liste': { bg: 'rgba(100,116,139,0.12)', color: '#94A3B8' },
  'Invité': { bg: 'rgba(109,94,245,0.12)', color: '#a78bfa' },
  'Présenté': { bg: 'rgba(34,211,238,0.12)', color: '#22D3EE' },
  'Suivi': { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  'Oui !': { bg: 'rgba(34,197,94,0.12)', color: '#22C55E' },
}

export default function ReseauPage() {
  const [view, setView] = useState<'liste' | 'pipeline'>('liste')
  const [search, setSearch] = useState('')
  const [cardModal, setCardModal] = useState<{ name: string; succes: string } | null>(null)
  const [cardGenerated, setCardGenerated] = useState('')
  const [cardLoading, setCardLoading] = useState(false)
  const [cardCopied, setCardCopied] = useState(false)
  const prospects = initialProspects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const generateCard = async (name: string, succes: string) => {
    setCardLoading(true)
    setCardGenerated('')
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 200,
          messages: [{
            role: 'user',
            content: `Génère un message de félicitation chaleureux et professionnel pour ${name} qui vient de : ${succes}. Le message doit faire 3-4 lignes maximum, être motivant, sincère et MLM-friendly. Réponds UNIQUEMENT avec le message, sans guillemets ni signature.`
          }]
        })
      })
      const data = await response.json()
      setCardGenerated(data.content?.[0]?.text || '')
    } catch {
      setCardGenerated(`Félicitations ${name} ! C'est une victoire qui montre ta persévérance et ton engagement. Continue sur cette lancée, les meilleurs résultats arrivent à ceux qui n'abandonnent pas !`)
    } finally {
      setCardLoading(false)
    }
  }

  const stats = [
    { label: 'À contacter', value: 1, icon: Users, color: '#6D5EF5' },
    { label: 'Contactés', value: 1, icon: TrendingUp, color: '#22D3EE' },
    { label: 'En cours', value: 1, icon: UserCheck, color: '#FF9600' },
    { label: 'Rejoints', value: 1, icon: Target, color: '#22C55E' },
  ]

  const pipeline = ['Liste', 'Invité', 'Présenté', 'Suivi', 'Oui !']

  return (
    <div className="overflow-x-fix page-padding" style={{ maxWidth: 1100, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 4, fontFamily: 'var(--font-title)' }}>
            Mon Réseau
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Réseau Herbalife · {prospects.length} prospects actifs</p>
        </div>
        <button style={{
          background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
          border: 'none', color: 'white', borderRadius: 12,
          padding: '10px 20px', fontSize: 13, fontWeight: 700,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 12px rgba(109,94,245,0.35)',
        }}>
          <Plus size={16} strokeWidth={2.5} />
          + Prospect
        </button>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          )
        })}
      </div>

      {/* Tabs + Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 4 }}>
          {(['liste', 'pipeline'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              background: view === v ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'transparent',
              border: 'none', color: view === v ? 'white' : 'var(--text-secondary)',
              borderRadius: 9, padding: '8px 20px', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s',
            }}>
              {v === 'liste' ? 'Liste' : 'Pipeline'}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un prospect..."
            style={{
              width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '10px 14px 10px 38px', fontSize: 13,
              color: 'var(--text)', outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Vue Liste */}
      {view === 'liste' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {prospects.map((p, i) => (
            <div key={p.id} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
              borderBottom: i < prospects.length - 1 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.15s', cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-bg)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: `${p.color}20`, border: `2px solid ${p.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: p.color,
              }}>
                {p.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.note}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: tempColors[p.temp]?.bg, color: tempColors[p.temp]?.color }}>
                  {p.temp}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: statusColors[p.status]?.bg, color: statusColors[p.status]?.color, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {p.status === 'Oui !' ? '✅' : p.status === 'Présenté' ? '👁' : p.status === 'Invité' ? '📞' : p.status === 'Suivi' ? '📋' : '📝'} {p.status}
                </span>
                <button
                  onClick={() => { setCardModal({ name: p.name, succes: 'son avancement dans le business' }); generateCard(p.name, 'son avancement dans le business') }}
                  style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14 }}
                >
                  🎉
                </button>
                <button style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(109,94,245,0.1)', border: '1px solid rgba(109,94,245,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Phone size={14} color="#a78bfa" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vue Pipeline */}
      {view === 'pipeline' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {pipeline.map(stage => (
            <div key={stage} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {stage}
                <span style={{ background: 'rgba(109,94,245,0.1)', color: '#a78bfa', fontSize: 11, fontWeight: 800, padding: '2px 7px', borderRadius: 20 }}>
                  {prospects.filter(p => p.status === stage).length}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {prospects.filter(p => p.status === stage).map(p => (
                  <div key={p.id} style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.note}</div>
                    <div style={{ marginTop: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: tempColors[p.temp]?.bg, color: tempColors[p.temp]?.color }}>
                        {p.temp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Card de félicitation */}
      {cardModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={e => { if (e.target === e.currentTarget) setCardModal(null) }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 32, width: '100%', maxWidth: 480, boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
                🎉 Card pour {cardModal.name}
              </div>
              <button onClick={() => setCardModal(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 20 }}>✕</button>
            </div>

            {/* Card preview */}
            <div style={{ background: 'linear-gradient(135deg, rgba(109,94,245,0.08), rgba(34,211,238,0.05))', border: '1.5px solid rgba(109,94,245,0.2)', borderRadius: 16, padding: 24, marginBottom: 20, minHeight: 120, position: 'relative' }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>🏆</div>
              {cardLoading ? (
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D5EF5', display: 'inline-block' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D5EF5', display: 'inline-block' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D5EF5', display: 'inline-block' }} />
                </div>
              ) : (
                <>
                  <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>{cardGenerated}</p>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>— Patrice, ton upline ✨</div>
                </>
              )}
            </div>

            {/* Sélecteur de succès */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Type de succès</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  '1er prospect contacté',
                  '1er recrutement',
                  'Module terminé',
                  'Rang atteint',
                  'Objectif dépassé',
                ].map(s => (
                  <button key={s} onClick={() => { setCardModal({ ...cardModal, succes: s }); generateCard(cardModal.name, s) }}
                    style={{ background: cardModal.succes === s ? 'rgba(109,94,245,0.15)' : 'var(--bg-page)', border: `1.5px solid ${cardModal.succes === s ? '#6D5EF5' : 'var(--border)'}`, color: cardModal.succes === s ? '#a78bfa' : 'var(--text-secondary)', borderRadius: 20, padding: '5px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Bouton regénérer */}
            <button onClick={() => generateCard(cardModal.name, cardModal.succes)}
              style={{ width: '100%', background: 'var(--bg-page)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              🔄 Regénérer avec Atlas
            </button>

            {/* Actions envoi */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                onClick={() => { navigator.clipboard.writeText(cardGenerated + '\n— Patrice, ton upline ✨'); setCardCopied(true); setTimeout(() => setCardCopied(false), 2000) }}
                style={{ background: 'rgba(109,94,245,0.1)', border: '1.5px solid rgba(109,94,245,0.25)', color: '#a78bfa', borderRadius: 10, padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                {cardCopied ? '✅ Copié !' : '📋 Copier'}
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(cardGenerated + '\n— Patrice, ton upline ✨')}`}
                target="_blank" rel="noreferrer"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1.5px solid rgba(34,197,94,0.25)', color: '#22C55E', borderRadius: 10, padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textDecoration: 'none' }}
              >
                <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: 16 }} /> WhatsApp
              </a>
              <button
                style={{ background: 'rgba(34,211,238,0.1)', border: '1.5px solid rgba(34,211,238,0.25)', color: '#22D3EE', borderRadius: 10, padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <Mail size={16} /> Email
              </button>
              <button
                style={{ background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', borderRadius: 10, padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                🌍 Communauté
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
