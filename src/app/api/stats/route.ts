import { NextResponse } from 'next/server'

export async function GET() {
  // Replace with real database queries
  return NextResponse.json({
    playersOnline: 147,
    totalPlayers: 8420,
    battlesFought: 1337,
    daysOnline: 365,
  })
}
