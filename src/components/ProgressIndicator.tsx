import type { Ref } from 'react';
import type { JourneyStage } from '../data/types';
import { Text } from './Text';

interface Props {
  stages: JourneyStage[];
  /** 0 = opening, 1…n = stage. */
  active: number;
  onJump: (index: number) => void;
  fillRef: Ref<HTMLSpanElement>;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function ProgressIndicator({ stages, active, onJump, fillRef }: Props) {
  const current = active > 0 ? stages[active - 1] : undefined;
  return (
    <nav className={`progress${active === 0 ? ' progress--opening' : ''}`} aria-label="Journey chapters">
      <p className="progress__now">
        <span className="progress__num">{pad(Math.max(active, 1))}</span>
        <span className="progress__total"> / {pad(stages.length)}</span>
        <span className="progress__title">
          {current ? <Text>{current.shortTitle ?? current.title}</Text> : 'The journey'}
        </span>
      </p>
      <div className="progress__track" aria-hidden="true">
        <span className="progress__fill" ref={fillRef} />
      </div>
      <ol className="progress__list">
        {stages.map((s, i) => {
          const isActive = active === i + 1;
          return (
            <li key={s.id}>
              <button
                type="button"
                className={`progress__dot${isActive ? ' is-active' : ''}${active > i + 1 ? ' is-past' : ''}`}
                aria-current={isActive ? 'step' : undefined}
                onClick={() => onJump(i + 1)}
              >
                <span className="visually-hidden">Chapter {i + 1}: </span>
                <span className="progress__label">
                  <Text>{s.shortTitle ?? s.title}</Text>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
