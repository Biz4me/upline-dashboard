'use client'
import { SessionProvider, signOut } from 'next-auth/react'
import { SidebarProvider, useSidebar } from '@/context/SidebarContext'
import Sidebar from '@/components/layout/Sidebar'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { Bell, LogOut, User, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'

function DashboardInner({ children }: { children: React.ReactNode }) {
  const { mobileOpen, setMobileOpen, isMobile } = useSidebar()
  const router = useRouter()
  const { data: session } = useSession()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const initials = session?.user?.name ? session.user.name.slice(0, 1).toUpperCase() : 'U'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-page)' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', minWidth: 0 }}>

        {/* Header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '0 20px',
          height: 64,
          flexShrink: 0,
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-page)',
        }}>

          {/* Hamburger — mobile uniquement via JS */}
          {isMobile && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--primary-bg)', border: '1px solid rgba(109,94,245,0.2)', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Menu size={18} />
            </button>
          )}

          {/* Logo centré — mobile uniquement via JS */}
          {isMobile && (
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 800, fontSize: 13 }}>A</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Atline.ai</span>
            </div>
          )}

          {/* Spacer desktop */}
          <div style={{ flex: 1 }} />

          {/* Actions — toujours visibles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ThemeToggle />

            {/* Cloche */}
            <button style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--primary-bg)',
              border: '1px solid rgba(109,94,245,0.2)',
              color: '#a78bfa',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <Bell size={16} strokeWidth={1.8} />
            </button>

            {/* Avatar dropdown */}
            <div ref={menuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
                  border: 'none', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(109,94,245,0.35)',
                }}
              >
                {initials}
              </button>

              {showMenu && (
                <div style={{
                  position: 'absolute', right: 0, top: 44,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                  zIndex: 50,
                  minWidth: 180,
                  padding: 6,
                }}>
                  <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{session?.user?.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{session?.user?.email}</div>
                  </div>
                  <button
                    onClick={() => { setShowMenu(false); router.push('/profil') }}
                    style={{ width: '100%', background: 'transparent', border: 'none', padding: '9px 14px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, color: 'var(--text)', textAlign: 'left' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-bg)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <User size={14} color="#a78bfa" />
                    Mon profil
                  </button>
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    style={{ width: '100%', background: 'transparent', border: 'none', padding: '9px 14px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, color: '#EF4444', textAlign: 'left' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={14} />
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <DashboardInner>{children}</DashboardInner>
      </SidebarProvider>
    </SessionProvider>
  )
}
