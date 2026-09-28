import { useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Returns event handlers that nudge an element a few pixels toward
 * the cursor on hover, and spring it back on leave. Pure CSS
 * transform, no library — kept subtle on purpose (small max offset).
 */
export function useMagnetic(strength = 12) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const onMouseMove = (event) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return { ref, onMouseMove, onMouseLeave };
}
