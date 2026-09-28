import { projects, stageById } from '../data/resume';
import { sceneAlt, sceneLayouts } from '../scenes/layouts';
import { ScenePool } from '../scenes/ScenePool';
import { ArrowUpRightIcon } from './Icons';
import { isPlaceholder, Text } from './Text';

const pad = (n: number) => String(n).padStart(2, '0');

export function ProjectShowcase() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-heading">
      <header className="section__head">
        <p className="eyebrow">Selected work</p>
        <h2 id="projects-heading" className="section__title">Selected projects</h2>
        <p className="section__lede">
          A closer look at a few initiatives — the problem, what I did, and what changed.
        </p>
      </header>
      <ol className="projects__list">
        {projects.map((project, i) => {
          const stage = stageById(project.stageId);
          const scene = stage?.scene ?? 'network';
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
                  ) : (
                    <ScenePool layout={sceneLayouts[scene]} detailScenes={[scene]} label={sceneAlt[scene]} className="scene-svg" />
                  )}
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
                    <div className="project__result">
                      <dt>Result</dt>
                      <dd><Text>{project.result}</Text></dd>
                    </div>
                  </dl>
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
  );
}
