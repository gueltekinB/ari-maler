import { Link } from 'react-router-dom';
import type { ServiceCard as ServiceCardType } from '../data/services';

const ServiceCard = ({ s }: { s: ServiceCardType }) => (
  <div className="card" style={{ cursor: 'default' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
      <div style={{ fontFamily: 'var(--fh)', fontSize: 13, fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.06em' }}>{s.num}</div>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(30,111,195,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue)', opacity: 0.7 }}></div>
      </div>
    </div>
    <h3 style={{ fontFamily: 'var(--fh)', fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 10, lineHeight: 1.2 }}>{s.title}</h3>
    <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, textWrap: 'pretty' }}>{s.desc}</p>
    <Link to={`/dienstleistungen/${s.id}`} style={{ background: 'none', border: 'none', marginTop: 20, fontSize: 13, fontWeight: 600, color: 'var(--blue)', padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
      Mehr erfahren <span style={{ transition: 'transform 0.15s' }}>→</span>
    </Link>
  </div>
);

export default ServiceCard;
