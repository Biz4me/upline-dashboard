'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSidebar } from '@/context/SidebarContext'
import {
  Home, Sparkles, Rocket, Users, CalendarDays,
  TrendingUp, ChevronLeft, ChevronRight, X,
  User, Trophy, Settings, CreditCard, ArrowLeft, LogOut
} from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

const navItems = [
  { href: '/', icon: Home, label: 'Accueil' },
  { href: '/atlas', icon: Sparkles, label: 'Atlas' },
  { href: '/formation', icon: Rocket, label: 'Formation' },
  { href: '/reseau', icon: Users, label: 'Réseau' },
  { href: '/agenda', icon: CalendarDays, label: 'Agenda' },
  { href: '/croissance', icon: TrendingUp, label: 'Croissance' },
]

const profileTabs = [
  { id: 'profil', icon: User, label: 'Mon Profil' },
  { id: 'mlm', icon: Trophy, label: 'Mon MLM' },
  { id: 'progression', icon: Sparkles, label: 'Ma Progression' },
  { id: 'parametres', icon: Settings, label: 'Paramètres' },
  { id: 'compte', icon: CreditCard, label: 'Mon Compte' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen, isMobile, profileMode, setProfileMode, profileTab, setProfileTab } = useSidebar()
  const { data: session } = useSession()
  const user = session?.user
  const initials = user?.name ? user.name.slice(0, 1).toUpperCase() : 'U'

  const handleAvatarClick = () => {
    setProfileMode(true)
    router.push('/profil')
  }

  const handleBack = () => {
    setProfileMode(false)
  }

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

        {profileMode ? (
          /* ===== MODE PROFIL ===== */
          <>
            {/* Header profil */}
            <div style={{
              padding: isExpanded ? '16px 16px' : '16px 0',
              borderBottom: '1px solid var(--sidebar-border)',
              minHeight: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: isExpanded ? 'flex-start' : 'center',
            }}>
              <button
                onClick={handleBack}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'transparent', border: 'none',
                  color: 'var(--sidebar-text)', cursor: 'pointer',
                  fontSize: 13, fontWeight: 700, padding: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--sidebar-text)'}
              >
                <ArrowLeft size={18} />
                {isExpanded && 'Retour'}
              </button>
            </div>

            {/* Avatar mini */}
            {isExpanded && (
              <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--sidebar-border)', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: 'white', margin: '0 auto 8px', boxShadow: '0 4px 12px rgba(109,94,245,0.3)' }}>
                  {initials}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{user?.name || 'Profil'}</div>
                <div style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>✦ Premium</div>
              </div>
            )}

            {/* Menu profil */}
            <nav style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {profileTabs.map(({ id, icon: Icon, label }) => {
                const isActive = profileTab === id
                return (
                  <button
                    key={id}
                    onClick={() => setProfileTab(id)}
                    style={{
                      display: 'flex', alignItems: 'center',
                      gap: isExpanded ? 10 : 0,
                      padding: isExpanded ? '10px 12px' : '10px 0',
                      justifyContent: isExpanded ? 'flex-start' : 'center',
                      borderRadius: 10, border: 'none',
                      background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                      borderLeft: isActive ? '3px solid var(--sidebar-active-border)' : '3px solid transparent',
                      color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                      fontSize: 13, fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer', width: '100%',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--primary-muted)'; e.currentTarget.style.color = 'var(--primary)' } }}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--sidebar-text)' } }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: isActive ? 'var(--primary-muted)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    {isExpanded && <span>{label}</span>}
                  </button>
                )
              })}
            </nav>

            {/* Déconnexion */}
            <div style={{ padding: '10px 8px', borderTop: '1px solid var(--sidebar-border)' }}>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                style={{
                  display: 'flex', alignItems: 'center',
                  gap: isExpanded ? 10 : 0,
                  padding: isExpanded ? '10px 12px' : '10px 0',
                  justifyContent: isExpanded ? 'flex-start' : 'center',
                  borderRadius: 10, border: 'none',
                  background: 'transparent', color: '#EF4444',
                  fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', width: '100%',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <LogOut size={15} />
                </div>
                {isExpanded && 'Se déconnecter'}
              </button>
            </div>
          </>
        ) : (
          /* ===== MODE NAVIGATION CLASSIQUE ===== */
          <>
            {/* Logo */}
            <div style={{
              padding: isExpanded ? '20px 16px' : '20px 0',
              borderBottom: '1px solid var(--sidebar-border)',
              display: 'flex', alignItems: 'center',
              justifyContent: isExpanded ? 'flex-start' : 'center',
              minHeight: 64, gap: 10,
            }}>
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(109,94,245,0.35)' }}>
                <span style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>A</span>
              </div>
              {isExpanded && (
                <span style={{ fontSize: 18, fontWeight: 800, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: -0.5, whiteSpace: 'nowrap' }}>
                  Atline.ai
                </span>
              )}
              {forceExpanded && (
                <button onClick={() => setMobileOpen(false)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--sidebar-text)', cursor: 'pointer', padding: 4, flexShrink: 0 }}>
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
                      display: 'flex', alignItems: 'center',
                      gap: isExpanded ? 12 : 0,
                      padding: isExpanded ? '10px 12px' : '10px 0',
                      justifyContent: isExpanded ? 'flex-start' : 'center',
                      borderRadius: 10,
                      background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                      border: isActive ? '1.5px solid var(--sidebar-active-border)' : '1.5px solid transparent',
                      color: isActive ? 'var(--sidebar-active-text)' : 'var(--sidebar-text)',
                      textDecoration: 'none', fontWeight: isActive ? 700 : 500,
                      fontSize: 13, transition: 'all 0.15s',
                      textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--primary-muted)'; e.currentTarget.style.color = 'var(--primary)' } }}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--sidebar-text)' } }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: isActive ? 'var(--primary-muted)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    {isExpanded && <span>{label}</span>}
                  </Link>
                )
              })}
            </nav>

            {/* Footer — Avatar cliquable */}
            <div style={{ padding: '12px 8px', borderTop: '1px solid var(--sidebar-border)' }}>
              <button
                onClick={handleAvatarClick}
                title={!isExpanded ? 'Mon Profil' : undefined}
                style={{
                  display: 'flex', alignItems: 'center',
                  gap: isExpanded ? 10 : 0,
                  padding: isExpanded ? '8px 10px' : '8px 0',
                  justifyContent: isExpanded ? 'flex-start' : 'center',
                  borderRadius: 10, border: 'none',
                  background: 'transparent', cursor: 'pointer',
                  width: '100%', transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-muted)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: 'white', flexShrink: 0, boxShadow: '0 2px 8px rgba(109,94,245,0.3)' }}>
                  {initials}
                </div>
                {isExpanded && (
                  <div style={{ minWidth: 0, textAlign: 'left' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user?.name || 'Profil'}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                      ✦ Premium
                    </div>
                  </div>
                )}
              </button>

              {/* Bouton collapse */}
              {!forceExpanded && (
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', borderRadius: 10, background: 'transparent', border: '1px solid var(--sidebar-border)', color: 'var(--sidebar-text)', cursor: 'pointer', transition: 'all 0.15s', width: '100%', marginTop: 6 }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-muted)'; e.currentTarget.style.color = 'var(--primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--sidebar-text)' }}
                >
                  {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Desktop + Tablette */}
      <div style={{ display: isMobile ? 'none' : 'flex', position: 'sticky', top: 0, height: '100vh', zIndex: 30 }}>
        <NavContent />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40, backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 260, zIndex: 50, animation: 'slideInLeft 0.2s ease' }}>
            <style>{`@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
            <NavContent forceExpanded />
          </div>
        </>
      )}
    </>
  )
}
