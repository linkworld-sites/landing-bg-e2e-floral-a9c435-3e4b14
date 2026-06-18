import Loader from '@/components/sections/Loader'
import Hero from '@/components/sections/Hero'
import EthosStrip from '@/components/sections/EthosStrip'
import CollectionGrid from '@/components/sections/CollectionGrid'
import CraftProcess from '@/components/sections/CraftProcess'
import Workshop from '@/components/sections/Workshop'
import Testimonials from '@/components/sections/Testimonials'
import ShippingBar from '@/components/sections/ShippingBar'
import Newsletter from '@/components/sections/Newsletter'

export default function Home() {
  return (
    <main>
      <Loader />
      <Hero />
      <EthosStrip />
      <CollectionGrid />
      <CraftProcess />
      <Workshop />
      <Testimonials />
      <ShippingBar />
      <Newsletter />
    </main>
  )
}
