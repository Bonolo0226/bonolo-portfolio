import { Star, GitFork } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { useGithubData } from "../hooks/useGithubData";
import SectionHeading from "../components/SectionHeading";
import ScrollReveal from "../components/ScrollReveal";
import SectionPanel from "../components/SectionPanel";
import { GithubIcon } from "../components/icons";

export default function GithubActivity() {
  const { status, profile, repos } = useGithubData();

  return (
    <SectionPanel>
      <ScrollReveal>
        <SectionHeading
          title="GitHub Activity"
          description="Pulled live from GitHub - not a curated highlight reel."
        />
      </ScrollReveal>

      {status === "loading" && (
        <p className="text-sm text-text-secondary">Loading repositories…</p>
      )}

      {status === "error" && (
        <p className="text-sm text-text-secondary">
          Couldn't load live GitHub data right now - you can browse the
          repositories directly on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      )}

      {status === "success" && (
        <>
          {profile && (
            <ScrollReveal delay={0.05}>
              <div className="mb-8 flex flex-wrap items-center gap-6 text-sm text-text-secondary">
                <span>{profile.public_repos} public repositories</span>
                <span>{profile.followers} followers</span>
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent underline-offset-4 hover:underline"
                >
                  <GithubIcon size={16} />
                  {profile.login}
                </a>
              </div>
            </ScrollReveal>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, index) => (
              <ScrollReveal key={repo.id} delay={Math.min(index * 0.05, 0.3)}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass flex flex-col gap-2 rounded-[20px] p-5 transition-colors hover:border-white/80"
                >
                  <p className="font-mono text-sm text-text-primary">
                    {repo.name}
                  </p>
                  <p className="line-clamp-2 min-h-[2.5rem] text-sm text-text-secondary">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-text-muted">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="inline-flex items-center gap-1">
                      <Star size={12} /> {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork size={12} /> {repo.forks_count}
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </>
      )}
    </SectionPanel>
  );
}
