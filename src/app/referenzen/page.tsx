import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider'
import { CallToAction } from '@/components/home/CallToAction'
import { beforeAfter, homeFeaturedIds } from '@/data/beforeAfter'

export const metadata: Metadata = {
  title: 'Referenzen',
  description:
    'Einblick in unsere Referenzen – überzeugen Sie sich von der Qualität unserer Malerarbeiten und Sanierungen.',
}

export default function ReferenzenPage() {
  return (
    <>
      <PageHero
        subtitle="Weil Bilder mehr als tausend Worte sagen"
        title="Referenzen"
        description="Nachfolgend erhalten Sie Einblick in unsere Referenzen. Lassen Sie sich von unserer Expertise überzeugen!"
      />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-8 text-center">
            Vorher &amp; Nachher
          </h2>
          <div className="divide-y divide-gray-200">
            {beforeAfter
              .filter((item) => !homeFeaturedIds.includes(item.id))
              .map((item, index) => (
                <div key={item.id} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center py-12 first:pt-0 last:pb-0">
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <BeforeAfterSlider before={item.before} after={item.after} />
                  </div>
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <h3 className="text-xl sm:text-2xl font-bold text-navy mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
