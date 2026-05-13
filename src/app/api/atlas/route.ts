import { NextResponse } from 'next/server'

const FLOWISE_URL = process.env.FLOWISE_URL || 'https://flowise-nsfn.srv1651221.hstgr.cloud'
const FLOWISE_FLOW_ID = process.env.FLOWISE_FLOW_ID || '141b2826-8975-4757-b621-4952a05f7be4'

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json()
    if (!message) return NextResponse.json({ error: 'Message manquant' }, { status: 400 })

    const flowiseResponse = await fetch(
      `${FLOWISE_URL}/api/v1/prediction/${FLOWISE_FLOW_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: message,
          sessionId: sessionId || 'default',
          streaming: true,
        }),
      }
    )

    if (!flowiseResponse.ok) {
      const errorText = await flowiseResponse.text()
      return NextResponse.json(
        { error: 'Erreur Flowise: ' + errorText },
        { status: flowiseResponse.status }
      )
    }

    // Relayer le stream de Flowise directement au client
    if (flowiseResponse.body) {
      return new Response(flowiseResponse.body, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
        },
      })
    }

    // Fallback si pas de body stream
    const data = await flowiseResponse.json()
    return NextResponse.json({ text: data.text })
  } catch (error) {
    console.error('Atlas API error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la communication avec Atlas' },
      { status: 500 }
    )
  }
}
