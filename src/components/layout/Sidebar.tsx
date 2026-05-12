'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Accueil', icon: '🏠' },
  { href: '/contacts', label: 'Contacts', icon: '👥' },
  { href: '/objectifs', label: 'Objectifs', icon: '🎯' },
  { href: '/messages', label: 'Messages', icon: '💬' },
  { href: '/parametres', label: 'Paramètres', icon: '⚙️' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-[#1A1A1A] border-r border-[#2A2A2A] fixed left-0 top-0 z-40">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">Upline.ai</h2>
        <p className="text-xs text-[#A89878] mt-1">Coach Atlas</p>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
              pathname === item.href
                ? 'bg-[#2A2A2A] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#252525]'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-[#2A2A2A]">
        <p className="text-xs text-gray-500">© 2026 Upline.ai</p>
      </div>
    </aside>
  )
}
