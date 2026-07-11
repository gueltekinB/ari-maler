import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Über uns',
  description:
    'Lernen Sie Ari Maler GmbH kennen – seit 2022 Ihr zuverlässiger Malerpartner in der Region Basel.',
}

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        subtitle="Seit 2022 für Sie im Einsatz"
        title="Über uns"
        description="Lernen Sie uns kennen – Ihr zuverlässiger Partner für Malerarbeiten und Sanierungen in der Region Basel."
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <SectionHeader
                subtitle="Unser Unternehmen"
                title="Ari Maler GmbH"
              />
              <p className="text-gray-600 leading-relaxed mt-4">
                Die Ari Maler GmbH wurde am 14. März 2022 gegründet mit dem Ziel, sich als zuverlässiger Malerpartner in der Region Basel zu etablieren. Was als Einzelunternehmen begann, hat sich seither zu einem kompetenten Malerbetrieb entwickelt, der für seine handwerkliche Qualität und Kundennähe bekannt ist.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Unser Angebot umfasst das gesamte Spektrum an Malerarbeiten – von der Innenraumgestaltung bis zur Fassadenrenovierung, von der Betonkosmetik bis zur Sanierung nach Brand- oder Wasserschäden.
              </p>
            </div>
            <div className="bg-off-white rounded-lg p-8 border-l-4 border-cta">
              <p className="text-5xl font-bold text-navy mb-2">2022</p>
              <p className="text-gray-600">Gründungsjahr</p>
              <hr className="my-4 border-gray-200" />
              <p className="text-navy font-semibold text-lg">Region Basel</p>
              <p className="text-gray-600 text-sm mt-1">Bottmingen & Umgebung</p>
            </div>
          </div>

          <div className="mb-20">
            <SectionHeader
              subtitle="Unser Gründer"
              title="Toylan Ari"
              description="Inhaber und Geschäftsführer"
            />
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed max-w-3xl">
              <p>
                Toylan Ari ist in Basel aufgewachsen und hat von Kindesbeinen an eine grosse Leidenschaft für das Malerhandwerk entwickelt. Nach seiner abgeschlossenen Malerausbildung und verschiedenen Weiterbildungskursen sammelte er wertvolle Erfahrung in renommierten Malerbetrieben der Region.
              </p>
              <p>
                Als verantwortlicher Leiter zahlreicher Bauprojekte erwarb er das notwendige Know-how, um anspruchsvolle Aufträge termingerecht und in höchster Qualität auszuführen. Diese Erfahrung fliesst heute direkt in die Arbeit der Ari Maler GmbH ein.
              </p>
              <p>
                Sein besonderes Fachwissen liegt im Bereich der Betonkosmetik sowie der dekorativen Wandgestaltung – zwei Disziplinen, die handwerkliches Können mit kreativem Gespür verbinden.
              </p>
            </div>
          </div>

          <div>
            <SectionHeader
              subtitle="Unsere Werte"
              title="Fleiss, Ehrgeiz und Optimismus"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: '🔨',
                  title: 'Fleiss',
                  text: 'Jeder Auftrag wird mit vollem Einsatz und Sorgfalt ausgeführt – unabhängig von der Grösse des Projekts.',
                },
                {
                  icon: '🎯',
                  title: 'Ehrgeiz',
                  text: 'Wir setzen uns hohe Ziele und geben uns nicht mit dem Mittelmas zufrieden. Qualität ist für uns keine Option, sondern ein Versprechen.',
                },
                {
                  icon: '☀️',
                  title: 'Optimismus',
                  text: 'Wir begegnen jedem Projekt mit einer positiven Einstellung und der Überzeugung, dass für jede Herausforderung eine gute Lösung existiert.',
                },
              ].map((v) => (
                <div key={v.title} className="bg-off-white rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="text-navy font-bold text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button href="/kontakt" variant="primary" className="text-base px-8 py-4">
                Kontaktieren Sie uns
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
