import { forwardRef, memo } from 'react';
import type { StageVisual as Visual } from '../data/types';

/** Where the floating extras sit around the main image, as % of the frame. */
export const EXTRA_SLOTS = [
  { x: -33, y: -29, s: 0.25 },
  { x: 35, y: -25, s: 0.21 },
  { x: 34, y: 31, s: 0.23 },
  { x: -35, y: 29, s: 0.19 },
];

interface Props {
  visual: Visual;
  /** Hidden from assistive tech (used in the animated stack, where the text carries the meaning). */
  decorative?: boolean;
  /** Load immediately instead of lazily. */
  eager?: boolean;
  className?: string;
}

/** Photography and an organisation logo, with supporting decorative illustrations. */
export const StageVisual = memo(
  forwardRef<HTMLElement, Props>(function StageVisual({ visual, decorative = false, eager = false, className = '' }, ref) {
    const extras = (visual.extras ?? []).slice(0, EXTRA_SLOTS.length);
    return (
      <figure ref={ref} className={`visual visual--${visual.kind ?? 'icon'} ${className}`.trim()} aria-hidden={decorative || undefined}>
        <span className="visual__glow" aria-hidden="true" />
        <div className="visual__main">
          {visual.backdrop && (
            <img className="visual__backdrop" src={visual.backdrop.src} alt={decorative ? '' : visual.backdrop.alt}
              width={visual.backdrop.width} height={visual.backdrop.height} loading={eager ? 'eager' : 'lazy'} decoding="async" />
          )}
          <img
          className="visual__image"
          src={visual.src}
          alt={decorative ? '' : visual.alt}
          width={512}
          height={512}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          />
          {visual.caption && <span className="visual__caption">{visual.caption}</span>}
        </div>
        {extras.map((src, i) => {
          const slot = EXTRA_SLOTS[i];
          return (
            <img
              key={`${src}-${i}`}
              className="visual__extra"
              data-extra={i}
              src={src}
              alt=""
              aria-hidden="true"
              width={256}
              height={256}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              style={
                {
                  '--x': `${slot.x}%`,
                  '--y': `${slot.y}%`,
                  '--s': slot.s,
                } as React.CSSProperties
              }
            />
          );
        })}
      </figure>
    );
  }),
);
