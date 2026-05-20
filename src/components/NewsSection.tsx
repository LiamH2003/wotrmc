'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInViewNative } from '@/hooks/useInViewNative'
import FadeIn from './FadeIn'

interface NewsItem {
  id: number
  date: string
  category: 'Battle' | 'Update' | 'Event' | 'Lore'
  title: string
  body: string
}

const NEWS: NewsItem[] = [
  {
    id: 1,
    date: '2026-05-18',
    category: 'Battle',
    title: 'The Battle of Pelennor Fields',
    body: 'The Free Peoples mounted a decisive assault on Morgul Vale. 84 warriors clashed in an epic 3-hour siege — Gondor claims victory.',
  },
  {
    id: 2,
    date: '2026-05-15',
    category: 'Update',
    title: 'Season III: Rise of Sauron',
    body: 'New custom weapons, the rebuilt Mordor biome, and the Dark Tower of Barad-dûr with fully operational siege mechanics.',
  },
  {
    id: 3,
    date: '2026-05-12',
    category: 'Event',
    title: 'The White Council Convenes',
    body: "Leaders of the Free Peoples gathered at Rivendell to plan the next offensive. Alliances forged, territories divided.",
  },
  {
    id: 4,
    date: '2026-05-10',
    category: 'Battle',
    title: "Helm's Deep Falls",
    body: 'Shadow forces overwhelmed the Hornburg in a 2-hour assault. Rohan retreats east to regroup behind the Entwash.',
  },
  {
    id: 5,
    date: '2026-05-07',
    category: 'Lore',
    title: 'New Faction: Dead Men of Dunharrow',
    body: 'Oath-sworn spectral warriors join the Free Peoples. Unique phasing abilities allow them to pass through Shadow fortifications.',
  },
  {
    id: 6,
    date: '2026-05-04',
    category: 'Battle',
    title: 'Siege of Minas Morgul',
    body: 'Shadow forces held the Morgul Vale against a sustained Free Peoples assault. The Nazgûl rallied the defence — the city stands.',
  },
  {
    id: 7,
    date: '2026-05-01',
    category: 'Event',
    title: 'The Shire Moot',
    body: 'Hobbit players gathered in Michel Delving for the first inter-faction summit of the season. Trade agreements and non-aggression pacts signed.',
  },
  {
    id: 8,
    date: '2026-04-28',
    category: 'Update',
    title: "Shelob's Lair Dungeon Live",
    body: "A new dungeon deep in Cirith Ungol — bring torches and a full party. Rare Elven thread and the Phial of Galadriel await those who survive.",
  },
  {
    id: 9,
    date: '2026-04-24',
    category: 'Battle',
    title: 'Rohirrim Ride at Dawn',
    body: 'A combined Rohan–Gondor cavalry charge broke the Shadow siege at Pelargir. 120 players participated — the largest land battle of Season III.',
  },
  {
    id: 10,
    date: '2026-04-20',
    category: 'Lore',
    title: 'The One Ring Changes Hands',
    body: 'After weeks of pursuit across Rhûn, the One Ring quest item was seized by a lone Orc scout. The Eye now turns toward Rivendell.',
  },
  {
    id: 11,
    date: '2026-04-17',
    category: 'Update',
    title: 'Renown System Overhaul',
    body: 'Daily login streaks now grant bonus Renown. New tier — Loremaster — unlocked at 5,000 Renown with access to three exclusive titles.',
  },
  {
    id: 12,
    date: '2026-04-13',
    category: 'Event',
    title: 'Festival of Durin\'s Day',
    body: 'Dwarven players celebrated Durin\'s Day with a server-wide mining event. Top contributors earned the Stonecrown title and Mithril ingots.',
  },
]

const CATEGORY_STYLE: Record<NewsItem['category'], string> = {
  Battle: 'bg-ember/80 text-parchment',
  Update: 'bg-gold text-shadow',
  Event: 'bg-blue-700/90 text-parchment',
  Lore: 'bg-purple-800/90 text-parchment',
}

const EVENT_DATE = new Date('2026-06-21T20:00:00')
const EVENT_TITLE = 'The Battle for Middle Earth — Season IV Launch'

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

export default function NewsSection() {
  const [active, setActive] = useState(0)
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE)

  const [leftRef, leftInView] = useInViewNative<HTMLDivElement>()
  const [rightRef, rightInView] = useInViewNative<HTMLDivElement>()

  return (
    <section className="relative py-24 bg-shadow overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 39px,
            rgba(201,168,76,0.8) 39px, rgba(201,168,76,0.8) 40px
          )`,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">
            Chronicles of Middle Earth
          </p>
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">
            The War Rages On
          </h2>
          <div
            className="mt-5 mx-auto w-48 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }}
          />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6 items-stretch">

          {/* ── Left: News feed ── */}
          <div
            ref={leftRef}
            className="relative border border-gold/20 bg-shadow-mid flex flex-col"
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? 'none' : 'translateX(-30px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              boxShadow: '0 0 30px rgba(201,168,76,0.04)',
            }}
          >
            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold/50" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gold/50" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-gold/50" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-gold/50" />

            <div className="p-7 flex flex-col flex-1">
              {/* Panel header */}
              <p className="font-cinzel text-[11px] text-gold/50 tracking-[0.35em] uppercase mb-1">
                War Dispatches
              </p>
              <div
                className="h-px mb-6"
                style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }}
              />

              {/* News items — fixed height, internal scroll */}
              <div
                className="overflow-y-auto space-y-px pr-1"
                style={{ height: '320px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(201,168,76,0.25) transparent' }}
              >
                {NEWS.map((item, i) => (
                  <div key={item.id} onClick={() => setActive(i)} className="cursor-pointer">
                    <motion.div
                      animate={{
                        borderLeftColor: active === i ? '#c9a84c' : 'rgba(201,168,76,0.1)',
                        backgroundColor: active === i ? 'rgba(201,168,76,0.04)' : 'transparent',
                      }}
                      transition={{ duration: 0.25 }}
                      className="border-l-2 pl-4 py-3.5 pr-3 hover:bg-gold/[0.03] transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`font-cinzel text-[8px] px-2 py-0.5 uppercase tracking-wider ${CATEGORY_STYLE[item.category]}`}>
                          {item.category}
                        </span>
                        <span className="font-cinzel text-[10px] text-parchment/30">
                          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}
                        </span>
                      </div>
                      <p className="font-cinzel text-[12px] text-parchment/75 leading-snug">{item.title}</p>
                      <AnimatePresence>
                        {active === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="font-garamond text-sm text-parchment/45 mt-2 leading-relaxed overflow-hidden"
                          >
                            {item.body}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Scroll hint */}
              <div className="mt-4 pt-4 border-t border-gold/10 flex items-center justify-center gap-2">
                <div className="h-px flex-1 bg-gold/10" />
                <p className="font-cinzel text-[8px] text-gold/30 uppercase tracking-[0.25em]">Scroll for more</p>
                <div className="h-px flex-1 bg-gold/10" />
              </div>
            </div>
          </div>

          {/* ── Right: Countdown ── */}
          <div
            ref={rightRef}
            className="relative border border-gold/20 bg-shadow-mid flex flex-col justify-center"
            style={{
              opacity: rightInView ? 1 : 0,
              transform: rightInView ? 'none' : 'translateX(30px)',
              transition: 'opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease',
              boxShadow: '0 0 30px rgba(201,168,76,0.04)',
            }}
          >
            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold/50" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gold/50" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-gold/50" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-gold/50" />

            <div className="p-7">
              {/* Panel header */}
              <p className="font-cinzel text-[11px] text-gold/50 tracking-[0.35em] uppercase mb-1">
                Next Great Battle
              </p>
              <div
                className="h-px mb-8"
                style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }}
              />

              {/* Event name */}
              <p className="font-cinzel text-[10px] text-gold/45 tracking-[0.18em] uppercase text-center mb-8 leading-relaxed px-2">
                {EVENT_TITLE}
              </p>

              {/* Countdown digits */}
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { value: days, label: 'Days' },
                  { value: hours, label: 'Hours' },
                  { value: minutes, label: 'Min' },
                  { value: seconds, label: 'Sec' },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <div className="relative border border-gold/15 bg-shadow py-3.5">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={value}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                          className="font-cinzel-decorative text-3xl md:text-4xl text-gold font-bold block"
                        >
                          {String(value).padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <div className="font-cinzel text-[9px] text-parchment/30 uppercase tracking-[0.2em] mt-2">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gold/10 text-center">
                <p className="font-garamond italic text-parchment/30 text-sm mb-3">
                  "The world is changed. I feel it in the water."
                </p>
                <a
                  href="https://discord.gg/wotrmc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cinzel text-[10px] text-gold/45 hover:text-gold transition-colors tracking-[0.2em] uppercase border-b border-gold/20 hover:border-gold/50 pb-px"
                >
                  Get Event Alerts on Discord →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
