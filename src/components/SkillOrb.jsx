import { useState } from "react";
import { motion } from "framer-motion";
import { levelLabels } from "../data/skills";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const SIZE_BY_LEVEL = {
  "building-with": { wrap: "h-14 w-14 sm:h-16 sm:w-16", icon: 26 },
  learning: { wrap: "h-12 w-12 sm:h-14 sm:w-14", icon: 21 },
  familiar: { wrap: "h-10 w-10 sm:h-11 sm:w-11", icon: 17 },
};

export default function SkillOrb({ skill, category, index }) {
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const { Icon, color } = skill.icon;
  const size = SIZE_BY_LEVEL[skill.level] ?? SIZE_BY_LEVEL.familiar;

  // Deterministic per-item variation so the float feels organic without
  // random layout shifts between renders.
  const duration = 3.2 + (index % 5) * 0.35;
  const delay = (index % 7) * 0.18;
  const amplitude = 6 + (index % 3) * 2;

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <motion.button
        type="button"
        tabIndex={0}
        aria-label={`${skill.name} - ${levelLabels[skill.level]}, ${category}`}
        className={`glass flex items-center justify-center rounded-full transition-transform duration-200 ${size.wrap}`}
        style={{
          backgroundImage: `radial-gradient(circle at 35% 30%, ${color}26 0%, transparent 70%)`,
        }}
        animate={
          reduced
            ? { scale: hovered ? 1.14 : 1 }
            : { y: [0, -amplitude, 0], scale: hovered ? 1.14 : 1 }
        }
        transition={
          reduced
            ? { duration: 0.2 }
            : {
                y: { duration, delay, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.2 },
              }
        }
      >
        <Icon size={size.icon} style={{ color }} />
      </motion.button>

      <motion.div
        role="tooltip"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.18 }}
        className="glass-strong pointer-events-none absolute bottom-full z-20 mb-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs"
      >
        <span className="font-medium text-text-primary">{skill.name}</span>
        <span className="text-text-muted"> — {levelLabels[skill.level]}</span>
      </motion.div>
    </div>
  );
}
