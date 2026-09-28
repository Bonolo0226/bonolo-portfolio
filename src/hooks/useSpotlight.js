import { useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Sets --spot-x/--spot-y CSS custom properties on an element as the
 * pointer moves over it, for use with the .spotlight utility class
 * in index.css. Pure CSS variable updates — no re-renders.
 */
export function useSpotlight() {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const onMouseMove = (event) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--spot-x", `${x}%`);
    ref.current.style.setProperty("--spot-y", `${y}%`);
  };

  return { ref, onMouseMove };
}
