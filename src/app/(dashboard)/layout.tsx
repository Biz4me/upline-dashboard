'use client'
import { SessionProvider } from 'next-auth/react'
import { SidebarProvider, useSidebar } from '@/context/SidebarContext'
import Sidebar from '@/components/layout/Sidebar'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { Bell, Menu } from 'lucide-react'

function DashboardInner({ children }: { children: React.ReactNode }) {
  const { mobileOpen, setMobileOpen, isMobile } = useSidebar()

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
