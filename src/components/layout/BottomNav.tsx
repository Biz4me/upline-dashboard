'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  Trophy,
  MoreHorizontal,
  Users,
  GitFork,
  User,
  X,
} from 'lucide-react'

const mainItems = [
  { href: '/', label: 'Accueil', icon: LayoutDashboard },
  { href: '/formation', label: 'Formation', icon: GraduationCap },
  { href: '/business', label: 'Business', icon: Briefcase },
  { href: '/achievements', label: 'Succès', icon: Trophy },
]

const moreItems = [
  { href: '/communaute', label: 'Communauté', icon: Users },
  { href: '/parrainage', label: 'Parrainage', icon: GitFork },
  { href: '/profil', label: 'Profil', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isMoreActive = moreItems.some(i => i.href === pathname)

  return (
    <>
      {/* Drawer overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`md:hidden fixed bottom-16 left-0 right-0 z-50 transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-[#1E1B14] border border-[#2A2318] rounded-t-2xl mx-2 p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-medium text-sm">Plus</span>
            <button onClick={() => setOpen(false)}>
              <X size={18} className="text-[#6A5A3A]" />
            </button>
          </div>
          <div className="space-y-1">
            {moreItems.map((item) => {
              const active = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active
                      ? 'bg-[#E2B84A]/10 text-[#E2B84A]'
                      : 'text-[#A89878] hover:bg-[#2A2318]'
                  }`}
                >
                  <Icon size={20} strokeWidth={1.8} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1E1B14] border-t border-[#2A2318] px-2 py-2 flex justify-around z-50">
        {mainItems.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all ${
                active ? 'text-[#E2B84A]' : 'text-[#4d4228]'
              }`}
            >
              <Icon size={22} strokeWidth={1.8} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          )
        })}
        <button
          onClick={() => setOpen(!open)}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all ${
            isMoreActive || open ? 'text-[#E2B84A]' : 'text-[#4d4228]'
          }`}
        >
          <MoreHorizontal size={22} strokeWidth={1.8} />
          <span className="text-[10px]">Plus</span>
        </button>
      </nav>
    </>
  )
}
