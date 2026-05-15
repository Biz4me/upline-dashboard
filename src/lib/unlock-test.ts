// Helpers localStorage pour gérer le cooldown des tests de déblocage
// Plus tard, à migrer vers PostgreSQL table user_parcours

const COOLDOWN_HOURS = 24

export type UnlockTestState = 'available' | 'cooldown' | 'passed'

interface UnlockAttempt {
  moduleId: number
  failedAt: number // timestamp
}

interface UnlockSuccess {
  moduleId: number
  passedAt: number
}

function getFailedAttempts(): UnlockAttempt[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem('upline_unlock_failed')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function getPassedTests(): UnlockSuccess[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem('upline_unlock_passed')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function getUnlockTestState(moduleId: number): { state: UnlockTestState; cooldownHoursLeft?: number } {
  const passed = getPassedTests().find(p => p.moduleId === moduleId)
  if (passed) return { state: 'passed' }

  const failed = getFailedAttempts().find(f => f.moduleId === moduleId)
  if (failed) {
    const hoursElapsed = (Date.now() - failed.failedAt) / (1000 * 60 * 60)
    if (hoursElapsed < COOLDOWN_HOURS) {
      return { state: 'cooldown', cooldownHoursLeft: Math.ceil(COOLDOWN_HOURS - hoursElapsed) }
    }
  }

  return { state: 'available' }
}

export function recordUnlockFailure(moduleId: number): void {
  if (typeof window === 'undefined') return
  const attempts = getFailedAttempts().filter(a => a.moduleId !== moduleId)
  attempts.push({ moduleId, failedAt: Date.now() })
  localStorage.setItem('upline_unlock_failed', JSON.stringify(attempts))
}

export function recordUnlockSuccess(moduleId: number): void {
  if (typeof window === 'undefined') return
  const successes = getPassedTests().filter(s => s.moduleId !== moduleId)
  successes.push({ moduleId, passedAt: Date.now() })
  localStorage.setItem('upline_unlock_passed', JSON.stringify(successes))
  // Retire aussi un éventuel échec
  const attempts = getFailedAttempts().filter(a => a.moduleId !== moduleId)
  localStorage.setItem('upline_unlock_failed', JSON.stringify(attempts))
}

// 10 questions de test générique pour débloquer un module
// Plus tard, à remplacer par des questions par module depuis le RAG
export const unlockTestQuestions = [
  {
    q: "Quel est le bon état d'esprit pour réussir en MLM ?",
    atlas: "Tu démarres — quelle attitude adopter ?",
    choices: [
      { text: "Vendre le plus possible dès la première semaine", correct: false },
      { text: "Apprendre, dupliquer, persévérer sur 12 mois minimum", correct: true },
      { text: "Recruter agressivement son entourage immédiat", correct: false },
    ],
  },
  {
    q: "Combien de prospects faut-il pour démarrer ?",
    atlas: "Combien de noms écris-tu sur ta liste ?",
    choices: [
      { text: "10 à 20 prospects proches", correct: false },
      { text: "100 prospects minimum, tous statuts confondus", correct: true },
      { text: "50 prospects ultra-qualifiés uniquement", correct: false },
    ],
  },
  {
    q: "Quelle est la règle d'or de l'approche MLM ?",
    atlas: "Comment aborder un prospect ?",
    choices: [
      { text: "Présenter le produit dès la première rencontre", correct: false },
      { text: "Compliment sincère, écoute, identifier le besoin", correct: true },
      { text: "Lui proposer un revenu rapidement", correct: false },
    ],
  },
  {
    q: "Que faire quand un prospect dit 'Je vais y réfléchir' ?",
    atlas: "Le prospect hésite — ta réaction ?",
    choices: [
      { text: "Le laisser tranquille indéfiniment", correct: false },
      { text: "Identifier l'objection réelle avec une question ouverte", correct: true },
      { text: "Insister pour qu'il décide immédiatement", correct: false },
    ],
  },
  {
    q: "Quand relancer un prospect après le premier contact ?",
    atlas: "Combien de temps avant la relance ?",
    choices: [
      { text: "Dans les heures qui suivent", correct: false },
      { text: "Entre 24h et 72h", correct: true },
      { text: "Après 2 semaines pour ne pas insister", correct: false },
    ],
  },
  {
    q: "Quel pourcentage des distributeurs MLM abandonnent la première année ?",
    atlas: "Combien lâchent ?",
    choices: [
      { text: "30%", correct: false },
      { text: "60%", correct: false },
      { text: "95%", correct: true },
    ],
  },
  {
    q: "Quelle compétence est la plus rentable en MLM ?",
    atlas: "La compétence n°1 ?",
    choices: [
      { text: "La vente directe", correct: false },
      { text: "L'invitation et le suivi", correct: true },
      { text: "La connaissance produit", correct: false },
    ],
  },
  {
    q: "Quel est le rôle principal d'un upline ?",
    atlas: "Que doit faire un upline ?",
    choices: [
      { text: "Vendre à la place de son filleul", correct: false },
      { text: "Former et accompagner son filleul à devenir autonome", correct: true },
      { text: "Recruter à la place de son filleul", correct: false },
    ],
  },
  {
    q: "Quelle approche fonctionne sur les réseaux sociaux ?",
    atlas: "Comment aborder sur Facebook ?",
    choices: [
      { text: "Envoyer un message commercial direct", correct: false },
      { text: "Créer du lien authentique avant tout pitch", correct: true },
      { text: "Spammer le maximum de personnes", correct: false },
    ],
  },
  {
    q: "Quel est l'objectif d'un Fast Start (démarrage rapide) ?",
    atlas: "Pourquoi un Fast Start ?",
    choices: [
      { text: "Vendre un maximum dans la 1ère semaine", correct: false },
      { text: "Faire vivre une 1ère réussite au filleul en 72h", correct: true },
      { text: "Atteindre le rang supérieur le plus vite possible", correct: false },
    ],
  },
]
