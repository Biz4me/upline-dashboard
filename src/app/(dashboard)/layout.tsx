'use client'
import { SessionProvider } from 'next-auth/react'
import { SidebarProvider, useSidebar } from '@/context/SidebarContext'
import Sidebar from '@/components/layout/Sidebar'
import BottomNav from '@/components/layout/BottomNav'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { Bell, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

function DashboardInner({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar()
  const router = useRouter()

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden" style={{ transition: 'all 0.25s ease' }}>
        <header className="hidden md:flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
          <ThemeToggle />
          <button className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            <Bell size={16} strokeWidth={1.8} />
          </button>
          <button onClick={() => router.push('/profil')} className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--gold)', color: 'var(--bg)' }}>
            P
          </button>
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
