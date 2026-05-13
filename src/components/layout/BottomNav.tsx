'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  Trophy,
  User,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Accueil', icon: LayoutDashboard },
  { href: '/formation', label: 'Formation', icon: GraduationCap },
  { href: '/business', label: 'Business', icon: Briefcase },
  { href: '/achievements', label: 'Succès', icon: Trophy },
  { href: '/profil', label: 'Profil', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1E1B14] border-t border-[#2A2318] px-2 py-2 flex justify-around z-50">
      {navItems.map((item) => {
        const active = pathname === item.href
        const Icon = item.icon
        return (
          <Link key={item.href} href={item.href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all
              ${active ? 'text-[#E2B84A]' : 'text-[#4d4228]'}`}>
            <Icon size={22} strokeWidth={1.8} />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
