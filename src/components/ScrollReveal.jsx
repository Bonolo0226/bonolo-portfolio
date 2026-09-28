import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Fades + slides its children up into place the first time they
 * scroll into view. Used to give each section a gentle entrance
 * instead of just appearing.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const Component = motion[as] ?? motion.div;

  if (prefersReducedMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
