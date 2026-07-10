import { useState } from 'react';
import PageHeader from '../components/PageHeader';

const KontaktPage = () => {
  const [form, setForm] = useState({ name: '', email: '', telefon: '', betreff: '', nachricht: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div>
      <PageHeader eyebrow="Schreiben Sie uns" title="Kontakt" subtitle="Verwenden Sie das untenstehende Formular, um uns eine direkte Nachricht zu senden oder eine Angebotsanfrage zu stellen." />
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
            {/* Form */}
            <div style={{ background: 'white', borderRadius: 12, padding: 48, boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 8px 32px rgba(25,35,56,0.07)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: 64, height: 64, background: 'rgba(30,111,195,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>✓</div>
                  <h3 style={{ fontFamily: 'var(--fh)', fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>Nachricht gesendet!</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 15 }}>Wir melden uns umgehend bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h3 style={{ fontFamily: 'var(--fh)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Nachricht senden</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="form-field">
                      <label className="form-label">Name *</label>
                      <input className="form-input" type="text" placeholder="Max Mustermann" required value={form.name} onChange={e => set('name', e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Telefon</label>
                      <input className="form-input" type="tel" placeholder="079 000 00 00" value={form.telefon} onChange={e => set('telefon', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">E-Mail *</label>
                    <input className="form-input" type="email" placeholder="max@beispiel.ch" required value={form.email} onChange={e => set('email', e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Betreff</label>
                    <input className="form-input" type="text" placeholder="Angebotsanfrage Innenmalerei" value={form.betreff} onChange={e => set('betreff', e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Nachricht *</label>
                    <textarea className="form-input" placeholder="Beschreiben Sie Ihr Projekt..." required value={form.nachricht} onChange={e => set('nachricht', e.target.value)}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>Nachricht senden →</button>
                </form>
              )}
            </div>
            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--fh)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 20 }}>Kontaktdaten</h3>
                {[
                  ['Adresse', 'Therwilerstrasse 24\n4103 Bottmingen, Schweiz'],
                  ['E-Mail', 'info@ari-maler.ch'],
                  ['Telefon', '079 799 62 62'],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(30,111,195,0.08)', borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)' }}></div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{l}</div>
                      <div style={{ fontSize: 15, color: 'var(--text)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{v}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--navy)', borderRadius: 12, padding: 32, color: 'white' }}>
                <h4 style={{ fontFamily: 'var(--fh)', fontSize: 17, fontWeight: 700, marginBottom: 10 }}>Kostenlose Beratung</h4>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>Wir bieten ein kostenloses und unverbindliches Beratungsgespräch an. Wir melden uns umgehend bei Ihnen.</p>
                <a className="btn btn-ghost" href="tel:0797996262" style={{ marginTop: 20, display: 'inline-flex' }}>Jetzt anrufen →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KontaktPage;
