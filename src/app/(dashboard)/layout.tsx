import Sidebar from '@/components/layout/Sidebar'
import BottomNav from '@/components/layout/BottomNav'
import ThemeToggle from '@/components/layout/ThemeToggle'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#161410] text-white">
      <Sidebar />
      <main className="md:ml-56 min-h-screen pb-20 md:pb-0">
        <div className="flex justify-end items-center gap-3 px-6 py-4 border-b border-[#2A2318]">
          <ThemeToggle />
          <Link href="/profil">
            <div className="w-8 h-8 rounded-full bg-[#E2B84A] flex items-center justify-center text-black font-bold text-sm cursor-pointer hover:opacity-80 transition-opacity">
              P
            </div>
          </Link>
        </div>
        <div className="px-6 py-6">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
