/**
 * site.ts — Open Review constants surfaced to layouts/components.
 *
 * Centralised so the annual ritual (next refresh: January 1, 2027) only
 * has to update one file. `engineVersion` reflects the n8n workflow
 * that generated the current edition; bumping it for 2027 is part of
 * the diff that becomes the research artifact (CONTEXT.md "annual
 * ritual" + DECISIONS.md D2).
 */

export const SITE = {
  title:    'Open Review 2026',
  tagline:  'The Peeragogy Handbook, reviewed by four AI agents.',
  baseUrl:  'https://open-review.pyragogy.org',

  edition:       '2026',
  generatedDate: '2026-04-30',  // updated by the generation batch script
  nextRefresh:   '2027-01-01',
  engineVersion: 'v2.2',

  obliqo: {
    url:   'https://obliqo.pyragogy.org',
    cta:   'Want this critique on your own writing? →',
    label: 'Powered by Obliqo',
  },

  attribution: {
    sourceLabel: 'The Peeragogy Handbook',
    sourceAuthors: 'Howard Rheingold et al.',
    sourceYear: 2012,
    sourceLicense: 'CC0-1.0 (Public Domain)',
    sourceRepo: 'https://github.com/pyragogy/legacy-peeragogy-handbook',
    sourceHome: 'https://peeragogy.org',
  },

  giscus: {
    // Placeholder — actual repo + category resolved at Step 6 (OQ7).
    repo:       'pyragogy/open-review',
    repoId:     '',  // populated after Discussions are enabled
    category:   'Chapter Reviews',
    categoryId: '', // populated after Discussions are enabled
    mapping:    'pathname',
    theme:      'dark',
  },
} as const;

export type SiteConfig = typeof SITE;
