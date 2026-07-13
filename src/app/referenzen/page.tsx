import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider'
import { CallToAction } from '@/components/home/CallToAction'
import { beforeAfter } from '@/data/beforeAfter'

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfter.map((item) => (
              <BeforeAfterSlider key={item.id} before={item.before} after={item.after} title={item.title} />
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}
