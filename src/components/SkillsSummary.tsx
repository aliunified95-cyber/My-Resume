import { certifications, journey, languages, skillGroups, technology } from '../data/resume';
import { Text } from './Text';

/**
 * Skill groups without subjective percentage bars: each group shows the
 * journey as a row of marks, lit where the skills were developed or applied,
 * and names those roles in plain text (nothing depends on hover).
 */
export function SkillsSummary() {
  const stages = journey.filter((s) => s.kind !== 'goal');
  const strip = { gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` };
  return (
    <section id="skills" className="section skills-summary" aria-labelledby="skills-heading">
      <header className="section__head">
        <p className="eyebrow">Leadership &amp; skills</p>
        <h2 id="skills-heading" className="section__title">Expertise, technology &amp; development</h2>
        <p className="section__lede">
          Commercial, digital and operational capabilities, connected to the roles where I have applied them.
        </p>
      </header>
      <div className="skills-summary__legend" aria-hidden="true">
        <span className="journey-strip journey-strip--legend" style={strip}>
          {stages.map((s) => (
            <span key={s.id} className={`journey-strip__mark${s.id === stages[2]?.id ? ' is-on' : ''}`} />
          ))}
        </span>
        <span>Each mark is one chapter, from university to today. Gold marks show where the skills were built.</span>
      </div>
      <ul className="skill-groups">
        {skillGroups.map((group) => {
          const roles = stages.filter((s) => group.developedIn.includes(s.id));
          return (
            <li key={group.id} className="skill-group">
              <h3 className="skill-group__title">{group.title}</h3>
              <ul className="skill-group__skills">
                {group.skills.map((skill) => (
                  <li key={skill}><Text>{skill}</Text></li>
                ))}
              </ul>
              <div className="journey-strip" aria-hidden="true" style={strip}>
                {stages.map((s) => (
                  <span key={s.id} className={`journey-strip__mark${group.developedIn.includes(s.id) ? ' is-on' : ''}`} />
                ))}
              </div>
              <p className="skill-group__roles">
                <span className="visually-hidden">Developed in: </span>
                {roles.map((r, i) => (
                  <span key={r.id}>
                    {i > 0 && <span aria-hidden="true"> · </span>}
                    <Text>{r.shortTitle ?? r.title}</Text>
                  </span>
                ))}
              </p>
            </li>
          );
        })}
      </ul>
      <header className="section__head">
        <h3 className="section__title">Technology &amp; analytics</h3>
      </header>
      <ul className="skill-groups">
        {technology.map((group) => (
          <li key={group.id} className="skill-group">
            <h4 className="skill-group__title">{group.title}</h4>
            <ul className="skill-group__skills">
              {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </li>
        ))}
      </ul>
      <header className="section__head">
        <h3 className="section__title">Certifications &amp; professional development</h3>
      </header>
      <ul className="skill-groups">
        {certifications.map((item) => (
          <li key={item.name} className="skill-group">
            <h4 className="skill-group__title">{item.name}</h4>
            {item.issuer && <p>{item.issuer}</p>}
          </li>
        ))}
      </ul>
      <header className="section__head">
        <h3 className="section__title">Languages</h3>
      </header>
      <dl className="cv-skills">
        {languages.map((item) => (
          <div key={item.name}><dt>{item.name}</dt><dd>{item.proficiency}</dd></div>
        ))}
      </dl>
    </section>
  );
}
