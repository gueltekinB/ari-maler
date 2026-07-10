import PageHeader from '../components/PageHeader';
import ImgPh from '../components/ImgPh';
import ContactCTA from '../components/ContactCTA';
import { Link } from 'react-router-dom';
import { SERVICE_CARDS } from '../data/services';

const DienstleistungenPage = () => (
  <div>
    <PageHeader eyebrow="Professionell & Zuverlässig" title="Dienstleistungen" subtitle="Haben Sie eine Vision? Lassen Sie uns zusammenarbeiten, um sie Wirklichkeit werden zu lassen." />
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {SERVICE_CARDS.map(s => (
            <div key={s.id} className="card" style={{ cursor: 'default' }}>
              <ImgPh label={`${s.title}\nReferenzbild`} style={{ aspectRatio: '16/9', borderRadius: 6, marginBottom: 24 }} />
              <div style={{ fontFamily: 'var(--fh)', fontSize: 12, fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.06em', marginBottom: 8 }}>{s.num}</div>
              <h3 style={{ fontFamily: 'var(--fh)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 20, textWrap: 'pretty' }}>{s.desc}</p>
              <Link to={`/dienstleistungen/${s.id}`} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 13 }}>Mehr erfahren →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
    <ContactCTA />
  </div>
);

export default DienstleistungenPage;
