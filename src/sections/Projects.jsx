import { useMemo, useState } from "react";
import { projectFilters, projects } from "../data/projects";
import SectionHeading from "../components/SectionHeading";
import ProjectCarousel from "../components/ProjectCarousel";
import ProjectModal from "../components/ProjectModal";
import ScrollReveal from "../components/ScrollReveal";
import SectionPanel from "../components/SectionPanel";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openProject, setOpenProject] = useState(null);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) =>
      project.categories.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <SectionPanel id="projects" strong>
      <ScrollReveal>
        <SectionHeading
          title="Featured Projects"
          description="A selection of what I've built across the bootcamp and on my own - full-stack apps, AI experiments, and practical tools."
        />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div
          className="mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {projectFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              aria-pressed={activeFilter === filter.key}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? "glossy-gold"
                  : "glass text-text-secondary hover:text-text-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        {visibleProjects.length > 0 ? (
          <ProjectCarousel
            projects={visibleProjects}
            onOpenCaseStudy={setOpenProject}
          />
        ) : (
          <p className="py-12 text-center text-sm text-text-secondary">
            No projects match this filter yet.
          </p>
        )}
      </ScrollReveal>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </SectionPanel>
  );
}
