import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { currentlyLearning } from "../data/journey";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1];

function StrapAndClip() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center"
    >
      <div className="h-[16vh] w-[6px] rounded-full bg-gradient-to-b from-[#3a2f20] via-[#5a4a30] to-[#3a2f20] shadow-[0_0_8px_rgba(0,0,0,0.25)] sm:h-[18vh]" />
      <div className="-mt-1 h-4 w-4 rounded-full border-2 border-[#e7d7ad] bg-gradient-to-br from-[#f3e6c4] to-[#b98f47] shadow-inner" />
      <div className="mt-0.5 h-3 w-8 rounded-md border border-white/60 bg-gradient-to-b from-[#f6efe0] to-[#d8c79c] shadow-sm" />
    </div>
  );
}

function FloatingGlyphs({ reduced }) {
  const glyphs = [
    { Icon: Code2, className: "left-[8%] top-[18%]", delay: 0 },
    { Icon: Sparkles, className: "right-[10%] top-[28%]", delay: 0.4 },
    { Icon: Code2, className: "right-[14%] bottom-[22%]", delay: 0.8 },
    { Icon: Sparkles, className: "left-[12%] bottom-[16%]", delay: 1.2 },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {glyphs.map(({ Icon, className, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${className} text-accent/40`}
          initial={reduced ? { opacity: 0.35 } : { opacity: 0, y: 12 }}
          animate={
            reduced
              ? { opacity: 0.35 }
              : { opacity: [0, 0.5, 0.35], y: [12, -6, 0] }
          }
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 1.6, delay: 1.6 + delay, ease: EASE }
          }
        >
          <Icon size={22} />
        </motion.div>
      ))}
    </div>
  );
}

export default function IDTag() {
  const reduced = usePrefersReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [photoStatus, setPhotoStatus] = useState("loading");

  // A single, one-time auto-flip to show the back exists, then back to
  // front. After that, the card is click/tap-to-flip. Skipped entirely
  // under reduced motion — the back is still reachable via click.
  useEffect(() => {
    if (reduced) return undefined;
    const toBack = setTimeout(() => setFlipped(true), 1800);
    const toFront = setTimeout(() => setFlipped(false), 3200);
    return () => {
      clearTimeout(toBack);
      clearTimeout(toFront);
    };
  }, [reduced]);

  const topLearning = currentlyLearning.slice(0, 3);

  return (
    <div className="relative flex flex-col items-center">
      <StrapAndClip />
      <FloatingGlyphs reduced={reduced} />

      <motion.div
        initial={reduced ? { opacity: 0 } : { y: -420, opacity: 0, rotate: -6 }}
        animate={
          reduced
            ? { opacity: 1 }
            : { y: 0, opacity: 1, rotate: [-6, 4, -2, 0] }
        }
        transition={
          reduced
            ? { duration: 0.5 }
            : {
                y: { type: "spring", stiffness: 110, damping: 14, delay: 0.2 },
                opacity: { duration: 0.4, delay: 0.2 },
                rotate: { duration: 1.6, delay: 0.2, ease: EASE },
              }
        }
        className="relative mt-[16vh] [perspective:1400px] sm:mt-[18vh]"
      >
        <motion.button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          aria-label={
            flipped ? "Show front of ID tag" : "Flip ID tag to see the back"
          }
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{
            duration: reduced ? 0.01 : 0.9,
            ease: EASE,
          }}
          className="relative block h-[340px] w-[230px] cursor-pointer [transform-style:preserve-3d] rounded-[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:h-[380px] sm:w-[258px]"
        >
          {/* Front */}
          <div className="glass-strong absolute inset-0 flex flex-col items-center gap-3 rounded-[28px] p-6 text-center [backface-visibility:hidden]">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
              Developer ID
            </span>

            <div className="relative mt-1 h-24 w-24 overflow-hidden rounded-full border border-white/70 bg-gradient-to-br from-[#efe2c4] via-[#e6d3a8] to-[#d9bd80] shadow-inner">
              {photoStatus !== "error" && (
                <img
                  src={siteConfig.photo}
                  alt=""
                  onLoad={() => setPhotoStatus("loaded")}
                  onError={() => setPhotoStatus("error")}
                  className={`h-full w-full object-cover transition-opacity duration-500 ${
                    photoStatus === "loaded" ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
              {photoStatus === "error" && (
                <span className="absolute inset-0 flex items-center justify-center font-display text-xl text-text-secondary">
                  {siteConfig.initials}
                </span>
              )}
            </div>

            <div className="mt-1">
              <p className="font-display text-lg font-medium leading-tight text-text-primary">
                {siteConfig.name}
              </p>
              <p className="mt-1 text-xs font-medium text-accent">
                {siteConfig.title}
              </p>
            </div>

            <p className="mt-1 text-xs leading-relaxed text-text-secondary">
              {siteConfig.intro}
            </p>

            <span className="mt-auto font-mono text-[10px] text-text-muted">
              tap to flip
            </span>
          </div>

          {/* Back */}
          <div className="glass-strong absolute inset-0 flex flex-col gap-3 rounded-[28px] p-6 text-left [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
              Currently Sharpening
            </span>

            <ul className="space-y-2">
              {topLearning.map((item) => (
                <li key={item.name} className="text-xs text-text-secondary">
                  <span className="font-medium text-text-primary">
                    {item.name}
                  </span>{" "}
                  - {item.note}
                </li>
              ))}
            </ul>

            <div className="mt-auto border-t border-border pt-3">
              <p className="text-xs leading-relaxed text-text-secondary">
                {siteConfig.approach}
              </p>
            </div>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
