import { describe, expect, it } from 'vitest';
import {
  businessImpact,
  certifications,
  contactLinks,
  currentFocus,
  education,
  experience,
  futureGoal,
  journey,
  journeyOrder,
  languages,
  personalDetails,
  projects,
  skillGroups,
  stageById,
  technology,
} from '../src/data/resume';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AccessibleResumeView } from '../src/components/AccessibleResumeView';
import { ProjectShowcase } from '../src/components/ProjectShowcase';
import { SkillsSummary } from '../src/components/SkillsSummary';
import { StageVisual } from '../src/components/StageVisual';

const publicDir = path.resolve(__dirname, '../public');

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}
const texts = strings({ journey, projects, skillGroups, futureGoal, personalDetails, currentFocus, businessImpact, certifications, contactLinks, technology, languages });
const allText = texts.join('\n');

describe('résumé content', () => {
  it('organises the actual CV history by start date, followed by current study and direction', () => {
    expect(journey.map((s) => s.shortTitle ?? s.title)).toEqual([
      'Banking & Finance',
      'Store Manager',
      'Financial Products Promoter',
      'Financial Services Trainee',
      'Retail Sales',
      'Digital Sales',
      'Treasury Accountant',
      'Retail Team Leader',
      'eShop & Digital Sales',
      'Digital Sales, Logistics & Activation',
      'MSc Project Management',
      'Aim & Future Goal',
    ]);
  });

  it('marks the current role and the Master’s degree as ongoing', () => {
    expect(stageById('eshop-logistics-activation-lead')?.ongoing).toBe(true);
    expect(stageById('eshop-logistics-activation-lead')?.title).toBe('Digital Sales, Logistics & Activation Team Leader');
    expect(stageById('masters')?.ongoing).toBe(true);
    expect(stageById('masters')?.start).toBe('Oct 2026');
    expect(stageById('masters')?.end).toBe('Expected Oct 2027');
  });

  it('includes all CV roles and preserves overlapping early employment', () => {
    expect(experience).toHaveLength(9);
    expect(education).toHaveLength(2);
    expect(stageById('school')).toBeUndefined();
    expect(stageById('store-manager')).toMatchObject({ organization: 'Twisted Vapor', start: 'Jun 2018', end: 'May 2019' });
    expect(stageById('financial-products-promoter')).toMatchObject({ organization: 'Bahrain Credit', start: 'Sep 2018', end: 'Jan 2019' });
    expect(stageById('financial-advisor-trainee')).toMatchObject({ start: 'Jan 2019', end: 'May 2019' });
    expect(stageById('retail-agent')).toMatchObject({ organization: 'Zain Bahrain', start: 'Feb 2019', end: 'Mar 2020' });
  });

  it('retains qualified metrics and contribution wording from the CV', () => {
    expect(businessImpact.map((item) => item.value)).toEqual(['30%+', 'Approx. 90%', '40+', 'Same-day', 'Approx. 160%']);
    expect(projects).toHaveLength(8);
    expect(projects.find((p) => p.id === 'project-fulfilment')?.result).toBe('Helped reduce end-to-end digital order turnaround time by approximately 90%.');
    expect(projects.find((p) => p.id === 'sales-automation-controls')?.result).toBe('Contributed to approximately 90% fewer sales errors.');
  });

  it('publishes the supplied PDF without altering it and leaves no content placeholders', () => {
    const download = path.join(publicDir, personalDetails.cvFile);
    expect(readFileSync(download).equals(readFileSync(path.resolve(__dirname, '../Files/Ali_CV_Photo.pdf')))).toBe(true);
    expect(allText).not.toMatch(/\[[^\]]+\]/);
  });

  it('renders additional CV content in both website and printable views', () => {
    const story = renderToStaticMarkup(createElement(ProjectShowcase)) + renderToStaticMarkup(createElement(SkillsSummary));
    const resume = renderToStaticMarkup(createElement(AccessibleResumeView));
    for (const html of [story, resume]) {
      expect(html).toContain('40+');
      expect(html).toContain('Power BI');
      expect(html).toContain('HubSpot Academy');
      expect(html).toContain('Key Account Management Program');
      expect(html).toContain('Professional proficiency');
      expect(html).toContain('NHIR/eKYC');
    }
    expect(resume).toContain('cv/Ali_CV_Photo.pdf');
    expect(resume).toContain('images/ali-isa-mohsen.png');
    expect(resume).toContain('automated credit-control eligibility checks');
    expect(resume).toContain('employee onboarding, training, workload allocation');
    expect(resume.indexOf('Digital Sales, Logistics &amp; Activation Team Leader', resume.indexOf('id="cv-experience"'))).toBeLessThan(resume.indexOf('Store Manager'));
  });

  it('renders organisation logos over photos and keeps animated duplicates decorative', () => {
    const visual = stageById('university')!.visual;
    const visible = renderToStaticMarkup(createElement(StageVisual, { visual }));
    expect(visible).toContain('images/brands/uob-logo.png');
    expect(visible).toContain('images/photos/uob-campus.jpg');
    expect(visible).toContain('University of Bahrain logo');
    expect(visible).toContain('visual__main');
    const decorative = renderToStaticMarkup(createElement(StageVisual, { visual, decorative: true }));
    expect(decorative).toContain('aria-hidden="true"');
    expect(decorative).not.toContain('alt="University of Bahrain logo"');
    expect(projects.every((p) => p.image?.alt.startsWith('Illustrative'))).toBe(true);
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

  it('has an image, with alt text, for every stage — and every image file exists', () => {
    for (const stage of journey) {
      expect(stage.visual.alt.length, stage.id).toBeGreaterThan(0);
      expect((stage.visual.extras ?? []).length, stage.id).toBeLessThanOrEqual(4);
      for (const src of [stage.visual.src, ...(stage.visual.extras ?? [])]) {
        if (/^https?:/.test(src)) continue;
        expect(existsSync(path.join(publicDir, src)), `${stage.id}: public/${src}`).toBe(true);
      }
    }
  });

  it('avoids the known misspellings', () => {
    for (const typo of ['Jorney', 'Achivment', 'Activastion', 'Masters Student', 'results-driven']) {
      expect(allText.toLowerCase()).not.toContain(typo.toLowerCase());
    }
  });

  it('adds media only with alt text and intrinsic size (no layout shift)', () => {
    const media = [...journey.map((s) => s.media), ...journey.map((s) => s.visual.backdrop), ...projects.map((p) => p.image), personalDetails.photo].filter(Boolean);
    for (const m of media) {
      expect(m!.alt).toBeTypeOf('string');
      expect(m!.width).toBeGreaterThan(0);
      expect(m!.height).toBeGreaterThan(0);
      if (!/^https?:/.test(m!.src)) expect(existsSync(path.join(publicDir, m!.src))).toBe(true);
    }
  });
});
