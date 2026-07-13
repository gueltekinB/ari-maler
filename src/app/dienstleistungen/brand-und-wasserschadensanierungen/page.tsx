import { services } from '@/data/services'
import { ServicePageLayout } from '@/components/services/ServicePageLayout'
import type { Metadata } from 'next'

const slug = 'brand-und-wasserschadensanierungen'
const service = services.find((s) => s.slug === slug)!

export const metadata: Metadata = {
  title: service.navLabel,
  description: service.heroSubtitle,
  alternates: { canonical: `/dienstleistungen/${slug}` },
}

export default function Page() {
  return <ServicePageLayout service={service} />
}
