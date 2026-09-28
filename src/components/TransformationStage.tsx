import { memo, type Ref } from 'react';
import type { JourneyStage } from '../data/types';
import { sceneAlt, sceneLayouts } from '../scenes/layouts';
import { ScenePool } from '../scenes/ScenePool';
import { AchievementList } from './AchievementList';
import { SkillsDisplay } from './SkillsDisplay';
import { Text } from './Text';
import { ArrowIcon } from './Icons';

interface Props {
  stage: JourneyStage;
  /** 1-based position in the journey. */
  index: number;
  total: number;
  panelRef?: Ref<HTMLElement>;
}

const pad = (n: number) => String(n).padStart(2, '0');

const kindLabel: Record<JourneyStage['kind'], string> = {
  education: 'Education',
  experience: 'Experience',
  goal: 'Next chapter',
};

/**
 * One chapter of the journey. In cinematic mode it is a text panel layered
 * over the shared morphing illustration; in static mode (reduced motion, no
 * JavaScript, print) it shows its own still illustration beside the text.
 */
export const TransformationStage = memo(function TransformationStage({ stage, index, total, panelRef }: Props) {
  const headingId = `stage-${stage.id}`;
  const isGoal = stage.kind === 'goal';
  return (
    <article
      ref={panelRef}
      className={`stage stage--${stage.kind}`}
      id={`chapter-${stage.id}`}
      aria-labelledby={headingId}
      tabIndex={-1}
      data-stage-index={index}
    >
      <div className="stage__art-static">
        <ScenePool layout={sceneLayouts[stage.scene]} detailScenes={[stage.scene]} label={sceneAlt[stage.scene]} className="scene-svg" />
      </div>
      <div className="stage__text">
        <p className="stage__meta">
          <span className="stage__num">
            {pad(index)}
            <span className="stage__of"> / {pad(total)}</span>
          </span>
          <span className="stage__kind">{kindLabel[stage.kind]}</span>
          {stage.ongoing && <span className="badge">Ongoing</span>}
        </p>
        {!isGoal && (
          <p className="stage__dates">
            <Text>{stage.start}</Text>
            {stage.end && (
              <>
                {' – '}
                <Text>{stage.end}</Text>
              </>
            )}
          </p>
        )}
        <h3 className="stage__title" id={headingId}>
          <Text>{stage.title}</Text>
        </h3>
        <p className="stage__org">
          <Text>{stage.organization}</Text>
          {stage.location && (
            <>
              <span className="sep" aria-hidden="true"> · </span>
              <Text>{stage.location}</Text>
            </>
          )}
        </p>
        <p className="stage__desc">
          <Text>{stage.description}</Text>
        </p>
        <AchievementList items={stage.achievements} heading={isGoal ? 'Looking ahead' : 'Key achievements'} reveal />
        {stage.results && stage.results.length > 0 && (
          <dl className="results" data-reveal>
            {stage.results.map((r, i) => (
              <div key={i}>
                <dt><Text>{r.label}</Text></dt>
                <dd><Text>{r.value}</Text></dd>
              </div>
            ))}
          </dl>
        )}
        <SkillsDisplay skills={stage.skills} heading={isGoal ? 'Built on' : 'Skills developed'} reveal />
        {stage.media && (
          <figure className="stage__media" data-reveal>
            <img
              src={stage.media.src}
              alt={stage.media.alt}
              width={stage.media.width}
              height={stage.media.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
        )}
        {isGoal && (
          <a className="text-link" href="#aim" data-reveal>
            Read the full aim <ArrowIcon />
          </a>
        )}
      </div>
    </article>
  );
});
