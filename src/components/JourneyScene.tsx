import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { journey } from '../data/resume';
import type { SceneKey } from '../data/types';
import { clamp, easeInOutCubic, lerp, smoothstep } from '../lib/math';
import type { MotionMode } from '../lib/motion';
import { prefersReducedMotion } from '../lib/motion';
import { jumpQ, panelOpacity, qToScroll, revealAt, scrollToQ, TAIL, timelineAt } from '../lib/timeline';
import { letterTargets, openingLayout, POOL, sceneLayouts, type SceneLayout } from '../scenes/layouts';
import { mixFill } from '../scenes/palette';
import { ScenePool, type PoolRefs } from '../scenes/ScenePool';
import { Hero } from './Hero';
import { ProgressIndicator } from './ProgressIndicator';
import { TransformationStage } from './TransformationStage';

interface Props {
  mode: MotionMode;
  /** Called if the animation throws — the page then falls back to static mode. */
  onEngineError: () => void;
}

/** How much later the last primitive starts moving than the first (0–1 of a morph). */
const STAGGER = 0.28;

/**
 * The scroll story: a pinned stage whose single SVG illustration morphs from
 * scene to scene while the matching chapter text fades in beside it.
 *
 * No scroll-jacking: the page scrolls natively and the stage is simply
 * `position: sticky`. All per-frame work writes straight to the DOM (no React
 * re-renders), and only runs when the scroll position actually changes.
 */
export function JourneyScene({ mode, onEngineError }: Props) {
  const stages = journey;
  const sceneCount = stages.length + 1;
  const layouts: SceneLayout[] = useMemo(
    () => [openingLayout(stages[0].scene), ...stages.map((s) => sceneLayouts[s.scene])],
    [stages],
  );
  const detailKeys = useMemo(() => Array.from(new Set(stages.map((s) => s.scene))), [stages]);

  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const [pool] = useState<PoolRefs>(() => ({ rects: [], lines: [], circles: [], details: {} }));
  const metrics = useRef({ top: 0, scrollable: 1 });
  const [active, setActive] = useState(0);
  const panelSetters = useMemo(
    () =>
      stages.map((_, i) => (el: HTMLElement | null) => {
        panelRefs.current[i] = el;
      }),
    [stages],
  );

  useEffect(() => {
    if (mode !== 'cinematic') return;
    const section = sectionRef.current;
    const svg = svgRef.current;
    const heroWrap = heroWrapRef.current;
    if (!section || !svg || !heroWrap) return;
    // Cinematic layout CSS only applies once the engine is actually running,
    // so if JavaScript or the animation fails the static journey remains.
    const root = document.documentElement;
    root.dataset.engine = 'on';

    const letters = Array.from(heroWrap.querySelectorAll<HTMLElement>('[data-letter]'));
    const heroFades = Array.from(heroWrap.querySelectorAll<HTMLElement>('[data-hero-fade]'));
    const hero = heroWrap.querySelector<HTMLElement>('.hero');
    const panels = panelRefs.current.slice(0, stages.length);
    const reveals = panels.map((p) => Array.from(p?.querySelectorAll<HTMLElement>('[data-reveal]') ?? []));
    const targets = letterTargets(stages[0].scene);
    const scenesByKey = new Map<SceneKey, number[]>();
    stages.forEach((s, i) => scenesByKey.set(s.scene, [...(scenesByKey.get(s.scene) ?? []), i + 1]));

    let flights: { dx: number; dy: number }[] = [];
    let lastQ = -1;
    let lastActive = -1;
    let raf = 0;

    // Dense chapters on short screens get progressively more compact so the
    // text never overflows the stage. (Everything stays in the résumé view.)
    const fitPanels = () => {
      panels.forEach((panel) => {
        const text = panel?.querySelector<HTMLElement>('.stage__text');
        if (!panel || !text) return;
        panel.classList.remove('is-compact', 'is-tight');
        const cs = getComputedStyle(panel);
        const available = panel.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        if (text.scrollHeight <= available) return;
        panel.classList.add('is-compact');
        if (text.scrollHeight <= available) return;
        panel.classList.add('is-tight');
      });
    };

    const measure = () => {
      fitPanels();
      const rect = section.getBoundingClientRect();
      metrics.current = {
        top: rect.top + window.scrollY,
        scrollable: Math.max(1, section.offsetHeight - window.innerHeight),
      };
      letters.forEach((l) => (l.style.transform = ''));
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      flights = letters.map((l, i) => {
        const r = l.getBoundingClientRect();
        const [tx, ty] = targets[i % targets.length];
        const p = new DOMPoint(tx, ty).matrixTransform(ctm);
        return { dx: p.x - (r.left + r.width / 2), dy: p.y - (r.top + r.height / 2) };
      });
    };

    const frame = (force = false) => {
      const { top, scrollable } = metrics.current;
      const q = scrollToQ((window.scrollY - top) / scrollable, sceneCount);
      if (!force && Math.abs(q - lastQ) < 0.0005) return;
      lastQ = q;
      const { scene, morph, position } = timelineAt(q, sceneCount);
      const a = layouts[scene];
      const b = layouts[Math.min(scene + 1, sceneCount - 1)];
      const p = pool;

      const local = (i: number, n: number) => easeInOutCubic(clamp((morph - (i / n) * STAGGER) / (1 - STAGGER)));

      for (let i = 0; i < POOL.rects; i++) {
        const el = p.rects[i];
        if (!el) continue;
        const t = local(i, POOL.rects);
        const ra = a.rects[i];
        const rb = b.rects[i];
        const w = lerp(ra.w, rb.w, t);
        const h = lerp(ra.h, rb.h, t);
        el.setAttribute('x', lerp(ra.x, rb.x, t).toFixed(2));
        el.setAttribute('y', lerp(ra.y, rb.y, t).toFixed(2));
        el.setAttribute('width', w.toFixed(2));
        el.setAttribute('height', h.toFixed(2));
        el.setAttribute('rx', Math.min(lerp(ra.rx, rb.rx, t), w / 2, h / 2).toFixed(2));
        el.setAttribute('stroke-opacity', lerp(ra.o, rb.o, t).toFixed(3));
        el.setAttribute('fill-opacity', lerp(ra.f, rb.f, t).toFixed(3));
        el.setAttribute('fill', mixFill(lerp(ra.c, rb.c, t)));
      }
      for (let i = 0; i < POOL.lines; i++) {
        const el = p.lines[i];
        if (!el) continue;
        const t = local(i, POOL.lines);
        const la = a.lines[i];
        const lb = b.lines[i];
        el.setAttribute('x1', lerp(la.x1, lb.x1, t).toFixed(2));
        el.setAttribute('y1', lerp(la.y1, lb.y1, t).toFixed(2));
        el.setAttribute('x2', lerp(la.x2, lb.x2, t).toFixed(2));
        el.setAttribute('y2', lerp(la.y2, lb.y2, t).toFixed(2));
        el.setAttribute('stroke-opacity', lerp(la.o, lb.o, t).toFixed(3));
      }
      for (let i = 0; i < POOL.circles; i++) {
        const el = p.circles[i];
        if (!el) continue;
        const t = local(i, POOL.circles);
        const ca = a.circles[i];
        const cb = b.circles[i];
        el.setAttribute('cx', lerp(ca.cx, cb.cx, t).toFixed(2));
        el.setAttribute('cy', lerp(ca.cy, cb.cy, t).toFixed(2));
        el.setAttribute('r', Math.max(0, lerp(ca.r, cb.r, t)).toFixed(2));
        el.setAttribute('stroke-opacity', lerp(ca.o, cb.o, t).toFixed(3));
        el.setAttribute('fill-opacity', lerp(ca.f, cb.f, t).toFixed(3));
        el.setAttribute('fill', mixFill(lerp(ca.c, cb.c, t)));
      }
      scenesByKey.forEach((indices, key) => {
        const el = p.details[key];
        if (!el) return;
        const op = Math.max(...indices.map((j) => clamp(1 - Math.abs(position - j) * 3.5)));
        el.setAttribute('opacity', op.toFixed(3));
      });

      // Opening: the name's letters fly into the first scene.
      const heroT = scene === 0 ? morph : 1;
      const n = letters.length;
      const step = n > 1 ? Math.min(0.03, 0.35 / (n - 1)) : 0;
      letters.forEach((l, i) => {
        const f = flights[i];
        if (!f) return;
        const e = easeInOutCubic(clamp((heroT - i * step) / (1 - step * (n - 1))));
        l.style.transform = e > 0 ? `translate3d(${(f.dx * e).toFixed(1)}px, ${(f.dy * e).toFixed(1)}px, 0) scale(${(1 - 0.82 * e).toFixed(3)})` : '';
        l.style.opacity = (1 - smoothstep(0.55, 0.98, e)).toFixed(3);
      });
      const fade = clamp(1 - heroT * 3.2);
      heroFades.forEach((el) => (el.style.opacity = fade.toFixed(3)));
      if (hero) {
        hero.style.visibility = heroT >= 0.999 ? 'hidden' : '';
        hero.classList.toggle('is-leaving', heroT > 0.3);
      }

      // Chapter text panels.
      panels.forEach((panel, i) => {
        if (!panel) return;
        const index = i + 1;
        const op = panelOpacity(position, index);
        panel.style.opacity = op.toFixed(3);
        panel.style.transform = `translate3d(0, ${((index - position) * 48).toFixed(1)}px, 0)`;
        panel.style.visibility = op <= 0.001 ? 'hidden' : 'visible';
        reveals[i].forEach((el, item) => el.classList.toggle('is-in', q >= revealAt(index, item)));
      });

      if (fillRef.current) fillRef.current.style.transform = `scaleX(${(q / (sceneCount - 1)).toFixed(4)})`;
      const nextActive = Math.round(position);
      if (nextActive !== lastActive) {
        lastActive = nextActive;
        setActive(nextActive);
      }
    };

    const safeFrame = (force = false) => {
      try {
        frame(force);
      } catch (err) {
        console.error('Journey animation failed — switching to the static journey.', err);
        onEngineError();
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        safeFrame();
      });
    };
    const onResize = () => {
      measure();
      safeFrame(true);
    };

    onResize();
    document.fonts?.ready.then(onResize).catch(() => undefined);
    const ro = new ResizeObserver(onResize);
    ro.observe(section);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      delete root.dataset.engine;
      // Hand the DOM back to CSS for static mode.
      [...letters, ...heroFades, ...panels].forEach((el) => {
        if (!el) return;
        el.style.transform = '';
        el.style.opacity = '';
        el.style.visibility = '';
      });
      if (hero) {
        hero.style.visibility = '';
        hero.classList.remove('is-leaving');
      }
      panels.forEach((p) => p?.classList.remove('is-compact', 'is-tight'));
      reveals.flat().forEach((el) => el.classList.remove('is-in'));
    };
  }, [mode, layouts, sceneCount, stages, onEngineError, pool]);

  const jumpTo = useCallback(
    (index: number) => {
      const smooth = !prefersReducedMotion();
      const panel = panelRefs.current[index - 1];
      if (mode !== 'cinematic') {
        panel?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
        panel?.focus({ preventScroll: true });
        return;
      }
      const { top, scrollable } = metrics.current;
      const y = top + qToScroll(jumpQ(index), sceneCount) * scrollable;
      window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
      // Move focus to the chapter once it has faded in, for keyboard users.
      window.setTimeout(() => panel?.focus({ preventScroll: true }), smooth ? 900 : 50);
    },
    [mode, sceneCount],
  );

  const onBegin = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      jumpTo(1);
    },
    [jumpTo],
  );

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="story"
      aria-labelledby="journey-heading"
      style={{ '--story-len': stages.length + TAIL } as React.CSSProperties}
    >
      <div className="story__sticky">
        <div className="story__art">
          <ScenePool
            svgRef={svgRef}
            layout={layouts[0]}
            detailScenes={detailKeys}
            detailsVisible={false}
            refs={pool}
            className="stage-svg"
          />
        </div>
        <div className="story__hero" ref={heroWrapRef}>
          <Hero onBegin={onBegin} />
        </div>
        <div className="story__panels">
          <h2 id="journey-heading" className="story__heading">
            <span className="eyebrow">Career journey</span>
            <span className="story__heading-text">From first classroom to what comes next</span>
          </h2>
          {stages.map((stage, i) => (
            <TransformationStage
              key={stage.id}
              stage={stage}
              index={i + 1}
              total={stages.length}
              panelRef={panelSetters[i]}
            />
          ))}
        </div>
        <ProgressIndicator stages={stages} active={active} onJump={jumpTo} fillRef={fillRef} />
        <a className="story__skip" href="#projects">
          Skip the journey
        </a>
      </div>
    </section>
  );
}
