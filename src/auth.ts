/** @type {import('next-auth').NextAuthConfig} */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({
  host: process.env.DB_HOST || '172.16.4.2',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ZhnKpovqAtFoNZtW',
  user: process.env.DB_USER || 'OeXA5Cqvw7ehK7yY',
  password: process.env.DB_PASSWORD,
  ssl: false,
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [credentials.email]
          )
          const user = result.rows[0]
          if (!user) return null
          const valid = await bcrypt.compare(credentials.password as string, user.password_hash)
          if (!valid) return null
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.full_name,
            image: null,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id as string
      return session
    },
  },
})
