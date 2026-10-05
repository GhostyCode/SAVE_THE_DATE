import { useId } from 'react';

// Pseudoaleatorio determinista: el ramo se dibuja idéntico en cada render.
function rng(seed) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const HYDRANGEA_TONES = {
  wine: ['#c99aa3', '#b07a88', '#d9b3b6', '#9b5d6e', '#e6cdc9', '#86475a'],
  ivory: ['#fffdf8', '#f6efe0', '#ece2cb', '#fbf8f1', '#e3d6b6', '#f1e7cf'],
};

function Hydrangea({ cx, cy, r, seed, shade, tones }) {
  const rand = rng(seed);
  const florets = [];
  const count = Math.round(r * 2.3);
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * r;
    const x = cx + Math.cos(a) * d;
    const y = cy + Math.sin(a) * d * 0.86;
    const size = r * (0.15 + rand() * 0.06);
    const tone = tones[Math.floor(rand() * tones.length)];
    const rot = rand() * 90;
    florets.push({ x, y, size, tone, rot, d });
  }
  // las flores del borde van detrás, las del centro delante → volumen de cúpula
  florets.sort((p, q) => q.d - p.d);
  return (
    <g>
      <ellipse cx={cx} cy={cy + r * 0.1} rx={r * 0.88} ry={r * 0.76} fill={`url(#${shade})`} />
      {florets.map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${f.rot})`}>
          {[0, 90, 180, 270].map((p) => (
            <ellipse key={p} cx="0" cy={-f.size * 0.55} rx={f.size * 0.42} ry={f.size * 0.6} transform={`rotate(${p})`} fill={f.tone} opacity=".95" />
          ))}
          <circle r={f.size * 0.14} fill="#d9bf86" />
        </g>
      ))}
    </g>
  );
}

function Dahlia({ cx, cy, r, seed, gradient, center }) {
  const rand = rng(seed);
  const rings = [
    { n: 16, len: 1, w: 0.2 },
    { n: 13, len: 0.78, w: 0.19 },
    { n: 10, len: 0.56, w: 0.17 },
    { n: 7, len: 0.34, w: 0.14 },
  ];
  return (
    <g>
      {rings.map((ring, ri) => (
        <g key={ri}>
          {Array.from({ length: ring.n }).map((_, i) => {
            const angle = (360 / ring.n) * i + ri * 11 + rand() * 6;
            const len = r * ring.len;
            const w = r * ring.w;
            return (
              <path
                key={i}
                transform={`translate(${cx} ${cy}) rotate(${angle})`}
                d={`M0,0 C${w},-${len * 0.35} ${w * 0.7},-${len * 0.9} 0,-${len} C-${w * 0.7},-${len * 0.9} -${w},-${len * 0.35} 0,0 Z`}
                fill={`url(#${gradient})`}
                stroke="rgba(30,5,12,.35)"
                strokeWidth=".4"
              />
            );
          })}
        </g>
      ))}
      <circle cx={cx} cy={cy} r={r * 0.16} fill={`url(#${center})`} />
    </g>
  );
}

function Tulip({ x, y, angle, size, gradient }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={`M0,0 L0,${size * 1.4}`} stroke="#5b6a3a" strokeWidth="1.6" fill="none" />
      <path d={`M-${size * 0.5},0 C-${size * 0.6},-${size * 0.7} -${size * 0.2},-${size} 0,-${size * 1.05} C${size * 0.2},-${size} ${size * 0.6},-${size * 0.7} ${size * 0.5},0 C${size * 0.3},${size * 0.25} -${size * 0.3},${size * 0.25} -${size * 0.5},0 Z`} fill={`url(#${gradient})`} />
      <path d={`M0,${size * 0.12} C-${size * 0.1},-${size * 0.4} -${size * 0.05},-${size * 0.8} 0,-${size}`} stroke="rgba(255,220,225,.25)" strokeWidth="1" fill="none" />
    </g>
  );
}

function CallaLily({ x, y, angle, size, gradient }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={`M0,0 Q${size * 0.15},${size * 1.2} ${size * 0.05},${size * 2.4}`} stroke="#6f7d48" strokeWidth="1.8" fill="none" />
      <path
        d={`M0,0 C-${size * 0.55},-${size * 0.25} -${size * 0.5},-${size * 0.8} -${size * 0.05},-${size * 1.15}
           C${size * 0.1},-${size * 0.8} ${size * 0.5},-${size * 0.55} ${size * 0.45},-${size * 0.2}
           C${size * 0.3},-${size * 0.05} ${size * 0.12},0 0,0 Z`}
        fill={`url(#${gradient})`}
      />
      <path d={`M-${size * 0.04},-${size * 0.08} Q-${size * 0.08},-${size * 0.45} -${size * 0.02},-${size * 0.62}`} stroke="#e7c86a" strokeWidth={size * 0.09} strokeLinecap="round" fill="none" />
    </g>
  );
}

function Leaf({ x, y, length, width, angle, gradient }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path
        d={`M0,0 C${width},-${length * 0.3} ${width * 0.55},-${length * 0.82} 0,-${length}
           C-${width * 0.55},-${length * 0.82} -${width},-${length * 0.3} 0,0 Z`}
        fill={`url(#${gradient})`}
      />
      <path d={`M0,-2 L0,-${length - 4}`} stroke="rgba(255,255,255,.22)" strokeWidth=".7" />
    </g>
  );
}

// Amaranto colgante: una cadena de cuentas verdes que se adelgaza al caer
function Amaranthus({ x, y, length, sway, seed }) {
  const rand = rng(seed);
  const beads = [];
  const steps = Math.round(length / 3.2);
  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    const bx = x + Math.sin(t * Math.PI * 1.2) * sway + (rand() - 0.5) * 2.4;
    const by = y + t * length;
    const r = 3.4 * (1 - t * 0.7) + rand() * 0.8;
    beads.push(
      <ellipse key={i} cx={bx} cy={by} rx={r} ry={r * 1.15} fill={i % 3 === 0 ? '#a8b36a' : i % 3 === 1 ? '#8d9a52' : '#b9c27c'} />
    );
  }
  return <g>{beads}</g>;
}

function BabysBreath({ cx, cy, spread, count, seed }) {
  const rand = rng(seed);
  const items = [];
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const d = spread * (0.3 + rand() * 0.7);
    const x = cx + Math.cos(a) * d;
    const y = cy + Math.sin(a) * d * 0.8;
    items.push(
      <g key={i}>
        <path d={`M${cx},${cy} L${x},${y}`} stroke="#8d9866" strokeWidth=".45" opacity=".7" />
        <circle cx={x} cy={y} r={1.6 + rand() * 1.4} fill="#fbf8f1" />
        <circle cx={x + 1.8} cy={y - 1.2} r={1 + rand()} fill="#f1ebdd" />
      </g>
    );
  }
  return <g>{items}</g>;
}

/**
 * Ramo vectorial inspirado en la referencia: hortensias malva, dalias vino,
 * tulipán, calas blancas, nube (gypsophila) y amaranto verde colgante.
 * Por defecto usa la versión marfil (paleta negro y dorado de la boda);
 * `variant="wine"` conserva los tonos vino de la referencia.
 */
export default function FloralCluster({ className = '', mirror = false, variant = 'ivory' }) {
  const uid = useId().replace(/[:]/g, '');
  const ids = {
    shade: `hs-${uid}`,
    dahlia: `dg-${uid}`,
    dahliaCenter: `dc-${uid}`,
    tulip: `tg-${uid}`,
    calla: `cg-${uid}`,
    leaf: `lg-${uid}`,
    shadow: `sh-${uid}`,
  };
  const isIvory = variant === 'ivory';

  return (
    <svg
      className={className}
      viewBox="0 0 240 280"
      aria-hidden="true"
      style={mirror ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <radialGradient id={ids.shade} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={isIvory ? '#efe9dc' : '#7a3c4c'} />
          <stop offset="100%" stopColor={isIvory ? '#d8d0bd' : '#4a1724'} />
        </radialGradient>
        <radialGradient id={ids.dahlia} cx="50%" cy="80%" r="90%">
          <stop offset="0%" stopColor={isIvory ? '#ffffff' : '#3d0c18'} />
          <stop offset="55%" stopColor={isIvory ? '#f6f1e6' : '#6b1e32'} />
          <stop offset="100%" stopColor={isIvory ? '#ddd3bd' : '#8e3a50'} />
        </radialGradient>
        <radialGradient id={ids.dahliaCenter} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor={isIvory ? '#efe0b0' : '#2a0610'} />
          <stop offset="100%" stopColor={isIvory ? '#b9a066' : '#14030a'} />
        </radialGradient>
        <linearGradient id={ids.tulip} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9a3550" />
          <stop offset="100%" stopColor="#4a0f1f" />
        </linearGradient>
        <linearGradient id={ids.calla} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f3eee2" />
          <stop offset="100%" stopColor="#cfd3b2" />
        </linearGradient>
        <linearGradient id={ids.leaf} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#3f4a2a" />
          <stop offset="100%" stopColor="#7d8b57" />
        </linearGradient>
        <filter id={ids.shadow} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1a1208" floodOpacity=".28" />
        </filter>
      </defs>

      <g filter={`url(#${ids.shadow})`}>
        {/* calas que asoman hacia arriba */}
        <CallaLily x={58} y={64} angle={-28} size={30} gradient={ids.calla} />
        <CallaLily x={84} y={52} angle={-8} size={26} gradient={ids.calla} />
        {isIvory && <CallaLily x={150} y={70} angle={24} size={24} gradient={ids.calla} />}

        <Leaf x={40} y={150} length={70} width={16} angle={-58} gradient={ids.leaf} />
        <Leaf x={120} y={150} length={64} width={14} angle={64} gradient={ids.leaf} />
        <Leaf x={150} y={118} length={52} width={12} angle={38} gradient={ids.leaf} />
        <Leaf x={62} y={110} length={52} width={12} angle={-24} gradient={ids.leaf} />

        <Amaranthus x={42} y={146} length={118} sway={7} seed={3} />
        <Amaranthus x={64} y={158} length={84} sway={-5} seed={8} />
        {!isIvory && <Amaranthus x={142} y={150} length={60} sway={4} seed={13} />}

        {isIvory ? (
          <>
            <Hydrangea cx={92} cy={120} r={40} seed={5} shade={ids.shade} tones={HYDRANGEA_TONES.ivory} />
            <Dahlia cx={132} cy={142} r={28} seed={2} gradient={ids.dahlia} center={ids.dahliaCenter} />
            <Dahlia cx={64} cy={150} r={18} seed={6} gradient={ids.dahlia} center={ids.dahliaCenter} />
          </>
        ) : (
          <>
            <Hydrangea cx={88} cy={112} r={40} seed={5} shade={ids.shade} tones={HYDRANGEA_TONES.wine} />
            <Tulip x={150} y={80} angle={18} size={20} gradient={ids.tulip} />
            <Dahlia cx={132} cy={140} r={30} seed={2} gradient={ids.dahlia} center={ids.dahliaCenter} />
            <Dahlia cx={60} cy={150} r={19} seed={6} gradient={ids.dahlia} center={ids.dahliaCenter} />
          </>
        )}

        <BabysBreath cx={160} cy={112} spread={26} count={16} seed={4} />
        <BabysBreath cx={104} cy={168} spread={20} count={12} seed={9} />
        <BabysBreath cx={40} cy={102} spread={18} count={10} seed={11} />
      </g>
    </svg>
  );
}
