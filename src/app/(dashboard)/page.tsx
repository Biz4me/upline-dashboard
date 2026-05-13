export default function Accueil() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">Bonjour, Patrice 👋</h1>
        <p className="text-[#A89878] mt-1">Streak 7 jours · Niveau Explorateur</p>
      </div>

      {/* StatsCards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-4">
          <div className="text-2xl font-bold text-[#E2B84A]">12</div>
          <div className="text-sm text-[#6A5A3A] mt-1">Sessions</div>
        </div>
        <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-4">
          <div className="text-2xl font-bold text-[#E2B84A]">84%</div>
          <div className="text-sm text-[#6A5A3A] mt-1">Formation</div>
        </div>
        <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-4">
          <div className="text-2xl font-bold text-[#E2B84A]">3</div>
          <div className="text-sm text-[#6A5A3A] mt-1">Badges</div>
        </div>
        <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-4">
          <div className="text-2xl font-bold text-[#E2B84A]">2</div>
          <div className="text-sm text-[#6A5A3A] mt-1">Filleuls</div>
        </div>
      </div>

      {/* Progression Formation */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-medium">Formation en cours</h2>
          <span className="text-[#E2B84A] text-sm font-medium">Module 3/8</span>
        </div>
        <div className="w-full bg-[#2A2318] rounded-full h-2 mb-2">
          <div className="bg-[#E2B84A] h-2 rounded-full" style={{width: '37%'}}></div>
        </div>
        <p className="text-[#6A5A3A] text-sm">Les techniques de prospection avancées</p>
      </div>

      {/* Widget Atlas */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[#E2B84A] rounded-lg flex items-center justify-center text-black font-bold text-sm">A</div>
          <div>
            <div className="text-white font-medium text-sm">Atlas</div>
            <div className="text-[#6A5A3A] text-xs">Coach IA · En ligne</div>
          </div>
        </div>
        <div className="bg-[#161410] rounded-lg p-3 mb-4">
          <p className="text-[#D4C8A8] text-sm">Bonjour Patrice ! Tu es à 37% de ta formation. Continue sur ta lancée — le module 4 sur la vente consultative t'attend. Des questions ?</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Écrire à Atlas..." 
            className="flex-1 bg-[#161410] border border-[#2A2318] rounded-lg px-3 py-2 text-sm text-[#A89878] placeholder-[#3d3420] outline-none focus:border-[#E2B84A] transition-colors"
          />
          <button className="bg-[#E2B84A] hover:bg-[#ECC85E] text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors">
            →
          </button>
        </div>
      </div>

      {/* Activité récente */}
      <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-6">
        <h2 className="text-white font-medium mb-4">Activité récente</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#E2B84A] rounded-full flex-shrink-0"></div>
            <span className="text-[#A89878] text-sm">Module 3 — Leçon 2 complétée</span>
            <span className="text-[#3d3420] text-xs ml-auto">Aujourd'hui</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#2A2318] rounded-full flex-shrink-0"></div>
            <span className="text-[#6A5A3A] text-sm">Badge "Prospecteur" débloqué</span>
            <span className="text-[#3d3420] text-xs ml-auto">Hier</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#2A2318] rounded-full flex-shrink-0"></div>
            <span className="text-[#6A5A3A] text-sm">Nouveau filleul ajouté</span>
            <span className="text-[#3d3420] text-xs ml-auto">Il y a 2 jours</span>
          </div>
        </div>
      </div>

    </div>
  )
}
