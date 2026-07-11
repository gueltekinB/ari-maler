import type { CSSProperties } from 'react';

const ImgPh = ({ label, style = {} }: { label: string; style?: CSSProperties }) => (
  <div className="img-ph" style={style}>
    <div className="img-ph-label">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
      <span>{label}</span>
    </div>
  </div>
);

export default ImgPh;
