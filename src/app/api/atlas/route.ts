import { NextResponse } from 'next/server'
import { getUserMemory, saveUserMemory } from '@/lib/memory'

const FLOWISE_URL = process.env.FLOWISE_URL || 'https://flowise-nsfn.srv1651221.hstgr.cloud'
const FLOWISE_FLOW_ID = process.env.FLOWISE_FLOW_ID || '141b2826-8975-4757-b621-4952a05f7be4'

export async function POST(req: Request) {
  try {
    const { message, sessionId, silent, userId } = await req.json()
    if (!message) return NextResponse.json({ error: 'Message manquant' }, { status: 400 })
    if (silent) return NextResponse.json({ ok: true })

    const memory = userId ? await getUserMemory(userId) : ''
    const questionWithContext = memory
      ? `[Contexte utilisateur : ${memory}]\n\nQuestion : ${message}`
      : message

    const flowiseResponse = await fetch(
      `${FLOWISE_URL}/api/v1/prediction/${FLOWISE_FLOW_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionWithContext,
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

    // Relayer le stream de Flowise avec parsing SSE
    if (flowiseResponse.body) {
      const reader = flowiseResponse.body.getReader()
      const decoder = new TextDecoder()
      const encoder = new TextEncoder()
      let fullResponse = ''

      const stream = new ReadableStream({
        async start(controller) {
          let buffer = ''
          while (true) {
            const { done, value } = await reader.read()
            if (done) {
              if (userId && fullResponse) {
                await saveUserMemory(userId, message, fullResponse)
              }
              controller.close()
              return
            }
            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() || ''

            for (const line of lines) {
              if (line.startsWith('data: ') || line.startsWith('data:')) {
                const data = line.replace(/^data:\s*/, '').trim()
                if (!data) continue
                try {
                  const parsed = JSON.parse(data)
                  if (parsed.event === 'token' && parsed.data) {
                    fullResponse += parsed.data
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ token: parsed.data })}\n\n`)
                    )
                  } else if (parsed.event === 'end' || parsed.data === '[DONE]') {
                    if (userId && fullResponse) {
                      await saveUserMemory(userId, message, fullResponse)
                    }
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'))
                    controller.close()
                    return
                  }
                } catch {
                  if (data && data !== '[DONE]') {
                    fullResponse += data
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ token: data })}\n\n`)
                    )
                  }
                }
              }
            }
          }
        },
      })

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
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
