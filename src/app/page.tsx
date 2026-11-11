import Hero from '@/components/Hero'
import ServerStatsBar from '@/components/ServerStatsBar'
import NewsSection from '@/components/NewsSection'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <ServerStatsBar />
      <NewsSection />
      <Gallery />
      <Footer />
    </main>
  )
}
