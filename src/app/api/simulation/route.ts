import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json()
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 150,
        system,
        messages,
      }),
    })

    const data = await response.json()
    return NextResponse.json({ text: data.content?.[0]?.text || '' })
  } catch {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
