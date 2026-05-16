'use client'
import { useSession } from 'next-auth/react'
import AtlasChat from '@/components/atlas/AtlasChat'

export default function AtlasPage() {
  const { data: session, status } = useSession()
  const userId = status === 'authenticated' ? session?.user?.id || 'anonymous' : 'anonymous'
  const prenom = session?.user?.name?.split(' ')[0] || ''

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="page-inner" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <AtlasChat userId={userId} prenom={prenom} />
      </div>
    </div>
  )
}
