import { siteConfig } from "../data/siteConfig";
import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";
import SectionPanel from "../components/SectionPanel";

export default function About() {
  return (
    <SectionPanel id="about">
      <ScrollReveal>
        <SectionHeading
          title="About"
          description="A bit of background on where I've come from and how I work."
        />
      </ScrollReveal>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <ScrollReveal delay={0.05} className="space-y-5">
          {siteConfig.bio.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="max-w-2xl text-base leading-relaxed text-text-secondary"
            >
              {paragraph}
            </p>
          ))}
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="glass rounded-[20px] p-6">
            <p className="font-mono text-xs text-text-muted">how-i-work.md</p>
            <p className="mt-3 text-base leading-relaxed text-text-secondary">
              {siteConfig.approach}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </SectionPanel>
  );
}
