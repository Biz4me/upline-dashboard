'use client'
import { useState } from 'react'

const badges = [
  {
    id: 1,
    nom: "Premier pas",
    icone: "🥇",
    description: "Première connexion sur Upline.ai",
    condition: "Connexion initiale",
    xp: 50,
    obtenu: true,
    date: "1 Mai 2026",
    categorie: "debut",
  },
  {
    id: 2,
    nom: "Listeur",
    icone: "📋",
    description: "100 prospects ajoutés dans le CRM",
    condition: "100 prospects dans le CRM",
    xp: 150,
    obtenu: true,
    date: "5 Mai 2026",
    categorie: "terrain",
  },
  {
    id: 3,
    nom: "Prospecteur",
    icone: "🎯",
    description: "20 invitations réalisées sur le terrain",
    condition: "20 prospects en statut Invité",
    xp: 200,
    obtenu: true,
    date: "10 Mai 2026",
    categorie: "terrain",
  },
  {
    id: 4,
    nom: "Closer",
    icone: "🤝",
    description: "2 recrutements MLM réalisés",
    condition: "2 prospects en statut Oui",
    xp: 300,
    obtenu: false,
    progression: 1,
    total: 2,
    categorie: "terrain",
  },
  {
    id: 5,
    nom: "Bâtisseur",
    icone: "🏗️",
    description: "5 filleuls MLM actifs dans votre équipe",
    condition: "5 filleuls actifs",
    xp: 500,
    obtenu: false,
    progression: 2,
    total: 5,
    categorie: "terrain",
  },
  {
    id: 6,
    nom: "Formateur",
    icone: "🎓",
    description: "Les 8 modules de formation terminés",
    condition: "Compléter les 8 modules",
    xp: 400,
    obtenu: false,
    progression: 1,
    total: 8,
    categorie: "formation",
  },
  {
    id: 7,
    nom: "Champion",
    icone: "🔥",
    description: "30 jours de streak consécutifs",
    condition: "Streak de 30 jours",
    xp: 350,
    obtenu: false,
    progression: 7,
    total: 30,
    categorie: "engagement",
  },
  {
    id: 8,
    nom: "Ambassadeur",
    icone: "⭐",
    description: "3 filleuls Upline.ai Premium convertis",
    condition: "3 filleuls Upline.ai Premium",
    xp: 600,
    obtenu: false,
    progression: 1,
    total: 3,
    categorie: "parrainage",
  },
]

const defis = [
  {
    id: 1,
    type: "TERRAIN",
    texte: "Contacter 3 prospects réels aujourd'hui",
    detail: "Dans ton business Herbalife",
    statut: "fait",
    xp: 30,
    lien: "/business",
  },
  {
    id: 2,
    type: "TERRAIN",
    texte: "Faire 1 présentation cette semaine",
    detail: "Marquer un prospect comme Présenté dans le CRM",
    statut: "en-cours",
    xp: 50,
    lien: "/business",
  },
  {
    id: 3,
    type: "FORMATION",
    texte: "Regarder 2 leçons du module en cours",
    detail: "Module 2 — Trouver des prospects",
    statut: "a-faire",
    xp: 20,
    lien: "/formation",
  },
  {
    id: 4,
    type: "ATLAS",
    texte: "Faire 1 jeu de rôle objections avec Atlas",
    detail: "Entraîne-toi à répondre aux 10 objections types",
    statut: "a-faire",
    xp: 40,
    lien: "/formation",
  },
]

const leaderboard = [
  { rang: 1, nom: "Marie Dupont", xp: 1240, niveau: "Prospecteur", avatar: "M", estMoi: false },
  { rang: 2, nom: "Patrice", xp: 800, niveau: "Explorateur", avatar: "P", estMoi: true },
  { rang: 3, nom: "Jean Martin", xp: 320, niveau: "Débutant", avatar: "J", estMoi: false },
]

const typeConfig: Record<string, { color: string; bg: string }> = {
  TERRAIN: { color: "#f97316", bg: "#f9731615" },
  FORMATION: { color: "#60a5fa", bg: "#60a5fa15" },
  ATLAS: { color: "#E2B84A", bg: "#E2B84A15" },
}

const statutDefiConfig: Record<string, { label: string; color: string }> = {
  fait: { label: "✅ Fait", color: "#E2B84A" },
  "en-cours": { label: "🔄 En cours", color: "#f97316" },
  "a-faire": { label: "🔲 À faire", color: "#6A5A3A" },
}

const semaines = [
  [true, true, true, true, true, true, true],
  [true, true, true, true, true, false, false],
  [true, true, true, false, false, false, false],
  [false, false, false, false, false, false, false],
]

const jours = ["L", "M", "M", "J", "V", "S", "D"]

export default function Achievements() {
  const [badgeActif, setBadgeActif] = useState<typeof badges[0] | null>(null)

  const badgesObtenus = badges.filter(b => b.obtenu)
  const badgesVerrouilles = badges.filter(b => !b.obtenu)
  const xpTotal = 800
  const xpProchain = 1000
  const niveauActuel = "Explorateur"
  const niveauSuivant = "Prospecteur"

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-[var(--text-muted)]xl font-semibold text-[var(--text)]">Succès & Badges</h1>
        <p className="text-[var(--text-secondary)] mt-1">Tes accomplissements terrain et formation</p>
      </div>

      {/* Niveau & XP */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#E2B84A]/20 border-[var(--border)] border-[#E2B84A]/40 flex items-center justify-center text-[var(--text-muted)]xl">
            🏔️
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[var(--text-on-card)] font-bold text-lg">{niveauActuel}</div>
              <div className="text-[#E2B84A] text-sm font-medium">{xpTotal} / {xpProchain} XP</div>
            </div>
            <div className="w-full bg-[var(--gold-muted)] rounded-full h-3 mb-1">
              <div
                className="bg-gradient-to-r from-[#E2B84A] to-[#ECC85E] h-3 rounded-full transition-all"
                style={{width: `${(xpTotal/xpProchain)*100}%`}}
              ></div>
            </div>
            <div className="text-[var(--text-muted)] text-xs">
              Prochain niveau : <span className="text-[var(--text-secondary-on-card)]">{niveauSuivant}</span> — encore {xpProchain - xpTotal} XP
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-[var(--bg)] rounded-lg p-3 text-center">
            <div className="text-[#E2B84A] font-bold text-lg">{badgesObtenus.length}</div>
            <div className="text-[var(--text-muted)] text-xs">Badges obtenus</div>
          </div>
          <div className="bg-[var(--bg)] rounded-lg p-3 text-center">
            <div className="text-[#E2B84A] font-bold text-lg">7</div>
            <div className="text-[var(--text-muted)] text-xs">Streak actuel 🔥</div>
          </div>
          <div className="bg-[var(--bg)] rounded-lg p-3 text-center">
            <div className="text-[#E2B84A] font-bold text-lg">{xpTotal}</div>
            <div className="text-[var(--text-muted)] text-xs">XP total</div>
          </div>
        </div>
      </div>

      {/* Défis de la semaine */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 bg-[#E2B84A] rounded-lg flex items-center justify-center text-black font-bold text-xs">A</div>
          <div>
            <div className="text-[var(--text-on-card)] font-medium text-sm">Atlas — Défis de la semaine</div>
            <div className="text-[var(--text-muted)] text-xs">Les défis TERRAIN sont à réaliser dans ton business Herbalife — pas dans la formation !</div>
          </div>
        </div>
        <div className="space-y-3">
          {defis.map(d => (
            <div key={d.id} className="flex flex-col md:flex-row md:items-center gap-2 p-5 bg-[var(--bg)] rounded-lg">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2 py-1 rounded-full font-semibold flex-shrink-0"
                  style={{ color: typeConfig[d.type].color, background: typeConfig[d.type].bg }}
                >
                  {d.type}
                </span>
                <span className="text-xs flex-shrink-0" style={{ color: statutDefiConfig[d.statut].color }}>
                  {statutDefiConfig[d.statut].label}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[var(--text-on-card)] text-sm">{d.texte}</div>
                <div className="text-[var(--text-muted)] text-xs">{d.detail}</div>
              </div>
              <span className="text-xs text-[#E2B84A] flex-shrink-0">+{d.xp} XP</span>
            </div>
          ))}
        </div>
      </div>

      {/* Badges obtenus */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <h3 className="text-[var(--text-on-card)] font-medium mb-4">🏆 Badges obtenus ({badgesObtenus.length})</h3>
        <div className="grid grid-cols-3 gap-3">
          {badgesObtenus.map(b => (
            <div
              key={b.id}
              onClick={() => setBadgeActif(b)}
              className="bg-[var(--bg)] border border-[#E2B84A]/20 rounded-xl p-4 text-center cursor-pointer hover:border-[#E2B84A]/50 transition-all"
            >
              <div className="text-[var(--text-muted)]xl mb-2">{b.icone}</div>
              <div className="text-[#E2B84A] text-sm font-medium">{b.nom}</div>
              <div className="text-[var(--text-muted)] text-xs mt-1">+{b.xp} XP</div>
              <div className="text-[#3d3420] text-xs mt-1">{b.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges à débloquer */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <h3 className="text-[var(--text-on-card)] font-medium mb-4">🔒 À débloquer ({badgesVerrouilles.length})</h3>
        <div className="space-y-3">
          {badgesVerrouilles.map(b => (
            <div
              key={b.id}
              onClick={() => setBadgeActif(b)}
              className="flex items-center gap-3 p-3 bg-[var(--bg)] rounded-lg cursor-pointer hover:bg-[var(--gold-muted)]/50 transition-all opacity-70"
            >
              <div className="text-[var(--text-muted)]xl grayscale opacity-50">{b.icone}</div>
              <div className="flex-1">
                <div className="text-[var(--text-muted)] text-sm font-medium">{b.nom}</div>
                <div className="text-[#3d3420] text-xs">{b.condition}</div>
                {b.progression !== undefined && b.total !== undefined && (
                  <div className="mt-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[var(--gold-muted)] rounded-full h-1.5">
                        <div
                          className="bg-[#E2B84A]/40 h-1.5 rounded-full"
                          style={{width: `${(b.progression/b.total)*100}%`}}
                        ></div>
                      </div>
                      <span className="text-[#3d3420] text-xs">{b.progression}/{b.total}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-[#3d3420] text-xs">+{b.xp} XP</div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak calendrier */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[var(--text-on-card)] font-medium">🔥 Mon Streak</h3>
          <div className="text-[#E2B84A] font-bold">7 jours</div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {jours.map((j, i) => (
              <div key={i} className="text-center text-[var(--text-muted)] text-xs">{j}</div>
            ))}
          </div>
          {semaines.map((semaine, si) => (
            <div key={si} className="grid grid-cols-7 gap-1 mb-1">
              {semaine.map((actif, ji) => (
                <div
                  key={ji}
                  className={`h-7 rounded-lg flex items-center justify-center text-xs transition-all ${
                    actif
                      ? 'bg-[#E2B84A] text-black font-bold'
                      : 'bg-[var(--gold-muted)] text-[#3d3420]'
                  }`}
                >
                  {actif ? '✓' : ''}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--text-muted)]">Record personnel</span>
          <span className="text-[#E2B84A] font-medium">12 jours 🏆</span>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
        <h3 className="text-[var(--text-on-card)] font-medium mb-4">🏅 Leaderboard équipe</h3>
        <div className="space-y-3">
          {leaderboard.map(u => (
            <div
              key={u.rang}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                u.estMoi
                  ? 'bg-[#E2B84A]/10 border border-[#E2B84A]/20'
                  : 'bg-[var(--bg)]'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                u.rang === 1 ? 'bg-[#E2B84A] text-black' :
                u.rang === 2 ? 'bg-[#A89878] text-black' :
                'bg-[var(--gold-muted)] text-[var(--text-muted)]'
              }`}>
                {u.rang === 1 ? '🥇' : u.rang === 2 ? '🥈' : '🥉'}
              </div>
              <div className="w-8 h-8 rounded-full bg-[#E2B84A]/20 flex items-center justify-center text-[#E2B84A] font-bold text-sm flex-shrink-0">
                {u.avatar}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${u.estMoi ? 'text-[#E2B84A]' : 'text-[var(--text-on-card)]'}`}>
                  {u.nom} {u.estMoi && '← toi'}
                </div>
                <div className="text-[var(--text-muted)] text-xs">{u.niveau}</div>
              </div>
              <div className="text-[#E2B84A] font-bold text-sm">{u.xp} XP</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal badge */}
      {badgeActif && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setBadgeActif(null)}>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 w-full max-w-sm text-center text-[var(--text-on-card)]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setBadgeActif(null)} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text)]">✕</button>
            <div className={`text-[var(--text-muted)]xl mb-4 ${!badgeActif.obtenu ? 'grayscale opacity-50' : ''}`}>{badgeActif.icone}</div>
            <h3 className={`text-xl font-bold mb-2 ${badgeActif.obtenu ? 'text-[#E2B84A]' : 'text-[var(--text-muted)]'}`}>{badgeActif.nom}</h3>
            <p className="text-[var(--text-secondary-on-card)] text-sm mb-3">{badgeActif.description}</p>
            <div className="bg-[var(--bg)] rounded-lg p-3 mb-4">
              <div className="text-[var(--text-muted)] text-xs mb-1">Condition</div>
              <div className="text-[var(--text-secondary-on-card)] text-sm">{badgeActif.condition}</div>
            </div>
            {badgeActif.obtenu ? (
              <div className="text-[#E2B84A] text-sm">✅ Obtenu le {badgeActif.date} · +{badgeActif.xp} XP</div>
            ) : (
              <div>
                {badgeActif.progression !== undefined && badgeActif.total !== undefined && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[var(--text-muted)]">Progression</span>
                      <span className="text-[#E2B84A]">{badgeActif.progression}/{badgeActif.total}</span>
                    </div>
                    <div className="w-full bg-[var(--gold-muted)] rounded-full h-2">
                      <div className="bg-[#E2B84A]/40 h-2 rounded-full" style={{width: `${(badgeActif.progression/badgeActif.total)*100}%`}}></div>
                    </div>
                  </div>
                )}
                <div className="text-[var(--text-muted)] text-sm">🔒 +{badgeActif.xp} XP à débloquer</div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
