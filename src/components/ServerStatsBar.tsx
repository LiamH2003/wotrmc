'use client'

import { useEffect, useState } from 'react'
import { Swords, UsersRound, Flag, CalendarDays } from 'lucide-react'
import GameIcon from './GameIcon'
import { useInViewNative } from '@/hooks/useInViewNative'

const PROJECT_START_YEAR = 2018

const STATS = [
  { label: 'Warriors Online', value: null, suffix: '', icon: Swords },
  { label: 'Warriors Enlisted', value: null, suffix: '+', icon: UsersRound },
  { label: 'Factions', value: 56, suffix: '', icon: Flag },
  { label: 'Years Active', value: null, suffix: '', icon: CalendarDays },
]

function AnimatedNumber({ target, suffix, run }: { target: number; suffix: string; run: boolean }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!run) return
    let startTime: number | null = null
    const duration = 2200
    const step = (ts: number) => {
      if (startTime === null) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [run, target])

  return (
    <span>
      {current.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

export default function ServerStatsBar() {
  const [sectionRef, isInView] = useInViewNative<HTMLElement>()
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null)
  const [playerCountUnavailable, setPlayerCountUnavailable] = useState(false)
  const [discordMembers, setDiscordMembers] = useState<number | null>(null)
  const [discordCountUnavailable, setDiscordCountUnavailable] = useState(false)
  const [projectYears, setProjectYears] = useState<number | null>(null)

  useEffect(() => {
    let timeout: number

    const updateProjectYears = () => {
      const now = new Date()
      setProjectYears(
        now.getFullYear() - PROJECT_START_YEAR + (now.getMonth() === 11 ? 1 : 0),
      )

      const nextDecember = new Date(
        now.getFullYear() + (now.getMonth() === 11 ? 1 : 0),
        11,
        1,
      )
      timeout = window.setTimeout(updateProjectYears, nextDecember.getTime() - now.getTime())
    }

    updateProjectYears()
    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    let controller: AbortController | undefined

    const loadPlayerCount = async () => {
      controller?.abort()
      const requestController = new AbortController()
      controller = requestController

      try {
        const response = await fetch('/api/players', { signal: requestController.signal })
        if (!response.ok) throw new Error(`Minecraft player count request failed (${response.status})`)

        const data: { online?: number } = await response.json()
        if (typeof data.online !== 'number' || !Number.isFinite(data.online)) {
          throw new Error('Minecraft player count response was invalid')
        }

        setOnlinePlayers(data.online)
        setPlayerCountUnavailable(false)
      } catch (error: unknown) {
        if (requestController.signal.aborted) return
        console.error('Unable to load Minecraft player count:', error)
        setPlayerCountUnavailable(true)
      }
    }

    void loadPlayerCount()
    const interval = window.setInterval(() => void loadPlayerCount(), 60_000)

    return () => {
      window.clearInterval(interval)
      controller?.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/discord', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Discord member count request failed (${response.status})`)
        const data: { memberCount?: number } = await response.json()
        if (typeof data.memberCount !== 'number' || !Number.isFinite(data.memberCount)) {
          throw new Error('Discord member count response was invalid')
        }
        setDiscordMembers(data.memberCount)
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.error('Unable to load Discord member count:', error)
        setDiscordCountUnavailable(true)
      })

    return () => controller.abort()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-shadow-mid border-y border-gold/15 py-10 overflow-hidden"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #c9a84c44, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #c9a84c44, transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat, i) => {
          const isPlayerCount = stat.label === 'Warriors Online'
          const isEnlistedCount = stat.label === 'Warriors Enlisted'
          const value = stat.value ?? (
            isPlayerCount ? onlinePlayers : isEnlistedCount ? discordMembers : projectYears
          )
          const countUnavailable = isPlayerCount
            ? playerCountUnavailable
            : isEnlistedCount && discordCountUnavailable

          return (
            <div
              key={stat.label}
              className="text-center"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'none' : 'translateY(20px)',
                transition: `opacity 0.7s ${i * 0.1}s ease, transform 0.7s ${i * 0.1}s ease`,
              }}
            >
              <div className="mb-3 flex justify-center">
                <GameIcon icon={stat.icon} size={32} />
              </div>
              <div className="font-cinzel-decorative text-3xl md:text-4xl text-gold font-bold">
                {value !== null && isPlayerCount ? (
                  <span>{value.toLocaleString('en-US')}{stat.suffix}</span>
                ) : value !== null ? (
                  <AnimatedNumber target={value} suffix={stat.suffix} run={isInView} />
                ) : (
                  <span aria-live="polite">{countUnavailable ? 'Unavailable' : '—'}</span>
                )}
              </div>
              <div className="font-cinzel text-[10px] text-parchment/40 uppercase tracking-[0.25em] mt-2">
                {stat.label}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
