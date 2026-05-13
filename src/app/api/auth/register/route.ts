import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, password, prenom, nom, username } = await req.json()
    if (!email || !password || !prenom || !nom || !username) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }
    if (username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json({ error: 'Username invalide (3-20 caractères, alphanumérique et underscore uniquement)' }, { status: 400 })
    }
    const emailExists = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (emailExists.rows.length > 0) {
      return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 409 })
    }
    const usernameExists = await pool.query('SELECT id FROM users WHERE username = $1', [username])
    if (usernameExists.rows.length > 0) {
      return NextResponse.json({ error: 'Username déjà utilisé' }, { status: 409 })
    }
    const hash = await bcrypt.hash(password, 12)
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, prenom, nom, username, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id, email, prenom, nom, username',
      [email, hash, prenom, nom, username]
    )
    return NextResponse.json({ user: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
