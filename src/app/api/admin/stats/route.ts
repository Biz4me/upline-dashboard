import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { auth } from '@/auth'

export async function GET() {
  try {
    const session = await auth()
    if (session?.user?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const [totalUsers, newToday, sessions, memory] = await Promise.all([
      pool.query('SELECT COUNT(*) as count, COUNT(CASE WHEN role = $1 THEN 1 END) as admins FROM users', ['admin']),
      pool.query("SELECT COUNT(*) as count FROM users WHERE created_at > NOW() - INTERVAL '24 hours'"),
      pool.query('SELECT COUNT(*) as count FROM sessions_coaching'),
      pool.query('SELECT COUNT(*) as count FROM user_memory'),
    ])

    const usersByDay = await pool.query(`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM users
      WHERE created_at > NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `)

    return NextResponse.json({
      totalUsers: parseInt(totalUsers.rows[0].count),
      newToday: parseInt(newToday.rows[0].count),
      totalSessions: parseInt(sessions.rows[0].count),
      memoryEntries: parseInt(memory.rows[0].count),
      usersByDay: usersByDay.rows,
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
