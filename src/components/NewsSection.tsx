'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
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

  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const leftInView = useInView(leftRef, { once: true, amount: 0 })
  const rightInView = useInView(rightRef, { once: true, amount: 0 })

  useEffect(() => {
    const id = setInterval(() => setActive((prev) => (prev + 1) % NEWS.length), 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative py-24 bg-shadow overflow-hidden">
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
        <FadeIn className="text-center mb-16">
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

        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">
          {/* News feed */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -30 }}
            animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-cinzel text-[11px] text-gold/60 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <span className="flex-1 h-px bg-gold/20" />
              War Dispatches
              <span className="flex-1 h-px bg-gold/20" />
            </h3>

            <div className="space-y-1">
              {NEWS.map((item, i) => (
                <div key={item.id} onClick={() => setActive(i)} className="cursor-pointer">
                  <motion.div
                    animate={{
                      borderLeftColor: active === i ? '#c9a84c' : 'rgba(201,168,76,0.12)',
                      backgroundColor: active === i ? 'rgba(201,168,76,0.05)' : 'transparent',
                    }}
                    transition={{ duration: 0.3 }}
                    className="border-l-2 pl-4 py-3 pr-3"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`font-cinzel text-[9px] px-2 py-0.5 uppercase tracking-wider ${CATEGORY_STYLE[item.category]}`}>
                        {item.category}
                      </span>
                      <span className="font-cinzel text-[10px] text-parchment/30">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="font-cinzel text-[13px] text-parchment/80">{item.title}</p>
                    <AnimatePresence>
                      {active === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="font-garamond text-sm text-parchment/50 mt-1.5 leading-relaxed overflow-hidden"
                        >
                          {item.body}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-6 justify-center">
              {NEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? 'bg-gold w-5' : 'bg-gold/25 w-1.5'}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 30 }}
            animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-cinzel text-[11px] text-gold/60 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <span className="flex-1 h-px bg-gold/20" />
              Next Great Battle
              <span className="flex-1 h-px bg-gold/20" />
            </h3>

            <div className="relative border border-gold/20 bg-shadow-mid p-8">
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gold/60" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-gold/60" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-gold/60" />

              <p className="font-cinzel text-[10px] text-gold/50 tracking-[0.2em] uppercase text-center mb-8 leading-relaxed">
                {EVENT_TITLE}
              </p>

              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { value: days, label: 'Days' },
                  { value: hours, label: 'Hours' },
                  { value: minutes, label: 'Min' },
                  { value: seconds, label: 'Sec' },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <div className="relative border border-gold/15 bg-shadow py-3">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={value}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="font-cinzel-decorative text-3xl md:text-4xl text-gold font-bold block"
                        >
                          {String(value).padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <div className="font-cinzel text-[9px] text-parchment/30 uppercase tracking-[0.2em] mt-1.5">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gold/10 text-center">
                <p className="font-garamond italic text-parchment/30 text-sm mb-3">
                  "The world is changed. I feel it in the water."
                </p>
                <a
                  href="https://discord.gg/wotrmc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cinzel text-[10px] text-gold/50 hover:text-gold transition-colors tracking-[0.2em] uppercase border-b border-gold/20 hover:border-gold/50 pb-px"
                >
                  Get Event Alerts on Discord →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
