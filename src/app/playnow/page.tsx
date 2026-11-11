'use client'

import { motion } from 'framer-motion'
import { Shield, Axe, Flame } from 'lucide-react'
import GameIcon from '@/components/GameIcon'
import PageHero from '@/components/PageHero'
import FadeIn from '@/components/FadeIn'
import Footer from '@/components/Footer'

const PACKS = [
  {
    name: 'Standard Pack',
    version: 'v1.3.7.13',
    description: 'A balanced selection of core mods for the classic War of the Ring experience, stable and compatible for most players.',
    tag: 'Recommended',
    tagColor: 'bg-gold text-shadow',
    servers: ['Conquest of Arda'],
    icon: Shield,
  },
  {
    name: 'Heavy Pack',
    version: 'v1.3.7.13',
    description: 'Feature-rich build with extra visual and QoL mods (for example: Not Enough Items) for a fuller singleplayer and creative experience.',
    tag: 'High-End',
    tagColor: 'bg-blue-700 text-parchment',
    servers: ['Conquest of Arda'],
    icon: Axe,
  },
  {
    name: 'Season 4 (Experimental)',
    version: 'v3 - EXP 2',
    description: 'The latest Season 4 updates and features under active testing. Expect instability. Use this pack to help test and provide feedback.',
    tag: 'Experimental',
    tagColor: 'bg-emerald-800 text-parchment',
    servers: ['Conquest of Arda'],
    icon: Flame,
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Download Technic Launcher',
    body: 'Go to technicpack.net/download and install the Technic Launcher for your operating system.',
  },
  {
    n: '02',
    title: 'Sign in to Technic',
    body: 'Open the launcher and log in with your Minecraft account so the pack can launch correctly.',
  },
  {
    n: '03',
    title: 'Find War of the Ring MC',
    body: 'In the Modpacks tab, search "War of the Ring MC" and pick the official pack for your playstyle.',
  },
  {
    n: '04',
    title: 'Install the pack',
    body: 'Click Install and wait while Technic downloads and prepares the modpack for first use.',
  },
  {
    n: '05',
    title: 'Allocate RAM',
    body: 'Open the pack settings and assign at least 6 GB of RAM. 8 GB is recommended for the best performance.',
  },
  {
    n: '06',
    title: 'Launch and join',
    body: 'You can join the server from the main menu by selecting "Join Conquest of Arda", or play singleplayer to test locally before connecting.',
  },
]

export default function PlayNowPage() {
  return (
    <main>
      <PageHero
        eyebrow="Play Now"
        title="Download, Install, and Join"
        subtitle="Use Technic Launcher to get the War of the Ring MC modpack installed, then enter Middle Earth with a single click."
        backgroundSrc="/fortress.webp"
        centerContent
        showParticles
      />

      <section className="relative py-24 bg-shadow">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">Quick Start</p>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">Technic Launcher Process</h2>
            <p className="font-garamond italic text-parchment/40 mt-3 text-lg">Follow these six steps to download the launcher, install the pack, and launch your first session.</p>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2 auto-rows-fr">
            {STEPS.map((step, index) => (
              <FadeIn key={step.n} delay={index * 0.07} y={20}>
                <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/15 bg-shadow-mid p-6 shadow-[0_0_40px_rgba(201,168,76,0.04)] transition-all duration-300 hover:border-gold/30">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/40" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/40" />

                  <div className="flex items-start gap-4 mb-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold font-cinzel text-lg font-bold">{step.n}</span>
                    <div className="flex-1">
                      <h3 className="font-cinzel text-base text-parchment uppercase tracking-[0.2em] mb-2">{step.title}</h3>
                      <p className="font-garamond text-parchment/55 leading-relaxed text-sm">{step.body}</p>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-12" delay={0.2}>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://www.technicpack.net/download"
              target="_blank"
              rel="noopener noreferrer"
              className="clip-skew inline-flex items-center justify-center px-10 py-4 bg-gold hover:bg-gold-light font-cinzel font-bold text-shadow text-sm uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold/70"
            >
              <span>Download Technic Launcher</span>
              <svg className="ml-3 h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14" stroke="#0a0806" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 6l6 6-6 6" stroke="#0a0806" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </FadeIn>
        </div>
      </section>

      <section className="relative py-24 bg-shadow-mid">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="font-cinzel text-gold/50 text-[11px] uppercase tracking-[0.35em] mb-3">Choose Your Pack</p>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">Pick the Build That Fits You</h2>
            <p className="font-garamond italic text-parchment/40 mt-3 text-lg">Choose a stable, feature-rich, or experimental pack depending on your system and whether you'd like to help test Season 4 updates.</p>
          </FadeIn>

          <div className="grid gap-5 lg:grid-cols-3">
            {PACKS.map((pack, index) => (
              <FadeIn key={pack.name} delay={index * 0.08} y={24}>
                <article className="relative rounded-3xl border border-gold/15 bg-shadow p-6 h-full hover:border-gold/30 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/40" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/40" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/40" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/40" />

                  <div className="flex items-center justify-between mb-5 gap-4">
                    <GameIcon icon={pack.icon} size={36} />
                    <span className={`font-cinzel text-[9px] px-2 py-1 uppercase tracking-[0.2em] ${pack.tagColor}`}>{pack.tag}</span>
                  </div>

                  <h3 className="font-cinzel text-xl text-parchment uppercase tracking-wider mb-2">{pack.name}</h3>
                  <p className="font-cinzel text-[10px] text-gold/40 uppercase tracking-[0.25em] mb-4">{pack.version}</p>
                  <p className="font-garamond text-parchment/55 leading-relaxed mb-6 text-sm">{pack.description}</p>

                  <div className="space-y-2">
                    {pack.servers.map((server) => (
                      <div key={server} className="flex items-center gap-2 text-parchment/70 text-sm font-cinzel">
                        <span className="h-2 w-2 rounded-full bg-gold/60 block" />
                        <span>{server}</span>
                      </div>
                    ))}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
