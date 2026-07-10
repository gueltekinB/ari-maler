const PageHeader = ({ eyebrow, title, subtitle }) => (
  <section style={{ background: 'var(--navy)', paddingTop: 140, paddingBottom: 72, color: 'white' }}>
    <div className="container">
      <span className="eyebrow eyebrow-light">{eyebrow}</span>
      <h1 style={{ fontFamily: 'var(--fh)', fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 700, color: 'white', lineHeight: 1.1, marginTop: 10, letterSpacing: 0 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', marginTop: 16, maxWidth: 560, lineHeight: 1.75, textWrap: 'pretty' }}>{subtitle}</p>}
    </div>
  </section>
);

export default PageHeader;
