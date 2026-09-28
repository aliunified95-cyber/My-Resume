import { site } from '../data/resume';

const PLACEHOLDER = /(\[[^\]]+\])/g;

export const isPlaceholder = (value: string) => /\[[^\]]*\]/.test(value);

/**
 * Renders résumé text. Anything in [square brackets] is a placeholder and is
 * visibly marked (while `site.highlightPlaceholders` is on) so it is easy to
 * find and replace in src/data/resume.ts.
 */
export function Text({ children }: { children: string }) {
  if (!site.highlightPlaceholders || !isPlaceholder(children)) return <>{children}</>;
  return (
    <>
      {children.split(PLACEHOLDER).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="ph" title="Placeholder — edit in src/data/resume.ts">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
