'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BorderedShield, BattleAxe, Campfire } from 'react-game-icons'
import GameIcon from '@/components/GameIcon'
import PageHero from '@/components/PageHero'
import FadeIn from '@/components/FadeIn'
import Footer from '@/components/Footer'

const PACKS = [
  {
    name: 'Lite Pack',
    version: 'v1.3.6.1',
    description: 'Core mods plus weather and building features (Chisel 2.0, Carpenter). Lower system requirements.',
    tag: 'Recommended',
    tagColor: 'bg-gold text-shadow',
    servers: ['Conquest of Arda', 'Middle-Earth: Reborn'],
    icon: BorderedShield,
  },
  {
    name: 'Heavy Pack',
    version: 'v1.3.6.1',
    description: 'Full-featured pack for high-end systems. Enhanced visuals and additional mods.',
    tag: 'High-End',
    tagColor: 'bg-blue-700 text-parchment',
    servers: ['Conquest of Arda', 'Middle-Earth: Reborn'],
    icon: BattleAxe,
  },
  {
    name: 'Reborn Pack',
    version: 'v1.1.5.8',
    description: 'Stripped-down pack optimised for multiplayer. Minimal lag, single server only.',
    tag: 'Low Lag',
    tagColor: 'bg-emerald-800 text-parchment',
    servers: ['Middle-Earth: Reborn'],
    icon: Campfire,
  },
]

const STEPS = [
  { n: '01', title: 'Download Technic Launcher', body: 'Visit technicpack.net and download the launcher for your OS. It handles all mod installs automatically.' },
  { n: '02', title: 'Search for the Modpack', body: 'Open Technic, click "Modpacks" and search for "War of the Ring MC". Select the pack that matches your system.' },
  { n: '03', title: 'Install & Launch', body: 'Click Install, wait for it to download, then hit Play. The launcher manages all updates.' },
  { n: '04', title: 'Connect to the Server', body: 'In Minecraft, go to Multiplayer → Add Server and enter the IP below. Select your server and play.' },
]

export default function PlayNowPage() {
  const [copied, setCopied] = useState(false)
  const ip = 'wotrmc-world1.com'

  const copyIP = () => {
    navigator.clipboard.writeText(ip).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <main>
      <PageHero
        eyebrow="Join the War"
        title="Begin Your Journey"
        subtitle="Follow these steps to enter Middle Earth and take your place in the war."
      />

      {/* Server IP */}
      <section className="relative py-16 bg-shadow-mid border-y border-gold/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="font-cinzel text-[11px] text-gold/50 tracking-[0.3em] uppercase mb-4">Server Address</p>
            <div
              className="relative border border-gold/30 bg-shadow inline-flex items-center gap-4 px-8 py-5 cursor-pointer group hover:border-gold/60 transition-all duration-300"
              onClick={copyIP}
              style={{ boxShadow: '0 0 30px rgba(201,168,76,0.06)' }}
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/60" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/60" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/60" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/60" />

              <span className="font-cinzel-decorative text-2xl md:text-3xl text-gold tracking-wider select-all">
                {ip}
              </span>

              <motion.div
                animate={copied ? { scale: [1, 1.2, 1] } : {}}
                className="ml-2"
              >
                {copied ? (
                  <span className="font-cinzel text-[10px] text-green-400 uppercase tracking-wider">Copied!</span>
                ) : (
                  <span className="font-cinzel text-[10px] text-gold/40 group-hover:text-gold/70 uppercase tracking-wider transition-colors">
                    Click to copy
                  </span>
                )}
              </motion.div>
            </div>

            <p className="font-cinzel text-[10px] text-parchment/30 uppercase tracking-wider mt-4">
              Minecraft 1.7.10 · Forge Required
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Installation steps */}
      <section className="relative py-24 bg-shadow">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">
              Method 1 · Recommended
            </p>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">
              Technic Launcher
            </h2>
            <p className="font-garamond italic text-parchment/40 mt-3 text-lg">
              Automatic updates. Easiest setup. No manual file management.
            </p>
            <div className="mt-5 mx-auto w-48 h-px" style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }} />
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            {STEPS.map((step, i) => (
              <FadeIn key={step.n} delay={i * 0.08} y={20}>
                <div
                  className="relative border border-gold/15 bg-shadow-mid p-6 hover:border-gold/30 transition-colors duration-300"
                  style={{ boxShadow: '0 0 20px rgba(201,168,76,0.03)' }}
                >
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/40" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/40" />

                  <div className="flex items-start gap-4">
                    <span className="font-cinzel-decorative text-3xl text-gold/20 font-bold leading-none shrink-0">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="font-cinzel text-sm text-parchment mb-2 uppercase tracking-wider">{step.title}</h3>
                      <p className="font-garamond text-parchment/50 text-[15px] leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-10" delay={0.3}>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="https://www.technicpack.net/download"
              target="_blank"
              rel="noopener noreferrer"
              className="clip-skew inline-block px-10 py-4 bg-gold hover:bg-gold-light font-cinzel font-bold text-shadow text-sm uppercase tracking-[0.2em] transition-colors duration-300"
            >
              Download Technic Launcher
            </motion.a>
          </FadeIn>
        </div>
      </section>

      {/* Pack selector */}
      <section className="relative py-24 bg-shadow-mid">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, #c9a84c22, transparent)' }}
        />
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">Choose Your Pack</p>
            <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">Modpack Options</h2>
            <div className="mt-5 mx-auto w-48 h-px" style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }} />
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {PACKS.map((pack, i) => (
              <FadeIn key={pack.name} delay={i * 0.1} y={24}>
                <div className="relative border border-gold/15 bg-shadow p-6 h-full flex flex-col hover:border-gold/30 transition-colors duration-300">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/40" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/40" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/40" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/40" />

                  <div className="flex items-start justify-between mb-4">
                    <GameIcon icon={pack.icon} />
                    <span className={`font-cinzel text-[9px] px-2 py-1 uppercase tracking-wider ${pack.tagColor}`}>
                      {pack.tag}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-base text-parchment uppercase tracking-wider mb-1">{pack.name}</h3>
                  <span className="font-cinzel text-[10px] text-gold/40 tracking-wider mb-3">{pack.version}</span>
                  <p className="font-garamond text-parchment/50 text-sm leading-relaxed mb-5 flex-1">{pack.description}</p>

                  <div>
                    <p className="font-cinzel text-[9px] text-gold/40 uppercase tracking-wider mb-2">Compatible Servers</p>
                    <div className="space-y-1">
                      {pack.servers.map((s) => (
                        <div key={s} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gold/50" />
                          <span className="font-cinzel text-[11px] text-parchment/60">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Manual install fallback */}
      <section className="relative py-20 bg-shadow">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="border border-gold/15 bg-shadow-mid p-8 text-center">
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold/40" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gold/40" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-gold/40" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-gold/40" />

            <h3 className="font-cinzel-decorative text-2xl text-parchment mb-3">Method 2 — Manual Install</h3>
            <p className="font-garamond text-parchment/50 text-[15px] leading-relaxed mb-6">
              Prefer manual control? Download Forge 1.7.10, then grab a pack from Dropbox and drop the mods into your
              Minecraft folder. A step-by-step Forge tutorial is available on the server Discord.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://discord.gg/wotrmc"
                target="_blank"
                rel="noopener noreferrer"
                className="font-cinzel text-[11px] uppercase tracking-[0.2em] border border-gold/30 hover:border-gold text-parchment/70 hover:text-parchment px-6 py-3 transition-all duration-300"
              >
                Get Help on Discord
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
