'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import EmberParticles from './EmberParticles'

const TITLE = ['THE', 'WAR', 'OF', 'THE', 'RING']
const GOLD_WORDS = new Set([1, 2, 3]) // WAR OF THE

export default function Hero() {
  const [playerCount, setPlayerCount] = useState<number | null>(null)
  const [serverOnline, setServerOnline] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    fetch('/api/players')
      .then((r) => r.json())
      .then((d) => {
        setPlayerCount(d.online)
        setServerOnline(d.serverOnline)
      })
      .catch(() => {})
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        // Replace /hero.mp4 with your cinematic battle/flyover footage
      />

      {/* Fallback gradient (shown if video doesn't load) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, #1a0e04 0%, #0f0a06 30%, #0a0806 60%, #12080a 100%)',
        }}
      />

      {/* Dark cinematic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0.3) 40%, rgba(10,8,6,0.7) 80%, rgba(10,8,6,1) 100%)',
          zIndex: 2,
        }}
      />

      {/* Ember particles */}
      <EmberParticles />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(10,8,6,0.75) 100%)',
          zIndex: 6,
        }}
      />

      {/* Main content */}
      <div className="relative text-center px-6 max-w-5xl mx-auto" style={{ zIndex: 10 }}>
        {/* Top decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          className="h-px mx-auto w-56 mb-8"
          style={{ background: 'linear-gradient(to right, transparent, #c9a84c, transparent)' }}
        />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="font-cinzel text-gold/60 text-[11px] uppercase tracking-[0.35em] mb-6"
        >
          A Minecraft Server · Middle Earth
        </motion.p>

        {/* Main title — word by word */}
        <h1 className="font-cinzel-decorative font-black leading-[1.05] mb-4">
          {TITLE.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: 0.5 + i * 0.18,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block mr-3 md:mr-5 text-5xl md:text-7xl lg:text-8xl xl:text-9xl ${
                GOLD_WORDS.has(i) ? 'text-gold' : 'text-parchment'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="font-garamond italic text-parchment/50 text-xl md:text-2xl mb-2"
        >
          "One Ring to rule them all…"
        </motion.p>

        {/* Server IP */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="font-cinzel text-[11px] text-gold/50 tracking-[0.3em] uppercase mb-10"
        >
          play.wotrmc.com
        </motion.p>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.6, ease: 'easeInOut' }}
          className="h-px mx-auto w-56 mb-10"
          style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }}
        />

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Play Now button */}
          <motion.a
            whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.97 }}
            href="https://www.wotrmc.com/play"
            className="clip-skew relative px-10 py-4 bg-gold hover:bg-gold-light font-cinzel font-bold text-shadow text-sm uppercase tracking-[0.2em] transition-colors duration-300 select-none"
          >
            <span className="relative z-10">Enter Middle Earth</span>
            <div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}
            />
          </motion.a>

          {/* Player count badge */}
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2.5 px-5 py-3 border border-gold/25 bg-shadow/70 backdrop-blur-sm"
          >
            <span
              className={`w-2 h-2 rounded-full ${serverOnline ? 'bg-green-400' : 'bg-red-500'} animate-pulse`}
            />
            <span className="font-cinzel text-[11px] text-parchment/80 tracking-wider">
              {playerCount !== null ? `${playerCount} Warriors Online` : 'Server Online'}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="font-cinzel text-[9px] text-gold/40 tracking-[0.35em] uppercase">
            Scroll
          </span>
          <div
            className="w-px h-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
