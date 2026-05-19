'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Play Now', href: '/playnow' },
  { label: 'Store', href: '/store' },
  { label: 'Info', href: '/info' },
  { label: 'Discord', href: 'https://discord.gg/wotrmc', highlight: true, external: true },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-shadow/95 backdrop-blur-md border-b border-gold/20'
          : 'bg-gradient-to-b from-shadow/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-8 h-8 border border-gold/40 group-hover:border-gold flex items-center justify-center transition-all duration-300 overflow-hidden">
            <Image
              src="/white-tree.webp"
              alt="War of the Ring"
              width={22}
              height={22}
              style={{ filter: 'invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(1.1)', mixBlendMode: 'screen' }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel-decorative text-parchment group-hover:text-gold text-sm leading-none tracking-wider transition-colors duration-300">
              War of the Ring
            </span>
            <span className="font-cinzel text-gold/50 text-[9px] tracking-[0.25em] uppercase leading-none mt-0.5">
              Minecraft Server
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map((link) =>
            link.highlight ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-cinzel text-[11px] uppercase tracking-[0.2em] border border-gold/40 hover:border-gold hover:bg-gold/10 text-parchment/80 hover:text-parchment px-4 py-1.5 transition-all duration-300"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="font-cinzel text-[11px] uppercase tracking-[0.2em] text-parchment/60 hover:text-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
            )
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 relative z-50"
          aria-label="Toggle menu"
        >
          <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="w-5 h-px bg-gold block" />
          <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} className="w-5 h-px bg-gold block" />
          <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="w-5 h-px bg-gold block" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-shadow/97 border-t border-gold/15 overflow-hidden backdrop-blur-md"
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-cinzel text-xs uppercase tracking-[0.2em] text-parchment/70 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
