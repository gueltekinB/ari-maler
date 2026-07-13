import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Nehmen Sie Kontakt mit Ari Maler GmbH auf – wir freuen uns auf Ihre Anfrage.',
  alternates: { canonical: '/kontakt' },
}

export default function KontaktPage() {
  return (
    <>
      <PageHero
        subtitle="Haben Sie Fragen oder sind Sie an unseren Dienstleistungen interessiert?"
        title="Kontakt"
        description="Verwenden Sie das untenstehende Formular, um uns eine direkte Nachricht zu senden oder eine gezielte Angebotsanfrage zu stellen. Wir werden uns umgehend bei Ihnen melden."
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <ContactInfo />
            </div>
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold text-navy mb-6">Nachricht senden</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
