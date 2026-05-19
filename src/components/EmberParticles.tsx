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

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const embers: Ember[] = []
    let frame = 0
    let animId: number

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
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn rate: every 2 frames
      if (frame % 2 === 0) spawn()

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
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.size * (1 - t * 0.4), 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        if (e.life >= e.maxLife || e.y < -10) embers.splice(i, 1)
      }

      frame++
      animId = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
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
