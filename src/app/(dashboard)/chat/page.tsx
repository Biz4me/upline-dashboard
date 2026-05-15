'use client'
import { useSession } from 'next-auth/react'
import AtlasChat from '@/components/atlas/AtlasChat'
import { Sparkles } from 'lucide-react'

export default function ChatAtlasPage() {
  const { data: session, status } = useSession()
  const userId = status === 'authenticated' ? session?.user?.id || 'anonymous' : 'anonymous'

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '16px 28px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        background: 'var(--bg-card)',
      }}>
        <div style={{
          width: 44,
          height: 44,
          background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(109,94,245,0.35)',
          flexShrink: 0,
        }}>
          <Sparkles size={20} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>Atlas — Coach IA</div>
          <div style={{ fontSize: 12, color: '#22C55E', display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, background: '#22C55E', borderRadius: '50%' }} />
            En ligne · Prêt à coacher
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <div style={{
            background: 'var(--primary-muted)',
            border: '1px solid rgba(109,94,245,0.2)',
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 11,
            fontWeight: 700,
            color: '#a78bfa',
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            MLM Coach
          </div>
          <div style={{
            background: 'rgba(34,211,238,0.1)',
            border: '1px solid rgba(34,211,238,0.2)',
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 11,
            fontWeight: 700,
            color: '#22D3EE',
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            RAG Activé
          </div>
        </div>
      </div>

      {/* Chat */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <AtlasChat userId={userId} />
      </div>
    </div>
  )
}
