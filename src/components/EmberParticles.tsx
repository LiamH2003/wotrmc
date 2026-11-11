'use client'

import { useEffect, useRef } from 'react'

interface Ember {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  color: string
}

const COLORS = ['#c9a84c', '#e8c97a', '#c0392b', '#ff7b35', '#ffe0a0']

export default function EmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const embers: Ember[] = []
    let frame = 0
    let animId: number | null = null

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const spawn = () => {
      embers.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 1.8 + 0.4),
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.55 + 0.2,
        life: 0,
        maxLife: Math.random() * 180 + 90,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    const tick = () => {
      animId = null
      if (document.visibilityState === 'hidden' || motionPreference.matches) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (frame % 4 === 0) spawn()

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i]
        e.x += e.vx + Math.sin(e.life * 0.04) * 0.4
        e.y += e.vy
        e.life++

        const t = e.life / e.maxLife
        const alpha = e.opacity * (1 - t * t)

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = e.color
        ctx.shadowColor = e.color
        ctx.shadowBlur = 5
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.size * (1 - t * 0.4), 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        if (e.life >= e.maxLife || e.y < -10) embers.splice(i, 1)
      }

      frame++
      animId = requestAnimationFrame(tick)
    }

    const start = () => {
      if (animId === null && document.visibilityState !== 'hidden' && !motionPreference.matches) {
        animId = requestAnimationFrame(tick)
      }
    }

    const stop = () => {
      if (animId !== null) cancelAnimationFrame(animId)
      animId = null
    }

    const updateAnimation = () => {
      if (document.visibilityState === 'hidden' || motionPreference.matches) stop()
      else start()
    }

    resize()
    start()
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', updateAnimation)
    motionPreference.addEventListener('change', updateAnimation)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', updateAnimation)
      motionPreference.removeEventListener('change', updateAnimation)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  )
}
