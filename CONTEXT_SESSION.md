# 🏔️ Upline.ai — Fichier de Contexte Session

> À partager au début de chaque nouvelle session Claude
> Dernière mise à jour : 13 Mai 2026

---

## 📍 Où on en est

**Étape actuelle : Étape 5 — Dashboard Next.js PWA (TERMINÉE)**

On vient de terminer :
- ✅ Toute l'infrastructure Docker (12 conteneurs)
- ✅ 17 tables PostgreSQL
- ✅ RAG Chroma opérationnel (166 chunks)
- ✅ Flow Atlas Coach opérationnel dans Flowise
- ✅ Atlas répond en français avec le RAG
- ✅ Dashboard Next.js PWA complet (7 pages)
- ✅ Déployé sur Vercel → https://upline-dashboard.vercel.app
- ✅ GitHub + Gitea synchronisés
- ✅ Responsive mobile complet

On commence maintenant :
- 🔄 Étape 6 — Connexion Atlas réel (Flowise API)
- 🔄 Auth JWT + connexion/inscription
- 🔄 Données réelles PostgreSQL
- 🔲 PWA manifest + icônes installables

---

## 🖥️ Accès aux services

| Service | URL |
|---|---|
| VS Code Server | https://visual-studio-code-server-73a3.srv1651221.hstgr.cloud |
| Open WebUI | https://open-webui-67yd.srv1651221.hstgr.cloud |
| Flowise | https://flowise-nsfn.srv1651221.hstgr.cloud |
| Pgweb | https://pgweb-5w3h.srv1651221.hstgr.cloud |
| Gitea | https://gitea-sapw.srv1651221.hstgr.cloud |
| Uptime Kuma | https://uptime-kuma-wmt1.srv1651221.hstgr.cloud |
| n8n | https://n8n-ljj5.srv1651221.hstgr.cloud |
| Dashboard Vercel | https://upline-dashboard.vercel.app |

---

## 🤖 Configuration IA

| Élément | Valeur |
|---|---|
| LLM | deepseek-v4-flash via Ollama Cloud |
| Embeddings | nomic-embed-text via Ollama local |
| Ollama local URL | http://ollama-evar-ollama-1:11434 |
| Ollama Cloud URL | https://ollama.com/v1 |
| Flow Atlas | upline-coach-atlas (Flowise) |
| Chroma URL | http://chroma-rz5o-chromadb-1:8000 |
| Collection RAG | upline_knowledge (166 chunks) |
| Top K | 2 |

---

## 🗄️ Base de données PostgreSQL

| Élément | Valeur |
|---|---|
| Host | 172.16.4.2 |
| Port | 5432 |
| Database | ZhnKpovqAtFoNZtW |
| Username | OeXA5Cqvw7ehK7yY |
| Conteneur | postgresql-codj-postgresql-1 |

---

## 🐳 Conteneurs Docker

```
traefik-traefik-1
visual-studio-code-server-73a3-code-server-1
open-webui-67yd-open-webui-1
flowise-nsfn-flowise-1
chroma-rz5o-chromadb-1
n8n-ljj5-n8n-1
postgresql-codj-postgresql-1
pgweb-5w3h-pgweb-1
gitea-sapw-gitea-1
gotenberg-usc6-gotenberg-1
uptime-kuma-wmt1-uptime-kuma-1
ollama-evar-ollama-1
```

---

## 🎨 Design Upline.ai

```
Plateforme : Upline.ai
Coach IA   : Atlas
Palette    : fond #161410 (noir chaud) + or #E2B84A + blanc #FFFFFF
Fond secondaire : #1E1B14
Bordures   : #2A2318
Texte secondaire : #A89878
Or hover   : #ECC85E
Navigation : sidebar desktop + bottom nav mobile (drawer "Plus")
Frontend   : Next.js 14 + TypeScript + Tailwind + Shadcn + Lucide React
Hébergement: Vercel
```

---

## 📁 Repos Git

| Repo | URL |
|---|---|
| GitHub | https://github.com/Biz4me/upline-dashboard |
| Gitea | https://gitea-sapw.srv1651221.hstgr.cloud/patrice/upline-ai |
| Branch | main |

---

## 🖥️ Dashboard — Pages terminées

| Page | URL | Statut |
|---|---|---|
| Accueil | / | ✅ Cards stats + widget Atlas + activité |
| Formation | /formation | ✅ 8 modules + Atlas coach + livres Amazon/Audible |
| Business | /business | ✅ CRM Pipeline/Liste + appel mobile + invitation Upline |
| Communauté | /communaute | ✅ Fil général + espaces société + Mon équipe |
| Succès | /achievements | ✅ Badges + défis TERRAIN/FORMATION/ATLAS + streak + leaderboard |
| Parrainage | /parrainage | ✅ Lien unique + filleuls + carte de visite + QR Code |
| Profil | /profil | ✅ Avatar cliquable + société MLM + abonnement + export |

---

## 🏗️ Architecture Dashboard

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx          ← Sidebar + BottomNav + ThemeToggle + Cloche
│   │   ├── page.tsx            ← Accueil
│   │   ├── formation/page.tsx
│   │   ├── business/page.tsx
│   │   ├── communaute/page.tsx
│   │   ├── achievements/page.tsx
│   │   ├── parrainage/page.tsx
│   │   └── profil/page.tsx
│   ├── layout.tsx              ← Root layout + Inter font
│   └── globals.css             ← Variables CSS dark/light
└── components/
    └── layout/
        ├── Sidebar.tsx         ← Nav desktop + avatar profil bas
        ├── BottomNav.tsx       ← Nav mobile + drawer "Plus"
        └── ThemeToggle.tsx     ← Toggle dark/light (Sun/Moon Lucide)
```

---

## 🎨 Icônes Navigation (Lucide React)

| Page | Icône |
|---|---|
| Accueil | LayoutDashboard |
| Formation | GraduationCap |
| Business | Briefcase |
| Communauté | Users |
| Succès | Trophy |
| Parrainage | GitFork |
| Profil | User |

---

## 📱 Responsive Mobile

```
Desktop : sidebar 224px + header (☀️ + 🔔 + P avatar)
Mobile  : bottom nav (4 items + ··· Plus)
          drawer "Plus" → Communauté + Parrainage + Profil
          header épuré (☀️ seulement)
```

---

## 💰 Modèle économique

```
Trial 1h → Gratuit limité → Premium $19/mois
Parrainage Phase 1 : 1 mois gratuit parrain + filleul
Parrainage Phase 2 : 20% commission cash (Stripe Connect)
Affiliation Amazon/Audible : livres formation
```

---

## 🔜 Prochaines étapes

1. **Connexion Atlas réel** — brancher widget chat sur API Flowise
2. **Auth JWT** — page login/signup + middleware protection routes
3. **Données réelles PostgreSQL** — remplacer données statiques
4. **CRM Business** — vraie persistance prospects en BDD
5. **PWA** — manifest.json + icônes + service worker
6. **Flows Flowise restants** — upline-prospecteur + upline-vendeur

---

## 📋 Décisions importantes prises

- Coach IA s'appelle **Atlas** (pas Upline)
- Or brillant : **#E2B84A** (plus lumineux que #C9A84C original)
- Fond : **#161410** noir chaud (pas noir pur)
- Or = **accents uniquement** (chiffres, boutons, logo) — texte en blanc
- Light mode : crème chaud **#FAF8F4** (pas blanc pur)
- Formation : **8 modules** inspirés de Go Pro (Eric Worre)
- Business : **mini-CRM MLM** avec pipeline 5 étapes + 4 personnalités Schreiter
- Défis : badges **[TERRAIN]** / **[FORMATION]** / **[ATLAS]** pour clarifier contexte
- Bouton appel direct `tel:` sur mobile depuis le CRM
- Bouton "Inviter sur Upline.ai" quand prospect converti (lien parrainage)
- Bottom nav mobile : **drawer "Plus"** pour Communauté + Parrainage + Profil
- Header desktop : **cloche 🔔** pour futures notifications
- Profil accessible via **avatar cliquable** sidebar + header
- Si filleul MLM même société → expérience pré-remplie Upline.ai
- Si filleul MLM société différente → onboarding générique agnostique
- Bibliothèque **Amazon/Audible affiliée** dans chaque module formation
- Streaming Atlas : **à implémenter plus tard**
- Simulations vocales : **phase 2** (Dograh)

---

*Fichier à partager au début de chaque nouvelle session*
*Référence document complet : Upline_ai_Architecture_v8.md*
