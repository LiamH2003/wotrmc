import type { Metadata } from 'next'
import { Cinzel, Cinzel_Decorative, EB_Garamond } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import FloatingDiscord from '@/components/FloatingDiscord'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
  display: 'swap',
})

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  variable: '--font-cinzel-decorative',
  weight: ['400', '700', '900'],
  display: 'swap',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'War of the Ring MC — Battle for Middle Earth',
  description:
    'Join the War of the Ring Minecraft server. Choose your allegiance — Free Peoples or the Shadow — and fight for the fate of Middle Earth.',
  keywords: ['minecraft', 'lord of the rings', 'middle earth', 'war of the ring', 'LOTR MC', 'minecraft server'],
  openGraph: {
    title: 'War of the Ring MC',
    description: 'A Minecraft server set in Middle Earth. The war has begun.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cinzelDecorative.variable} ${ebGaramond.variable}`}
    >
      <body className="bg-shadow text-parchment font-garamond antialiased">
        <Nav />
        {children}
        <FloatingDiscord />
      </body>
    </html>
  )
}
