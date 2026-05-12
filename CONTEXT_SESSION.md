# 🏔️ Upline.ai — Fichier de Contexte Session

> À partager au début de chaque nouvelle session Claude
> Dernière mise à jour : 12 Mai 2026

---

## 📍 Où on en est

**Étape actuelle : Étape 5 — Dashboard Next.js PWA**

On vient de terminer :
- ✅ Toute l'infrastructure Docker (12 conteneurs)
- ✅ 17 tables PostgreSQL
- ✅ RAG Chroma opérationnel (166 chunks)
- ✅ Flow Atlas Coach opérationnel dans Flowise
- ✅ Atlas répond en français avec le RAG ✅

On commence maintenant :
- 🔄 Dashboard Next.js PWA (7 pages)
- 🔲 Flows Prospecteur + Vendeur (à faire après ou en parallèle)

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
Palette    : noir #0A0A0A + or #C9A84C + blanc #FFFFFF
Navigation : sidebar desktop + bottom nav mobile
Frontend   : Next.js 14 + TypeScript + Tailwind + Shadcn
Hébergement: Vercel
```

---

## 📁 Repo Gitea

- URL : https://gitea-sapw.srv1651221.hstgr.cloud/patrice/upline-ai
- Branch : main
- Fichiers : init_database.sql, index.html

---

## 🔜 Prochaines étapes

1. **Étape 5** — Dashboard Next.js PWA
   - Créer projet Next.js dans VS Code avec Cline
   - Stack : Next.js 14 + TypeScript + Tailwind + Shadcn/ui
   - 7 pages : Accueil, Formation, Business, Communauté, Achievements, Parrainage, Profil
   - Widget chat Atlas intégré (via API Flowise)
   - Design noir/or

2. **Étape 4 (suite)** — Flows Flowise restants
   - upline-prospecteur
   - upline-vendeur

---

## 📋 Décisions importantes prises

- Coach IA s'appelle **Atlas** (pas Upline)
- Modèle LLM : **deepseek-v4-flash** (bon compromis vitesse/qualité)
- Embeddings : **nomic-embed-text local** (Ollama sur VPS)
- BDD : **PostgreSQL direct** (pas Appwrite)
- Vector store : **Chroma** (pas Qdrant)
- Orchestration : **Flowise** (pas Hermes)
- Frontend : **Vercel** (pas VPS)
- Parrainage phase 1 : **mois gratuit** (pas commission cash)
- Streaming : **à implémenter plus tard**
- Simulations vocales : **phase 2** (Dograh)

---

*Fichier à partager au début de chaque nouvelle session*
*Référence document complet : Upline_ai_Architecture_v7.md*
