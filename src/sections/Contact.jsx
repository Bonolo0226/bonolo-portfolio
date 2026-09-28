import { Mail } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import SectionHeading from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";
import ScrollReveal from "../components/ScrollReveal";
import SectionPanel from "../components/SectionPanel";
import { GithubIcon } from "../components/icons";

export default function Contact() {
  return (
    <SectionPanel id="contact" strong>
      <ScrollReveal>
        <SectionHeading
          title="Let's Build Something"
          description="Have a role, a project, or just want to talk software - reach out."
        />
      </ScrollReveal>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <ScrollReveal delay={0.05} className="space-y-4">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="glass flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-text-secondary transition-colors hover:border-white/80 hover:text-text-primary"
          >
            <GithubIcon size={18} />
            {siteConfig.links.github.replace("https://", "")}
          </a>

          {siteConfig.links.email && (
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="glass flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-text-secondary transition-colors hover:border-white/80 hover:text-text-primary"
            >
              <Mail size={18} />
              {siteConfig.links.email}
            </a>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <ContactForm />
        </ScrollReveal>
      </div>
    </SectionPanel>
  );
}
