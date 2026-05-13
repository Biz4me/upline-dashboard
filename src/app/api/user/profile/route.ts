import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { auth } from '@/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { prenom, nom, niveau, objectif, societe } = await req.json()

    await pool.query(
      `UPDATE users SET prenom = COALESCE(NULLIF($1,''), prenom), nom = COALESCE(NULLIF($2,''), nom), updated_at = NOW() WHERE id = $3`,
      [prenom, nom, session.user.id]
    )

    if (niveau || objectif) {
      await pool.query(
        `INSERT INTO user_memory (user_id, cle, valeur, categorie, importance)
         VALUES ($1, 'profil_detail', $2::jsonb, 'identite', 9)
         ON CONFLICT (user_id, cle) DO UPDATE SET valeur = $2::jsonb, updated_at = NOW()`,
        [session.user.id, JSON.stringify({ niveau, objectif, societe })]
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
