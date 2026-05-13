'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'

function AdminInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated' && session?.user?.role !== 'admin') router.push('/')
  }, [status, session, router])

  if (status === 'loading') return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#161410', color: '#E2B84A', fontSize: '18px' }}>Chargement...</div>

  return (
    <div style={{ minHeight: '100vh', background: '#161410', color: '#FFFFFF' }}>
      {/* Header Admin */}
      <header style={{ background: '#1E1B14', borderBottom: '1px solid #3A3020', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#E2B84A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#161410', fontSize: '14px' }}>A</div>
          <span style={{ fontWeight: '700', fontSize: '16px' }}>Upline.ai</span>
          <span style={{ background: '#E2B84A', color: '#161410', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' }}>ADMIN</span>
        </div>
        <nav style={{ display: 'flex', gap: '8px' }}>
          {[
            { href: '/admin', label: 'Dashboard' },
            { href: '/admin/users', label: 'Utilisateurs' },
            { href: '/admin/atlas', label: 'Atlas' },
            { href: '/admin/system', label: 'Système' },
          ].map(item => (
            <a key={item.href} href={item.href} style={{ padding: '6px 12px', borderRadius: '6px', color: '#C8B48E', fontSize: '13px', textDecoration: 'none', background: 'transparent' }}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main style={{ padding: '24px' }}>
        {children}
      </main>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <SessionProvider><AdminInner>{children}</AdminInner></SessionProvider>
}
