import { Download } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { skillGroups } from "../data/skills";
import { projects } from "../data/projects";
import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";
import SectionPanel from "../components/SectionPanel";

export default function Resume() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <SectionPanel id="resume">
      <ScrollReveal>
        <SectionHeading
          title="Resume"
          description="A quick overview - download the full CV for complete details."
        />
      </ScrollReveal>

      <ScrollReveal delay={0.05} className="mb-10 block">
        <a
          href={siteConfig.links.resumeFile}
          download
          className="glossy-gold inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
        >
          <Download size={16} />
          Download CV
        </a>
      </ScrollReveal>

      <div className="grid gap-12 lg:grid-cols-2">
        <ScrollReveal delay={0.1}>
          <h3 className="mb-4 font-mono text-sm text-text-muted">
            Education
          </h3>
          <div className="glass rounded-2xl p-5">
            <p className="text-sm font-medium text-text-primary">
              Diploma in Information and Communication Technology
              (Applications Development)
            </p>
          </div>

          <h3 className="mb-4 mt-10 font-mono text-sm text-text-muted">
            Current Program
          </h3>
          <div className="glass rounded-2xl p-5">
            <p className="text-sm font-medium text-text-primary">
              CAPACITI Tech Career Accelerator
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Building full-stack and AI-powered applications under
              sprint-based, real project conditions.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h3 className="mb-4 font-mono text-sm text-text-muted">
            Technical Skills
          </h3>
          <div className="space-y-2">
            {skillGroups.map((group) => (
              <p key={group.label} className="text-sm text-text-secondary">
                <span className="font-medium text-text-primary">
                  {group.label}:
                </span>{" "}
                {group.skills.map((skill) => skill.name).join(", ")}
              </p>
            ))}
          </div>

          <h3 className="mb-4 mt-10 font-mono text-sm text-text-muted">
            Selected Projects
          </h3>
          <ul className="space-y-1.5">
            {featuredProjects.map((project) => (
              <li key={project.id} className="text-sm text-text-secondary">
                <span className="font-medium text-text-primary">
                  {project.name}
                </span>{" "}
                - {project.tagline}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </SectionPanel>
  );
}
