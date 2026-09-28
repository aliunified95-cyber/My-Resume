import { describe, expect, it } from 'vitest';
import {
  currentFocus,
  futureGoal,
  journey,
  journeyOrder,
  personalDetails,
  projects,
  skillGroups,
  stageById,
} from '../src/data/resume';
import { POOL, sceneLayouts } from '../src/scenes/layouts';

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}
const texts = strings({ journey, projects, skillGroups, futureGoal, personalDetails, currentFocus });
const allText = texts.join('\n');

describe('résumé content', () => {
  it('keeps the twelve journey stages in the required order', () => {
    expect(journey.map((s) => s.shortTitle ?? s.title)).toEqual([
      'School',
      'University',
      'Store Manager',
      'Financial Advisor Trainee',
      'Retail Agent',
      'Digital Sales Agent',
      'Treasury Specialist',
      'Retail Team Leader',
      'eShop Team Leader',
      'eShop, Logistics & Activation',
      'Master’s Student',
      'Aim & Future Goal',
    ]);
  });

  it('marks the current role and the Master’s degree as ongoing', () => {
    expect(stageById('eshop-logistics-activation-lead')?.ongoing).toBe(true);
    expect(stageById('eshop-logistics-activation-lead')?.title).toBe('eShop, Logistics & Activation Team Leader');
    expect(stageById('masters')?.ongoing).toBe(true);
  });

  it('gives every stage two to four achievements and at least one skill', () => {
    for (const stage of journey) {
      expect(stage.achievements.length, stage.id).toBeGreaterThanOrEqual(2);
      expect(stage.achievements.length, stage.id).toBeLessThanOrEqual(4);
      expect(stage.skills.length, stage.id).toBeGreaterThan(0);
    }
  });

  it('uses unique ids and only references stages that exist', () => {
    expect(new Set(journeyOrder).size).toBe(journeyOrder.length);
    for (const group of skillGroups) for (const id of group.developedIn) expect(stageById(id), `${group.id} → ${id}`).toBeDefined();
    for (const p of projects) expect(stageById(p.stageId), p.id).toBeDefined();
    for (const id of currentFocus.stageIds) expect(stageById(id), id).toBeDefined();
  });

  it('has an illustration for every stage', () => {
    for (const stage of journey) expect(sceneLayouts[stage.scene], stage.id).toBeDefined();
  });

  it('never nests placeholders (so they highlight correctly)', () => {
    for (const t of texts) expect(t).not.toMatch(/\[[^\]]*\[/);
  });

  it('avoids the known misspellings', () => {
    for (const typo of ['Jorney', 'Achivment', 'Activastion', 'Masters Student', 'results-driven']) {
      expect(allText.toLowerCase()).not.toContain(typo.toLowerCase());
    }
  });

  it('adds media only with alt text and intrinsic size (no layout shift)', () => {
    const media = [...journey.map((s) => s.media), ...projects.map((p) => p.image), personalDetails.photo].filter(Boolean);
    for (const m of media) {
      expect(m!.alt).toBeTypeOf('string');
      expect(m!.width).toBeGreaterThan(0);
      expect(m!.height).toBeGreaterThan(0);
    }
  });
});

describe('scene layouts', () => {
  it('draw every scene with the same pool of primitives', () => {
    for (const [key, layout] of Object.entries(sceneLayouts)) {
      expect(layout.rects, key).toHaveLength(POOL.rects);
      expect(layout.lines, key).toHaveLength(POOL.lines);
      expect(layout.circles, key).toHaveLength(POOL.circles);
      const numbers = JSON.stringify(layout).match(/-?\d+(\.\d+)?|null|NaN/g) ?? [];
      expect(numbers, key).not.toContain('null');
      expect(numbers, key).not.toContain('NaN');
    }
  });
});
