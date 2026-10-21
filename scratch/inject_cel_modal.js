const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add JS functions
const auditFnMarker = `    function openAuditTopicsModal() {`;
const celFunctions = `    function openCelTopicsModal() {
      const modal = document.getElementById('celTopicsModal');
      const container = document.getElementById('celTopicsContainer');
      if (!modal) return;

      if (container && typeof CEL_CATALOG !== 'undefined' && CEL_CATALOG.topics) {
        container.innerHTML = CEL_CATALOG.topics.map(t => \`
          <div class="p-4 rounded-xl border border-stone-300 bg-white hover:border-icai-gold hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-[11px] mb-1.5">
                <span class="font-bold text-icai-burgundy font-serif">Topic \${t.topicId}</span>
                <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">20 Qs • 15 Mins</span>
              </div>
              <h4 class="font-bold text-icai-navy text-xs sm:text-sm font-display leading-snug">\${t.topicTitle}</h4>
              <p class="text-[11px] text-stone-500 font-serif mt-1 leading-relaxed">\${t.syllabus || ''}</p>
              <div class="mt-2 text-[11px] text-stone-600 flex items-center gap-2 font-serif">
                <span class="font-semibold text-emerald-800">40 Marks (+2.00, 0 Neg.)</span>
                <span>•</span>
                <span class="text-amber-800 font-medium">Difficult PYQs</span>
              </div>
            </div>
            <button onclick="closeCelTopicsModal(); openPreTestInstructions('CEL_TOPIC_\${t.topicId}')" class="w-full mt-3 py-1.5 px-3 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30 flex items-center justify-center gap-1">
              <span>✍️</span><span>Attempt Test (20 Qs • 15 Mins)</span>
            </button>
          </div>
        \`).join('');
      }

      modal.classList.remove('hidden');
    }

    function closeCelTopicsModal() {
      const modal = document.getElementById('celTopicsModal');
      if (modal) modal.classList.add('hidden');
    }

    function openAuditTopicsModal() {`;

if (html.includes(auditFnMarker) && !html.includes('function openCelTopicsModal()')) {
  html = html.replace(auditFnMarker, celFunctions);
  console.log('✅ Injected openCelTopicsModal and closeCelTopicsModal');
}

// 2. Add Modal Markup
const modalMarker = `  <!-- ==================== ADVANCED AUDITING, ASSURANCE & ETHICS (AAAPE) 11 TOPICS MODAL ==================== -->`;
const celModalHtml = `  <!-- ==================== CORPORATE AND ECONOMIC LAWS (CEL) 9 TOPICS MODAL ==================== -->
  <div id="celTopicsModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
    <div class="paper-texture bg-[#FDFBF7] rounded-2xl border-2 border-icai-gold shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
      <!-- Modal Header -->
      <div class="px-6 py-4 bg-gradient-to-r from-icai-navy via-slate-900 to-amber-950 text-amber-50 flex items-center justify-between border-b border-icai-gold/40">
        <div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="px-2 py-0.5 rounded bg-icai-gold/30 text-amber-200 text-[10px] font-bold uppercase tracking-wider">Group I • Corporate &amp; Economic Laws</span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">9 Separate Topic Tests</span>
          </div>
          <h3 class="text-lg font-bold font-display text-white">Corporate and Economic Laws (CEL) — Topic-Wise Practice Tests</h3>
          <p class="text-xs text-amber-200/80 font-serif">Each topic features 20 Questions • 15 Minutes • 40 Marks (+2.00, No Negative Marking) • Difficult Case-Based PYQs.</p>
        </div>
        <button onclick="closeCelTopicsModal()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition">
          ✕
        </button>
      </div>

      <!-- Quick Action: Full 100Q Exam Card -->
      <div class="p-4 bg-amber-50/90 border-b border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <span class="px-2 py-0.5 rounded bg-icai-navy text-amber-200 font-bold text-[10px] uppercase tracking-wider">Official 3-Hour Exam</span>
          <h4 class="font-bold text-icai-navy text-sm font-display mt-0.5">CEL Comprehensive Grand Test (100 Questions • 3 Hours • 200 Marks)</h4>
          <p class="text-xs text-stone-600 font-serif">Includes all 9 topics: Companies Act, Winding Up, LLP, IBC, SEBI, FEMA, Competition Act, Contract Act &amp; Consumer Protection.</p>
        </div>
        <button onclick="closeCelTopicsModal(); openPreTestInstructions('CEL_FULL_MOCK')" class="shrink-0 px-4 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/40 shadow-xs flex items-center gap-1.5">
          <span>⚡</span><span>Attempt Full Exam (100 Qs • 3 Hours)</span>
        </button>
      </div>

      <!-- Topics Grid -->
      <div class="p-5 overflow-y-auto max-h-[60vh] space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1" id="celTopicsContainer">
          <!-- Populated dynamically -->
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
        <span class="font-serif">Total 180 Topic Questions + 100 Full Exam Questions = 280 Questions</span>
        <button onclick="closeCelTopicsModal()" class="px-4 py-1.5 rounded-lg bg-stone-300 hover:bg-stone-400 text-stone-800 font-bold transition">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- ==================== ADVANCED AUDITING, ASSURANCE & ETHICS (AAAPE) 11 TOPICS MODAL ==================== -->`;

if (html.includes(modalMarker) && !html.includes('id="celTopicsModal"')) {
  html = html.replace(modalMarker, celModalHtml);
  console.log('✅ Injected celTopicsModal markup');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done.');

