import { Service } from '@/data/services'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CallToAction } from '@/components/home/CallToAction'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

export function ServicePageLayout({ service }: { service: Service }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Dienstleistungen', path: '/dienstleistungen' },
          { name: service.navLabel, path: `/dienstleistungen/${service.slug}` },
        ]}
      />
      <PageHero
        subtitle={service.heroSubtitle}
        title={service.title}
        bgImage={service.images[0]}
      />

      {service.offerings.map((offering, i) => (
        <section
          key={i}
          className={`py-16 md:py-20 ${i > 0 ? 'border-t border-gray-100' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'
            }`}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col md:flex-row gap-10 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <SectionHeader title={offering.title} />
                <p className="text-gray-600 leading-relaxed mt-2">{offering.description}</p>
              </div>
              <div className="flex-1 w-full">
                <div className="relative aspect-[3/2] rounded-lg overflow-hidden shadow-md">
                  <img
                    src={service.images[i + 1] ?? service.images[0]}
                    alt={offering.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      <CallToAction />
    </>
  )
}
