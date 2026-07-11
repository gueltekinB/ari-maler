import { Link } from 'react-router-dom';
import type { MouseEvent } from 'react';
import { SERVICES } from '../data/services';

const dim = (e: MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; };
const bright = (e: MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = 'white'; };
const dimFooter = (e: MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; };
const brightFooter = (e: MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; };

const Footer = () => {
  return (
    <footer style={{ background: 'var(--navy)', color: 'white', paddingTop: 72, paddingBottom: 40 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, paddingBottom: 56, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <img src="/uploads/ari_maler-logo-weiss-300x178.webp" alt="Ari Maler GmbH" style={{ height: 52, width: 'auto', marginBottom: 20 }} />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 220 }}>Ihr zuverlässiger Partner für Malerarbeiten und Sanierungen in der Region Basel.</p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Dienstleistungen</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICES.map(s => (
                <Link key={s.id} to={`/dienstleistungen/${s.id}`} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: 14, color: 'rgba(255,255,255,0.7)', padding: 0, transition: 'color 0.15s' }} onMouseEnter={bright} onMouseLeave={dim}>{s.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Unternehmen</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['/ueber-uns','Über uns'],['/referenzen','Referenzen'],['/kontakt','Kontakt'],['/impressum','Impressum'],['/datenschutz','Datenschutz']].map(([p,l]) => (
                <Link key={p} to={p} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: 14, color: 'rgba(255,255,255,0.7)', padding: 0, transition: 'color 0.15s' }} onMouseEnter={bright} onMouseLeave={dim}>{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Kontakt</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
              <span>Therwilerstrasse 24<br/>4103 Bottmingen</span>
              <a href="mailto:info@ari-maler.ch" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.15s' }} onMouseEnter={bright} onMouseLeave={dim}>info@ari-maler.ch</a>
              <a href="tel:0797996262" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.15s' }} onMouseEnter={bright} onMouseLeave={dim}>079 799 62 62</a>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>© 2025 Ari Maler GmbH. Alle Rechte vorbehalten.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['/impressum','Impressum'],['/datenschutz','Datenschutz']].map(([p,l]) => (
              <Link key={p} to={p} style={{ background: 'none', border: 'none', fontSize: 13, color: 'rgba(255,255,255,0.35)', padding: 0, transition: 'color 0.15s' }} onMouseEnter={brightFooter} onMouseLeave={dimFooter}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
