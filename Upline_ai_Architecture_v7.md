# 🏔️ Upline.ai — Architecture Complète

> Document de référence — Version 8.0 — Mai 2026
> Auteur : Patrice
> Statut : Document final — En cours de développement

---

## 🎯 Vision du Projet

Upline.ai est une plateforme SaaS IA **agnostique** spécialisée dans le marketing de réseau (MLM). Elle forme et coache les distributeurs MLM quelle que soit leur société (Herbalife, Amway, Forever Living, etc.) via un agent IA coach nommé **Atlas**, une base de connaissance structurée, des simulations vocales et une communauté d'entraide.

**Positionnement** : Upline.ai ne vend pas de produits MLM. Il forme des compétences universelles applicables dans toute société MLM.

**Modèle** : SaaS freemium — Trial 1h → Gratuit limité → Premium $19/mois.

**Coach IA** : **Atlas** — chaleureux, motivant, orienté résultats.

---

## ✅ État d'avancement — Mai 2026

### Infrastructure Docker (100% déployée)

| Conteneur | Statut | Rôle |
|---|---|---|
| Traefik | ✅ Actif | Reverse proxy + SSL |
| VS Code Server | ✅ Actif | Développement IA |
| Open WebUI | ✅ Actif | Interface IA dev |
| Flowise | ✅ Actif | Orchestration IA + RAG |
| Chroma | ✅ Actif | Base vectorielle |
| n8n | ✅ Actif | Automatisations |
| PostgreSQL | ✅ Actif | Base de données |
| Pgweb | ✅ Actif | Interface visuelle PostgreSQL |
| Gitea | ✅ Actif | Versioning code |
| Gotenberg | ✅ Actif | Génération PDF |
| Uptime Kuma | ✅ Actif | Monitoring 24h/24 |
| Ollama | ✅ Actif | Embeddings locaux |
| Dograh | 🔲 Phase 2 | Simulations vocales |
| Evolution API | 🔲 Phase 3 | WhatsApp optionnel |

### Modèles IA

| Modèle | Rôle | Hébergement |
|---|---|---|
| `deepseek-v4-flash` | LLM principal Atlas Coach | Ollama Cloud |
| `nomic-embed-text` | Embeddings RAG | Ollama local (VPS) |

### Flowise — Flows

| Flow | Statut | Rôle |
|---|---|---|
| `upline-coach-atlas` | ✅ Opérationnel | Coach Atlas principal |
| `upline-prospecteur` | 🔲 À créer | Agent acquisition |
| `upline-vendeur` | 🔲 À créer | Séquence post-trial |

### RAG — Chroma

| Collection | Statut | Contenu |
|---|---|---|
| `upline_knowledge` | ✅ 166 chunks | The Happy Network Marketer (Tom "Big Al") |
| `upline_[société]` | 🔲 À créer | Spécificités par société |
| `upline_teaser` | 🔲 À créer | Avant-goût prospects |
| `upline_community` | 🔲 À créer | Meilleures discussions forum |

### Base de données PostgreSQL

| Élément | Statut |
|---|---|
| 17 tables créées | ✅ |
| Index créés | ✅ |
| Connexion Flowise | ✅ |
| Connexion n8n | ✅ |

### Développement

| Étape | Statut |
|---|---|
| Étape 1 — Infrastructure | ✅ Terminée |
| Étape 2 — Tables PostgreSQL | ✅ Terminée |
| Étape 3 — Pipeline RAG | ✅ Terminée (1 livre) |
| Étape 4 — Flows Flowise | 🔄 En cours (Coach fait, Prospecteur + Vendeur à faire) |
| Étape 5 — Dashboard Next.js PWA | ✅ Terminée |
| Étape 6 — Connexion Atlas + Auth JWT | 🔄 À démarrer |
| Étape 7 — Site vitrine + Prospecteur | 🔲 À faire |
| Étape 8 — Panel Admin | 🔲 À faire |
| Étape 9 — Stripe + Abonnements + Trial | 🔲 À faire |
| Étape 10 — Automatisations n8n + Brevo | 🔲 À faire |
| Étape 11 — Domaine + Production | 🔲 À faire |

---

## 🏗️ Stack Complète

| Composant | Technologie | Rôle | Hébergement |
|---|---|---|---|
| VPS | Hostinger 16GB RAM | Infrastructure principale | Hostinger |
| Reverse proxy | Traefik | SSL + routing | VPS |
| Éditeur IA | VS Code Server + Cline | Développement | VPS |
| Interface dev | Open WebUI | Chat IA dev | VPS |
| Modèle LLM | deepseek-v4-flash (Ollama Cloud) | Cerveau Atlas | Cloud |
| Embeddings | nomic-embed-text (Ollama local) | Vectorisation RAG | VPS |
| Orchestration IA | Flowise | RAG + mémoire + API | VPS |
| Base vectorielle | Chroma | Connaissance MLM | VPS |
| Automatisations | n8n | Workflows + emails | VPS |
| Base de données | PostgreSQL | Toutes les données | VPS |
| Interface BDD | Pgweb | Gestion visuelle | VPS |
| Versioning | Gitea | Dépôt code privé | VPS |
| PDF | Gotenberg | Rapports mensuels | VPS |
| Monitoring | Uptime Kuma | Surveillance 24h/24 | VPS |
| Voix IA | Dograh | Simulations vocales | VPS (phase 2) |
| WhatsApp | Evolution API | Canal optionnel | VPS (phase 3) |
| Frontend | Next.js 14 PWA | Interface utilisateur | Vercel |
| Paiements | Stripe | Abonnements + trials | Cloud |
| Emails | Brevo | Séquences + transactionnel | Cloud |
| Domaine | upline.ai | Identité web | À acheter |

---

## 🎨 Identité Visuelle

### Nom & Domaine
- **Plateforme** : Upline.ai
- **Coach IA** : Atlas
- **Domaine** : `upline.ai`

### Palette (mise à jour v8)
```
Fond principal    #161410   noir chaud (remplace #0A0A0A)
Fond secondaire   #1E1B14   noir doux chaud
Accent principal  #E2B84A   or brillant (remplace #C9A84C)
Accent hover      #ECC85E   or clair
Texte principal   #FFFFFF   blanc pur (dark) / #1C1008 (light)
Texte secondaire  #A89878   gris chaud (dark) / #7A6A4A (light)
Bordures          #2A2318   séparateurs chauds
Light bg          #FAF8F4   crème chaud (light mode)
Light secondary   #F0EBE0   crème secondaire
```

### Règle couleur or
- **Or = accents uniquement** : chiffres clés, boutons CTA, logo, icône active, nom Atlas
- **Texte = blanc/foncé chaud** : tout le texte de lecture
- **Jamais de texte courant en or** (illisible)

### Navigation
- Desktop : sidebar gauche fixe 224px (Lucide React icons)
- Mobile : bottom nav 4 items + drawer "Plus"

### Icônes (Lucide React)
```
Accueil     → LayoutDashboard
Formation   → GraduationCap
Business    → Briefcase
Communauté  → Users
Succès      → Trophy
Parrainage  → GitFork
Profil      → User
Cloche      → Bell (header desktop)
Dark/Light  → Sun / Moon
```

---

## 🌐 Architecture DNS

```
upline.ai              → Site vitrine + Prospecteur   (Vercel)
app.upline.ai          → Dashboard PWA utilisateurs   (Vercel)
admin.upline.ai        → Panel admin                  (Vercel)
api.upline.ai          → API Flowise + n8n            (VPS)
```

---

## 🖥️ Dashboard PWA — 7 Pages (✅ Terminées)

### Page 1 — Accueil
- Greeting + streak + niveau
- 4 cards stats (Sessions, Formation, Badges, Filleuls)
- Barre progression formation
- Widget Atlas intégré (chat)
- Activité récente

### Page 2 — Formation
- 8 modules progressifs (programme Go Pro — Eric Worre)
- Statuts : terminé / en cours / disponible / verrouillé
- Formats par module : texte / vidéo / audio / quiz / pratique
- Atlas coach intégré par module (questions, jeu de rôle, exercices)
- Bibliothèque Amazon/Audible affiliée par module (30+ livres, 5 niveaux)
- Boutons [Quiz rapide] [Jeu de rôle] [Exercice pratique]

### Programme Formation — 8 Modules (12 semaines)
| # | Module | Durée | Habileté Worre |
|---|---|---|---|
| 1 | Fondations & État d'esprit | 1 sem | Mindset |
| 2 | Trouver des prospects | 1 sem | Habileté 1 |
| 3 | Inviter les prospects | 2 sem | Habileté 2 |
| 4 | Présenter l'opportunité | 2 sem | Habileté 3 |
| 5 | Effectuer le suivi | 1 sem | Habileté 4 |
| 6 | Conclure & Objections | 2 sem | Habileté 5 |
| 7 | Démarrer ses filleuls | 1 sem | Habileté 6 |
| 8 | Événements & Leadership | 2 sem | Habileté 7 |

### Page 3 — Business (Mini-CRM MLM)
- Vue Pipeline (Kanban 5 colonnes) — desktop
- Vue Liste — mobile par défaut
- 5 statuts : Liste → Invité → Présenté → Suivi → Oui/Non
- Qualification prospect : Marché (chaud/tiède/froid) + Personnalité (4 couleurs Schreiter)
- Bouton 📞 appel direct `tel:` sur mobile
- Bouton "Inviter sur Upline.ai" quand statut = Oui
- Modal prospect avec conseil Atlas selon personnalité
- Lien double : filleul MLM → filleul Upline.ai

### Logique parrainage croisé
```
Si filleul MLM même société que parrain
  → Expérience pré-remplie (société héritée)
  → "Tu rejoins l'équipe Herbalife de Patrice 🎉"
Sinon
  → Onboarding générique agnostique
  → "Quelle est ta société MLM ?"
```

### Page 4 — Communauté
- 3 onglets : Général / Société (Herbalife) / Mon équipe
- Posts avec likes interactifs + commentaires
- Bouton Publier + zone de saisie
- Espaces société (membres uniquement)
- Top contributeurs
- Règles communauté (anonymisation données sensibles)

### Page 5 — Succès & Badges
- Niveau + XP + barre progression
- 8 badges (3 obtenus, 5 à débloquer avec progression)
- Défis hebdomadaires avec 3 types :
  - **[TERRAIN]** orange : actions réelles business MLM
  - **[FORMATION]** bleu : leçons et modules
  - **[ATLAS]** doré : jeux de rôle et exercices IA
- Atlas introduit les défis (contexte Herbalife explicite)
- Streak calendrier 4 semaines
- Leaderboard équipe

### Page 6 — Parrainage
- Lien unique `upline.ai/u/patrice` + copie 1 clic
- Boutons partage : WhatsApp / Email / LinkedIn / SMS
- Phase 1 : mois gratuits (barre progression 2/5)
- Phase 2 : 20% commission cash (teaser grisé)
- Stats : filleuls actifs / Premium convertis / mois gagnés
- Liste filleuls avec statuts
- Carte de visite digitale + QR Code

### Page 7 — Profil
- Avatar cliquable (sidebar bas + header droite desktop)
- Identité : nom, email, lien upline.ai/u/patrice, badge Premium
- Société MLM (Herbalife) + bouton Ajouter
- Abonnement Premium $19/mois + avantages
- Stats personnelles
- Documents & Export (PDF, carte visite, historique)
- Paramètres (dark/light, notifications, langue)
- Zone de danger (suppression compte)

---

## 📱 Responsive Mobile

### Bottom Navigation
```
Mobile : [Accueil] [Formation] [Business] [Succès] [··· Plus]
                                                        ↓ drawer
                                                   [Communauté]
                                                   [Parrainage]
                                                   [Profil]
```

### Header
```
Desktop : [☀️/🌙] [🔔 cloche] [P avatar] 
Mobile  : [☀️/🌙] seulement
```

### Pages adaptées mobile
- Business : Vue Liste par défaut, Pipeline masqué
- Modal prospect : bottom sheet sur mobile
- Formation : header flex-col, livres flex-col
- Succès : défis en flex-col
- Profil : avatar compact, truncate sur textes longs

---

## 💰 Modèle Économique

### Tunnel d'acquisition
```
Utilisateur reçoit un lien de parrainage
              ↓
Arrive sur upline.ai
              ↓
Widget Atlas Prospecteur : avant-goût gratuit
              ↓
Fournit uniquement son email
              ↓
Accès TRIAL 1 heure chrono (timer visible)
Atlas Coach complet — vraie expérience
              ↓
Heure écoulée → Message Atlas + bouton Stripe
              ↓
Si pas de paiement → Séquence email Atlas Vendeur
J+0 à J+30
```

### Plans

| Fonctionnalité | Trial (1h) | Gratuit | Premium ($19/mois) |
|---|---|---|---|
| Messages Atlas/jour | Illimité | 10 | Illimité |
| RAG commun | ✅ | ✅ | ✅ |
| RAG société | ✅ | ❌ | ✅ |
| Parcours structurés | Partiel | Partiel | Complet |
| CRM Prospects | ✅ | Limité | Illimité |
| Export PDF sessions | ❌ | ❌ | ✅ |
| Rapport mensuel PDF | ❌ | ❌ | ✅ |
| Simulations vocales | ❌ | ❌ | ✅ |
| Forum communauté | ❌ | ✅ | ✅ |

### Parrainage
- **Phase 1** : 1 mois premium offert au parrain + filleul
- **Phase 2** : Commission cash 20% (Stripe Connect)

### Affiliation
- Liens Amazon + Audible dans bibliothèque formation
- 30+ livres MLM classés en 5 niveaux de priorité

---

## 🤖 Les Trois Agents Atlas

### Agent 1 — Atlas Coach
- **Flow Flowise** : `upline-coach-atlas` ✅ Opérationnel
- **Modèle** : deepseek-v4-flash via Ollama Cloud
- **RAG** : upline_knowledge (Top K: 2)
- **Mémoire** : Buffer Memory
- **Langue** : Français

**SOUL.md :**
```
Tu es Atlas, un coach MLM expert, chaleureux et orienté résultats.
Tu accompagnes les distributeurs MLM à performer dans leur business,
quelle que soit leur société.
Contexte : {context}
Règles :
- Utilise toujours le prénom si connu
- Max 3 conseils par message
- Réponds toujours en français
- Fixe des objectifs concrets et mesurables
- Célèbre chaque victoire
- Adapte ton conseil à la personnalité du prospect (4 couleurs Schreiter)
- Pour les défis TERRAIN, rappelle que c'est du vrai terrain business
```

### Agent 2 — Atlas Prospecteur
- **Flow Flowise** : `upline-prospecteur` 🔲 À créer
- **Modèle** : deepseek-v4-flash via Ollama Cloud
- **RAG** : upline_teaser (à créer)
- **Limite** : 10 messages/session

### Agent 3 — Atlas Vendeur
- **Flow Flowise** : `upline-vendeur` 🔲 À créer
- **Canal** : Emails Brevo J+0 à J+30
- **Orchestration** : n8n

---

## 🧠 RAG — Configuration Actuelle

### Embeddings
- **Modèle** : `nomic-embed-text` (Ollama local)
- **URL** : `http://ollama-evar-ollama-1:11434`
- **Dimension** : 768

### Chroma
- **URL interne** : `http://chroma-rz5o-chromadb-1:8000`
- **Collection active** : `upline_knowledge`
- **Chunks** : 166 (The Happy Network Marketer)
- **Top K** : 2

---

## 🗄️ Base de Données PostgreSQL

### Connexion
- **Host** : `172.16.4.2`
- **Port** : `5432`
- **Database** : `ZhnKpovqAtFoNZtW`
- **Username** : `OeXA5Cqvw7ehK7yY`

### 17 Tables créées
users, abonnements, societes, user_societes, user_memory,
apprentissage, sessions_coaching, parcours, user_parcours,
badges, user_badges, defis, user_defis, forum_posts,
referrals, rag_contributions, usage_stats

---

## ⚡ N8N — 14 Workflows

| # | Workflow | Déclencheur |
|---|---|---|
| 1 | Email J+0 post-trial | Trial expiré |
| 2 | Email J+1 | 24h après J+0 |
| 3 | Email J+3 | Technique manquante |
| 4 | Email J+7 | Offre $15/mois |
| 5 | Email J+14 | Message du parrain |
| 6 | Archivage J+30 | Sans paiement |
| 7 | Streak en danger | 23h sans connexion |
| 8 | Rapport hebdo | Lundi 9h |
| 9 | Défi hebdomadaire | Lundi 8h |
| 10 | Tip du jour | Chaque matin 8h |
| 11 | Filleul inscrit | Trial démarré |
| 12 | Mois gratuit | Filleul converti |
| 13 | Rapport mensuel PDF | 1er du mois |
| 14 | Backup PostgreSQL | Chaque nuit 3h |

---

## 🎤 Simulations Vocales — Phase 2 (Dograh)

- Mode 1 : Atlas joue le prospect (formation guidée)
- Mode 2 : Défis solo (scénarios variés)
- Mode 3 : Communauté user vs user (phase 3)

---

## 🤖 Stratégie LLM

| Phase | Users | Modèle | Coût estimé |
|---|---|---|---|
| Phase 1 MVP | 0-500 | deepseek-v4-flash | ~$10-20/mois |
| Phase 2 | 500-2000 | deepseek-v4-flash + rate limiting | ~$30-80/mois |
| Phase 3 | 2000+ | Évaluation selon qualité/coût | À définir |

---

## 💰 Budget Phase 1

| Poste | Coût mensuel |
|---|---|
| VPS Hostinger 16GB | ~$20 |
| Ollama Cloud (deepseek-v4-flash) | ~$10-20 |
| Vercel | $0 |
| Brevo | $0 (300 emails/jour) |
| Domaine upline.ai | ~$1.25 |
| Stripe | 1.4% + 0.25€/transaction |
| **Total avant revenus** | **~$31-41/mois** |

**Break-even** : 2 users premium couvrent l'infrastructure.

---

## 🔐 Sécurité

- Clés API dans variables d'environnement Docker
- Chroma accessible uniquement en interne
- PostgreSQL derrière Traefik (HTTPS)
- Auth JWT pour dashboard + admin
- Rate limiting : 10 msg/jour (gratuit), illimité (premium/trial)
- Webhooks n8n protégés par token
- Backup PostgreSQL automatique chaque nuit
- Uptime Kuma surveille tous les services

---

## 📊 Ordre de Construction

### ✅ ÉTAPE 1 — Infrastructure (TERMINÉE)
### ✅ ÉTAPE 2 — Base de données (TERMINÉE)
### ✅ ÉTAPE 3 — Pipeline RAG (TERMINÉE)
### 🔄 ÉTAPE 4 — Flows Flowise (EN COURS)
- ✅ upline-coach-atlas opérationnel
- 🔲 upline-prospecteur
- 🔲 upline-vendeur

### ✅ ÉTAPE 5 — Dashboard Next.js PWA (TERMINÉE)
- ✅ Next.js 14 + TypeScript + Tailwind + Shadcn + Lucide React
- ✅ Palette noir chaud + or brillant #E2B84A
- ✅ Dark/Light mode
- ✅ 7 pages complètes et responsives
- ✅ CRM Prospects avec pipeline MLM
- ✅ Programme formation 8 modules
- ✅ Système badges + défis TERRAIN/FORMATION/ATLAS
- ✅ Parrainage + carte de visite digitale
- ✅ Bibliothèque Amazon/Audible affiliée
- ✅ Bottom nav mobile + drawer "Plus"
- ✅ Déployé sur Vercel + GitHub + Gitea

### 🔲 ÉTAPE 6 — Connexion Atlas + Auth JWT
- Brancher widget chat → API Flowise
- Page login/signup
- Middleware protection routes
- Données réelles PostgreSQL
- CRM prospects persistant

### 🔲 ÉTAPE 7 — Site vitrine + Prospecteur
### 🔲 ÉTAPE 8 — Panel Admin complet
### 🔲 ÉTAPE 9 — Stripe + Abonnements + Trial
### 🔲 ÉTAPE 10 — Automatisations n8n + Brevo
### 🔲 ÉTAPE 11 — Domaine + Production
### 🔲 PHASE 2 — Simulations Vocales (Dograh)
### 🔲 PHASE 3 — Scale + Multilingue

---

*Document mis à jour le 13 Mai 2026 — Version 8.0*
*Prochaine mise à jour : après Étape 6 (Atlas connecté + Auth JWT)*
