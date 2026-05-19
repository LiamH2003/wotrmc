'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeIn from './FadeIn'

const SHOTS = [
  { id: 1, label: "The Battle of Helm's Deep", category: 'Battle', gradient: 'from-slate-900 via-blue-950 to-slate-800' },
  { id: 2, label: 'Rivendell at Dawn', category: 'Landscape', gradient: 'from-emerald-950 via-teal-900 to-green-950' },
  { id: 3, label: 'The Eye of Sauron', category: 'Lore', gradient: 'from-red-950 via-orange-950 to-stone-900' },
  { id: 4, label: 'Minas Tirith Siege', category: 'Battle', gradient: 'from-zinc-900 via-slate-800 to-stone-900' },
  { id: 5, label: 'The Shire at Sunset', category: 'Landscape', gradient: 'from-yellow-950 via-amber-900 to-green-950' },
  { id: 6, label: 'Mordor Wasteland', category: 'Landscape', gradient: 'from-stone-950 via-red-950 to-zinc-900' },
  { id: 7, label: 'Riders of Rohan', category: 'Battle', gradient: 'from-amber-950 via-orange-900 to-yellow-950' },
  { id: 8, label: 'Lothlórien Forest', category: 'Landscape', gradient: 'from-emerald-900 via-green-900 to-teal-950' },
  { id: 9, label: 'Barad-dûr at Dusk', category: 'Lore', gradient: 'from-gray-950 via-zinc-900 to-red-950' },
]

const CATEGORY_COLOR: Record<string, string> = {
  Battle: 'text-ember',
  Landscape: 'text-green-400',
  Lore: 'text-purple-400',
}

function GalleryItem({ shot, index }: { shot: (typeof SHOTS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
      className="group relative flex-shrink-0 w-72 md:w-[360px] overflow-hidden select-none"
      style={{
        aspectRatio: '16/9',
        scrollSnapAlign: 'center',
        border: '1px solid rgba(201,168,76,0.08)',
      }}
    >
      {/* Replace with: <img src={`/gallery/${shot.id}.jpg`} alt={shot.label} className="absolute inset-0 w-full h-full object-cover" /> */}
      <div className={`absolute inset-0 bg-gradient-to-br ${shot.gradient}`} />

      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0 bg-shadow/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <span className={`font-cinzel text-[9px] uppercase tracking-wider mb-1 ${CATEGORY_COLOR[shot.category] ?? 'text-gold'}`}>
          {shot.category}
        </span>
        <span className="font-cinzel text-sm text-parchment">{shot.label}</span>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 p-3 group-hover:opacity-0 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(10,8,6,0.8), transparent)' }}
      >
        <p className="font-cinzel text-[10px] text-parchment/50">{shot.label}</p>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative py-24 bg-shadow-mid overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #c9a84c22, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <p className="font-cinzel text-gold/50 text-[11px] tracking-[0.35em] uppercase mb-3">
            Visions of War
          </p>
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-parchment">Gallery</h2>
          <p className="font-garamond italic text-parchment/40 mt-3 text-lg max-w-lg mx-auto">
            Screenshots from the battlefield — add your own to{' '}
            <span className="text-gold/60">public/gallery/</span>
          </p>
          <div
            className="mt-5 mx-auto w-48 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #c9a84c55, transparent)' }}
          />
        </FadeIn>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, #141008, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, #141008, transparent)' }} />

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 px-12 gallery-scroll"
        style={{ scrollSnapType: 'x mandatory', cursor: 'grab' }}
        onMouseDown={(e) => {
          const el = scrollRef.current
          if (!el) return
          const startX = e.pageX - el.offsetLeft
          const scrollLeft = el.scrollLeft
          const onMove = (me: MouseEvent) => { el.scrollLeft = scrollLeft - (me.pageX - el.offsetLeft - startX) }
          const onUp = () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onUp)
            el.style.cursor = 'grab'
          }
          el.style.cursor = 'grabbing'
          window.addEventListener('mousemove', onMove)
          window.addEventListener('mouseup', onUp)
        }}
      >
        {SHOTS.map((shot, i) => (
          <GalleryItem key={shot.id} shot={shot} index={i} />
        ))}
      </div>

      <p className="text-center font-cinzel text-[9px] text-parchment/20 uppercase tracking-[0.3em] mt-5">
        Drag to explore · Add screenshots to /public/gallery/
      </p>
    </section>
  )
}
