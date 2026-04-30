/* ═══════════════════════════════════════════
   PYRAGOGY v14 — CONFIG
   Payload identico alla v10 originale.
   Non toccare WEBHOOK, payload keys, input IDs.
═══════════════════════════════════════════ */

const WEBHOOK = 'https://n8n.pyragogy.org/webhook/peeragogy-review1';

const MIRROR = 'https://raw.githubusercontent.com/pyragogy/peeragogy-handbook-md/master/en-md';

// ── CHAPTERS raggruppati per categoria ──
// Ogni categoria ha: id, label, colorClass (cat-*), emoji, chapters[]
const CATEGORIES = [
  {
    id: 'intro', label: 'Intro', emoji: '✨', colorClass: 'cat-intro',
    chapters: [
      { id:'foreword',     title:'Foreword',     url:`${MIRROR}/foreward.md`,     icon:'✨' },
      { id:'introduction', title:'Introduction',  url:`${MIRROR}/introduction.md`, icon:'📖' },
      { id:'howto',        title:'How to Use',    url:`${MIRROR}/howto.md`,        icon:'🗺️' },
    ]
  },
  {
    id: 'peerlearn', label: 'Peer Learning', emoji: '🌱', colorClass: 'cat-peerlearn',
    chapters: [
      { id:'peer-learning',    title:'Peer Learning',           url:`${MIRROR}/peer-learning.md`,    icon:'🌱' },
      { id:'more_fun',         title:'Skateboarding or Physics?',url:`${MIRROR}/more_fun.md`,         icon:'🛹' },
      { id:'help_needed',      title:'What Help Do You Need?',  url:`${MIRROR}/help_needed.md`,      icon:'🤝' },
      { id:'how_to_structure', title:'How to Structure Things', url:`${MIRROR}/how_to_structure.md`, icon:'🏗️' },
      { id:'work_together',    title:'Can We Work Together?',   url:`${MIRROR}/work_together.md`,    icon:'👥' },
      { id:'we_won',           title:'How Do We Know We Won?',  url:`${MIRROR}/we_won.md`,           icon:'🏆' },
    ]
  },
  {
    id: 'motivation', label: 'Motivation', emoji: '🔥', colorClass: 'cat-motivation',
    chapters: [
      { id:'motivation', title:'Motivation',       url:`${MIRROR}/motivation.md`, icon:'🔥' },
      { id:'sphinx',     title:'Case Study: 5PH1NX', url:`${MIRROR}/sphinx.md`,  icon:'🦁' },
    ]
  },
  {
    id: 'patterns', label: 'Patterns', emoji: '🔷', colorClass: 'cat-patterns',
    chapters: [
      { id:'patterns',          title:'Patterns',          url:`${MIRROR}/patterns.md`,          icon:'🔷' },
      { id:'wrapper',           title:'Wrapper',           url:`${MIRROR}/wrapper.md`,           icon:'🎁' },
      { id:'roadmap',           title:'Roadmap',           url:`${MIRROR}/roadmap.md`,           icon:'🗺️' },
      { id:'newcomer',          title:'Newcomer',          url:`${MIRROR}/newcomer.md`,          icon:'👋' },
      { id:'heartbeat',         title:'Heartbeat',         url:`${MIRROR}/heartbeat.md`,         icon:'💓' },
      { id:'roles',             title:'Roles',             url:`${MIRROR}/roles.md`,             icon:'🎭' },
      { id:'moderation',        title:'Moderation',        url:`${MIRROR}/moderation.md`,        icon:'⚖️' },
      { id:'polling_for_ideas', title:'Polling for Ideas', url:`${MIRROR}/polling_for_ideas.md`, icon:'💡' },
      { id:'specific_project',  title:'Specific Project',  url:`${MIRROR}/specific_project.md`,  icon:'🎯' },
      { id:'carrying_capacity', title:'Carrying Capacity', url:`${MIRROR}/carrying_capacity.md`, icon:'⚡' },
      { id:'pattern_story',     title:'A Pattern Story',   url:`${MIRROR}/pattern_story.md`,     icon:'📖' },
    ]
  },
  {
    id: 'antipatterns', label: 'Antipatterns', emoji: '⚠️', colorClass: 'cat-anti',
    chapters: [
      { id:'isolation',           title:'Isolation',           url:`${MIRROR}/isolation.md`,           icon:'🏝️' },
      { id:'magical_thinking',    title:'Magical Thinking',    url:`${MIRROR}/magical_thinking.md`,    icon:'🪄' },
      { id:'messy_with_lurkers',  title:'Messy with Lurkers',  url:`${MIRROR}/messy_with_lurkers.md`,  icon:'👻' },
      { id:'misunderstanding_power', title:'Misunderstanding Power', url:`${MIRROR}/misunderstanding_power.md`, icon:'👁️' },
      { id:'navel_gazing',        title:'Navel Gazing',        url:`${MIRROR}/navel_gazing.md`,        icon:'🌀' },
      { id:'stasis',              title:'Stasis',              url:`${MIRROR}/stasis.md`,              icon:'🧊' },
      { id:'stuck',               title:'Stuck at Weak Ties',  url:`${MIRROR}/stuck.md`,               icon:'🕸️' },
    ]
  },
  {
    id: 'convening', label: 'Convening', emoji: '🏛️', colorClass: 'cat-convening',
    chapters: [
      { id:'convening',     title:'Convening a Group', url:`${MIRROR}/convening.md`,     icon:'🏛️' },
      { id:'play',          title:'Play and Learning', url:`${MIRROR}/play.md`,          icon:'🎮' },
      { id:'k12',           title:'K12 Peeragogy',     url:`${MIRROR}/k12.md`,           icon:'🏫' },
      { id:'sole',          title:'SOLE',              url:`${MIRROR}/sole.md`,          icon:'🌐' },
      { id:'new-beginnings',title:'New Beginnings',    url:`${MIRROR}/new-beginnings.md`,icon:'🌅' },
    ]
  },
  {
    id: 'organizing', label: 'Organizing', emoji: '📋', colorClass: 'cat-organizing',
    chapters: [
      { id:'organizing',       title:'Organizing',                url:`${MIRROR}/organizing.md`,       icon:'📋' },
      { id:'structure',        title:'Adding Structure',          url:`${MIRROR}/structure.md`,        icon:'🧱' },
      { id:'student_syllabus', title:'Student Syllabus',          url:`${MIRROR}/student_syllabus.md`, icon:'📝' },
      { id:'connectivism',     title:'Connectivism & MOOCs',      url:`${MIRROR}/connectivism.md`,     icon:'🕸️' },
      { id:'collab-ex',        title:'Collaborative Explorations',url:`${MIRROR}/collab-ex.md`,       icon:'🔭' },
    ]
  },
  {
    id: 'cooperation', label: 'Cooperation', emoji: '🎼', colorClass: 'cat-coop',
    chapters: [
      { id:'cofac',         title:'Co-facilitation',     url:`${MIRROR}/cofac.md`,         icon:'🎼' },
      { id:'workscape',     title:'Workscape',           url:`${MIRROR}/workscape.md`,     icon:'🏢' },
      { id:'participation', title:'Managing Participation',url:`${MIRROR}/participation.md`,icon:'🙋' },
      { id:'coworking',     title:'Co-working',          url:`${MIRROR}/coworking.md`,     icon:'💻' },
      { id:'coworking-story',title:'Co-working Story',   url:`${MIRROR}/coworking-story.md`,icon:'📜' },
    ]
  },
  {
    id: 'assessment', label: 'Assessment', emoji: '📊', colorClass: 'cat-assessment',
    chapters: [
      { id:'assessment',  title:'Assessment',           url:`${MIRROR}/assessment.md`,  icon:'📊' },
      { id:'researching', title:'Researching Peeragogy',url:`${MIRROR}/researching.md`, icon:'🔬' },
    ]
  },
  {
    id: 'technologies', label: 'Technologies', emoji: '⚙️', colorClass: 'cat-tech',
    chapters: [
      { id:'technologies', title:'Technologies',       url:`${MIRROR}/technologies.md`, icon:'⚙️' },
      { id:'forums',       title:'Forums',             url:`${MIRROR}/forums.md`,       icon:'💬' },
      { id:'wiki',         title:'Wiki',               url:`${MIRROR}/wiki.md`,         icon:'📚' },
      { id:'realtime',     title:'Real-time Meetings', url:`${MIRROR}/realtime.md`,     icon:'📡' },
    ]
  },
];

// Flat array for backward compatibility with orchestra.js
const CHAPTERS = CATEGORIES.flatMap(cat => cat.chapters);
