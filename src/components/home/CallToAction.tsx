import { Button } from '@/components/ui/Button'

export function CallToAction() {
  return (
    <section className="bg-navy py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Bereit für Ihr nächstes Projekt?
          </h2>
          <p className="text-white/75">
            Kontaktieren Sie uns für eine kostenlose Beratung und ein unverbindliches Angebot.
          </p>
          <p className="text-white font-semibold mt-2">
            <a href="tel:0797996262" className="hover:text-cta transition-colors">
              079 799 62 62
            </a>
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button href="/kontakt" variant="primary" className="text-base px-8 py-4">
            Jetzt Kontaktieren
          </Button>
        </div>
      </div>
    </section>
  )
}
