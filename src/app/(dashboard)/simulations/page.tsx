'use client'
import { useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, ChevronRight, Star, Clock, Target, RotateCcw } from 'lucide-react'

const SCENARIOS = [
  {
    id: 1,
    title: 'Invitation — Marché chaud',
    desc: 'Inviter un ami proche à découvrir l\'opportunité',
    difficulty: 'Facile',
    diffColor: '#22C55E',
    duration: '3-5 min',
    icon: '👥',
    systemPrompt: `Tu joues le rôle de Marc, un ami proche de l'utilisateur. Tu es curieux mais pas encore convaincu. Tu poses des questions naturelles comme un vrai ami. Tu peux être légèrement sceptique mais ouvert. L'utilisateur va t'inviter à découvrir une opportunité business. Réponds de façon naturelle et conversationnelle, comme au téléphone. Garde tes réponses courtes (2-3 phrases max). Parle en français.`,
  },
  {
    id: 2,
    title: 'Invitation — Marché froid',
    desc: 'Aborder une connaissance peu familière',
    difficulty: 'Moyen',
    diffColor: '#FF9600',
    duration: '3-5 min',
    icon: '🧊',
    systemPrompt: `Tu joues le rôle de Sophie, une connaissance que l'utilisateur n'a pas vue depuis longtemps. Tu es polie mais prudente. Tu poses des questions sur ce que c'est avant de t'engager. Réponds naturellement comme au téléphone, phrases courtes. Parle en français.`,
  },
  {
    id: 3,
    title: 'Suivi — Prospect hésitant',
    desc: 'Relancer un prospect qui dit "je réfléchis"',
    difficulty: 'Moyen',
    diffColor: '#FF9600',
    duration: '4-6 min',
    icon: '⏳',
    systemPrompt: `Tu joues le rôle de Jean, un prospect qui a vu une présentation il y a une semaine et dit qu'il réfléchit. Tu as des doutes sur la légitimité du MLM et sur le temps que ça demande. L'utilisateur te rappelle pour faire le suivi. Sois naturel, un peu sur la défensive au début. Phrases courtes. Parle en français.`,
  },
  {
    id: 4,
    title: 'Objection — C\'est une pyramide',
    desc: 'Traiter l\'objection la plus courante en MLM',
    difficulty: 'Difficile',
    diffColor: '#EF4444',
    duration: '4-6 min',
    icon: '🔺',
    systemPrompt: `Tu joues le rôle de Laura, une prospect sceptique qui pense que tous les MLM sont des arnaques pyramidales. Tu poses des questions pointues et tu es difficile à convaincre. L'utilisateur doit traiter ton objection avec professionnalisme. Sois challengeante mais raisonnable. Phrases courtes. Parle en français.`,
  },
  {
    id: 5,
    title: 'Closing — Décision finale',
    desc: 'Aider le prospect à prendre sa décision',
    difficulty: 'Difficile',
    diffColor: '#EF4444',
    duration: '5-7 min',
    icon: '🎯',
    systemPrompt: `Tu joues le rôle de Pierre, un prospect intéressé mais qui hésite encore à signer. Tu as peur de l'échec et du jugement de ta famille. L'utilisateur doit t'aider à prendre ta décision. Tu peux être convaincu si les arguments sont bons. Phrases courtes. Parle en français.`,
  },
  {
    id: 6,
    title: 'Simulation libre',
    desc: 'Décris ta situation et Atlas joue le prospect',
    difficulty: 'Personnalisé',
    diffColor: '#6D5EF5',
    duration: 'Variable',
    icon: '✨',
    systemPrompt: '',
    custom: true,
  },
]

type SimState = 'selection' | 'setup' | 'calling' | 'debrief'

interface CallMessage {
  role: 'user' | 'atlas'
  text: string
  time: string
}

export default function SimulationsPage() {
  const { data: session } = useSession()
  const prenom = session?.user?.name?.split(' ')[0] || 'toi'

  const [state, setState] = useState<SimState>('selection')
  const [selectedScenario, setSelectedScenario] = useState<typeof SCENARIOS[0] | null>(null)
  const [customDesc, setCustomDesc] = useState('')
  const [callMessages, setCallMessages] = useState<CallMessage[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [callTimer, setCallTimer] = useState<NodeJS.Timeout | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [debrief, setDebrief] = useState('')
  const [debriefLoading, setDebriefLoading] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const conversationRef = useRef<{ role: string; content: string }[]>([])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const startCall = async () => {
    setState('calling')
    setCallMessages([])
    conversationRef.current = []
    setCallDuration(0)
    const timer = setInterval(() => setCallDuration(d => d + 1), 1000)
    setCallTimer(timer)

    // Message d'ouverture Atlas
    const systemPrompt = selectedScenario?.custom
      ? `Tu joues le rôle d'un prospect MLM. Contexte : ${customDesc}. Réponds naturellement comme au téléphone, phrases courtes. Parle en français.`
      : selectedScenario?.systemPrompt || ''

    conversationRef.current = [{ role: 'system', content: systemPrompt }]

    await atlasRespond('Début de la simulation. Décrocher le téléphone et dire bonjour.')
  }

  const atlasRespond = async (userText: string) => {
    setIsLoading(true)
    try {
      conversationRef.current.push({ role: 'user', content: userText })

      const response = await fetch('/api/simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: conversationRef.current[0]?.content || '',
          messages: conversationRef.current.slice(1).map(m => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
        }),
      })

      const data = await response.json()
      const atlasText = data.text || ''
      conversationRef.current.push({ role: 'assistant', content: atlasText })

      const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      setCallMessages(prev => [...prev, { role: 'atlas', text: atlasText, time: now }])

      // TTS
      if (!isMuted) await speakText(atlasText)
    } catch {
      setCallMessages(prev => [...prev, { role: 'atlas', text: 'Désolé, problème de connexion...', time: '' }])
    } finally {
      setIsLoading(false)
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const speakText = async (text: string) => {
    try {
      setIsSpeaking(true)
      const response = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.slice(0, 300) }),
      })
      if (!response.ok) return
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      if (audioRef.current) { audioRef.current.pause(); URL.revokeObjectURL(audioRef.current.src) }
      audioRef.current = new Audio(audioUrl)
      audioRef.current.onended = () => setIsSpeaking(false)
      audioRef.current.onerror = () => setIsSpeaking(false)
      await audioRef.current.play()
    } catch { setIsSpeaking(false) }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data) }
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const formData = new FormData()
        formData.append('audio', audioBlob, 'recording.webm')
        try {
          const res = await fetch('/api/voice/stt', { method: 'POST', body: formData })
          const data = await res.json()
          if (data.text?.trim()) {
            const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            setCallMessages(prev => [...prev, { role: 'user', text: data.text.trim(), time: now }])
            await atlasRespond(data.text.trim())
          }
        } catch {}
      }
      mediaRecorder.start()
      setIsRecording(true)
    } catch { alert('Microphone non accessible.') }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const endCall = async () => {
    if (callTimer) clearInterval(callTimer)
    stopRecording()
    if (audioRef.current) audioRef.current.pause()
    setIsSpeaking(false)
    setState('debrief')
    setDebriefLoading(true)

    try {
      const conversation = conversationRef.current
        .filter(m => m.role !== 'system')
        .map(m => `${m.role === 'user' ? prenom : 'Prospect'}: ${m.content}`)
        .join('\n')

      const response = await fetch('/api/simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: 'Tu es Atlas, coach MLM expert. Réponds en français.',
          messages: [{ role: 'user', content: `Tu es Atlas, coach MLM expert. Analyse cette simulation d'appel et donne un debrief structuré en français.\n\nScénario : ${selectedScenario?.title}\n\nConversation :\n${conversation}\n\nDonne :\n1. Score global /10\n2. 3 points forts\n3. 3 points à améliorer\n4. Un conseil clé pour le prochain appel\n\nSois précis et bienveillant.` }]
        }),
      })
      const data = await response.json()
      setDebrief(data.text || '')
    } catch {
      setDebrief('Impossible de générer le debrief. Réessaie.')
    } finally {
      setDebriefLoading(false)
    }
  }

  // ===== ÉCRAN SÉLECTION =====
  if (state === 'selection') {
    return (
      <div className="overflow-x-fix" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 28px 60px' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 4, fontFamily: 'var(--font-title)' }}>
            Simulations d'appel
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            Entraîne-toi avec Atlas qui joue le rôle de ton prospect
          </p>
        </div>

        <div className="grid-3">
          {SCENARIOS.map(scenario => (
            <div
              key={scenario.id}
              onClick={() => { setSelectedScenario(scenario); setState(scenario.custom ? 'setup' : 'setup') }}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '20px', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#6D5EF5'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{scenario.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>{scenario.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.5 }}>{scenario.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 700, background: `${scenario.diffColor}15`, color: scenario.diffColor, padding: '3px 10px', borderRadius: 20 }}>
                  {scenario.difficulty}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={11} /> {scenario.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ===== ÉCRAN SETUP =====
  if (state === 'setup') {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 28px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{selectedScenario?.icon}</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>{selectedScenario?.title}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>{selectedScenario?.desc}</p>

        {selectedScenario?.custom && (
          <div style={{ marginBottom: 24, textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
              Décris ta situation
            </div>
            <textarea
              value={customDesc}
              onChange={e => setCustomDesc(e.target.value)}
              placeholder="Ex: Je rappelle Marie qui a vu une présentation hier et hésite à cause de son mari..."
              rows={4}
              style={{ width: '100%', background: 'var(--bg-card)', border: '1.5px solid var(--border)', borderRadius: 12, padding: '12px 14px', fontSize: 14, color: 'var(--text)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#6D5EF5'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
        )}

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 20px', marginBottom: 28, textAlign: 'left' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>💡 Conseils avant de commencer</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            • Parle naturellement comme au téléphone<br />
            • Maintiens le bouton micro pour parler<br />
            • Atlas joue le prospect — traite-le comme un vrai appel<br />
            • Tu recevras un debrief complet à la fin
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            onClick={() => setState('selection')}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            ← Retour
          </button>
          <button
            onClick={startCall}
            style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)', border: 'none', color: 'white', borderRadius: 12, padding: '12px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 16px rgba(34,197,94,0.35)' }}
          >
            <Phone size={18} /> Démarrer l'appel
          </button>
        </div>
      </div>
    )
  }

  // ===== ÉCRAN APPEL =====
  if (state === 'calling') {
    return (
      <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', background: 'var(--bg-page)' }}>

        {/* Header appel */}
        <div style={{ background: 'linear-gradient(135deg, #111827, #1E1B4B)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 4px 12px rgba(109,94,245,0.4)' }}>
              {selectedScenario?.icon}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>{selectedScenario?.title}</div>
              <div style={{ fontSize: 13, color: isSpeaking ? '#22C55E' : '#94A3B8', display: 'flex', alignItems: 'center', gap: 6 }}>
                {isSpeaking ? (
                  <><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', animation: 'pulse 1s infinite' }} /> Atlas parle...</>
                ) : isLoading ? (
                  <><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF9600' }} /> En réflexion...</>
                ) : (
                  <><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} /> En ligne</>
                )}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'white', fontFamily: 'monospace' }}>
            {formatTime(callDuration)}
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {callMessages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 10 }}>
                {msg.role === 'atlas' && (
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                    {selectedScenario?.icon}
                  </div>
                )}
                <div style={{
                  maxWidth: '75%',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #6D5EF5, #22D3EE)' : 'var(--bg-card)',
                  border: msg.role === 'atlas' ? '1px solid var(--border)' : 'none',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  padding: '10px 14px', color: msg.role === 'user' ? 'white' : 'var(--text)',
                  fontSize: 14, lineHeight: 1.6,
                }}>
                  {msg.text}
                  {msg.time && <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, textAlign: 'right' }}>{msg.time}</div>}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{selectedScenario?.icon}</div>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '18px 18px 18px 4px', padding: '12px 16px', display: 'flex', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D5EF5', animation: 'bounce 0.6s infinite' }} />
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D5EF5', animation: 'bounce 0.6s infinite 0.15s' }} />
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D5EF5', animation: 'bounce 0.6s infinite 0.3s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Contrôles appel */}
        <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', padding: '20px 24px', flexShrink: 0 }}>
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>

            {/* Sourdine */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{ width: 52, height: 52, borderRadius: '50%', background: isMuted ? 'rgba(239,68,68,0.1)' : 'var(--bg-page)', border: `2px solid ${isMuted ? '#EF4444' : 'var(--border)'}`, color: isMuted ? '#EF4444' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* Bouton parler */}
            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              disabled={isLoading || isSpeaking}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: isRecording ? '#EF4444' : 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
                border: 'none', color: 'white', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                boxShadow: isRecording ? '0 0 0 8px rgba(239,68,68,0.2)' : '0 4px 16px rgba(109,94,245,0.4)',
                transition: 'all 0.15s', opacity: (isLoading || isSpeaking) ? 0.5 : 1,
              }}
            >
              {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
              <span style={{ fontSize: 10, fontWeight: 700 }}>{isRecording ? 'Relâcher' : 'Parler'}</span>
            </button>

            {/* Raccrocher */}
            <button
              onClick={endCall}
              style={{ width: 52, height: 52, borderRadius: '50%', background: '#EF4444', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(239,68,68,0.4)' }}
            >
              <PhoneOff size={20} />
            </button>
          </div>
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
            Maintiens le bouton pour parler · Relâche pour envoyer
          </div>
        </div>
      </div>
    )
  }

  // ===== ÉCRAN DEBRIEF =====
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 28px 60px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>Debrief de l'appel</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontSize: 13, color: 'var(--text-muted)' }}>
          <span>{selectedScenario?.title}</span>
          <span>·</span>
          <span><Clock size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> {formatTime(callDuration)}</span>
          <span>·</span>
          <span>{callMessages.length} échanges</span>
        </div>
      </div>

      {/* Debrief Atlas */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏔️</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Analyse d'Atlas</div>
        </div>
        {debriefLoading ? (
          <div style={{ display: 'flex', gap: 6, padding: '20px 0' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6D5EF5', animation: 'bounce 0.6s infinite' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6D5EF5', animation: 'bounce 0.6s infinite 0.15s' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6D5EF5', animation: 'bounce 0.6s infinite 0.3s' }} />
          </div>
        ) : (
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{debrief}</div>
        )}
      </div>

      {/* Transcription */}
      {callMessages.length > 0 && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>📝 Transcription</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 200, overflowY: 'auto' }}>
            {callMessages.map((msg, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                <strong style={{ color: msg.role === 'user' ? '#6D5EF5' : 'var(--text)' }}>
                  {msg.role === 'user' ? prenom : 'Prospect'} :
                </strong> {msg.text}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button
          onClick={() => { setState('selection'); setCallMessages([]); setDebrief('') }}
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <RotateCcw size={16} /> Nouveau scénario
        </button>
        <button
          onClick={startCall}
          style={{ background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)', border: 'none', color: 'white', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(109,94,245,0.3)' }}
        >
          <RotateCcw size={16} /> Rejouer ce scénario
        </button>
      </div>
    </div>
  )
}
