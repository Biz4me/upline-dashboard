export default function Profil() {
  return (
    <div className="space-y-6 max-w-2xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">Mon Profil</h1>
        <p className="text-[#A89878] mt-1">Gérez votre compte et vos préférences</p>
      </div>

      {/* Identité */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#E2B84A] flex items-center justify-center text-black font-bold text-2xl cursor-pointer hover:opacity-80 transition-opacity">
            P
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold">Patrice Haure-Pallesi</h2>
            <p className="text-[#6A5A3A] text-sm">upline.ai/u/patrice</p>
            <span className="text-xs bg-[#E2B84A]/15 text-[#E2B84A] border border-[#E2B84A]/20 px-2 py-0.5 rounded-full">⭐ Premium</span>
          </div>
          <button className="ml-auto text-sm bg-[#2A2318] hover:bg-[#3d3420] text-[#A89878] px-4 py-2 rounded-lg transition-colors">
            ✏️ Modifier
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[#6A5A3A] text-xs mb-1">Email</div>
            <div className="text-[#A89878] text-sm">patricehaure@gmail.com</div>
          </div>
          <div>
            <div className="text-[#6A5A3A] text-xs mb-1">Membre depuis</div>
            <div className="text-[#A89878] text-sm">Mai 2026</div>
          </div>
        </div>
      </div>

      {/* Société MLM */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">Ma société MLM</h3>
          <button className="text-xs bg-[#2A2318] hover:bg-[#3d3420] text-[#A89878] px-3 py-1.5 rounded-lg transition-colors">
            + Ajouter
          </button>
        </div>
        <div className="flex items-center gap-3 p-3 bg-[#161410] rounded-lg border border-[#2A2318]">
          <div className="w-8 h-8 bg-[#E2B84A]/20 rounded-lg flex items-center justify-center text-[#E2B84A] text-sm font-bold">H</div>
          <div>
            <div className="text-white text-sm font-medium">Herbalife</div>
            <div className="text-[#6A5A3A] text-xs">Distributeur · Depuis Jan 2025</div>
          </div>
          <span className="ml-auto text-xs bg-[#E2B84A]/10 text-[#E2B84A] px-2 py-1 rounded-full">Active</span>
        </div>
        <p className="text-[#3d3420] text-xs mt-3">Upline.ai est agnostique — vous pouvez ajouter plusieurs sociétés</p>
      </div>

      {/* Abonnement */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <h3 className="text-white font-medium mb-4">Abonnement</h3>
        <div className="flex items-center justify-between p-4 bg-[#E2B84A]/5 border border-[#E2B84A]/20 rounded-xl mb-4">
          <div>
            <div className="text-[#E2B84A] font-semibold">⭐ Premium</div>
            <div className="text-[#6A5A3A] text-sm">Renouvellement le 12 Juin 2026</div>
          </div>
          <div className="text-right">
            <div className="text-white font-bold">$19<span className="text-[#6A5A3A] text-sm">/mois</span></div>
            <button className="text-xs text-[#6A5A3A] hover:text-[#A89878] transition-colors mt-1">Gérer</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-[#161410] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-lg">∞</div>
            <div className="text-[#6A5A3A] text-xs">Messages Atlas</div>
          </div>
          <div className="p-3 bg-[#161410] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-lg">✅</div>
            <div className="text-[#6A5A3A] text-xs">RAG société</div>
          </div>
          <div className="p-3 bg-[#161410] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-lg">📄</div>
            <div className="text-[#6A5A3A] text-xs">Export PDF</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <h3 className="text-white font-medium mb-4">Mes statistiques</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-[#161410] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-xl">12</div>
            <div className="text-[#6A5A3A] text-sm">Sessions Atlas</div>
          </div>
          <div className="p-3 bg-[#161410] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-xl">7</div>
            <div className="text-[#6A5A3A] text-sm">Streak actuel</div>
          </div>
          <div className="p-3 bg-[#161410] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-xl">3</div>
            <div className="text-[#6A5A3A] text-sm">Badges obtenus</div>
          </div>
          <div className="p-3 bg-[#161410] rounded-lg">
            <div className="text-[#E2B84A] font-bold text-xl">2</div>
            <div className="text-[#6A5A3A] text-sm">Filleuls actifs</div>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <h3 className="text-white font-medium mb-4">Documents & Export</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-[#161410] hover:bg-[#2A2318] rounded-lg transition-colors">
            <span className="text-[#A89878] text-sm">📄 Rapport mensuel Mai 2026</span>
            <span className="text-[#E2B84A] text-xs">Télécharger PDF</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-[#161410] hover:bg-[#2A2318] rounded-lg transition-colors">
            <span className="text-[#A89878] text-sm">💳 Carte de visite digitale</span>
            <span className="text-[#E2B84A] text-xs">Voir</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-[#161410] hover:bg-[#2A2318] rounded-lg transition-colors">
            <span className="text-[#A89878] text-sm">📊 Historique sessions coaching</span>
            <span className="text-[#E2B84A] text-xs">Exporter</span>
          </button>
        </div>
      </div>

      {/* Paramètres */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <h3 className="text-white font-medium mb-4">Paramètres</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#161410] rounded-lg">
            <span className="text-[#A89878] text-sm">🌙 Mode sombre</span>
            <div className="w-10 h-5 bg-[#E2B84A] rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-black rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#161410] rounded-lg">
            <span className="text-[#A89878] text-sm">🔔 Notifications push</span>
            <div className="w-10 h-5 bg-[#E2B84A] rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-black rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#161410] rounded-lg">
            <span className="text-[#A89878] text-sm">🌍 Langue</span>
            <span className="text-[#E2B84A] text-sm">Français</span>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-[#1E1B14] border border-red-900/30 rounded-xl p-6">
        <h3 className="text-red-400 font-medium mb-3">Zone de danger</h3>
        <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
          Supprimer mon compte
        </button>
      </div>

    </div>
  )
}
