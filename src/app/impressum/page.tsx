import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Impressum',
}

export default function ImpressumPage() {
  return (
    <>
      <PageHero title="Impressum" />
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg text-gray-700">
          <h2 className="text-navy font-bold text-xl mb-4">Unternehmensangaben</h2>
          <address className="not-italic mb-8 space-y-1">
            <p className="font-semibold">Ari Maler GmbH</p>
            <p>Therwilerstrasse 24</p>
            <p>4103 Bottmingen</p>
            <p>Schweiz</p>
            <p className="mt-3">
              <strong>Telefon:</strong>{' '}
              <a href="tel:0797996262" className="text-accent hover:underline">
                079 799 62 62
              </a>
            </p>
            <p>
              <strong>E-Mail:</strong>{' '}
              <a href="mailto:info@ari-maler.ch" className="text-accent hover:underline">
                info@ari-maler.ch
              </a>
            </p>
          </address>

          <h2 className="text-navy font-bold text-xl mb-4">Vertretungsberechtigte Person</h2>
          <p className="mb-8">Toylan Ari, Inhaber und Geschäftsführer</p>

          <h2 className="text-navy font-bold text-xl mb-4">Handelsregistereintrag</h2>
          <p className="mb-2">UID-Nummer: CHE-280.849.351</p>
          <p className="mb-8">Eingetragen im Handelsregister des Kantons Basel-Landschaft</p>

          <h2 className="text-navy font-bold text-xl mb-4">Haftungsausschluss</h2>
          <p className="mb-4 text-sm leading-relaxed">
            Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.
          </p>
          <p className="mb-8 text-sm leading-relaxed">
            Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
          </p>

          <h2 className="text-navy font-bold text-xl mb-4">Urheberrechte</h2>
          <p className="text-sm leading-relaxed">
            Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich Ari Maler GmbH oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.
          </p>
        </div>
      </section>
    </>
  )
}
