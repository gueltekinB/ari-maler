import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SERVICES } from '../data/services';

const Nav = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileSvcsOpen, setMobileSvcsOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setDropOpen(false);
  }, [location.pathname]);

  const close = () => { setMobileOpen(false); setDropOpen(false); };
  const isHome = location.pathname === '/';
  const light = isHome && !scrolled;

  const navBg = scrolled
    ? 'rgba(255,255,255,0.97)'
    : isHome ? 'transparent' : 'rgba(255,255,255,0.97)';
  const shadow = scrolled || !isHome ? '0 1px 0 rgba(0,0,0,0.08)' : 'none';

  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: 72, background: navBg, backdropFilter: (scrolled || !isHome) ? 'blur(12px)' : 'none', boxShadow: shadow, transition: 'background 0.3s, box-shadow 0.3s' }}>
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" onClick={close} style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={light ? '/uploads/ari_maler-logo-weiss-300x178.webp' : '/uploads/ari_maler-logo-original-transparent-300x181.webp'}
              alt="Ari Maler GmbH"
              style={{ height: 42, width: 'auto' }}
            />
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div ref={dropRef} style={{ position: 'relative' }} onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
              <button className={`nav-link ${light ? 'nav-link-light' : 'nav-link-dark'}`} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                Dienstleistungen
                <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M0 0l5 6 5-6z"/></svg>
              </button>
              {dropOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: 'white', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', minWidth: 270, padding: '8px 0', border: '1px solid rgba(0,0,0,0.06)', zIndex: 10 }}>
                  {SERVICES.map(s => (
                    <Link key={s.id} className="nav-drop-item" to={`/dienstleistungen/${s.id}`} onClick={close}>{s.label}</Link>
                  ))}
                </div>
              )}
            </div>
            <Link className={`nav-link ${light ? 'nav-link-light' : 'nav-link-dark'}`} to="/referenzen" onClick={close}>Referenzen</Link>
            <Link className={`nav-link ${light ? 'nav-link-light' : 'nav-link-dark'}`} to="/ueber-uns" onClick={close}>Über uns</Link>
            <Link className="btn btn-primary" to="/kontakt" onClick={close} style={{ marginLeft: 8, padding: '10px 20px', fontSize: 13 }}>Kontakt</Link>
          </div>

          {/* Hamburger */}
          <button className="hamburger-btn" onClick={() => setMobileOpen(o => !o)} style={{ background: 'none', border: 'none', padding: 8, display: 'flex', flexDirection: 'column', gap: 5, cursor: 'pointer' }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: 'block', width: 22, height: 2, background: light ? 'white' : 'var(--text)', borderRadius: 2, transition: 'all 0.2s' }}></span>
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(15,20,36,0.55)', backdropFilter: 'blur(2px)' }} onClick={() => setMobileOpen(false)}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 300, background: 'white', padding: '80px 28px 32px', overflowY: 'auto', boxShadow: '-8px 0 40px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', fontSize: 22, color: 'var(--muted)', cursor: 'pointer' }}>✕</button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Link to="/" onClick={close} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '12px 0', fontSize: 15, fontWeight: 600, color: 'var(--navy)', borderBottom: '1px solid var(--border)', display: 'block' }}>Startseite</Link>
              <div>
                <button onClick={() => setMobileSvcsOpen(o => !o)} style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', padding: '12px 0', fontSize: 15, fontWeight: 600, color: 'var(--navy)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
                  Dienstleistungen <span>{mobileSvcsOpen ? '▲' : '▼'}</span>
                </button>
                {mobileSvcsOpen && (
                  <div style={{ paddingLeft: 12, paddingBottom: 4 }}>
                    {SERVICES.map(s => (
                      <Link key={s.id} to={`/dienstleistungen/${s.id}`} onClick={close} style={{ display: 'block', width: '100%', background: 'none', border: 'none', textAlign: 'left', padding: '10px 0', fontSize: 14, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{s.label}</Link>
                    ))}
                  </div>
                )}
              </div>
              {[['/referenzen', 'Referenzen'], ['/ueber-uns', 'Über uns'], ['/kontakt', 'Kontakt']].map(([p, l], i) => (
                <Link key={p} to={p} onClick={close} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '12px 0', fontSize: 15, fontWeight: 600, color: 'var(--navy)', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', display: 'block' }}>
                  {l}
                </Link>
              ))}
            </div>
            <Link className="btn btn-primary" to="/kontakt" onClick={close} style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}>Jetzt anfragen</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
