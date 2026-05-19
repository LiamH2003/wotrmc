import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8c97a',
          dark: '#8b6914',
        },
        shadow: {
          DEFAULT: '#0a0806',
          mid: '#141008',
          light: '#1e160a',
        },
        ember: {
          DEFAULT: '#c0392b',
          dark: '#7b1f1a',
        },
        parchment: '#f0deb4',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'Georgia', 'serif'],
        'cinzel-decorative': ['var(--font-cinzel-decorative)', 'Georgia', 'serif'],
        garamond: ['var(--font-garamond)', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'flicker': 'flicker 4s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
          '75%': { opacity: '0.95' },
        },
      },
      backgroundImage: {
        'gold-radial': 'radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}

export default config
