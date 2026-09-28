/**
 * Pure timeline maths for the scroll story (unit-tested in tests/timeline.test.ts).
 *
 * Scene 0 is the opening (the name). Scenes 1…S are the journey stages.
 * `q` is the scroll position measured in scenes (0 → S). Each scene first
 * holds still (so text can be read), then morphs into the next one.
 */
import { clamp, easeInOutCubic } from './math';

/** Share of each scene's scroll length spent holding still before morphing. */
export const HOLD = 0.45;
/** Extra scroll (in scenes) after the final scene so it can be enjoyed. */
export const TAIL = 0.5;

export interface TimelinePoint {
  /** Index of the scene we are in or leaving. */
  scene: number;
  /** Linear morph progress towards scene + 1 (0 while holding). */
  morph: number;
  /** Continuous eased position, e.g. 3.5 = halfway between scenes 3 and 4. */
  position: number;
}

export function scrollToQ(fraction: number, sceneCount: number): number {
  const s = sceneCount - 1;
  return Math.min(s, clamp(fraction) * (s + TAIL));
}

export function qToScroll(q: number, sceneCount: number): number {
  const s = sceneCount - 1;
  return clamp(q / (s + TAIL));
}

export function timelineAt(q: number, sceneCount: number): TimelinePoint {
  const last = sceneCount - 1;
  const scene = Math.min(Math.floor(q), last);
  if (scene >= last) return { scene: last, morph: 0, position: last };
  const f = q - scene;
  // The opening starts transforming as soon as the visitor scrolls.
  const hold = scene === 0 ? 0.04 : HOLD;
  const morph = clamp((f - hold) / (1 - hold));
  return { scene, morph, position: scene + easeInOutCubic(morph) };
}

/** Opacity of a scene's text panel for a given eased position. */
export function panelOpacity(position: number, index: number): number {
  return clamp(1 - Math.abs(position - index) * 2.2);
}

/** Scroll position (in scenes) at which the n-th revealed item of a scene appears. */
export function revealAt(index: number, item: number): number {
  return index - 0.28 + item * 0.08;
}

/** Where the "jump to stage" controls land: a little into the scene's hold. */
export function jumpQ(index: number): number {
  return index === 0 ? 0 : index + 0.3;
}
