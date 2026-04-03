import { HeroSection } from '@/components/home/HeroSection'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { CallToAction } from '@/components/home/CallToAction'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <CallToAction />
    </>
  )
}
