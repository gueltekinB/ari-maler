import PageHeader from '../components/PageHeader';

const DatenschutzPage = () => (
  <div>
    <PageHeader eyebrow="Rechtliches" title="Datenschutzerklärung" subtitle="Zuletzt aktualisiert am: 22.07.2024" />
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ maxWidth: 720, background: 'white', borderRadius: 12, padding: 52, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {[
            ['1. Welche Dienste wir nutzen', 'Google Analytics, Google Tag Manager, Google Maps, Google My Business, Google Customer Reviews, WordPress, Google reCaptcha.'],
            ['2. Kontaktinformationen', 'Ari Maler GmbH\nTherwilerstrasse 24\n4103 Bottmingen\ninfo@ari-maler.ch\n079 799 62 62\nDatenschutzverantwortliche Person: Toylan Ari'],
            ['3. Allgemeine Grundsätze', 'Wir legen grossen Wert darauf, dass der Umgang mit Personendaten transparent ist. Wir behandeln Ihre Daten vertraulich und gemäss den in dieser Datenschutzerklärung festgelegten Zwecken.'],
            ['3.5 Aufbewahrungsdauer', 'Wir speichern personenbezogene Daten nur so lange, wie dies erforderlich ist. Daten, die wir bei Ihrem Besuch auf unserer Website speichern, werden während zwölf Monaten aufbewahrt.'],
            ['3.7 Ihre Rechte', 'Sie können jederzeit Auskunft über die von uns über Sie gespeicherten Daten verlangen. Senden Sie Ihr Gesuch mit Identitätsnachweis an info@ari-maler.ch. Die zuständige Aufsichtsbehörde in der Schweiz ist der Eidgenössische Datenschutz- und Öffentlichkeitsbeauftragte.'],
          ].map(([t, v]) => (
            <div key={t} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--fh)', fontSize: 14, fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{t}</h3>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default DatenschutzPage;
