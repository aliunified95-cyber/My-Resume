import { useEffect, useRef, useState } from 'react';
import { personalDetails } from '../data/resume';
import type { MotionMode } from '../lib/motion';
import { CvButton } from './Actions';
import { Text } from './Text';

interface Props {
  view: 'story' | 'resume';
  mode: MotionMode;
  onToggleMotion: () => void;
}

const links = [
  { href: '#impact', label: 'Impact' },
  { href: '#journey', label: 'Journey' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#aim', label: 'Aim' },
  { href: '#contact', label: 'Contact' },
];

export function SiteHeader({ view, mode, onToggleMotion }: Props) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-header${open ? ' is-open' : ''}`}>
      <a className="skip-link" href="#resume">
        Skip animations — view résumé
      </a>
      <a className="skip-link" href={view === 'resume' ? '#main' : '#journey'}>
        Skip to content
      </a>
      <a className="brand" href="#top" aria-label={`${personalDetails.fullName} — back to top`}>
        <span className="brand__mark"><Text>{personalDetails.initials}</Text></span>
        <span className="brand__name"><Text>{personalDetails.fullName}</Text></span>
      </a>

      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="menu-toggle__bars" aria-hidden="true" />
        <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
      </button>

      <div className="site-menu" id="site-menu" onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}>
        {view === 'story' && (
          <nav aria-label="Sections">
            <ul className="site-nav">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="site-menu__actions">
          {view === 'story' && (
            <button type="button" className="motion-toggle" aria-pressed={mode === 'cinematic'} onClick={onToggleMotion}>
              <span className="motion-toggle__track" aria-hidden="true" />
              <span>Animations</span>
            </button>
          )}
          {view === 'story' ? (
            <a className="btn btn--quiet" href="#resume">View résumé</a>
          ) : (
            <a className="btn btn--quiet" href="#top">Back to the journey</a>
          )}
          <CvButton variant="primary" className="btn--small" />
        </div>
      </div>
      {view === 'story' && (
        <nav className="mobile-actions" aria-label="Quick actions">
          <a href="#projects">My work <span aria-hidden="true">↗</span></a>
          <a href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
          <CvButton className="mobile-actions__cv" />
        </nav>
      )}
    </header>
  );
}
