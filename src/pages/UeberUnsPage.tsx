import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ImgPh from '../components/ImgPh';
import ContactCTA from '../components/ContactCTA';

const UeberUnsPage = () => (
  <div>
    <PageHeader eyebrow="Seit 2022" title="Über uns" subtitle="Die Ari Maler GmbH – Ihr zuverlässiger Partner für Malerarbeiten in der Region Basel." />
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--fh)', fontSize: 26, fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>Toylan Ari</h2>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20, textWrap: 'pretty' }}>
              Der engagierte Basler Toylan Ari hegt seit jeher eine Leidenschaft für Malerkunst. Er hat seine Ausbildung als Maler sowie diverse Fachkurse erfolgreich abgeschlossen und in mehreren renommierten Betrieben gearbeitet.
            </p>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20, textWrap: 'pretty' }}>
              Seine Fähigkeiten konnte er vielfach unter Beweis stellen, indem er als Vorarbeiter zahlreiche Bauprojekte leitete und für deren reibungslose und saubere Abnahmen verantwortlich war.
            </p>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, textWrap: 'pretty' }}>
              Am 14. März 2022 gründete er die Ari Maler GmbH mit dem Ziel, sich im Raum Basel und Umgebung als verlässlicher Partner in der Malerbranche zu etablieren.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 44 }}>
              {[['Gegründet', '2022'],['Region', 'Basel & Umgebung'],['Spezialität', 'Betonkosmetik'],['Fokus', 'Renovierungen']].map(([l, v]) => (
                <div key={l} style={{ background: 'white', borderRadius: 8, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
                  <div style={{ fontFamily: 'var(--fh)', fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>{v}</div>
                </div>
              ))}
            </div>
            <Link className="btn btn-primary" to="/kontakt" style={{ marginTop: 36 }}>Jetzt Kontaktieren</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <ImgPh label={"Foto\nToylan Ari"} style={{ aspectRatio: '3/4', borderRadius: 10 }} />
          </div>
        </div>
        {/* Values */}
        <div style={{ marginTop: 80, borderTop: '1px solid var(--border)', paddingTop: 72 }}>
          <h2 style={{ fontFamily: 'var(--fh)', fontSize: 26, fontWeight: 700, color: 'var(--navy)', marginBottom: 40, textAlign: 'center' }}>Betonkosmetik & dekorative Wände</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 700, margin: '0 auto', textAlign: 'center', textWrap: 'pretty' }}>
            Neben den üblichen Malerarbeiten bieten wir auch Betonkosmetik an – ein aktueller Trend, der eine saubere Umsetzung erfordert. Darüber hinaus erfüllen wir ästhetische Wünsche wie das Anbringen von dekorativen Wänden und möchten unseren Kunden die vielfältigen Möglichkeiten der Malerei aufzeigen.
          </p>
        </div>
      </div>
    </section>
    <ContactCTA />
  </div>
);

export default UeberUnsPage;
