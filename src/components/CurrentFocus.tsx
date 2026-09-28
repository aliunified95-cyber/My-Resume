import { currentFocus, stageById } from '../data/resume';
import { Text } from './Text';

export function CurrentFocus() {
  const stages = currentFocus.stageIds.map(stageById).filter((s) => s !== undefined);
  return (
    <section className="now" aria-labelledby="now-heading">
      <div className="now__inner">
        <h2 id="now-heading" className="now__label">
          <span className="now__pulse" aria-hidden="true" />
          {currentFocus.heading}
        </h2>
        <ul className="now__roles">
          {stages.map((s) => (
            <li key={s.id}>
              <span className="now__role"><Text>{s.title}</Text></span>
              <span className="now__org"><Text>{s.organization}</Text></span>
            </li>
          ))}
        </ul>
        <ul className="now__focus">
          {currentFocus.focusAreas.map((f) => (
            <li key={f}><Text>{f}</Text></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
