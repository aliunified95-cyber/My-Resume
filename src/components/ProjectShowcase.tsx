import { businessImpact, projects, stageById } from '../data/resume';
import { ArrowUpRightIcon } from './Icons';
import { StageVisual } from './StageVisual';
import { isPlaceholder, Text } from './Text';

const pad = (n: number) => String(n).padStart(2, '0');

export function ProjectShowcase() {
  return (
    <>
    <section id="impact" className="section impact" aria-labelledby="impact-heading">
      <header className="section__head">
        <p className="eyebrow">Business impact</p>
        <h2 id="impact-heading" className="section__title">What I have delivered</h2>
        <p className="section__lede">Selected outcomes across digital sales, transformation and retail operations.</p>
      </header>
      <ul className="impact__grid">
        {businessImpact.map((item) => (
          <li key={item.label} className="impact__item">
            <p className="impact__value">{item.value}</p>
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
          </li>
        ))}
      </ul>
    </section>
    <section id="projects" className="section projects" aria-labelledby="projects-heading">
      <header className="section__head">
        <p className="eyebrow">Selected work</p>
        <h2 id="projects-heading" className="section__title">Making better<br />journeys happen.</h2>
        <p className="section__lede">
          Eight areas of work across customer journeys, automation, fulfilment and product launches — my contribution and the outcomes.
        </p>
        <p className="image-note">Photography illustrates each area of work.</p>
      </header>
      <ol className="projects__list">
        {projects.map((project, i) => {
          const stage = stageById(project.stageId);
          return (
            <li key={project.id} className="project">
              <article aria-labelledby={`${project.id}-title`}>
                <div className="project__visual">
                  {project.image ? (
                    <img
                      src={project.image.src}
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : stage ? (
                    <StageVisual visual={stage.visual} decorative className="visual--project" />
                  ) : null}
                  <span className="project__index" aria-hidden="true">{pad(i + 1)}</span>
                </div>
                <div className="project__body">
                  <p className="project__context">
                    {stage ? <Text>{stage.shortTitle ?? stage.title}</Text> : null}
                    <span className="sep" aria-hidden="true"> · </span>
                    <Text>{project.role}</Text>
                  </p>
                  <h3 className="project__title" id={`${project.id}-title`}>
                    <Text>{project.title}</Text>
                  </h3>
                  <p className="project__outcome"><span className="eyebrow">The outcome</span><Text>{project.result}</Text></p>
                  <details className="project__details">
                    <summary>Explore the project <span aria-hidden="true">+</span></summary>
                  <dl className="project__facts">
                    <div>
                      <dt>Challenge</dt>
                      <dd><Text>{project.challenge}</Text></dd>
                    </div>
                    <div>
                      <dt>Actions</dt>
                      <dd>
                        <ol className="project__actions">
                          {project.actions.map((a, j) => (
                            <li key={j}><Text>{a}</Text></li>
                          ))}
                        </ol>
                      </dd>
                    </div>
                    <div>
                      <dt>Tools &amp; skills</dt>
                      <dd>
                        <ul className="skill-chain">
                          {project.tools.map((t, j) => (
                            <li key={j}><Text>{t}</Text></li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                  </details>
                  {project.caseStudyUrl && !isPlaceholder(project.caseStudyUrl) && (
                    <a className="text-link" href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer">
                      Read the case study <ArrowUpRightIcon />
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
    </>
  );
}
