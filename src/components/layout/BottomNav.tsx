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

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] border-t border-[#2A2A2A]">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs transition-colors ${
                pathname === item.href
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
