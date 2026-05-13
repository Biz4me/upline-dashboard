import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { auth } from '@/auth'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    const user = await pool.query(
      'SELECT id, email, prenom, nom, username, telephone, ville, pays, bio, created_at FROM users WHERE id = $1',
      [session.user.id]
    )
    const memory = await pool.query(
      "SELECT cle, valeur FROM user_memory WHERE user_id = $1 AND cle IN ('profil', 'profil_detail')",
      [session.user.id]
    )
    const memoryData: Record<string, any> = {}
    for (const row of memory.rows) memoryData[row.cle] = row.valeur
    return NextResponse.json({ user: user.rows[0], memory: memoryData })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
