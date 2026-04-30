/* ═══════════════════════════════════════════
   PYRAGOGY v11 — ORCHESTRA CORE
   runOrchestra, copyOutput, downloadMD
   Payload identico alla v10 originale.
   Non toccare WEBHOOK, payload keys, input IDs.
═══════════════════════════════════════════ */

let lastData = null;
let outputText = '';

// ── MAIN RUN — payload identico alla v10 ──
async function runOrchestra() {
  if (!selectedChapter || !document.getElementById('apiKey').value.trim()) return;

  // Stessi campi, stesso naming della v10
  const apiKey       = document.getElementById('apiKey').value.trim().replace(/[\r\n\t\s]/g,'');
  const notes        = document.getElementById('notes').value.trim();
  const collaborator = document.getElementById('collaboratorId').value.trim() || 'Anonymous_Peeragogue';

  const panel     = document.getElementById('opanel');
  const body      = document.getElementById('outbody');
  const btn       = document.getElementById('rbtn');
  const sdot      = document.getElementById('sdot');
  const slabel    = document.getElementById('slabel');
  const actions   = document.getElementById('outactions');
  const statusW   = document.getElementById('statusWrap');
  const voicesSec = document.getElementById('voicesSection');

  panel.classList.add('on');
  body.innerHTML = '';
  actions.style.display = 'none';
  voicesSec.style.display = 'none';
  btn.disabled = true;
  statusW.style.display = 'block';
  outputText = '';
  resetAgents();
  setStage(0);
  sdot.className = 'sdot run';
  slabel.textContent = 'Fetching chapter…';

  setTimeout(() => panel.scrollIntoView({behavior:'smooth',block:'start'}), 100);

  // Payload identico alla v10 — non toccare
  const payload = {
    chapter_url:            selectedChapter.url,
    chapter_title:          selectedChapter.title,
    human_notes:            notes,
    perturbation_intensity: String(intensity),
    api_key:                apiKey,
    collaborator_id:        collaborator,
  };

  // Stage timings identici alla v10
  const stages = [
    [1000,  '⚙️ Extracting text…'],
    [8000,  '🌍 Global Researcher working…'],
    [18000, '📚 Resonance Knowledge working…'],
    [28000, '🎸 Pattern Distortion working…'],
    [40000, '✍️ Complicit Editor synthesizing…'],
    [55000, '📄 Finalizing document…'],
  ];
  const timers = stages.map(([delay,msg],i) => setTimeout(() => {
    setStage(i+1);
    slabel.textContent = msg;
    activateAgent(i+1);
  }, delay));

  // Blinking cursor
  const cur = document.createElement('span');
  cur.className = 'cursor';
  body.appendChild(cur);

  try {
    const res = await fetch(WEBHOOK, {
      method:  'POST',
      headers: {'Content-Type':'application/json'},
      body:    JSON.stringify(payload)
    });

    timers.forEach(clearTimeout);

    if (!res.ok) throw new Error(`HTTP ${res.status} — check n8n workflow is active`);

    const rawText = await res.text();
    let data;
    try { data = JSON.parse(rawText); }
    catch(e) { throw new Error('Invalid JSON response: ' + rawText.substring(0,200)); }

    if (data.status === 'error') throw new Error(data.error?.message || 'Workflow error');

    const revision = data.content || '';
    outputText = revision;
    lastData = data;

    body.innerHTML = renderMarkdown(revision);
    setStage(6);
    completeAllAgents();
    sdot.className = 'sdot done';
    slabel.textContent = '✓ Complete — revision document ready';
    actions.style.display = 'flex';
    showToast('Revision document ready!');

    if (data.voices) {
      document.getElementById('vc-researcher').innerHTML = renderMarkdown(data.voices.researcher || '');
      document.getElementById('vc-resonance').innerHTML  = renderMarkdown(data.voices.resonance  || '');
      document.getElementById('vc-distortion').innerHTML = renderMarkdown(data.voices.distortion || '');
    }
    if (data.brief) {
      document.getElementById('vc-brief').innerHTML = renderMarkdown(data.brief);
    }
    voicesSec.style.display = 'block';

  } catch(err) {
    timers.forEach(clearTimeout);
    resetAgents();
    body.innerHTML = `<div style="color:#f87171;font-family:'JetBrains Mono',monospace;font-size:.85rem;line-height:1.8;">
⚠ Error: ${err.message}

Checklist:
1. n8n workflow active at ${WEBHOOK}
2. OpenRouter API key valid (no spaces/newlines)
3. Chapter URL reachable from n8n server
4. Check n8n Executions tab for details
    </div>`;
    sdot.className = 'sdot err';
    slabel.textContent = 'Error — see details above';
    showToast(err.message, true);
  }

  btn.disabled = false;
}

// ── COPY — senza event.target (era fragile) ──
function copyOutput() {
  if (!outputText) return;
  navigator.clipboard.writeText(outputText).then(() => {
    showToast('Copied to clipboard!');
    const b = document.getElementById('copyBtn');
    const orig = b.innerHTML;
    b.innerHTML = '✅ Copied!';
    setTimeout(() => b.innerHTML = orig, 2200);
  }).catch(() => showToast('Copy failed — select manually', true));
}

// ── DOWNLOAD MD ──
function downloadMD() {
  if (!outputText) return;
  const title = selectedChapter ? selectedChapter.title.toLowerCase().replace(/\s+/g,'-') : 'revision';
  const date  = new Date().toISOString().slice(0,10);
  const blob  = new Blob([outputText], {type:'text/markdown;charset=utf-8'});
  const url   = URL.createObjectURL(blob);
  const a     = document.createElement('a');
  a.href = url; a.download = `peeragogy-revision-${title}-${date}.md`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
  showToast('Download started!');
}
