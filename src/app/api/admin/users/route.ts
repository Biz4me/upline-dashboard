import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { auth } from '@/auth'

export async function GET() {
  try {
    const session = await auth()
    if (session?.user?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const users = await pool.query(`
      SELECT u.id, u.email, u.prenom, u.nom, u.username, u.role, u.is_active, u.created_at,
             um.valeur->>'societe' as societe,
             um2.valeur->>'niveau' as niveau
      FROM users u
      LEFT JOIN user_memory um ON um.user_id = u.id AND um.cle = 'profil'
      LEFT JOIN user_memory um2 ON um2.user_id = u.id AND um2.cle = 'profil_detail'
      ORDER BY u.created_at DESC
      LIMIT 100
    `)
    return NextResponse.json({ users: users.rows })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
