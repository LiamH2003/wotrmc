'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { label: 'Warriors Online', value: 147, suffix: '', icon: '⚔️' },
  { label: 'Total Players', value: 8420, suffix: '+', icon: '🏰' },
  { label: 'Battles Fought', value: 1337, suffix: '', icon: '🔥' },
  { label: 'Days of War', value: 365, suffix: '+', icon: '🌍' },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0 })

  useEffect(() => {
    if (!isInView) return
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
  }, [isInView, target])

  return (
    <span ref={ref}>
      {current.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function ServerStatsBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0 })

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8 }}
      className="relative bg-shadow-mid border-y border-gold/15 py-10 overflow-hidden"
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
          <StatCard key={stat.label} stat={stat} index={i} parentInView={isInView} />
        ))}
      </div>
    </motion.section>
  )
}

function StatCard({
  stat,
  index,
  parentInView,
}: {
  stat: (typeof STATS)[number]
  index: number
  parentInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={parentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.7 }}
      className="text-center"
    >
      <div className="text-3xl mb-3 select-none">{stat.icon}</div>
      <div className="font-cinzel-decorative text-3xl md:text-4xl text-gold font-bold">
        <AnimatedNumber target={stat.value} suffix={stat.suffix} />
      </div>
      <div className="font-cinzel text-[10px] text-parchment/40 uppercase tracking-[0.25em] mt-2">
        {stat.label}
      </div>
    </motion.div>
  )
}
