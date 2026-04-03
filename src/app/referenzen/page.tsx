import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { CallToAction } from '@/components/home/CallToAction'

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
      <section className="py-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid />
        </div>
      </section>
      <CallToAction />
    </>
  )
}
