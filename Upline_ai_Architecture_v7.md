# 🏔️ Upline.ai — Architecture Complète

> Document de référence — Version 7.0 — Mai 2026
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

### Gitea

| Élément | Statut |
|---|---|
| Instance opérationnelle | ✅ |
| Repo `patrice/upline-ai` | ✅ |
| `init_database.sql` commité | ✅ |

### Services externes

| Service | Statut | Rôle |
|---|---|---|
| Ollama Cloud | ✅ Configuré | LLM deepseek-v4-flash |
| Vercel | 🔲 À configurer | Hébergement frontend |
| Stripe | 🔲 À configurer | Paiements |
| Brevo | 🔲 À configurer | Emails |
| Domaine upline.ai | 🔲 À acheter | Identité web |

### Développement

| Étape | Statut |
|---|---|
| Étape 1 — Infrastructure | ✅ Terminée |
| Étape 2 — Tables PostgreSQL | ✅ Terminée |
| Étape 3 — Pipeline RAG | ✅ Terminée (1 livre) |
| Étape 4 — Flows Flowise | 🔄 En cours (Coach fait, Prospecteur + Vendeur à faire) |
| Étape 5 — Dashboard Next.js PWA | 🔄 En cours |
| Étape 6 — Site vitrine + Prospecteur | 🔲 À faire |
| Étape 7 — Panel Admin | 🔲 À faire |
| Étape 8 — Stripe + Abonnements | 🔲 À faire |
| Étape 9 — Automatisations n8n | 🔲 À faire |
| Étape 10 — Domaine + Production | 🔲 À faire |

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
| Frontend | Next.js PWA | Interface utilisateur | Vercel |
| Paiements | Stripe | Abonnements + trials | Cloud |
| Emails | Brevo | Séquences + transactionnel | Cloud |
| Domaine | upline.ai | Identité web | À acheter |

---

## 🎨 Identité Visuelle

### Nom & Domaine
- **Plateforme** : Upline.ai
- **Coach IA** : Atlas
- **Domaine** : `upline.ai`

### Palette
```
Fond principal    #0A0A0A   noir profond
Fond secondaire   #111111   noir doux
Accent principal  #C9A84C   or mat
Accent hover      #E2C06A   or clair
Texte principal   #FFFFFF   blanc pur
Texte secondaire  #888888   gris
Bordures          #222222   séparateurs
```

### Logo
Montagne géométrique stylisée formant un "A" — sobre, premium, mémorable. Or mat sur fond noir.

### Navigation
- Desktop : sidebar gauche fixe
- Mobile : bottom navigation 5 icônes

---

## 🌐 Architecture DNS

```
upline.ai              → Site vitrine + Prospecteur   (Vercel)
app.upline.ai          → Dashboard PWA utilisateurs   (Vercel)
admin.upline.ai        → Panel admin                  (Vercel)
api.upline.ai          → API Flowise + n8n            (VPS)
```

---

## 🖥️ Architecture Technique

```
┌──────────────────────────────────────────────────────┐
│                    Utilisateur                        │
│               (navigateur PC ou mobile)               │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│             Dashboard Next.js (PWA)                   │
│             app.upline.ai — Vercel                    │
└───────────────────────┬──────────────────────────────┘
                        │ API call
┌───────────────────────▼──────────────────────────────┐
│                    Flowise                            │
│          Orchestration IA + RAG + Mémoire             │
│  ┌──────────────────┐ ┌──────────┐ ┌─────────────┐  │
│  │ deepseek-v4-flash│ │  Chroma  │ │  PostgreSQL │  │
│  │  (Ollama Cloud)  │ │  (RAG)   │ │  (mémoire)  │  │
│  └──────────────────┘ └──────────┘ └─────────────┘  │
│              ↑                                        │
│   nomic-embed-text (Ollama local VPS)                 │
└──────────────────────────────────────────────────────┘
        │
┌───────▼──────────────────────────────────────────────┐
│                     n8n                               │
│    Workflows / Emails Brevo / PDF Gotenberg / Backup  │
└──────────────────────────────────────────────────────┘
```

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
| Export PDF sessions | ❌ | ❌ | ✅ |
| Rapport mensuel PDF | ❌ | ❌ | ✅ |
| Simulations vocales | ❌ | ❌ | ✅ |
| Forum communauté | ❌ | ✅ | ✅ |

### Parrainage
- **Phase 1** : 1 mois premium offert au parrain + filleul
- **Phase 2** : Commission cash 20% (Stripe Connect)

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
- **URL externe** : `http://localhost:32773`
- **Collection active** : `upline_knowledge`
- **Chunks** : 166 (The Happy Network Marketer)
- **Top K** : 2

### Pipeline ajout PDFs
```
Upload PDF dans Flowise Document Store
        ↓
Loader : Pdf File
Splitter : Recursive Character Text Splitter
Chunk Size : 1000 / Overlap : 200
        ↓
Upsert → Chroma (nomic-embed-text)
        ↓
Disponible pour Atlas immédiatement
```

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

## 🖥️ Dashboard PWA — 7 Pages

1. **Accueil** — streak, progression, widget chat Atlas
2. **Formation** — parcours + exploration libre
3. **Mon Business** — revenus déclarés + stats
4. **Communauté** — forum général + espaces société
5. **Achievements** — badges + leaderboard groupe
6. **Parrainage** — lien unique + carte de visite digitale
7. **Profil** — sociétés + abonnement + export PDF

---

## 👤 Expérience Prospect

```
1. Reçoit lien upline.ai/u/patrice
2. Widget Atlas Prospecteur → avant-goût
3. Donne son email → TRIAL 1h
4. Heure écoulée → Message Atlas + Stripe
5. Si pas de paiement → Séquence J+0 à J+30
```

## 👤 Expérience Utilisateur Premium

```
1. Connexion app.upline.ai
2. Sélectionne sa société
3. Chat avec Atlas (RAG + mémoire longue terme)
4. Formation parcours structurés
5. Rapport PDF mensuel automatique
6. Carte de visite digitale upline.ai/u/[username]
```

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

## 🔗 Réseaux Docker Connectés

```bash
# Tous les réseaux connectés
flowise ↔ postgresql ↔ chroma ↔ ollama
n8n ↔ postgresql ↔ chroma ↔ flowise
pgweb ↔ postgresql
gotenberg ↔ postgresql
gitea ↔ postgresql
ollama ↔ flowise
```

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
- Rate limiting : 10 msg/jour (gratuit), illimité (premium)
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

### 🔄 ÉTAPE 5 — Dashboard Next.js PWA (EN COURS)
- Setup Next.js 14 + TypeScript + Tailwind + Shadcn
- Auth JWT + PostgreSQL
- Onboarding 5 questions
- 7 pages utilisateur
- Widget chat Atlas intégré
- Notifications push PWA

### 🔲 ÉTAPE 6 — Site vitrine + Prospecteur
### 🔲 ÉTAPE 7 — Panel Admin complet
### 🔲 ÉTAPE 8 — Stripe + Abonnements + Trial
### 🔲 ÉTAPE 9 — Automatisations n8n + Brevo
### 🔲 ÉTAPE 10 — Domaine + Production
### 🔲 PHASE 2 — Simulations Vocales (Dograh)
### 🔲 PHASE 3 — Scale + Multilingue

---

*Document mis à jour le 12 Mai 2026 — Version 7.0*
*Prochaine mise à jour : après Étape 5 (Dashboard terminé)*
