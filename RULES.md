# RULES.md — Open Review 2026

> Hard constraints. These are not suggestions.
> If a task seems to require violating a rule, stop and ask the founder.

## Architectural rules

### R1 — Static-only at runtime
The deployed site contains zero server-side logic. No API calls from visitor browsers to anything Pyragogy-controlled. Giscus is the only exception (GitHub-hosted, third-party).

### R2 — Zero VPS load
Deployment is on Netlify, not on the founder's Coolify VPS. The VPS already runs Obliqo, n8n, Appwrite, forum, blog, plausible, docs. This project must not add to that surface.

### R3 — One-time generation
The four-agent reviews are generated once per edition (annual on January 1st). The generation script runs locally or on a CI runner, not on the deployed site. Output is committed to the repo.

### R4 — No user data on Pyragogy side
No logins, no signups, no analytics that track individuals, no email collection forms hosted by us. Plausible (already self-hosted) is fine for aggregate analytics. Giscus stores comments on GitHub. Phase II waitlist uses `mailto:` or Netlify Forms (no founder backend).

### R5 — Two surfaces, one ecosystem
Open Review and Obliqo are sibling projects, not nested products. Open Review **links to** Obliqo. Open Review does **not** authenticate against Obliqo, share quotas with Obliqo, or import Obliqo UI components verbatim. They share lineage (the four-agent method, the visual ecosystem) but not infrastructure.

### R6 — Source of truth is the fork
Chapter content comes from `https://github.com/pyragogy/legacy-peeragogy-handbook/tree/master/en-md` — the CC-Zero fork in the Pyragogy org. Not from `peeragogy.org` HTML, not from any other source. If a chapter is missing or malformed in the fork, fix the fork (or document the issue), don't paper over it.

## Content rules

### R7 — CC-Zero attribution practice
The Peeragogy Handbook is CC-Zero (Public Domain). Legally we owe nothing. Editorially we always credit:
- Howard Rheingold (founder) and the original contributors
- The 2012 origin date
- Link to peeragogy.org and the GitHub fork

### R8 — Never invent quotes
Never attribute words to Howard Rheingold or other Peeragogy contributors that are not directly sourced from their writing. If a review quotes something, the quote must be findable in the chapter source.

### R9 — Generation provenance always visible
Every chapter page footer must contain: *"Generated on [DATE] using Obliqo Engine v[VERSION] · Open Review [YEAR] edition · Next refresh: January 1, [YEAR+1]"*

### R10 — Footer always links out
Every chapter page footer must contain a link to obliqo.pyragogy.org with the framing: *"Want this critique on your own writing? → obliqo.pyragogy.org"*

### R11 — No invented rankings, scores, or facts
The four-agent output may contain a numerical "review score" — it must come from the n8n workflow output, not be invented or smoothed by the static generator.

## Technical rules

### R12 — Plain web first
HTML, CSS, vanilla JS where possible. If a generator framework is needed (Astro, Eleventy, custom Node script), prefer the lightest option. The site must remain readable with JavaScript disabled (Giscus comments will not load — acceptable degradation).

### R13 — No build-time secrets in client bundles
OpenRouter keys, n8n credentials, Appwrite keys never appear in committed code or in the deployed bundle. Generation scripts read them from `.env` (gitignored).

### R14 — Branch hygiene
- `main` = what's live on Netlify (auto-deploy)
- Feature work on branches (e.g., `feat/giscus-integration`)
- Annual edition work on a year-tagged branch (e.g., `edition/2027`)
- No force-push to `main`, ever

### R15 — Deploy gating
Netlify auto-deploys from `main`. Therefore: nothing reaches `main` without founder review. Branch protection on GitHub: require PR before merge.

### R16 — Performance budget
Lighthouse scores at launch and at every annual edition:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95
If a change drops any of these below threshold, it's reverted unless explicitly justified.

### R17 — No tracking pixels, no third-party fonts from CDN
Self-host fonts. No Google Analytics, no Facebook Pixel, no advertising scripts. Plausible self-hosted is the only analytics. (Giscus loads from GitHub — accepted as it's the comment system itself.)

## Editorial rules

### R18 — Italian/English bilingual is fine
User-facing copy can be in Italian where it feels natural (founder's voice, audience awareness). Code comments and commits in English.

### R19 — Voice: editorial broadside, not SaaS landing
Tone is closer to a literary review than to a product page. No "Sign up now!", no "Boost your productivity!", no marketing CTAs in body content. The single CTA is the footer link to Obliqo, written soberly.

### R20 — Visual identity: ink-violet
Inherited from the maintenance page (April 2026). Hoefler Text italic for headings, Charter for body, JetBrains Mono for UI/metadata. Asymmetric layouts. Grain texture. Two radial washes drift. Dark editorial atmosphere.

Amber `#f59e0b` is reserved for Obliqo. Do not use in Open Review except in the explicit "powered by Obliqo" link.

### R21 — Slowness is okay
This is not a SaaS dashboard. Animations can be slow. Reveals can be staggered. The reading experience is the product. `prefers-reduced-motion` is respected.

## Process rules

### R22 — Plan before code
For any task larger than a single-file edit: write a plan, get founder approval, then execute. Plan-mode-friendly is the default mode of work.

### R23 — Document decisions
Architectural decisions go in `DECISIONS.md`. Don't let context vanish in chat history.

### R24 — Stop and ask
When in doubt, stop and ask. The founder is solo and time-constrained — a 30-second clarification beats a 4-hour rebuild.
