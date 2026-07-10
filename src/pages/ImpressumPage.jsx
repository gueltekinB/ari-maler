import PageHeader from '../components/PageHeader';

const ImpressumPage = () => (
  <div>
    <PageHeader eyebrow="Rechtliches" title="Impressum" />
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ maxWidth: 720, background: 'white', borderRadius: 12, padding: 52, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {[
            ['Verantwortliche Instanz', 'Ari Maler GmbH\nTherwilerstrasse 24\n4103 Bottmingen\nSchweiz\nE-Mail: info@ari-maler.ch'],
            ['Vertretungsberechtigte Person', 'Ari, Toylan'],
            ['Handelsregisternummer', 'CHE-280.849.351'],
            ['MWST-Nummer', 'CHE-280.849.351 MWST'],
            ['Haftungsausschluss', 'Der Autor übernimmt keine Gewähr für die Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art werden ausgeschlossen.'],
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

export default ImpressumPage;
