import { Link } from 'react-router-dom';

const ContactCTA = () => (
  <section style={{ background: 'var(--blue)', padding: '80px 0' }}>
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--fh)', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: 'white', lineHeight: 1.15, letterSpacing: 0 }}>Bereit für Ihr nächstes Projekt?</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginTop: 12, maxWidth: 480, textWrap: 'pretty' }}>Kontaktieren Sie uns für ein kostenloses Beratungsgespräch und ein unverbindliches Angebot.</p>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link className="btn btn-white" to="/kontakt">Jetzt anfragen</Link>
        <a className="btn btn-ghost" href="tel:0797996262" style={{ display: 'inline-flex' }}>079 799 62 62</a>
      </div>
    </div>
  </section>
);

export default ContactCTA;
