import { useCallback, useEffect, useRef, useState } from 'react';

function BeforeAfterSlider({ before, after, title }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let p = ((clientX - rect.left) / rect.width) * 100;
    p = Math.max(0, Math.min(100, p));
    setPos(p);
  }, []);

  const onMouseMove = (e) => { updateFromClientX(e.clientX); };
  const onMouseDown = (e) => { draggingRef.current = true; updateFromClientX(e.clientX); };
  const onTouchMove = (e) => { if (e.touches && e.touches[0]) updateFromClientX(e.touches[0].clientX); };

  useEffect(() => {
    const onUp = () => { draggingRef.current = false; };
    window.addEventListener('mouseup', onUp);
    return () => window.removeEventListener('mouseup', onUp);
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchMove}
        onTouchMove={onTouchMove}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/3',
          overflow: 'hidden',
          borderRadius: 8,
          cursor: 'col-resize',
          userSelect: 'none',
          background: '#dedad2',
        }}
      >
        <img
          src={before}
          alt={`${title} – Vorher`}
          draggable="false"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)`, pointerEvents: 'none' }}>
          <img
            src={after}
            alt={`${title} – Nachher`}
            draggable="false"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* labels */}
        <div style={{ position: 'absolute', top: 14, left: 14, padding: '5px 12px', borderRadius: 100, background: 'rgba(30,111,195,0.85)', backdropFilter: 'blur(4px)', color: 'white', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: pos > 14 ? 1 : 0, transition: 'opacity 0.15s', pointerEvents: 'none' }}>Nachher</div>
        <div style={{ position: 'absolute', top: 14, right: 14, padding: '5px 12px', borderRadius: 100, background: 'rgba(25,35,56,0.55)', backdropFilter: 'blur(4px)', color: 'white', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: (100 - pos) > 14 ? 1 : 0, transition: 'opacity 0.15s', pointerEvents: 'none' }}>Vorher</div>

        {/* handle */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 2, background: 'white', boxShadow: '0 0 0 1px rgba(0,0,0,0.15)', transform: 'translateX(-1px)', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 40, height: 40, borderRadius: '50%', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M5 1L1 6L5 11" stroke="#192338" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M3 1L7 6L3 11" stroke="#192338" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
      {title && <div style={{ marginTop: 12, fontFamily: 'var(--fh)', fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>{title}</div>}
    </div>
  );
}

export default BeforeAfterSlider;
