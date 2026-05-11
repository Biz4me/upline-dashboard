-- ============================================================
-- Upline.ai - Initialisation complète de la base de données
-- Plateforme SaaS de coaching MLM avec IA
-- PostgreSQL 15+
-- ============================================================

-- Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TYPES ENUM
-- ============================================================

CREATE TYPE user_role AS ENUM ('admin', 'coach', 'user', 'manager');

CREATE TYPE abonnement_plan AS ENUM ('free', 'starter', 'pro', 'enterprise');

CREATE TYPE abonnement_status AS ENUM ('actif', 'expire', 'annule', 'en_attente');

CREATE TYPE session_status AS ENUM ('planifiee', 'en_cours', 'terminee', 'annulee');

CREATE TYPE parcours_status AS ENUM ('non_commence', 'en_cours', 'termine', 'abandonne');

CREATE TYPE defi_status AS ENUM ('non_commence', 'en_cours', 'soumis', 'valide', 'refuse');

CREATE TYPE defi_difficulte AS ENUM ('facile', 'moyen', 'difficile');

CREATE TYPE post_type AS ENUM ('question', 'reponse', 'annonce', 'discussion');

CREATE TYPE referral_status AS ENUM ('en_attente', 'converti', 'expire');

-- ============================================================
-- TABLE : users
-- ============================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    telephone VARCHAR(20),
    role user_role NOT NULL DEFAULT 'user',
    langue VARCHAR(10) DEFAULT 'fr',
    timezone VARCHAR(50) DEFAULT 'Europe/Paris',
    avatar_url TEXT,
    date_naissance DATE,
    pays VARCHAR(100),
    ville VARCHAR(100),
    bio TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    email_verified BOOLEAN NOT NULL DEFAULT false,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ============================================================
-- TABLE : abonnements
-- ============================================================

CREATE TABLE abonnements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    plan abonnement_plan NOT NULL,
    status abonnement_status NOT NULL DEFAULT 'en_attente',
    date_debut TIMESTAMP WITH TIME ZONE,
    date_fin TIMESTAMP WITH TIME ZONE,
    prix_mensuel FLOAT,
    stripe_subscription_id VARCHAR(255),
    stripe_customer_id VARCHAR(255),
    date_annulation TIMESTAMP WITH TIME ZONE,
    renouvellement_auto BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_abonnements_user_id
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_abonnements_user_id ON abonnements(user_id);
CREATE INDEX idx_abonnements_status ON abonnements(status);
CREATE INDEX idx_abonnements_date_fin ON abonnements(date_fin);

-- ============================================================
-- TABLE : societes
-- ============================================================

CREATE TABLE societes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(255) NOT NULL,
    siret VARCHAR(14),
    adresse TEXT,
    code_postal VARCHAR(10),
    ville VARCHAR(100),
    pays VARCHAR(100) DEFAULT 'France',
    telephone VARCHAR(20),
    email_contact VARCHAR(255),
    site_web VARCHAR(255),
    logo_url TEXT,
    secteur_activite VARCHAR(100),
    description TEXT,
    nombre_distributeurs INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_societes_nom ON societes(nom);
CREATE INDEX idx_societes_is_active ON societes(is_active);

-- ============================================================
-- TABLE : user_societes
-- ============================================================

CREATE TABLE user_societes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    societe_id UUID NOT NULL,
    poste VARCHAR(100),
    date_adhesion DATE,
    niveau VARCHAR(50),
    volume_ventes FLOAT NOT NULL DEFAULT 0,
    nombre_recruites INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user_societes_user_id
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user_societes_societe_id
        FOREIGN KEY (societe_id) REFERENCES societes(id)
        ON DELETE CASCADE,

    UNIQUE(user_id, societe_id)
);

CREATE INDEX idx_user_societes_user_id ON user_societes(user_id);
CREATE INDEX idx_user_societes_societe_id ON user_societes(societe_id);
CREATE INDEX idx_user_societes_niveau ON user_societes(niveau);

-- ============================================================
-- TABLE : user_memory
-- ============================================================

CREATE TABLE user_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    cle VARCHAR(100) NOT NULL,
    valeur JSONB,
    categorie VARCHAR(50),
    importance INTEGER NOT NULL DEFAULT 5,
    contexte TEXT,
    source VARCHAR(100),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user_memory_user_id
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    UNIQUE(user_id, cle)
);

CREATE INDEX idx_user_memory_user_id ON user_memory(user_id);
CREATE INDEX idx_user_memory_cle ON user_memory(cle);
CREATE INDEX idx_user_memory_categorie ON user_memory(categorie);
CREATE INDEX idx_user_memory_expires_at ON user_memory(expires_at);

-- ============================================================
-- TABLE : apprentissage
-- ============================================================

CREATE TABLE apprentissage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT,
    type VARCHAR(50),
    categorie VARCHAR(100),
    duree_minutes INTEGER,
    difficulte VARCHAR(20),
    ressources JSONB,
    score_quiz FLOAT,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_apprentissage_user_id
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_apprentissage_user_id ON apprentissage(user_id);
CREATE INDEX idx_apprentissage_type ON apprentissage(type);
CREATE INDEX idx_apprentissage_is_completed ON apprentissage(is_completed);
CREATE INDEX idx_apprentissage_categorie ON apprentissage(categorie);

-- ============================================================
-- TABLE : sessions_coaching
-- ============================================================

CREATE TABLE sessions_coaching (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    coach_id UUID,
    titre VARCHAR(255),
    objectif TEXT,
    contexte TEXT,
    transcript TEXT,
    resume TEXT,
    actions_recommandees JSONB,
    feedback_utilisateur INTEGER,
    notes_coach TEXT,
    status session_status NOT NULL DEFAULT 'planifiee',
    date_debut TIMESTAMP WITH TIME ZONE,
    date_fin TIMESTAMP WITH TIME ZONE,
    duree_minutes INTEGER,
    mode VARCHAR(20) NOT NULL DEFAULT 'ia',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_sessions_coaching_user_id
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_sessions_coaching_coach_id
        FOREIGN KEY (coach_id) REFERENCES users(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_sessions_coaching_user_id ON sessions_coaching(user_id);
CREATE INDEX idx_sessions_coaching_coach_id ON sessions_coaching(coach_id);
CREATE INDEX idx_sessions_coaching_status ON sessions_coaching(status);
CREATE INDEX idx_sessions_coaching_date_debut ON sessions_coaching(date_debut);
CREATE INDEX idx_sessions_coaching_mode ON sessions_coaching(mode);

-- ============================================================
-- TABLE : parcours
-- ============================================================

CREATE TABLE parcours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    objectifs JSONB,
    competences_requises JSONB,
    competences_acquises JSONB,
    duree_estimee_jours INTEGER,
    niveau VARCHAR(20),
    categorie VARCHAR(100),
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    ordre_affichage INTEGER NOT NULL DEFAULT 0,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_parcours_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_parcours_categorie ON parcours(categorie);
CREATE INDEX idx_parcours_is_active ON parcours(is_active);
CREATE INDEX idx_parcours_niveau ON parcours(niveau);
CREATE INDEX idx_parcours_ordre_affichage ON parcours(ordre_affichage);

-- ============================================================
-- TABLE : user_parcours
-- ============================================================

CREATE TABLE user_parcours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    parcours_id UUID NOT NULL,
    status parcours_status NOT NULL DEFAULT 'non_commence',
    progression_pourcentage INTEGER NOT NULL DEFAULT 0,
    date_debut TIMESTAMP WITH TIME ZONE,
    date_fin TIMESTAMP WITH TIME ZONE,
    evaluation_finale FLOAT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user_parcours_user_id
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user_parcours_parcours_id
        FOREIGN KEY (parcours_id) REFERENCES parcours(id)
        ON DELETE CASCADE,

    UNIQUE(user_id, parcours_id)
);

CREATE INDEX idx_user_parcours_user_id ON user_parcours(user_id);
CREATE INDEX idx_user_parcours_parcours_id ON user_parcours(parcours_id);
CREATE INDEX idx_user_parcours_status ON user_parcours(status);

-- ============================================================
-- TABLE : badges
-- ============================================================

CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    icone_url TEXT,
    couleur VARCHAR(20),
    categorie VARCHAR(50),
    condition_deblocage TEXT,
    points INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_badges_categorie ON badges(categorie);
CREATE INDEX idx_badges_is_active ON badges(is_active);

-- ============================================================
-- TABLE : user_badges
-- ============================================================

CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    badge_id UUID NOT NULL,
    date_obtention TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    contexte_obtention TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user_badges_user_id
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user_badges_badge_id
        FOREIGN KEY (badge_id) REFERENCES badges(id)
        ON DELETE CASCADE,

    UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON user_badges(badge_id);

-- ============================================================
-- TABLE : defis
-- ============================================================

CREATE TABLE defis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    difficulte defi_difficulte NOT NULL DEFAULT 'moyen',
    duree_heures INTEGER,
    points_recompense INTEGER NOT NULL DEFAULT 0,
    badge_id UUID,
    parcours_id UUID,
    ressources JSONB,
    date_debut TIMESTAMP WITH TIME ZONE,
    date_fin TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_defis_badge_id
        FOREIGN KEY (badge_id) REFERENCES badges(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_defis_parcours_id
        FOREIGN KEY (parcours_id) REFERENCES parcours(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_defis_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_defis_parcours_id ON defis(parcours_id);
CREATE INDEX idx_defis_difficulte ON defis(difficulte);
CREATE INDEX idx_defis_is_active ON defis(is_active);
CREATE INDEX idx_defis_badge_id ON defis(badge_id);

-- ============================================================
-- TABLE : user_defis
-- ============================================================

CREATE TABLE user_defis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    defi_id UUID NOT NULL,
    status defi_status NOT NULL DEFAULT 'non_commence',
    reponse TEXT,
    pieces_jointes JSONB,
    commentaire_coach TEXT,
    date_soumission TIMESTAMP WITH TIME ZONE,
    date_validation TIMESTAMP WITH TIME ZONE,
    note FLOAT,
    tentatives INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user_defis_user_id
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user_defis_defi_id
        FOREIGN KEY (defi_id) REFERENCES defis(id)
        ON DELETE CASCADE,

    UNIQUE(user_id, defi_id)
);

CREATE INDEX idx_user_defis_user_id ON user_defis(user_id);
CREATE INDEX idx_user_defis_defi_id ON user_defis(defi_id);
CREATE INDEX idx_user_defis_status ON user_defis(status);

-- ============================================================
-- TABLE : forum_posts
-- ============================================================

CREATE TABLE forum_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    parent_id UUID,
    type post_type NOT NULL DEFAULT 'discussion',
    titre VARCHAR(255),
    contenu TEXT NOT NULL,
    tags JSONB,
    is_pinned BOOLEAN NOT NULL DEFAULT false,
    is_resolved BOOLEAN NOT NULL DEFAULT false,
    nombre_vues INTEGER NOT NULL DEFAULT 0,
    nombre_reponses INTEGER NOT NULL DEFAULT 0,
    nombre_likes INTEGER NOT NULL DEFAULT 0,
    societe_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_forum_posts_user_id
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_forum_posts_parent_id
        FOREIGN KEY (parent_id) REFERENCES forum_posts(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_forum_posts_societe_id
        FOREIGN KEY (societe_id) REFERENCES societes(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_forum_posts_user_id ON forum_posts(user_id);
CREATE INDEX idx_forum_posts_parent_id ON forum_posts(parent_id);
CREATE INDEX idx_forum_posts_type ON forum_posts(type);
CREATE INDEX idx_forum_posts_societe_id ON forum_posts(societe_id);
CREATE INDEX idx_forum_posts_created_at ON forum_posts(created_at);
CREATE INDEX idx_forum_posts_is_pinned ON forum_posts(is_pinned);

-- ============================================================
-- TABLE : referrals
-- ============================================================

CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parrain_id UUID NOT NULL,
    filleul_id UUID,
    code_referral VARCHAR(50),
    status referral_status NOT NULL DEFAULT 'en_attente',
    date_inscription_filleul TIMESTAMP WITH TIME ZONE,
    date_conversion TIMESTAMP WITH TIME ZONE,
    recompense_parrain FLOAT,
    recompense_filleul FLOAT,
    source VARCHAR(100),
    campagne VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_referrals_parrain_id
        FOREIGN KEY (parrain_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_referrals_filleul_id
        FOREIGN KEY (filleul_id) REFERENCES users(id)
        ON DELETE SET NULL,

    UNIQUE(parrain_id, filleul_id)
);

CREATE INDEX idx_referrals_parrain_id ON referrals(parrain_id);
CREATE INDEX idx_referrals_filleul_id ON referrals(filleul_id);
CREATE INDEX idx_referrals_status ON referrals(status);
CREATE INDEX idx_referrals_code_referral ON referrals(code_referral);

-- ============================================================
-- TABLE : rag_contributions
-- ============================================================

CREATE TABLE rag_contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    titre VARCHAR(255),
    contenu TEXT NOT NULL,
    source_url TEXT,
    source_type VARCHAR(50),
    categorie VARCHAR(100),
    tags JSONB,
    embedding_vector_id VARCHAR(100),
    qualite_score FLOAT,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    verified_by UUID,
    date_verification TIMESTAMP WITH TIME ZONE,
    usage_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_rag_contributions_user_id
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_rag_contributions_verified_by
        FOREIGN KEY (verified_by) REFERENCES users(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_rag_contributions_user_id ON rag_contributions(user_id);
CREATE INDEX idx_rag_contributions_categorie ON rag_contributions(categorie);
CREATE INDEX idx_rag_contributions_is_verified ON rag_contributions(is_verified);
CREATE INDEX idx_rag_contributions_source_type ON rag_contributions(source_type);
CREATE INDEX idx_rag_contributions_embedding_vector_id ON rag_contributions(embedding_vector_id);

-- ============================================================
-- TABLE : usage_stats
-- ============================================================

CREATE TABLE usage_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    date_jour DATE NOT NULL,
    nombre_sessions INTEGER NOT NULL DEFAULT 0,
    duree_totale_minutes INTEGER NOT NULL DEFAULT 0,
    nombre_messages INTEGER NOT NULL DEFAULT 0,
    nombre_defis_complete INTEGER NOT NULL DEFAULT 0,
    nombre_apprentissages INTEGER NOT NULL DEFAULT 0,
    nombre_connexions INTEGER NOT NULL DEFAULT 0,
    tokens_utilises INTEGER NOT NULL DEFAULT 0,
    cout_estime FLOAT NOT NULL DEFAULT 0,
    actions JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_usage_stats_user_id
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    UNIQUE(user_id, date_jour)
);

CREATE INDEX idx_usage_stats_user_id ON usage_stats(user_id);
CREATE INDEX idx_usage_stats_date_jour ON usage_stats(date_jour);
CREATE INDEX idx_usage_stats_user_date ON usage_stats(user_id, date_jour);

-- ============================================================
-- FONCTIONS & TRIGGERS : updated_at automatique
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_abonnements_updated_at
    BEFORE UPDATE ON abonnements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_societes_updated_at
    BEFORE UPDATE ON societes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_user_societes_updated_at
    BEFORE UPDATE ON user_societes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_user_memory_updated_at
    BEFORE UPDATE ON user_memory
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_apprentissage_updated_at
    BEFORE UPDATE ON apprentissage
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_sessions_coaching_updated_at
    BEFORE UPDATE ON sessions_coaching
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_parcours_updated_at
    BEFORE UPDATE ON parcours
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_user_parcours_updated_at
    BEFORE UPDATE ON user_parcours
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_defis_updated_at
    BEFORE UPDATE ON defis
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_user_defis_updated_at
    BEFORE UPDATE ON user_defis
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_forum_posts_updated_at
    BEFORE UPDATE ON forum_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_referrals_updated_at
    BEFORE UPDATE ON referrals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_rag_contributions_updated_at
    BEFORE UPDATE ON rag_contributions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_usage_stats_updated_at
    BEFORE UPDATE ON usage_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- COMMENTAIRES DE DOCUMENTATION
-- ============================================================

COMMENT ON TABLE users IS 'Utilisateurs de la plateforme Upline.ai';
COMMENT ON TABLE abonnements IS 'Abonnements et plans de paiement des utilisateurs';
COMMENT ON TABLE societes IS 'Entreprises MLM partenaires';
COMMENT ON TABLE user_societes IS 'Liaison utilisateurs-societes avec métriques MLM';
COMMENT ON TABLE user_memory IS 'Mémoire contextuelle de l IA par utilisateur';
COMMENT ON TABLE apprentissage IS 'Modules de formation et contenus éducatifs';
COMMENT ON TABLE sessions_coaching IS 'Sessions de coaching IA ou humain';
COMMENT ON TABLE parcours IS 'Parcours de formation structurés';
COMMENT ON TABLE user_parcours IS 'Progression des utilisateurs dans les parcours';
COMMENT ON TABLE badges IS 'Badges et récompenses disponibles';
COMMENT ON TABLE user_badges IS 'Badges obtenus par les utilisateurs';
COMMENT ON TABLE defis IS 'Défis et missions proposés aux utilisateurs';
COMMENT ON TABLE user_defis IS 'Participation et résultats des défis';
COMMENT ON TABLE forum_posts IS 'Publications et discussions du forum communautaire';
COMMENT ON TABLE referrals IS 'Parrainages et programme d affiliation';
COMMENT ON TABLE rag_contributions IS 'Contributions au système RAG (Retrieval-Augmented Generation)';
COMMENT ON TABLE usage_stats IS 'Statistiques d utilisation quotidiennes par utilisateur';
