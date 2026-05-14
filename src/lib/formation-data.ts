// Structure : Modules > Unités > Leçons (style Duolingo)

export type LessonType = 'theory' | 'quiz' | 'practice' | 'roleplay' | 'video'
export type NodeStatus = 'done' | 'current' | 'available' | 'locked'

export interface Lesson {
  id: string
  title: string
  type: LessonType
  xp: number
  duration: number
  status: NodeStatus
}

export interface Unit {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  bossLesson?: Lesson
}

export interface Module {
  id: number
  slug: string
  title: string
  description: string
  duree: string
  totalLessons: number
  progression: number
  status: NodeStatus
  livres: string[]
  units: Unit[]
}

export const modules: Module[] = [
  {
    id: 1,
    slug: 'fondations',
    title: "Fondations & État d'esprit",
    description: "Comprendre le MLM professionnel, définir sa vision et installer ses habitudes de réussite.",
    duree: "1 semaine",
    totalLessons: 8,
    progression: 100,
    status: 'done',
    livres: ["Go Pro — Eric Worre", "Atomic Habits — James Clear", "Père riche, père pauvre — Kiyosaki"],
    units: [
      {
        id: '1-1',
        title: 'Le mindset du professionnel MLM',
        description: 'Sors de la mentalité amateur et adopte une approche pro.',
        lessons: [
          { id: '1-1-1', title: 'Pourquoi 95% échouent en MLM', type: 'theory', xp: 14, duration: 8, status: 'done' },
          { id: '1-1-2', title: 'Les 7 compétences du pro', type: 'theory', xp: 14, duration: 10, status: 'done' },
          { id: '1-1-3', title: 'Quiz — Es-tu un pro ?', type: 'quiz', xp: 20, duration: 5, status: 'done' },
        ],
        bossLesson: { id: '1-1-boss', title: '🏆 Défi unité 1', type: 'practice', xp: 50, duration: 10, status: 'done' },
      },
      {
        id: '1-2',
        title: 'Définir ta vision et tes objectifs',
        description: 'Le pourquoi qui te fera te lever chaque matin.',
        lessons: [
          { id: '1-2-1', title: 'Trouver ton "pourquoi" profond', type: 'theory', xp: 14, duration: 12, status: 'done' },
          { id: '1-2-2', title: 'Méthode SMART pour le MLM', type: 'theory', xp: 14, duration: 8, status: 'done' },
          { id: '1-2-3', title: 'Atelier — Écris ta vision 1 an', type: 'practice', xp: 30, duration: 15, status: 'done' },
        ],
        bossLesson: { id: '1-2-boss', title: '🏆 Défi unité 2', type: 'practice', xp: 50, duration: 10, status: 'done' },
      },
    ],
  },
  {
    id: 2,
    slug: 'prospection',
    title: 'Trouver des prospects',
    description: "Construire une liste illimitée, activer son marché chaud/tiède/froid et prospecter au quotidien.",
    duree: '1 semaine',
    totalLessons: 10,
    progression: 38,
    status: 'current',
    livres: ['45 secondes — Don Failla', 'Comment se faire des amis — Carnegie', 'Fanatical Prospecting — Blount'],
    units: [
      {
        id: '2-1',
        title: 'Construire ta liste de 100',
        description: 'L\'exercice qui change tout : ta liste de départ.',
        lessons: [
          { id: '2-1-1', title: 'Marché chaud — ton entourage', type: 'theory', xp: 14, duration: 10, status: 'done' },
          { id: '2-1-2', title: 'Marché tiède — tes connaissances', type: 'theory', xp: 14, duration: 8, status: 'done' },
          { id: '2-1-3', title: 'Atelier — Écris ta liste de 100', type: 'practice', xp: 30, duration: 20, status: 'done' },
        ],
        bossLesson: { id: '2-1-boss', title: '🏆 Défi unité 1', type: 'practice', xp: 50, duration: 10, status: 'done' },
      },
      {
        id: '2-2',
        title: "Le script d'approche parfait",
        description: 'Les 3 phrases qui ouvrent n\'importe quelle conversation.',
        lessons: [
          { id: '2-2-1', title: 'Compliment sincère + curiosité', type: 'theory', xp: 14, duration: 8, status: 'done' },
          { id: '2-2-2', title: 'Quiz — Choisis la bonne approche', type: 'quiz', xp: 20, duration: 5, status: 'current' },
          { id: '2-2-3', title: 'Jeu de rôle avec Atlas', type: 'roleplay', xp: 30, duration: 15, status: 'available' },
        ],
        bossLesson: { id: '2-2-boss', title: '🏆 Défi unité 2', type: 'practice', xp: 50, duration: 10, status: 'locked' },
      },
      {
        id: '2-3',
        title: 'Le marché froid & les réseaux sociaux',
        description: 'Toucher des inconnus sans paraître insistant.',
        lessons: [
          { id: '2-3-1', title: 'Approche Facebook & Instagram', type: 'theory', xp: 14, duration: 10, status: 'locked' },
          { id: '2-3-2', title: 'Approche LinkedIn pro', type: 'theory', xp: 14, duration: 10, status: 'locked' },
          { id: '2-3-3', title: 'Atelier — Rédige 5 messages', type: 'practice', xp: 30, duration: 15, status: 'locked' },
        ],
        bossLesson: { id: '2-3-boss', title: '🏆 Défi unité 3', type: 'practice', xp: 50, duration: 10, status: 'locked' },
      },
    ],
  },
  {
    id: 3,
    slug: 'invitation',
    title: 'Inviter les prospects',
    description: "Maîtriser les 8 étapes de l'invitation, les 4 personnalités et les brise-glaces de Tom Schreiter.",
    duree: '2 semaines',
    totalLessons: 12,
    progression: 0,
    status: 'available',
    livres: ['Ice Breakers — Tom Schreiter', 'Four Color Personalities — Schreiter', 'Influence — Cialdini'],
    units: [
      {
        id: '3-1',
        title: 'Les 8 étapes de l\'invitation',
        description: 'La méthode professionnelle Eric Worre.',
        lessons: [
          { id: '3-1-1', title: 'Pressé + Compliment', type: 'theory', xp: 14, duration: 8, status: 'available' },
          { id: '3-1-2', title: 'Question + Outil tiers', type: 'theory', xp: 14, duration: 8, status: 'locked' },
          { id: '3-1-3', title: 'Quiz les 8 étapes', type: 'quiz', xp: 20, duration: 5, status: 'locked' },
        ],
        bossLesson: { id: '3-1-boss', title: '🏆 Défi unité 1', type: 'practice', xp: 50, duration: 10, status: 'locked' },
      },
      {
        id: '3-2',
        title: 'Les 4 personnalités',
        description: 'Adapte ton approche à chaque profil.',
        lessons: [
          { id: '3-2-1', title: 'Bleu, Jaune, Vert, Rouge', type: 'theory', xp: 14, duration: 10, status: 'locked' },
          { id: '3-2-2', title: 'Reconnaître en 30 secondes', type: 'practice', xp: 20, duration: 8, status: 'locked' },
        ],
        bossLesson: { id: '3-2-boss', title: '🏆 Défi unité 2', type: 'practice', xp: 50, duration: 10, status: 'locked' },
      },
    ],
  },
  {
    id: 4,
    slug: 'presentation',
    title: "Présenter l'opportunité",
    description: 'Construire une présentation duplicable, maîtriser le storytelling et les outils tiers.',
    duree: '2 semaines',
    totalLessons: 10,
    progression: 0,
    status: 'locked',
    livres: ['45 secondes — Don Failla', 'Building a StoryBrand — Miller', 'Made to Stick — Heath'],
    units: [],
  },
  {
    id: 5,
    slug: 'suivi',
    title: 'Effectuer le suivi',
    description: 'Organiser un système de suivi rigoureux et transformer les maybe en oui.',
    duree: '1 semaine',
    totalLessons: 8,
    progression: 0,
    status: 'locked',
    livres: ['How to Follow Up — Schreiter', 'Objections — Jeb Blount'],
    units: [],
  },
  {
    id: 6,
    slug: 'conclusion',
    title: 'Conclure & Gérer les objections',
    description: 'Traiter les 10 objections types, appliquer Feel/Felt/Found et conclure naturellement.',
    duree: '2 semaines',
    totalLessons: 14,
    progression: 0,
    status: 'locked',
    livres: ['Never Split the Difference — Voss', 'Influence — Cialdini', 'Objections — Blount'],
    units: [],
  },
  {
    id: 7,
    slug: 'demarrage',
    title: 'Démarrer ses filleuls',
    description: 'Aider chaque filleul à obtenir ses premiers résultats en 72h.',
    duree: '1 semaine',
    totalLessons: 8,
    progression: 0,
    status: 'locked',
    livres: ['Go Pro — Worre ch.9', 'Sponsoring Magic — Schreiter', 'Votre première année — Yarnell'],
    units: [],
  },
  {
    id: 8,
    slug: 'leadership',
    title: 'Événements & Leadership',
    description: 'Promouvoir les événements, développer son leadership et inspirer son équipe.',
    duree: '2 semaines',
    totalLessons: 12,
    progression: 0,
    status: 'locked',
    livres: ['21 lois du leadership — Maxwell', 'Start With Why — Sinek', 'Leaders Eat Last — Sinek'],
    units: [],
  },
]

export function getModuleById(id: number): Module | undefined {
  return modules.find(m => m.id === id)
}

export function getUnitById(moduleId: number, unitId: string): Unit | undefined {
  const mod = getModuleById(moduleId)
  return mod?.units.find(u => u.id === unitId)
}

export function getLessonById(moduleId: number, unitId: string, lessonId: string): Lesson | undefined {
  const unit = getUnitById(moduleId, unitId)
  if (!unit) return undefined
  if (unit.bossLesson?.id === lessonId) return unit.bossLesson
  return unit.lessons.find(l => l.id === lessonId)
}

export function getGlobalStats() {
  const total = modules.reduce((sum, m) => sum + m.totalLessons, 0)
  const completed = modules.reduce((sum, m) => {
    return sum + m.units.reduce((u, unit) => {
      return u + unit.lessons.filter(l => l.status === 'done').length + (unit.bossLesson?.status === 'done' ? 1 : 0)
    }, 0)
  }, 0)
  return {
    totalLessons: total,
    completedLessons: completed,
    globalProgress: Math.round((completed / total) * 100),
    currentModule: modules.find(m => m.status === 'current'),
  }
}

export const lessonTypeIcons: Record<LessonType, string> = {
  theory: '📖',
  quiz: '⭐',
  practice: '🎯',
  roleplay: '💬',
  video: '🎬',
}

export const lessonTypeLabels: Record<LessonType, string> = {
  theory: 'Théorie',
  quiz: 'Quiz',
  practice: 'Pratique',
  roleplay: 'Jeu de rôle',
  video: 'Vidéo',
}
