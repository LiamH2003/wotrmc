'use client'

import { useState } from 'react'
import { RallyTheTroops, Shield, WhiteTower, OpenTreasureChest } from 'react-game-icons'
import PageHero from '@/components/PageHero'
import FadeIn from '@/components/FadeIn'
import Footer from '@/components/Footer'

const FEATURES = [
  { icon: RallyTheTroops, title: 'Community Benefit', body: 'Every donation unlocks perks for the entire server within 24 hours — not just the buyer.' },
  { icon: Shield, title: 'Non Pay-to-Win', body: 'No gear, weapons, or combat advantages are sold. Purchases are purely cosmetic or quality-of-life.' },
  { icon: WhiteTower, title: 'Funds the Server', body: 'Your support keeps Middle Earth online, funds new builds, and enables future seasons.' },
  { icon: OpenTreasureChest, title: 'PrimaPacks', body: 'Special donation tiers that trigger server-wide bonuses like XP boosts, events, and loot drops.' },
]

export default function StorePage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <main>
      <PageHero
        eyebrow="Support the Realm"
        title="The Armory"
        subtitle="Your support keeps the war alive. Every contribution benefits the entire community."
      />

      {/* How it works */}
      <section className="relative py-20 bg-shadow-mid border-y border-gold/10">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">
              How It Works
            </p>
            <h2 className="font-cinzel-decorative text-3xl md:text-4xl text-parchment">
              For the Many, Not the Few
            </h2>
            <div className="mt-5 mx-auto w-48 h-px" style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }} />
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08} y={20}>
                <div className="relative border border-gold/15 bg-shadow p-5 h-full hover:border-gold/30 transition-colors duration-300 text-center">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/40" />
                  <div className="mb-3 flex justify-center">{(() => { const Icon = f.icon as any; return <Icon width={34} height={34} fill="#c9a84c" /> })()}</div>
                  <h3 className="font-cinzel text-[12px] text-parchment uppercase tracking-wider mb-2">{f.title}</h3>
                  <p className="font-garamond text-parchment/50 text-sm leading-relaxed">{f.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Store embed */}
      <section className="relative py-24 bg-shadow">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">Browse Packages</p>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">Store</h2>
            <div className="mt-5 mx-auto w-48 h-px" style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }} />
          </FadeIn>

          <FadeIn y={20}>
            <div
              className="relative"
              style={{
                minHeight: '700px',
                boxShadow: '0 0 60px rgba(201,168,76,0.08), 0 0 0 1px rgba(201,168,76,0.15)',
              }}
            >
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/50 z-10" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/50 z-10" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/50 z-10" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/50 z-10" />

              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-shadow-mid z-20" style={{ minHeight: '700px' }}>
                  <div className="w-10 h-10 rounded-full border-2 border-gold/20 border-t-gold animate-spin mb-4" />
                  <p className="font-cinzel text-[11px] text-gold/50 tracking-[0.25em] uppercase">
                    Loading Store…
                  </p>
                </div>
              )}

              <iframe
                src="https://wotrmc.buycraft.net/"
                title="War of the Ring MC Store"
                className="w-full"
                style={{ minHeight: '700px', display: 'block' }}
                loading="lazy"
                onLoad={() => setLoaded(true)}
              />
            </div>

            <div className="mt-5 flex justify-end">
              <a
                href="https://wotrmc.buycraft.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-cinzel text-[10px] text-gold/40 hover:text-gold transition-colors tracking-[0.2em] uppercase"
              >
                Open Store in New Tab ↗
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-10 bg-shadow-mid border-t border-gold/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-garamond italic text-parchment/30 text-sm">
            "Even the smallest person can change the course of the future." — All purchases support server operations and
            community events. Thank you for keeping Middle Earth alive.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
