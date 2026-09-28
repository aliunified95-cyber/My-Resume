import { Text } from './Text';

interface Props {
  skills: string[];
  heading?: string;
  reveal?: boolean;
}

/** Skills as a thin connected chain — each stage adds links to the chain. */
export function SkillsDisplay({ skills, heading = 'Skills developed', reveal = false }: Props) {
  if (!skills.length) return null;
  return (
    <div className="skills" data-reveal={reveal || undefined}>
      <h4 className="eyebrow">{heading}</h4>
      <ul className="skill-chain">
        {skills.map((s) => (
          <li key={s}>
            <Text>{s}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
