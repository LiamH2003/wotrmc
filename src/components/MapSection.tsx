'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

export default function MapSection() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section className="relative py-24 bg-shadow-mid overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #c9a84c22, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">
            Explore the World
          </p>
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">
            Middle Earth — Live
          </h2>
          <p className="font-garamond italic text-parchment/40 mt-3 text-lg">
            Watch battles unfold across the realm in real time.
          </p>
          <div
            className="mt-5 mx-auto w-48 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }}
          />
        </FadeIn>

        <FadeIn y={20}>
          <div
            className="relative"
            style={{
              aspectRatio: '16/9',
              boxShadow: '0 0 60px rgba(201,168,76,0.08), 0 0 0 1px rgba(201,168,76,0.15)',
            }}
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/50 z-10" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/50 z-10" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/50 z-10" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/50 z-10" />

            {!loaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-shadow-mid z-20">
                <div className="w-10 h-10 rounded-full border-2 border-gold/20 border-t-gold animate-spin mb-4" />
                <p className="font-cinzel text-[11px] text-gold/50 tracking-[0.25em] uppercase">
                  Loading Middle Earth…
                </p>
              </div>
            )}

            <iframe
              src="https://map.wotrmc.com"
              title="Middle Earth Live Map"
              className="w-full h-full"
              loading="lazy"
              onLoad={() => setLoaded(true)}
            />
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-cinzel text-[10px] text-parchment/30 uppercase tracking-wider">Live Map</span>
            </div>
            <a
              href="https://map.wotrmc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cinzel text-[10px] text-gold/40 hover:text-gold transition-colors tracking-[0.2em] uppercase"
            >
              Open Fullscreen ↗
            </a>
          </div>
        </FadeIn>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #c9a84c22, transparent)' }}
      />
    </section>
  )
}
