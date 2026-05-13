'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, GraduationCap, Briefcase, Users, Trophy, GitFork, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Accueil' },
  { href: '/formation', icon: GraduationCap, label: 'Formation' },
  { href: '/business', icon: Briefcase, label: 'Business' },
  { href: '/communaute', icon: Users, label: 'Communauté' },
  { href: '/achievements', icon: Trophy, label: 'Succès' },
  { href: '/parrainage', icon: GitFork, label: 'Parrainage' },
  { href: '/profil', icon: User, label: 'Profil' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('sidebar')
    if (stored === 'collapsed') setCollapsed(true)
  }, [])

  const toggle = () => {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar', next ? 'collapsed' : 'open')
  }

  return (
    <aside
      style={{
        width: collapsed ? '64px' : '224px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
        transition: 'width 0.25s ease',
        position: 'relative',
        flexShrink: 0,
      }}
      className="hidden md:flex flex-col h-screen sticky top-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 overflow-hidden">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: 'var(--gold)', color: 'var(--bg)' }}>
          A
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-bold text-sm whitespace-nowrap" style={{ fontFamily: 'var(--font-title)', color: 'var(--text)' }}>Upline.ai</div>
            <div className="text-xs whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>Coach Atlas</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <div key={href} className="relative group">
              <Link
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
                style={{
                  background: active ? 'var(--gold-bg)' : 'transparent',
                  color: active ? 'var(--gold)' : 'var(--text-secondary)',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                }}
              >
                <Icon size={18} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                {!collapsed && (
                  <span className="text-sm font-medium whitespace-nowrap" style={{ fontFamily: 'var(--font-body)' }}>
                    {label}
                  </span>
                )}
              </Link>
              {collapsed && (
                <div className="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
                  style={{ background: 'var(--text)', color: 'var(--bg)' }}>
                  {label}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Avatar */}
      <div
        className="flex items-center gap-3 px-3 py-4 cursor-pointer overflow-hidden"
        style={{ borderTop: '1px solid var(--border)', justifyContent: collapsed ? 'center' : 'flex-start' }}
        onClick={() => router.push('/profil')}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: 'var(--gold)', color: 'var(--bg)' }}>
          P
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>Patrice</div>
            <div className="text-xs truncate" style={{ color: 'var(--gold)' }}>⭐ Premium</div>
          </div>
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-colors"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}
