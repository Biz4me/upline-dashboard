import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audio = formData.get('audio') as File
    if (!audio) return NextResponse.json({ error: 'No audio' }, { status: 400 })

    const apiKey = process.env.DEEPGRAM_API_KEY
    if (!apiKey) return NextResponse.json({ error: 'Deepgram not configured' }, { status: 500 })

    const audioBuffer = await audio.arrayBuffer()

    const response = await fetch(
      'https://api.deepgram.com/v1/listen?language=fr&model=nova-2&punctuate=true&smart_format=true',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': audio.type || 'audio/webm',
        },
        body: audioBuffer,
      }
    )

    if (!response.ok) {
      const err = await response.text()
      console.error('Deepgram error:', err)
      return NextResponse.json({ error: err }, { status: 500 })
    }

    const data = await response.json()
    const text = data.results?.channels?.[0]?.alternatives?.[0]?.transcript || ''
    return NextResponse.json({ text })

  } catch (err) {
    console.error('STT error:', err)
    return NextResponse.json({ error: 'STT failed' }, { status: 500 })
  }
}
