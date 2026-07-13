import { HeroSection } from '@/components/home/HeroSection'
import { HomeBeforeAfter } from '@/components/home/HomeBeforeAfter'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { CallToAction } from '@/components/home/CallToAction'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeBeforeAfter />
      <ServicesOverview />
      <CallToAction />
    </>
  )
}
