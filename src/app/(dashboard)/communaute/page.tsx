'use client'
import { useState } from 'react'

type Onglet = 'general' | 'societe' | 'equipe'

const posts = [
  {
    id: 1,
    auteur: "Marie D.",
    avatar: "M",
    societe: "Herbalife",
    temps: "Il y a 2h",
    contenu: "J'ai recruté mon 1er distributeur aujourd'hui ! 6 mois de travail, 47 invitations, 12 présentations. La persévérance paie toujours 🎉",
    likes: 24,
    commentaires: 8,
    onglet: "general",
    liked: false,
  },
  {
    id: 2,
    auteur: "Patrice H.",
    avatar: "P",
    societe: "Herbalife",
    temps: "Il y a 5h",
    contenu: "Tip du jour : La technique Feel/Felt/Found de Tom Schreiter est magique pour l'objection 'c'est une pyramide'. Testez-la ce soir !",
    likes: 18,
    commentaires: 5,
    onglet: "general",
    liked: true,
  },
  {
    id: 3,
    auteur: "Sophie B.",
    avatar: "S",
    societe: "Forever Living",
    temps: "Il y a 1j",
    contenu: "Question : Comment vous gérez les prospects qui disent 'je dois en parler à mon conjoint' ? Atlas m'a donné un super script hier !",
    likes: 31,
    commentaires: 14,
    onglet: "general",
    liked: false,
  },
  {
    id: 4,
    auteur: "Marc L.",
    avatar: "M",
    societe: "Herbalife",
    temps: "Il y a 3h",
    contenu: "Nouveau record personnel : 8 contacts qualifiés en une seule journée avec la méthode FORM. Merci le module 2 ! 💪",
    likes: 15,
    commentaires: 3,
    onglet: "societe",
    liked: false,
  },
  {
    id: 5,
    auteur: "Marie D.",
    avatar: "M",
    societe: "Herbalife",
    temps: "Il y a 1j",
    contenu: "Rappel équipe : réunion Zoom lundi 19h pour les nouveaux distributeurs. Patrice animera la session sur les invitations. Soyez là !",
    likes: 7,
    commentaires: 4,
    onglet: "equipe",
    liked: false,
  },
  {
    id: 6,
    auteur: "Jean M.",
    avatar: "J",
    societe: "Herbalife",
    temps: "Il y a 2j",
    contenu: "Ma première semaine sur Upline.ai — j'ai déjà 3 prospects qualifiés dans mon CRM et Atlas m'a aidé à préparer mes scripts. Game changer !",
    likes: 12,
    commentaires: 6,
    onglet: "equipe",
    liked: false,
  },
]

const topContributeurs = [
  { nom: "Marie Dupont", avatar: "M", posts: 42, societe: "Herbalife", rang: 1 },
  { nom: "Patrice H.", avatar: "P", posts: 18, societe: "Herbalife", rang: 2, estMoi: true },
  { nom: "Sophie B.", avatar: "S", posts: 31, societe: "Forever Living", rang: 3 },
  { nom: "Jean Martin", avatar: "J", posts: 7, societe: "Herbalife", rang: 4 },
]

const societes = [
  { nom: "Herbalife", couleur: "#E2B84A", membres: 47, actif: true },
  { nom: "Forever Living", couleur: "#4ade80", membres: 23, actif: false },
  { nom: "Amway", couleur: "#60a5fa", membres: 31, actif: false },
  { nom: "Autres", couleur: "#A89878", membres: 89, actif: false },
]

export default function Communaute() {
  const [onglet, setOnglet] = useState<Onglet>('general')
  const [likedPosts, setLikedPosts] = useState<number[]>([2])
  const [nouveauPost, setNouveauPost] = useState('')
  const [showPost, setShowPost] = useState(false)

  const postsFiltres = posts.filter(p => p.onglet === onglet)

  const toggleLike = (id: number) => {
    setLikedPosts(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[var(--text-muted)]xl font-semibold text-[var(--text)]">Communauté</h1>
          <p className="text-[var(--text-secondary)] mt-1">Partagez vos victoires et progressez ensemble</p>
        </div>
        <button
          onClick={() => setShowPost(!showPost)}
          className="bg-[#E2B84A] hover:bg-[#ECC85E] text-black font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
        >
          ✍️ Publier
        </button>
      </div>

      {/* Nouveau post */}
      {showPost && (
        <div className="bg-[var(--bg-card)] border border-[#E2B84A]/30 rounded-xl p-6 text-[var(--text-on-card)]">
          <textarea
            value={nouveauPost}
            onChange={e => setNouveauPost(e.target.value)}
            placeholder="Partagez une victoire, un tip, une question... (restez anonyme sur les données sensibles)"
            className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text-secondary)] placeholder-[var(--text-muted)] outline-none focus:border-[#E2B84A] transition-colors resize-none h-24"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-[#3d3420] text-xs">💡 Anonymisez vos données business sensibles</span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPost(false)}
                className="text-sm bg-[var(--gold-muted)] hover:bg-[var(--gold-muted)] text-[var(--text-secondary)] px-4 py-2 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button className="text-sm bg-[#E2B84A] hover:bg-[#ECC85E] text-black font-semibold px-4 py-2 rounded-lg transition-colors">
                Publier
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-4">

          {/* Onglets */}
          <div className="flex bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-1 gap-1 text-[var(--text-on-card)]">
            {([
              { id: 'general', label: '🌍 Général' },
              { id: 'societe', label: '🟠 Herbalife' },
              { id: 'equipe', label: '👥 Mon équipe' },
            ] as { id: Onglet; label: string }[]).map(o => (
              <button
                key={o.id}
                onClick={() => setOnglet(o.id)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  onglet === o.id
                    ? 'bg-[#E2B84A] text-black'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {postsFiltres.length === 0 ? (
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-8 text-center text-[var(--text-on-card)]">
                <div className="text-[var(--text-muted)]xl mb-2">💬</div>
                <p className="text-[var(--text-muted)]">Aucun post dans cet espace pour l'instant</p>
                <button
                  onClick={() => setShowPost(true)}
                  className="mt-3 text-sm text-[#E2B84A] hover:underline"
                >
                  Soyez le premier à publier →
                </button>
              </div>
            ) : (
              postsFiltres.map(post => (
                <div key={post.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-[var(--text-on-card)]">
                  {/* Header post */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#E2B84A]/20 flex items-center justify-center text-[#E2B84A] font-bold text-sm flex-shrink-0">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--text-on-card)] text-sm font-medium">{post.auteur}</span>
                        <span className="text-xs bg-[var(--gold-muted)] text-[var(--text-muted)] px-2 py-0.5 rounded-full">{post.societe}</span>
                      </div>
                      <div className="text-[#3d3420] text-xs">{post.temps}</div>
                    </div>
                  </div>

                  {/* Contenu */}
                  <p className="text-[#D4C8A8] text-sm leading-relaxed mb-4">{post.contenu}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-3 border-t border-[var(--border)]">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm transition-colors ${
                        likedPosts.includes(post.id) ? 'text-[#E2B84A]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                      }`}
                    >
                      {likedPosts.includes(post.id) ? '❤️' : '🤍'}
                      <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
                      💬 <span>{post.commentaires}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors ml-auto">
                      ↗️ Partager
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-4">

          {/* Espaces société */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 text-[var(--text-on-card)]">
            <h3 className="text-[var(--text-on-card)] font-medium mb-3">🏢 Espaces société</h3>
            <div className="space-y-2">
              {societes.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    s.actif
                      ? 'bg-[#E2B84A]/10 border border-[#E2B84A]/20'
                      : 'bg-[var(--bg)] hover:bg-[var(--gold-muted)]'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: s.couleur }}
                  ></div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${s.actif ? 'text-[#E2B84A]' : 'text-[var(--text-secondary)]'}`}>
                      {s.nom}
                    </div>
                    <div className="text-[#3d3420] text-xs">{s.membres} membres</div>
                  </div>
                  {s.actif && <span className="text-xs text-[#E2B84A]">✓</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Top contributeurs */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 text-[var(--text-on-card)]">
            <h3 className="text-[var(--text-on-card)] font-medium mb-3">🏅 Top contributeurs</h3>
            <div className="space-y-2">
              {topContributeurs.map((c, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-2 rounded-lg ${
                    c.estMoi ? 'bg-[#E2B84A]/10' : ''
                  }`}
                >
                  <span className="text-sm w-4 flex-shrink-0">
                    {c.rang === 1 ? '🥇' : c.rang === 2 ? '🥈' : c.rang === 3 ? '🥉' : `${c.rang}.`}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#E2B84A]/20 flex items-center justify-center text-[#E2B84A] font-bold text-xs flex-shrink-0">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm truncate ${c.estMoi ? 'text-[#E2B84A]' : 'text-[var(--text-secondary)]'}`}>
                      {c.nom} {c.estMoi && '← toi'}
                    </div>
                  </div>
                  <span className="text-[var(--text-muted)] text-xs flex-shrink-0">{c.posts} posts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Règles communauté */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 text-[var(--text-on-card)]">
            <h3 className="text-[var(--text-on-card)] font-medium mb-3">📋 Règles</h3>
            <div className="space-y-2 text-xs text-[var(--text-muted)]">
              <div className="flex gap-2"><span>✅</span><span>Partagez vos victoires et apprentissages</span></div>
              <div className="flex gap-2"><span>✅</span><span>Posez des questions constructives</span></div>
              <div className="flex gap-2"><span>❌</span><span>Pas de données prospects sensibles</span></div>
              <div className="flex gap-2"><span>❌</span><span>Pas de promotion d'autres plateformes</span></div>
              <div className="flex gap-2"><span>❌</span><span>Pas de dénigrement de sociétés MLM</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
