import { levelLabels } from "../data/skills";

const LEVEL_STYLES = {
  "building-with": "border-accent/40 text-text-primary font-medium",
  learning: "text-text-secondary",
  familiar: "text-text-muted",
};

export default function TechBadge({ name, level }) {
  return (
    <span
      className={`glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-transform hover:-translate-y-0.5 ${LEVEL_STYLES[level] ?? LEVEL_STYLES.familiar}`}
    >
      {name}
      {level && (
        <span className="font-mono text-xs text-text-muted">
          {levelLabels[level]}
        </span>
      )}
    </span>
  );
}
