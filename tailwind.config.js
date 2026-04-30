/**
 * Open Review 2026 — Tailwind config
 *
 * Mirrors src/styles/tokens.css. Eight-stop violet ramp, paper tones,
 * mono register, agent voices, the single Obliqo-CTA amber, and the
 * D9 hybrid font stack (Fraunces / Inter / JetBrains Mono).
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,svelte,ts,md}'],
  theme: {
    extend: {
      colors: {
        ink:        '#0d0a18',
        'ink-soft': '#14102a',
        paper:      '#ece6f5',
        'paper-mute': '#b6acc9',
        'paper-fade': '#6e6587',

        violet: {
          1: '#ede9fe',
          2: '#c4b5fd',
          3: '#a78bfa',
          4: '#8b5cf6',
          5: '#7c3aed',
          6: '#6d28d9',
          7: '#4c1d95',
          ink: '#14102a',
        },

        agent: {
          researcher: '#6366f1',
          resonance:  '#10b981',
          distortion: '#f43f5e',
          editor:     '#a78bfa',
        },

        // Reserved exclusively for "Powered by Obliqo" CTA (R20).
        obliqo: '#f59e0b',
      },
      fontFamily: {
        display: ['Fraunces', '"Iowan Old Style"', '"Palatino Linotype"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', '"SFMono-Regular"', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        body:      ['1.0625rem', { lineHeight: '1.6' }],   // 17px
        meta:      ['0.78rem',   { lineHeight: '1.5' }],
        'meta-xs': ['0.62rem',   { lineHeight: '1.4', letterSpacing: '0.14em' }],
      },
      maxWidth: {
        prose: '38rem',
      },
    },
  },
  plugins: [],
};
