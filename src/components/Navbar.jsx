import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { useActiveSection } from "../hooks/useActiveSection";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

const NAV_IDS = NAV_LINKS.map((link) => link.id);

/**
 * The full name as a brand mark: each letter blurs into focus in
 * sequence, then a soft gold shimmer passes across once. Under
 * reduced motion it simply renders as static text.
 */
function BrandName({ reduced }) {
  const letters = siteConfig.name.toUpperCase().split("");

  if (reduced) {
    return (
      <span className="font-display text-sm font-semibold tracking-[0.18em] text-text-primary sm:text-base">
        {siteConfig.name.toUpperCase()}
      </span>
    );
  }

  return (
    <span
      className="font-display text-sm font-semibold tracking-[0.18em] text-text-primary sm:text-base"
      aria-label={siteConfig.name}
    >
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            color: [
              "var(--color-text-primary)",
              "var(--color-accent-bright)",
              "var(--color-text-primary)",
            ],
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.2 + index * 0.04 },
            filter: { duration: 0.5, delay: 0.2 + index * 0.04 },
            y: { duration: 0.5, delay: 0.2 + index * 0.04, ease: [0.22, 1, 0.36, 1] },
            color: { duration: 0.9, delay: 1.1 + index * 0.05, times: [0, 0.4, 1] },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(NAV_IDS);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      initial={reduced ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
          scrolled ? "glass-strong" : "glass"
        }`}
        aria-label="Primary"
      >
        <a href="#home" aria-label={`${siteConfig.name} — home`}>
          <BrandName reduced={reduced} />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id} className="relative">
              <a
                href={`#${link.id}`}
                aria-current={activeId === link.id ? "page" : undefined}
                className={`relative z-10 block rounded-full px-4 py-2 text-sm transition-colors ${
                  activeId === link.id
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </a>
              {activeId === link.id && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full border border-white/70 bg-white/60 shadow-[0_2px_10px_-4px_rgba(90,66,20,0.35)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-text-primary lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <ul
          id="mobile-menu"
          className="glass-strong mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl p-3 lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-base ${
                  activeId === link.id
                    ? "bg-white/60 text-text-primary"
                    : "text-text-secondary"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.header>
  );
}
