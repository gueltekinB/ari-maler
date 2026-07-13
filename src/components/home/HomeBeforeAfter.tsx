import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider'
import { beforeAfter, homeFeaturedIds } from '@/data/beforeAfter'

export function HomeBeforeAfter() {
  const featured = homeFeaturedIds
    .map((id) => beforeAfter.find((item) => item.id === id))
    .filter((item): item is (typeof beforeAfter)[number] => Boolean(item))

  return (
    <section className="py-20 bg-gray-100 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeader
            subtitle="Vorher & Nachher"
            title="Unsere Arbeit spricht für sich"
            description="Ein Blick auf einige unserer Projekte – ziehen Sie den Regler, um die Verwandlung zu sehen."
            center
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((item) => (
            <BeforeAfterSlider key={item.id} before={item.before} after={item.after} title={item.title} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/referenzen" variant="primary">
            Alle Referenzen ansehen
          </Button>
        </div>
      </div>
    </section>
  )
}
