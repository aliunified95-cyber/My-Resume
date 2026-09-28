import { Text } from './Text';

interface Props {
  items: string[];
  heading?: string;
  /** Adds data-reveal so the journey engine can show items one by one. */
  reveal?: boolean;
}

export function AchievementList({ items, heading = 'Key achievements', reveal = false }: Props) {
  if (!items.length) return null;
  return (
    <div className="achievements">
      <h4 className="eyebrow">{heading}</h4>
      <ul>
        {items.map((item, i) => (
          <li key={i} data-reveal={reveal || undefined}>
            <Text>{item}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
