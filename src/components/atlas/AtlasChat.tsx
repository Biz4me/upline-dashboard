'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AtlasChatProps {
  context?: string
  placeholder?: string
  suggestions?: string[]
}

export default function AtlasChat({
  context,
  placeholder = 'Écrire à Atlas...',
  suggestions = [],
}: AtlasChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>(() => `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/atlas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: context ? `[Contexte: ${context}]\n${text}` : text,
          sessionId,
        }),
      })

      const data = await res.json()

      if (data.error) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: '❌ ' + data.error },
        ])
      } else {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.text || 'Pas de réponse' },
        ])
        if (data.sessionId) setSessionId(data.sessionId)
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '❌ Erreur de connexion avec Atlas. Réessaie dans un instant.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 text-[var(--text-on-card)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 bg-[#E2B84A] rounded-lg flex items-center justify-center text-black font-bold text-xs">
          A
        </div>
        <div>
          <div className="text-[var(--text-on-card)] text-sm font-medium">Atlas — Coach IA</div>
          <div className="text-[var(--text-muted)] text-xs">
            {loading ? 'Réflexion en cours...' : 'En ligne'}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          minHeight: '200px',
          maxHeight: '500px',
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        {messages.length === 0 && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '16px' }}>
            {/* Avatar Atlas */}
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gold)', color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', flexShrink: 0 }}>A</div>
            {/* Bulle */}
            <div style={{ maxWidth: '75%', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px 18px 18px 18px', padding: '12px 16px', color: 'var(--text)' }}>
              <p className="text-sm">
                {context
                  ? `Je suis ton coach pour : ${context}. Pose-moi des questions !`
                  : "Bonjour ! Je suis Atlas, ton coach MLM. Comment puis-je t'aider aujourd'hui ?"}
              </p>
            </div>
          </div>
        )}
        {messages.map((msg, i) =>
          msg.role === 'assistant' ? (
            /* Messages Atlas (gauche) */
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '16px' }}>
              {/* Avatar Atlas */}
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gold)', color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', flexShrink: 0 }}>A</div>
              {/* Bulle */}
              <div style={{ maxWidth: '75%', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px 18px 18px 18px', padding: '12px 16px', color: 'var(--text)' }}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ) : (
            /* Messages Utilisateur (droite) */
            <div key={i} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              {/* Bulle */}
              <div style={{ maxWidth: '75%', background: 'var(--gold)', borderRadius: '18px 4px 18px 18px', padding: '10px 16px', color: 'var(--bg)', fontWeight: '500' }}>
                {msg.content}
              </div>
            </div>
          )
        )}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '16px' }}>
            {/* Avatar Atlas */}
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gold)', color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', flexShrink: 0 }}>A</div>
            {/* Bulle */}
            <div style={{ maxWidth: '75%', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px 18px 18px 18px', padding: '12px 16px', color: 'var(--text-muted)' }}>
              <span className="inline-flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce" style={{ animationDelay: '0.15s' }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>●</span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && messages.length === 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              className="text-xs bg-[var(--gold-muted)] hover:bg-[var(--gold-muted)] text-[var(--text-secondary)] px-3 py-2 rounded-lg transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] placeholder-[var(--text-muted)] outline-none focus:border-[#E2B84A] transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-[#E2B84A] hover:bg-[#ECC85E] text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          →
        </button>
      </form>
    </div>
  )
}
