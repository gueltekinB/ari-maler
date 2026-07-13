import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider'
import { CallToAction } from '@/components/home/CallToAction'
import { beforeAfter, homeFeaturedIds } from '@/data/beforeAfter'

export const metadata: Metadata = {
  title: 'Referenzen',
  description:
    'Einblick in unsere Referenzen – überzeugen Sie sich von der Qualität unserer Malerarbeiten und Sanierungen.',
  alternates: { canonical: '/referenzen' },
}

export default function ReferenzenPage() {
  return (
    <>
      <PageHero
        subtitle="Weil Bilder mehr als tausend Worte sagen"
        title="Referenzen"
        description="Nachfolgend erhalten Sie Einblick in unsere Referenzen. Lassen Sie sich von unserer Expertise überzeugen!"
      />
      {beforeAfter
        .filter((item) => !homeFeaturedIds.includes(item.id))
        .map((item, index) => (
          <section
            key={item.id}
            className={`py-16 md:py-20 border-t border-gray-100 first:border-t-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
              }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <BeforeAfterSlider before={item.before} after={item.after} />
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <h3 className="text-xl sm:text-2xl font-bold text-navy mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          </section>
        ))}
      <CallToAction />
    </>
  )
}
