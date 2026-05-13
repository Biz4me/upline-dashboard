'use client'
import { useState } from 'react'

const filleuls = [
  { nom: "Marie Dupont", date: "2 Mai 2026", statut: "premium", avatar: "M" },
  { nom: "Jean Martin", date: "8 Mai 2026", statut: "trial", avatar: "J" },
]

const statutConfig: Record<string, { label: string; color: string; bg: string }> = {
  premium: { label: "⭐ Premium", color: "#E2B84A", bg: "#E2B84A15" },
  trial: { label: "⏱ Trial", color: "#60a5fa", bg: "#60a5fa15" },
  gratuit: { label: "Free", color: "#A89878", bg: "#A8987815" },
}

export default function Parrainage() {
  const [copie, setCopie] = useState(false)

  const lienParrainage = "upline.ai/u/patrice"

  const copierLien = () => {
    navigator.clipboard.writeText("https://" + lienParrainage)
    setCopie(true)
    setTimeout(() => setCopie(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-2xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">Parrainage</h1>
        <p className="text-[#A89878] mt-1">Partagez Upline.ai et gagnez des mois gratuits</p>
      </div>

      {/* Lien unique */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <h3 className="text-white font-medium mb-4">🔗 Mon lien unique</h3>
        <div className="flex gap-2 mb-4">
          <div className="flex-1 bg-[#161410] border border-[#2A2318] rounded-lg px-4 py-3 text-[#E2B84A] text-sm font-mono">
            {lienParrainage}
          </div>
          <button
            onClick={copierLien}
            className="bg-[#E2B84A] hover:bg-[#ECC85E] text-black font-semibold px-4 py-3 rounded-lg transition-colors text-sm flex-shrink-0"
          >
            {copie ? "✓ Copié !" : "Copier"}
          </button>
        </div>

        {/* Boutons partage */}
        <div className="grid grid-cols-4 gap-2">
          <button className="flex flex-col items-center gap-1 p-3 bg-[#161410] hover:bg-[#25D366]/10 border border-[#2A2318] hover:border-[#25D366]/30 rounded-xl transition-all">
            <span className="text-xl">💬</span>
            <span className="text-[#6A5A3A] text-xs">WhatsApp</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3 bg-[#161410] hover:bg-[#60a5fa]/10 border border-[#2A2318] hover:border-[#60a5fa]/30 rounded-xl transition-all">
            <span className="text-xl">✉️</span>
            <span className="text-[#6A5A3A] text-xs">Email</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3 bg-[#161410] hover:bg-[#0077b5]/10 border border-[#2A2318] hover:border-[#0077b5]/30 rounded-xl transition-all">
            <span className="text-xl">💼</span>
            <span className="text-[#6A5A3A] text-xs">LinkedIn</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3 bg-[#161410] hover:bg-[#E2B84A]/10 border border-[#2A2318] hover:border-[#E2B84A]/30 rounded-xl transition-all">
            <span className="text-xl">📱</span>
            <span className="text-[#6A5A3A] text-xs">SMS</span>
          </button>
        </div>
      </div>

      {/* Récompenses */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <h3 className="text-white font-medium mb-4">🎁 Mes récompenses</h3>

        {/* Phase 1 active */}
        <div className="p-4 bg-[#E2B84A]/5 border border-[#E2B84A]/20 rounded-xl mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[#E2B84A] font-semibold text-sm">Phase 1 — Mois gratuits</div>
            <span className="text-xs bg-[#E2B84A]/20 text-[#E2B84A] px-2 py-1 rounded-full">Active</span>
          </div>
          <p className="text-[#A89878] text-sm mb-3">
            Chaque filleul Premium converti = <span className="text-[#E2B84A] font-medium">1 mois gratuit</span> pour toi et pour lui
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-[#2A2318] rounded-full h-2">
              <div className="bg-[#E2B84A] h-2 rounded-full" style={{width: '40%'}}></div>
            </div>
            <span className="text-[#E2B84A] text-sm font-medium flex-shrink-0">2/5 filleuls</span>
          </div>
          <p className="text-[#6A5A3A] text-xs mt-2">Prochain palier : 5 filleuls → 2 mois bonus</p>
        </div>

        {/* Phase 2 teaser */}
        <div className="p-4 bg-[#2A2318]/50 border border-[#2A2318] rounded-xl opacity-60">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[#6A5A3A] font-semibold text-sm">Phase 2 — Commission cash</div>
            <span className="text-xs bg-[#2A2318] text-[#6A5A3A] px-2 py-1 rounded-full">Bientôt</span>
          </div>
          <p className="text-[#3d3420] text-sm">20% de commission sur chaque abonnement de vos filleuls via Stripe Connect</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-4 text-center">
          <div className="text-[#E2B84A] font-bold text-2xl">2</div>
          <div className="text-[#6A5A3A] text-xs mt-1">Filleuls actifs</div>
        </div>
        <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-4 text-center">
          <div className="text-[#E2B84A] font-bold text-2xl">1</div>
          <div className="text-[#6A5A3A] text-xs mt-1">Premium convertis</div>
        </div>
        <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-4 text-center">
          <div className="text-[#E2B84A] font-bold text-2xl">1</div>
          <div className="text-[#6A5A3A] text-xs mt-1">Mois gratuits gagnés</div>
        </div>
      </div>

      {/* Mes filleuls */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <h3 className="text-white font-medium mb-4">👥 Mes filleuls</h3>
        <div className="space-y-3">
          {filleuls.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#161410] rounded-lg">
              <div className="w-8 h-8 rounded-full bg-[#E2B84A]/20 flex items-center justify-center text-[#E2B84A] font-bold text-sm flex-shrink-0">
                {f.avatar}
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{f.nom}</div>
                <div className="text-[#6A5A3A] text-xs">Inscrit le {f.date}</div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full`}
                style={{ color: statutConfig[f.statut].color, background: statutConfig[f.statut].bg }}>
                {statutConfig[f.statut].label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Carte de visite digitale */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">💳 Carte de visite digitale</h3>
          <button className="text-xs bg-[#2A2318] hover:bg-[#3d3420] text-[#A89878] px-3 py-1.5 rounded-lg transition-colors">
            Personnaliser
          </button>
        </div>
        {/* Aperçu carte */}
        <div className="bg-gradient-to-br from-[#2A2318] to-[#161410] border border-[#E2B84A]/20 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#E2B84A] flex items-center justify-center text-black font-bold">P</div>
            <div>
              <div className="text-white font-semibold">Patrice Haure-Pallesi</div>
              <div className="text-[#6A5A3A] text-sm">Coach MLM · Herbalife</div>
            </div>
            <div className="ml-auto w-8 h-8 bg-[#E2B84A] rounded-lg flex items-center justify-center text-black font-bold text-sm">A</div>
          </div>
          <div className="text-[#E2B84A] text-sm font-mono">upline.ai/u/patrice</div>
          <p className="text-[#6A5A3A] text-xs mt-2">Propulsé par Atlas IA · Upline.ai</p>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 text-sm bg-[#E2B84A] hover:bg-[#ECC85E] text-black font-semibold py-2 rounded-lg transition-colors">
            Voir ma carte publique
          </button>
          <button className="text-sm bg-[#2A2318] hover:bg-[#3d3420] text-[#A89878] px-4 py-2 rounded-lg transition-colors">
            QR Code
          </button>
        </div>
      </div>

    </div>
  )
}
