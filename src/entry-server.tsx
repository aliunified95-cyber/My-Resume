/** Build-time prerendering entry (see scripts/prerender.mjs). */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { personalDetails, site } from './data/resume';

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

const hasPlaceholder = (s: string) => /\[[^\]]*\]/.test(s);

export function meta() {
  const name = hasPlaceholder(personalDetails.fullName) ? '' : personalDetails.fullName;
  const title = name ? `${name} — ${personalDetails.currentTitle}` : `${personalDetails.currentTitle} — Career Journey & CV`;
  const description = `${personalDetails.positioningStatement} Explore the career journey, selected projects and CV${name ? ` of ${name}` : ''}.`;
  return { title, description, siteUrl: site.siteUrl, name };
}
