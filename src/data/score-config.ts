/**
 * score-config.ts — port of Obliqo's SCORE_CONFIG with R20 violet
 * substitution for the "important" tier (no amber leak), plus
 * `solid` defensively unsupported (workflow v2.2 only emits the
 * three-value enum below — see DECISIONS.md D8).
 */

export type RevisionScore = 'urgent' | 'important' | 'nice_to_have';

export interface ScoreConfig {
  label: string;
  description: string;
  /** CSS color for label text (uses tokens.css custom property names). */
  colorVar: string;
  /** CSS color for the surrounding card background. */
  bgVar: string;
  /** Glyph displayed alongside the label. */
  glyph: string;
}

export const SCORE_CONFIG: Record<RevisionScore, ScoreConfig> = {
  urgent: {
    label: 'High risk before sharing',
    description: 'A serious weakness could mislead or undermine this if published as-is.',
    colorVar: 'var(--score-urgent)',
    bgVar:    'var(--score-urgent-bg)',
    glyph:    '🔴',
  },
  important: {
    label: 'Worth another pass',
    description: 'At least one meaningful weakness worth addressing before sharing.',
    colorVar: 'var(--score-important)',
    bgVar:    'var(--score-important-bg)',
    glyph:    '🟡',
  },
  nice_to_have: {
    label: 'Ready with minor edits',
    description: 'Publishable now. A few refinements could help, nothing material weakens it.',
    colorVar: 'var(--score-nice)',
    bgVar:    'var(--score-nice-bg)',
    glyph:    '🟢',
  },
};

/** Agent voice palette — matches tokens.css agent-* custom properties. */
export const AGENTS = [
  { key: 'researcher', label: 'Critical Researcher', role: 'Evidence & gaps',          colorVar: 'var(--agent-researcher)' },
  { key: 'resonance',  label: 'Resonance Pattern',   role: 'What works and why',        colorVar: 'var(--agent-resonance)' },
  { key: 'distortion', label: 'Distortion Pattern',  role: 'First principles attack',   colorVar: 'var(--agent-distortion)' },
  { key: 'editor',     label: 'Editorial Brief',     role: 'What the editor would cut', colorVar: 'var(--agent-editor)' },
] as const;

export type AgentKey = (typeof AGENTS)[number]['key'];
