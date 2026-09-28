import { describe, expect, it } from 'vitest';
import { layerState } from '../src/lib/appleTransition';

describe('Apple-style image transition', () => {
  it('shows the image sharp, full-size and opaque when on stage', () => {
    const s = layerState(0);
    expect(s.visible).toBe(true);
    expect(s.opacity).toBe(1);
    expect(s.scale).toBe(1);
    expect(s.blur).toBe(0);
    expect(s.spread).toBe(1);
  });

  it('hides images a full step away', () => {
    expect(layerState(-1).visible).toBe(false);
    expect(layerState(1).visible).toBe(false);
  });

  it('brings the next image in from smaller, blurred and lower', () => {
    const s = layerState(-0.6);
    expect(s.scale).toBeLessThan(1);
    expect(s.blur).toBeGreaterThan(0);
    expect(s.y).toBeGreaterThan(0);
    expect(s.spread).toBeGreaterThan(1);
  });

  it('sends the previous image past the viewer: larger, blurred, fading', () => {
    const s = layerState(0.5);
    expect(s.scale).toBeGreaterThan(1);
    expect(s.blur).toBeGreaterThan(0);
    expect(s.opacity).toBeLessThan(0.5);
    expect(s.spread).toBeGreaterThan(1);
  });

  it('cross-fades: incoming grows while outgoing dissolves', () => {
    let prevIn = -1;
    let prevOut = 2;
    for (let t = 0.05; t < 1; t += 0.05) {
      const incoming = layerState(t - 1).opacity;
      const outgoing = layerState(t).opacity;
      expect(incoming).toBeGreaterThanOrEqual(prevIn);
      expect(outgoing).toBeLessThanOrEqual(prevOut);
      prevIn = incoming;
      prevOut = outgoing;
    }
  });

  it('adds a slow push-in while a stage holds', () => {
    expect(layerState(0, 1).scale).toBeGreaterThan(layerState(0, 0).scale);
  });
});
