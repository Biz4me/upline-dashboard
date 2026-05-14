'use client'
import { useState } from 'react'
import Link from 'next/link'
import AtlasChat from '@/components/atlas/AtlasChat'

const modules = [
  {
    id: 1,
    titre: "Fondations & État d'esprit",
    duree: "1 semaine",
    lecons: 4,
    progression: 100,
    statut: "termine",
    description: "Comprendre le MLM professionnel, définir sa vision et installer ses habitudes de réussite.",
    format: ["texte", "quiz"],
    livres: ["Go Pro — Eric Worre", "Atomic Habits — James Clear", "Père riche, père pauvre — Kiyosaki"],
  },
  {
    id: 2,
    titre: "Trouver des prospects",
    duree: "1 semaine",
    lecons: 5,
    progression: 60,
    statut: "en-cours",
    description: "Construire une liste illimitée, activer son marché chaud/tiède/froid et prospecter au quotidien.",
    format: ["texte", "audio", "quiz"],
    livres: ["45 secondes — Don Failla", "Comment se faire des amis — Carnegie", "Fanatical Prospecting — Blount"],
  },
  {
    id: 3,
    titre: "Inviter les prospects",
    duree: "2 semaines",
    lecons: 6,
    progression: 0,
    statut: "disponible",
    description: "Maîtriser les 8 étapes de l'invitation, les 4 personnalités et les brise-glaces de Tom Schreiter.",
    format: ["video", "audio", "quiz"],
    livres: ["Ice Breakers — Tom Schreiter", "Four Color Personalities — Schreiter", "Influence — Cialdini"],
  },
  {
    id: 4,
    titre: "Présenter l'opportunité",
    duree: "2 semaines",
    lecons: 5,
    progression: 0,
    statut: "disponible",
    description: "Construire une présentation duplicable, maîtriser le storytelling et les outils tiers.",
    format: ["video", "texte", "pratique"],
    livres: ["45 secondes — Don Failla", "Building a StoryBrand — Miller", "Made to Stick — Heath"],
  },
  {
    id: 5,
    titre: "Effectuer le suivi",
    duree: "1 semaine",
    lecons: 4,
    progression: 0,
    statut: "verrouille",
    description: "Organiser un système de suivi rigoureux et transformer les maybe en oui.",
    format: ["texte", "audio", "quiz"],
    livres: ["How to Follow Up — Schreiter", "Objections — Jeb Blount"],
  },
  {
    id: 6,
    titre: "Conclure & Gérer les objections",
    duree: "2 semaines",
    lecons: 7,
    progression: 0,
    statut: "verrouille",
    description: "Traiter les 10 objections types, appliquer Feel/Felt/Found et conclure naturellement.",
    format: ["video", "pratique", "quiz"],
    livres: ["Never Split the Difference — Voss", "Influence — Cialdini", "Objections — Blount"],
  },
  {
    id: 7,
    titre: "Démarrer ses filleuls",
    duree: "1 semaine",
    lecons: 4,
    progression: 0,
    statut: "verrouille",
    description: "Aider chaque filleul à obtenir ses premiers résultats en 72h avec la méthode Fast Start.",
    format: ["video", "texte", "pratique"],
    livres: ["Go Pro — Worre ch.9", "Sponsoring Magic — Schreiter", "Votre première année — Yarnell"],
  },
  {
    id: 8,
    titre: "Événements & Leadership",
    duree: "2 semaines",
    lecons: 6,
    progression: 0,
    statut: "verrouille",
    description: "Promouvoir les événements, développer son leadership et inspirer son équipe.",
    format: ["video", "texte", "quiz"],
    livres: ["21 lois du leadership — Maxwell", "Start With Why — Sinek", "Leaders Eat Last — Sinek"],
  },
]

const formatIcons: Record<string, string> = {
  texte: "📄",
  video: "🎬",
  audio: "🎧",
  quiz: "✅",
  pratique: "🎯",
}

const statutConfig: Record<string, { label: string; color: string; bg: string }> = {
  termine: { label: "Terminé", color: "#E2B84A", bg: "#E2B84A15" },
  "en-cours": { label: "En cours", color: "#60a5fa", bg: "#60a5fa15" },
  disponible: { label: "Disponible", color: "#A89878", bg: "#A8987815" },
  verrouille: { label: "Verrouillé", color: "#3d3420", bg: "#3d342015" },
}

export default function Formation() {
  const [moduleActif, setModuleActif] = useState<number | null>(2)

  const moduleSelectionne = modules.find(m => m.id === moduleActif)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-[var(--text-muted)]xl font-semibold text-[var(--text)]">Formation</h1>
          <p className="text-[var(--text-secondary)] mt-1">Programme 12 semaines — Du débutant au professionnel</p>
        </div>
        <div className="sm:text-right">
          <div className="text-[#E2B84A] font-bold text-lg">Module 2/8</div>
          <div className="text-[var(--text-muted)] text-sm">60% du module en cours</div>
        </div>
      </div>

      {/* Barre progression globale */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 text-[var(--text-on-card)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[var(--text)] text-sm font-medium">Progression globale</span>
          <span className="text-[#E2B84A] text-sm">~14%</span>
        </div>
        <div className="w-full bg-[var(--gold-muted)] rounded-full h-2">
          <div className="bg-[#E2B84A] h-2 rounded-full" style={{width: '14%'}}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Liste modules */}
        <div className="lg:col-span-1 space-y-3.5">
          {modules.map((module) => {
            const statut = statutConfig[module.statut]
            const actif = moduleActif === module.id
            return (
              <button
                key={module.id}
                onClick={() => module.statut !== 'verrouille' && setModuleActif(module.id)}
                className={`w-full text-left p-5 rounded-xl border transition-all ${
                  actif
                    ? 'bg-[#E2B84A]/10 border-[#E2B84A]/30'
                    : module.statut === 'verrouille'
                    ? 'bg-[var(--bg-card)] border-[var(--border)] opacity-50 cursor-not-allowed'
                    : 'bg-[var(--bg-card)] border-[var(--border)] hover:border-[#E2B84A]/20 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      module.statut === 'termine' ? 'bg-[#E2B84A] text-black' :
                      module.statut === 'en-cours' ? 'bg-[#60a5fa] text-black' :
                      'bg-[var(--gold-muted)] text-[var(--text-muted)]'
                    }`}>
                      {module.statut === 'termine' ? '✓' : module.id}
                    </div>
                    <span className="text-[var(--text-on-card)] text-[15px] font-medium truncate">{module.titre}</span>
                  </div>
                  <span className="text-[var(--text-muted)] text-xs flex-shrink-0 ml-2">{module.duree}</span>
                </div>
                {module.progression > 0 && (
                  <div className="w-full bg-[var(--gold-muted)] rounded-full h-1.5 mt-2">
                    <div
                      className="bg-[#E2B84A] h-1.5 rounded-full"
                      style={{width: `${module.progression}%`}}
                    ></div>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Détail module */}
        <div className="lg:col-span-2 space-y-4">
          {moduleSelectionne ? (
            <>
              {/* Header module */}
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[var(--text-muted)] text-xs mb-1">MODULE {moduleSelectionne.id}</div>
                    <h2 className="text-[var(--text-on-card)] text-xl font-semibold">{moduleSelectionne.titre}</h2>
                  </div>
                  <span className="text-[#E2B84A] text-sm bg-[#E2B84A]/10 px-3 py-1 rounded-full border border-[#E2B84A]/20">
                    {statutConfig[moduleSelectionne.statut].label}
                  </span>
                </div>
                <p className="text-[var(--text-secondary-on-card)] text-sm mb-4">{moduleSelectionne.description}</p>

                {/* Formats */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {moduleSelectionne.format.map(f => (
                    <span key={f} className="text-xs bg-[var(--gold-muted)] text-[var(--text-secondary)] px-3 py-1 rounded-full">
                      {formatIcons[f]} {f.charAt(0).toUpperCase() + f.slice(1)}
                    </span>
                  ))}
                </div>

                {/* Progression */}
                {moduleSelectionne.progression > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--text-muted)]">Progression</span>
                      <span className="text-[#E2B84A]">{moduleSelectionne.progression}%</span>
                    </div>
                    <div className="w-full bg-[var(--gold-muted)] rounded-full h-2">
                      <div className="bg-[#E2B84A] h-2 rounded-full" style={{width: `${moduleSelectionne.progression}%`}}></div>
                    </div>
                  </div>
                )}

                <button className="w-full bg-[#E2B84A] hover:bg-[#ECC85E] text-black font-semibold py-3 rounded-xl transition-colors">
                  {moduleSelectionne.statut === 'termine' ? '🔄 Revoir le module' :
                   moduleSelectionne.statut === 'en-cours' ? '▶ Continuer le module' :
                   '▶ Commencer le module'}
                </button>
              </div>

              {/* Chat Atlas pour ce module */}
              <AtlasChat
                context={`Module ${moduleSelectionne.id} : ${moduleSelectionne.titre}`}
                placeholder="Pose une question à Atlas sur ce module..."
                suggestions={[
                  '🎯 Quiz rapide',
                  '💬 Jeu de rôle',
                  '📝 Exercice pratique',
                ]}
              />

              {/* Livres recommandés */}
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 text-[var(--text-on-card)]">
                <h3 className="text-[var(--text-on-card)] font-medium mb-3">📚 Lectures recommandées</h3>
                <div className="space-y-2">
                  {moduleSelectionne.livres.map((livre, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-[var(--bg)] rounded-lg">
                      <span className="text-[var(--text-secondary)] text-sm">{livre}</span>
                      <div className="flex gap-2 flex-shrink-0">
                        <a href="#" className="text-xs bg-[var(--gold-muted)] hover:bg-[#E2B84A] hover:text-[var(--bg)] text-[var(--text-secondary)] px-2 py-1 rounded transition-colors">
                          Audible
                        </a>
                        <a href="#" className="text-xs bg-[var(--gold-muted)] hover:bg-[#E2B84A] hover:text-[var(--bg)] text-[var(--text-secondary)] px-2 py-1 rounded transition-colors">
                          Amazon
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-8 text-center text-[var(--text-on-card)]">
              <div className="text-[var(--text-muted)]xl mb-3">📚</div>
              <p className="text-[var(--text-secondary)]">Sélectionne un module pour voir son contenu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
