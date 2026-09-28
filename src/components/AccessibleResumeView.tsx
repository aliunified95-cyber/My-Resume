import { useEffect, useRef } from 'react';
import { contactLinks, education, experience, futureGoal, personalDetails, projects, skillGroups } from '../data/resume';
import type { JourneyStage } from '../data/types';
import { CvButton, emailHref, linkedInHref, phoneHref } from './Actions';
import { ArrowIcon, PrintIcon } from './Icons';
import { Text } from './Text';

function Entry({ stage }: { stage: JourneyStage }) {
  return (
    <article className="cv-entry">
      <header className="cv-entry__head">
        <h3>
          <Text>{stage.title}</Text>
          {stage.ongoing && <span className="badge">Ongoing</span>}
        </h3>
        <p className="cv-entry__dates">
          <Text>{stage.start}</Text> – <Text>{stage.end}</Text>
        </p>
      </header>
      <p className="cv-entry__org">
        <Text>{stage.organization}</Text> · <Text>{stage.location}</Text>
      </p>
      <p>
        <Text>{stage.description}</Text>
      </p>
      {stage.achievements.length > 0 && (
        <ul className="cv-entry__list">
          {stage.achievements.map((a, i) => (
            <li key={i}><Text>{a}</Text></li>
          ))}
        </ul>
      )}
      {stage.results?.length ? (
        <p className="cv-entry__skills">
          <strong>Results: </strong>
          {stage.results.map((r, i) => (
            <span key={i}>
              {i > 0 && '; '}
              <Text>{r.value}</Text> <Text>{r.label}</Text>
            </span>
          ))}
        </p>
      ) : null}
      <p className="cv-entry__skills">
        <strong>Skills: </strong>
        <Text>{stage.skills.join(', ')}</Text>
      </p>
    </article>
  );
}

/**
 * A traditional, printable résumé containing every piece of information from
 * the animated journey. Reverse-chronological, as recruiters expect.
 */
export function AccessibleResumeView() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    headingRef.current?.focus();
  }, []);

  const mail = emailHref();
  const linkedIn = linkedInHref();
  const phone = phoneHref();
  const jobs = [...experience].reverse();
  const studies = [...education].sort((a, b) => Number(!!b.ongoing) - Number(!!a.ongoing) || education.indexOf(b) - education.indexOf(a));

  return (
    <main id="main" className="resume">
      <div className="resume__toolbar" role="toolbar" aria-label="Résumé actions">
        <a className="btn btn--quiet" href="#top">
          <span className="flip"><ArrowIcon /></span>
          <span>Back to the journey</span>
        </a>
        <div className="resume__toolbar-actions">
          <button type="button" className="btn btn--ghost" onClick={() => window.print()}>
            <span>Print / Save as PDF</span>
            <PrintIcon />
          </button>
          {personalDetails.cvFile && <CvButton />}
        </div>
      </div>

      {!personalDetails.cvFile && (
        <p className="resume__notice" role="note">
          <span className="ph">[CV FILE]</span> A downloadable PDF will be added here. In the meantime, this page prints
          cleanly — use “Print / Save as PDF”.
        </p>
      )}

      <article className="resume__doc" aria-labelledby="resume-name">
        <header className="resume__header">
          {personalDetails.photo && (
            <img
              className="resume__photo"
              src={personalDetails.photo.src}
              alt={personalDetails.photo.alt}
              width={personalDetails.photo.width}
              height={personalDetails.photo.height}
            />
          )}
          <h1 id="resume-name" ref={headingRef} tabIndex={-1}>
            <Text>{personalDetails.fullName}</Text>
          </h1>
          <p className="resume__title"><Text>{personalDetails.currentTitle}</Text></p>
          <ul className="resume__contact">
            <li><Text>{personalDetails.location}</Text></li>
            <li>{mail ? <a href={mail}>{contactLinks.email}</a> : <Text>{contactLinks.email}</Text>}</li>
            <li>{linkedIn ? <a href={linkedIn}>{linkedIn.replace(/^https?:\/\/(www\.)?/, '')}</a> : <Text>{contactLinks.linkedIn}</Text>}</li>
            {contactLinks.phone && <li>{phone ? <a href={phone}>{contactLinks.phone}</a> : <Text>{contactLinks.phone}</Text>}</li>}
          </ul>
        </header>

        <section aria-labelledby="cv-summary">
          <h2 id="cv-summary">Profile</h2>
          <p><Text>{personalDetails.positioningStatement}</Text></p>
          <p><Text>{personalDetails.summary}</Text></p>
        </section>

        <section aria-labelledby="cv-experience">
          <h2 id="cv-experience">Experience</h2>
          {jobs.map((s) => <Entry key={s.id} stage={s} />)}
        </section>

        <section aria-labelledby="cv-education">
          <h2 id="cv-education">Education</h2>
          {studies.map((s) => <Entry key={s.id} stage={s} />)}
        </section>

        <section aria-labelledby="cv-projects">
          <h2 id="cv-projects">Selected projects</h2>
          {projects.map((p) => (
            <article className="cv-entry" key={p.id}>
              <header className="cv-entry__head">
                <h3><Text>{p.title}</Text></h3>
              </header>
              <p className="cv-entry__org"><Text>{p.role}</Text></p>
              <p><strong>Challenge: </strong><Text>{p.challenge}</Text></p>
              <ul className="cv-entry__list">
                {p.actions.map((a, i) => <li key={i}><Text>{a}</Text></li>)}
              </ul>
              <p><strong>Result: </strong><Text>{p.result}</Text></p>
              <p className="cv-entry__skills"><strong>Tools &amp; skills: </strong><Text>{p.tools.join(', ')}</Text></p>
            </article>
          ))}
        </section>

        <section aria-labelledby="cv-skills">
          <h2 id="cv-skills">Skills</h2>
          <dl className="cv-skills">
            {skillGroups.map((g) => (
              <div key={g.id}>
                <dt>{g.title}</dt>
                <dd><Text>{g.skills.join(', ')}</Text></dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="cv-aim">
          <h2 id="cv-aim">Aim &amp; future goal</h2>
          <p><Text>{futureGoal.aim}</Text></p>
          <p><strong>Long-term goal: </strong><Text>{futureGoal.longTermGoal}</Text></p>
          <p><strong>Impact: </strong><Text>{futureGoal.impact}</Text></p>
          <p><strong>Interested in: </strong><Text>{futureGoal.opportunities.join('; ')}</Text></p>
        </section>
      </article>
    </main>
  );
}
