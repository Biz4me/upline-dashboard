'use client'
import { useSession } from 'next-auth/react'
import AtlasChat from '@/components/atlas/AtlasChat'

export default function ChatAtlasPage() {
  const { data: session, status } = useSession()
  const userId = status === 'authenticated' ? session?.user?.id || 'anonymous' : 'anonymous'
  const prenom = session?.user?.name?.split(' ')[0] || ''

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <AtlasChat userId={userId} prenom={prenom} />
    </div>
  )
}
