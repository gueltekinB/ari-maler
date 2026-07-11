import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { BEFORE_AFTER } from '../data/beforeAfter';

const ReferenzenPage = () => (
  <div>
    <PageHeader eyebrow="Portfolio" title="Referenzen" subtitle="Bewegen Sie den Cursor über ein Bild, um Vorher & Nachher zu vergleichen. Lassen Sie sich von unserer Expertise überzeugen!" />
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {BEFORE_AFTER.map(p => (
            <BeforeAfterSlider key={p.id} before={p.before} after={p.after} title={p.title} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 24 }}>Sie möchten Ihr Projekt realisieren?</p>
          <Link className="btn btn-primary" to="/kontakt">Jetzt Anfrage stellen</Link>
        </div>
      </div>
    </section>
  </div>
);

export default ReferenzenPage;
