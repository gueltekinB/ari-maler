import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <Image
        src="/images/hero/pinsel.webp"
        alt="Ari Maler GmbH – Professionelle Malerarbeiten"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-navy/65" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <p className="text-cta text-sm font-semibold uppercase tracking-widest mb-4">
          Ihr Experte für Malerarbeiten und Sanierungen aus der Region
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Willkommen bei<br />Ari Maler GmbH
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10">
          Wir stehen Ihnen mit unserer Expertise im Bereich Malerarbeiten und Sanierungen zur Seite. Ob Innen- oder Aussenmalerei, Betonkosmetik oder Brand- und Wasserschadensanierung – wir bieten Ihnen ein umfassendes Leistungsspektrum mit höchsten Qualitätsstandards.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/dienstleistungen" variant="primary">
            Unsere Dienstleistungen
          </Button>
          <Button href="/kontakt" variant="outline">
            Kontaktieren Sie uns
          </Button>
        </div>
      </div>
    </section>
  )
}
