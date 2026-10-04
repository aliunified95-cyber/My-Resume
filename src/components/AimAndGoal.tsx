import { useRef } from 'react';
import { futureGoal, stageById } from '../data/resume';
import type { MotionMode } from '../lib/motion';
import { useSectionProgress } from '../lib/useSectionProgress';
import { CvButton } from './Actions';
import { Text } from './Text';

/**
 * Final scene. The aim stage's image (a sunrise by default) rises into a
 * warm glow as the section scrolls into view.
 */
export function AimAndGoal({ mode }: { mode: MotionMode }) {
  const ref = useRef<HTMLElement>(null);
  useSectionProgress(ref, mode === 'cinematic');
  const visual = stageById('aim')?.visual;
  const compass = visual?.extras?.[0];
  return (
    <section id="aim" ref={ref} className="aim" aria-labelledby="aim-heading">
      {visual && (
        <div className="aim__visual" aria-hidden="true">
          <span className="aim__light" />
          <img className="aim__image" src={visual.src} alt="" width={512} height={512} loading="lazy" decoding="async" />
        </div>
      )}
      <div className="aim__content">
        <div className="aim__head">
          {compass && <img className="aim__compass" src={compass} alt="" aria-hidden="true" width={44} height={44} loading="lazy" />}
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
          <CvButton variant="ghost" />
        </div>
      </div>
    </section>
  );
}
