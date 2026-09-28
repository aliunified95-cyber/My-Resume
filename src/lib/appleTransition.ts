/**
 * The image transition used between journey stages — modelled on Apple's
 * product pages: the outgoing image zooms towards the viewer, blurs and fades,
 * while the next one rises from slightly smaller and sharpens into focus.
 * Floating extras move on their own, faster curve for a sense of depth.
 *
 * Pure maths, unit-tested in tests/appleTransition.test.ts.
 */
import { clamp, smoothstep } from './math';

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;

export interface LayerState {
  visible: boolean;
  /** Opacity of the whole layer. */
  opacity: number;
  /** Scale of the main image. */
  scale: number;
  /** Vertical offset as a fraction of the frame height (negative = up). */
  y: number;
  /** Blur radius in px. */
  blur: number;
  /** Multiplier on the extras' distance from the centre (1 = resting slot). */
  spread: number;
  extraOpacity: number;
  extraScale: number;
  /** Extra upward float for the extras while the stage holds, as a fraction of frame height. */
  extraLift: number;
}

const HIDDEN: LayerState = {
  visible: false,
  opacity: 0,
  scale: 1,
  y: 0,
  blur: 0,
  spread: 1,
  extraOpacity: 0,
  extraScale: 1,
  extraLift: 0,
};

/**
 * @param offset  eased journey position minus this layer's index
 *                (−1 = next up, 0 = on stage, +1 = already gone)
 * @param drift   0 → 1 while the stage is holding still, for a slow push-in
 */
export function layerState(offset: number, drift = 0): LayerState {
  if (offset <= -1 || offset >= 1) return HIDDEN;
  const push = 1 + 0.045 * clamp(drift);
  const lift = -0.04 * clamp(drift);

  if (offset <= 0) {
    // Arriving: rise out of the depth and come into focus.
    const t = 1 + offset;
    const e = easeOutCubic(t);
    return {
      visible: true,
      opacity: smoothstep(0.08, 0.7, t),
      scale: (0.66 + 0.34 * e) * push,
      y: 0.14 * (1 - e),
      blur: 18 * (1 - smoothstep(0.1, 0.95, t)),
      spread: 2 - e,
      extraOpacity: smoothstep(0.35, 0.95, t),
      extraScale: 0.45 + 0.55 * e,
      extraLift: lift,
    };
  }

  // Leaving: zoom past the viewer, blur and dissolve.
  const t = offset;
  const e = easeInCubic(t);
  return {
    visible: true,
    opacity: 1 - smoothstep(0.02, 0.6, t),
    scale: (1 + 0.6 * e + 0.12 * t) * push,
    y: -0.05 * t,
    blur: 22 * smoothstep(0, 0.7, t),
    spread: 1 + 1.6 * e + 0.2 * t,
    extraOpacity: 1 - smoothstep(0, 0.45, t),
    extraScale: 1 + 0.5 * t,
    extraLift: lift - 0.06 * t,
  };
}
