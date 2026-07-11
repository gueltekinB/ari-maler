import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { services } from '@/data/services'
import { PageHero } from '@/components/ui/PageHero'
import { CallToAction } from '@/components/home/CallToAction'

export const metadata: Metadata = {
  title: 'Dienstleistungen',
  description:
    'Professionelle Malerarbeiten und Sanierungen: Innenmalerei, Aussenmalerei, Betonkosmetik, Dekorationsarbeiten und mehr.',
}

export default function DienstleistungenPage() {
  return (
    <>
      <PageHero
        subtitle="Professionell & zuverlässig"
        title="Dienstleistungen"
        description="Haben Sie eine Vision? Lassen Sie uns zusammenarbeiten, um sie Wirklichkeit werden zu lassen. Ihre persönlichen Wünsche sind bei uns in besten Händen."
      />

      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/dienstleistungen/${service.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={service.images[0]}
                    alt={service.navLabel}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-navy font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                    {service.navLabel}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.heroSubtitle}</p>
                  <span className="inline-block mt-4 text-sm font-semibold text-cta group-hover:underline">
                    Mehr erfahren →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
