'use client'
import { SessionProvider, signOut } from 'next-auth/react'
import { SidebarProvider, useSidebar } from '@/context/SidebarContext'
import Sidebar from '@/components/layout/Sidebar'
import BottomNav from '@/components/layout/BottomNav'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { Bell, User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

function DashboardInner({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar()
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden" style={{ transition: 'all 0.25s ease' }}>
        <header className="hidden md:flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
          <ThemeToggle />
          <button className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            <Bell size={16} strokeWidth={1.8} />
          </button>
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: 'var(--gold)', color: 'var(--bg)' }}
            >
              P
            </button>
            {showMenu && (
              <div
                className="rounded-xl shadow-lg py-2 flex flex-col min-w-[160px]"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '44px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  zIndex: 50,
                }}
              >
                <button
                  onClick={() => { setShowMenu(false); router.push('/profil') }}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:opacity-80"
                  style={{ color: 'var(--text)' }}
                >
                  <User size={16} strokeWidth={1.8} />
                  Profil
                </button>
                <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }} />
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:opacity-80"
                  style={{ color: '#ef4444' }}
                >
                  <LogOut size={16} strokeWidth={1.8} />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>
      <BottomNav />
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
