import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audio = formData.get('audio') as File
    if (!audio) return NextResponse.json({ error: 'No audio' }, { status: 400 })

    const apiKey = process.env.ELEVENLABS_API_KEY
    if (!apiKey) return NextResponse.json({ error: 'ElevenLabs not configured' }, { status: 500 })

    // Détecter le format
    const mimeType = audio.type || 'audio/webm'
    const ext = mimeType.includes('mp4') ? 'mp4' : 
                mimeType.includes('ogg') ? 'ogg' : 
                mimeType.includes('mp3') ? 'mp3' : 'webm'

    const elFormData = new FormData()
    elFormData.append('file', audio, `recording.${ext}`)
    elFormData.append('model_id', 'scribe_v1')
    elFormData.append('language_code', 'fr')

    const response = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
      method: 'POST',
      headers: { 'xi-api-key': apiKey },
      body: elFormData,
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('ElevenLabs STT error:', err)
      return NextResponse.json({ error: err }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json({ text: data.text })
  } catch (err) {
    console.error('STT catch:', err)
    return NextResponse.json({ error: 'STT failed' }, { status: 500 })
  }
}
