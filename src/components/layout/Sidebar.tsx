'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/context/SidebarContext'
import {
  Home, Rocket, BarChart2, MessageCircle, Trophy,
  Share2, ChevronLeft, ChevronRight, Users, X
} from 'lucide-react'
import { useSession } from 'next-auth/react'

const navItems = [
  { href: '/', icon: Home, label: 'Accueil' },
  { href: '/formation', icon: Rocket, label: 'Formation' },
  { href: '/business', icon: BarChart2, label: 'Business' },
  { href: '/chat', icon: MessageCircle, label: 'Chat Atlas' },
  { href: '/communaute', icon: Users, label: 'Communauté' },
  { href: '/achievements', icon: Trophy, label: 'Succès' },
  { href: '/parrainage', icon: Share2, label: 'Parrainage' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar()
  const { data: session } = useSession()
  const user = session?.user
  const initials = user?.name ? user.name.slice(0, 1).toUpperCase() : 'U'

  const sidebarContent = (
    <div
      style={{
        width: collapsed ? 64 : 220,
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--sidebar-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'width 0.2s ease',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '20px 0' : '20px 16px',
          borderBottom: '1px solid var(--sidebar-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          minHeight: 64,
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
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
                background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: -0.5,
                whiteSpace: 'nowrap',
              }}
            >
              Atline.ai
            </span>
          )}
        </div>
        {/* Bouton fermer sur mobile */}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            style={{ background: 'transparent', border: 'none', color: 'var(--sidebar-text)', cursor: 'pointer', padding: 4, flexShrink: 0 }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? 0 : 12,
                padding: collapsed ? '10px 0' : '10px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 10,
                background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                border: isActive ? '1.5px solid var(--sidebar-active-border)' : '1.5px solid transparent',
                color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                textDecoration: 'none',
                fontWeight: isActive ? 700 : 500,
                fontSize: 13,
                transition: 'all 0.15s',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
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

      {/* Footer */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid var(--sidebar-border)', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Link
          href="/profil"
          onClick={() => setMobileOpen(false)}
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
              background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
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

        {/* Toggle collapse — desktop/tablette uniquement */}
        <button
          onClick={() => setCollapsed(!collapsed)}
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
    </div>
  )

  return (
    <>
      {/* Desktop + Tablette : sidebar normale */}
      <div className="hidden md:flex h-screen" style={{ position: 'sticky', top: 0, zIndex: 30 }}>
        {sidebarContent}
      </div>

      {/* Mobile : overlay */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 40,
              backdropFilter: 'blur(2px)',
            }}
          />
          {/* Sidebar panel */}
          <div
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              width: 260,
              zIndex: 50,
              animation: 'slideInLeft 0.2s ease',
            }}
          >
            <style>{`
              @keyframes slideInLeft {
                from { transform: translateX(-100%); }
                to { transform: translateX(0); }
              }
            `}</style>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Force expanded on mobile */}
              <div
                style={{
                  width: 260,
                  background: 'var(--sidebar-bg)',
                  borderRight: '1px solid var(--sidebar-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                {/* Logo mobile */}
                <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--sidebar-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 64 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(109,94,245,0.35)' }}>
                      <span style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>A</span>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Atline.ai
                    </span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--sidebar-text)', cursor: 'pointer', padding: 6 }}>
                    <X size={20} />
                  </button>
                </div>
                {/* Nav mobile */}
                <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
                  {navItems.map(({ href, icon: Icon, label }) => {
                    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '12px 14px', borderRadius: 10,
                          background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                          border: isActive ? '1.5px solid var(--sidebar-active-border)' : '1.5px solid transparent',
                          color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                          textDecoration: 'none', fontWeight: isActive ? 700 : 500,
                          fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.5px',
                        }}
                      >
                        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                        {label}
                      </Link>
                    )
                  })}
                </nav>
                {/* Footer mobile */}
                <div style={{ padding: '12px 8px', borderTop: '1px solid var(--sidebar-border)' }}>
                  <Link href="/profil" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, textDecoration: 'none' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', flexShrink: 0 }}>
                      {initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{user?.name || 'Profil'}</div>
                      <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>✦ Premium</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
