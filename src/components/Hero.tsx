import { memo } from 'react';
import { journey, personalDetails } from '../data/resume';
import { CvButton } from './Actions';
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
        <div className="hero__copy">
        <p className="hero__eyebrow" data-hero-fade>
          <span>Digital commerce. Real impact.</span>
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
          I connect digital sales, people and operations to build better customer journeys.
        </p>
        <p className="visually-hidden">{positioningStatement}</p>
        <div className="hero__actions" data-hero-fade>
          <a className="btn btn--primary" href="#projects">Explore my work <span aria-hidden="true">↗</span></a>
          <CvButton variant="ghost" />
        </div>
        <dl className="hero__metrics" data-hero-fade>
          <div><dt>Digital order growth</dt><dd>30%+</dd></div>
          <div><dt>Initiatives delivered</dt><dd>40+</dd></div>
          <div><dt>People led today</dt><dd>19</dd></div>
        </dl>
        </div>
        {personalDetails.photo && (
          <figure className="hero__portrait" data-hero-fade>
            <span className="hero__portrait-tag">Commercial thinking.<br />Operational precision.</span>
            <img src={personalDetails.photo.src} alt={personalDetails.photo.alt}
              width={personalDetails.photo.width} height={personalDetails.photo.height}
              fetchPriority="high" decoding="async" />
            <figcaption><span>Ali Isa Mohsen</span><span>Bahrain · Zain Bahrain</span></figcaption>
          </figure>
        )}
      </div>
      <a className="hero__scroll" href={`#chapter-${journey[0].id}`} onClick={onBegin} data-hero-fade>
        <span>Scroll to explore my journey</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </div>
  );
});
