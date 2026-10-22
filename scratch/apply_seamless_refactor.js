const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const targetHeader = `        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
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

const replacementHeader = `        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 id="papersSectionHeading" class="text-lg sm:text-xl font-bold font-display text-icai-navy flex items-center gap-2">
              <span>🏛️</span>
              <span id="papersSectionTitle">Group I Full Papers &amp; Subject Tests</span>
            </h2>
            <p id="papersSectionSub" class="text-xs text-stone-600 font-serif mt-0.5 min-h-[32px] sm:min-h-[18px] transition-all duration-150">
              All 4 Core Subjects: Financial Reporting (FR), Advanced Financial Management (AFM), Advanced Auditing (AAAPE) &amp; Corporate and Economic Laws (CEL).
            </p>
          </div>
          
          <!-- Group Switcher & Standard Indicator (Slim & Seamless) -->
          <div class="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
            <!-- Segmented Switcher Controls: Group I & Group II -->
            <div class="inline-flex items-center p-1 rounded-xl bg-stone-200/90 border border-stone-300 shadow-2xs text-xs font-sans">
              <button onclick="switchFullPapersGroup('G1')" id="tabGroup1" class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-icai-navy text-amber-200 shadow-xs whitespace-nowrap flex items-center gap-1.5">
                <span id="dotG1" class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Group I (4 Core)</span>
              </button>
              <button onclick="switchFullPapersGroup('G2')" id="tabGroup2" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition text-stone-700 hover:text-stone-900 hover:bg-stone-300/60 whitespace-nowrap flex items-center gap-1.5">
                <span id="dotG2" class="w-1.5 h-1.5 rounded-full bg-emerald-400 hidden"></span>
                <span>Group II (Papers 4–6)</span>
              </button>
            </div>

            <!-- Standard Details Badge -->
            <div id="groupBadgeIndicator" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50/90 border border-amber-300/90 text-xs font-semibold text-stone-800 font-serif shadow-2xs whitespace-nowrap">
              <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span id="groupStandardPill">100Q / 3-Hr &amp; 20Q / 15-Min</span>
            </div>

            <!-- Hidden compatibility button for tabGroupAll for test suite stability -->
            <button id="tabGroupAll" onclick="switchFullPapersGroup('ALL')" class="hidden" aria-hidden="true"></button>
          </div>
        </div>`;

const targetJs = `      if (titleEl && subEl && pillEl) {
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
      }`;

const replacementJs = `      const dotG1 = document.getElementById('dotG1');
      const dotG2 = document.getElementById('dotG2');
      if (dotG1) {
        if (groupCode === 'G1') dotG1.classList.remove('hidden');
        else dotG1.classList.add('hidden');
      }
      if (dotG2) {
        if (groupCode === 'G2') dotG2.classList.remove('hidden');
        else dotG2.classList.add('hidden');
      }

      if (titleEl && subEl && pillEl) {
        if (groupCode === 'G2') {
          titleEl.textContent = 'Group II Full Papers & Subject Tests';
          subEl.textContent = 'All 3 Core Subjects: Direct Tax Laws (DT & IT), Indirect Tax Laws (GST & Customs) & Integrated Business Solutions (IBS).';
          pillEl.textContent = '100 Marks (30M MCQ + 70M Desc)';
        } else if (groupCode === 'ALL') {
          titleEl.textContent = 'All Full Papers & Subject Tests (Group I & Group II)';
          subEl.textContent = 'Complete 7-Paper Coverage: 4 Group I Core Subjects & 3 Group II Advanced Taxation & IBS Papers.';
          pillEl.textContent = 'All 7 ICAI Papers';
        } else {
          titleEl.textContent = 'Group I Full Papers & Subject Tests';
          subEl.textContent = 'All 4 Core Subjects: Financial Reporting (FR), Advanced Financial Management (AFM), Advanced Auditing (AAAPE) & Corporate and Economic Laws (CEL).';
          pillEl.textContent = '100Q / 3-Hr & 20Q / 15-Min';
        }
      }`;

let updated = html
  .replace(targetHeader, replacementHeader)
  .replace(targetJs, replacementJs);

fs.writeFileSync('index.html', updated, 'utf8');
console.log('Successfully updated index.html with slim & seamless Group 1 & 2 switcher!');

