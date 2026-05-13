import Sidebar from '@/components/layout/Sidebar'
import BottomNav from '@/components/layout/BottomNav'
import ThemeToggle from '@/components/layout/ThemeToggle'
import Link from 'next/link'
import { Bell } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#161410] text-white">
      <Sidebar />
      <main className="md:ml-56 min-h-screen pb-20 md:pb-0">
        <div className="flex justify-end items-center gap-3 px-4 md:px-6 py-3 md:py-4 border-b border-[#2A2318]">
          <ThemeToggle />
          <button className="hidden md:flex w-9 h-9 rounded-lg bg-[#2A2318] hover:bg-[#3d3420] items-center justify-center text-[#6A5A3A] hover:text-white transition-all relative">
            <Bell size={16} strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E2B84A] rounded-full"></span>
          </button>
          <Link href="/profil" className="hidden md:flex">
            <div className="w-8 h-8 rounded-full bg-[#E2B84A] flex items-center justify-center text-black font-bold text-sm cursor-pointer hover:opacity-80 transition-opacity">
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
