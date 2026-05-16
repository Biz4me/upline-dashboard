import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audio = formData.get('audio') as File
    if (!audio) return NextResponse.json({ error: 'No audio' }, { status: 400 })

    const apiKey = process.env.ELEVENLABS_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'ElevenLabs not configured' }, { status: 500 })
    }

    const elFormData = new FormData()
    elFormData.append('file', audio, 'recording.webm')
    elFormData.append('model_id', 'scribe_v1')
    elFormData.append('language_code', 'fr')

    const response = await fetch(
      'https://api.elevenlabs.io/v1/speech-to-text',
      {
        method: 'POST',
        headers: { 'xi-api-key': apiKey },
        body: elFormData,
      }
    )

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ error: err }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json({ text: data.text })
  } catch {
    return NextResponse.json({ error: 'STT failed' }, { status: 500 })
  }
}
