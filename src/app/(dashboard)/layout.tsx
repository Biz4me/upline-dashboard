import Sidebar from '@/components/layout/Sidebar'
import BottomNav from '@/components/layout/BottomNav'
import ThemeToggle from '@/components/layout/ThemeToggle'
import Link from 'next/link'
import { Bell } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Sidebar />
      <main className="md:ml-56 min-h-screen pb-20 md:pb-0">
        <div className="flex justify-end items-center gap-3 px-4 md:px-6 py-3 md:py-4"
          style={{ borderBottom: '1px solid var(--border)' }}>
          <ThemeToggle />
          <button
            className="hidden md:flex w-9 h-9 rounded-lg items-center justify-center relative transition-all"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          >
            <Bell size={16} strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }}></span>
          </button>
          <Link href="/profil" className="hidden md:flex">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm cursor-pointer hover:opacity-80 transition-opacity"
              style={{ background: 'var(--gold)' }}>
              P
            </div>
          </Link>
        </div>
        <div className="px-4 md:px-6 py-4 md:py-6">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
