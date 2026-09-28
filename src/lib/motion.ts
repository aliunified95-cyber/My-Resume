import { useCallback, useEffect, useSyncExternalStore } from 'react';

/**
 * Motion mode.
 *  - 'cinematic': scroll-driven transformations.
 *  - 'static':    every scene is shown as a still image with its text — used for
 *                 reduced-motion users, no-JS visitors, printing, and as a
 *                 fallback if the animation ever fails.
 *
 * The initial mode is decided by an inline script in index.html *before* the
 * first paint (so there is no flash), and stored on <html data-motion="…">.
 */
export type MotionMode = 'cinematic' | 'static';

const STORAGE_KEY = 'motion-preference';
const EVENT = 'motionmodechange';

function getSnapshot(): MotionMode {
  return document.documentElement.dataset.motion === 'cinematic' ? 'cinematic' : 'static';
}
// Prerendered HTML is always the static journey; hydration starts from it.
const getServerSnapshot = (): MotionMode => 'static';

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
}

function writeMotionMode(mode: MotionMode, persist: boolean) {
  document.documentElement.dataset.motion = mode;
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* storage unavailable — the choice lasts for this visit only */
    }
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useMotionMode(): [MotionMode, (mode: MotionMode, persist?: boolean) => void] {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Follow OS-level changes to the reduced-motion setting, unless the visitor
  // has made an explicit choice with the on-page toggle.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        /* ignore */
      }
      writeMotionMode(mq.matches ? 'static' : 'cinematic', false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const setMode = useCallback((next: MotionMode, persist = true) => writeMotionMode(next, persist), []);
  return [mode, setMode];
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
