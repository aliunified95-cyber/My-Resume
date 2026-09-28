import { memo } from 'react';
import { journey, personalDetails } from '../data/resume';
import { ContactButton, CvButton } from './Actions';
import { isPlaceholder, Text } from './Text';

/**
 * Opening scene. Each letter of the name is its own element so the journey
 * engine can fly the letters into the first illustration as scrolling begins.
 */
export const Hero = memo(function Hero({ onBegin }: { onBegin?: (event: React.MouseEvent) => void }) {
  const { fullName, currentTitle, positioningStatement, location } = personalDetails;
  let letterIndex = 0;
  return (
    <div className="hero" id="top">
      <div className="hero__inner">
        <p className="hero__eyebrow" data-hero-fade>
          <span>Curriculum Vitae</span>
          <span className="hero__rule" aria-hidden="true" />
          <Text>{location}</Text>
        </p>
        <h1 className={`hero__name${isPlaceholder(fullName) ? ' is-placeholder' : ''}`}>
          <span className="visually-hidden">{fullName}</span>
          {fullName.split(/\s+/).map((word, wi) => (
            <span className="hero__word" key={wi} aria-hidden="true">
              {Array.from(word).map((ch) => (
                <span className="hero__letter" data-letter key={letterIndex++}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero__title" data-hero-fade>
          <Text>{currentTitle}</Text>
        </p>
        <p className="hero__statement" data-hero-fade>
          <Text>{positioningStatement}</Text>
        </p>
        <div className="hero__actions" data-hero-fade>
          <CvButton />
          <ContactButton />
        </div>
      </div>
      <a className="hero__scroll" href={`#chapter-${journey[0].id}`} onClick={onBegin} data-hero-fade>
        <span>Scroll to explore my journey</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </div>
  );
});
