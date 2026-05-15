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
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen, isMobile } = useSidebar()
  const { data: session } = useSession()
  const user = session?.user
  const initials = user?.name ? user.name.slice(0, 1).toUpperCase() : 'U'

  const NavContent = ({ forceExpanded = false }: { forceExpanded?: boolean }) => {
    const isExpanded = forceExpanded || !collapsed
    return (
      <div style={{
        width: isExpanded ? 220 : 64,
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--sidebar-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'width 0.2s ease',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
      }}>
        {/* Logo */}
        <div style={{
          padding: isExpanded ? '20px 16px' : '20px 0',
          borderBottom: '1px solid var(--sidebar-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isExpanded ? 'flex-start' : 'center',
          minHeight: 64,
          gap: 10,
        }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(109,94,245,0.35)',
          }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>A</span>
          </div>
          {isExpanded && (
            <span style={{
              fontSize: 18, fontWeight: 800,
              background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: -0.5,
              whiteSpace: 'nowrap',
            }}>
              Atline.ai
            </span>
          )}
          {/* Bouton X sur mobile */}
          {forceExpanded && (
            <button
              onClick={() => setMobileOpen(false)}
              style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--sidebar-text)', cursor: 'pointer', padding: 4, flexShrink: 0 }}
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
                title={!isExpanded ? label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isExpanded ? 12 : 0,
                  padding: isExpanded ? '10px 12px' : '10px 0',
                  justifyContent: isExpanded ? 'flex-start' : 'center',
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
                <div style={{
                  width: 28, height: 28,
                  borderRadius: 8,
                  background: isActive ? 'var(--primary-muted)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                {isExpanded && <span>{label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--sidebar-border)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Avatar */}
          <Link
            href="/profil"
            onClick={() => setMobileOpen(false)}
            title={!isExpanded ? 'Profil' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isExpanded ? 10 : 0,
              padding: isExpanded ? '8px 10px' : '8px 0',
              justifyContent: isExpanded ? 'flex-start' : 'center',
              borderRadius: 10,
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-muted)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{
              width: 34, height: 34,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 14, color: 'white',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(109,94,245,0.3)',
            }}>
              {initials}
            </div>
            {isExpanded && (
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
        </div>

        {/* Flèche collapse — desktop/tablette uniquement, sur le bord droit */}
        {!forceExpanded && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              position: 'absolute',
              right: -12,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--sidebar-border)',
              color: 'var(--sidebar-text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#6D5EF5'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.borderColor = '#6D5EF5'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--bg-card)'
              e.currentTarget.style.color = 'var(--sidebar-text)'
              e.currentTarget.style.borderColor = 'var(--sidebar-border)'
            }}
          >
            {collapsed ? <ChevronRight size={12} strokeWidth={2.5} /> : <ChevronLeft size={12} strokeWidth={2.5} />}
          </button>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Desktop + Tablette : sidebar sticky */}
      <div style={{ display: isMobile ? 'none' : 'flex', position: 'sticky', top: 0, height: '100vh', zIndex: 30 }}>
        <NavContent />
      </div>

      {/* Mobile : overlay */}
      {mobileOpen && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 40,
              backdropFilter: 'blur(2px)',
            }}
          />
          <div style={{
            position: 'fixed', left: 0, top: 0, bottom: 0,
            width: 260, zIndex: 50,
            animation: 'slideInLeft 0.2s ease',
          }}>
            <style>{`@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
            <NavContent forceExpanded />
          </div>
        </>
      )}
    </>
  )
}
