const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Header with interactive group switcher tabs
const headerTarget = `        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 class="text-lg sm:text-xl font-bold font-display text-icai-navy flex items-center gap-2">
              <span>🏛️</span>
              <span>Group I Full Papers &amp; Subject Tests</span>
            </h2>
            <p class="text-xs text-stone-600 font-serif mt-0.5">
              All 4 Core Subjects under Group I: Financial Reporting (FR), Advanced Financial Management (AFM), Advanced Auditing (AAAPE) &amp; Corporate and Economic Laws (CEL).
            </p>
          </div>
          
          <!-- Group I Badge & Standard Indicator -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50/90 border border-amber-300/90 shadow-2xs self-start sm:self-auto">
            <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span class="text-xs font-bold font-sans text-icai-navy">Group I • 4 Core Subjects</span>
            <span class="text-[11px] font-medium text-stone-600 font-serif border-l border-amber-300 pl-2">100Q / 3-Hr &amp; 20Q / 15-Min</span>
          </div>

          <!-- Hidden compatibility buttons for legacy tab references -->
          <div class="hidden" aria-hidden="true">
            <button id="tabGroupAll"></button>
            <button id="tabGroup1"></button>
            <button id="tabGroup2"></button>
          </div>
        </div>`;

const headerReplacement = `        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 id="papersSectionHeading" class="text-lg sm:text-xl font-bold font-display text-icai-navy flex items-center gap-2">
              <span>🏛️</span>
              <span id="papersSectionTitle">Group I Full Papers &amp; Subject Tests</span>
            </h2>
            <p id="papersSectionSub" class="text-xs text-stone-600 font-serif mt-0.5">
              All 4 Core Subjects under Group I: Financial Reporting (FR), Advanced Financial Management (AFM), Advanced Auditing (AAAPE) &amp; Corporate and Economic Laws (CEL).
            </p>
          </div>
          
          <!-- Group Switcher & Standard Indicator -->
          <div class="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            <!-- Segmented Switcher Controls (Group I / Group II / All Papers) -->
            <div class="inline-flex items-center p-1 rounded-xl bg-stone-200/90 border border-stone-300 shadow-2xs text-xs font-sans">
              <button onclick="switchFullPapersGroup('ALL')" id="tabGroupAll" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition text-stone-700 hover:text-stone-900 hover:bg-stone-300/60 whitespace-nowrap">
                <span>All Papers</span>
              </button>
              <button onclick="switchFullPapersGroup('G1')" id="tabGroup1" class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-icai-navy text-amber-200 shadow-xs whitespace-nowrap flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Group I (4 Core)</span>
              </button>
              <button onclick="switchFullPapersGroup('G2')" id="tabGroup2" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition text-stone-700 hover:text-stone-900 hover:bg-stone-300/60 whitespace-nowrap flex items-center gap-1.5">
                <span>Group II (Papers 4–6)</span>
              </button>
            </div>

            <!-- Standard Details Badge -->
            <div id="groupBadgeIndicator" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50/90 border border-amber-300/90 text-xs font-semibold text-stone-800 font-serif shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span id="groupStandardPill">100Q / 3-Hr &amp; 20Q / 15-Min</span>
            </div>
          </div>
        </div>`;

// 2. Add Group II Cards inside fullPapersGrid after Paper 4
const card4EndTarget = `                <button onclick="openDescriptivePaperModal('PAPER_LAW')" class="w-full sm:flex-1 py-1.5 px-2 bg-white hover:bg-stone-100 text-stone-800 font-semibold rounded-lg text-[11px] border border-stone-300 transition flex items-center justify-center gap-1">
                  <span>📄</span><span>Section B (70M Descriptive)</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>`;

const card4EndReplacement = `                <button onclick="openDescriptivePaperModal('PAPER_LAW')" class="w-full sm:flex-1 py-1.5 px-2 bg-white hover:bg-stone-100 text-stone-800 font-semibold rounded-lg text-[11px] border border-stone-300 transition flex items-center justify-center gap-1">
                  <span>📄</span><span>Section B (70M Descriptive)</span>
                </button>
              </div>
            </div>
          </div>

          <!-- ==================== GROUP II FULL PAPERS (PAPERS 4-6) ==================== -->
          
          <!-- PAPER 4 (Group II): Direct Tax Laws & International Taxation -->
          <div class="full-paper-card hidden paper-texture rounded-2xl border-2 border-icai-burgundy p-5 sm:p-6 shadow-book hover:shadow-xl transition flex flex-col justify-between relative overflow-hidden" data-group="G2">
            <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-700 via-icai-burgundy to-rose-600"></div>
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-icai-burgundy text-amber-100 text-[10px] font-bold uppercase tracking-wider">Group II • Paper 4</span>
                <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold">100 Marks (30M MCQ + 70M Desc)</span>
              </div>
              <h3 class="text-base sm:text-lg font-bold font-display text-icai-navy">Direct Tax Laws &amp; International Taxation</h3>
              <p class="text-xs text-stone-600 mt-2 font-serif leading-relaxed min-h-[48px]">
                Corporate Assessment (Sec. 115BAA &amp; MAT), Transfer Pricing (Sec. 92C/92CE), DTAA Relief (Sec. 90/91), Permanent Establishment, GAAR &amp; Equalisation Levy.
              </p>
              
              <div class="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs font-serif">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section A (30M):</span>
                  <span class="font-mono text-emerald-800 font-bold">15 Case MCQs • No Negative Marking</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section B (70M):</span>
                  <span class="font-mono text-stone-700 font-semibold">Corporate &amp; Treaty Case Qs (Suggested Answers)</span>
                </div>
              </div>
            </div>

            <div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2">
              <button onclick="openPreTestInstructions('REAL_PAPER_4')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-burgundy hover:bg-red-950 text-amber-100 font-bold rounded-lg text-xs shadow-xs border border-rose-300/40 transition flex items-center justify-center gap-1.5">
                <span>✍️</span><span>Section A (30M Case MCQs)</span>
              </button>
              <button onclick="openDescriptivePaperModal('PAPER_4')" class="w-full sm:flex-1 py-2 px-2.5 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-lg text-xs border border-stone-300 transition flex items-center justify-center gap-1.5 shadow-2xs">
                <span>📄</span><span>Section B (70M Descriptive)</span>
              </button>
            </div>
          </div>

          <!-- PAPER 5 (Group II): Indirect Tax Laws (GST & Customs) -->
          <div class="full-paper-card hidden paper-texture rounded-2xl border-2 border-icai-burgundy p-5 sm:p-6 shadow-book hover:shadow-xl transition flex flex-col justify-between relative overflow-hidden" data-group="G2">
            <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-700 via-indigo-800 to-icai-navy"></div>
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-icai-burgundy text-amber-100 text-[10px] font-bold uppercase tracking-wider">Group II • Paper 5</span>
                <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold">100 Marks (30M MCQ + 70M Desc)</span>
              </div>
              <h3 class="text-base sm:text-lg font-bold font-display text-icai-navy">Indirect Tax Laws (GST &amp; Customs)</h3>
              <p class="text-xs text-stone-600 mt-2 font-serif leading-relaxed min-h-[48px]">
                Input Tax Credit (ITC Sec. 16-17), Place of Supply (Sec. 12-13), Valuation Rules, Demand &amp; Recovery (Sec. 73-74), Customs Valuation &amp; MOOWR Warehousing.
              </p>
              
              <div class="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs font-serif">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section A (30M):</span>
                  <span class="font-mono text-emerald-800 font-bold">15 Case MCQs • No Negative Marking</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section B (70M):</span>
                  <span class="font-mono text-stone-700 font-semibold">GST &amp; Customs Duty Qs (Suggested Answers)</span>
                </div>
              </div>
            </div>

            <div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2">
              <button onclick="openPreTestInstructions('REAL_PAPER_5')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-burgundy hover:bg-red-950 text-amber-100 font-bold rounded-lg text-xs shadow-xs border border-rose-300/40 transition flex items-center justify-center gap-1.5">
                <span>✍️</span><span>Section A (30M Case MCQs)</span>
              </button>
              <button onclick="openDescriptivePaperModal('PAPER_5')" class="w-full sm:flex-1 py-2 px-2.5 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-lg text-xs border border-stone-300 transition flex items-center justify-center gap-1.5 shadow-2xs">
                <span>📄</span><span>Section B (70M Descriptive)</span>
              </button>
            </div>
          </div>

          <!-- PAPER 6 (Group II): Integrated Business Solutions (IBS) -->
          <div class="full-paper-card hidden paper-texture rounded-2xl border-2 border-icai-burgundy p-5 sm:p-6 shadow-book hover:shadow-xl transition flex flex-col justify-between relative overflow-hidden" data-group="G2">
            <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-rose-700 to-icai-navy"></div>
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-icai-burgundy text-amber-100 text-[10px] font-bold uppercase tracking-wider">Group II • Paper 6</span>
                <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold">100 Marks (30M MCQ + 70M Desc)</span>
              </div>
              <h3 class="text-base sm:text-lg font-bold font-display text-icai-navy">Integrated Business Solutions (IBS)</h3>
              <p class="text-xs text-stone-600 mt-2 font-serif leading-relaxed min-h-[48px]">
                Multi-disciplinary case studies integrating Financial Reporting (Ind AS), AFM, Audit (SA 701), Direct Tax &amp; GST in corporate turnaround &amp; M&amp;A scenarios.
              </p>
              
              <div class="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs font-serif">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section A (30M):</span>
                  <span class="font-mono text-emerald-800 font-bold">15 Multi-Disciplinary Case MCQs</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section B (70M):</span>
                  <span class="font-mono text-stone-700 font-semibold">Integrated Case Solutions &amp; Working Notes</span>
                </div>
              </div>
            </div>

            <div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2">
              <button onclick="openPreTestInstructions('REAL_PAPER_6')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-burgundy hover:bg-red-950 text-amber-100 font-bold rounded-lg text-xs shadow-xs border border-rose-300/40 transition flex items-center justify-center gap-1.5">
                <span>✍️</span><span>Section A (30M Case MCQs)</span>
              </button>
              <button onclick="openDescriptivePaperModal('PAPER_6')" class="w-full sm:flex-1 py-2 px-2.5 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-lg text-xs border border-stone-300 transition flex items-center justify-center gap-1.5 shadow-2xs">
                <span>📄</span><span>Section B (70M Descriptive)</span>
              </button>
            </div>
          </div>

        </div>
      </div>`;

// 3. Update switchFullPapersGroup to dynamically update header & badges
const funcTarget = `    function switchFullPapersGroup(groupCode) {
      const cards = document.querySelectorAll('.full-paper-card');
      cards.forEach(card => {
        if (groupCode === 'ALL') {
          card.classList.remove('hidden');
        } else {
          const g = card.getAttribute('data-group');
          if (g === groupCode) card.classList.remove('hidden');
          else card.classList.add('hidden');
        }
      });

      const btnAll = document.getElementById('tabGroupAll');
      const btnG1 = document.getElementById('tabGroup1');
      const btnG2 = document.getElementById('tabGroup2');
      const activeClass = "px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-icai-navy text-amber-200 shadow-xs";
      const inactiveClass = "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition text-stone-700 hover:text-stone-900 hover:bg-stone-300/60";

      if (btnAll) btnAll.className = (groupCode === 'ALL') ? activeClass : inactiveClass;
      if (btnG1) btnG1.className = (groupCode === 'G1') ? activeClass : inactiveClass;
      if (btnG2) btnG2.className = (groupCode === 'G2') ? activeClass : inactiveClass;
    }`;

const funcReplacement = `    function switchFullPapersGroup(groupCode) {
      const cards = document.querySelectorAll('.full-paper-card');
      cards.forEach(card => {
        if (groupCode === 'ALL') {
          card.classList.remove('hidden');
        } else {
          const g = card.getAttribute('data-group');
          if (g === groupCode) card.classList.remove('hidden');
          else card.classList.add('hidden');
        }
      });

      const btnAll = document.getElementById('tabGroupAll');
      const btnG1 = document.getElementById('tabGroup1');
      const btnG2 = document.getElementById('tabGroup2');
      const activeClass = "px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-icai-navy text-amber-200 shadow-xs whitespace-nowrap flex items-center gap-1.5";
      const inactiveClass = "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition text-stone-700 hover:text-stone-900 hover:bg-stone-300/60 whitespace-nowrap flex items-center gap-1.5";

      if (btnAll) btnAll.className = (groupCode === 'ALL') ? activeClass : inactiveClass;
      if (btnG1) btnG1.className = (groupCode === 'G1') ? activeClass : inactiveClass;
      if (btnG2) btnG2.className = (groupCode === 'G2') ? activeClass : inactiveClass;

      // Update Section Header Title & Subtitle dynamically
      const titleEl = document.getElementById('papersSectionTitle');
      const subEl = document.getElementById('papersSectionSub');
      const pillEl = document.getElementById('groupStandardPill');

      if (titleEl && subEl && pillEl) {
        if (groupCode === 'G1') {
          titleEl.textContent = 'Group I Full Papers & Subject Tests';
          subEl.textContent = 'All 4 Core Subjects under Group I: Financial Reporting (FR), Advanced Financial Management (AFM), Advanced Auditing (AAAPE) & Corporate and Economic Laws (CEL).';
          pillEl.textContent = '100Q / 3-Hr & 20Q / 15-Min';
        } else if (groupCode === 'G2') {
          titleEl.textContent = 'Group II Full Papers & Subject Tests';
          subEl.textContent = 'Core & Elective Papers under Group II: Direct Tax Laws & International Taxation (DT), Indirect Tax Laws (IDT/GST) & Integrated Business Solutions (IBS).';
          pillEl.textContent = 'Section A (30M) & Section B (70M)';
        } else {
          titleEl.textContent = 'All Full Papers & Subject Tests (Group I & Group II)';
          subEl.textContent = 'Complete 7-Paper Coverage: 4 Group I Core Subjects & 3 Group II Advanced Taxation & IBS Papers.';
          pillEl.textContent = 'All 7 ICAI Papers';
        }
      }
    }`;

console.log('funcTarget present?', html.includes(funcTarget));

const updated = html
  .replace(headerTarget, headerReplacement)
  .replace(card4EndTarget, card4EndReplacement)
  .replace(funcTarget, funcReplacement);

fs.writeFileSync('index.html', updated, 'utf8');
console.log('Successfully updated index.html with interactive Group Switcher & Group II cards!');

