# DECISIONS.md — Open Review 2026

> Architectural decisions taken during the April 2026 planning sessions, locked before execution.
> The reasoning is preserved here so future-us — and any contributor opening the repo cold — can reconstruct *why*, not only *what*.
> See `CONTEXT.md` for the planning journey, `RULES.md` for the constraints these decisions live under.

---

## D1 — Static editorial artifact, not a SaaS product

**Decision:** Open Review 2026 ships as 50 prerendered HTML pages on Netlify. No login, no quota, no runtime API calls, no Pyragogy-controlled backend touched by visitor browsers.

**Why:** The first version (March 2025) tried to be a live BYOK lab. It taught us two lessons. (1) Asking a visitor for an OpenRouter key is a friction killer — the conversion to "actually runs the agents" was an order of magnitude lower than the conversion to "reads the homepage." (2) Solo-founder operations cannot sustainably run a free public AI endpoint without either a budget pool we don't have or a quota system that complicates the experience for the audience we actually want (peeragogues, not casual SaaS users).

The static artifact inverts the model: the founder pays for the generation once, the artifact is permanent and citable, the audience reads without friction. The "live" surface for AI critique remains Obliqo's main app and the Chrome extension — both of which can carry quota and billing because they offer per-user value.

**Consequences:** Locked into one-shot generation per edition (R3). No accidental drift into "let users tweak intensity" or "let users submit chapters" — that's Phase II in a separate codebase.

---

## D2 — Annual ritual on January 1st

**Decision:** Open Review is regenerated once per year, on January 1st, using whatever Obliqo engine version is current at that point. Editions are tagged (`edition/2026.0`, `edition/2027.0`, …) and live in branches.

**Why:** Three forces converge here.

1. **Staleness mitigation.** A static AI artifact ages badly if it never refreshes — the field moves fast, the Handbook chapters keep evolving, the prompts get sharper. An annual cadence gives the artifact a heartbeat without putting daily ops cost on a solo founder.
2. **Cultural fit.** January 1st releases are a tradition in free software (Lisp, GNU, Debian). The audience — peeragogues, technopoets, promptweavers — recognizes the gesture without anyone having to explain it.
3. **Free recurring marketing.** Each edition is a blog post, a Peeragogy Google Group mailing, a LinkedIn note, a "diff" between editions that itself becomes interesting research material. Recurring without being a treadmill.

**Consequences:** The "engine version diff" between editions is itself an artifact (CONTEXT.md, "annual ritual" section). The 2026 → 2027 transition is the first chance to upgrade visible features — see D8 below.

---

## D3 — Source of truth: `pyragogy/legacy-peeragogy-handbook` (CC-Zero)

**Decision:** Chapter content is fetched at build time from `https://github.com/pyragogy/legacy-peeragogy-handbook/tree/master/en-md/` (raw `.md` files). The fork is the canonical mirror in the Pyragogy org of the original 2012 Handbook.

**Why:** The original Handbook is CC-Zero (Public Domain). Legally we owe nothing. The fork pins a version we control: if the upstream peeragogy.org HTML breaks, our build doesn't. If a typo (`foreward.md` instead of `foreword.md`) is in upstream, we keep the typo to preserve the URL contract — the fix is in the fork, not in our generator.

`config.js` in the legacy mirror site points to a similarly-named repo (`pyragogy/peeragogy-handbook-md`); both URLs resolve. R6 picks the one with the more honest name — "legacy" makes the lineage explicit.

**Consequences:** Editorial attribution practice (R7, R8) — Howard Rheingold and the original contributors are credited; nothing is invented; the fork is the only place we anchor quotes against.

---

## D4 — Catalog of 50 chapters across 10 categories

**Decision:** The 2026 edition covers the same 50 chapters and 10 categories that the v1 site curated (see the canonical list in `src/data/catalog.ts`). The fork holds ~56 actual chapter files; six (README, ALL, license, meet-the-team, get-involved, help_needed-as-meta) are excluded as meta-files.

**Why:** The selection has already been editorially considered once. Re-curating now would burn time without adding clarity. The six "extras" remain available for Phase II expansion.

**Consequences:** Generation budget is bounded (50 chapters × ≤2 intensity variants × 4 OpenRouter calls ≈ 400 calls per edition).

---

## D5 — Two intensity variants per chapter (3 default + 5 stress)

**Decision:** Each chapter is generated twice: once at Perturbator intensity 3 (the default editorial reading) and once at intensity 5 (the stress test). Both outputs are saved; the static page presents intensity 3 by default, with a toggle to intensity 5.

**Why:** Intensity 3 gives the chapter the editorial pass it deserves. Intensity 5 gives the reader the lens they came for if they want to see the Distortion Pattern at full force. Two URLs would split SEO; two outputs in one URL preserves it. Costs roughly double per chapter, still tiny at one edition per year.

**Consequences:** Generation script must be idempotent and resume-safe across both variants — a half-finished batch is the most likely real failure mode.

---

## D6 — Stack: Astro 5 + Svelte 5 islands (static)

**Decision:** Build with Astro for static generation; embed Svelte components as islands when interactivity is needed (sidebar collapse, voice-card expand, Giscus mount).

**Why:** The visual spec is a three-pane review viewer that shares DNA with Obliqo's `AnnotatedDocumentView` (SvelteKit-based). Astro lets us reuse those Svelte components directly as islands, with hydration only where necessary, while the rest of the page renders to plain HTML. Eleventy was considered and rejected — it's lighter, but has no path to reusing Svelte. SvelteKit was considered and rejected — overkill for an artifact with no server.

The output remains compatible with R12 (plain web first) and R16 (Lighthouse perf budget): JS only ships for the few interactive bits, the rest of the page is HTML the browser can render with JavaScript disabled.

**Consequences:** Tailwind 3 carries over from Obliqo's config; the agent-voice palette is preserved; the amber-to-violet swap (D7) is the only token rewrite needed.

---

## D7 — Visual identity: ink-violet permanent (Editorial Brief = violet, not amber)

**Decision:** Open Review keeps the ink-violet editorial broadside aesthetic from the maintenance page (R20). Where Obliqo uses amber `#f59e0b` for the Editorial Brief agent voice, Open Review substitutes violet `#a78bfa` — coherent with the brand family, distinct from Obliqo's amber, which stays reserved for the "Powered by Obliqo" CTA only.

**Why:** R5 — Open Review and Obliqo are sibling projects, not nested products. They share lineage and should share visual DNA, but they are not the same thing and should not look like the same thing. Amber as a primary signal would muddle that. Violet for the Editorial Brief preserves the four-voice semantic palette (indigo/emerald/rose/violet) without bleeding Obliqo's brand.

**Consequences:** Hoefler Text (originally named in earlier R20 drafts) is dropped — it's proprietary, not legally self-hostable, and Charter (which has a real italic) carries the editorial register on its own.

---

## D8 — Engine v3 features deferred to edition 2027+

**Decision:** Two features visible in the visual mockup — a numerical revision score (the "64" gauge) and inline text highlights anchored to specific quotes in the chapter — are explicitly **not** shipped in 2026. Both require workflow v3 (annotated mode with paragraph-segmented input and offset-bearing annotations). 2026 ships with enum-only scores and panel-only voices.

**Why:** Inventing a number from an enum (`urgent`/`important`/`nice_to_have`) would violate R11 (no invented scores). Anchoring quotes via fuzzy post-hoc matching would risk attaching a highlight to text the agent never actually said — a violation of R8 (never invent quotes). The honest move is to ship what the v2.2 engine produces, label it that way, and use the 2027 edition to demonstrate visible evolution (see CONTEXT.md, "annual ritual").

**Consequences:** The 2026 → 2027 release becomes its own story: a real engine upgrade with visible effects. The diff is the deliverable.

---

---

## D9 — Typography: Hybrid Scenario C (Fraunces + Inter + JetBrains Mono)
*Superseded by D10. Kept here for historical context.*

**Decision:** Open Review 2026 ships a three-family hybrid typography system. Fraunces (variable: `opsz`, `wght`, `SOFT`) carries the display register — drop caps, editorial titles, italic emphasis. Inter (variable: `wght`) carries body and UI text. JetBrains Mono carries metadata, badges, inline numerals.

**Why:** Earlier drafts of R20 named Hoefler Text (proprietary, not self-hostable) and then Charter (open, but no contrast against Obliqo's Inter when chapter pages eventually compose four-voice cards from the Obliqo design system). Scenario C resolves the actual problem: the homepage needs an editorial broadside register *and* the chapter pages need to compose against Inter-based Obliqo components without the two registers fighting each other. Three families look like more cost than one, but Inter is already paid for by reuse from Obliqo, and Fraunces ships a single variable file that covers display + soft + sharp axes.

The drop-cap "F" on the homepage demonstrates the upper bound: `opsz 144, SOFT 0` at 4.6em pulls the maximum optical size and the sharpest contrast Fraunces can produce, which is exactly the broadside posture that distinguishes Open Review from Obliqo's product-app register.

**Consequences (initial, before D10 supersession):**
- R20 was rewritten to reflect the hybrid stack (Fraunces / Inter / JetBrains Mono); Hoefler Text and Charter references are removed from authoritative governance.
- Step 6 polish task added: self-host all three families as woff2 in `src/assets/fonts/` before the Step 7 deploy (R17 compliance). Step 1.5 iterates with Google Fonts CDN; the CSP in `netlify.toml` allows `fonts.googleapis.com` (style-src) and `fonts.gstatic.com` (font-src) accordingly.
- The catalog-strip and colophon italics use the `--fraunces-soft` variation (`opsz 96, SOFT 60`) — softer warmth, not the sharp display register.

---

## D10 — Display register: Cormorant Garamond replaces Fraunces

**Decision:** Cormorant Garamond (Christian Thalmann, SIL OFL 1.1) replaces Fraunces as the display family in the Hybrid Scenario C stack. Inter and JetBrains Mono are unchanged. The variable-axis variables (`--fraunces-display`, `--fraunces-soft`, `--fraunces-sharp`) are retired in favour of plain weight presets (`--display-hairline: 300`, `--display-regular: 400`, `--display-medium: 500`).

**Why:** The founder reviewed the Step 1.5 home and a curated list of editorial typefaces, then asked Claude to pick. The list (designworklife.com "Elegant fonts that exude sophistication & style") was useful for direction but proprietary across the board — none self-hostable for an OFL-spirit artifact. Cormorant Garamond is the closest open match to the *intent* the list represented (Didone-adjacent contrast, expressive italic, hairline weight that cuts a page like a Didot) while keeping the project's licensing posture honest.

A second motivation: Fraunces' warmer humanist character softened the broadside register more than the editorial direction wanted. The original R20 draft named Hoefler Text; Cormorant Garamond is the closest open-source cousin to that intent. The `opsz`/`SOFT` axes were elegant engineering, but they were solving a problem (display polish) that Cormorant solves by construction at weight 300.

**Consequences:**
- R20 rewritten to reflect Cormorant + Inter + JetBrains Mono.
- `tokens.css`, `typography.css`, `AppShell.astro` (Google Fonts link), `index.astro` (drop-cap weight 300, no `font-variation-settings`), `Colophon.astro` (Obliqo CTA), `Asterism.astro` (asterism weight) all updated.
- Step 6 self-host task is now: Cormorant Garamond ital+upright × {300,400,500,600} = 8 woff2 files (~120 KB subsetted Latin-Ext), plus Inter and JetBrains Mono as before.
- Drop-cap and asterism rendering depends on Cormorant's hairline 300 italic — verify this weight is loaded in the Google Fonts URL before any visual review.
- D9 stays in this file as historical context, marked superseded.

---

## Open questions (to resolve during execution)

The 12 OQs from the operational plan are tracked in the plan file (`brief-per-claude-floating-wombat.md`, section 8). Defaults are proposed for each; this DECISIONS.md will be updated as each is confirmed, deferred, or revised.
