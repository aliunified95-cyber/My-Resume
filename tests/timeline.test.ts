import { describe, expect, it } from 'vitest';
import { HOLD, jumpQ, panelOpacity, qToScroll, revealAt, scrollToQ, timelineAt } from '../src/lib/timeline';

const SCENES = 13; // opening + 12 stages

describe('timeline', () => {
  it('maps scroll to scene position and back', () => {
    expect(scrollToQ(0, SCENES)).toBe(0);
    expect(scrollToQ(1, SCENES)).toBe(12);
    expect(scrollToQ(-1, SCENES)).toBe(0);
    for (const q of [0, 1.3, 6.3, 12]) expect(scrollToQ(qToScroll(q, SCENES), SCENES)).toBeCloseTo(q, 6);
  });

  it('holds each scene still before morphing', () => {
    const held = timelineAt(4 + HOLD * 0.9, SCENES);
    expect(held.morph).toBe(0);
    expect(held.position).toBe(4);
    const mid = timelineAt(4 + HOLD + (1 - HOLD) / 2, SCENES);
    expect(mid.position).toBeCloseTo(4.5, 5);
  });

  it('starts the opening transformation almost immediately', () => {
    expect(timelineAt(0.2, SCENES).morph).toBeGreaterThan(0);
  });

  it('is monotonic', () => {
    let prev = -1;
    for (let q = 0; q <= 12; q += 0.01) {
      const { position } = timelineAt(q, SCENES);
      expect(position).toBeGreaterThanOrEqual(prev - 1e-9);
      prev = position;
    }
  });

  it('shows a chapter fully at its jump target, with all reveals done', () => {
    for (let i = 1; i <= 12; i++) {
      const { position } = timelineAt(jumpQ(i), SCENES);
      expect(panelOpacity(position, i)).toBe(1);
      expect(jumpQ(i)).toBeGreaterThanOrEqual(revealAt(i, 6));
    }
  });

  it('never shows two chapters at full opacity', () => {
    for (let q = 0; q <= 12; q += 0.01) {
      const { position } = timelineAt(q, SCENES);
      const visible = Array.from({ length: 12 }, (_, i) => panelOpacity(position, i + 1)).filter((o) => o > 0.5);
      expect(visible.length).toBeLessThanOrEqual(1);
    }
  });
});
