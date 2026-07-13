import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <p className="text-cta text-sm font-semibold uppercase tracking-widest mb-3">
          Fehler 404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          Diese Seite gibt es nicht (mehr)
        </h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          Möglicherweise wurde die Seite verschoben oder existiert nicht mehr. Nutzen Sie einen der
          folgenden Links, um weiterzukommen.
        </p>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Button href="/" variant="primary">
            Zur Startseite
          </Button>
          <Link href="/dienstleistungen" className="text-navy font-semibold hover:underline">
            Dienstleistungen ansehen
          </Link>
        </div>
      </div>
    </section>
  )
}
