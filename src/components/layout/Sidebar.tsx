'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSidebar } from '@/context/SidebarContext'
import {
  Home, Sparkles, Rocket, Users, CalendarDays,
  TrendingUp, ChevronLeft, ChevronRight, X,
  User, Trophy, Settings, CreditCard, ArrowLeft, LogOut,
  MoreHorizontal, Globe, Share2, Bell, Check
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
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

  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

            <div ref={menuRef} style={{ padding: '8px', borderTop: '1px solid var(--sidebar-border)', position: 'relative' }}>

              {/* Menu déroulant — s'ouvre vers le haut */}
              {menuOpen && (
                <div style={{
                  position: 'absolute', bottom: '100%', left: 8, right: 8,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 14, boxShadow: '0 -8px 32px rgba(0,0,0,0.15)',
                  zIndex: 50, overflow: 'hidden', marginBottom: 6,
                }}>
                  {/* Infos utilisateur */}
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{user?.name || 'Utilisateur'}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{user?.email || ''}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(109,94,245,0.1)', color: '#a78bfa', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                      ✦ Coach · $19/mois
                    </div>
                  </div>

                  {/* Actions principales */}
                  <div style={{ padding: '6px' }}>
                    {[
                      { icon: Settings, label: 'Paramètres', shortcut: '⌘,', action: () => { setMenuOpen(false); setProfileMode(true); setProfileTab('parametres'); router.push('/profil') } },
                    ].map((item, i) => {
                      const Icon = item.icon
                      return (
                        <button key={i} onClick={item.action} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, border: 'none', background: 'transparent', color: 'var(--text)', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-bg)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <Icon size={15} color="var(--text-secondary)" />
                          <span style={{ flex: 1 }}>{item.label}</span>
                          {item.shortcut && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.shortcut}</span>}
                        </button>
                      )
                    })}

                    {/* Langue avec sous-menu */}
                    <div style={{ position: 'relative' }}>
                      <button
                        onClick={() => setLangOpen(!langOpen)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, border: 'none', background: langOpen ? 'var(--primary-bg)' : 'transparent', color: 'var(--text)', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-bg)'}
                        onMouseLeave={e => { if (!langOpen) e.currentTarget.style.background = 'transparent' }}
                      >
                        <Globe size={15} color="var(--text-secondary)" />
                        <span style={{ flex: 1 }}>Langue</span>
                        <ChevronRight size={14} color="var(--text-muted)" />
                      </button>
                      {langOpen && (
                        <div style={{ position: 'absolute', left: '100%', bottom: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 60, overflow: 'hidden', width: 160, marginLeft: 4 }}>
                          {[
                            { flag: '🇫🇷', label: 'Français', active: true },
                            { flag: '🇬🇧', label: 'English', active: false },
                            { flag: '🇪🇸', label: 'Español', active: false },
                          ].map((lang, i) => (
                            <button key={i} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', border: 'none', background: lang.active ? 'rgba(109,94,245,0.08)' : 'transparent', color: lang.active ? '#6D5EF5' : 'var(--text)', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
                              onMouseEnter={e => { if (!lang.active) e.currentTarget.style.background = 'var(--primary-bg)' }}
                              onMouseLeave={e => { if (!lang.active) e.currentTarget.style.background = 'transparent' }}
                            >
                              <span style={{ fontSize: 16 }}>{lang.flag}</span>
                              <span style={{ flex: 1 }}>{lang.label}</span>
                              {lang.active && <Check size={14} color="#6D5EF5" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => { setMenuOpen(false); setProfileMode(true); setProfileTab('compte'); router.push('/profil') }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, border: 'none', background: 'transparent', color: 'var(--text)', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-bg)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <Bell size={15} color="var(--text-secondary)" />
                      <span>Notifications</span>
                    </button>
                  </div>

                  {/* Séparateur */}
                  <div style={{ borderTop: '1px solid var(--border)', padding: '6px' }}>
                    <button
                      onClick={() => { setMenuOpen(false); setProfileMode(true); setProfileTab('compte'); router.push('/profil') }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, border: 'none', background: 'transparent', color: 'var(--text)', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-bg)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <TrendingUp size={15} color="var(--text-secondary)" />
                      <span>Passer Pro</span>
                    </button>
                    <button
                      onClick={() => { setMenuOpen(false); router.push('/croissance') }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, border: 'none', background: 'transparent', color: 'var(--text)', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-bg)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <Share2 size={15} color="var(--text-secondary)" />
                      <span>Parrainer un ami</span>
                    </button>
                  </div>

                  {/* Déconnexion */}
                  <div style={{ borderTop: '1px solid var(--border)', padding: '6px' }}>
                    <button
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, border: 'none', background: 'transparent', color: '#EF4444', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <LogOut size={15} />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Bouton avatar — ouvre le menu */}
              <button
                onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false) }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  gap: isExpanded ? 10 : 0,
                  padding: isExpanded ? '8px 10px' : '8px 0',
                  justifyContent: isExpanded ? 'flex-start' : 'center',
                  borderRadius: 10, border: 'none',
                  background: menuOpen ? 'var(--primary-bg)' : 'transparent',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (!menuOpen) e.currentTarget.style.background = 'var(--primary-muted)' }}
                onMouseLeave={e => { if (!menuOpen) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: 'white', flexShrink: 0, boxShadow: '0 2px 8px rgba(109,94,245,0.3)' }}>
                  {initials}
                </div>
                {isExpanded && (
                  <>
                    <div style={{ minWidth: 0, flex: 1, textAlign: 'left' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {user?.name || 'Profil'}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                        ✦ Premium
                      </div>
                    </div>
                    <MoreHorizontal size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                  </>
                )}
              </button>

              {/* Bouton collapse */}
              {!forceExpanded && (
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: 10, background: 'transparent', border: '1px solid var(--sidebar-border)', color: 'var(--sidebar-text)', cursor: 'pointer', width: '100%', marginTop: 4 }}
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
