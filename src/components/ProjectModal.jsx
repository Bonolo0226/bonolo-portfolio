import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon } from "./icons";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!project) return undefined;

    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [project, onClose]);

  // Rendered into document.body via a portal rather than in place.
  // Several ancestor panels in this site use backdrop-filter for the
  // glass effect, and per the CSS spec an element with backdrop-filter
  // becomes the containing block for any `position: fixed` descendant
  // -- which was trapping this modal inside that panel's rounded,
  // overflow-hidden box instead of covering the full viewport. The
  // portal sidesteps that regardless of which panel opened it.
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2a2114]/55 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            tabIndex={-1}
            className="modal-surface relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] outline-none"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24, scale: prefersReducedMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
          >
            <span className="glass-sheen" aria-hidden="true" />
            <div className="relative z-10 flex shrink-0 items-start justify-between border-b border-border px-6 py-5">
              <div>
                <p className="font-mono text-xs text-text-muted">
                  ~/projects/{project.id}
                </p>
                <h3
                  id="case-study-title"
                  className="mt-1 font-display text-2xl font-medium text-text-primary"
                >
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-accent">{project.tagline}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="rounded-full p-1.5 text-text-secondary transition-colors hover:bg-white/40 hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative z-10 min-h-0 flex-1 space-y-8 overflow-y-auto px-6 py-6">
              <Field label="Problem" value={project.caseStudy.problem} />
              <Field label="Solution" value={project.caseStudy.solution} />
              <Field label="My Role" value={project.caseStudy.role} />

              <div>
                <FieldLabel>Technologies</FieldLabel>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <Field label="Architecture" value={project.caseStudy.architecture} />

              <div>
                <FieldLabel>Key Features</FieldLabel>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-text-secondary">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <FieldLabel>Development Challenges</FieldLabel>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-text-secondary">
                  {project.caseStudy.challenges.map((challenge) => (
                    <li key={challenge}>{challenge}</li>
                  ))}
                </ul>
              </div>

              <Field label="Lessons Learned" value={project.caseStudy.learnings} />
            </div>

            <div className="relative z-10 flex shrink-0 flex-wrap items-center gap-3 border-t border-border px-6 py-5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-white/80"
                >
                  <GithubIcon size={16} /> View on GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="glossy-gold inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              {project.apiDocs && (
                <a
                  href={project.apiDocs}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-white/80"
                >
                  API Docs
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function FieldLabel({ children }) {
  return <p className="font-mono text-xs text-text-muted">{children}</p>;
}

function Field({ label, value }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {value}
      </p>
    </div>
  );
}
