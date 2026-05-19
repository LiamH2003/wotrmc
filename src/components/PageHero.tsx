'use client'

import { motion } from 'framer-motion'

interface PageHeroProps {
  eyebrow: string
  title: string
  subtitle?: string
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden bg-shadow">
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.8) 40px)`,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-cinzel text-gold/60 text-[11px] tracking-[0.35em] uppercase mb-4"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-cinzel-decorative text-5xl md:text-6xl text-parchment mb-4"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="font-garamond italic text-parchment/50 text-xl max-w-xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 1.4, ease: 'easeInOut' }}
          className="h-px mx-auto w-48 mt-8"
          style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }}
        />
      </div>
    </section>
  )
}
