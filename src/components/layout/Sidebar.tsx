'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  Users,
  Trophy,
  GitFork,
  User,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Accueil', icon: LayoutDashboard },
  { href: '/formation', label: 'Formation', icon: GraduationCap },
  { href: '/business', label: 'Business', icon: Briefcase },
  { href: '/communaute', label: 'Communauté', icon: Users },
  { href: '/achievements', label: 'Succès', icon: Trophy },
  { href: '/parrainage', label: 'Parrainage', icon: GitFork },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:flex flex-col w-56 h-screen fixed left-0 top-0 py-6 px-3"
      style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)' }}>
      
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-black"
          style={{ background: 'var(--gold)' }}>A</div>
        <div>
          <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Upline.ai</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Coach Atlas</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm"
              style={{
                background: active ? 'rgba(226,184,74,0.1)' : 'transparent',
                color: active ? 'var(--gold)' : 'var(--text-muted)',
                fontWeight: active ? 500 : 400,
              }}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <Link href="/profil"
        className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all mt-2"
        style={{
          background: pathname === '/profil' ? 'rgba(226,184,74,0.1)' : 'transparent',
          border: pathname === '/profil' ? '1px solid rgba(226,184,74,0.2)' : '1px solid transparent',
        }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0"
          style={{ background: 'var(--gold)' }}>P</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>Patrice</div>
          <div className="text-xs" style={{ color: 'var(--gold)' }}>⭐ Premium</div>
        </div>
        <User size={14} style={{ color: 'var(--text-muted)' }} />
      </Link>
    </aside>
  )
}
