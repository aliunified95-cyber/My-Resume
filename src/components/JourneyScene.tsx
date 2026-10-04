import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { journey } from '../data/resume';
import { layerState } from '../lib/appleTransition';
import { clamp, easeInOutCubic, smoothstep } from '../lib/math';
import type { MotionMode } from '../lib/motion';
import { prefersReducedMotion } from '../lib/motion';
import { HOLD, jumpQ, panelOpacity, qToScroll, revealAt, scrollToQ, TAIL, timelineAt } from '../lib/timeline';
import { Hero } from './Hero';
import { ProgressIndicator } from './ProgressIndicator';
import { EXTRA_SLOTS, StageVisual } from './StageVisual';
import { TransformationStage } from './TransformationStage';

interface Props {
  mode: MotionMode;
  /** Called if the animation throws — the page then falls back to static mode. */
  onEngineError: () => void;
}

interface Layer {
  root: HTMLElement;
  main: HTMLElement | null;
  glow: HTMLElement | null;
  extras: HTMLElement[];
}

/**
 * The scroll story: a pinned stage where each chapter's image hands over to
 * the next Apple-style (zoom, blur and dissolve out; rise and focus in) while
 * the matching chapter text fades in beside it.
 *
 * No scroll-jacking: the page scrolls natively and the stage is simply
 * `position: sticky`. All per-frame work writes straight to the DOM (no React
 * re-renders), uses only transform / opacity / filter, and only runs when the
 * scroll position actually changes.
 */
export function JourneyScene({ mode, onEngineError }: Props) {
  const stages = journey;
  const sceneCount = stages.length + 1;

  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const layerRefs = useRef<(HTMLElement | null)[]>([]);
  const metrics = useRef({ top: 0, scrollable: 1 });
  const [active, setActive] = useState(0);
  const panelSetters = useMemo(
    () =>
      stages.map((_, i) => (el: HTMLElement | null) => {
        panelRefs.current[i] = el;
      }),
    [stages],
  );
  const layerSetters = useMemo(
    () =>
      stages.map((_, i) => (el: HTMLElement | null) => {
        layerRefs.current[i] = el;
      }),
    [stages],
  );

  useEffect(() => {
    if (mode !== 'cinematic') return;
    const section = sectionRef.current;
    const stack = stackRef.current;
    const heroWrap = heroWrapRef.current;
    if (!section || !stack || !heroWrap) return;
    // Cinematic layout CSS only applies once the engine is actually running,
    // so if JavaScript or the animation fails the static journey remains.
    const root = document.documentElement;
    root.dataset.engine = 'on';
    const lite = root.dataset.perf === 'lite';

    const letters = Array.from(heroWrap.querySelectorAll<HTMLElement>('[data-letter]'));
    const heroFades = Array.from(heroWrap.querySelectorAll<HTMLElement>('[data-hero-fade]'));
    const hero = heroWrap.querySelector<HTMLElement>('.hero');
    const panels = panelRefs.current.slice(0, stages.length);
    const reveals = panels.map((p) => Array.from(p?.querySelectorAll<HTMLElement>('[data-reveal]') ?? []));
    const layers: Layer[] = layerRefs.current.slice(0, stages.length).flatMap((el) =>
      el
        ? [
            {
              root: el,
              main: el.querySelector<HTMLElement>('.visual__main'),
              glow: el.querySelector<HTMLElement>('.visual__glow'),
              extras: Array.from(el.querySelectorAll<HTMLElement>('[data-extra]')),
            },
          ]
        : [],
    );

    let frameSize = { w: 1, h: 1 };
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
      const sr = stack.getBoundingClientRect();
      frameSize = { w: sr.width || 1, h: sr.height || 1 };
      // The name's letters converge in a small ring at the heart of the first image.
      const cx = sr.left + sr.width / 2;
      const cy = sr.top + sr.height / 2;
      const ring = Math.min(sr.width, sr.height) * 0.12;
      letters.forEach((l) => (l.style.transform = ''));
      flights = letters.map((l, i) => {
        const r = l.getBoundingClientRect();
        const angle = (i / Math.max(1, letters.length)) * Math.PI * 2 - Math.PI / 2;
        const tx = cx + Math.cos(angle) * ring;
        const ty = cy + Math.sin(angle) * ring;
        return { dx: tx - (r.left + r.width / 2), dy: ty - (r.top + r.height / 2) };
      });
    };

    const frame = (force = false) => {
      const { top, scrollable } = metrics.current;
      const q = scrollToQ((window.scrollY - top) / scrollable, sceneCount);
      if (!force && Math.abs(q - lastQ) < 0.0005) return;
      lastQ = q;
      const { scene, morph, position } = timelineAt(q, sceneCount);

      // Stage images.
      layers.forEach((layer, i) => {
        const index = i + 1;
        const drift = clamp((q - index) / HOLD);
        const s = layerState(position - index, q >= index ? drift : 0);
        const { root: el, main, glow, extras } = layer;
        if (!s.visible) {
          if (el.style.visibility !== 'hidden') {
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
          }
          return;
        }
        el.style.visibility = 'visible';
        el.style.opacity = s.opacity.toFixed(3);
        if (main) {
          main.style.transform = `translate3d(0, ${(s.y * frameSize.h).toFixed(1)}px, 0) scale(${s.scale.toFixed(4)})`;
          main.style.filter = lite || s.blur < 0.2 ? '' : `blur(${s.blur.toFixed(1)}px)`;
        }
        if (glow) glow.style.transform = `scale(${(0.8 + 0.2 * s.opacity * s.scale).toFixed(3)})`;
        extras.forEach((x, k) => {
          const slot = EXTRA_SLOTS[k];
          const depth = 1 + k * 0.35;
          const dx = (slot.x / 100) * frameSize.w * (s.spread - 1) * depth;
          const dy = (slot.y / 100) * frameSize.h * (s.spread - 1) * depth + s.extraLift * depth * frameSize.h;
          x.style.transform = `translate(-50%, -50%) translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(${s.extraScale.toFixed(3)})`;
          x.style.opacity = s.extraOpacity.toFixed(3);
          x.style.filter = lite || s.blur < 0.2 ? '' : `blur(${(s.blur * 0.7).toFixed(1)}px)`;
        });
      });

      // Opening: the name's letters fly into the first image as it arrives.
      const heroT = scene === 0 ? morph : 1;
      const n = letters.length;
      const step = n > 1 ? Math.min(0.03, 0.35 / (n - 1)) : 0;
      letters.forEach((l, i) => {
        const f = flights[i];
        if (!f) return;
        const e = easeInOutCubic(clamp((heroT - i * step) / (1 - step * (n - 1))));
        l.style.transform = e > 0 ? `translate3d(${(f.dx * e).toFixed(1)}px, ${(f.dy * e).toFixed(1)}px, 0) scale(${(1 - 0.85 * e).toFixed(3)})` : '';
        l.style.opacity = (1 - smoothstep(0.45, 0.9, e)).toFixed(3);
        l.style.filter = lite || e < 0.3 ? '' : `blur(${(smoothstep(0.3, 0.9, e) * 6).toFixed(1)}px)`;
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
      const touched = [
        ...letters,
        ...heroFades,
        ...panels,
        ...layers.flatMap((l) => [l.root, l.main, l.glow, ...l.extras]),
      ];
      touched.forEach((el) => {
        if (!el) return;
        el.style.transform = '';
        el.style.opacity = '';
        el.style.visibility = '';
        el.style.filter = '';
      });
      if (hero) {
        hero.style.visibility = '';
        hero.classList.remove('is-leaving');
      }
      panels.forEach((p) => p?.classList.remove('is-compact', 'is-tight'));
      reveals.flat().forEach((el) => el.classList.remove('is-in'));
    };
  }, [mode, sceneCount, stages, onEngineError]);

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
          <div className="visual-stack" ref={stackRef} aria-hidden="true">
            {stages.map((stage, i) => (
              <StageVisual key={stage.id} ref={layerSetters[i]} visual={stage.visual} decorative eager={i < 2} className="visual--layer" />
            ))}
          </div>
        </div>
        <div className="story__hero" ref={heroWrapRef}>
          <Hero onBegin={onBegin} />
        </div>
        <div className="story__panels">
          <h2 id="journey-heading" className="story__heading">
            <span className="eyebrow">Career journey</span>
            <span className="story__heading-text">From finance studies to digital operations leadership</span>
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
