# WHAT-WE-CAN-DO.md — Open Review 2026

> Affordances, capabilities, and explicit non-goals.
> What this codebase enables, what it doesn't, and what's parked for later.

## What we CAN do (in this codebase)

### Content generation
- ✅ Run the existing n8n v2.2 workflow (`peeragogy-review-v22`) against any of the 50 chapters in `pyragogy/legacy-peeragogy-handbook/en-md/`
- ✅ Generate two intensity variants per chapter (Perturbator=3 default, Perturbator=5 stress)
- ✅ Save raw JSON output to a versioned folder (`reviews/2026/<chapter-slug>.json`)
- ✅ Convert JSON output to HTML via a static-site-generator step

### Site building
- ✅ Build 50 chapter pages, organized in 10 categories (intro, peer-learning, motivation, patterns, antipatterns, convening, organizing, cooperation, assessment, technologies)
- ✅ Build category index pages
- ✅ Build a homepage that explains the project, the lineage, and links to Obliqo
- ✅ Build a sitemap.xml and robots.txt
- ✅ Build proper SEO meta (title, description, OpenGraph, schema.org Article)
- ✅ Embed Giscus on each chapter page for comments (GitHub Discussions backend)
- ✅ Self-host fonts (Hoefler Text via Adobe Edge or fallback to Charter; JetBrains Mono open source)
- ✅ Implement responsive design (mobile-friendly editorial layouts)
- ✅ Implement `prefers-reduced-motion` and `prefers-color-scheme` correctly

### Deployment
- ✅ Deploy to Netlify from `main` branch (auto-deploy)
- ✅ Configure custom domain `open-review.pyragogy.org` via Netlify DNS or external DNS
- ✅ Configure HTTPS, security headers, redirects via `netlify.toml`
- ✅ Use Netlify branch deploys for previewing edition refreshes before merge

### Tooling
- ✅ Use Astro, Eleventy, or a custom Node script for static generation — choose the lightest viable option
- ✅ Use a small Python or Node script to drive the n8n workflow runs and collect outputs
- ✅ Use GitHub Actions for CI (lint, build check, Lighthouse CI optional)
- ✅ Use `pnpm` or `npm` for dependency management

### Phase II seed
- ✅ Add a "Contribute a revision" link in each chapter footer → `mailto:` or simple Netlify Form for waitlist intent capture
- ✅ Track waitlist signups via Netlify Forms dashboard (no backend code needed)

## What we CANNOT do (here)

### Runtime behaviors
- ❌ Make API calls from visitor browsers to OpenRouter, n8n, or Appwrite
- ❌ Implement user login, signup, account, or quota
- ❌ Accept user-submitted text for runtime AI processing
- ❌ Run any server-side process (no Netlify Functions, no Edge Functions)
- ❌ Store visitor data in any database or storage we control

### Cross-product entanglement
- ❌ Share Appwrite collections with Obliqo
- ❌ Share quota counters with Obliqo
- ❌ Import Obliqo's auth flow or signin component
- ❌ Embed Obliqo's UI inside Open Review

### Content shortcuts
- ❌ Generate review content with any model not invoked through the n8n v2.2 workflow (no quick-and-dirty direct OpenRouter calls that bypass the four-agent method)
- ❌ Edit the four-agent outputs after generation (review them, but if a review is bad, regenerate or document why we kept it as-is)
- ❌ Mock or stub agent responses for missing chapters — if a chapter can't be generated, mark it explicitly missing on the index, don't fake it

### Aesthetic shortcuts
- ❌ Use amber `#f59e0b` (reserved for Obliqo)
- ❌ Use marketing-landing-page tropes (testimonials, countdown timers, "join 10,000+ users", aggressive CTAs)
- ❌ Use stock illustrations or AI-generated imagery in chapter pages

## What we WILL do later (not in this codebase, not now)

### Phase II — Polyphonic synthesis
- A future capability where users submit revisions of chapters, an AI synthesizes N revisions into a "polyphonic" composite
- Requires its own architecture, schema, moderation, quality controls, costs
- Not in this codebase. Will be a separate project (`pyragogy/polyphonic-handbook` or similar) if the waitlist demand justifies it

### Phase III — Community Edition (B2B)
- Institutions buy a private replica of the Open Review experience for their own corpus
- Pricing band: €2,500–5,000/year
- Not in this codebase. Will require: SaaS scaffolding, contracts, DPA, dedicated infra
- Sales narrative: "what we did publicly for the Peeragogy Handbook, replicated privately for your institution"

### Annual editions
- 2027, 2028, etc. each get their own branch and tagged release
- The same codebase hosts all editions, with a edition-switcher in the UI
- The "diff" between editions becomes its own page, showing how AI critique evolves

## What we HAVE access to (via founder's stack)

These exist in the broader Pyragogy ecosystem and can be referenced or read from, but are not directly modified by this codebase:

- `n8n.pyragogy.org` — for running the v2.2 workflow during edition generation
- `pyragogy/legacy-peeragogy-handbook` (GitHub) — chapter source content
- `obliqo.pyragogy.org` — link target in footer
- `plausible.pyragogy.org` — analytics receiver
- `forum.pyragogy.org` — community discussion (link from homepage if appropriate)
- `wiki.pyragogy.org` — knowledge base (link from homepage if appropriate)

## Decision log entry points

When facing a choice not covered by this document, default order of consultation:

1. Read **CONTEXT.md** — does the lineage suggest an answer?
2. Read **RULES.md** — does a hard constraint apply?
3. Check **DECISIONS.md** — has this been resolved before?
4. Ask the founder.
5. Document the new decision in **DECISIONS.md** before executing.
