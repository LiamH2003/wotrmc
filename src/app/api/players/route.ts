import { NextResponse } from 'next/server'

export const revalidate = 60

export async function GET() {
  try {
    const res = await fetch('https://api.mcsrvstat.us/3/play.wotrmc.com', {
      next: { revalidate: 60 },
    })
    const data = await res.json()
    return NextResponse.json({
      online: data.players?.online ?? 0,
      max: data.players?.max ?? 0,
      serverOnline: data.online ?? false,
    })
  } catch {
    return NextResponse.json({ online: 0, max: 0, serverOnline: false })
  }
}
