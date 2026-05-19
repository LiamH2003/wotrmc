'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInViewNative } from '@/hooks/useInViewNative'
import FadeIn from './FadeIn'

const FACTIONS = [
  {
    id: 'free',
    name: 'The Free Peoples',
    tagline: 'For Frodo. For the Shire.',
    lore: 'Gondor, Rohan, the Elves of Lothlórien, and the Dwarves of Erebor stand united against the rising shadow. Take up arms in defense of all that is good and fair in Middle Earth.',
    races: ['Gondor', 'Rohan', 'Elves', 'Dwarves', 'Hobbits'],
    players: 312,
    accent: '#7ba7bc',
    accentDim: 'rgba(123,167,188,0.15)',
    borderBase: 'rgba(123,167,188,0.2)',
    borderHover: 'rgba(123,167,188,0.6)',
    badgeClass: 'border-blue-400/20 text-blue-300',
    btnClass: 'bg-blue-700 hover:bg-blue-600',
    gradient: 'linear-gradient(135deg, rgba(15,30,60,0.7) 0%, rgba(10,16,36,0.5) 100%)',
  },
  {
    id: 'shadow',
    name: 'The Shadow',
    tagline: 'One Ring to rule them all.',
    lore: "The armies of Mordor, Isengard, and the Haradrim march to cover all lands in darkness. Serve the Dark Lord Sauron and bring Middle Earth to its knees beneath the Eye.",
    races: ['Orcs', 'Uruk-hai', 'Haradrim', 'Nazgûl', 'Trolls'],
    players: 289,
    accent: '#c0392b',
    accentDim: 'rgba(192,57,43,0.15)',
    borderBase: 'rgba(192,57,43,0.2)',
    borderHover: 'rgba(192,57,43,0.6)',
    badgeClass: 'border-red-700/30 text-red-400',
    btnClass: 'bg-ember hover:bg-red-700',
    gradient: 'linear-gradient(135deg, rgba(40,8,8,0.7) 0%, rgba(20,5,5,0.5) 100%)',
  },
]

export default function FactionCards() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [card1Ref, card1InView] = useInViewNative<HTMLDivElement>()
  const [card2Ref, card2InView] = useInViewNative<HTMLDivElement>()
  const inViews = [card1InView, card2InView]
  const cardRefs = [card1Ref, card2Ref]

  return (
    <section className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, #0a0806, #0e0c08, #0a0806)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">
            Choose Your Allegiance
          </p>
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">
            Two Sides, One War
          </h2>
          <div
            className="mt-5 mx-auto w-48 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }}
          />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {FACTIONS.map((faction, i) => (
            <div
              key={faction.id}
              ref={cardRefs[i]}
              onMouseEnter={() => setHovered(faction.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative group cursor-pointer overflow-hidden"
              style={{
                border: `1px solid ${hovered === faction.id ? faction.borderHover : faction.borderBase}`,
                opacity: inViews[i] ? 1 : 0,
                transform: inViews[i] ? 'none' : `translateX(${i === 0 ? -40 : 40}px)`,
                transition: `opacity 0.9s ${i * 0.1}s cubic-bezier(0.22,1,0.36,1), transform 0.9s ${i * 0.1}s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease`,
              }}
            >
              <div className="absolute inset-0 transition-opacity duration-500" style={{ background: faction.gradient }} />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${faction.accentDim} 0%, transparent 70%)`,
                  opacity: hovered === faction.id ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              />

              {[
                'absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2',
                'absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2',
                'absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2',
                'absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2',
              ].map((cls, j) => (
                <div
                  key={j}
                  className={cls}
                  style={{
                    borderColor: hovered === faction.id ? faction.accent : faction.borderBase,
                    transition: 'border-color 0.3s ease',
                  }}
                />
              ))}

              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-cinzel-decorative text-2xl md:text-3xl font-bold" style={{ color: faction.accent }}>
                      {faction.name}
                    </h3>
                    <p className="font-garamond italic text-parchment/40 text-sm mt-1">{faction.tagline}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="font-cinzel-decorative text-2xl font-bold" style={{ color: faction.accent }}>
                      {faction.players}
                    </div>
                    <div className="font-cinzel text-[9px] text-parchment/30 uppercase tracking-wider">Warriors</div>
                  </div>
                </div>

                <p className="font-garamond text-parchment/60 mb-6 leading-relaxed text-[15px]">{faction.lore}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {faction.races.map((race) => (
                    <span key={race} className={`font-cinzel text-[9px] px-3 py-1 border uppercase tracking-wider ${faction.badgeClass}`}>
                      {race}
                    </span>
                  ))}
                </div>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="/playnow"
                  className={`block w-full text-center ${faction.btnClass} text-parchment font-cinzel text-[11px] py-3.5 uppercase tracking-[0.25em] transition-colors duration-300`}
                >
                  Pledge to {faction.name.split(' ').pop()}
                </motion.a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center -mt-3 relative z-10">
          <div
            className="w-12 h-12 flex items-center justify-center border border-gold/30 bg-shadow"
            style={{ boxShadow: '0 0 24px rgba(201,168,76,0.15)' }}
          >
            <span className="font-cinzel-decorative text-gold text-sm font-bold">VS</span>
          </div>
        </div>
      </div>
    </section>
  )
}
