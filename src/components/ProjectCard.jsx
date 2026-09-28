import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import { useSpotlight } from "../hooks/useSpotlight";
import { useTilt } from "../hooks/useTilt";

export default function ProjectCard({ project, onOpenCaseStudy }) {
  const visibleTech = project.technologies.slice(0, 4);
  const extraCount = project.technologies.length - visibleTech.length;
  const spotlight = useSpotlight();
  const tilt = useTilt();

  const handleMouseMove = (event) => {
    spotlight.onMouseMove(event);
    tilt.onMouseMove(event);
  };

  const setRefs = (node) => {
    spotlight.ref.current = node;
    tilt.ref.current = node;
  };

  return (
    <article
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="spotlight glass flex h-full flex-col rounded-[24px] transition-[box-shadow] duration-200 will-change-transform hover:border-white/80"
    >
      <div className="relative z-10 border-b border-border px-5 py-3">
        <p className="font-mono text-xs text-text-muted">
          ~/projects/{project.id}
        </p>
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-display text-lg font-medium text-text-primary">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-accent">{project.tagline}</p>
        </div>

        <p className="text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-2">
          {visibleTech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-text-muted"
            >
              {tech}
            </li>
          ))}
          {extraCount > 0 && (
            <li className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-text-muted">
              +{extraCount}
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="glass rounded-full px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-white/80 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View Case Study
          </button>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} on GitHub`}
                className="text-text-secondary transition-colors hover:text-accent"
              >
                <GithubIcon size={18} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} live demo`}
                className="text-text-secondary transition-colors hover:text-accent"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
