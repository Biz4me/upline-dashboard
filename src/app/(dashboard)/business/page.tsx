'use client'
import { useState } from 'react'

type Marche = 'chaud' | 'tiede' | 'froid'
type Personnalite = 'jaune' | 'bleu' | 'rouge' | 'vert' | ''
type Statut = 'liste' | 'invite' | 'presente' | 'suivi' | 'oui' | 'non'

interface Prospect {
  id: number
  prenom: string
  nom: string
  telephone: string
  marche: Marche
  personnalite: Personnalite
  statut: Statut
  prochaineAction: string
  notes: string
}

const prospects: Prospect[] = [
  { id: 1, prenom: 'Marie', nom: 'Dupont', telephone: '+33612345678', marche: 'chaud', personnalite: 'jaune', statut: 'suivi', prochaineAction: 'Relancer jeudi', notes: 'Intéressée, attend retour mari' },
  { id: 2, prenom: 'Jean', nom: 'Martin', telephone: '+33698765432', marche: 'tiede', personnalite: 'rouge', statut: 'invite', prochaineAction: 'Présentation lundi', notes: 'Cherche revenus complémentaires' },
  { id: 3, prenom: 'Sophie', nom: 'Bernard', telephone: '+33677889900', marche: 'chaud', personnalite: 'bleu', statut: 'liste', prochaineAction: 'Appeler cette semaine', notes: '' },
  { id: 4, prenom: 'Pierre', nom: 'Dubois', telephone: '+33655443322', marche: 'froid', personnalite: 'vert', statut: 'presente', prochaineAction: 'Suivi dans 3 jours', notes: 'Veut voir les chiffres' },
  { id: 5, prenom: 'Laura', nom: 'Petit', telephone: '+33644332211', marche: 'tiede', personnalite: '', statut: 'oui', prochaineAction: 'Démarrage lundi', notes: 'Nouveau distributeur !' },
]

const marcheConfig = {
  chaud: { label: 'Chaud', color: '#ef4444', bg: '#ef444415' },
  tiede: { label: 'Tiède', color: '#f97316', bg: '#f9731615' },
  froid: { label: 'Froid', color: '#60a5fa', bg: '#60a5fa15' },
}

const personnaliteConfig = {
  jaune: { label: '🟡 Jaune', desc: 'Empathique' },
  bleu: { label: '🔵 Bleu', desc: 'Festif' },
  rouge: { label: '🔴 Rouge', desc: 'Ambitieux' },
  vert: { label: '🟢 Vert', desc: 'Analytique' },
  '': { label: '❓ ?', desc: 'À définir' },
}

const statutConfig = {
  liste: { label: '📋 Liste', color: '#6A5A3A', bg: '#6A5A3A15', ordre: 0 },
  invite: { label: '📞 Invité', color: '#60a5fa', bg: '#60a5fa15', ordre: 1 },
  presente: { label: '👁 Présenté', color: '#a78bfa', bg: '#a78bfa15', ordre: 2 },
  suivi: { label: '🔄 Suivi', color: '#f97316', bg: '#f9731615', ordre: 3 },
  oui: { label: '✅ Oui !', color: '#E2B84A', bg: '#E2B84A15', ordre: 4 },
  non: { label: '❌ Non', color: '#6A5A3A', bg: '#6A5A3A15', ordre: 4 },
}

export default function Business() {
  const [vue, setVue] = useState<'pipeline' | 'liste'>('liste')
  const [prospectActif, setProspectActif] = useState<Prospect | null>(null)
  const [recherche, setRecherche] = useState('')

  const colonnes: Statut[] = ['liste', 'invite', 'presente', 'suivi', 'oui']

  const prospectsFiltres = prospects.filter(p =>
    `${p.prenom} ${p.nom}`.toLowerCase().includes(recherche.toLowerCase())
  )

  const ouvrirProspect = (p: Prospect) => setProspectActif(p)

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Mon Business</h1>
          <p className="text-[#A89878] mt-1">Pipeline Herbalife · 5 prospects actifs</p>
        </div>
        <button className="bg-[#E2B84A] hover:bg-[#ECC85E] text-black font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
          + Prospect
        </button>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'En liste', value: prospects.filter(p => p.statut === 'liste').length, color: '#6A5A3A' },
          { label: 'Invités', value: prospects.filter(p => p.statut === 'invite').length, color: '#60a5fa' },
          { label: 'En suivi', value: prospects.filter(p => p.statut === 'suivi').length, color: '#f97316' },
          { label: 'Convertis', value: prospects.filter(p => p.statut === 'oui').length, color: '#E2B84A' },
        ].map((s, i) => (
          <div key={i} className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-3 text-center">
            <div className="font-bold text-xl" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[#6A5A3A] text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toggle vue + recherche */}
      <div className="flex items-center gap-3">
        <div className="flex bg-[#1E1B14] border border-[#2A2318] rounded-xl p-1 gap-1">
          <button
            onClick={() => setVue('pipeline')}
            className={`hidden md:block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${vue === 'pipeline' ? 'bg-[#E2B84A] text-black' : 'text-[#6A5A3A] hover:text-white'}`}
          >
            Pipeline
          </button>
          <button
            onClick={() => setVue('liste')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${vue === 'liste' ? 'bg-[#E2B84A] text-black' : 'text-[#6A5A3A] hover:text-white'}`}
          >
            Liste
          </button>
        </div>
        <input
          type="text"
          placeholder="Rechercher un prospect..."
          value={recherche}
          onChange={e => setRecherche(e.target.value)}
          className="flex-1 bg-[#1E1B14] border border-[#2A2318] rounded-xl px-4 py-2 text-sm text-[#A89878] placeholder-[#3d3420] outline-none focus:border-[#E2B84A] transition-colors"
        />
      </div>

      {/* Vue Pipeline */}
      {vue === 'pipeline' && (
        <div className="hidden md:grid grid-cols-5 gap-3">
          {colonnes.map(statut => (
            <div key={statut} className="bg-[#1E1B14] border border-[#2A2318] rounded-xl p-3">
              <div className="text-xs font-medium mb-3 flex items-center justify-between">
                <span style={{ color: statutConfig[statut].color }}>{statutConfig[statut].label}</span>
                <span className="bg-[#2A2318] text-[#6A5A3A] text-xs px-2 py-0.5 rounded-full">
                  {prospects.filter(p => p.statut === statut).length}
                </span>
              </div>
              <div className="space-y-2">
                {prospects.filter(p => p.statut === statut).map(p => (
                  <div
                    key={p.id}
                    onClick={() => ouvrirProspect(p)}
                    className="bg-[#161410] border border-[#2A2318] rounded-lg p-2 cursor-pointer hover:border-[#E2B84A]/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-[#E2B84A]/20 flex items-center justify-center text-[#E2B84A] text-xs font-bold flex-shrink-0">
                        {p.prenom[0]}
                      </div>
                      <span className="text-white text-xs font-medium truncate">{p.prenom}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ color: marcheConfig[p.marche].color, background: marcheConfig[p.marche].bg }}>
                        {marcheConfig[p.marche].label}
                      </span>
                      <span className="text-xs">{personnaliteConfig[p.personnalite].label}</span>
                    </div>
                    {p.statut === 'oui' && (
                      <button
                        onClick={e => { e.stopPropagation() }}
                        className="w-full mt-2 text-xs bg-[#E2B84A]/20 hover:bg-[#E2B84A]/30 text-[#E2B84A] py-1 rounded-lg transition-colors"
                      >
                        Inviter sur Upline.ai →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vue Liste */}
      {vue === 'liste' && (
        <div className="bg-[#1E1B14] border border-[#2A2318] rounded-xl overflow-hidden w-full">
          <div className="space-y-0">
            {prospectsFiltres.map((p, i) => (
              <div
                key={p.id}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#2A2318]/50 transition-colors ${i !== 0 ? 'border-t border-[#2A2318]' : ''}`}
                onClick={() => ouvrirProspect(p)}
              >
                <div className="w-8 h-8 rounded-full bg-[#E2B84A]/20 flex items-center justify-center text-[#E2B84A] font-bold text-sm flex-shrink-0">
                  {p.prenom[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">{p.prenom} {p.nom}</div>
                  <div className="text-[#6A5A3A] text-xs truncate">{p.prochaineAction}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs px-2 py-0.5 rounded-full hidden sm:block" style={{ color: marcheConfig[p.marche].color, background: marcheConfig[p.marche].bg }}>
                    {marcheConfig[p.marche].label}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: statutConfig[p.statut].color, background: statutConfig[p.statut].bg }}>
                    {statutConfig[p.statut].label}
                  </span>
                  {/* Bouton appel mobile */}
                  <a
                    href={`tel:${p.telephone}`}
                    onClick={e => e.stopPropagation()}
                    className="w-8 h-8 bg-[#2A2318] hover:bg-[#E2B84A] hover:text-black text-[#6A5A3A] rounded-lg flex items-center justify-center transition-all text-sm"
                    title="Appeler"
                  >
                    📞
                  </a>
                  {p.statut === 'oui' && (
                    <button
                      onClick={e => e.stopPropagation()}
                      className="text-xs bg-[#E2B84A]/20 hover:bg-[#E2B84A]/30 text-[#E2B84A] px-2 py-1 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Inviter sur Upline.ai
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal prospect */}
      {prospectActif && (
        <div className="fixed inset-0 bg-black/70 flex items-end md:items-center justify-center z-50 p-0 md:p-4" onClick={() => setProspectActif(null)}>
          <div className="bg-[#1E1B14] border border-[#2A2318] rounded-t-2xl md:rounded-2xl p-6 w-full md:max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E2B84A] flex items-center justify-center text-black font-bold">
                  {prospectActif.prenom[0]}
                </div>
                <div>
                  <div className="text-white font-semibold">{prospectActif.prenom} {prospectActif.nom}</div>
                  <div className="text-[#6A5A3A] text-sm">{prospectActif.telephone}</div>
                </div>
              </div>
              <button onClick={() => setProspectActif(null)} className="text-[#6A5A3A] hover:text-white text-xl">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#161410] rounded-lg p-3">
                <div className="text-[#6A5A3A] text-xs mb-1">Marché</div>
                <span className="text-sm px-2 py-0.5 rounded-full" style={{ color: marcheConfig[prospectActif.marche].color, background: marcheConfig[prospectActif.marche].bg }}>
                  {marcheConfig[prospectActif.marche].label}
                </span>
              </div>
              <div className="bg-[#161410] rounded-lg p-3">
                <div className="text-[#6A5A3A] text-xs mb-1">Personnalité</div>
                <span className="text-sm text-[#A89878]">{personnaliteConfig[prospectActif.personnalite].label} {personnaliteConfig[prospectActif.personnalite].desc}</span>
              </div>
              <div className="bg-[#161410] rounded-lg p-3">
                <div className="text-[#6A5A3A] text-xs mb-1">Statut</div>
                <span className="text-sm px-2 py-0.5 rounded-full" style={{ color: statutConfig[prospectActif.statut].color, background: statutConfig[prospectActif.statut].bg }}>
                  {statutConfig[prospectActif.statut].label}
                </span>
              </div>
              <div className="bg-[#161410] rounded-lg p-3">
                <div className="text-[#6A5A3A] text-xs mb-1">Prochaine action</div>
                <div className="text-[#A89878] text-sm">{prospectActif.prochaineAction}</div>
              </div>
            </div>

            {prospectActif.notes && (
              <div className="bg-[#161410] rounded-lg p-3 mb-4">
                <div className="text-[#6A5A3A] text-xs mb-1">Notes</div>
                <div className="text-[#A89878] text-sm">{prospectActif.notes}</div>
              </div>
            )}

            {/* Suggestion Atlas selon personnalité */}
            <div className="bg-[#161410] border border-[#E2B84A]/10 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-[#E2B84A] rounded flex items-center justify-center text-black text-xs font-bold">A</div>
                <span className="text-[#E2B84A] text-xs font-medium">Conseil Atlas</span>
              </div>
              <p className="text-[#A89878] text-xs">
                {prospectActif.personnalite === 'jaune' && "Marie est empathique — parlez-lui de l'impact sur sa famille et des gens qu'elle pourra aider."}
                {prospectActif.personnalite === 'rouge' && "Jean est ambitieux — montrez-lui les chiffres et le potentiel de revenus rapidement."}
                {prospectActif.personnalite === 'bleu' && "Sophie aime le fun — parlez-lui des voyages, événements et de l'ambiance de l'équipe."}
                {prospectActif.personnalite === 'vert' && "Pierre est analytique — préparez les chiffres, le plan de rémunération et les preuves sociales."}
                {prospectActif.personnalite === '' && "Identifiez d'abord la personnalité de ce prospect pour adapter votre approche."}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <a
                href={`tel:${prospectActif.telephone}`}
                className="flex-1 bg-[#E2B84A] hover:bg-[#ECC85E] text-black font-semibold py-2.5 rounded-xl text-sm transition-colors text-center"
              >
                📞 Appeler
              </a>
              <button className="flex-1 bg-[#2A2318] hover:bg-[#3d3420] text-[#A89878] py-2.5 rounded-xl text-sm transition-colors">
                ✏️ Modifier
              </button>
              {prospectActif.statut === 'oui' && (
                <button className="flex-1 bg-[#E2B84A]/20 hover:bg-[#E2B84A]/30 text-[#E2B84A] py-2.5 rounded-xl text-sm transition-colors">
                  Inviter sur Upline.ai
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
