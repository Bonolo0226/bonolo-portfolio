import { useRef } from "react";
import { skillGroups } from "../data/skills";
import { skillIcons } from "../data/skillIcons";
import SkillOrb from "./SkillOrb";
import ScrollReveal from "./ScrollReveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function FloatingSkills() {
  const reduced = usePrefersReducedMotion();
  const groupRef = useRef(null);

  // A single, cheap container-level tilt rather than per-icon mouse
  // tracking — reacts to the cursor without recalculating a transform
  // for every logo on every mousemove.
  const handleMouseMove = (event) => {
    if (reduced || !groupRef.current) return;
    const rect = groupRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    groupRef.current.style.transform = `perspective(1200px) rotateX(${(-py * 3.5).toFixed(2)}deg) rotateY(${(px * 3.5).toFixed(2)}deg)`;
  };

  const handleMouseLeave = () => {
    if (!groupRef.current) return;
    groupRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="[transform-style:preserve-3d]"
    >
      <div
        ref={groupRef}
        className="space-y-9 transition-transform duration-300 ease-out"
      >
        {skillGroups.map((group, groupIndex) => (
          <ScrollReveal key={group.label} delay={Math.min(groupIndex * 0.05, 0.3)}>
            <h3 className="mb-4 font-mono text-sm text-text-muted">
              {group.label}
            </h3>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-5">
              {group.skills.map((skill, skillIndex) => (
                <SkillOrb
                  key={skill.name}
                  skill={{ ...skill, icon: skillIcons[skill.name] }}
                  category={group.label}
                  index={groupIndex * 6 + skillIndex}
                />
              ))}
            </div>
            {groupIndex < skillGroups.length - 1 && (
              <div className="mt-9 h-px w-full bg-border" aria-hidden="true" />
            )}
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
