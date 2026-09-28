import { useRef } from 'react';
import { futureGoal } from '../data/resume';
import type { MotionMode } from '../lib/motion';
import { useSectionProgress } from '../lib/useSectionProgress';
import { ContactButton, CvButton } from './Actions';
import { Text } from './Text';

const HORIZON = 520;

function Horizon() {
  const stars = [
    [140, 120, 1.6], [320, 70, 1.2], [460, 180, 1.4], [620, 90, 1.1], [1010, 70, 1.3], [1180, 150, 1.7], [1360, 90, 1.2], [1480, 210, 1.4], [240, 260, 1], [1300, 300, 1],
  ];
  const rays = Array.from({ length: 13 }, (_, i) => -168 + i * 13);
  return (
    <svg className="aim__svg" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="aim-sky" cx="50%" cy="65%" r="60%">
          <stop offset="0%" stopColor="rgb(201,164,92)" stopOpacity="0.32" />
          <stop offset="45%" stopColor="rgb(201,164,92)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="rgb(201,164,92)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="aim-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(246,226,180)" />
          <stop offset="70%" stopColor="rgb(214,178,104)" />
          <stop offset="100%" stopColor="rgb(201,164,92)" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id="aim-path" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="rgb(201,164,92)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="rgb(201,164,92)" stopOpacity="0.02" />
        </linearGradient>
        <clipPath id="aim-above">
          <rect x="0" y="0" width="1600" height={HORIZON} />
        </clipPath>
      </defs>
      <rect className="aim__sky" x="0" y="0" width="1600" height="800" fill="url(#aim-sky)" />
      <g className="aim__stars">
        {stars.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="var(--ivory)" />
        ))}
      </g>
      <g clipPath="url(#aim-above)">
        <g className="aim__sun">
          <g className="aim__rays">
            {rays.map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1={800 + Math.cos(rad) * 150}
                  y1={HORIZON + Math.sin(rad) * 150}
                  x2={800 + Math.cos(rad) * 210}
                  y2={HORIZON + Math.sin(rad) * 210}
                  stroke="var(--accent)"
                  strokeOpacity="0.55"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </g>
          <circle cx="800" cy={HORIZON} r="118" fill="url(#aim-sun)" />
          <circle cx="800" cy={HORIZON} r="250" fill="none" stroke="var(--accent)" strokeOpacity="0.16" vectorEffect="non-scaling-stroke" />
        </g>
        <path d={`M0 ${HORIZON} L260 440 L430 ${HORIZON} M1140 ${HORIZON} L1330 430 L1600 ${HORIZON}`} fill="none" stroke="var(--ivory)" strokeOpacity="0.25" vectorEffect="non-scaling-stroke" />
      </g>
      <line x1="0" y1={HORIZON} x2="1600" y2={HORIZON} stroke="var(--ivory)" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
      <path className="aim__road" d={`M560 800 L796 ${HORIZON} L804 ${HORIZON} L1040 800 Z`} fill="url(#aim-path)" />
      <path d={`M560 800 L796 ${HORIZON} M1040 800 L804 ${HORIZON}`} stroke="var(--ivory)" strokeOpacity="0.55" fill="none" vectorEffect="non-scaling-stroke" />
      {[[770, 14, 44], [680, 11, 30], [615, 8, 20], [572, 6, 13], [546, 4, 8], [531, 3, 5]].map(([y, w, h]) => (
        <rect key={y} x={800 - w / 2} y={y - h / 2} width={w} height={h} rx="1" fill="var(--accent)" opacity="0.8" />
      ))}
    </svg>
  );
}

function Compass() {
  return (
    <svg className="aim__compass" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeOpacity="0.2" />
      <path d="M32 6 L36 32 L32 58 L28 32 Z" fill="none" stroke="currentColor" strokeOpacity="0.5" />
      <path d="M32 6 L36 32 L28 32 Z" fill="var(--accent)" />
      <path d="M6 32 L32 28 L58 32 L32 36 Z" fill="none" stroke="currentColor" strokeOpacity="0.3" />
    </svg>
  );
}

export function AimAndGoal({ mode }: { mode: MotionMode }) {
  const ref = useRef<HTMLElement>(null);
  useSectionProgress(ref, mode === 'cinematic');
  return (
    <section id="aim" ref={ref} className="aim" aria-labelledby="aim-heading">
      <div className="aim__visual">
        <Horizon />
      </div>
      <div className="aim__content">
        <div className="aim__head">
          <Compass />
          <h2 id="aim-heading" className="eyebrow">Aim &amp; future goal</h2>
        </div>
        <p className="aim__statement">
          <Text>{futureGoal.aim}</Text>
        </p>
        <div className="aim__grid">
          <div>
            <h3 className="aim__label">Long-term goal</h3>
            <p><Text>{futureGoal.longTermGoal}</Text></p>
          </div>
          <div>
            <h3 className="aim__label">The impact I want to create</h3>
            <p><Text>{futureGoal.impact}</Text></p>
          </div>
          <div>
            <h3 className="aim__label">Opportunities I’m interested in</h3>
            <ul className="aim__list">
              {futureGoal.opportunities.map((o, i) => (
                <li key={i}><Text>{o}</Text></li>
              ))}
            </ul>
          </div>
        </div>
        <p className="aim__closing">
          <Text>{futureGoal.closingLine}</Text>
        </p>
        <div className="aim__actions">
          <ContactButton variant="primary" />
          <CvButton variant="ghost" />
        </div>
      </div>
    </section>
  );
}
