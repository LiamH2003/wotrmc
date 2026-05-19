import Link from 'next/link'

const navLinks = ['Home', 'Play Now', 'Store', 'Info', 'Discord']

const socialLinks = [
  { name: 'Discord', href: 'https://discord.gg/wotrmc' },
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative bg-shadow border-t border-gold/10 pt-16 pb-8 overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border border-gold/40 flex items-center justify-center">
                <span className="font-cinzel-decorative text-gold text-sm font-bold">W</span>
              </div>
              <span className="font-cinzel-decorative text-parchment text-base tracking-wider">
                War of the Ring
              </span>
            </div>
            <p className="font-garamond text-parchment/40 text-sm leading-relaxed">
              A Minecraft server set in the world of Middle Earth. Choose your allegiance and
              fight for the fate of the world.
            </p>
            <div className="flex gap-4 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cinzel text-[10px] text-parchment/30 hover:text-gold transition-colors uppercase tracking-wider"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-cinzel text-[10px] text-gold/50 uppercase tracking-[0.3em] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="font-cinzel text-xs text-parchment/40 hover:text-gold transition-colors uppercase tracking-wider"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Server info */}
          <div>
            <h4 className="font-cinzel text-[10px] text-gold/50 uppercase tracking-[0.3em] mb-5">
              Connect
            </h4>
            <div className="space-y-3">
              <div>
                <span className="font-cinzel text-[10px] text-gold/40 uppercase tracking-wider block mb-0.5">
                  Server IP
                </span>
                <span className="font-cinzel text-sm text-parchment/70 select-all">
                  play.wotrmc.com
                </span>
              </div>
              <div>
                <span className="font-cinzel text-[10px] text-gold/40 uppercase tracking-wider block mb-0.5">
                  Version
                </span>
                <span className="font-cinzel text-sm text-parchment/70">1.20.x</span>
              </div>
              <div>
                <span className="font-cinzel text-[10px] text-gold/40 uppercase tracking-wider block mb-0.5">
                  Website
                </span>
                <span className="font-cinzel text-sm text-parchment/70">wotrmc.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-cinzel text-[10px] text-parchment/20 uppercase tracking-widest text-center">
            © 2026 War of the Ring MC — Not affiliated with New Line Cinema or the Tolkien Estate
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-cinzel text-[10px] text-green-500/70 uppercase tracking-wider">
              Server Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
