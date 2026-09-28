import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useMagnetic } from "../hooks/useMagnetic";
import { GithubIcon, LinkedinIcon } from "../components/icons";
import DevOrbit from "../components/DevOrbit";

const EASE = [0.22, 1, 0.36, 1];

/** Words slide up out of a soft blur, staggered. */
function RevealWords({ text, delay = 0, reduced }) {
  return text.split(" ").map((word, index) => (
    <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        className="inline-block"
        initial={reduced ? false : { y: "105%", opacity: 0, filter: "blur(6px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: delay + index * 0.07, ease: EASE }}
      >
        {word}
        {"\u00A0"}
      </motion.span>
    </span>
  ));
}

function fadeUp(delay, reduced) {
  return {
    initial: reduced ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const primaryCta = useMagnetic(10);
  const secondaryCta = useMagnetic(8);

  return (
    <section
      id="home"
      className="tone-base relative flex min-h-[85vh] items-center overflow-hidden px-6 py-24"
    >
      {/* Background lighting eases in */}
      <motion.div
        aria-hidden="true"
        className="ambient-glow"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />

      {/* One soft light pass across the hero */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 z-0 w-1/3 bg-[linear-gradient(105deg,transparent,rgba(255,255,255,0.45),transparent)]"
          initial={{ x: "0%", opacity: 0 }}
          animate={{ x: "420%", opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, delay: 0.9, ease: "easeInOut" }}
        />
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
          <motion.p
            {...fadeUp(0.35, reduced)}
            className="font-mono text-xs uppercase tracking-[0.2em] text-accent sm:text-sm"
          >
            {siteConfig.location}
          </motion.p>

          <motion.p
            {...fadeUp(0.42, reduced)}
            className="mt-3 text-sm font-medium tracking-wide text-text-secondary sm:text-base"
          >
            {siteConfig.title}
            <span className="mx-2 text-accent">-</span>
            {siteConfig.subtitle}
          </motion.p>

          <h1 className="mt-6 font-display text-[2.75rem] font-medium leading-[1.02] tracking-tight text-text-primary sm:text-6xl lg:text-[4.75rem]">
            <RevealWords text={siteConfig.tagline} delay={0.5} reduced={reduced} />
          </h1>

          <motion.p
            {...fadeUp(1.0, reduced)}
            className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl"
          >
            {siteConfig.intro}
          </motion.p>

          <motion.div
            {...fadeUp(1.15, reduced)}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              ref={primaryCta.ref}
              onMouseMove={primaryCta.onMouseMove}
              onMouseLeave={primaryCta.onMouseLeave}
              href="#projects"
              className="btn-gold"
            >
              View My Work
              <ArrowRight size={16} className="btn-arrow" />
            </a>
            <a
              ref={secondaryCta.ref}
              onMouseMove={secondaryCta.onMouseMove}
              onMouseLeave={secondaryCta.onMouseLeave}
              href="#contact"
              className="btn-glass"
            >
              Let's Connect
              <ArrowRight size={16} className="btn-arrow" />
            </a>
          </motion.div>

          <motion.div
            {...fadeUp(1.3, reduced)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="btn-glass !p-3"
            >
              <GithubIcon size={18} />
            </a>
            {siteConfig.links.linkedin && (
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="btn-glass !p-3"
              >
                <LinkedinIcon size={18} />
              </a>
            )}
            <a
              href={siteConfig.links.resumeFile}
              download
              className="btn-glass !px-5 !py-3"
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>
        </div>

        <DevOrbit />
      </div>
    </section>
  );
}
