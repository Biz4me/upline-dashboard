import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST || '172.16.4.2',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ZhnKpovqAtFoNZtW',
  user: process.env.DB_USER || 'OeXA5Cqvw7ehK7yY',
  password: process.env.DB_PASSWORD,
  ssl: false,
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const userId = session.user.id
    const body = await req.json()
    const {
      societe,
      autresSociete,
      niveau,
      objectifs,
      experience,
      telephone,
      pays,
      ville,
    } = body

    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      // 1. Met à jour les champs de base de l'utilisateur
      await client.query(
        `UPDATE users
         SET telephone = COALESCE($1, telephone),
             pays = COALESCE($2, pays),
             ville = COALESCE($3, ville),
             updated_at = NOW()
         WHERE id = $4`,
        [telephone || null, pays || null, ville || null, userId]
      )

      // 2. Sauvegarde la société dans user_memory
      const societeFinale = societe === 'Autres' && autresSociete ? autresSociete : societe
      await client.query(
        `INSERT INTO user_memory (user_id, cle, valeur, categorie, importance)
         VALUES ($1, 'onboarding_societe', to_jsonb($2), 'onboarding', 8)
         ON CONFLICT (user_id, cle) DO UPDATE SET valeur = to_jsonb($2), updated_at = NOW()`,
        [userId, societeFinale]
      )

      // 3. Sauvegarde le niveau
      await client.query(
        `INSERT INTO user_memory (user_id, cle, valeur, categorie, importance)
         VALUES ($1, 'onboarding_niveau', to_jsonb($2), 'onboarding', 8)
         ON CONFLICT (user_id, cle) DO UPDATE SET valeur = to_jsonb($2), updated_at = NOW()`,
        [userId, niveau]
      )

      // 4. Sauvegarde les objectifs
      if (objectifs && objectifs.length > 0) {
        await client.query(
          `INSERT INTO user_memory (user_id, cle, valeur, categorie, importance)
           VALUES ($1, 'onboarding_objectifs', to_jsonb($2), 'onboarding', 7)
           ON CONFLICT (user_id, cle) DO UPDATE SET valeur = to_jsonb($2), updated_at = NOW()`,
          [userId, JSON.stringify(objectifs)]
        )
      }

      // 5. Sauvegarde l'expérience
      if (experience) {
        await client.query(
          `INSERT INTO user_memory (user_id, cle, valeur, categorie, importance)
           VALUES ($1, 'onboarding_experience', to_jsonb($2), 'onboarding', 6)
           ON CONFLICT (user_id, cle) DO UPDATE SET valeur = to_jsonb($2), updated_at = NOW()`,
          [userId, experience]
        )
      }

      // 6. Marque l'onboarding comme complété
      await client.query(
        `INSERT INTO user_memory (user_id, cle, valeur, categorie, importance)
         VALUES ($1, 'onboarding_completed', to_jsonb(true), 'onboarding', 10)
         ON CONFLICT (user_id, cle) DO UPDATE SET valeur = to_jsonb(true), updated_at = NOW()`,
        [userId]
      )

      await client.query('COMMIT')

      return NextResponse.json({ success: true }, { status: 200 })
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Onboarding API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
