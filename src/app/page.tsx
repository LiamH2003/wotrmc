import Hero from '@/components/Hero'
import ServerStatsBar from '@/components/ServerStatsBar'
import NewsSection from '@/components/NewsSection'
import FactionCards from '@/components/FactionCards'
import MapSection from '@/components/MapSection'
import Leaderboard from '@/components/Leaderboard'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <ServerStatsBar />
      <NewsSection />
      <FactionCards />
      <MapSection />
      <Leaderboard />
      <Gallery />
      <Footer />
    </main>
  )
}
