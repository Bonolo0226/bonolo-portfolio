import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;

// Shortest signed distance from `index` to `active` on a ring of size
// `length` — e.g. with 6 projects, going from 0 to 5 is a distance of
// -1 (one step back), not +5.
function ringDelta(index, active, length) {
  let delta = index - active;
  if (delta > length / 2) delta -= length;
  if (delta < -length / 2) delta += length;
  return delta;
}

export default function ProjectCarousel({ projects, onOpenCaseStudy }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef(null);
  const dragStartX = useRef(null);
  const count = projects.length;

  const goTo = useCallback(
    (index) => setActive(((index % count) + count) % count),
    [count]
  );
  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Reset to the first project (OpenEx, the primary featured project)
  // whenever the underlying project list changes — e.g. a filter swap.
  useEffect(() => {
    setActive(0);
  }, [projects]);

  // Autoplay: advances every 5s, paused on hover/focus, and switched off
  // entirely under reduced motion (manual controls only).
  useEffect(() => {
    if (reduced || paused || count <= 1) return undefined;
    const timer = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduced, paused, goNext, count]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") goNext();
    if (event.key === "ArrowLeft") goPrev();
  };

  const handlePointerDown = (event) => {
    dragStartX.current = event.clientX;
  };
  const handlePointerUp = (event) => {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();
    dragStartX.current = null;
  };

  if (count === 0) return null;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="relative select-none outline-none"
    >
      <div className="relative h-[460px] touch-pan-y overflow-hidden sm:h-[420px]">
        {projects.map((project, index) => {
          const delta = ringDelta(index, active, count);
          const isActive = delta === 0;
          const visible = Math.abs(delta) <= 1;

          const style = {
            transform: `translate(-50%, -50%) translateX(${delta * 78}%) scale(${
              isActive ? 1 : 0.8
            })`,
            opacity: visible ? (isActive ? 1 : 0.5) : 0,
            zIndex: isActive ? 30 : 20 - Math.abs(delta),
            pointerEvents: visible ? "auto" : "none",
          };

          return (
            <motion.div
              key={project.id}
              animate={style}
              transition={{ duration: reduced ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1]}}
              className="absolute left-1/2 top-1/2 w-[85vw] max-w-[300px] sm:max-w-[420px] md:max-w-[520px]"
              aria-hidden={!isActive}
            >
              {isActive ? (
                <div className="glass-strong relative overflow-hidden rounded-[28px] p-6 sm:p-8">
                  <span className="glass-sheen" aria-hidden="true" />
                  <div className="relative z-10">
                    <p className="font-mono text-xs text-text-muted">
                      ~/projects/{project.id}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-medium text-text-primary sm:text-3xl">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-accent">{project.tagline}</p>
                    <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-text-secondary sm:line-clamp-3">
                      {project.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-text-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenCaseStudy(project)}
                        className="glossy-gold rounded-full px-5 py-2.5 text-sm font-semibold"
                      >
                        View Case Study
                      </button>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.name} on GitHub`}
                          className="glass rounded-full p-2.5 text-text-secondary transition-colors hover:text-accent"
                        >
                          <GithubIcon size={16} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.name} live demo`}
                          className="glass rounded-full p-2.5 text-text-secondary transition-colors hover:text-accent"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show ${project.name}`}
                  className="glass block w-full rounded-[28px] p-6 text-left sm:p-8"
                >
                  <p className="font-display text-lg font-medium text-text-primary sm:text-xl">
                    {project.name}
                  </p>
                  <p className="mt-1 text-xs text-accent sm:text-sm">
                    {project.tagline}
                  </p>
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Prev / next controls */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous project"
        className="glass absolute left-0 top-1/2 z-40 -translate-y-1/2 rounded-full p-2.5 text-text-secondary transition-colors hover:text-accent sm:-left-2"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next project"
        className="glass absolute right-0 top-1/2 z-40 -translate-y-1/2 rounded-full p-2.5 text-text-secondary transition-colors hover:text-accent sm:-right-2"
      >
        <ChevronRight size={20} />
      </button>

      {/* Position indicators */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show ${project.name}`}
            aria-current={index === active}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === active ? "w-6 bg-accent" : "w-1.5 bg-border-strong"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
