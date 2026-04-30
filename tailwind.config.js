/**
 * Open Review 2026 — Tailwind config
 *
 * Ported from Obliqo (sibling project, same brand family) but with
 * R20-driven divergences:
 *
 *   - amber #f59e0b stays in the palette ONLY for the explicit
 *     "Powered by Obliqo" CTA in the chapter footer. Every other
 *     accent uses the violet ramp.
 *
 *   - Editorial Brief agent gets violet #a78bfa (instead of Obliqo's
 *     amber). The four-voice palette stays semantically distinct:
 *     researcher indigo / resonance emerald / distortion rose /
 *     editor violet.
 *
 *   - Font stack collapses to Charter (true italic, open) for body
 *     and headings, JetBrains Mono for UI/metadata. Hoefler Text
 *     was dropped in D7 + R20.
 *
 *   - Background ramps inherit the maintenance page ink-violet
 *     (--ink, --ink-soft) rather than Obliqo's pure neutral dark.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,svelte,ts,md}'],
  theme: {
    extend: {
      colors: {
        // Background ramp (ink-violet, port of maintenance page :root)
        ink:        '#0d0a18',
        'ink-soft': '#14102a',
        paper:      '#ece6f5',
        'paper-mute': '#b6acc9',
        'paper-fade': '#6e6587',

        // Brand violets
        violet: {
          DEFAULT: '#a78bfa',
          deep:    '#6d28d9',
          pale:    '#d8b4fe',
        },

        // Agent voice palette (semantic, port from Obliqo)
        agent: {
          researcher: '#6366f1', // indigo
          resonance:  '#10b981', // emerald
          distortion: '#f43f5e', // rose
          editor:     '#a78bfa', // violet (replaces Obliqo amber)
        },

        // Reserved exclusively for "Powered by Obliqo" CTA
        'obliqo-cta': '#f59e0b',
      },
      fontFamily: {
        serif: ['Charter', '"Bitstream Charter"', '"Sitka Text"', 'Cambria', '"Iowan Old Style"', '"Palatino Linotype"', 'Palatino', 'Georgia', 'serif'],
        mono:  ['"JetBrains Mono"', 'ui-monospace', '"SFMono-Regular"', 'Menlo', 'Consolas', '"Liberation Mono"', 'monospace'],
      },
      fontSize: {
        // Editorial scale — slightly larger than UI default,
        // calibrated for long-form reading.
        body:    ['1.0625rem', { lineHeight: '1.6' }],   // 17px
        meta:    ['0.78rem',   { lineHeight: '1.5' }],
        'meta-xs': ['0.62rem', { lineHeight: '1.4', letterSpacing: '0.14em' }],
      },
      maxWidth: {
        prose: '38rem',
      },
      animation: {
        'drift-a': 'drift-a 38s ease-in-out infinite alternate',
        'drift-b': 'drift-b 52s ease-in-out infinite alternate-reverse',
      },
      keyframes: {
        'drift-a': {
          '0%':   { transform: 'translate3d(0,0,0) scale(1)' },
          '100%': { transform: 'translate3d(-4vw, 3vh, 0) scale(1.08)' },
        },
        'drift-b': {
          '0%':   { transform: 'translate3d(0,0,0) scale(1)' },
          '100%': { transform: 'translate3d(3vw, -2vh, 0) scale(1.06)' },
        },
      },
    },
  },
  plugins: [],
};
