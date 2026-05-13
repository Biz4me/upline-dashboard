# 🏔️ Upline.ai — Fichier de Contexte Session

> À partager au début de chaque nouvelle session Claude
> Dernière mise à jour : 13 Mai 2026

---

## 📍 Où on en est

**Étape actuelle : Étape 6 — Connexion Atlas + Auth JWT (EN COURS)**

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
- ✅ Toggle dark/light fonctionnel (script inline layout.tsx)
- ✅ Polices Plus Jakarta Sans (titres) + DM Sans (corps)
- ✅ Dark mode uniforme contrasté (#252018 cards)
- ✅ Sidebar rétractable avec tooltips (SidebarContext)
- ✅ Icônes navigation Option C (Home/Rocket/BarChart2/MessageCircle/Trophy/Share2)
- ✅ Auth JWT NextAuth v5 complet
- ✅ Pages Login + Signup 2 étapes + Onboarding
- ✅ Connexion PostgreSQL depuis Vercel (IP 76.13.46.73 port 32771)
- ✅ Middleware protection routes (cookie __Secure-authjs.session-token)
- ✅ Atlas connecté à Flowise API réelle
- ✅ Streaming token par token (SSE format event/token)
- ✅ Markdown rendu style C (react-markdown + composants custom)
- ✅ API DeepSeek directe (plus rapide + moins cher que Ollama Cloud)
- ✅ Mémoire PostgreSQL Level 3 persistante (table user_memory)
- ✅ Pseudo (username) + login email OU pseudo
- ✅ Déconnexion dropdown avatar header + bouton profil
- ✅ Signup 2 étapes : obligatoire (email+mdp+pseudo+société) + optionnel
- ✅ API /api/user/me + /api/user/update créées
- 🔄 Profil avec score complétion 0-100% (en cours avec Cline)

On continue maintenant :
- 🔄 Profil données réelles + score complétion
- 🔲 Système plans trial/free/premium + limitations
- 🔲 Dashboard SuperAdmin
- 🔲 Pipeline RAG enrichi n8n → Markdown + métadonnées
- 🔲 Landing page

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
| LLM | deepseek-chat via API DeepSeek directe |
| Embeddings | nomic-embed-text via Ollama local |
| Ollama local URL | http://ollama-evar-ollama-1:11434 |
| API DeepSeek URL | https://api.deepseek.com |
| Flow Atlas | upline-coach-atlas (Flowise) |
| Flow ID | 141b2826-8975-4757-b621-4952a05f7be4 |
| Chroma URL | http://chroma-rz5o-chromadb-1:8000 |
| Collection RAG | upline_knowledge (166 chunks) |
| Top K | 2 |

---

## 🗄️ Base de données PostgreSQL

| Élément | Valeur |
|---|---|
| Host interne | 172.16.4.2 |
| Host externe | 76.13.46.73 |
| Port externe | 32771 |
| Database | ZhnKpovqAtFoNZtW |
| Username | OeXA5Cqvw7ehK7yY |
| Password | qeBSTQJLVmP3cOQKN1ZIhLNt3WZyBx0R |
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
Palette dark :
  Fond page      #161410   noir chaud
  Fond sidebar   #1E1B14   noir doux
  Cards          #252018   légèrement plus clair
  Bordures       #3A3020   sable chaud
  Texte          #FFFFFF
  Texte second   #C8B48E
  Or             #E2B84A
  Or hover       #ECC85E

Palette light :
  Fond page      #FAF8F4   crème chaud
  Fond secondary #F0EBE0
  Cards          #F0EBE0
  Bordures       #E0D4B8
  Texte          #2C1F0A
  Texte second   #5A4A2A
  Or             #8B6914

Polices :
  Titres  : Plus Jakarta Sans (--font-title)
  Corps   : DM Sans (--font-body)

Navigation : sidebar desktop rétractable (64px/224px) + bottom nav mobile (drawer "Plus")
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
| Remote | github (pas origin) |

⚠️ Pour pusher : `git push github main`

---

## 🏗️ Architecture Dashboard

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx       ← Email ou pseudo + mdp
│   │   ├── signup/page.tsx      ← 2 étapes (obligatoire + optionnel)
│   │   └── onboarding/page.tsx  ← Société + niveau (optionnel, bouton Passer)
│   ├── (dashboard)/
│   │   ├── layout.tsx           ← SessionProvider + SidebarProvider + Sidebar + BottomNav
│   │   ├── page.tsx             ← Accueil + AtlasChat avec userId
│   │   ├── formation/page.tsx
│   │   ├── business/page.tsx
│   │   ├── communaute/page.tsx
│   │   ├── achievements/page.tsx
│   │   ├── parrainage/page.tsx
│   │   └── profil/page.tsx      ← Données réelles + score complétion (EN COURS)
│   ├── api/
│   │   ├── atlas/route.ts       ← Streaming SSE vers Flowise
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts
│   │   │   └── register/route.ts
│   │   ├── db/migrate/route.ts
│   │   └── user/
│   │       ├── me/route.ts      ← GET profil complet
│   │       ├── update/route.ts  ← POST update infos
│   │       └── profile/route.ts
│   ├── layout.tsx               ← Script inline theme + SessionProvider
│   └── globals.css              ← Variables CSS dark/light
├── auth.ts                      ← NextAuth v5 + credentials
├── middleware.ts                ← Protection routes + cookie name
├── context/
│   └── SidebarContext.tsx
├── components/
│   ├── atlas/
│   │   └── AtlasChat.tsx        ← Streaming + markdown + mémoire
│   └── layout/
│       ├── Sidebar.tsx          ← Rétractable + SidebarContext
│       ├── BottomNav.tsx        ← Drawer Plus
│       └── ThemeToggle.tsx      ← localStorage persistence
└── lib/
    ├── db.ts                    ← Pool PostgreSQL
    └── memory.ts                ← getUserMemory + saveUserMemory + initUserMemory
```

---

## 🎨 Icônes Navigation (Lucide React)

| Page | Icône | Style actif |
|---|---|---|
| Accueil | Home | fond or rgba(226,184,74,0.15) + bordure or |
| Formation | Rocket | idem |
| Business | BarChart2 | idem |
| Communauté | MessageCircle | idem |
| Succès | Trophy | idem |
| Parrainage | Share2 | idem |
| Profil | via avatar sidebar bas | — |

---

## 🤖 Atlas Chat — Configuration

```
Flowise Flow ID : 141b2826-8975-4757-b621-4952a05f7be4
Modèle LLM     : deepseek-chat (API DeepSeek directe)
Mémoire        : user_memory PostgreSQL (Level 3)
Streaming      : SSE format {"event":"token","data":"mot"}
Markdown       : react-markdown + composants custom style C
SessionId      : userId NextAuth (mémoire persistante par user)
Contexte       : injecté depuis user_memory au début de chaque message
```

---

## 📱 Responsive Mobile

```
Desktop : sidebar 224px (rétractable 64px) + header (☀️ + 🔔 + avatar dropdown)
Mobile  : bottom nav (4 items + ··· Plus)
          drawer "Plus" → Communauté + Parrainage
          header épuré (☀️ seulement)
```

---

## 💰 Modèle économique

```
Trial 1h → Gratuit limité (10 msg/jour) → Premium $19/mois
Parrainage Phase 1 : 1 mois gratuit parrain + filleul
Parrainage Phase 2 : 20% commission cash (Stripe Connect)
Affiliation Amazon/Audible : livres formation
```

---

## 🔐 Variables d'environnement Vercel

```
AUTH_SECRET=upline-atlas-secret-2026
NEXTAUTH_SECRET=upline-atlas-secret-2026
DB_HOST=76.13.46.73
DB_PORT=32771
DB_USER=OeXA5Cqvw7ehK7yY
DB_PASSWORD=qeBSTQJLVmP3cOQKN1ZIhLNt3WZyBx0R
DB_NAME=ZhnKpovqAtFoNZtW
FLOWISE_URL=https://flowise-nsfn.srv1651221.hstgr.cloud
FLOWISE_FLOW_ID=141b2826-8975-4757-b621-4952a05f7be4
```

---

## 🔜 Prochaines étapes (dans l'ordre)

1. **Profil données réelles + score complétion** — EN COURS avec Cline
2. **Système plans** — trial/free/premium + compteur messages/jour
3. **Dashboard SuperAdmin** — users, analytics, atlas stats, revenus, système
4. **Pipeline RAG enrichi** — n8n + Gotenberg + LLM → Markdown + métadonnées → Flowise
5. **Landing page** — upline.ai avec Atlas Prospecteur + pricing + tunnel acquisition
6. **PWA** — manifest.json + icônes installables
7. **Stripe** — abonnements + trial 1h timer

---

## 📋 Décisions importantes prises

- Coach IA s'appelle **Atlas** (pas Upline)
- Or brillant : **#E2B84A** dark / **#8B6914** light
- Fond dark : **#161410** noir chaud
- Cards dark : **#252018** (légèrement plus clair que fond)
- Light mode : crème chaud **#FAF8F4**
- Formation : **8 modules** inspirés de Go Pro (Eric Worre)
- Business : **mini-CRM MLM** avec pipeline 5 étapes + 4 personnalités Schreiter
- Bottom nav mobile : **drawer "Plus"** pour Communauté + Parrainage
- Profil accessible via **avatar cliquable** sidebar bas + dropdown header
- **Profil supprimé** du menu navigation (accessible via avatar)
- LLM : **deepseek-chat** via API DeepSeek directe (pas Ollama Cloud)
- Mémoire Atlas : **PostgreSQL Level 3** (table user_memory)
- Streaming : **SSE format Flowise** {"event":"token","data":"mot"}
- Markdown Atlas : **Style C** — minimaliste, aéré, → pour actions
- Signup : **2 étapes** — obligatoire (email+mdp+pseudo+société) + optionnel
- Login : **email OU pseudo**
- Déconnexion : **dropdown avatar** header + bouton page profil
- Remote git : **github** (pas origin) → `git push github main`
- Cline LLM : **Kimi K2.6 cloud** (peut timeout sur longues tâches → diviser)

---

## ⚠️ Points d'attention techniques

- `git push github main` (pas `git push origin main`)
- Python3 non disponible sur VS Code Server → utiliser `node -e` pour scripts
- Cline peut timeout avec Kimi → diviser les prompts en tâches courtes
- PostgreSQL accessible depuis Vercel via IP publique 76.13.46.73:32771
- Cookie NextAuth production : `__Secure-authjs.session-token`
- `useSession()` dans pages dashboard → nécessite `SessionProvider` dans layout
- Flowise streaming format : `data:{"event":"token","data":"mot"}`

---

*Fichier à partager au début de chaque nouvelle session*
*Référence document complet : Upline_ai_Architecture_v8.md*
