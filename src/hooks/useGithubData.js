import { useEffect, useState } from "react";

const USERNAME = "Bonolo0226";

/**
 * Pulls real, live data from the public GitHub REST API — no
 * authentication needed for public profile/repo data, and no
 * placeholder numbers. If the request fails (offline, rate limit),
 * we surface that clearly instead of making up stats.
 */
export function useGithubData() {
  const [state, setState] = useState({
    status: "loading", // "loading" | "success" | "error"
    profile: null,
    repos: [],
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(
            `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`
          ),
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error("GitHub API request failed");
        }

        const profile = await profileRes.json();
        const repos = await reposRes.json();

        if (!cancelled) {
          setState({ status: "success", profile, repos });
        }
      } catch (error) {
        if (!cancelled) {
          setState({ status: "error", profile: null, repos: [] });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
