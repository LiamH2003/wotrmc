'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import FadeIn from './FadeIn'

type Tab = 'warriors' | 'factions'

const PLAYERS = [
  { rank: 1, name: 'AragornKing', faction: 'Free Peoples', kills: 1847, deaths: 234, score: 15620 },
  { rank: 2, name: 'SauronEye', faction: 'Shadow', kills: 1622, deaths: 189, score: 14100 },
  { rank: 3, name: 'GandalfWhite', faction: 'Free Peoples', kills: 1441, deaths: 312, score: 11900 },
  { rank: 4, name: 'LegolasArrow', faction: 'Free Peoples', kills: 1389, deaths: 267, score: 11200 },
  { rank: 5, name: 'MorgothServant', faction: 'Shadow', kills: 1201, deaths: 445, score: 9800 },
  { rank: 6, name: 'BoromirShield', faction: 'Free Peoples', kills: 1098, deaths: 178, score: 9400 },
  { rank: 7, name: 'NazgulLord', faction: 'Shadow', kills: 1045, deaths: 389, score: 8700 },
  { rank: 8, name: 'GimliAxe', faction: 'Free Peoples', kills: 987, deaths: 201, score: 8200 },
]

const FACTIONS = [
  { rank: 1, name: 'Gondor', side: 'Free Peoples', members: 89, territories: 14, battles: 47, wins: 31 },
  { rank: 2, name: 'Mordor', side: 'Shadow', members: 102, territories: 12, battles: 43, wins: 28 },
  { rank: 3, name: 'Rohan', side: 'Free Peoples', members: 76, territories: 8, battles: 39, wins: 24 },
  { rank: 4, name: 'Isengard', side: 'Shadow', members: 84, territories: 7, battles: 35, wins: 21 },
  { rank: 5, name: 'Lothlórien', side: 'Free Peoples', members: 61, territories: 5, battles: 28, wins: 18 },
]

const RANK_COLOR = ['text-yellow-400', 'text-slate-300', 'text-amber-600']
const RANK_ICON = ['👑', '🥈', '🥉']

function TableRow({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      className="grid grid-cols-6 gap-4 px-5 py-4 border-b border-gold/5 last:border-0 hover:bg-gold/[0.03] transition-colors duration-200"
    >
      {children}
    </motion.div>
  )
}

export default function Leaderboard() {
  const [tab, setTab] = useState<Tab>('warriors')

  return (
    <section className="relative py-24 bg-shadow overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">
            Hall of Valor
          </p>
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">Leaderboard</h2>
          <div
            className="mt-5 mx-auto w-48 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }}
          />
        </FadeIn>

        <div className="flex gap-0 mb-8 border border-gold/20 w-fit mx-auto">
          {(['warriors', 'factions'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-cinzel text-[11px] uppercase tracking-[0.2em] px-8 py-3 transition-colors duration-300 ${
                tab === t ? 'bg-gold text-shadow font-bold' : 'text-parchment/50 hover:text-parchment'
              }`}
            >
              {t === 'warriors' ? 'Warriors' : 'Factions'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'warriors' ? (
            <motion.div
              key="warriors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="border border-gold/15 overflow-hidden"
            >
              <div className="grid grid-cols-6 gap-4 px-5 py-3 bg-shadow-mid border-b border-gold/10">
                {['Rank', 'Warrior', 'Faction', 'Kills', 'Deaths', 'Score'].map((h) => (
                  <div key={h} className="font-cinzel text-[9px] text-gold/40 uppercase tracking-[0.2em] text-center first:text-left">
                    {h}
                  </div>
                ))}
              </div>
              {PLAYERS.map((p, i) => (
                <TableRow key={p.name} index={i}>
                  <div className={`font-cinzel-decorative text-base font-bold ${RANK_COLOR[i] ?? 'text-parchment/30'}`}>
                    {i < 3 ? RANK_ICON[i] : `#${p.rank}`}
                  </div>
                  <div className="font-cinzel text-sm text-parchment">{p.name}</div>
                  <div className={`font-cinzel text-[10px] text-center ${p.faction === 'Free Peoples' ? 'text-blue-300' : 'text-red-400'}`}>
                    {p.faction === 'Free Peoples' ? '🤍' : '👁️'} {p.faction}
                  </div>
                  <div className="font-cinzel text-sm text-center text-ember">{p.kills.toLocaleString()}</div>
                  <div className="font-cinzel text-sm text-center text-parchment/30">{p.deaths.toLocaleString()}</div>
                  <div className="font-cinzel text-sm text-center text-gold">{p.score.toLocaleString()}</div>
                </TableRow>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="factions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="border border-gold/15 overflow-hidden"
            >
              <div className="grid grid-cols-6 gap-4 px-5 py-3 bg-shadow-mid border-b border-gold/10">
                {['Rank', 'Faction', 'Side', 'Members', 'Territories', 'Wins'].map((h) => (
                  <div key={h} className="font-cinzel text-[9px] text-gold/40 uppercase tracking-[0.2em] text-center first:text-left">
                    {h}
                  </div>
                ))}
              </div>
              {FACTIONS.map((f, i) => (
                <TableRow key={f.name} index={i}>
                  <div className={`font-cinzel-decorative text-base font-bold ${RANK_COLOR[i] ?? 'text-parchment/30'}`}>
                    {i < 3 ? RANK_ICON[i] : `#${f.rank}`}
                  </div>
                  <div className="font-cinzel text-sm text-parchment">{f.name}</div>
                  <div className={`font-cinzel text-[10px] text-center ${f.side === 'Free Peoples' ? 'text-blue-300' : 'text-red-400'}`}>
                    {f.side}
                  </div>
                  <div className="font-cinzel text-sm text-center text-parchment/60">{f.members}</div>
                  <div className="font-cinzel text-sm text-center text-gold">{f.territories}</div>
                  <div className="font-cinzel text-sm text-center text-green-400">{f.wins}</div>
                </TableRow>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
