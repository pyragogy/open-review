/**
 * catalog.ts — 50 canonical Peeragogy Handbook chapters across 10
 * categories, ported from site/open-review.pyragogy.org/config.js
 * with one resolution applied:
 *
 *   MIRROR is now anchored to `pyragogy/legacy-peeragogy-handbook`
 *   (R6 — see DECISIONS.md D3). Both forks resolve, but `legacy-`
 *   makes the lineage explicit and is the long-term canonical mirror.
 *
 * The `id` of each chapter is the slug used in URLs
 * (`/handbook/<category>/<id>/`) and as the filename for review JSON
 * (`reviews/2026/<id>.json` and `<id>-stress.json`).
 *
 * The `filename` field captures the upstream `.md` name including the
 * `foreward` typo, which we deliberately preserve to keep URL
 * stability with the source — the fix belongs in the fork, not in
 * our generator (R6).
 */

export const MIRROR =
  'https://raw.githubusercontent.com/pyragogy/legacy-peeragogy-handbook/master/en-md';

export interface Chapter {
  /** URL slug (kebab-case, also the file basename for review JSON). */
  id: string;
  /** Human-readable title shown in nav and headings. */
  title: string;
  /** Filename in en-md/ on the fork (preserves upstream typos). */
  filename: string;
  /** Single emoji used in the catalog grid + sidebar. */
  icon: string;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
  description: string;
  chapters: Chapter[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'intro',
    label: 'Intro',
    emoji: '✨',
    description: 'Entry points: how the Handbook frames itself.',
    chapters: [
      { id: 'foreword',     title: 'Foreword',     filename: 'foreward.md',      icon: '✨' },
      { id: 'introduction', title: 'Introduction', filename: 'introduction.md', icon: '📖' },
      { id: 'howto',        title: 'How to Use',   filename: 'howto.md',        icon: '🗺️' },
    ],
  },
  {
    id: 'peerlearn',
    label: 'Peer Learning',
    emoji: '🌱',
    description: 'What peer learning actually means in practice.',
    chapters: [
      { id: 'peer-learning',    title: 'Peer Learning',            filename: 'peer-learning.md',    icon: '🌱' },
      { id: 'more_fun',         title: 'Skateboarding or Physics?', filename: 'more_fun.md',         icon: '🛹' },
      { id: 'help_needed',      title: 'What Help Do You Need?',   filename: 'help_needed.md',      icon: '🤝' },
      { id: 'how_to_structure', title: 'How to Structure Things',  filename: 'how_to_structure.md', icon: '🏗️' },
      { id: 'work_together',    title: 'Can We Work Together?',    filename: 'work_together.md',    icon: '👥' },
      { id: 'we_won',           title: 'How Do We Know We Won?',   filename: 'we_won.md',           icon: '🏆' },
    ],
  },
  {
    id: 'motivation',
    label: 'Motivation',
    emoji: '🔥',
    description: 'Why people show up and keep showing up.',
    chapters: [
      { id: 'motivation', title: 'Motivation',         filename: 'motivation.md', icon: '🔥' },
      { id: 'sphinx',     title: 'Case Study: 5PH1NX', filename: 'sphinx.md',     icon: '🦁' },
    ],
  },
  {
    id: 'patterns',
    label: 'Patterns',
    emoji: '🔷',
    description: 'Patterns that hold a peer-learning group together.',
    chapters: [
      { id: 'patterns',          title: 'Patterns',          filename: 'patterns.md',          icon: '🔷' },
      { id: 'wrapper',           title: 'Wrapper',           filename: 'wrapper.md',           icon: '🎁' },
      { id: 'roadmap',           title: 'Roadmap',           filename: 'roadmap.md',           icon: '🗺️' },
      { id: 'newcomer',          title: 'Newcomer',          filename: 'newcomer.md',          icon: '👋' },
      { id: 'heartbeat',         title: 'Heartbeat',         filename: 'heartbeat.md',         icon: '💓' },
      { id: 'roles',             title: 'Roles',             filename: 'roles.md',             icon: '🎭' },
      { id: 'moderation',        title: 'Moderation',        filename: 'moderation.md',        icon: '⚖️' },
      { id: 'polling_for_ideas', title: 'Polling for Ideas', filename: 'polling_for_ideas.md', icon: '💡' },
      { id: 'specific_project',  title: 'Specific Project',  filename: 'specific_project.md',  icon: '🎯' },
      { id: 'carrying_capacity', title: 'Carrying Capacity', filename: 'carrying_capacity.md', icon: '⚡' },
      { id: 'pattern_story',     title: 'A Pattern Story',   filename: 'pattern_story.md',     icon: '📖' },
    ],
  },
  {
    id: 'antipatterns',
    label: 'Antipatterns',
    emoji: '⚠️',
    description: 'How peer learning fails, and why.',
    chapters: [
      { id: 'isolation',             title: 'Isolation',             filename: 'isolation.md',             icon: '🏝️' },
      { id: 'magical_thinking',      title: 'Magical Thinking',      filename: 'magical_thinking.md',      icon: '🪄' },
      { id: 'messy_with_lurkers',    title: 'Messy with Lurkers',    filename: 'messy_with_lurkers.md',    icon: '👻' },
      { id: 'misunderstanding_power',title: 'Misunderstanding Power',filename: 'misunderstanding_power.md',icon: '👁️' },
      { id: 'navel_gazing',          title: 'Navel Gazing',          filename: 'navel_gazing.md',          icon: '🌀' },
      { id: 'stasis',                title: 'Stasis',                filename: 'stasis.md',                icon: '🧊' },
      { id: 'stuck',                 title: 'Stuck at Weak Ties',    filename: 'stuck.md',                 icon: '🕸️' },
    ],
  },
  {
    id: 'convening',
    label: 'Convening',
    emoji: '🏛️',
    description: 'Bringing people together — and keeping them together.',
    chapters: [
      { id: 'convening',      title: 'Convening a Group', filename: 'convening.md',      icon: '🏛️' },
      { id: 'play',           title: 'Play and Learning', filename: 'play.md',           icon: '🎮' },
      { id: 'k12',            title: 'K12 Peeragogy',     filename: 'k12.md',            icon: '🏫' },
      { id: 'sole',           title: 'SOLE',              filename: 'sole.md',           icon: '🌐' },
      { id: 'new-beginnings', title: 'New Beginnings',    filename: 'new-beginnings.md', icon: '🌅' },
    ],
  },
  {
    id: 'organizing',
    label: 'Organizing',
    emoji: '📋',
    description: 'Structures that help groups think together.',
    chapters: [
      { id: 'organizing',       title: 'Organizing',                 filename: 'organizing.md',       icon: '📋' },
      { id: 'structure',        title: 'Adding Structure',           filename: 'structure.md',        icon: '🧱' },
      { id: 'student_syllabus', title: 'Student Syllabus',           filename: 'student_syllabus.md', icon: '📝' },
      { id: 'connectivism',     title: 'Connectivism & MOOCs',       filename: 'connectivism.md',     icon: '🕸️' },
      { id: 'collab-ex',        title: 'Collaborative Explorations', filename: 'collab-ex.md',        icon: '🔭' },
    ],
  },
  {
    id: 'cooperation',
    label: 'Cooperation',
    emoji: '🎼',
    description: 'Working together as a discipline.',
    chapters: [
      { id: 'cofac',          title: 'Co-facilitation',        filename: 'cofac.md',          icon: '🎼' },
      { id: 'workscape',      title: 'Workscape',              filename: 'workscape.md',      icon: '🏢' },
      { id: 'participation',  title: 'Managing Participation', filename: 'participation.md',  icon: '🙋' },
      { id: 'coworking',      title: 'Co-working',             filename: 'coworking.md',      icon: '💻' },
      { id: 'coworking-story',title: 'Co-working Story',       filename: 'coworking-story.md',icon: '📜' },
    ],
  },
  {
    id: 'assessment',
    label: 'Assessment',
    emoji: '📊',
    description: 'How a peer-learning group knows it is working.',
    chapters: [
      { id: 'assessment',  title: 'Assessment',           filename: 'assessment.md',  icon: '📊' },
      { id: 'researching', title: 'Researching Peeragogy',filename: 'researching.md', icon: '🔬' },
    ],
  },
  {
    id: 'technologies',
    label: 'Technologies',
    emoji: '⚙️',
    description: 'Tools that shape how peers meet and remember.',
    chapters: [
      { id: 'technologies', title: 'Technologies',       filename: 'technologies.md', icon: '⚙️' },
      { id: 'forums',       title: 'Forums',             filename: 'forums.md',       icon: '💬' },
      { id: 'wiki',         title: 'Wiki',               filename: 'wiki.md',         icon: '📚' },
      { id: 'realtime',     title: 'Real-time Meetings', filename: 'realtime.md',     icon: '📡' },
    ],
  },
];

/** Flat list of all 50 chapters in catalog order. */
export const CHAPTERS: Chapter[] = CATEGORIES.flatMap((cat) => cat.chapters);

/** Total chapter count — sanity check (should always be 50). */
export const CHAPTER_COUNT = CHAPTERS.length;

/** Build the raw GitHub URL for a chapter's source `.md`. */
export function chapterSourceUrl(chapter: Chapter): string {
  return `${MIRROR}/${chapter.filename}`;
}

/** Build the canonical URL path for a chapter page. */
export function chapterUrl(category: Category, chapter: Chapter): string {
  return `/handbook/${category.id}/${chapter.id}/`;
}

/** Find category + chapter by chapter id. Throws if not found. */
export function lookupChapter(id: string): { category: Category; chapter: Chapter } {
  for (const category of CATEGORIES) {
    const chapter = category.chapters.find((c) => c.id === id);
    if (chapter) return { category, chapter };
  }
  throw new Error(`Chapter not found in catalog: ${id}`);
}
