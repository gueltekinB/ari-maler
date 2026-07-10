import { Link, Navigate, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ImgPh from '../components/ImgPh';
import ContactCTA from '../components/ContactCTA';
import { SERVICE_DATA } from '../data/services';

const ServicePage = () => {
  const { id } = useParams();
  const d = SERVICE_DATA[id];
  if (!d) return <Navigate to="/dienstleistungen" replace />;

  return (
    <div>
      <PageHeader eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.8, textWrap: 'pretty' }}>{d.intro}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 48 }}>
                {d.features.map((f, i) => (
                  <div key={i} style={{ borderLeft: '3px solid var(--blue)', paddingLeft: 24 }}>
                    <h3 style={{ fontFamily: 'var(--fh)', fontSize: 19, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>{f.title}</h3>
                    <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, textWrap: 'pretty' }}>{f.text}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 48, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link className="btn btn-primary" to="/kontakt">Jetzt anfragen</Link>
                <Link className="btn btn-outline" to="/dienstleistungen">Alle Leistungen</Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ImgPh label={`${d.title}\nReferenzbild`} style={{ aspectRatio: '4/3', borderRadius: 8 }} />
              <ImgPh label={`${d.title}\nDetail`} style={{ aspectRatio: '16/9', borderRadius: 8 }} />
            </div>
          </div>
        </div>
      </section>
      <ContactCTA />
    </div>
  );
};

export default ServicePage;
