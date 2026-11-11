'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInViewNative } from '@/hooks/useInViewNative'
import FadeIn from './FadeIn'

interface NewsItem {
  id: number
  date: string
  category: 'Battle' | 'Update' | 'Event' | 'Lore'
  title: string
  body: string
  image: string
  details: string
}

const NEWS: NewsItem[] = [
  {
    id: 1,
    date: '2026-05-18',
    category: 'Battle',
    title: 'The Battle of Pelennor Fields',
    body: 'The Free Peoples mounted a decisive assault on Morgul Vale. 84 warriors clashed in an epic 3-hour siege with Gondor claiming victory.',
    image: '/fortress.webp',
    details: 'A pivotal moment in Season III. Free Peoples forces coordinated a multi-pronged assault, breaching the Morgul defenses and securing valuable territory gains.',
  },
  {
    id: 2,
    date: '2026-05-15',
    category: 'Update',
    title: 'Season III: Rise of Sauron',
    body: 'New custom weapons, the rebuilt Mordor biome, and the Dark Tower of Barad-dûr with fully operational siege mechanics.',
    image: '/ruins.webp',
    details: 'Major season update featuring expanded Mordor infrastructure, new weapon tiers, and enhanced siege systems for faction warfare.',
  },
  {
    id: 3,
    date: '2026-05-12',
    category: 'Event',
    title: 'The White Council Convenes',
    body: 'Leaders of the Free Peoples gathered at Rivendell to plan the next offensive. Alliances forged and territories divided among factions.',
    image: '/fortress.webp',
    details: 'Server-wide diplomatic event where faction leaders negotiated boundaries, trade routes, and military cooperation agreements.',
  },
  {
    id: 4,
    date: '2026-05-10',
    category: 'Battle',
    title: "Helm's Deep Falls",
    body: 'Shadow forces overwhelmed the Hornburg in a 2-hour assault. Rohan retreats east to regroup behind the Entwash.',
    image: '/ruins.webp',
    details: 'Intense 50-player server battle with coordinated siege tactics. Shadow forces executed a successful breakthrough, claiming the strategic fortress.',
  },
  {
    id: 5,
    date: '2026-05-07',
    category: 'Lore',
    title: 'New Faction: Dead Men of Dunharrow',
    body: 'Oath-sworn spectral warriors join the Free Peoples with unique phasing abilities that allow them to pass through Shadow fortifications.',
    image: '/fortress.webp',
    details: 'Exclusive faction for Free Peoples with ghostly mechanics. Phasing ability bypasses walls but reduces combat effectiveness by 20 percent.',
  },
  {
    id: 6,
    date: '2026-05-04',
    category: 'Battle',
    title: 'Siege of Minas Morgul',
    body: 'Shadow forces held the Morgul Vale against a sustained Free Peoples assault. The Nazgûl rallied the defence and the city stands.',
    image: '/ruins.webp',
    details: 'Epic 72-hour siege event. Shadow forces successfully repelled three major assaults using coordinated defensive formations.',
  },
  {
    id: 7,
    date: '2026-05-01',
    category: 'Event',
    title: 'The Shire Moot',
    body: 'Hobbit players gathered in Michel Delving for the first inter-faction summit of the season. Trade agreements and non-aggression pacts were signed.',
    image: '/fortress.webp',
    details: 'Unprecedented peace talks between neutral traders. Economic agreements established new trade routes and favorable tax conditions.',
  },
  {
    id: 8,
    date: '2026-04-28',
    category: 'Update',
    title: "Shelob's Lair Dungeon Live",
    body: "A new dungeon deep in Cirith Ungol that requires torches and a full party. Rare Elven thread and the Phial of Galadriel await those who survive.",
    image: '/ruins.webp',
    details: 'Level 45+ endgame dungeon. Unique item drops and cosmetics available for successful completion. 10 player party recommended.',
  },
  {
    id: 9,
    date: '2026-04-24',
    category: 'Battle',
    title: 'Rohirrim Ride at Dawn',
    body: 'A combined Rohan and Gondor cavalry charge broke the Shadow siege at Pelargir. 120 players participated in the largest land battle of Season III.',
    image: '/fortress.webp',
    details: 'Historic server event with record player participation. Coordinated cavalry tactics broke Shadow lines and liberated Pelargir permanently.',
  },
  {
    id: 10,
    date: '2026-04-20',
    category: 'Lore',
    title: 'The One Ring Changes Hands',
    body: 'After weeks of pursuit across Rhûn, the One Ring quest item was seized by a lone Orc scout. The Eye now turns toward Rivendell.',
    image: '/ruins.webp',
    details: 'Ongoing server narrative where player actions drive lore. Current ring holder pursued by rival factions seeking to claim the artifact.',
  },
  {
    id: 11,
    date: '2026-04-17',
    category: 'Update',
    title: 'Renown System Overhaul',
    body: 'Daily login streaks now grant bonus Renown. New tier called Loremaster unlocks at 5,000 Renown with access to three exclusive titles.',
    image: '/fortress.webp',
    details: 'Updated progression system rewards consistent play. Loremaster tier grants special cosmetics and faction prestige bonuses.',
  },
  {
    id: 12,
    date: '2026-04-13',
    category: 'Event',
    title: 'Festival of Durin\'s Day',
    body: 'Dwarven players celebrated Durin\'s Day with a server-wide mining event. Top contributors earned the Stonecrown title and Mithril ingots.',
    image: '/ruins.webp',
    details: 'Seasonal celebration featuring mining competitions and exclusive cosmetic rewards. Faction-wide participation bonuses applied.',
  },
]

const CATEGORY_STYLE: Record<NewsItem['category'], string> = {
  Battle: 'bg-ember/80 text-parchment',
  Update: 'bg-gold text-shadow',
  Event: 'bg-blue-700/90 text-parchment',
  Lore: 'bg-purple-800/90 text-parchment',
}

export default function NewsSection() {
  const [active, setActive] = useState(0)
  const activeItem = NEWS[active]

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
                style={{ height: '480px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(201,168,76,0.25) transparent' }}
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

          {/* ── Right: Selected Dispatch with Image ── */}
          <div
            ref={rightRef}
            className="relative border border-gold/20 bg-shadow-mid flex flex-col justify-between"
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

            <div className="p-7 flex flex-col h-full">
              {/* Panel header */}
              <p className="font-cinzel text-[11px] text-gold/50 tracking-[0.35em] uppercase mb-1">
                Next Great Battle
              </p>
              <div
                className="h-px mb-6"
                style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }}
              />

              {/* Selected dispatch content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col flex-1"
                >
                  {/* Category badge */}
                  <div className="mb-4">
                    <span className={`font-cinzel text-[8px] px-2 py-0.5 uppercase tracking-wider inline-block ${CATEGORY_STYLE[activeItem.category]}`}>
                      {activeItem.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-cinzel text-lg text-parchment mb-4 uppercase tracking-wider">
                    {activeItem.title}
                  </h3>

                  {/* Image */}
                  <div className="relative w-full h-40 mb-5 overflow-hidden border border-gold/15">
                    <Image
                      src={activeItem.image}
                      alt={activeItem.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-shadow-mid opacity-60" />
                  </div>

                  {/* Body text */}
                  <p className="font-garamond text-parchment/60 text-sm mb-3 leading-relaxed">
                    {activeItem.body}
                  </p>

                  {/* Details section */}
                  <div className="mt-auto pt-4 border-t border-gold/15">
                    <p className="font-cinzel text-[9px] text-gold/50 uppercase tracking-[0.25em] mb-2">
                      Dispatch Details
                    </p>
                    <p className="font-garamond text-parchment/50 text-xs leading-relaxed">
                      {activeItem.details}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-gold/10 text-center">
                    <a
                      href="https://discord.gg/wotrmc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-cinzel text-[10px] text-gold/45 hover:text-gold transition-colors tracking-[0.2em] uppercase border-b border-gold/20 hover:border-gold/50 pb-px"
                    >
                      Get Updates on Discord →
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
