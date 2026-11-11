import { NextResponse } from 'next/server'

export const revalidate = 300

export async function GET() {
  try {
    const response = await fetch(
      'https://discord.com/api/v10/invites/EFmMC4Dns?with_counts=true',
      { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) }
    )

    if (!response.ok) {
      console.error(`Discord invite lookup failed with status ${response.status}`)
      return NextResponse.json({ error: 'Unable to load Discord member count' }, { status: 502 })
    }

    const invite: { approximate_member_count?: number } = await response.json()
    const memberCount = invite.approximate_member_count

    if (typeof memberCount !== 'number' || !Number.isFinite(memberCount)) {
      console.error('Discord invite response did not include a valid approximate member count')
      return NextResponse.json({ error: 'Discord member count is unavailable' }, { status: 502 })
    }

    return NextResponse.json({ memberCount })
  } catch (error) {
    console.error('Discord invite lookup failed:', error)
    return NextResponse.json({ error: 'Unable to load Discord member count' }, { status: 502 })
  }
}
