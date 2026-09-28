/**
 * Scene layouts for the transformation engine.
 *
 * Every scene is drawn with the SAME pool of primitives — 30 rectangles,
 * 18 lines and 16 circles — on an 800 × 600 canvas. Moving from one scene to
 * the next interpolates each primitive from its old position to its new one,
 * so school windows become certificate text, the certificate becomes a shop
 * front, shop products become bank columns, and so on. Primitives a scene
 * does not need collapse to a point and fade out.
 *
 * Index roles are kept loosely consistent between scenes so the motion reads
 * as meaningful:  R0 = main frame · R1–R12 = cells (windows, cards, people…)
 * R13 = door / key accent · R14 = sign / banner · R15–R17 = structure
 * R18–R29 = small items (products, bars, parcels, books).
 */
import type { SceneKey } from '../data/types';

export const VIEW_W = 800;
export const VIEW_H = 600;
export const POOL = { rects: 30, lines: 18, circles: 16 } as const;

/** o = stroke opacity, f = fill opacity, c = fill colour (0 = accent → 1 = ivory). */
export interface RectShape { x: number; y: number; w: number; h: number; rx: number; o: number; f: number; c: number }
export interface LineShape { x1: number; y1: number; x2: number; y2: number; o: number }
export interface CircleShape { cx: number; cy: number; r: number; o: number; f: number; c: number }

export interface SceneLayout {
  rects: RectShape[];
  lines: LineShape[];
  circles: CircleShape[];
}

type RectInput = Partial<RectShape> & Pick<RectShape, 'x' | 'y' | 'w' | 'h'>;
type LineInput = [number, number, number, number, number?];
type CircleInput = Partial<CircleShape> & Pick<CircleShape, 'cx' | 'cy' | 'r'>;

interface SceneSpec {
  anchor?: [number, number];
  rects?: Record<number, RectInput>;
  lines?: Record<number, LineInput>;
  circles?: Record<number, CircleInput>;
}

function build(spec: SceneSpec): SceneLayout {
  const [ax, ay] = spec.anchor ?? [VIEW_W / 2, VIEW_H / 2];
  const rects: RectShape[] = [];
  for (let i = 0; i < POOL.rects; i++) {
    const r = spec.rects?.[i];
    rects.push(
      r
        ? { rx: 2, o: 0.8, f: 0, c: 0, ...r }
        : { x: ax, y: ay, w: 0, h: 0, rx: 0, o: 0, f: 0, c: 0 },
    );
  }
  const lines: LineShape[] = [];
  for (let i = 0; i < POOL.lines; i++) {
    const l = spec.lines?.[i];
    lines.push(
      l
        ? { x1: l[0], y1: l[1], x2: l[2], y2: l[3], o: l[4] ?? 0.6 }
        : { x1: ax, y1: ay, x2: ax, y2: ay, o: 0 },
    );
  }
  const circles: CircleShape[] = [];
  for (let i = 0; i < POOL.circles; i++) {
    const c = spec.circles?.[i];
    circles.push(c ? { o: 0.8, f: 0, c: 0, ...c } : { cx: ax, cy: ay, r: 0, o: 0, f: 0, c: 0 });
  }
  return { rects, lines, circles };
}

/** Shrinks every primitive to its own centre — used for the opening "name" state. */
function collapseInPlace(layout: SceneLayout, keepLines: number[] = []): SceneLayout {
  return {
    rects: layout.rects.map((r) => ({ ...r, x: r.x + r.w / 2, y: r.y + r.h / 2, w: 0, h: 0, o: 0, f: 0 })),
    lines: layout.lines.map((l, i) => {
      if (keepLines.includes(i)) return { ...l, o: l.o * 0.4 };
      const mx = (l.x1 + l.x2) / 2;
      const my = (l.y1 + l.y2) / 2;
      return { x1: mx, y1: my, x2: mx, y2: my, o: 0 };
    }),
    circles: layout.circles.map((c) => ({ ...c, r: 0, o: 0, f: 0 })),
  };
}

const GROUND = 470;

/* ------------------------------------------------------------------ school */
const windowCols = [245, 305, 455, 515];
const schoolWindows: Record<number, RectInput> = {};
windowCols.forEach((x, i) => {
  schoolWindows[1 + i] = { x, y: 282, w: 40, h: 46, o: 0.8, f: 0.18 };
  schoolWindows[5 + i] = { x, y: 362, w: 40, h: 46, o: 0.8, f: 0.18 };
});

const school = build({
  anchor: [400, 330],
  rects: {
    0: { x: 220, y: 250, w: 360, h: 220, o: 0.9 },
    ...schoolWindows,
    9: { x: 358, y: 458, w: 84, h: 12, o: 0.6, f: 0.05 },
    13: { x: 375, y: 385, w: 50, h: 85, rx: 4, o: 0.9, f: 0.45 },
    14: { x: 401, y: 110, w: 38, h: 22, rx: 1, o: 0.9, f: 0.9 },
    15: { x: 208, y: 238, w: 384, h: 12, o: 0.7, f: 0.1 },
  },
  lines: {
    0: [40, GROUND, 760, GROUND, 0.5],
    1: [208, 238, 400, 168, 0.8],
    2: [400, 168, 592, 238, 0.8],
    3: [400, 168, 400, 106, 0.7],
    4: [140, GROUND, 140, 432, 0.6],
    5: [660, GROUND, 660, 432, 0.6],
  },
  circles: {
    0: { cx: 400, cy: 208, r: 14, o: 0.9, f: 0.15 },
    1: { cx: 140, cy: 404, r: 32, o: 0.55, f: 0.07, c: 1 },
    2: { cx: 660, cy: 404, r: 32, o: 0.55, f: 0.07, c: 1 },
  },
});

/* -------------------------------------------------------------- university */
const textBar = { o: 0, f: 0.5, c: 1, rx: 2.5 };
const university = build({
  anchor: [400, 290],
  rects: {
    0: { x: 180, y: 130, w: 440, h: 310, rx: 4, o: 0.9, f: 0.03 },
    1: { x: 300, y: 194, w: 200, h: 12, ...textBar, rx: 6, f: 0.8 },
    2: { x: 340, y: 222, w: 120, h: 5, ...textBar },
    3: { x: 240, y: 262, w: 320, h: 5, ...textBar },
    4: { x: 252, y: 278, w: 296, h: 5, ...textBar },
    5: { x: 272, y: 294, w: 256, h: 5, ...textBar },
    6: { x: 300, y: 324, w: 200, h: 10, rx: 5, o: 0, f: 0.9 },
    7: { x: 230, y: 390, w: 110, h: 2, ...textBar, f: 0.7 },
    8: { x: 254, y: 400, w: 62, h: 4, ...textBar, f: 0.35 },
    9: { x: 196, y: 146, w: 408, h: 278, rx: 2, o: 0.35 },
    13: { x: 528, y: 398, w: 10, h: 46, rx: 1, o: 0, f: 0.9 },
    14: { x: 544, y: 398, w: 10, h: 46, rx: 1, o: 0, f: 0.9 },
  },
  lines: {
    0: [100, GROUND, 700, GROUND, 0.25],
    1: [236, 200, 286, 200, 0.6],
    2: [514, 200, 564, 200, 0.6],
  },
  circles: {
    0: { cx: 541, cy: 386, r: 26, o: 0.9, f: 0.85 },
    1: { cx: 196, cy: 146, r: 3.5, o: 0, f: 0.9 },
    2: { cx: 604, cy: 146, r: 3.5, o: 0, f: 0.9 },
    3: { cx: 196, cy: 424, r: 3.5, o: 0, f: 0.9 },
    4: { cx: 604, cy: 424, r: 3.5, o: 0, f: 0.9 },
  },
});

/* ------------------------------------------------------------------- store */
const product = (x: number, y: number, w = 20, h = 22, c = 0): RectInput => ({ x, y, w, h, rx: 2, o: 0.5, f: c ? 0.3 : 0.55, c });
const store = build({
  anchor: [400, 330],
  rects: {
    0: { x: 160, y: 180, w: 480, h: 290, o: 0.9, f: 0.03 },
    1: { x: 188, y: 262, w: 150, h: 130, o: 0.8, f: 0.08 },
    2: { x: 462, y: 262, w: 150, h: 130, o: 0.8, f: 0.08 },
    3: { x: 196, y: 318, w: 134, h: 3, ...textBar, f: 0.4 },
    4: { x: 196, y: 364, w: 134, h: 3, ...textBar, f: 0.4 },
    5: { x: 470, y: 318, w: 134, h: 3, ...textBar, f: 0.4 },
    6: { x: 470, y: 364, w: 134, h: 3, ...textBar, f: 0.4 },
    9: { x: 150, y: 460, w: 500, h: 10, o: 0.6, f: 0.05 },
    13: { x: 368, y: 330, w: 64, h: 140, o: 0.9, f: 0.4 },
    14: { x: 310, y: 138, w: 180, h: 32, rx: 16, o: 0.9 },
    15: { x: 150, y: 210, w: 500, h: 30, rx: 3, o: 0.8, f: 0.55 },
    18: product(206, 296),
    19: product(234, 296, 20, 22, 1),
    20: product(262, 296),
    21: product(292, 296, 20, 22, 1),
    22: product(480, 296, 20, 22, 1),
    23: product(508, 296),
    24: product(536, 296, 20, 22, 1),
    25: product(566, 296),
    26: product(206, 342, 28, 22, 1),
    27: product(246, 342, 28, 22),
    28: product(480, 342, 28, 22),
    29: product(522, 342, 28, 22, 1),
  },
  lines: {
    0: [40, GROUND, 760, GROUND, 0.5],
    1: [150, 240, 650, 240, 0.4],
    3: [80, GROUND, 80, 330, 0.5],
    4: [340, 170, 340, 180, 0.5],
    5: [460, 170, 460, 180, 0.5],
  },
  circles: {
    0: { cx: 422, cy: 402, r: 3, o: 0.9, f: 1 },
    1: { cx: 118, cy: 450, r: 20, o: 0.5, f: 0.07, c: 1 },
    2: { cx: 682, cy: 450, r: 20, o: 0.5, f: 0.07, c: 1 },
    3: { cx: 80, cy: 322, r: 10, o: 0.8, f: 0.7 },
  },
});

/* ----------------------------------------------------------------- finance */
const columns: Record<number, RectInput> = {};
for (let i = 0; i < 6; i++) {
  columns[1 + i] = { x: 222 + i * 66, y: 262, w: 26, h: 186, rx: 2, o: 0.85, f: 0.08 };
}
const finance = build({
  anchor: [400, 330],
  rects: {
    0: { x: 200, y: 256, w: 400, h: 192, rx: 0, o: 0.25, f: 0.02 },
    ...columns,
    9: { x: 188, y: 448, w: 424, h: 10, o: 0.7, f: 0.05 },
    10: { x: 172, y: 458, w: 456, h: 12, o: 0.7, f: 0.05 },
    15: { x: 188, y: 236, w: 424, h: 20, o: 0.85, f: 0.12 },
  },
  lines: {
    0: [40, GROUND, 760, GROUND, 0.5],
    1: [188, 236, 400, 160, 0.8],
    2: [400, 160, 612, 236, 0.8],
    4: [110, GROUND, 110, 452, 0.5],
    5: [690, GROUND, 690, 452, 0.5],
  },
  circles: {
    0: { cx: 400, cy: 206, r: 18, o: 0.9, f: 0.8 },
    1: { cx: 110, cy: 430, r: 24, o: 0.4, f: 0.06, c: 1 },
    2: { cx: 690, cy: 430, r: 24, o: 0.4, f: 0.06, c: 1 },
  },
});

/* ----------------------------------------------------------------- telecom */
const phones: Record<number, RectInput> = {};
for (let i = 0; i < 6; i++) {
  phones[1 + i] = { x: 209 + i * 66, y: 262, w: 28, h: 50, rx: 5, o: 0.8, f: 0.12, c: 1 };
}
const telecom = build({
  anchor: [400, 330],
  rects: {
    0: { x: 170, y: 190, w: 460, h: 280, o: 0.9, f: 0.03 },
    ...phones,
    7: { x: 196, y: 320, w: 408, h: 3, ...textBar, f: 0.4 },
    14: { x: 170, y: 190, w: 460, h: 44, rx: 2, o: 0.9, f: 0.7 },
    15: { x: 250, y: 382, w: 300, h: 52, rx: 3, o: 0.85, f: 0.1 },
    16: { x: 358, y: 356, w: 46, h: 26, rx: 2, o: 0.8, f: 0.25 },
    17: { x: 462, y: 414, w: 36, h: 56, rx: 16, o: 0.8, f: 0.1, c: 1 },
  },
  lines: {
    0: [40, GROUND, 760, GROUND, 0.5],
    3: [690, 250, 670, GROUND, 0.6],
    6: [690, 250, 710, GROUND, 0.6],
    7: [676, 400, 704, 400, 0.4],
    8: [682, 330, 698, 330, 0.4],
  },
  circles: {
    0: { cx: 300, cy: 356, r: 14, o: 0.8, f: 0.2 },
    1: { cx: 480, cy: 398, r: 13, o: 0.8, f: 0.15, c: 1 },
    2: { cx: 690, cy: 244, r: 6, o: 0.9, f: 1 },
  },
});

/* ----------------------------------------------------------------- digital */
const cardCols = [214, 342, 470];
const cardRows = [180, 290];
const digitalCards: Record<number, RectInput> = {};
cardRows.forEach((y, row) =>
  cardCols.forEach((x, col) => {
    const i = row * 3 + col;
    digitalCards[1 + i] = { x, y, w: 116, h: 96, rx: 6, o: 0.6, f: 0.04 };
    digitalCards[18 + i] = { x: x + 14, y: y + 72, w: 52, h: 10, rx: 5, o: 0, f: 0.85 };
    digitalCards[24 + i] = { x: x + 14, y: y + 14, w: 40, h: 40, rx: 4, o: 0, f: 0.16, c: 1 };
  }),
);
const digital = build({
  anchor: [400, 290],
  rects: {
    0: { x: 190, y: 130, w: 420, h: 270, rx: 10, o: 0.9, f: 0.03 },
    ...digitalCards,
    7: { x: 654, y: 314, w: 46, h: 6, ...textBar, f: 0.3 },
    8: { x: 654, y: 328, w: 32, h: 6, ...textBar, f: 0.3 },
    13: { x: 642, y: 250, w: 70, h: 136, rx: 12, o: 0.85, f: 0.03 },
    14: { x: 206, y: 146, w: 388, h: 20, rx: 4, o: 0.35, f: 0.07, c: 1 },
    15: { x: 150, y: 400, w: 500, h: 14, rx: 7, o: 0.85, f: 0.15 },
    16: { x: 654, y: 270, w: 46, h: 34, rx: 4, o: 0, f: 0.45 },
  },
  lines: {
    0: [60, 414, 740, 414, 0.3],
  },
  circles: {
    0: { cx: 548, cy: 372, r: 11, o: 0.8, f: 0.2 },
    1: { cx: 706, cy: 258, r: 5, o: 0, f: 1 },
  },
});

/* ---------------------------------------------------------------- treasury */
const barHeights = [60, 82, 70, 108, 96, 128, 118, 148, 138, 168];
const treasuryBars: Record<number, RectInput> = {};
barHeights.forEach((h, i) => {
  treasuryBars[18 + i] = { x: 166 + i * 25, y: 430 - h, w: 15, h, rx: 2, o: 0, f: i % 3 === 2 ? 0.25 : 0.6, c: i % 3 === 2 ? 1 : 0 };
});
const kpi: Record<number, RectInput> = {};
for (let i = 0; i < 3; i++) {
  kpi[1 + i] = { x: 150 + i * 172, y: 172, w: 156, h: 56, rx: 6, o: 0.6, f: 0.05 };
  kpi[4 + i] = { x: 164 + i * 172, y: 198, w: 60 + i * 12, h: 10, rx: 5, o: 0, f: 0.85 };
}
const sparkline: [number, number][] = [[166, 380], [206, 360], [246, 366], [286, 330], [326, 336], [366, 300], [406, 282]];
const hub: [number, number] = [547, 344];
const satellites: [number, number][] = [[480, 290], [614, 290], [480, 402], [614, 402], [547, 270]];
const treasury = build({
  anchor: [400, 300],
  rects: {
    0: { x: 130, y: 120, w: 540, h: 340, rx: 10, o: 0.8, f: 0.02 },
    ...kpi,
    7: { x: 150, y: 244, w: 276, h: 200, rx: 6, o: 0.3 },
    8: { x: 440, y: 244, w: 214, h: 200, rx: 6, o: 0.3 },
    14: { x: 146, y: 136, w: 508, h: 22, rx: 4, o: 0.3, f: 0.07, c: 1 },
    ...treasuryBars,
  },
  lines: {
    0: [60, GROUND, 740, GROUND, 0.2],
    ...Object.fromEntries(
      sparkline.slice(0, -1).map(([x, y], i) => [1 + i, [x, y, sparkline[i + 1][0], sparkline[i + 1][1], 0.9] as LineInput]),
    ),
    ...Object.fromEntries(satellites.map(([x, y], i) => [7 + i, [hub[0], hub[1], x, y, 0.4] as LineInput])),
  },
  circles: {
    0: { cx: hub[0], cy: hub[1], r: 16, o: 0.9, f: 0.8 },
    ...Object.fromEntries(satellites.map(([cx, cy], i) => [1 + i, { cx, cy, r: 7, o: 0.8, f: 0.2, c: 1 }])),
    6: { cx: 406, cy: 282, r: 4, o: 0.9, f: 1 },
  },
});

/* -------------------------------------------------------------------- team */
const memberX = [170, 245, 320, 480, 555, 630];
const team = build({
  anchor: [400, 330],
  rects: {
    0: { x: 150, y: 160, w: 500, h: 310, o: 0.14 },
    ...Object.fromEntries(
      memberX.map((x, i) => [1 + i, { x: x - 19, y: 352, w: 38, h: 118, rx: 19, o: 0.75, f: 0.08, c: 1 }]),
    ),
    13: { x: 370, y: 326, w: 60, h: 144, rx: 30, o: 0.9, f: 0.4 },
  },
  lines: {
    0: [40, GROUND, 760, GROUND, 0.5],
    ...Object.fromEntries(memberX.map((x, i) => [1 + i, [400, 298, x, 330, 0.3] as LineInput])),
    7: [170, 330, 245, 330, 0.18],
    8: [555, 330, 630, 330, 0.18],
  },
  circles: {
    0: { cx: 400, cy: 298, r: 24, o: 0.95, f: 0.85 },
    ...Object.fromEntries(memberX.map((cx, i) => [1 + i, { cx, cy: 330, r: 17, o: 0.8, f: 0.12, c: 1 }])),
  },
});

/* ------------------------------------------------------------------- eshop */
const shopCols = [180, 330, 480];
const shopRows = [256, 352];
const shopCards: Record<number, RectInput> = {};
shopRows.forEach((y, row) =>
  shopCols.forEach((x, col) => {
    const i = row * 3 + col;
    shopCards[1 + i] = { x, y, w: 140, h: 84, rx: 6, o: 0.55, f: 0.04 };
    shopCards[18 + i] = { x: x + 10, y: y + 10, w: 52, h: 64, rx: 4, o: 0, f: 0.14, c: 1 };
    shopCards[24 + i] = { x: x + 74, y: y + 20, w: 52, h: 8, rx: 4, o: 0, f: 0.85 };
  }),
);
const eshop = build({
  anchor: [400, 290],
  rects: {
    0: { x: 160, y: 120, w: 480, h: 330, rx: 12, o: 0.9, f: 0.03 },
    ...shopCards,
    13: { x: 540, y: 196, w: 64, h: 24, rx: 12, o: 0, f: 0.9 },
    14: { x: 180, y: 166, w: 440, h: 74, rx: 6, o: 0.5, f: 0.18 },
    15: { x: 160, y: 120, w: 480, h: 30, rx: 12, o: 0.5, f: 0.1, c: 1 },
  },
  lines: {
    0: [60, GROUND, 740, GROUND, 0.2],
    1: [200, 192, 350, 192, 0.85],
    2: [200, 210, 300, 210, 0.5],
  },
  circles: {
    1: { cx: 180, cy: 135, r: 4, o: 0, f: 0.8 },
    2: { cx: 196, cy: 135, r: 4, o: 0, f: 0.5, c: 1 },
    3: { cx: 212, cy: 135, r: 4, o: 0, f: 0.5, c: 1 },
  },
});

/* ----------------------------------------------------------------- network */
export const networkNodes: { label: string; x: number; y: number }[] = [
  { label: 'eShop', x: 150, y: 170 },
  { label: 'Orders', x: 400, y: 105 },
  { label: 'Fulfilment', x: 650, y: 170 },
  { label: 'Delivery', x: 650, y: 430 },
  { label: 'Activation', x: 400, y: 495 },
  { label: 'Customer', x: 150, y: 430 },
];
const NODE_W = 136;
const NODE_H = 48;
const netHub: [number, number] = [400, 300];
const network = build({
  anchor: [400, 300],
  rects: {
    0: { x: 110, y: 90, w: 580, h: 420, rx: 210, o: 0.16 },
    ...Object.fromEntries(
      networkNodes.map((n, i) => [1 + i, { x: n.x - NODE_W / 2, y: n.y - NODE_H / 2, w: NODE_W, h: NODE_H, rx: NODE_H / 2, o: 0.85, f: 0.08 }]),
    ),
    ...Object.fromEntries(
      networkNodes.map((n, i) => {
        const next = networkNodes[(i + 1) % networkNodes.length];
        const mx = (n.x + next.x) / 2;
        const my = (n.y + next.y) / 2;
        return [18 + i, { x: mx - 6, y: my - 6, w: 12, h: 12, rx: 2, o: 0, f: 0.9 }];
      }),
    ),
  },
  lines: {
    ...Object.fromEntries(
      networkNodes.map((n, i) => {
        const next = networkNodes[(i + 1) % networkNodes.length];
        return [1 + i, [n.x, n.y, next.x, next.y, 0.45] as LineInput];
      }),
    ),
    ...Object.fromEntries(networkNodes.map((n, i) => [7 + i, [netHub[0], netHub[1], n.x, n.y, 0.22] as LineInput])),
  },
  circles: {
    0: { cx: netHub[0], cy: netHub[1], r: 34, o: 0.9, f: 0.85 },
    ...Object.fromEntries(networkNodes.map((n, i) => [1 + i, { cx: n.x - NODE_W / 2 + 22, cy: n.y, r: 7, o: 0, f: 0.8 }])),
    7: { cx: netHub[0], cy: netHub[1], r: 56, o: 0.3 },
  },
});

/* ---------------------------------------------------------------- academic */
const topSpines = [
  [178, 24, 80], [204, 18, 70], [224, 22, 88], [248, 26, 76], [276, 18, 64], [296, 24, 84],
];
const lowSpines = [
  [178, 26, 86], [206, 20, 76], [228, 24, 92], [254, 18, 70], [274, 28, 82], [304, 22, 74],
];
const shelfTop = 230;
const shelfLow = 340;
const academicSpines: Record<number, RectInput> = {};
topSpines.forEach(([x, w, h], i) => {
  academicSpines[1 + i] = { x, y: shelfTop - h, w, h, rx: 2, o: 0.7, f: i % 2 ? 0.14 : 0.45, c: i % 2 };
});
lowSpines.forEach(([x, w, h], i) => {
  academicSpines[7 + i] = { x, y: shelfLow - h, w, h, rx: 2, o: 0.7, f: i % 2 ? 0.45 : 0.14, c: i % 2 ? 0 : 1 };
});
const stack = [[486, 150], [496, 132], [480, 158], [500, 128], [490, 140]];
const academicStack: Record<number, RectInput> = {};
stack.forEach(([x, w], i) => {
  academicStack[18 + i] = { x, y: GROUND - 18 * (i + 1), w, h: 18, rx: 2, o: 0.75, f: i % 2 ? 0.1 : 0.4, c: i % 2 };
});
const academic = build({
  anchor: [400, 320],
  rects: {
    0: { x: 160, y: 110, w: 190, h: 360, rx: 2, o: 0.8, f: 0.02 },
    ...academicSpines,
    ...academicStack,
    15: { x: 160, y: 448, w: 190, h: 22, rx: 1, o: 0.6, f: 0.05 },
  },
  lines: {
    0: [40, GROUND, 760, GROUND, 0.5],
    1: [160, shelfTop, 350, shelfTop, 0.7],
    2: [160, shelfLow, 350, shelfLow, 0.7],
    3: [690, GROUND, 690, 250, 0.6],
    6: [690, 250, 612, 228, 0.6],
  },
  circles: {
    0: { cx: 604, cy: 232, r: 14, o: 0.9, f: 0.9 },
    1: { cx: 604, cy: 232, r: 60, o: 0.12, f: 0.05 },
  },
});

/* ----------------------------------------------------------------- horizon */
const HORIZON = 380;
const dashes: [number, number, number][] = [
  [562, 10, 30], [506, 8, 22], [463, 6, 16], [431, 5, 11], [408, 4, 8], [393, 3, 5],
];
const stars: [number, number, number][] = [
  [120, 120, 2], [210, 80, 1.5], [300, 150, 1.8], [520, 90, 1.6], [610, 140, 2.2], [690, 70, 1.5], [160, 210, 1.3], [660, 230, 1.4],
];
const horizon = build({
  anchor: [400, HORIZON],
  rects: {
    ...Object.fromEntries(dashes.map(([y, w, h], i) => [18 + i, { x: 400 - w / 2, y: y - h / 2, w, h, rx: 1, o: 0, f: 0.85 }])),
  },
  lines: {
    0: [40, HORIZON, 760, HORIZON, 0.9],
    1: [230, 600, 394, HORIZON, 0.7],
    2: [570, 600, 406, HORIZON, 0.7],
    3: [40, HORIZON, 170, 322, 0.3],
    4: [170, 322, 290, HORIZON, 0.3],
    5: [520, HORIZON, 640, 308, 0.3],
    6: [640, 308, 760, HORIZON, 0.3],
  },
  circles: {
    0: { cx: 400, cy: 318, r: 46, o: 0.7, f: 0.4 },
    ...Object.fromEntries(stars.map(([cx, cy, r], i) => [1 + i, { cx, cy, r, o: 0, f: 0.9, c: 1 }])),
    9: { cx: 400, cy: 318, r: 84, o: 0.14, f: 0.04 },
  },
});

export const sceneLayouts: Record<SceneKey, SceneLayout> = {
  school,
  university,
  store,
  finance,
  telecom,
  digital,
  treasury,
  team,
  eshop,
  network,
  academic,
  horizon,
};

/** The opening state: the first scene folded to points (the name's letters fly into it). */
export function openingLayout(first: SceneKey): SceneLayout {
  return collapseInPlace(sceneLayouts[first], [0]);
}

/** Points (in canvas units) where the hero name's letters land in the first scene. */
export function letterTargets(first: SceneKey): [number, number][] {
  const l = sceneLayouts[first];
  const pts: [number, number][] = [];
  l.rects.forEach((r) => {
    if (r.w > 0 && r.h > 0 && (r.f > 0.05 || r.o > 0.5)) pts.push([r.x + r.w / 2, r.y + r.h / 2]);
  });
  l.circles.forEach((c) => {
    if (c.r > 0) pts.push([c.cx, c.cy]);
  });
  // Put the most "architectural" pieces (windows, door, flag) first.
  return pts.slice(1).concat(pts.slice(0, 1));
}

/** Short text alternatives used when a scene is shown as a static image. */
export const sceneAlt: Record<SceneKey, string> = {
  school: 'Line illustration of a school building with a flag and clock.',
  university: 'Line illustration of a university degree certificate with a seal and graduation cap.',
  store: 'Line illustration of a retail store front with an awning and stocked windows.',
  finance: 'Line illustration of a bank building with classical columns.',
  telecom: 'Line illustration of a telecom retail branch with phones on display and a service counter.',
  digital: 'Line illustration of a laptop showing an online shop and a mobile phone.',
  treasury: 'Line illustration of a treasury dashboard with charts and a payments network.',
  team: 'Line illustration of a team leader connected to six team members.',
  eshop: 'Line illustration of an eCommerce storefront in a browser window.',
  network: 'Diagram connecting eShop, orders, fulfilment, delivery, activation and the customer around a central team.',
  academic: 'Line illustration of a bookshelf, a stack of books and a desk lamp.',
  horizon: 'Line illustration of a path leading to a rising sun on the horizon.',
};
