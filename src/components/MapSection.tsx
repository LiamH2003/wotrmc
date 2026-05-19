'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

const REGIONS = [
  { name: 'The Shire', faction: 'Hobbits', color: 'text-green-400' },
  { name: 'Minas Tirith', faction: 'Gondor', color: 'text-blue-300' },
  { name: "Barad-dûr", faction: 'Shadow', color: 'text-ember' },
  { name: "Helm's Deep", faction: 'Rohan', color: 'text-amber-400' },
  { name: 'Rivendell', faction: 'Elves', color: 'text-teal-300' },
  { name: 'Erebor', faction: 'Dwarves', color: 'text-yellow-500' },
]

export default function MapSection() {
  return (
    <section className="relative py-24 bg-shadow-mid overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #c9a84c22, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">
            Explore the World
          </p>
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">
            Middle Earth
          </h2>
          <p className="font-garamond italic text-parchment/40 mt-3 text-lg">
            1,638,400 m² of hand-crafted world — every region a battlefield.
          </p>
          <div
            className="mt-5 mx-auto w-48 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }}
          />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Map image */}
          <FadeIn x={-30} y={0}>
            <div
              className="relative"
              style={{
                boxShadow: '0 0 80px rgba(201,168,76,0.1), 0 0 0 1px rgba(201,168,76,0.2)',
              }}
            >
              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/60 z-10" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/60 z-10" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/60 z-10" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/60 z-10" />

              <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
                <Image
                  src="/map.webp"
                  alt="Middle Earth map"
                  fill
                  className="object-cover"
                  quality={85}
                />
                {/* Dark vignette overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(10,8,6,0.6) 100%)',
                  }}
                />
                {/* Subtle gold tint */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'rgba(201,168,76,0.04)', mixBlendMode: 'overlay' }}
                />
              </div>

              {/* Animated scan line */}
              <motion.div
                className="absolute left-0 right-0 h-px pointer-events-none z-10"
                style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)' }}
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </FadeIn>

          {/* Right side — region list + CTA */}
          <FadeIn x={30} y={0}>
            <div className="space-y-8">
              <div>
                <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-4">
                  Key Territories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {REGIONS.map((r, i) => (
                    <motion.div
                      key={r.name}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.5 }}
                      className="flex items-center gap-2.5 border border-gold/10 bg-shadow px-3 py-2.5 hover:border-gold/25 transition-colors duration-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-gold/60 shrink-0" />
                      <div>
                        <p className="font-cinzel text-[12px] text-parchment/80">{r.name}</p>
                        <p className={`font-cinzel text-[9px] uppercase tracking-wider ${r.color}`}>{r.faction}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="border border-gold/15 bg-shadow p-5">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40" />
                <p className="font-cinzel text-[11px] text-gold/50 uppercase tracking-[0.2em] mb-2">Live Map</p>
                <p className="font-garamond text-parchment/50 text-sm leading-relaxed mb-4">
                  Watch battles unfold across the realm in real time. Every Seat, every siege — visible from above.
                </p>
                <a
                  href="https://map.wotrmc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-cinzel text-[11px] uppercase tracking-[0.2em] border border-gold/40 hover:border-gold hover:bg-gold/10 text-parchment/70 hover:text-parchment px-5 py-2.5 transition-all duration-300"
                >
                  Open Live Map ↗
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #c9a84c22, transparent)' }}
      />
    </section>
  )
}
