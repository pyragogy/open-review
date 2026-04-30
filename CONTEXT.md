# CONTEXT.md — Open Review 2026

> The story of how this project came to be, and what it inherits from.
> Read this to understand *why*, not just *what*.

## The lineage

**1962** — Iván Illich publishes *Deschooling Society*. The seed of "learning networks" that don't require schools.

**2012** — Howard Rheingold convenes a group of educators, students, and researchers to write the **Peeragogy Handbook**. Self-organized peer learning, distributed leadership, public domain (CC-Zero). The first edition is published. Fabrizio Terzi is among the original contributors.

**2012–2024** — The Peeragogy Handbook goes through three editions (2014, 2015, 2016). Joseph Corneli, Charles Jeffrey Danoff, Charlotte Pierce, Paola Ricaurte, Lisa Snow MacDonald, and dozens of contributors maintain it. Translations appear in Spanish, Italian, Portuguese. Howard Rheingold remains the public face.

**2024–2025** — Fabrizio Terzi formalizes **Pyragogy**: peer learning evolved for the AI era, where AI participates as a cognitive peer rather than a tool. The thesis on *Cognitive Intraspecific Selection in Education* is published on Zenodo (DOI: 10.5281/zenodo.16961291). A peer-reviewed paper appears in IJTE (International Journal of Technology in Education) Special Issue on AI in Education.

**March 2025** — Open Review v1 launches at `open-review.pyragogy.org`. A four-agent n8n + OpenRouter pipeline applies "epistemic pressure" to Peeragogy Handbook chapters. Researcher, Resonance Amplifier, Distortion/Perturbator, Complicit Editor. Public announcement to the Peeragogy Google Group. Architectural lessons learned: parallel agent execution rate-limited OpenRouter; sequential architecture (v12) became the fix. BYOK (bring-your-own-key) model proves to be a friction killer.

**March–April 2026** — **Obliqo** is built and launched: AI writing critique tool with the same four-agent method, applied to user-submitted text. Free 5/month + Pro €12 founder lock. Auth via Appwrite OAuth. The "complicit colleague, not professor" rewrite of agent prompts (CRT×4 method) is established as the brand voice.

**April 2026** — Open Review v1 goes offline. Webhook routing breaks during n8n migration. A decision is taken to relaunch *with fireworks* rather than patch. Multiple architectural directions are explored over a single planning session: Open Review as third surface of Obliqo, polyphonic synthesis from user revisions, Community Edition B2B pricing, commons economy with public budget pool.

**April 30, 2026** — After three rounds of critique from Gemini (acting as Perturbator), the founder pivots to a radically simpler plan: **Open Review as a static editorial artifact**, not a product. 50 HTML pages, generated once, deployed on Netlify. Annual ritual regeneration on January 1st. The Chrome extension (independent track) and Obliqo SaaS (unchanged) become the live revenue surfaces.

**This is what this repository is.**

## The principles that shaped the design

### From Peeragogy (12 years of practice)
- Polycentric leadership: no single owner, many contributors
- Public domain by default: CC-Zero waiver minimizes friction for adoption
- Patternization: extract patterns from practice, share them, iterate
- "Working in public" — show the process, not just the product

### From Pyragogy (the founder's synthesis)
- AI as cognitive peer, not tool
- Cognitive Intraspecific Selection: competition between ideas, not between people
- Friction over flattery: AI should sharpen thinking, not flatter the user
- Radical transparency including failures

### From the planning journey (April 2026)
- "Few but good" — pochi ma buoni — over scale
- Sustainable solo-founder operations over ambitious architecture
- Permanent artifact over moving target
- Lighthouse over engine: Open Review points to Obliqo, doesn't replace it

## Sibling projects

This repository sits in the broader Pyragogy ecosystem:

- **obliqo.pyragogy.org** — the SaaS product (live as of April 2026)
- **pyragogy.org** — the manifesto landing page and brand entry point
- **wiki.pyragogy.org** — the living wiki (collaborative knowledge base)
- **forum.pyragogy.org** — NodeBB community forum (4+1 architecture, 20 categories)
- **blog.pyragogy.org** — long-form writing
- **docs.pyragogy.org** — Astro Starlight documentation
- **plausible.pyragogy.org** — self-hosted analytics
- **n8n.pyragogy.org** — workflow automation
- **appwrite.pyragogy.org** — auth and database backend
- **`pyragogy/legacy-peeragogy-handbook`** (GitHub) — the CC-Zero fork of the original 2012 handbook, the canonical content source for this project

Most of these run on a Contabo VPS via Coolify + Docker behind Cloudflare. **This repository deliberately deploys on Netlify** to avoid loading the VPS further.

## The annual ritual

**January 1, 2026** — Open Review 2026 (this edition)
**January 1, 2027** — Open Review 2027 (next edition, with updated Obliqo engine)
**January 1, 2028** — Open Review 2028
**...**

The ritual is the heartbeat. As Obliqo evolves (new models, evolved prompts, deeper agents), the static artifact gets refreshed. Each edition becomes citable, datable, archivable. The "diff" between editions tells the story of how AI critique evolves over time — itself a research artifact.

Each annual edition introduces visible evolution. The 2026 → 2027 diff includes: numerical scoring (was: enum-only), inline highlights (was: panel-only), expanded chunk handling (was: 12k char truncate). The diff itself becomes a research artifact.
