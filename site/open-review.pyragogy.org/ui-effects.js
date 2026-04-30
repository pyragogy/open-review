/* ═══════════════════════════════════════════
   PYRAGOGY v14 — UI EFFECTS
   Category grid · Filter · Status pills · Email rot13
   Slider · Toast · Agents · Markdown · Voice tabs
═══════════════════════════════════════════ */

let selectedChapter = null;
let intensity = 3;

// ── BUILD CHAPTER GRID (flat — original style) ──
function buildChapterGrid() {
  const grid = document.getElementById('chapterGrid');
  CHAPTERS.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'ch-btn';
    btn.setAttribute('role', 'button');
    btn.id = 'ch-' + ch.id;
    btn.innerHTML =
      `<span class="ch-btn-icon">${ch.icon}</span>` +
      `<span class="ch-btn-title">${ch.title}</span>`;
    btn.onclick = () => selectChapter(ch, btn);
    grid.appendChild(btn);
  });
}

function selectChapter(ch, btn) {
  document.querySelectorAll('.ch-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedChapter = ch;
  const info = document.getElementById('selectedInfo');
  info.style.display = 'block';
  info.innerHTML = `✓ Selected: <strong>${ch.title}</strong> · <span style="font-size:.8em;color:var(--text2);">${ch.url}</span>`;
  checkReady();
}

function checkReady() {
  const ok = selectedChapter && document.getElementById('apiKey').value.trim();
  document.getElementById('rbtn').disabled = !ok;
}

// ── CHAPTER FILTER ──
function filterChapters(query) {
  const q = query.toLowerCase().trim();
  let visibleTotal = 0;

  CATEGORIES.forEach(cat => {
    const catSection = document.querySelector(`.chapter-category[data-cat-id="${cat.id}"]`);
    if (!catSection) return;
    const buttons = catSection.querySelectorAll('.ch-btn');
    let visibleInCat = 0;

    buttons.forEach(btn => {
      const matches = !q
        || btn.dataset.title.includes(q)
        || btn.dataset.cat.includes(q);
      btn.classList.toggle('hidden', !matches);
      if (matches) visibleInCat++;
    });

    // Hide entire category section if no matches
    catSection.style.display = visibleInCat === 0 ? 'none' : '';
    visibleTotal += visibleInCat;
  });

  // Show/hide no-results message
  let noRes = document.getElementById('noResults');
  if (visibleTotal === 0) {
    if (!noRes) {
      noRes = document.createElement('div');
      noRes.id = 'noResults';
      noRes.className = 'no-results';
      noRes.textContent = 'No chapters match your search.';
      document.getElementById('chapterGrid').appendChild(noRes);
    }
    noRes.style.display = '';
  } else if (noRes) {
    noRes.style.display = 'none';
  }

  updateChapterCount(visibleTotal);
}

function updateChapterCount(visible) {
  const total = CHAPTERS.length;
  const shown = (visible !== undefined) ? visible : total;
  const el = document.getElementById('chapterCount');
  if (el) el.textContent = shown === total ? `${total} chapters` : `${shown} / ${total}`;
}

// ── STATUS INDICATORS ──

// n8n health check — ping on page load
async function checkN8nStatus() {
  const pill = document.getElementById('n8nStatus');
  const text = document.getElementById('n8nText');

  pill.className = 'status-pill checking';
  text.textContent = 'n8n — checking…';

  try {
    const ctrl = new AbortController();
    const tid  = setTimeout(() => ctrl.abort(), 7000);
    await fetch(WEBHOOK, {
      method:  'POST',
      headers: {'Content-Type':'application/json'},
      body:    JSON.stringify({ _ping: true }),
      signal:  ctrl.signal
    });
    clearTimeout(tid);
    // Any response (even workflow error) = server alive
    pill.className = 'status-pill ok';
    text.textContent = 'n8n — online ✓';
  } catch(e) {
    pill.className = 'status-pill err';
    text.textContent = e.name === 'AbortError' ? 'n8n — timeout ✗' : 'n8n — unreachable ✗';
  }
  pill.style.opacity = '1';
}

// API key format validation — real-time, no network call
function updateKeyStatus() {
  const val  = document.getElementById('apiKey').value.trim();
  const pill = document.getElementById('keyStatus');
  const text = document.getElementById('keyText');

  if (!val) {
    pill.className = 'status-pill';
    pill.style.opacity = '.4';
    text.textContent = 'API Key — not set';
    return;
  }
  pill.style.opacity = '1';
  // OpenRouter keys: sk-or-v1-... or sk-or-...
  const valid = /^sk-or(-v\d+)?-[A-Za-z0-9_\-]{20,}$/.test(val);
  pill.className = valid ? 'status-pill ok' : 'status-pill err';
  text.textContent = valid ? 'API Key — valid format ✓' : 'API Key — invalid format ✗';
}

// ── PROTECTED EMAIL (rot13 — no Cloudflare dependency) ──
function rot13(str) {
  return str.replace(/[a-zA-Z]/g, c =>
    String.fromCharCode(
      c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
    )
  );
}

function initProtectedEmail() {
  const link = document.getElementById('contactEmail');
  if (!link) return;
  const encoded = link.dataset.rot13;

  // Reveal on hover / focus / first click, open on second click
  let revealed = false;

  const reveal = () => {
    if (revealed) return;
    revealed = true;
    const email = rot13(encoded);
    link.href = 'mailto:' + email;
    document.getElementById('emailDisplay').textContent = email;
  };

  link.addEventListener('mouseenter', reveal);
  link.addEventListener('focus',      reveal);
  link.addEventListener('click', e => {
    if (!revealed) { e.preventDefault(); reveal(); }
  });
}

// ── LIQUID SLIDER ──
function updateSlider(v) {
  intensity = parseInt(v);
  const slider = document.getElementById('intSlider');
  document.getElementById('sliderVal').textContent = v;
  slider.setAttribute('aria-valuenow', v);

  // Rimuovi tutte le classi di intensità
  slider.classList.remove('intensity-1', 'intensity-2', 'intensity-3', 'intensity-4', 'intensity-5');

  // Aggiungi la classe di intensità corretta
  slider.classList.add('intensity-' + v);
}

// ── PIPELINE + PROGRESS BAR ──
const PROGRESS_PCT = [0, 8, 28, 50, 68, 85, 100];
function setStage(n) {
  for (let i = 0; i <= 6; i++) {
    const el = document.getElementById('ps' + i);
    if (!el) continue;
    el.classList.remove('active','done');
    if      (i < n)  el.classList.add('done');
    else if (i === n) el.classList.add('active');
  }
  const bar = document.getElementById('progressBar');
  if (bar) bar.style.width = (PROGRESS_PCT[n] || 0) + '%';
}

// ── AGENT CARDS ──
const STAGE_TO_AGENT = { 2:'agent-1', 3:'agent-2', 4:'agent-3', 5:'agent-4' };
const STAGE_STATUS   = { 2:'WORKING', 3:'WORKING', 4:'WORKING', 5:'WRITING' };

function activateAgent(stageN) {
  document.querySelectorAll('.agent-card').forEach(c => c.classList.remove('orchestrating'));
  const agentId = STAGE_TO_AGENT[stageN];
  if (!agentId) return;
  const card = document.getElementById(agentId);
  if (!card) return;
  card.classList.add('orchestrating');
  const idx = agentId.split('-')[1];
  const badge = document.getElementById('as-' + idx);
  if (badge) badge.textContent = STAGE_STATUS[stageN] || 'WORKING';
}

function completeAllAgents() {
  document.querySelectorAll('.agent-card').forEach(c => {
    c.classList.remove('orchestrating');
    c.classList.add('agent-done');
  });
  ['1','2','3','4'].forEach(i => {
    const b = document.getElementById('as-' + i);
    if (b) b.textContent = 'DONE ✓';
  });
}

function resetAgents() {
  document.querySelectorAll('.agent-card').forEach(c => {
    c.classList.remove('orchestrating','agent-done');
  });
  ['1','2','3','4'].forEach(i => {
    const b = document.getElementById('as-' + i);
    if (b) b.textContent = 'STANDBY';
  });
}

// ── MARKDOWN RENDERER ──
function renderMarkdown(text) {
  if (!text) return '';
  const lines = text.split('\n');
  let html = '', inUl = false;
  lines.forEach(line => {
    if (line.startsWith('# ')) {
      if (inUl){html+='</ul>';inUl=false;}
      html += `<div class="md-h1">${fmt(line.slice(2))}</div>`;
    } else if (line.startsWith('## ')) {
      if (inUl){html+='</ul>';inUl=false;}
      html += `<div class="md-h2">${fmt(line.slice(3))}</div>`;
    } else if (line.startsWith('### ')) {
      if (inUl){html+='</ul>';inUl=false;}
      html += `<div class="md-h3">${fmt(line.slice(4))}</div>`;
    } else if (line.match(/^[-*] /)) {
      if (!inUl){html+='<ul class="md-ul">';inUl=true;}
      html += `<li class="md-li">${fmt(line.slice(2))}</li>`;
    } else if (line.match(/^\d+\. /)) {
      if (inUl){html+='</ul>';inUl=false;}
      html += `<div class="md-li" style="margin-left:1rem">${fmt(line)}</div>`;
    } else if (line.trim()==='---') {
      if (inUl){html+='</ul>';inUl=false;}
      html += '<hr class="md-hr">';
    } else if (line.trim()==='') {
      if (inUl){html+='</ul>';inUl=false;}
    } else {
      if (inUl){html+='</ul>';inUl=false;}
      html += `<p class="md-p">${fmt(line)}</p>`;
    }
  });
  if (inUl) html += '</ul>';
  return html;
}

function fmt(t) {
  return t
    .replace(/`([^`]+)`/g, '<code class="md-code">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="md-strong">$1</strong>')
    .replace(/\*([^*]+)\*/g,     '<em class="md-em">$1</em>')
    .replace(/_([^_]+)_/g,       '<em class="md-em">$1</em>');
}

// ── VOICE TABS ──
function showVoice(id, btn) {
  document.querySelectorAll('.vtab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.voice-content').forEach(v => v.classList.remove('on'));
  btn.classList.add('active');
  document.getElementById('vc-' + id).classList.add('on');
}

// ── TOAST ──
let toastTimer = null;
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  clearTimeout(toastTimer);
  document.getElementById('toastIcon').textContent = isError ? '⚠️' : '✅';
  document.getElementById('toastMsg').textContent = msg;
  toast.style.borderColor = isError ? 'var(--rose)'  : 'var(--emerald)';
  toast.style.color       = isError ? '#f87171'      : 'var(--emerald2)';
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ── DOM READY ──
document.addEventListener('DOMContentLoaded', () => {
  updateSlider(3);
  buildChapterGrid();
  checkN8nStatus();
  initProtectedEmail();

  document.getElementById('apiKey').addEventListener('input', () => {
    checkReady();
    updateKeyStatus();
  });
});
