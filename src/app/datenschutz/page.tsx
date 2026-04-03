import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
}

export default function DatenschutzPage() {
  return (
    <>
      <PageHero title="Datenschutzerklärung" />
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 text-sm leading-relaxed space-y-8">
          <p className="text-gray-500 italic">Zuletzt aktualisiert: April 2026</p>

          <div>
            <h2 className="text-navy font-bold text-xl mb-3">1. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenbearbeitung auf dieser Website ist:<br />
              <strong>Ari Maler GmbH</strong><br />
              Therwilerstrasse 24, 4103 Bottmingen<br />
              E-Mail: info@ari-maler.ch<br />
              Telefon: 079 799 62 62
            </p>
          </div>

          <div>
            <h2 className="text-navy font-bold text-xl mb-3">2. Datenerfassung auf dieser Website</h2>
            <h3 className="font-semibold text-navy mb-2">Kontaktformular</h3>
            <p>
              Wenn Sie uns über das Kontaktformular eine Nachricht senden, werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, Telefonnummer, Betreff und Nachrichtentext) zur Bearbeitung Ihrer Anfrage erhoben und gespeichert. Diese Daten werden nicht ohne Ihre Einwilligung an Dritte weitergegeben. Die Übertragung erfolgt über den E-Mail-Versanddienst Resend (Resend Inc., USA) unter Einhaltung angemessener Datenschutzstandards.
            </p>
            <h3 className="font-semibold text-navy mb-2 mt-4">Server-Logfiles</h3>
            <p>
              Der Hostingdienst dieser Website (Vercel Inc., USA) erhebt automatisch Informationen, die Ihr Browser übermittelt. Dazu gehören Browsertyp, Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners und Uhrzeit der Serveranfrage. Diese Daten sind nicht bestimmten Personen zuordenbar und werden nicht mit anderen Datenquellen zusammengeführt.
            </p>
          </div>

          <div>
            <h2 className="text-navy font-bold text-xl mb-3">3. Zweck der Datenbearbeitung</h2>
            <p>
              Wir verwenden Ihre Kontaktdaten ausschliesslich zur Beantwortung Ihrer Anfragen und zur Abwicklung von Aufträgen. Eine darüber hinausgehende Nutzung oder Weitergabe an Dritte findet nicht statt, sofern keine gesetzliche Pflicht dazu besteht.
            </p>
          </div>

          <div>
            <h2 className="text-navy font-bold text-xl mb-3">4. Aufbewahrung</h2>
            <p>
              Personenbezogene Daten aus dem Kontaktformular werden nur so lange aufbewahrt, wie dies für die Bearbeitung Ihrer Anfrage erforderlich ist, oder soweit gesetzliche Aufbewahrungspflichten bestehen (z. B. für Vertragsunterlagen bis zu 10 Jahre).
            </p>
          </div>

          <div>
            <h2 className="text-navy font-bold text-xl mb-3">5. Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten, auf Berichtigung, Löschung oder Einschränkung der Bearbeitung sowie auf Datenübertragbarkeit. Wenden Sie sich dazu bitte an info@ari-maler.ch.
            </p>
          </div>

          <div>
            <h2 className="text-navy font-bold text-xl mb-3">6. SSL-Verschlüsselung</h2>
            <p>
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an «https://» in Ihrer Browserzeile.
            </p>
          </div>

          <div>
            <h2 className="text-navy font-bold text-xl mb-3">7. Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen. Die jeweils aktuelle Version ist auf dieser Seite abrufbar. Wir empfehlen, diese Seite regelmässig zu besuchen.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
