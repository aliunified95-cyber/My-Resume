/**
 * Fine details drawn on top of the shared primitive pool — the small touches
 * (a graduation cap, signal arcs, node labels) that make each scene legible.
 * They fade in only while their scene is settled, so the morph stays clean.
 */
import type { SceneKey } from '../data/types';
import { networkNodes } from './layouts';

const stroke = { fill: 'none', stroke: 'var(--ivory)', strokeWidth: 1.25, vectorEffect: 'non-scaling-stroke' as const };
const accentStroke = { ...stroke, stroke: 'var(--accent)' };

function School() {
  return (
    <g>
      <path d="M548 132 q8 -8 16 0 q8 -8 16 0" {...stroke} opacity={0.5} />
      <path d="M594 108 q6 -6 12 0 q6 -6 12 0" {...stroke} opacity={0.35} />
      <path d="M400 208 v-8 M400 208 h7" {...accentStroke} />
    </g>
  );
}

function University() {
  return (
    <g transform="rotate(-8 190 118)">
      <path d="M130 118 L190 92 L250 118 L190 144 Z" {...stroke} fill="rgba(201,164,92,0.18)" />
      <path d="M160 131 v22 q30 16 60 0 v-22" {...stroke} />
      <path d="M190 118 L236 128 v34" {...accentStroke} />
      <circle cx={236} cy={165} r={3} fill="var(--accent)" />
    </g>
  );
}

function Store() {
  return (
    <g>
      <text x={400} y={159} textAnchor="middle" className="scene-label" letterSpacing="5">STORE</text>
      <path d="M150 240 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0 q12.5 12 25 0" {...accentStroke} opacity={0.7} />
    </g>
  );
}

function Finance() {
  return (
    <g>
      <path d="M560 126 L604 104 L640 114 L700 70" {...accentStroke} opacity={0.8} />
      <path d="M686 70 H700 V84" {...accentStroke} opacity={0.8} />
      <circle cx={400} cy={206} r={9} {...stroke} stroke="var(--bg)" />
    </g>
  );
}

function Telecom() {
  const arcs = [14, 26, 38];
  return (
    <g>
      {arcs.map((r, i) => (
        <g key={r} opacity={0.75 - i * 0.2}>
          <path d={`M${690 - r} ${244 - r * 0.2} A${r} ${r} 0 0 1 ${690 - r * 0.2} ${244 - r}`} {...accentStroke} />
          <path d={`M${690 + r * 0.2} ${244 - r} A${r} ${r} 0 0 1 ${690 + r} ${244 - r * 0.2}`} {...accentStroke} />
        </g>
      ))}
      <text x={400} y={217} textAnchor="middle" className="scene-label scene-label--dark" letterSpacing="4">MOBILE · HOME · TV</text>
    </g>
  );
}

function Digital() {
  return (
    <g>
      <path d="M552 376 l0 22 l6 -6 l5 11 l4 -2 l-5 -11 l8 0 Z" {...stroke} fill="var(--bg)" />
      <path d="M640 330 C 600 330, 600 250, 560 250" {...accentStroke} strokeDasharray="3 5" opacity={0.7} />
    </g>
  );
}

function Treasury() {
  return (
    <g opacity={0.45}>
      {[290, 330, 370, 410].map((y) => (
        <line key={y} x1={160} x2={416} y1={y} y2={y} {...stroke} strokeDasharray="2 6" />
      ))}
      <text x={547} y={349} textAnchor="middle" className="scene-label scene-label--dark">FX</text>
    </g>
  );
}

function Team() {
  return (
    <g>
      <ellipse cx={400} cy={472} rx={70} ry={6} fill="rgba(201,164,92,0.22)" />
      <path d="M400 250 v-26 M388 236 h24" {...accentStroke} opacity={0.6} />
    </g>
  );
}

function Eshop() {
  return (
    <g>
      <path d="M592 128 h6 l5 16 h16 l4 -11 h-22" {...stroke} />
      <circle cx={606} cy={148} r={2} fill="var(--ivory)" />
      <circle cx={617} cy={148} r={2} fill="var(--ivory)" />
      <rect x={380} y={127} width={160} height={16} rx={8} {...stroke} opacity={0.5} />
    </g>
  );
}

function Network() {
  return (
    <g>
      <ellipse cx={400} cy={300} rx={262} ry={206} {...accentStroke} strokeDasharray="2 10" className="flow-ring" opacity={0.6} />
      {networkNodes.map((n) => (
        <text key={n.label} x={n.x + 12} y={n.y + 4.5} textAnchor="middle" className="scene-label scene-label--node">
          {n.label.toUpperCase()}
        </text>
      ))}
      <text x={400} y={305} textAnchor="middle" className="scene-label scene-label--dark">TEAM</text>
    </g>
  );
}

function Academic() {
  return (
    <g>
      <path d="M500 380 q40 -14 70 0 q30 -14 70 0 v-4 q-40 -12 -70 2 q-30 -14 -70 -2 Z" {...stroke} fill="rgba(237,230,217,0.06)" />
      <path d="M570 380 v-6" {...stroke} />
      <path d="M612 228 l-24 -14" {...stroke} opacity={0.6} />
    </g>
  );
}

function Horizon() {
  const rays = Array.from({ length: 9 }, (_, i) => -160 + i * 17.5);
  return (
    <g>
      {rays.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 400 + Math.cos(rad) * 98;
        const y1 = 318 + Math.sin(rad) * 98;
        const x2 = 400 + Math.cos(rad) * 128;
        const y2 = 318 + Math.sin(rad) * 128;
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} {...accentStroke} opacity={0.5} />;
      })}
    </g>
  );
}

export const sceneDetails: Record<SceneKey, () => React.JSX.Element> = {
  school: School,
  university: University,
  store: Store,
  finance: Finance,
  telecom: Telecom,
  digital: Digital,
  treasury: Treasury,
  team: Team,
  eshop: Eshop,
  network: Network,
  academic: Academic,
  horizon: Horizon,
};
