function Perforation({ w, h, color }) {
  const dots = [];
  const step = 6;
  for (let x = step / 2; x < w; x += step) {
    dots.push(<circle key={`t${x}`} cx={x} cy={0} r="2" />);
    dots.push(<circle key={`b${x}`} cx={x} cy={h} r="2" />);
  }
  for (let y = step / 2; y < h; y += step) {
    dots.push(<circle key={`l${y}`} cx={0} cy={y} r="2" />);
    dots.push(<circle key={`r${y}`} cx={w} cy={y} r="2" />);
  }
  return <g fill={color}>{dots}</g>;
}

export function FloralStamp({ className = '' }) {
  return (
    <svg className={`stamp ${className}`} viewBox="0 0 60 70" aria-hidden="true">
      <rect x="0" y="0" width="60" height="70" fill="#f6efe2" />
      <Perforation w={60} h={70} color="var(--color-onyx)" />
      <rect x="5" y="5" width="50" height="60" fill="#f6efe2" />
      <rect x="8" y="8" width="44" height="54" fill="#1f1c19" />
      <rect x="10.5" y="10.5" width="39" height="49" fill="none" stroke="var(--color-gold)" strokeWidth=".6" />
      <g transform="translate(30 36)">
        <path d="M0,16 C-2,6 -1,-2 0,-8" stroke="var(--color-gold)" strokeWidth="1.4" fill="none" />
        <path d="M0,6 C-10,4 -14,-4 -12,-8 C-6,-6 -1,-1 0,6 Z" fill="var(--color-gold)" opacity=".85" />
        <path d="M0,10 C10,8 14,0 13,-4 C6,-3 1,2 0,10 Z" fill="var(--color-gold-deep)" />
        <path d="M-6,-8 C-7,-16 -2,-20 0,-21 C2,-20 7,-16 6,-8 C3,-5 -3,-5 -6,-8 Z" fill="var(--color-gold-light)" />
        <path d="M-3,-8 C-3,-14 0,-17 0,-17 C0,-17 3,-14 3,-8 Z" fill="var(--color-gold-deep)" />
      </g>
    </svg>
  );
}

export function OrnateStamp({ className = '' }) {
  return (
    <svg className={`stamp ${className}`} viewBox="0 0 60 70" aria-hidden="true">
      <rect x="0" y="0" width="60" height="70" fill="#f1ead9" />
      <Perforation w={60} h={70} color="var(--color-onyx)" />
      <rect x="5" y="5" width="50" height="60" fill="#f1ead9" />
      <rect x="9" y="9" width="42" height="52" fill="none" stroke="#a9864a" strokeWidth=".8" />
      <rect x="11" y="11" width="38" height="48" fill="none" stroke="#a9864a" strokeWidth=".5" strokeDasharray="1.5 1.5" />
      <ellipse cx="30" cy="33" rx="12" ry="14" fill="none" stroke="#a9864a" strokeWidth=".9" />
      <text x="30" y="38" textAnchor="middle" fontFamily="var(--font-calligraphy)" fontSize="14" fill="#a9864a">
        S K
      </text>
      <text x="30" y="56" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="5.5" letterSpacing="1.4" fill="#a9864a">
        MMXXVII
      </text>
    </svg>
  );
}

// Matasellos de ondas como en la referencia
export function Postmark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 60" aria-hidden="true" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity=".8">
      <circle cx="84" cy="30" r="22" />
      <circle cx="84" cy="30" r="17" strokeDasharray="2 2" />
      <text x="84" y="27" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="6.5" letterSpacing="1" fill="var(--color-gold)" stroke="none">RIOHACHA</text>
      <text x="84" y="37" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="6.5" letterSpacing="1" fill="var(--color-gold)" stroke="none">21·III·27</text>
      {[14, 22, 30, 38, 46].map((y) => (
        <path key={y} d={`M2 ${y} Q 10 ${y - 4} 18 ${y} T 34 ${y} T 50 ${y} T 64 ${y}`} />
      ))}
    </svg>
  );
}
