'use client'
import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { PhoneOff, RotateCcw, Clock, Mic } from 'lucide-react'

const SCENARIOS = [
  {
    id: 1,
    title: 'Invitation — Marché chaud',
    desc: 'Inviter un ami proche à découvrir l\'opportunité',
    difficulty: 'Facile',
    diffColor: '#22C55E',
    duration: '3-5 min',
    icon: '👥',
    systemPrompt: `Tu joues le rôle de Marc, un ami proche. Tu viens de décrocher ton téléphone. Tu es curieux mais pas encore convaincu par le MLM. Réponds naturellement comme au téléphone, phrases courtes (2-3 phrases max). Tu peux être légèrement sceptique mais ouvert. Parle uniquement en français.`,
  },
  {
    id: 2,
    title: 'Invitation — Marché froid',
    desc: 'Aborder une connaissance peu familière',
    difficulty: 'Moyen',
    diffColor: '#FF9600',
    duration: '3-5 min',
    icon: '🧊',
    systemPrompt: `Tu joues le rôle de Sophie, une connaissance que l'utilisateur n'a pas vue depuis longtemps. Tu viens de décrocher. Tu es polie mais prudente et curieuse de savoir pourquoi on t'appelle. Phrases courtes. Parle en français.`,
  },
  {
    id: 3,
    title: 'Suivi — Prospect hésitant',
    desc: 'Relancer un prospect qui dit "je réfléchis"',
    difficulty: 'Moyen',
    diffColor: '#FF9600',
    duration: '4-6 min',
    icon: '⏳',
    systemPrompt: `Tu joues le rôle de Jean, un prospect qui a vu une présentation il y a une semaine. Tu viens de décrocher. Tu as des doutes sur le MLM et le temps que ça demande. Sois naturel, un peu sur la défensive au début. Phrases courtes. Parle en français.`,
  },
  {
    id: 4,
    title: 'Objection — C\'est une pyramide',
    desc: 'Traiter l\'objection la plus courante',
    difficulty: 'Difficile',
    diffColor: '#EF4444',
    duration: '4-6 min',
    icon: '🔺',
    systemPrompt: `Tu joues le rôle de Laura, une prospect sceptique qui pense que tous les MLM sont des arnaques. Tu viens de décrocher. Tu poses des questions pointues et tu es difficile à convaincre. Sois challengeante mais raisonnable. Phrases courtes. Parle en français.`,
  },
  {
    id: 5,
    title: 'Closing — Décision finale',
    desc: 'Aider le prospect à prendre sa décision',
    difficulty: 'Difficile',
    diffColor: '#EF4444',
    duration: '5-7 min',
    icon: '🎯',
    systemPrompt: `Tu joues le rôle de Pierre, un prospect intéressé mais qui hésite encore. Tu viens de décrocher. Tu as peur de l'échec et du jugement de ta famille. Tu peux être convaincu si les arguments sont bons. Phrases courtes. Parle en français.`,
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

const SCENARIO_STEPS: Record<number, { step: string; desc: string; icon: string }[]> = {
  1: [
    { step: 'Être pressé', desc: 'Montre que tu as peu de temps — ça réduit la pression', icon: '⚡' },
    { step: 'Compliment sincère', desc: 'Un compliment authentique sur la personne', icon: '🌟' },
    { step: 'L\'invitation', desc: 'Pose ta question d\'invitation directement', icon: '🎯' },
    { step: 'Confirmer le RDV', desc: 'Valide la date et l\'heure concrètement', icon: '📅' },
    { step: 'Raccrocher', desc: 'Termine rapidement — reste pressé jusqu\'au bout', icon: '📵' },
  ],
  2: [
    { step: 'Être pressé', desc: 'Montre que tu as peu de temps', icon: '⚡' },
    { step: 'Compliment sincère', desc: 'Trouve quelque chose d\'authentique', icon: '🌟' },
    { step: 'Référence commune', desc: 'Rappelle comment vous vous connaissez', icon: '🤝' },
    { step: 'L\'invitation', desc: 'Pose ta question d\'invitation', icon: '🎯' },
    { step: 'Confirmer le RDV', desc: 'Valide la date et l\'heure', icon: '📅' },
    { step: 'Raccrocher vite', desc: 'Reste pressé et raccroche rapidement', icon: '📵' },
  ],
  3: [
    { step: 'Saluer chaleureusement', desc: 'Commence par prendre des nouvelles', icon: '👋' },
    { step: 'Rappeler le contexte', desc: 'Mentionne la présentation qu\'il a vue', icon: '🔄' },
    { step: 'Question ouverte', desc: 'Demande ce qu\'il a pensé honnêtement', icon: '💭' },
    { step: 'Écouter activement', desc: 'Laisse-le parler sans l\'interrompre', icon: '👂' },
    { step: 'Identifier l\'objection', desc: 'Trouve la vraie raison de son hésitation', icon: '🔍' },
    { step: 'Proposer une solution', desc: 'Réponds précisément à son objection', icon: '✅' },
  ],
  4: [
    { step: 'Rester calme', desc: 'Ne te défends pas — reste professionnel', icon: '😌' },
    { step: 'Feel Felt Found', desc: '"Je comprends... d\'autres ont ressenti... ils ont trouvé..."', icon: '💡' },
    { step: 'Poser une question', desc: 'Demande ce qu\'il entend par pyramide', icon: '❓' },
    { step: 'Expliquer la différence', desc: 'Pyramide illégale vs réseau de distribution légal', icon: '📊' },
    { step: 'Rediriger', desc: 'Reviens à son besoin initial', icon: '🎯' },
  ],
  5: [
    { step: 'Identifier le frein', desc: 'Qu\'est-ce qui l\'empêche vraiment de décider ?', icon: '🔍' },
    { step: 'Valider ses craintes', desc: 'Montre que tu comprends ses peurs', icon: '🤝' },
    { step: 'Raconter une histoire', desc: 'Partage l\'histoire de quelqu\'un dans sa situation', icon: '📖' },
    { step: 'Question de décision', desc: '"Si tu n\'avais pas cette crainte, tu le ferais ?"', icon: '💭' },
    { step: 'Proposer un premier pas', desc: 'Suggère une action simple pour commencer', icon: '👣' },
  ],
  6: [
    { step: 'Comprendre la situation', desc: 'Écoute bien le contexte décrit', icon: '👂' },
    { step: 'Adapter ton approche', desc: 'Utilise la technique la plus appropriée', icon: '🎯' },
    { step: 'Rester naturel', desc: 'Parle comme dans une vraie conversation', icon: '😊' },
    { step: 'Gérer les objections', desc: 'Feel Felt Found pour toute résistance', icon: '💡' },
  ],
}

type SimState = 'selection' | 'setup' | 'calling' | 'debrief'

interface CallMessage {
  role: 'user' | 'atlas'
  text: string
}

export default function SimulationsPage() {
  const { data: session } = useSession()
  const prenom = session?.user?.name?.split(' ')[0] || 'toi'

  const [state, setState] = useState<SimState>('selection')
  const [selectedScenario, setSelectedScenario] = useState<typeof SCENARIOS[0] | null>(null)
  const [customDesc, setCustomDesc] = useState('')
  const [callMessages, setCallMessages] = useState<CallMessage[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const isRecordingRef = useRef(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [debrief, setDebrief] = useState('')
  const [debriefLoading, setDebriefLoading] = useState(false)
  const [spherePulse, setSpherePulse] = useState(false)
  const [status, setStatus] = useState<'waiting' | 'listening' | 'thinking' | 'speaking'>('waiting')

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

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (state === 'calling') {
      timer = setInterval(() => setCallDuration(d => d + 1), 1000)
    }
    return () => clearInterval(timer)
  }, [state])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [callMessages])

  const speakText = async (text: string) => {
    try {
      setIsSpeaking(true)
      setSpherePulse(true)
      setStatus('speaking')
      const response = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.slice(0, 400) }),
      })
      if (!response.ok) { setIsSpeaking(false); setSpherePulse(false); return }
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      if (audioRef.current) { audioRef.current.pause(); URL.revokeObjectURL(audioRef.current.src) }
      audioRef.current = new Audio(audioUrl)
      await new Promise<void>((resolve) => {
        audioRef.current!.onended = () => resolve()
        audioRef.current!.onerror = () => resolve()
        audioRef.current!.play().catch(() => {
          // Retry once
          setTimeout(() => {
            audioRef.current!.play().catch(() => resolve())
          }, 300)
        })
      })
    } catch {}
    finally {
      setIsSpeaking(false)
      setSpherePulse(false)
      setStatus('waiting')
    }
  }

  const atlasRespond = async (userText: string) => {
    setIsLoading(true)
    setStatus('thinking')
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
      const atlasText = data.text || 'Je n\'ai pas compris...'
      conversationRef.current.push({ role: 'assistant', content: atlasText })
      setCallMessages(prev => [...prev, { role: 'atlas', text: atlasText }])
      await speakText(atlasText)
    } catch {
      setCallMessages(prev => [...prev, { role: 'atlas', text: 'Problème de connexion...' }])
      setStatus('waiting')
    } finally {
      setIsLoading(false)
    }
  }

  const startRecording = async () => {
    if (isRecordingRef.current || isSpeaking || isLoading) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        if (audioChunksRef.current.length === 0) { setStatus('waiting'); return }
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const formData = new FormData()
        formData.append('audio', audioBlob, 'recording.webm')
        try {
          const res = await fetch('/api/voice/stt', { method: 'POST', body: formData })
          const sttData = await res.json()
          if (sttData.text?.trim()) {
            setCallMessages(prev => [...prev, { role: 'user', text: sttData.text.trim() }])
            await atlasRespond(sttData.text.trim())
          } else {
            setStatus('waiting')
          }
        } catch {
          setStatus('waiting')
        }
      }
      mediaRecorder.start()
      setIsRecording(true)
      isRecordingRef.current = true
      setStatus('listening')
    } catch {
      alert('Microphone non accessible.')
    }
  }

  const stopRecording = () => {
    if (!isRecordingRef.current) return
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
    isRecordingRef.current = false
  }

  const startCall = async () => {
    setState('calling')
    setCallMessages([])
    setCallDuration(0)
    conversationRef.current = []

    const systemPrompt = selectedScenario?.custom
      ? `Tu joues le rôle d'un prospect MLM. Contexte : ${customDesc}. Tu viens de décrocher le téléphone. Réponds naturellement, phrases courtes. Parle en français.`
      : selectedScenario?.systemPrompt || ''

    conversationRef.current = [{ role: 'system', content: systemPrompt }]

    // Débloquer l'autoplay avec un son silencieux
    const ctx = new AudioContext()
    await ctx.resume()
    ctx.close()
    // Atlas décroche et dit bonjour en premier
    await atlasRespond('Tu viens de décrocher le téléphone. Dis juste "Allô ?" ou "Oui bonjour ?" naturellement.')
  }

  const endCall = async () => {
    audioChunksRef.current = [] // vider avant d'arrêter
    stopRecording()
    if (audioRef.current) audioRef.current.pause()
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
          messages: [{
            role: 'user',
            content: `Analyse cette simulation d'appel MLM et donne un debrief structuré.\n\nScénario : ${selectedScenario?.title}\n\nConversation :\n${conversation}\n\nDonne :\n1. Score global /10\n2. 3 points forts\n3. 3 points à améliorer\n4. Un conseil clé pour le prochain appel\n\nSois précis et bienveillant.`
          }]
        }),
      })
      const data = await response.json()
      setDebrief(data.text || '')
    } catch {
      setDebrief('Impossible de générer le debrief.')
    } finally {
      setDebriefLoading(false)
    }
  }

  // ===== SÉLECTION =====
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
              onClick={() => { setSelectedScenario(scenario); setState('setup') }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#6D5EF5'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{scenario.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>{scenario.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.5 }}>{scenario.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, background: `${scenario.diffColor}15`, color: scenario.diffColor, padding: '3px 10px', borderRadius: 20 }}>{scenario.difficulty}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}><Clock size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> {scenario.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ===== SETUP =====
  if (state === 'setup') {
    return (
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '60px 28px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{selectedScenario?.icon}</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>{selectedScenario?.title}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.6 }}>{selectedScenario?.desc}</p>

        {selectedScenario?.custom && (
          <div style={{ marginBottom: 24, textAlign: 'left' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Décris ta situation</div>
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
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>💡 Comment ça marche</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            • Atlas décroche et dit bonjour — toi tu parles en premier<br />
            • Parle naturellement, la détection s'arrête automatiquement<br />
            • Atlas répond vocalement comme un vrai prospect<br />
            • Un debrief complet t'attend à la fin
          </div>
        </div>

        {/* Étapes à suivre */}
        {selectedScenario && SCENARIO_STEPS[selectedScenario.id] && (
          <div style={{ marginBottom: 28, textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>📋</span> Étapes à suivre — Méthode Eric Worre
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SCENARIO_STEPS[selectedScenario.id].map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12, padding: '12px 16px',
                  minHeight: 60,
                }}>
                  {/* Numéro */}
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6D5EF5, #22D3EE)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 800, color: 'white',
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  {/* Icône */}
                  <div style={{ fontSize: 20, flexShrink: 0, width: 28, textAlign: 'center' }}>{s.icon}</div>
                  {/* Texte */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{s.step}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => setState('selection')} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            ← Retour
          </button>
          <button onClick={startCall} style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)', border: 'none', color: 'white', borderRadius: 12, padding: '12px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 16px rgba(34,197,94,0.35)' }}>
            📞 Démarrer l'appel
          </button>
        </div>
      </div>
    )
  }

  // ===== APPEL IMMERSIF =====
  if (state === 'calling') {
    const statusLabel = {
      waiting: 'En attente...',
      listening: 'Je t\'écoute...',
      thinking: 'En réflexion...',
      speaking: 'Atlas parle...',
    }[status]

    const statusColor = {
      waiting: '#64748B',
      listening: '#22C55E',
      thinking: '#FF9600',
      speaking: '#6D5EF5',
    }[status]

    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 10,
        height: 'calc(100vh - 64px)',
        background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a1a 60%, #000000 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '40px 24px 48px',
        overflow: 'hidden',
      }}>
        <style>{`
          body { background: #000 !important; }
        `}</style>

        {/* Info appel en haut */}
        <div style={{ textAlign: 'center', zIndex: 2 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 2 }}>
            Simulation en cours
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 4 }}>
            {selectedScenario?.title}
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
            {formatTime(callDuration)}
          </div>
        </div>

        {/* Sphère animée */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <style>{`
            @keyframes spherePulse {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.08); opacity: 1; }
            }
            @keyframes sphereIdle {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.02); }
            }
            @keyframes particleFloat {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              33% { transform: translateY(-8px) rotate(120deg); }
              66% { transform: translateY(4px) rotate(240deg); }
            }
            .sphere-container {
              width: 260px;
              height: 260px;
              position: relative;
              animation: ${spherePulse ? 'spherePulse 0.6s ease-in-out infinite' : 'sphereIdle 3s ease-in-out infinite'};
            }
            .sphere-glow {
              position: absolute;
              inset: 0;
              border-radius: 50%;
              background: radial-gradient(circle at 35% 35%,
                ${status === 'speaking' ? 'rgba(109,94,245,0.6)' : status === 'listening' ? 'rgba(34,197,94,0.4)' : status === 'thinking' ? 'rgba(255,150,0,0.4)' : 'rgba(109,94,245,0.2)'},
                ${status === 'speaking' ? 'rgba(34,211,238,0.3)' : 'rgba(15,23,42,0.8)'} 70%
              );
              box-shadow: 0 0 ${spherePulse ? '80px 40px' : '40px 20px'} ${status === 'speaking' ? 'rgba(109,94,245,0.5)' : status === 'listening' ? 'rgba(34,197,94,0.3)' : 'rgba(109,94,245,0.2)'};
              transition: all 0.3s ease;
            }
          `}</style>

          <div className="sphere-container">
            <div className="sphere-glow" />
            {/* Particules */}
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i / 60) * Math.PI * 2
              const radius = 100 + Math.sin(i * 2.3) * 25
              const x = 130 + Math.cos(angle) * radius
              const y = 130 + Math.sin(angle) * radius
              const size = 1.5 + Math.random() * 2.5
              return (
                <div key={i} style={{
                  position: 'absolute',
                  left: x, top: y,
                  width: size, height: size,
                  borderRadius: '50%',
                  background: i % 3 === 0 ? '#6D5EF5' : i % 3 === 1 ? '#22D3EE' : 'rgba(255,255,255,0.8)',
                  opacity: spherePulse ? 0.9 : 0.5 + Math.sin(i) * 0.3,
                  transition: 'opacity 0.3s',
                  animation: `particleFloat ${2 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${(i * 0.05) % 2}s`,
                }} />
              )
            })}
          </div>
        </div>

        {/* Status + transcription */}
        <div style={{ textAlign: 'center', zIndex: 2, minHeight: 80 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: statusColor, marginBottom: 12, transition: 'color 0.3s' }}>
            {statusLabel}
          </div>
        </div>

        <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: 32 }}>
          {/* Micro */}
          <button
            onPointerDown={startRecording}
            onPointerUp={stopRecording}
            onPointerLeave={stopRecording}
            disabled={isSpeaking || isLoading}
            style={{
              width: 64, height: 64, borderRadius: '50%',
              background: isRecording ? '#EF4444' : 'rgba(109,94,245,0.3)',
              border: `2px solid ${isRecording ? '#EF4444' : '#6D5EF5'}`,
              color: 'white', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isRecording ? '0 0 0 10px rgba(239,68,68,0.15)' : 'none',
              transition: 'all 0.15s',
              opacity: (isSpeaking || isLoading) ? 0.4 : 1,
            }}
          >
            <Mic size={26} />
          </button>

          {/* Raccrocher */}
          <button
            onClick={endCall}
            style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#EF4444', border: 'none',
              color: 'white', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(239,68,68,0.4)',
            }}
          >
            <PhoneOff size={26} />
          </button>
        </div>
      </div>
    )
  }

  // ===== DEBRIEF =====
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 28px 60px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>Debrief de l'appel</h2>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          {selectedScenario?.title} · {formatTime(callDuration)} · {callMessages.length} échanges
        </div>
      </div>

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
          <RotateCcw size={16} /> Rejouer
        </button>
      </div>
    </div>
  )
}
