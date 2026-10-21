const fs = require('fs');
const path = require('path');
const vm = require('vm');

const indexPath = path.resolve('index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Add "Enter Question Paper" button in Navbar (line ~233)
const targetNavSearch = '<!-- User Profile / Sign In Button (Clicking opens Image 1 OTP Login modal) -->';
if (html.includes(targetNavSearch) && !html.includes('openEnterQuestionModal')) {
  const enterBtn = `<!-- Enter / Add Question Paper Button -->
          <button onclick="openEnterQuestionModal()" class="whitespace-nowrap px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-700 text-amber-100 border border-emerald-400/50 text-xs font-bold flex items-center gap-1.5 transition shadow-xs active:scale-95">
            <span>➕</span>
            <span class="hidden sm:inline">Enter Question Paper</span>
            <span class="sm:hidden">Add Q</span>
          </button>

          `;
  html = html.replace(targetNavSearch, enterBtn + targetNavSearch);
}

// 2. Unlock "I am ready to begin" on the Instructions screen (lines ~910-930)
const oldDeclarationBlock = `        <!-- Declaration Checkbox -->
        <div>
          <div class="text-xs sm:text-sm font-bold text-stone-900 mb-2">Declaration:</div>
          <label class="flex items-center space-x-2 text-xs sm:text-sm text-stone-800 cursor-pointer select-none">
            <input type="checkbox" id="agreeInstructionsCheck" onchange="handleInstructionCheckChange(this)" class="w-4 h-4 rounded text-icai-navy focus:ring-icai-navy" />
            <span class="font-serif">I have understood and agree to all the Instructions.</span>
          </label>
        </div>

      </div>

      <!-- Bottom Button Bar -->
      <div class="flex items-center justify-between mt-6">
        <button onclick="switchMainView('tests')" class="px-6 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs sm:text-sm transition">
          Previous
        </button>
        <button id="btnReadyToBegin" onclick="launchCbtExam()" disabled class="px-8 py-2.5 rounded-lg bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold text-xs sm:text-sm shadow-md border border-icai-gold/40 transition opacity-50 cursor-not-allowed">
          I am ready to begin
        </button>
      </div>`;

const newDeclarationBlock = `        <!-- Declaration Checkbox -->
        <div>
          <div class="text-xs sm:text-sm font-bold text-stone-900 mb-2">Declaration:</div>
          <label class="flex items-center space-x-2.5 text-xs sm:text-sm text-stone-900 cursor-pointer select-none bg-amber-50/70 p-3 rounded-xl border border-amber-300 hover:bg-amber-100/60 transition shadow-2xs">
            <input type="checkbox" id="agreeInstructionsCheck" checked onchange="handleInstructionCheckChange(this)" class="w-4 h-4 rounded text-icai-navy focus:ring-icai-navy accent-icai-navy" />
            <span class="font-serif font-medium">I have understood and agree to all the official ICAI Instructions.</span>
          </label>
        </div>

      </div>

      <!-- Bottom Button Bar -->
      <div class="flex items-center justify-between mt-6">
        <button onclick="switchMainView('tests')" class="px-6 py-2.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-2xs">
          <span>←</span><span>Previous</span>
        </button>
        <button id="btnReadyToBegin" onclick="launchCbtExam()" class="px-8 py-2.5 rounded-lg bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold text-xs sm:text-sm shadow-md border-2 border-icai-gold/60 transition transform hover:scale-[1.02] active:scale-98 flex items-center gap-2 cursor-pointer">
          <span>I am ready to begin</span><span>→</span>
        </button>
      </div>`;

if (html.includes(oldDeclarationBlock)) {
  html = html.replace(oldDeclarationBlock, newDeclarationBlock);
}

// 3. Add #enterQuestionModal after #descriptivePaperModal
const descModalEnd = '<!-- ==================== FINAL SCORECARD MODAL ==================== -->';
const enterQuestionModalHtml = `<!-- ==================== MODAL: ENTER / CREATE QUESTION PAPER (ADMIN PORTAL) ==================== -->
  <div id="enterQuestionModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
    <div class="paper-texture rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border-2 border-icai-gold font-sans overflow-hidden">
      <!-- Modal Header -->
      <div class="p-4 sm:p-5 border-b border-icai-border flex items-center justify-between bg-gradient-to-r from-icai-navy via-slate-900 to-icai-dark text-white">
        <div class="flex items-center gap-3">
          <span class="text-2xl">📝</span>
          <div>
            <span class="text-[10px] font-bold tracking-wider text-amber-300 uppercase block">ICAI Examination Portal &amp; Authoring</span>
            <h3 class="text-base sm:text-lg font-bold font-display text-white">
              Enter / Create New Question Paper
            </h3>
          </div>
        </div>
        <button onclick="closeEnterQuestionModal()" class="text-stone-300 hover:text-white text-2xl font-bold px-2">&times;</button>
      </div>

      <!-- Form Body -->
      <form id="enterQuestionForm" onsubmit="handleCreateQuestionSubmit(event)" class="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs font-sans">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-icai-navy mb-1 uppercase tracking-wider text-[11px]">Select Paper / Module</label>
            <select id="newQChapter" class="w-full p-2.5 rounded-lg border border-stone-300 bg-white font-serif text-xs text-stone-900 outline-none focus:border-icai-navy">
              <option value="1">Paper 1: Financial Reporting (FR)</option>
              <option value="5">Paper 2: Advanced Financial Management (AFM)</option>
              <option value="1" selected>Paper 3: Advanced Auditing &amp; Professional Ethics</option>
              <option value="2">Paper 4: Direct Tax Laws &amp; International Taxation</option>
              <option value="3">Paper 5: Indirect Tax Laws (GST &amp; Customs)</option>
              <option value="4">Paper 6: Integrated Business Solutions (IBS)</option>
              <option value="1">Chapter 1 • Fundamental Principles &amp; Threats</option>
              <option value="2">Chapter 2 • Independence &amp; Non-Audit Services</option>
              <option value="3">Chapter 3 • Fees &amp; Tendering</option>
              <option value="4">Chapter 4 • Marketing &amp; Disciplinary Framework</option>
              <option value="5">Chapter 5 • Risk Management</option>
              <option value="6">Chapter 6 • Mutual Funds</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-icai-navy mb-1 uppercase tracking-wider text-[11px]">Topic / Section Tag</label>
            <input id="newQTag" type="text" placeholder="e.g. Ind AS 115, Sec 115BAA, SA 701" required class="w-full p-2.5 rounded-lg border border-stone-300 bg-white font-serif text-xs text-stone-900 outline-none focus:border-icai-navy" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-icai-navy mb-1 uppercase tracking-wider text-[11px]">Question Scenario &amp; Problem Text</label>
          <textarea id="newQText" rows="4" placeholder="Enter complete case-scenario and factual matrix following ICAI examination standards..." required class="w-full p-2.5 rounded-lg border border-stone-300 bg-white font-serif text-xs text-stone-900 outline-none focus:border-icai-navy"></textarea>
        </div>

        <!-- 4 Options Grid -->
        <div class="space-y-2">
          <label class="block font-bold text-icai-navy uppercase tracking-wider text-[11px]">Four Multiple Choice Options</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex items-center gap-2 border border-stone-300 rounded-lg p-2 bg-white">
              <span class="font-bold text-icai-navy text-xs">A:</span>
              <input id="newQOptA" type="text" placeholder="Option A text" required class="w-full font-serif text-xs outline-none" />
            </div>
            <div class="flex items-center gap-2 border border-stone-300 rounded-lg p-2 bg-white">
              <span class="font-bold text-icai-navy text-xs">B:</span>
              <input id="newQOptB" type="text" placeholder="Option B text" required class="w-full font-serif text-xs outline-none" />
            </div>
            <div class="flex items-center gap-2 border border-stone-300 rounded-lg p-2 bg-white">
              <span class="font-bold text-icai-navy text-xs">C:</span>
              <input id="newQOptC" type="text" placeholder="Option C text" required class="w-full font-serif text-xs outline-none" />
            </div>
            <div class="flex items-center gap-2 border border-stone-300 rounded-lg p-2 bg-white">
              <span class="font-bold text-icai-navy text-xs">D:</span>
              <input id="newQOptD" type="text" placeholder="Option D text" required class="w-full font-serif text-xs outline-none" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-icai-navy mb-1 uppercase tracking-wider text-[11px]">Correct Option</label>
            <select id="newQCorrect" class="w-full p-2.5 rounded-lg border border-stone-300 bg-white font-bold text-xs text-stone-900 outline-none focus:border-icai-navy">
              <option value="0">Option A</option>
              <option value="1">Option B</option>
              <option value="2">Option C</option>
              <option value="3">Option D</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-icai-navy mb-1 uppercase tracking-wider text-[11px]">Statutory ICAI Reference</label>
            <input id="newQRef" type="text" placeholder="e.g. Standard on Auditing SA 220 / Section 144" class="w-full p-2.5 rounded-lg border border-stone-300 bg-white font-serif text-xs text-stone-900 outline-none focus:border-icai-navy" />
          </div>
        </div>

        <div>
          <label class="block font-bold text-icai-navy mb-1 uppercase tracking-wider text-[11px]">Statutory Explanation &amp; Rationale</label>
          <textarea id="newQExplanation" rows="2" placeholder="ICAI commentary and reasoning for the correct option..." class="w-full p-2.5 rounded-lg border border-stone-300 bg-white font-serif text-xs text-stone-900 outline-none focus:border-icai-navy"></textarea>
        </div>

        <!-- Footer Buttons -->
        <div class="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
          <button type="button" onclick="closeEnterQuestionModal()" class="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold text-xs transition">
            Cancel
          </button>
          <button type="submit" id="btnSubmitNewQuestion" class="px-6 py-2.5 rounded-lg bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold text-xs shadow-md border border-icai-gold/50 transition flex items-center gap-1.5">
            <span>💾</span><span>Save &amp; Add Question to Paper</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  `;

if (html.includes(descModalEnd) && !html.includes('id="enterQuestionModal"')) {
  html = html.replace(descModalEnd, enterQuestionModalHtml + descModalEnd);
}

// 4. Update renderDescriptivePaperContent to include interactive candidate draft textarea
const targetRenderPart = `            <div class="mb-4">
              <div class="flex items-start justify-between gap-2 mb-1.5">
                <span class="font-bold text-icai-navy text-sm font-display">\${p.part}</span>
                <span class="px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-stone-800 text-[11px] font-bold shrink-0 font-serif">[\${p.marks} Marks]</span>
              </div>
              <div class="text-stone-800 leading-relaxed font-serif pl-4 border-l-2 border-stone-300">
                \${p.text.replace(/\\n/g, '<br/>')}
              </div>
            </div>`;

const upgradedRenderPart = `            <div class="mb-5 pb-4 border-b border-stone-200/80">
              <div class="flex items-start justify-between gap-2 mb-1.5">
                <span class="font-bold text-icai-navy text-sm font-display">\${p.part}</span>
                <span class="px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-stone-800 text-[11px] font-bold shrink-0 font-serif">[\${p.marks} Marks]</span>
              </div>
              <div class="text-stone-800 leading-relaxed font-serif pl-4 border-l-2 border-stone-300 mb-3">
                \${p.text.replace(/\\n/g, '<br/>')}
              </div>

              <!-- Interactive Candidate Workspace & Working Notes (Type Your Solution) -->
              <div class="mt-2.5 p-3 bg-amber-50/40 rounded-xl border border-stone-300/80">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-xs font-bold text-icai-navy flex items-center gap-1 font-sans">
                    <span>✍️</span><span>Candidate Workspace &amp; Working Notes (Type Your Solution):</span>
                  </span>
                  <button type="button" onclick="saveDraftDescriptiveAnswer('\${currentDescPaper}', '\${qIdx}', '\${p.part}')" class="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition shadow-2xs">
                    💾 Save Working Notes
                  </button>
                </div>
                <textarea id="descUserAns_\${currentDescPaper}_\${qIdx}_\${p.part.replace(/[^a-zA-Z0-9]/g, '')}" rows="3" class="w-full text-xs font-serif p-2.5 rounded-lg border border-stone-300 focus:border-icai-navy bg-white outline-none placeholder:text-stone-400 placeholder:italic leading-relaxed" placeholder="Type your computation, working notes, and statutory provisions here before comparing with ICAI model solution..."></textarea>
              </div>
            </div>`;

if (html.includes(targetRenderPart)) {
  html = html.replace(targetRenderPart, upgradedRenderPart);
}

// 5. Add JavaScript helper functions for enter question modal & descriptive drafts
const newJsFunctions = `
    // ==================== ENTER QUESTION PAPER & DESCRIPTIVE DRAFT HANDLERS ====================
    function openEnterQuestionModal() {
      const modal = document.getElementById('enterQuestionModal');
      if (modal) modal.classList.remove('hidden');
    }

    function closeEnterQuestionModal() {
      const modal = document.getElementById('enterQuestionModal');
      if (modal) modal.classList.add('hidden');
    }

    async function handleCreateQuestionSubmit(e) {
      if (e) e.preventDefault();
      const chapterSelect = document.getElementById('newQChapter');
      const tagInput = document.getElementById('newQTag');
      const questionInput = document.getElementById('newQText');
      const optA = document.getElementById('newQOptA');
      const optB = document.getElementById('newQOptB');
      const optC = document.getElementById('newQOptC');
      const optD = document.getElementById('newQOptD');
      const correctSelect = document.getElementById('newQCorrect');
      const refInput = document.getElementById('newQRef');
      const explInput = document.getElementById('newQExplanation');

      const chapterVal = Number(chapterSelect?.value || 1);
      const chapterTitle = chapterSelect?.options[chapterSelect.selectedIndex]?.text || \`Chapter \${chapterVal}\`;
      const tagVal = (tagInput?.value || 'General').trim();
      const qText = (questionInput?.value || '').trim();
      const oA = (optA?.value || '').trim();
      const oB = (optB?.value || '').trim();
      const oC = (optC?.value || '').trim();
      const oD = (optD?.value || '').trim();
      const correctVal = Number(correctSelect?.value || 0);
      const refVal = (refInput?.value || 'Authoritative ICAI Syllabus Reference').trim();
      const explVal = (explInput?.value || 'Refer to authoritative ICAI literature.').trim();

      if (!qText || !oA || !oB || !oC || !oD) {
        showToast('Please fill out the question and all 4 options.', '⚠️');
        return;
      }

      const payload = {
        chapter: chapterVal,
        chapterTitle,
        tag: tagVal,
        question: qText,
        options: [oA, oB, oC, oD],
        correct: correctVal,
        ref: refVal,
        explanation: explVal
      };

      try {
        const res = await fetch(\`\${API_BASE_URL}/admin/questions\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok && data.question) {
          QUESTIONS.push(data.question);
          showToast('✅ Question successfully added to Question Bank!', '🎉');
          closeEnterQuestionModal();
          if (questionInput) questionInput.value = '';
          if (optA) optA.value = '';
          if (optB) optB.value = '';
          if (optC) optC.value = '';
          if (optD) optD.value = '';
        } else {
          const newId = QUESTIONS.length + 1;
          QUESTIONS.push({ id: newId, ...payload });
          showToast('✅ Question added to active session question bank!', '🎉');
          closeEnterQuestionModal();
        }
      } catch (err) {
        const newId = QUESTIONS.length + 1;
        QUESTIONS.push({ id: newId, ...payload });
        showToast('✅ Question added to active session question bank!', '🎉');
        closeEnterQuestionModal();
      }
    }

    function saveDraftDescriptiveAnswer(paperKey, qIdx, part) {
      const cleanPart = part.replace(/[^a-zA-Z0-9]/g, '');
      const el = document.getElementById(\`descUserAns_\${paperKey}_\${qIdx}_\${cleanPart}\`);
      if (!el) return;
      const val = el.value.trim();
      localStorage.setItem(\`descDraft_\${paperKey}_\${qIdx}_\${cleanPart}\`, val);
      showToast('Working notes saved successfully!', '💾');
    }
`;

if (!html.includes('function openEnterQuestionModal')) {
  const insertBefore = 'function closeScorecardModal';
  html = html.replace(insertBefore, newJsFunctions + '\n    ' + insertBefore);
}

// Write updated html
fs.writeFileSync(indexPath, html, 'utf-8');
console.log('Successfully updated index.html with enter question modal and unlocked exam entry!');

