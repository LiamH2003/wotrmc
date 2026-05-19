'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CrossedSwords, TreasureMap, Crown, ScrollUnfurled, LinkedRings, FireRing } from 'react-game-icons'
import GameIcon from '@/components/GameIcon'
import PageHero from '@/components/PageHero'
import FadeIn from '@/components/FadeIn'
import Footer from '@/components/Footer'

const WORLD_STATS = [
  { value: '1,638,400', unit: 'm²', label: 'World Size' },
  { value: '300+', unit: '', label: 'Unlockable Titles' },
  { value: '200', unit: '', label: 'Gear Pieces' },
  { value: '150', unit: '', label: 'Roles to Earn' },
]

const FAMOUS_BUILDS = [
  { name: 'Minas Tirith', faction: 'Gondor', desc: 'The White City, seat of the Stewards of Gondor.' },
  { name: "Helm's Deep", faction: 'Rohan', desc: 'The fortress of the Hornburg, scene of the greatest siege.' },
  { name: "Barad-dûr", faction: 'Shadow', desc: 'The Dark Tower of Sauron, looming over the plains of Gorgoroth.' },
  { name: 'Rivendell', faction: 'Elves', desc: "The Last Homely House, refuge of the Elves in the western lands." },
  { name: 'Erebor', faction: 'Dwarves', desc: 'The Lonely Mountain — home of the Dwarves and their vast treasure halls.' },
  { name: 'The Shire', faction: 'Hobbits', desc: 'Rolling green hills and hobbit-holes — peaceful, if you can hold it.' },
]

const ACTIVITIES = [
  { icon: CrossedSwords, title: 'Siege Warfare', desc: 'Organize your faction, raise Troops, and launch coordinated sieges against rival Seats.' },
  { icon: TreasureMap, title: 'Dungeon Exploration', desc: 'Venture into hidden dungeons to find Artifacts, Legendary Weapons, and the Rings of Power.' },
  { icon: Crown, title: 'Kingdom Building', desc: 'Found a Seat, recruit residents, and build your own corner of Middle Earth.' },
  { icon: ScrollUnfurled, title: 'Quest System', desc: 'Complete lore-driven quests that earn Renown and unlock exclusive titles and roles.' },
  { icon: LinkedRings, title: 'Political Alliances', desc: 'Forge treaties, declare war, and navigate the shifting politics of Middle Earth.' },
  { icon: FireRing, title: 'One Ring Quest', desc: 'A special server-wide quest chain tied to the fate of the One Ring itself.' },
]

const FAQ = [
  { q: 'Is the server pay-to-win?', a: "No. All purchases through the store (PrimaPacks) benefit the entire community — there are no pay-to-win items, gear advantages, or purchased combat abilities." },
  { q: 'What Minecraft version do I need?', a: "The server runs on Minecraft 1.7.10 with Forge. Download the modpack via the Technic Launcher for the easiest setup — visit the Play Now page for a step-by-step guide." },
  { q: 'How does the Renown system work?', a: "You earn Renown through daily logins, completing quests, winning battles, and general gameplay. Renown unlocks titles, gear, roles, and rank advancement." },
  { q: 'What are Seats?', a: "Seats are player-founded territories with a hierarchy: Mayor, Deputy, Council Members, and Residents. Seat owners can raise Troops and launch sieges against rival Seats." },
  { q: 'How do I find Rings of Power?', a: "Rings of Power and Legendary Weapons are hidden throughout the world in dungeons and secret locations. Finding them requires exploration and often teamwork." },
]

export default function InfoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main>
      <PageHero
        eyebrow="The Lore of Middle Earth"
        title="Server Info"
        subtitle="Everything you need to know about the world, systems, and community of War of the Ring MC."
      />

      {/* World stats */}
      <section className="relative py-16 bg-shadow-mid border-y border-gold/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {WORLD_STATS.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08} className="text-center">
                <div className="font-cinzel-decorative text-3xl md:text-4xl text-gold font-bold">
                  {s.value}<span className="text-gold/50 text-xl">{s.unit}</span>
                </div>
                <div className="font-cinzel text-[10px] text-parchment/40 uppercase tracking-[0.25em] mt-2">{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* World overview */}
      <section className="relative py-24 bg-shadow">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">The World</p>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">Famous Locations</h2>
            <p className="font-garamond italic text-parchment/40 mt-3 text-lg max-w-lg mx-auto">
              Notable locations from the LOTR films and books, painstakingly recreated across 1.6 million square metres.
            </p>
            <div className="mt-5 mx-auto w-48 h-px" style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }} />
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FAMOUS_BUILDS.map((b, i) => (
              <FadeIn key={b.name} delay={i * 0.07} y={20}>
                <div className="relative border border-gold/15 bg-shadow-mid p-5 hover:border-gold/30 transition-colors duration-300 h-full">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/40" />
                  <div className="font-cinzel text-[10px] text-gold/50 uppercase tracking-wider mb-1">{b.faction}</div>
                  <h3 className="font-cinzel text-base text-parchment mb-2">{b.name}</h3>
                  <p className="font-garamond text-parchment/50 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Renown system */}
      <section className="relative py-24 bg-shadow-mid">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #c9a84c22, transparent)' }} />
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn x={-30} y={0}>
              <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">Progression</p>
              <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment mb-5">The Renown System</h2>
              <p className="font-garamond text-parchment/60 text-[15px] leading-relaxed mb-6">
                Renown is the currency of reputation in Middle Earth. Earn it through daily logins, quests, battles, and
                exploration. The more you play, the more you unlock — with over 300 titles, 200 gear pieces, and 150
                unique roles to discover.
              </p>
              <p className="font-garamond text-parchment/50 text-[15px] leading-relaxed">
                Race alignment affects how you earn Renown and which titles are available to you. Choose your race wisely
                — it shapes your entire journey.
              </p>
            </FadeIn>

            <FadeIn x={30} y={0}>
              <div className="space-y-3">
                {[
                  { label: 'Titles', count: '300+', bar: 90, color: 'bg-gold' },
                  { label: 'Gear Pieces', count: '200', bar: 70, color: 'bg-blue-500' },
                  { label: 'Roles', count: '150', bar: 55, color: 'bg-purple-600' },
                  { label: 'Races', count: '10+', bar: 40, color: 'bg-emerald-600' },
                ].map((item) => (
                  <div key={item.label} className="border border-gold/15 bg-shadow p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-cinzel text-[11px] text-parchment/70 uppercase tracking-wider">{item.label}</span>
                      <span className="font-cinzel-decorative text-lg text-gold">{item.count}</span>
                    </div>
                    <div className="h-1 bg-gold/10 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.bar}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #c9a84c22, transparent)' }} />
      </section>

      {/* Activities */}
      <section className="relative py-24 bg-shadow">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">What To Do</p>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">Gameplay Systems</h2>
            <div className="mt-5 mx-auto w-48 h-px" style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }} />
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACTIVITIES.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.07} y={20}>
                <div className="relative border border-gold/15 bg-shadow-mid p-6 hover:border-gold/30 transition-colors duration-300 h-full group">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/30 group-hover:border-gold/60 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/30 group-hover:border-gold/60 transition-colors" />
                  <div className="mb-3"><GameIcon icon={a.icon} /></div>
                  <h3 className="font-cinzel text-[13px] text-parchment uppercase tracking-wider mb-2">{a.title}</h3>
                  <p className="font-garamond text-parchment/50 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 bg-shadow-mid">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #c9a84c22, transparent)' }} />
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">Common Questions</p>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">FAQ</h2>
            <div className="mt-5 mx-auto w-48 h-px" style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }} />
          </FadeIn>

          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05} y={12}>
                <div className="border border-gold/15 overflow-hidden hover:border-gold/25 transition-colors duration-300">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  >
                    <span className="font-cinzel text-[13px] text-parchment/80 uppercase tracking-wider">{item.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-gold text-xl shrink-0 leading-none"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="font-garamond text-parchment/50 text-[15px] leading-relaxed px-6 pb-5">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Community links */}
      <section className="relative py-20 bg-shadow">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-4">Join the Community</p>
            <h2 className="font-cinzel-decorative text-3xl text-parchment mb-8">Find Us Online</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'Discord', href: 'https://discord.gg/wotrmc' },
                { label: 'Facebook', href: 'https://www.facebook.com/WoTRmc' },
                { label: 'Instagram', href: 'https://www.instagram.com/wotrmc' },
                { label: 'Wiki', href: 'https://wotrmc.wiki' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cinzel text-[11px] uppercase tracking-[0.2em] border border-gold/30 hover:border-gold hover:bg-gold/10 text-parchment/70 hover:text-parchment px-6 py-3 transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
