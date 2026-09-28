/** Colours used inside the SVG scenes. Keep in sync with the tokens in src/styles/global.css. */
export const ACCENT: [number, number, number] = [201, 164, 92];
export const IVORY: [number, number, number] = [237, 230, 217];

/** Mixes accent → ivory. c = 0 gives accent, c = 1 gives ivory. */
export function mixFill(c: number): string {
  const r = Math.round(ACCENT[0] + (IVORY[0] - ACCENT[0]) * c);
  const g = Math.round(ACCENT[1] + (IVORY[1] - ACCENT[1]) * c);
  const b = Math.round(ACCENT[2] + (IVORY[2] - ACCENT[2]) * c);
  return `rgb(${r},${g},${b})`;
}
