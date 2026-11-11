import { NextResponse } from 'next/server'

export const revalidate = 60

export async function GET() {
  try {
    const res = await fetch('https://api.mcsrvstat.us/3/play.wotrmc.com', {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      console.error(`Minecraft status lookup failed with status ${res.status}`)
      return NextResponse.json({ error: 'Unable to load Minecraft server status' }, { status: 502 })
    }

    const data: {
      online?: boolean
      players?: { online?: number; max?: number }
    } = await res.json()

    if (typeof data.online !== 'boolean') {
      console.error('Minecraft status response did not include a valid online status')
      return NextResponse.json({ error: 'Minecraft server status is unavailable' }, { status: 502 })
    }

    return NextResponse.json({
      online: data.players?.online ?? 0,
      max: data.players?.max ?? 0,
      serverOnline: data.online,
    })
  } catch (error) {
    console.error('Minecraft server status lookup failed:', error)
    return NextResponse.json({ error: 'Unable to load Minecraft server status' }, { status: 502 })
  }
}
