import { NextResponse } from 'next/server'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({
  host: '172.16.4.2',
  port: 5432,
  database: 'ZhnKpovqAtFoNZtW',
  user: 'OeXA5Cqvw7ehK7yY',
  password: process.env.DB_PASSWORD,
})

export async function POST(req: Request) {
  try {
    const { email, password, full_name } = await req.json()
    if (!email || !password || !full_name) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (exists.rows.length > 0) {
      return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 409 })
    }
    const hash = await bcrypt.hash(password, 12)
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, full_name, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, email, full_name',
      [email, hash, full_name]
    )
    return NextResponse.json({ user: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
