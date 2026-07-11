import { Service } from '@/data/services'
import { PageHero } from '@/components/ui/PageHero'
import { ServiceImageGallery } from '@/components/services/ServiceImageGallery'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { CallToAction } from '@/components/home/CallToAction'

export function ServicePageLayout({ service }: { service: Service }) {
  return (
    <>
      <PageHero
        subtitle={service.heroSubtitle}
        title={service.title}
        bgImage={service.images[0]}
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-600 leading-relaxed mb-16 max-w-3xl">
            {service.description}
          </p>

          <div className="space-y-16">
            {service.offerings.map((offering, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row gap-10 items-center ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <SectionHeader title={offering.title} />
                  <p className="text-gray-600 leading-relaxed mt-2 mb-6">{offering.description}</p>
                  <Button href="/kontakt" variant="primary">
                    Jetzt Kontaktieren
                  </Button>
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
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Einblicke"
            title="Unsere Referenzen"
            description="Überzeugen Sie sich selbst von der Qualität unserer Arbeit."
          />
          <div className="mt-10">
            <ServiceImageGallery images={service.images} title={service.title} />
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
