import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projectFilters, projects } from "../data/projects";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import ScrollReveal from "../components/ScrollReveal";
import SectionPanel from "../components/SectionPanel";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openProject, setOpenProject] = useState(null);
  const prefersReducedMotion = usePrefersReducedMotion();

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

      <motion.div
        layout={!prefersReducedMotion}
        variants={prefersReducedMotion ? undefined : gridVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={prefersReducedMotion ? false : "show"}
        key={activeFilter}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visibleProjects.map((project) => (
          <motion.div
            key={project.id}
            layout={!prefersReducedMotion}
            variants={prefersReducedMotion ? undefined : cardVariants}
          >
            <ProjectCard project={project} onOpenCaseStudy={setOpenProject} />
          </motion.div>
        ))}
      </motion.div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </SectionPanel>
  );
}
