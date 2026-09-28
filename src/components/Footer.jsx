import { siteConfig } from "../data/siteConfig";
import { GithubIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-6 sm:px-6">
      <div className="glass-strong relative mx-auto max-w-6xl overflow-hidden rounded-[28px] p-6 sm:p-8">
        <span className="glass-sheen" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-medium text-text-primary">
              {siteConfig.name}
            </p>
            <p className="text-sm text-text-secondary">{siteConfig.title}</p>
            <p className="mt-2 max-w-sm text-sm text-text-muted">
              Building, learning and solving problems through software.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="text-text-secondary transition-colors hover:text-accent"
            >
              <GithubIcon size={20} />
            </a>
          </div>
        </div>

        <div className="relative z-10 mt-6 border-t border-border pt-4 text-center text-xs text-text-muted">
          © {year} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
