import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { auth } from '@/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    const { prenom, nom, telephone, ville, pays, bio } = await req.json()
    await pool.query(
      `UPDATE users SET prenom=COALESCE($1,prenom), nom=COALESCE($2,nom), telephone=COALESCE($3,telephone), ville=COALESCE($4,ville), pays=COALESCE($5,pays), bio=COALESCE($6,bio), updated_at=NOW() WHERE id=$7`,
      [prenom, nom, telephone, ville, pays, bio, session.user.id]
    )
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
