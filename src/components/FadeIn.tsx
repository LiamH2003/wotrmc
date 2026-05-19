'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.75,
  x = 0,
  y = 24,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  // once: true = isInView flips to true once and NEVER reverts — no re-hiding on scroll
  const isInView = useInView(ref, { once: true, amount: 0 })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
