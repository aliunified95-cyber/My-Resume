import { useCallback, useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { AccessibleResumeView } from './components/AccessibleResumeView';
import { AimAndGoal } from './components/AimAndGoal';
import { SiteFooter } from './components/ContactSection';
import { CurrentFocus } from './components/CurrentFocus';
import { JourneyScene } from './components/JourneyScene';
import { ProjectShowcase } from './components/ProjectShowcase';
import { SiteHeader } from './components/SiteHeader';
import { SkillsSummary } from './components/SkillsSummary';
import { useMotionMode } from './lib/motion';

type View = 'story' | 'resume';
const viewFromHash = (): View => (window.location.hash === '#resume' ? 'resume' : 'story');

export function App() {
  const [view, setView] = useState<View>('story');
  const [mode, setMode] = useMotionMode();
  const previousView = useRef<View>('story');

  useEffect(() => {
    const sync = () => setView(viewFromHash());
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // Coming back from the résumé view: the target section has only just mounted.
  useEffect(() => {
    if (previousView.current === 'resume' && view === 'story') {
      const id = window.location.hash.slice(1);
      const el = id && id !== 'top' ? document.getElementById(id) : null;
      if (el) el.scrollIntoView();
      else window.scrollTo(0, 0);
    }
    previousView.current = view;
  }, [view]);

  const onEngineError = useCallback(() => setMode('static', false), [setMode]);

  const onToggleMotion = useCallback(() => {
    // Keep the visitor's place: remember the section in view, restore it after the layout changes.
    const probe = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    const anchor = probe?.closest<HTMLElement>('.stage, main > section[id], #journey');
    const next = mode === 'cinematic' ? 'static' : 'cinematic';
    setMode(next);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!anchor) return;
        const target = next === 'cinematic' && anchor.classList.contains('stage') ? document.getElementById('journey') : anchor;
        target?.scrollIntoView({ block: 'start' });
      }),
    );
  }, [mode, setMode]);

  return (
    <>
      <SiteHeader view={view} mode={mode} onToggleMotion={onToggleMotion} />
      {view === 'resume' ? (
        <AccessibleResumeView />
      ) : (
        <main id="main">
          <JourneyScene mode={mode} onEngineError={onEngineError} />
          <CurrentFocus />
          <ProjectShowcase />
          <SkillsSummary />
          <AimAndGoal mode={mode} />
        </main>
      )}
      <SiteFooter />
      <Analytics />
    </>
  );
}
