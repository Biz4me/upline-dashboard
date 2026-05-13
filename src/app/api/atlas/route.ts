import { NextResponse } from 'next/server'

const FLOWISE_URL = process.env.FLOWISE_URL || 'https://flowise-nsfn.srv1651221.hstgr.cloud'
const FLOWISE_FLOW_ID = process.env.FLOWISE_FLOW_ID || '141b2826-8975-4757-b621-4952a05f7be4'

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json()
    if (!message) return NextResponse.json({ error: 'Message manquant' }, { status: 400 })

    const response = await fetch(`${FLOWISE_URL}/api/v1/prediction/${FLOWISE_FLOW_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: message,
        sessionId: sessionId || 'default',
      }),
    })

    const data = await response.json()
    return NextResponse.json({
      text: data.text,
      sessionId: data.sessionId || data.chatId,
    })
  } catch (error) {
    console.error('Atlas API error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la communication avec Atlas' },
      { status: 500 }
    )
  }
}
