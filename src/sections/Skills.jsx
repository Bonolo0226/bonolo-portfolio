import { skillGroups } from "../data/skills";
import SectionHeading from "../components/SectionHeading";
import TechBadge from "../components/TechBadge";
import ScrollReveal from "../components/ScrollReveal";
import SectionPanel from "../components/SectionPanel";

export default function Skills() {
  return (
    <SectionPanel id="skills">
      <ScrollReveal>
        <SectionHeading
          title="Tech Stack"
          description="Technologies I'm building with, learning, or comfortable using - labeled honestly rather than lumped together."
        />
      </ScrollReveal>

      <div className="space-y-10">
        {skillGroups.map((group, index) => (
          <ScrollReveal key={group.label} delay={Math.min(index * 0.05, 0.3)}>
            <h3 className="mb-4 font-mono text-sm text-text-muted">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <TechBadge name={skill.name} level={skill.level} />
                </li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </div>
    </SectionPanel>
  );
}
