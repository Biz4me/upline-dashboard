'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AtlasChatProps {
  sessionId?: string
  userId?: string
  context?: string
  placeholder?: string
  suggestions?: string[]
  prenom?: string
}

export default function AtlasChat({
  sessionId: propsSessionId,
  userId: propsUserId,
  context,
  placeholder = 'Écrire à Atlas...',
  suggestions = [],
  prenom,
}: AtlasChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [sessionId] = useState<string>(() => propsSessionId || `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`)
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null)
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceMuted, setVoiceMuted] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const tokenQueueRef = useRef<string[]>([])
  const displayIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const displayedTextRef = useRef<string>('')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const fetchQuote = async () => {
      setQuoteLoading(true)
      try {
        const heure = new Date().getHours()
        const moment = heure < 12 ? 'matin' : heure < 18 ? 'après-midi' : 'soir'
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 150,
            messages: [{
              role: 'user',
              content: `Donne-moi UNE citation courte et impactante d'un auteur célèbre (Jim Rohn, Eric Worre, Dale Carnegie, Napoleon Hill, Tony Robbins, Simon Sinek, Robert Kiyosaki, Winston Churchill, ou autre grand auteur) qui soit inspirante pour un distributeur MLM ce ${moment}. Le prénom de l'utilisateur est ${prenom || 'un distributeur MLM'}. Réponds UNIQUEMENT en JSON strict sans markdown ni backticks : {"text": "la citation en français", "author": "Prénom Nom"}`
            }]
          })
        })
        const data = await response.json()
        const raw = data.content?.[0]?.text || ''
        const clean = raw.replace(/```json|```/g, '').trim()
        const parsed = JSON.parse(clean)
        setQuote(parsed)
      } catch {
        setQuote({ text: "Le succès est la somme de petits efforts répétés jour après jour.", author: "Robert Collier" })
      } finally {
        setQuoteLoading(false)
      }
    }
    fetchQuote()
  }, [prenom])

  const startDisplayInterval = () => {
    if (displayIntervalRef.current) return
    displayIntervalRef.current = setInterval(() => {
      if (tokenQueueRef.current.length > 0) {
        const token = tokenQueueRef.current.shift()!
        displayedTextRef.current += token
        setMessages(prev => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = {
            role: 'assistant',
            content: displayedTextRef.current,
          }
          return newMessages
        })
      }
    }, 45)
  }

  const stopDisplayInterval = () => {
    if (displayIntervalRef.current) {
      clearInterval(displayIntervalRef.current)
      displayIntervalRef.current = null
    }
  }

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || isStreaming) return

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
          userId: propsUserId,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Erreur inconnue' }))
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: '❌ ' + (data.error || 'Erreur serveur') },
        ])
        setLoading(false)
        return
      }

      setLoading(false)
      setIsStreaming(true)

      tokenQueueRef.current = []
      displayedTextRef.current = ''
      startDisplayInterval()

      // Créer un message assistant vide pour le stream
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: '❌ Pas de réponse' },
        ])
        setIsStreaming(false)
        return
      }

      let fullText = ''
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ') || line.startsWith('data:')) {
            const data = line.replace(/^data:\s*/, '').trim()
            if (!data || data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.token) {
                fullText += parsed.token
                tokenQueueRef.current.push(parsed.token)
              }
            } catch {
              // Ignorer les lignes non-JSON
            }
          }
        }
      }

      // Traiter le buffer restant à la fin
      if (buffer) {
        const lines = buffer.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ') || line.startsWith('data:')) {
            const data = line.replace(/^data:\s*/, '').trim()
            if (!data || data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.token) {
                fullText += parsed.token
                tokenQueueRef.current.push(parsed.token)
              }
            } catch {
              // Ignorer
            }
          }
        }
      }

    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '❌ Erreur de connexion avec Atlas. Réessaie dans un instant.' },
      ])
    } finally {
      setLoading(false)
      setIsStreaming(false)
      if (voiceMode) speakText(displayedTextRef.current)
      // Attendre que la queue soit vide avant de stopper
      const waitQueue = setInterval(() => {
        if (tokenQueueRef.current.length === 0) {
          clearInterval(waitQueue)
          stopDisplayInterval()
          // S'assurer que le texte final est complet
          setMessages(prev => {
            const newMessages = [...prev]
            if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'assistant') {
              newMessages[newMessages.length - 1] = {
                role: 'assistant',
                content: displayedTextRef.current,
              }
            }
            return newMessages
          })
        }
      }, 50)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const getStatusText = () => {
    if (loading) return 'Réflexion en cours...'
    if (isStreaming) return 'Écrit...'
    return 'En ligne'
  }

  const hasMessages = messages.length > 0

  const speakText = async (text: string) => {
    if (voiceMuted || !voiceMode) return
    try {
      setIsSpeaking(true)
      const cleanText = text.replace(/[#*`]/g, '').slice(0, 500)
      const response = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText }),
      })
      if (!response.ok) return
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      if (audioRef.current) {
        audioRef.current.pause()
        URL.revokeObjectURL(audioRef.current.src)
      }
      audioRef.current = new Audio(audioUrl)
      audioRef.current.onended = () => setIsSpeaking(false)
      audioRef.current.onerror = () => setIsSpeaking(false)
      await audioRef.current.play()
    } catch {
      setIsSpeaking(false)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const formData = new FormData()
        formData.append('audio', audioBlob, 'recording.webm')
        try {
          const res = await fetch('/api/voice/stt', { method: 'POST', body: formData })
          const data = await res.json()
          if (data.text?.trim()) await sendMessage(data.text.trim())
        } catch {}
      }
      mediaRecorder.start()
      setIsRecording(true)
    } catch {
      alert('Microphone non accessible. Vérifiez les permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const toggleVoiceMode = () => {
    if (voiceMode) {
      stopRecording()
      if (audioRef.current) audioRef.current.pause()
      setIsSpeaking(false)
    }
    setVoiceMode(!voiceMode)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-page)', color: 'var(--text)', position: 'relative' }}>

      {/* Mode centré — aucun message */}
      {!hasMessages && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
          {/* Bienvenue */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(109,94,245,0.35)', fontSize: 28 }}>
              🏔️
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 8, fontFamily: 'var(--font-title)' }}>
              {prenom ? `Bonjour ${prenom} 👋` : 'Bonjour 👋'}
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 400, marginBottom: 28 }}>
              Je suis Atlas, ton coach MLM personnel.
            </p>

            {/* Citation inspirante */}
            {quoteLoading ? (
              <div style={{ maxWidth: 480, textAlign: 'center', marginBottom: 32 }}>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D5EF5', display: 'inline-block', animation: 'bounce 1s infinite' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D5EF5', display: 'inline-block', animation: 'bounce 1s infinite 0.15s' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D5EF5', display: 'inline-block', animation: 'bounce 1s infinite 0.3s' }} />
                </div>
              </div>
            ) : quote && (
              <div style={{
                maxWidth: 480, textAlign: 'center', marginBottom: 32,
                background: 'transparent',
                border: '1px solid rgba(109,94,245,0.1)',
                borderRadius: 16, padding: '14px 20px',
                position: 'relative',
              }}>
                <div style={{ fontSize: 32, color: '#6D5EF5', opacity: 0.3, lineHeight: 1, marginBottom: 8, fontFamily: 'Georgia, serif' }}>{'"'}</div>
                <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.7, fontStyle: 'italic', margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>
                  {quote.text}
                </p>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>— {quote.author}</div>
              </div>
            )}
          </div>

          {/* Bouton mode vocal */}
          <button
            onClick={toggleVoiceMode}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: voiceMode ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'var(--bg-card)',
              border: voiceMode ? 'none' : '1.5px solid var(--border)',
              color: voiceMode ? 'white' : 'var(--text-secondary)',
              borderRadius: 50, padding: '10px 24px',
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
              boxShadow: voiceMode ? '0 4px 16px rgba(109,94,245,0.35)' : 'none',
              marginBottom: 24, transition: 'all 0.2s',
            }}
          >
            {voiceMode ? <Phone size={18} /> : <Mic size={18} />}
            {voiceMode ? 'Mode vocal actif' : 'Démarrer en mode vocal'}
          </button>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32, maxWidth: 600 }}>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 20,
                    padding: '10px 18px',
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#6D5EF5'; e.currentTarget.style.color = '#a78bfa' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input centré */}
          <div style={{ width: '100%', maxWidth: 680 }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, background: 'var(--bg-card)', border: '1.5px solid var(--border)', borderRadius: 16, padding: '12px 16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pose une question à Atlas..."
                disabled={loading || isStreaming}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: 'var(--text)', caretColor: '#6D5EF5' }}
              />
              <button
                type="submit"
                disabled={loading || isStreaming || !input.trim()}
                style={{ background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', borderRadius: 10, padding: '8px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', opacity: (!input.trim() || loading || isStreaming) ? 0.5 : 1 }}
              >
                →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mode conversation — messages + input en bas */}
      {hasMessages && (
        <>
          {/* Zone messages scrollable */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 0' }}>
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              {messages.map((msg, i) =>
                msg.role === 'assistant' ? (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>A</div>
                    <div className="atlas-markdown" style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px 18px 18px 18px', padding: '12px 16px', color: 'var(--text)' }}>
                      <ReactMarkdown components={{
                        p: ({ children }) => <p style={{ margin: '0 0 12px 0', lineHeight: '1.8', fontSize: '14px', color: 'var(--text)' }}>{children}</p>,
                        strong: ({ children }) => <strong style={{ fontWeight: 600, color: 'var(--text)' }}>{children}</strong>,
                        ul: ({ children }) => <ul style={{ margin: '8px 0 12px 0', paddingLeft: 0, listStyle: 'none' }}>{children}</ul>,
                        li: ({ children }) => <li style={{ margin: '6px 0', paddingLeft: '16px', position: 'relative', fontSize: '14px', lineHeight: '1.7', color: 'var(--text)' }}><span style={{ position: 'absolute', left: 0, color: '#6D5EF5' }}>→</span>{children}</li>,
                        ol: ({ children }) => <ol style={{ margin: '8px 0 12px 0', paddingLeft: '20px' }}>{children}</ol>,
                        blockquote: ({ children }) => <div style={{ borderLeft: '3px solid #6D5EF5', paddingLeft: '12px', margin: '10px 0', color: 'var(--text-secondary)', fontSize: '13px' }}>{children}</div>,
                      }}>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div key={i} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                    <div style={{ maxWidth: '75%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', borderRadius: '18px 4px 18px 18px', padding: '10px 16px', color: 'white', fontWeight: 500, fontSize: 14 }}>
                      {msg.content}
                    </div>
                  </div>
                )
              )}
              {loading && !isStreaming && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>A</div>
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px 18px 18px 18px', padding: '12px 16px' }}>
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.15s' }}>●</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>●</span>
                    </span>
                  </div>
                </div>
              )}
              {isSpeaking && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🏔️</div>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D5EF5', animation: 'bounce 0.6s infinite' }} />
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D5EF5', animation: 'bounce 0.6s infinite 0.15s' }} />
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D5EF5', animation: 'bounce 0.6s infinite 0.3s' }} />
                    <span style={{ fontSize: 12, color: '#a78bfa', fontWeight: 600, marginLeft: 6 }}>Atlas parle...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input fixe en bas */}
          <div style={{ flexShrink: 0, padding: '16px 24px', borderTop: '1px solid var(--border)', background: 'var(--bg-page)' }}>
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, background: 'var(--bg-card)', border: '1.5px solid var(--border)', borderRadius: 16, padding: '10px 14px' }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={placeholder}
                  disabled={loading || isStreaming}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: 'var(--text)', caretColor: '#6D5EF5' }}
                />
                {voiceMode && (
                  <>
                    <button
                      type="button"
                      onClick={() => setVoiceMuted(!voiceMuted)}
                      style={{ background: 'transparent', border: 'none', color: voiceMuted ? '#EF4444' : 'var(--text-muted)', cursor: 'pointer', padding: '8px', borderRadius: 8, display: 'flex', alignItems: 'center' }}
                    >
                      {voiceMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button
                      type="button"
                      onMouseDown={startRecording}
                      onMouseUp={stopRecording}
                      onTouchStart={startRecording}
                      onTouchEnd={stopRecording}
                      style={{
                        background: isRecording ? '#EF4444' : 'rgba(109,94,245,0.15)',
                        border: isRecording ? 'none' : '1.5px solid rgba(109,94,245,0.3)',
                        color: isRecording ? 'white' : '#a78bfa',
                        borderRadius: 10, padding: '8px 14px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 13, fontWeight: 700,
                      }}
                    >
                      {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                      {isRecording ? 'Relâcher' : 'Parler'}
                    </button>
                    <button
                      type="button"
                      onClick={toggleVoiceMode}
                      style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '8px', borderRadius: 8, display: 'flex', alignItems: 'center' }}
                    >
                      <PhoneOff size={18} />
                    </button>
                  </>
                )}
                <button
                  type="submit"
                  disabled={loading || isStreaming || !input.trim()}
                  style={{ background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', borderRadius: 10, padding: '8px 16px', fontSize: 14, fontWeight: 700, cursor: 'pointer', opacity: (!input.trim() || loading || isStreaming) ? 0.5 : 1 }}
                >
                  →
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
