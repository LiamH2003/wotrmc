'use client'

import { useState } from 'react'
import FadeIn from './FadeIn'

const RACES = [
  {
    id: 'good-human',
    name: 'Good Human',
    side: 'Free Peoples',
    lore: 'The race of men fight for all that is good throughout Middle-Earth. They are strong willed, very diverse, and above all else desire power.',
    subTypes: [] as string[],
    factions: ['Arnor', 'Bree', 'Dorwinion', 'Gondor', 'Jinzhun', 'Lossoth', 'Mahadbar', 'Men of Anduin', 'Rhovanion', 'Rohan', 'Paraliakos', 'Taiyobu', 'Tauredain'],
    accent: '#7ba7bc',
    accentRgb: '123,167,188',
    sideClass: 'border-blue-400/25 text-blue-300/70',
    borderBase: 'rgba(123,167,188,0.18)',
    borderHover: 'rgba(123,167,188,0.55)',
    gradient: 'linear-gradient(135deg, rgba(15,30,60,0.65) 0%, rgba(10,16,36,0.4) 100%)',
    tagClass: 'border-blue-400/15 text-blue-200/55',
  },
  {
    id: 'elf',
    name: 'Elf',
    side: 'Free Peoples',
    lore: 'Elves are wise and fair immortal beings who dwell in secluded kingdoms. Once there were many of their race, now they may not linger for long…',
    subTypes: [] as string[],
    factions: ['Avari', 'Dorwinion', 'Eregion', 'Galadhrim', 'High Elves', 'Sindar', 'Woodland Realm'],
    accent: '#7dd9c0',
    accentRgb: '125,217,192',
    sideClass: 'border-teal-400/25 text-teal-300/70',
    borderBase: 'rgba(125,217,192,0.18)',
    borderHover: 'rgba(125,217,192,0.55)',
    gradient: 'linear-gradient(135deg, rgba(5,35,28,0.65) 0%, rgba(3,18,15,0.4) 100%)',
    tagClass: 'border-teal-400/15 text-teal-200/55',
  },
  {
    id: 'dwarf',
    name: 'Dwarf',
    side: 'Free Peoples',
    lore: 'Dwarves are a hardy folk who never fear a fight, but are loyal to the end. They are the greatest miners and craftsmen of Middle Earth.',
    subTypes: [] as string[],
    factions: ["Blue Mountains", "Durin's Folk", 'Erebor', 'Khazad-Dum', 'Orocarni', 'Varila Dwarves', 'Wicked Dwarves'],
    accent: '#c98a3e',
    accentRgb: '201,138,62',
    sideClass: 'border-amber-500/25 text-amber-400/70',
    borderBase: 'rgba(201,138,62,0.18)',
    borderHover: 'rgba(201,138,62,0.55)',
    gradient: 'linear-gradient(135deg, rgba(40,22,5,0.65) 0%, rgba(20,10,2,0.4) 100%)',
    tagClass: 'border-amber-500/15 text-amber-300/55',
  },
  {
    id: 'hobbit',
    name: 'Hobbit',
    side: 'Free Peoples',
    lore: 'Living in the safety of the Shire, Hobbits tend to stay out of the world of Big Folk. They love their songs, food, and all the comforts of home.',
    subTypes: [] as string[],
    factions: ['Shire', 'Buckland', 'Bree'],
    accent: '#6ab86a',
    accentRgb: '106,184,106',
    sideClass: 'border-green-400/25 text-green-300/70',
    borderBase: 'rgba(106,184,106,0.18)',
    borderHover: 'rgba(106,184,106,0.55)',
    gradient: 'linear-gradient(135deg, rgba(8,30,8,0.65) 0%, rgba(4,15,4,0.4) 100%)',
    tagClass: 'border-green-400/15 text-green-200/55',
  },
  {
    id: 'evil-human',
    name: 'Evil Human',
    side: 'Shadow',
    lore: 'These men have betrayed their kin and serve the dark powers. Fierce and formidable warriors who seek to conquer the Free Peoples and bring an age of Darkness.',
    subTypes: [] as string[],
    factions: ['Angmar', 'Cerinrim', 'Dunland', 'Gulf Pirates', 'Karavali', 'Khand', 'Limwaith', 'Morwaith', 'Southrons', 'Easterlings', 'Proshloye', 'Vsego'],
    accent: '#c0392b',
    accentRgb: '192,57,43',
    sideClass: 'border-red-700/30 text-red-400/70',
    borderBase: 'rgba(192,57,43,0.18)',
    borderHover: 'rgba(192,57,43,0.55)',
    gradient: 'linear-gradient(135deg, rgba(40,8,8,0.65) 0%, rgba(20,4,4,0.4) 100%)',
    tagClass: 'border-red-700/15 text-red-300/55',
  },
  {
    id: 'orc',
    name: 'Orc',
    side: 'Shadow',
    lore: 'Corrupted creatures twisted by the Dark Lord that serve his evil deeds. Strong in numbers though prone to infighting, united only by their hatred for all that is good.',
    subTypes: ['Orcs', 'Uruk-hai', 'Half-Trolls'],
    factions: ['Angmar', 'Dol Guldur', 'Forochel Orc', 'Gundabad', 'Mordor', 'Misty Mountains', 'Half-Troll'],
    accent: '#9b3a3a',
    accentRgb: '155,58,58',
    sideClass: 'border-red-900/35 text-red-500/70',
    borderBase: 'rgba(155,58,58,0.18)',
    borderHover: 'rgba(155,58,58,0.55)',
    gradient: 'linear-gradient(135deg, rgba(30,5,5,0.65) 0%, rgba(15,2,2,0.4) 100%)',
    tagClass: 'border-red-900/15 text-red-400/55',
  },
]

function RaceCard({ race, index }: { race: (typeof RACES)[number]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <FadeIn delay={index * 0.07} y={24}>
      <div
        className="relative overflow-hidden h-full"
        style={{
          border: `1px solid ${hovered ? race.borderHover : race.borderBase}`,
          transition: 'border-color 0.35s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background */}
        <div className="absolute inset-0" style={{ background: race.gradient }} />

        {/* Hover top glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(${race.accentRgb},0.12) 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Corner ornaments */}
        {(['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'] as const).map((pos, j) => (
          <div
            key={j}
            className={`absolute ${pos} w-4 h-4`}
            style={{
              borderColor: hovered ? race.accent : race.borderBase,
              transition: 'border-color 0.35s ease',
            }}
          />
        ))}

        <div className="relative p-6">
          {/* Header: name + side badge */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3
              className="font-cinzel-decorative text-xl font-bold leading-tight"
              style={{ color: race.accent }}
            >
              {race.name}
            </h3>
            <span className={`font-cinzel text-[8px] px-2 py-1 border uppercase tracking-wider shrink-0 mt-0.5 ${race.sideClass}`}>
              {race.side}
            </span>
          </div>

          {/* Lore */}
          <p className="font-garamond italic text-parchment/55 text-[14px] leading-relaxed mb-5">
            {race.lore}
          </p>

          {/* Sub-types — only for Orc */}
          {race.subTypes.length > 0 && (
            <div className="mb-4">
              <p className="font-cinzel text-[8px] text-parchment/30 uppercase tracking-[0.25em] mb-2">Includes</p>
              <div className="flex flex-wrap gap-1.5">
                {race.subTypes.map((s) => (
                  <span key={s} className={`font-cinzel text-[8px] px-2.5 py-1 border uppercase tracking-wider ${race.tagClass}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div
            className="h-px mb-4"
            style={{ background: `linear-gradient(to right, ${race.borderBase}, transparent)` }}
          />

          {/* Factions */}
          <p className="font-cinzel text-[8px] text-parchment/30 uppercase tracking-[0.25em] mb-2.5">Factions</p>
          <div className="flex flex-wrap gap-1.5">
            {race.factions.map((f) => (
              <span key={f} className={`font-cinzel text-[8px] px-2.5 py-1 border uppercase tracking-wider ${race.tagClass}`}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export default function FactionCards() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0a0806, #0e0c08, #0a0806)' }}
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">
            The Races of Middle Earth
          </p>
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">
            Choose Your People
          </h2>
          <p className="font-garamond italic text-parchment/35 mt-3 text-base max-w-md mx-auto">
            No matter which race you choose, you can earn Alignment with any Faction.
          </p>
          <div
            className="mt-5 mx-auto w-48 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }}
          />
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RACES.map((race, i) => (
            <RaceCard key={race.id} race={race} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
