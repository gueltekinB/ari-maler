import Image from 'next/image'
import Link from 'next/link'
import { services } from '@/data/services'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function ServicesOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeader
            subtitle="Professionell & zuverlässig"
            title="Unsere Dienstleistungen"
            description="Haben Sie eine Vision? Lassen Sie uns zusammenarbeiten, um sie Wirklichkeit werden zu lassen. Ihre persönlichen Wünsche sind bei uns in besten Händen."
          />
        </div>
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
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-navy font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                  {service.navLabel}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {service.heroSubtitle}
                </p>
                <span className="inline-block mt-4 text-sm font-semibold text-cta group-hover:underline">
                  Mehr erfahren →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
