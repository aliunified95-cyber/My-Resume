import { memo, useId, type Ref } from 'react';
import type { SceneKey } from '../data/types';
import { POOL, VIEW_H, VIEW_W, type SceneLayout } from './layouts';
import { mixFill } from './palette';
import { sceneDetails } from './SceneDetails';

export interface PoolRefs {
  rects: (SVGRectElement | null)[];
  lines: (SVGLineElement | null)[];
  circles: (SVGCircleElement | null)[];
  details: Partial<Record<SceneKey, SVGGElement | null>>;
}

interface Props {
  layout: SceneLayout;
  /** Scenes whose detail layers to render. The first is visible when `detailsVisible`. */
  detailScenes: SceneKey[];
  detailsVisible?: boolean;
  refs?: PoolRefs;
  svgRef?: Ref<SVGSVGElement>;
  className?: string;
  /** Accessible description when the art is meaningful; omit to mark it decorative. */
  label?: string;
}

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Renders the shared primitive pool in a given layout. Used both for static
 * scene images (résumé / reduced-motion mode) and as the initial frame of the
 * animated stage, whose engine then mutates the same elements via `refs`.
 */
export const ScenePool = memo(function ScenePool({ layout, detailScenes, detailsVisible = true, refs, svgRef, className, label }: Props) {
  const glowId = `glow${useId().replace(/:/g, '')}`;
  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="rgb(201,164,92)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="rgb(201,164,92)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={400} cy={330} rx={380} ry={260} fill={`url(#${glowId})`} />
      <g className="pool-lines">
        {layout.lines.slice(0, POOL.lines).map((l, i) => (
          <line
            key={i}
            ref={refs ? (el) => { refs.lines[i] = el; } : undefined}
            x1={round(l.x1)}
            y1={round(l.y1)}
            x2={round(l.x2)}
            y2={round(l.y2)}
            strokeOpacity={round(l.o)}
          />
        ))}
      </g>
      <g className="pool-rects">
        {layout.rects.slice(0, POOL.rects).map((r, i) => (
          <rect
            key={i}
            ref={refs ? (el) => { refs.rects[i] = el; } : undefined}
            x={round(r.x)}
            y={round(r.y)}
            width={round(r.w)}
            height={round(r.h)}
            rx={round(Math.min(r.rx, r.w / 2, r.h / 2))}
            strokeOpacity={round(r.o)}
            fillOpacity={round(r.f)}
            fill={mixFill(r.c)}
          />
        ))}
      </g>
      <g className="pool-circles">
        {layout.circles.slice(0, POOL.circles).map((c, i) => (
          <circle
            key={i}
            ref={refs ? (el) => { refs.circles[i] = el; } : undefined}
            cx={round(c.cx)}
            cy={round(c.cy)}
            r={round(c.r)}
            strokeOpacity={round(c.o)}
            fillOpacity={round(c.f)}
            fill={mixFill(c.c)}
          />
        ))}
      </g>
      <g className="pool-details">
        {detailScenes.map((key, i) => {
          const Detail = sceneDetails[key];
          return (
            <g
              key={key}
              ref={refs ? (el) => { refs.details[key] = el; } : undefined}
              opacity={detailsVisible && i === 0 ? 1 : 0}
            >
              <Detail />
            </g>
          );
        })}
      </g>
    </svg>
  );
});
