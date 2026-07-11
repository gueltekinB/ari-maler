import { Link } from 'react-router-dom';
import ImgPh from '../components/ImgPh';
import ServiceCard from '../components/ServiceCard';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ContactCTA from '../components/ContactCTA';
import { SERVICE_CARDS } from '../data/services';
import { BEFORE_AFTER } from '../data/beforeAfter';

const HeroSection = () => (
  <section style={{ minHeight: '92vh', background: 'linear-gradient(140deg, #192338 0%, #1c2d47 55%, #172038 100%)', display: 'flex', alignItems: 'center', paddingTop: 72, position: 'relative', overflow: 'hidden' }}>
    {/* Subtle dot grid */}
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(30,111,195,0.15) 0%, transparent 60%), radial-gradient(circle at 85% 15%, rgba(30,111,195,0.08) 0%, transparent 40%)', pointerEvents: 'none' }}></div>
    <div className="container" style={{ width: '100%', paddingTop: 48, paddingBottom: 72 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <span className="eyebrow eyebrow-light" style={{ marginBottom: 20, display: 'block' }}>Seit 2022 · Region Basel</span>
        <h1 style={{ fontFamily: 'var(--fh)', fontWeight: 700, color: 'white', lineHeight: 1.1, letterSpacing: 0 }}>
          <span style={{ display: 'block', fontSize: 'clamp(16px, 1.6vw, 22px)', fontWeight: 400, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em', marginBottom: 6, fontFamily: 'var(--fb)' }}>Ihr Experte für</span>
          <span style={{ display: 'block', fontSize: 'clamp(42px, 4.8vw, 68px)', color: 'white', lineHeight: 1.05 }}>Malerarbeiten</span>
          <span style={{ display: 'block', fontSize: 'clamp(42px, 4.8vw, 68px)', color: 'var(--blue)', lineHeight: 1.05 }}>&amp; Sanierungen</span>
        </h1>
        <p style={{ fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.65)', marginTop: 24, lineHeight: 1.75, textWrap: 'pretty', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
          Ob Innen- oder Aussenmalerei, Betonkosmetik oder Brand- und Wasserschadensanierung – wir bieten Ihnen höchste Qualität mit persönlichem Engagement.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link className="btn btn-primary" to="/dienstleistungen" style={{ padding: '13px 26px' }}>Leistungen entdecken</Link>
          <Link className="btn btn-ghost" to="/kontakt" style={{ padding: '13px 26px' }}>Kontakt aufnehmen</Link>
        </div>
        <div style={{ display: 'flex', gap: 28, marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Innen & Aussen', 'Betonkosmetik', 'Schadenssanierung'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }}></div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Bottom fade */}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, transparent, var(--bg))', pointerEvents: 'none' }}></div>
  </section>
);

const ServicesSection = () => (
  <section className="section" style={{ background: 'var(--bg)' }}>
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
        <div>
          <span className="eyebrow">Professionell & Zuverlässig</span>
          <h2 className="section-title">Unsere Dienstleistungen</h2>
        </div>
        <Link className="btn btn-outline" to="/dienstleistungen" style={{ flexShrink: 0 }}>Alle Leistungen →</Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {SERVICE_CARDS.slice(0,3).map(s => (
          <ServiceCard key={s.id} s={s} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 24 }}>
        {SERVICE_CARDS.slice(3).map(s => (
          <ServiceCard key={s.id} s={s} />
        ))}
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section className="section" style={{ background: 'var(--navy)', color: 'white' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <span className="eyebrow eyebrow-light">Über uns</span>
          <h2 className="section-title" style={{ color: 'white' }}>Seit 2022 für Sie im Einsatz</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', marginTop: 20, lineHeight: 1.8, textWrap: 'pretty' }}>
            Die Ari Maler GmbH wurde am 14. März 2022 gegründet, um sich im Raum Basel als verlässlicher Partner in der Malerbranche zu etablieren.
          </p>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', marginTop: 16, lineHeight: 1.8, textWrap: 'pretty' }}>
            Inhaber Toylan Ari bringt langjährige Erfahrung als Maler und Vorarbeiter mit. Sein Fokus liegt auf fachgerechter Umsetzung, sauberer Abnahme und persönlichem Einsatz für jeden Auftrag.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 44 }}>
            {[['Fleiss', 'Konsequente Qualität bei jedem Projekt.'], ['Ehrgeiz', 'Stets auf der Suche nach der besten Lösung.'], ['Optimismus', 'Positiver Umgang mit jedem Auftrag.']].map(([t, d]) => (
              <div key={t} style={{ borderTop: '2px solid var(--blue)', paddingTop: 16 }}>
                <div style={{ fontFamily: 'var(--fh)', fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
          <Link className="btn btn-ghost" to="/ueber-uns" style={{ marginTop: 40 }}>Mehr über uns →</Link>
        </div>
        <div style={{ position: 'relative' }}>
          <ImgPh label={"Foto\nToylan Ari"} style={{ aspectRatio: '3/4', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: 28, right: -24, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '20px 24px', backdropFilter: 'blur(8px)', maxWidth: 180 }}>
            <div style={{ fontFamily: 'var(--fh)', fontSize: 28, fontWeight: 700, color: 'white' }}>5★</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4, lineHeight: 1.5 }}>Bewertung auf Google</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ReferencesSection = () => (
  <section className="section" style={{ background: 'var(--bg)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <span className="eyebrow">Weil Bilder mehr sagen</span>
        <h2 className="section-title" style={{ margin: '10px auto 0' }}>Unsere Referenzen</h2>
        <p className="section-lead" style={{ margin: '14px auto 0', textAlign: 'center' }}>Bewegen Sie den Cursor über ein Bild, um Vorher &amp; Nachher zu vergleichen.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {BEFORE_AFTER.slice(0, 3).map(p => (
          <BeforeAfterSlider key={p.id} before={p.before} after={p.after} title={p.title} />
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 44 }}>
        <Link className="btn btn-primary" to="/referenzen">Alle Referenzen ansehen →</Link>
      </div>
    </div>
  </section>
);

const HomePage = () => (
  <div>
    <HeroSection />
    <ServicesSection />
    <AboutSection />
    <ReferencesSection />
    <ContactCTA />
  </div>
);

export default HomePage;
