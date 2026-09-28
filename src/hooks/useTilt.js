import { useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const MAX_TILT_DEG = 4;

/**
 * A small, capped 3D tilt that follows the cursor within the card —
 * meant to read as "depth", not a gimmick. Skipped under
 * prefers-reduced-motion.
 */
export function useTilt() {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const onMouseMove = (event) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${(-py * MAX_TILT_DEG).toFixed(2)}deg) rotateY(${(px * MAX_TILT_DEG).toFixed(2)}deg) translateY(-2px)`;
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return { ref, onMouseMove, onMouseLeave };
}
