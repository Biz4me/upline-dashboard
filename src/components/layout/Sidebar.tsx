'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Accueil', icon: '⌂' },
  { href: '/formation', label: 'Formation', icon: '◈' },
  { href: '/business', label: 'Business', icon: '◎' },
  { href: '/communaute', label: 'Communauté', icon: '♦' },
  { href: '/achievements', label: 'Succès', icon: '★' },
  { href: '/parrainage', label: 'Parrainage', icon: '◇' },
  { href: '/profil', label: 'Profil', icon: '○' },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:flex flex-col w-56 h-screen fixed left-0 top-0 bg-[#1E1B14] border-r border-[#2A2318] py-6 px-3 gap-1">
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-8 h-8 bg-[#E2B84A] rounded-lg flex items-center justify-center font-bold text-sm text-black">A</div>
        <div>
          <div className="text-white font-semibold text-sm">Upline.ai</div>
          <div className="text-[#6A5A3A] text-xs">Coach Atlas</div>
        </div>
      </div>
      {navItems.map((item) => {
        const active = pathname === item.href
        return (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm
              ${active 
                ? 'bg-[#E2B84A]/10 text-[#E2B84A] font-medium' 
                : 'text-[#6A5A3A] hover:text-white hover:bg-[#2A2318]'
              }`}>
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        )
      })}
      <div className="mt-auto px-3">
        <div className="text-[#3d3420] text-xs">© 2026 Upline.ai</div>
      </div>
    </aside>
  )
}
