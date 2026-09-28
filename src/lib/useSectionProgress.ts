import { useEffect, type RefObject } from 'react';
import { clamp } from './math';

/**
 * Writes a 0 → 1 CSS variable (`--rise` by default) to an element as it
 * scrolls into view. With motion disabled the variable is fixed at 1.
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>, enabled: boolean, variable = '--rise') {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!enabled) {
      el.style.setProperty(variable, '1');
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh - rect.top) / (vh * 1.1));
      el.style.setProperty(variable, p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, enabled, variable]);
}
