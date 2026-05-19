'use client'

import { useEffect, useState } from 'react'
import { CrossedSwords, Castle, Fire, Mountains } from 'react-game-icons'
import GameIcon from './GameIcon'
import { useInViewNative } from '@/hooks/useInViewNative'

const STATS = [
  { label: 'Warriors Online', value: 147, suffix: '', icon: CrossedSwords },
  { label: 'Total Players', value: 8420, suffix: '+', icon: Castle },
  { label: 'Battles Fought', value: 1337, suffix: '', icon: Fire },
  { label: 'Days of War', value: 365, suffix: '+', icon: Mountains },
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
      {current.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function ServerStatsBar() {
  const [sectionRef, isInView] = useInViewNative<HTMLElement>()

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
        {STATS.map((stat, i) => (
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
              <AnimatedNumber target={stat.value} suffix={stat.suffix} run={isInView} />
            </div>
            <div className="font-cinzel text-[10px] text-parchment/40 uppercase tracking-[0.25em] mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
