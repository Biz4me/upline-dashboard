/** @type {import('next-auth').NextAuthConfig} */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { pool } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email ou pseudo', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const result = await pool.query(
            'SELECT id, email, password_hash, prenom, nom, username, role FROM users WHERE LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($1)',
            [credentials.email]
          )
          const user = result.rows[0]
          if (!user) return null
          const valid = await bcrypt.compare(credentials.password as string, user.password_hash)
          if (!valid) return null
          return {
            id: user.id.toString(),
            email: user.email,
            name: `${user.prenom || ''} ${user.nom || ''}`.trim() || user.username,
            username: user.username,
            role: user.role,
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
      if (user) { token.id = user.id; token.role = user.role }
      return token
    },
    async session({ session, token }) {
      if (token) { session.user.id = token.id as string; session.user.role = token.role as string }
      return session
    },
  },
})
