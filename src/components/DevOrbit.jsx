import { motion } from "framer-motion";
import { Code2, Cpu, Rocket } from "lucide-react";
import { skillGroups } from "../data/skills";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1];

// Pick one "building with" skill per group, capped at four, so the
// floating chips reflect the real, existing skills data rather than
// an invented list.
const featuredSkills = skillGroups
  .map((group) => group.skills.find((skill) => skill.level === "building-with"))
  .filter(Boolean)
  .slice(0, 4);

const CHIP_POSITIONS = [
  "left-[-6%] top-[6%]",
  "right-[-8%] top-[20%]",
  "left-[-10%] bottom-[16%]",
  "right-[-4%] bottom-[2%]",
];

const workspaceLines = [
  { Icon: Code2, label: "building" },
  { Icon: Cpu, label: "learning" },
  { Icon: Rocket, label: "shipping" },
];

export default function DevOrbit() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto flex h-[320px] w-full max-w-sm items-center justify-center sm:h-[380px]">
      {/* Connecting lines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 300"
        className="pointer-events-none absolute inset-0 h-full w-full text-accent/25"
      >
        <line x1="150" y1="150" x2="20" y2="40" stroke="currentColor" strokeWidth="1" />
        <line x1="150" y1="150" x2="280" y2="80" stroke="currentColor" strokeWidth="1" />
        <line x1="150" y1="150" x2="10" y2="240" stroke="currentColor" strokeWidth="1" />
        <line x1="150" y1="150" x2="270" y2="270" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Central workspace panel */}
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        className="glass-strong relative z-10 w-48 rounded-2xl p-4 sm:w-56"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
          now.log
        </p>
        <div className="mt-3 space-y-2.5">
          {workspaceLines.map(({ Icon, label }, index) => (
            <motion.div
              key={label}
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.15, ease: EASE }}
              className="flex items-center gap-2"
            >
              <Icon size={14} className="text-accent" />
              <span className="font-mono text-xs text-text-secondary">
                {label}
                <span className="text-accent">…</span>
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating tech chips */}
      {featuredSkills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          animate={
            reduced
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1, y: [0, -8, 0] }
          }
          transition={
            reduced
              ? { duration: 0.5, delay: 1.1 + index * 0.1 }
              : {
                  opacity: { duration: 0.5, delay: 1.1 + index * 0.1 },
                  scale: { duration: 0.5, delay: 1.1 + index * 0.1 },
                  y: {
                    duration: 3 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.4 + index * 0.2,
                  },
                }
          }
          className={`glass absolute z-10 rounded-full px-3 py-1.5 text-xs font-medium text-text-primary ${CHIP_POSITIONS[index]}`}
        >
          {skill.name}
        </motion.div>
      ))}
    </div>
  );
}
