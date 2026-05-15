'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/context/SidebarContext'
import {
  Home, Rocket, BarChart2, MessageCircle, Trophy, Share2,
  ChevronLeft, ChevronRight, LogOut, Settings
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

const navItems = [
  { href: '/', icon: Home, label: 'Accueil' },
  { href: '/formation', icon: Rocket, label: 'Formation' },
  { href: '/business', icon: BarChart2, label: 'Business' },
  { href: '/communaute', icon: MessageCircle, label: 'Communauté' },
  { href: '/achievements', icon: Trophy, label: 'Succès' },
  { href: '/parrainage', icon: Share2, label: 'Parrainage' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { collapsed, toggle } = useSidebar()
  const { data: session } = useSession()

  const user = session?.user
  const initials = user?.name ? user.name.slice(0, 1).toUpperCase() : 'U'

  return (
    <aside
      style={{
        width: collapsed ? 64 : 220,
        minWidth: collapsed ? 64 : 220,
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--sidebar-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        transition: 'width 0.2s ease, min-width 0.2s ease',
        zIndex: 30,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '20px 0' : '20px 16px',
          borderBottom: '1px solid var(--sidebar-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: 10,
          minHeight: 64,
        }}
      >
        {/* Icône logo gradient */}
        <div
          style={{
            width: 36,
            height: 36,
            background: 'var(--gradient-primary)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(109,94,245,0.35)',
          }}
        >
          <span style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>A</span>
        </div>
        {!collapsed && (
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: -0.5,
              fontFamily: 'var(--font-title)',
            }}
          >
            Atline.ai
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? 0 : 12,
                padding: collapsed ? '10px 0' : '10px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 10,
                background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                border: isActive ? `1.5px solid var(--sidebar-active-border)` : '1.5px solid transparent',
                color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                textDecoration: 'none',
                fontWeight: isActive ? 700 : 500,
                fontSize: 13,
                transition: 'all 0.15s',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--primary-muted)'
                  e.currentTarget.style.color = 'var(--primary)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--sidebar-text)'
                }
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: isActive ? 'var(--primary-muted)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer sidebar */}
      <div
        style={{
          padding: '12px 8px',
          borderTop: '1px solid var(--sidebar-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {/* Avatar + nom */}
        <Link
          href="/profil"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: collapsed ? 0 : 10,
            padding: collapsed ? '8px 0' : '8px 10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: 10,
            textDecoration: 'none',
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-muted)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 14,
              color: 'white',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(109,94,245,0.3)',
            }}
          >
            {initials}
          </div>
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.name || 'Profil'}
              </div>
              <div style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                ✦ Premium
              </div>
            </div>
          )}
        </Link>

        {/* Toggle collapse */}
        <button
          onClick={toggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            borderRadius: 10,
            background: 'transparent',
            border: '1px solid var(--sidebar-border)',
            color: 'var(--sidebar-text)',
            cursor: 'pointer',
            transition: 'all 0.15s',
            width: '100%',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--primary-muted)'
            e.currentTarget.style.color = 'var(--primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--sidebar-text)'
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  )
}
