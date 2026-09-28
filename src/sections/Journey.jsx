import {
  buildProcess,
  capacitiExposure,
  currentlyLearning,
} from "../data/journey";
import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";
import SectionPanel from "../components/SectionPanel";

export default function Journey() {
  return (
    <SectionPanel id="journey">
      <ScrollReveal>
        <SectionHeading
          title="Building. Learning. Shipping."
          description="How the CAPACITI Tech Career Accelerator fits into my growth, what I'm sharpening right now, and how I approach building something new."
        />
      </ScrollReveal>

      <div className="grid gap-16 lg:grid-cols-2">
        <ScrollReveal delay={0.05}>
          <h3 className="mb-5 font-mono text-sm text-text-muted">
            CAPACITI Tech Career Accelerator
          </h3>
          <p className="mb-6 max-w-md text-sm leading-relaxed text-text-secondary">
            CAPACITI isn't an employer - it's a structured accelerator giving
            me hands-on exposure to real project work across these areas:
          </p>
          <ul className="grid grid-cols-2 gap-3">
            {capacitiExposure.map((item) => (
              <li
                key={item}
                className="glass rounded-2xl px-3 py-2 text-sm text-text-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h3 className="mb-5 font-mono text-sm text-text-muted">
            Currently Sharpening
          </h3>
          <ul className="space-y-3">
            {currentlyLearning.map((item) => (
              <li key={item.name} className="glass rounded-2xl px-4 py-3">
                <p className="text-sm font-medium text-text-primary">
                  {item.name}
                </p>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {item.note}
                </p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>

      <div className="mt-20">
        <ScrollReveal>
          <h3 className="mb-8 font-mono text-sm text-text-muted">
            How I Build
          </h3>
        </ScrollReveal>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {buildProcess.map((item, index) => (
            <ScrollReveal
              key={item.step}
              delay={Math.min(index * 0.05, 0.3)}
              as="li"
              className="glass rounded-2xl p-4"
            >
              <span className="font-mono text-xs text-accent">
                {item.step}
              </span>
              <p className="mt-2 text-sm font-medium text-text-primary">
                {item.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </SectionPanel>
  );
}
