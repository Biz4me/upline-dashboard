import Sidebar from '@/components/layout/Sidebar'
import BottomNav from '@/components/layout/BottomNav'
import ThemeToggle from '@/components/layout/ThemeToggle'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#161410] text-white">
      <Sidebar />
      <main className="md:ml-20 xl:ml-56 min-h-screen pb-20 md:pb-0">
        <div className="flex justify-end items-center px-6 py-4 border-b border-[#2A2318]">
          <ThemeToggle />
        </div>
        <div className="px-6 py-6">{children}</div>
      </main>
      <BottomNav />
    </div>
  )
}
