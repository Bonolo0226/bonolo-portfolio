# Bonolo Leponesa - Portfolio

## How to use this with your existing project

You already have `bonolo-portfolio` set up locally with Vite + React +
Tailwind v4 working. This zip contains the finished `src/` folder plus a
few root files. To merge it in:

1. Copy everything from this zip's `src/` folder into your existing
   project's `src/` folder, **replacing** `App.jsx`, `index.css`, and
   `main.jsx`, and adding the new `data/`, `components/`, `sections/`,
   and `hooks/` files.
2. Copy `vite.config.js` and `public/favicon.svg` into your project root
   (replacing your existing `vite.config.js` if it differs).
3. Install the two new dependencies this build introduces:

   ```powershell
   npm install framer-motion lucide-react
   ```

   - **framer-motion** powers the case-study modal's open/close animation
     and the project grid's filter transition.
   - **lucide-react** provides the icons (GitHub, LinkedIn, mail, download,
     menu, star, fork, etc.) used throughout the site.

4. Restart your dev server:

   ```powershell
   npm run dev
   ```

## What's still a placeholder

Per the brief's rule against inventing information, these are left empty
for you to fill in yourself in `src/data/siteConfig.js`:

- `links.linkedin` - your LinkedIn URL
- `links.email` - your contact email (also used by the mailto link in
  the Contact section)
- `links.resumeFile` - currently points to `/resume.pdf`. Drop your
  actual CV PDF into a new `public/` folder at your project root, named
  `resume.pdf`, and the Download CV buttons will work immediately.

Live demo/GitHub links left blank in `src/data/projects.js` (OpenEx has
no live demo, and DeskFlow/TimeTracker/BudgetBot/AI Content
Generator/Sentiment Analysis don't have public GitHub links you gave me)
are also worth filling in if/when they exist - the "View on GitHub" or
"Live Demo" button simply won't render for a project until that field
has a value.

## What's real vs. what to double check

- The **GitHub Activity** section fetches live data from the public
  GitHub API (`api.github.com`) for `Bonolo0226` - no invented stats.
  If GitHub's API rate-limits your IP (fairly generous for unauthenticated
  requests, but not unlimited) it'll show a graceful fallback message
  instead of fake numbers.
- The **contact form** validates and shows a success state, but isn't
  wired to actually send an email yet - see the comment in
  `src/components/ContactForm.jsx` for where a real send request would
  go once you pick an approach (e.g. a form service like Formspree, or
  your own backend endpoint).

## Design notes

- Palette: near-black graphite background (`#0d0d10`) with a single
  muted brass/amber accent (`#c9a15d`) - deliberately not neon, per the
  brief's "subtle accent colour" direction.
- Type: Inter for body text, JetBrains Mono for small technical labels
  (file-path style breadcrumbs, tech badges, section labels) - reinforcing
  the "developer command centre" feel without leaning on generic
  ALL-CAPS eyebrow labels.
- The hero's animated code block types out an actual object shaped like
  the real `siteConfig` data file, rather than a decorative unrelated
  animation - it's the one deliberate motion moment on the page, and
  respects `prefers-reduced-motion`.
- Project "screenshots" were intentionally left out rather than faked -
  there were no real screenshots to use, and stock/placeholder images
  were explicitly against the brief. Cards use a file-path style header
  instead. Swap in real screenshots later by adding an `image` field to
  each project in `projects.js` and rendering it in `ProjectCard.jsx`
  and `ProjectModal.jsx`.

## What's not done yet (flagging honestly)

This covers Phases 1-12 of your original 15-phase plan in one pass:
setup, global styles/nav, hero, about/CAPACITI, skills, projects +
case studies, learning journey, GitHub activity, resume, contact, and
footer. Not yet dedicated passes:

- **Phase 13 (responsive optimization)** - the layout uses responsive
  Tailwind classes throughout (mobile nav, stacking grids, fluid type),
  but hasn't been tested screen-by-screen on real devices.
- **Phase 14 (accessibility, SEO, performance audit)** - semantic
  landmarks, skip link, keyboard focus states, alt text patterns, and
  reduced-motion support are built in from the start, but this hasn't
  had a dedicated Lighthouse/axe pass yet.
- **Phase 15 (final polish)** - cross-browser check, real CV PDF, real
  screenshots, and filling in the placeholder links above.

Let me know if you'd like to go through any of those next.
