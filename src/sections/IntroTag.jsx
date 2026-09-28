import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import IDTag from "../components/IDTag";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function IntroTag() {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Tag holds still for the first stretch of scroll, then shrinks, lifts,
  // and fades as the hero underneath comes into view.
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0.55]);
  const y = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0, -180]);
  const opacity = useTransform(scrollYProgress, [0, 0.55, 0.95], [1, 1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  if (reduced) {
    // No scroll-pinning gimmick for reduced-motion visitors — just show
    // the tag once, at a normal section height, then continue scrolling.
    return (
      <section className="tone-base relative flex min-h-[90vh] items-center justify-center px-6 py-20">
        <div className="ambient-glow" aria-hidden="true" />
        <div className="relative z-10">
          <IDTag />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="tone-base relative"
      style={{ height: "180vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div className="ambient-glow" aria-hidden="true" />

        <motion.div
          style={{ scale, y, opacity }}
          className="relative z-10 flex items-center justify-center"
        >
          <IDTag />
        </motion.div>

        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-text-muted"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            Scroll
          </span>
          <ChevronDown size={16} />
        </motion.div>
      </div>
    </section>
  );
}
