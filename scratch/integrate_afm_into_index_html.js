const fs = require('fs');
const path = require('path');

console.log('Reading index.html and AFM datasets...');
let html = fs.readFileSync('index.html', 'utf8');

const afmCatalog = JSON.parse(fs.readFileSync('data/afm/afm_topics_catalog.json', 'utf8'));
const afmFullMock = JSON.parse(fs.readFileSync('data/afm/afm_full_paper_100q.json', 'utf8'));
const afmTopicQuestions = {};
for (let i = 1; i <= 11; i++) {
  const fName = afmCatalog.topics.find(t => t.topicId === i).fileName;
  afmTopicQuestions[i] = JSON.parse(fs.readFileSync(path.join('data', 'afm', fName), 'utf8'));
}

console.log('AFM datasets loaded successfully.');

// 1. Update Paper 2 Card buttons in index.html
const oldPaper2Buttons = `<div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2">
              <button onclick="openPreTestInstructions('REAL_PAPER_2')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1">
                <span>✍️</span><span>Section A</span>
              </button>
              <button onclick="openDescriptivePaperModal('PAPER_2')" class="w-full sm:flex-1 py-2 px-2.5 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-lg text-xs border border-stone-300 transition flex items-center justify-center gap-1">
                <span>📄</span><span>Section B (70M)</span>
              </button>
            </div>`;

const newPaper2Buttons = `<div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col gap-2">
              <div class="flex flex-col sm:flex-row items-center gap-2">
                <button onclick="openPreTestInstructions('AFM_FULL_MOCK')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1.5">
                  <span>⚡</span><span>Full Test (100 Qs • 3 Hours)</span>
                </button>
                <button onclick="openAfmTopicsModal()" class="w-full sm:flex-1 py-2 px-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold rounded-lg text-xs border border-amber-300 transition flex items-center justify-center gap-1.5 shadow-2xs">
                  <span>📚</span><span>11 Topic Tests (20-20 Qs)</span>
                </button>
              </div>
              <div class="flex flex-col sm:flex-row items-center gap-2">
                <button onclick="openPreTestInstructions('REAL_PAPER_2')" class="w-full sm:flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg text-[11px] border border-stone-300 transition flex items-center justify-center gap-1">
                  <span>✍️</span><span>Section A</span>
                </button>
                <button onclick="openDescriptivePaperModal('PAPER_2')" class="w-full sm:flex-1 py-1.5 px-2 bg-white hover:bg-stone-100 text-stone-800 font-semibold rounded-lg text-[11px] border border-stone-300 transition flex items-center justify-center gap-1">
                  <span>📄</span><span>Section B (70M Descriptive)</span>
                </button>
              </div>
            </div>`;

if (html.includes(oldPaper2Buttons)) {
  html = html.replace(oldPaper2Buttons, newPaper2Buttons);
  console.log('✅ Updated Paper 2 Card dual action buttons');
} else {
  console.warn('⚠️ oldPaper2Buttons target not found directly, checking variations...');
}

// 2. Add openAfmTopicsModal and closeAfmTopicsModal functions
const oldFrModalFns = `    function openFrTopicsModal() {`;
const afmModalFns = `    function openAfmTopicsModal() {
      const modal = document.getElementById('afmTopicsModal');
      const container = document.getElementById('afmTopicsContainer');
      if (!modal) return;

      if (container && typeof AFM_CATALOG !== 'undefined' && AFM_CATALOG.topics) {
        container.innerHTML = AFM_CATALOG.topics.map(t => \`
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
            <button onclick="closeAfmTopicsModal(); openPreTestInstructions('AFM_TOPIC_\${t.topicId}')" class="w-full mt-3 py-1.5 px-3 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30 flex items-center justify-center gap-1">
              <span>✍️</span><span>Attempt Test (20 Qs • 15 Mins)</span>
            </button>
          </div>
        \`).join('');
      }

      modal.classList.remove('hidden');
    }

    function closeAfmTopicsModal() {
      const modal = document.getElementById('afmTopicsModal');
      if (modal) modal.classList.add('hidden');
    }

    function openFrTopicsModal() {`;

if (html.includes(oldFrModalFns) && !html.includes('openAfmTopicsModal')) {
  html = html.replace(oldFrModalFns, afmModalFns);
  console.log('✅ Injected openAfmTopicsModal and closeAfmTopicsModal functions');
}

// 3. Inject AFM_CATALOG, AFM_FULL_MOCK_QUESTIONS, and AFM_TOPIC_QUESTIONS
const chapterMetaMarker = `    // Chapter & Real Paper Metadata (Official ICAI 100-Mark Pattern)\n    const CHAPTER_META = {`;

const afmDataInjection = `    // =========================================================================
    // ADVANCED FINANCIAL MANAGEMENT (AFM) GROUP 1 SPECIALIZED DATA (11 TOPICS & 100Q FULL MOCK)
    // =========================================================================
    const AFM_CATALOG = ${JSON.stringify(afmCatalog, null, 2)};
    const AFM_FULL_MOCK_QUESTIONS = ${JSON.stringify(afmFullMock.questions, null, 2)};
    const AFM_TOPIC_QUESTIONS = ${JSON.stringify(afmTopicQuestions, null, 2)};

    // Chapter & Real Paper Metadata (Official ICAI 100-Mark Pattern)
    const CHAPTER_META = {`;

if (html.includes(chapterMetaMarker) && !html.includes('const AFM_CATALOG =')) {
  html = html.replace(chapterMetaMarker, afmDataInjection);
  console.log('✅ Injected AFM_CATALOG, AFM_FULL_MOCK_QUESTIONS, and AFM_TOPIC_QUESTIONS');
}

// 4. Add AFM_FULL_MOCK and AFM_TOPIC_1 to 11 to CHAPTER_META
const frFullMockEntry = `      'FR_FULL_MOCK': {`;
const afmChapterMetaEntries = `      'AFM_FULL_MOCK': {
        title: "Paper 2: Advanced Financial Management (AFM) - Comprehensive Grand Examination",
        shortTitle: "AFM Full Exam (100 Qs)",
        total: 100,
        marksPerQ: 2,
        totalMarks: 200,
        time: 180,
        isRealPaper: true,
        group: "Group I",
        difficulty: "Difficult",
        pattern: "Comprehensive 11-Topic Examination"
      },
      'AFM_TOPIC_1': { title: "AFM Topic 1: Capital Budgeting & Investment Decisions", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_2': { title: "AFM Topic 2: Cost of Capital & Capital Structure Decisions", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_3': { title: "AFM Topic 3: Dividend Policy & Working Capital Management", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_4': { title: "AFM Topic 4: Securities Analysis & Portfolio Management, CAPM", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_5': { title: "AFM Topic 5: Derivatives: Futures, Options, and Swaps", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_6': { title: "AFM Topic 6: Foreign Exchange Exposure and Risk Management", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_7': { title: "AFM Topic 7: International Financial Management", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_8': { title: "AFM Topic 8: Mergers, Acquisitions, and Corporate Restructuring", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_9': { title: "AFM Topic 9: Business Valuation Methods", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_10': { title: "AFM Topic 10: Financial Services and Capital Markets", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_TOPIC_11': { title: "AFM Topic 11: Strategic Financial Decision-Making & Financial Modelling", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_FULL_MOCK': {`;

if (html.includes(frFullMockEntry) && !html.includes('AFM_FULL_MOCK')) {
  html = html.replace(frFullMockEntry, afmChapterMetaEntries);
  console.log('✅ Added AFM_FULL_MOCK and AFM_TOPIC_1 to 11 to CHAPTER_META');
}

// 5. Update openPreTestInstructions to resolve AFM questions
const oldPreTestFilter = `      if (testKey === 'FR_FULL_MOCK') {
        currentTestQuestions = (typeof FR_FULL_MOCK_QUESTIONS !== 'undefined' && FR_FULL_MOCK_QUESTIONS.length) ? FR_FULL_MOCK_QUESTIONS : QUESTIONS.slice(0, 100);
      } else if (String(testKey).startsWith('FR_TOPIC_')) {
        const tId = Number(String(testKey).replace('FR_TOPIC_', ''));
        currentTestQuestions = (typeof FR_TOPIC_QUESTIONS !== 'undefined' && FR_TOPIC_QUESTIONS[tId]) ? FR_TOPIC_QUESTIONS[tId] : QUESTIONS.slice(0, 20);
      }`;

const newPreTestFilter = `      if (testKey === 'FR_FULL_MOCK') {
        currentTestQuestions = (typeof FR_FULL_MOCK_QUESTIONS !== 'undefined' && FR_FULL_MOCK_QUESTIONS.length) ? FR_FULL_MOCK_QUESTIONS : QUESTIONS.slice(0, 100);
      } else if (String(testKey).startsWith('FR_TOPIC_')) {
        const tId = Number(String(testKey).replace('FR_TOPIC_', ''));
        currentTestQuestions = (typeof FR_TOPIC_QUESTIONS !== 'undefined' && FR_TOPIC_QUESTIONS[tId]) ? FR_TOPIC_QUESTIONS[tId] : QUESTIONS.slice(0, 20);
      } else if (testKey === 'AFM_FULL_MOCK') {
        currentTestQuestions = (typeof AFM_FULL_MOCK_QUESTIONS !== 'undefined' && AFM_FULL_MOCK_QUESTIONS.length) ? AFM_FULL_MOCK_QUESTIONS : QUESTIONS.slice(0, 100);
      } else if (String(testKey).startsWith('AFM_TOPIC_')) {
        const tId = Number(String(testKey).replace('AFM_TOPIC_', ''));
        currentTestQuestions = (typeof AFM_TOPIC_QUESTIONS !== 'undefined' && AFM_TOPIC_QUESTIONS[tId]) ? AFM_TOPIC_QUESTIONS[tId] : QUESTIONS.slice(0, 20);
      }`;

if (html.includes(oldPreTestFilter) && !html.includes("testKey === 'AFM_FULL_MOCK'")) {
  html = html.replace(oldPreTestFilter, newPreTestFilter);
  console.log('✅ Updated openPreTestInstructions question loading for AFM');
}

// 6. Update openPreTestInstructions banner and badges for AFM
const oldInstBannerCheck = `      const isFrFullMock = (testKey === 'FR_FULL_MOCK');
      const isFrTopic = String(testKey).startsWith('FR_TOPIC_');
      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(testKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(testKey));
      const testTime = meta.time || ((isG1Paper || isG1Chapter || isFrTopic) ? 15 : 20);`;

const newInstBannerCheck = `      const isFrFullMock = (testKey === 'FR_FULL_MOCK');
      const isFrTopic = String(testKey).startsWith('FR_TOPIC_');
      const isAfmFullMock = (testKey === 'AFM_FULL_MOCK');
      const isAfmTopic = String(testKey).startsWith('AFM_TOPIC_');
      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(testKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(testKey));
      const testTime = meta.time || ((isG1Paper || isG1Chapter || isFrTopic || isAfmTopic) ? 15 : 20);`;

if (html.includes(oldInstBannerCheck) && !html.includes('const isAfmFullMock =')) {
  html = html.replace(oldInstBannerCheck, newInstBannerCheck);
  console.log('✅ Updated openPreTestInstructions isAfmFullMock flag');
}

const oldInstBannerBlock = `      if (isFrFullMock) {
        if (typeBadge) typeBadge.textContent = 'Group I • Paper 1 Financial Reporting (FR) Full Examination';
        if (govtBannerTitle) govtBannerTitle.textContent = 'Paper 1: Financial Reporting (FR) Comprehensive Grand Test (100 Questions • 3 Hours)';
        if (govtBannerText) govtBannerText.textContent = 'All 13 Financial Reporting Topics Included: Conceptual Framework, Ind AS 115, PPE, Financial Instruments, Business Combinations, Consolidation, Leases, Taxes, Provisions, Associates, Forex, Grants, Segments & Sectoral Standards. Total 100 Questions | 3 Hours (180 Minutes) | 200 Marks (+2.00/Q, No Negative Marking).';
      } else if (isFrTopic) {`;

const newInstBannerBlock = `      if (isFrFullMock) {
        if (typeBadge) typeBadge.textContent = 'Group I • Paper 1 Financial Reporting (FR) Full Examination';
        if (govtBannerTitle) govtBannerTitle.textContent = 'Paper 1: Financial Reporting (FR) Comprehensive Grand Test (100 Questions • 3 Hours)';
        if (govtBannerText) govtBannerText.textContent = 'All 13 Financial Reporting Topics Included: Conceptual Framework, Ind AS 115, PPE, Financial Instruments, Business Combinations, Consolidation, Leases, Taxes, Provisions, Associates, Forex, Grants, Segments & Sectoral Standards. Total 100 Questions | 3 Hours (180 Minutes) | 200 Marks (+2.00/Q, No Negative Marking).';
      } else if (isAfmFullMock) {
        if (typeBadge) typeBadge.textContent = 'Group I • Paper 2 Advanced Financial Management (AFM) Full Examination';
        if (govtBannerTitle) govtBannerTitle.textContent = 'Paper 2: Advanced Financial Management (AFM) Comprehensive Grand Test (100 Questions • 3 Hours)';
        if (govtBannerText) govtBannerText.textContent = 'All 11 AFM Topics Included: Capital Budgeting & Risk, Cost of Capital & Capital Structure, Dividend Policy & Working Capital, Portfolio Management & CAPM, Derivatives & Swaps, Forex Exposure, International Finance, Mergers & Acquisitions, Business Valuation, Financial Services, and Strategic Financial Modelling. Total 100 Questions | 3 Hours (180 Minutes) | 200 Marks (+2.00/Q, No Negative Marking).';
      } else if (isAfmTopic) {
        if (typeBadge) typeBadge.textContent = 'Group I • Paper 2 AFM Topic Test (20 Qs • 15 Mins)';
        if (govtBannerTitle) govtBannerTitle.textContent = \`AFM Assessment: \${meta.title} (20 Questions • 15 Minutes)\`;
        if (govtBannerText) govtBannerText.textContent = 'Specialized AFM Chapter Sprint: 20 Case-Scenario Multiple Choice Questions carrying 2.00 Marks each (Total: 40 Marks). Strict 15-Minute Exam Clock. Authentic Difficult ICAI CA Final AFM Standards.';
      } else if (isFrTopic) {`;

if (html.includes(oldInstBannerBlock) && !html.includes('else if (isAfmFullMock)')) {
  html = html.replace(oldInstBannerBlock, newInstBannerBlock);
  console.log('✅ Updated openPreTestInstructions banner text for AFM');
}

// 7. Update launchCbtExam tags
const oldCbtSectionTags = `      const isFrFullMock = (currentTestKey === 'FR_FULL_MOCK');
      const isFrTopic = String(currentTestKey).startsWith('FR_TOPIC_');
      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(currentTestKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(currentTestKey));
      const sectionTag = document.getElementById('cbtSectionTagBtn');
      if (sectionTag) {
        if (isFrFullMock) {
          sectionTag.textContent = 'Financial Reporting Full Exam (100 Qs • 3 Hours • 200 Marks)';
        } else if (isFrTopic) {
          sectionTag.textContent = 'FR Topic Test (20 Qs • 15 Mins • 40 Marks)';`;

const newCbtSectionTags = `      const isFrFullMock = (currentTestKey === 'FR_FULL_MOCK');
      const isFrTopic = String(currentTestKey).startsWith('FR_TOPIC_');
      const isAfmFullMock = (currentTestKey === 'AFM_FULL_MOCK');
      const isAfmTopic = String(currentTestKey).startsWith('AFM_TOPIC_');
      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(currentTestKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(currentTestKey));
      const sectionTag = document.getElementById('cbtSectionTagBtn');
      if (sectionTag) {
        if (isFrFullMock) {
          sectionTag.textContent = 'Financial Reporting Full Exam (100 Qs • 3 Hours • 200 Marks)';
        } else if (isAfmFullMock) {
          sectionTag.textContent = 'Advanced Financial Management Full Exam (100 Qs • 3 Hours • 200 Marks)';
        } else if (isFrTopic) {
          sectionTag.textContent = 'FR Topic Test (20 Qs • 15 Mins • 40 Marks)';
        } else if (isAfmTopic) {
          sectionTag.textContent = 'AFM Topic Test (20 Qs • 15 Mins • 40 Marks)';`;

if (html.includes(oldCbtSectionTags) && !html.includes('else if (isAfmFullMock)')) {
  html = html.replace(oldCbtSectionTags, newCbtSectionTags);
  console.log('✅ Updated launchCbtExam tags for AFM');
}

// 8. Inject #afmTopicsModal dialog before </body>
const afmModalHtml = `  <!-- ==================== ADVANCED FINANCIAL MANAGEMENT (AFM) 11 TOPICS MODAL ==================== -->
  <div id="afmTopicsModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
    <div class="paper-texture bg-[#FDFBF7] rounded-2xl border-2 border-icai-gold shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
      <!-- Modal Header -->
      <div class="px-6 py-4 bg-gradient-to-r from-icai-navy via-slate-900 to-teal-950 text-amber-50 flex items-center justify-between border-b border-icai-gold/40">
        <div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="px-2 py-0.5 rounded bg-icai-gold/30 text-amber-200 text-[10px] font-bold uppercase tracking-wider">Group I • Paper 2</span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">11 Separate Topic Tests</span>
          </div>
          <h3 class="text-lg font-bold font-display text-white">Advanced Financial Management (AFM) — Topic-Wise Practice Tests</h3>
          <p class="text-xs text-amber-200/80 font-serif">Each topic features 20 Questions • 15 Minutes • 40 Marks (+2.00, No Negative Marking) • Difficult Case-Based PYQs.</p>
        </div>
        <button onclick="closeAfmTopicsModal()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition">
          ✕
        </button>
      </div>

      <!-- Topics Grid -->
      <div class="p-6 overflow-y-auto flex-1 space-y-3 font-sans">
        <div class="p-3 rounded-xl bg-amber-50/80 border border-amber-300 text-xs text-stone-800 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="text-lg">⚡</span>
            <div>
              <span class="font-bold text-icai-navy block font-display">Looking for the Comprehensive Full Test?</span>
              <span class="text-stone-600 font-serif">Attempt all 11 topics combined in a single 100-question, 3-hour national mock test.</span>
            </div>
          </div>
          <button onclick="closeAfmTopicsModal(); openPreTestInstructions('AFM_FULL_MOCK')" class="px-4 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shrink-0 shadow-xs border border-icai-gold/40 transition">
            Attempt Full Test (100 Qs • 3 Hrs)
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1" id="afmTopicsContainer">
          <!-- Populated by JavaScript -->
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
        <span class="font-serif">Total 220 Case-Based PYQs across 11 Specialized AFM Modules</span>
        <button onclick="closeAfmTopicsModal()" class="px-4 py-1.5 rounded-lg bg-stone-300 hover:bg-stone-400 text-stone-800 font-bold transition">
          Close
        </button>
      </div>
    </div>
  </div>\n\n`;

if (!html.includes('id="afmTopicsModal"')) {
  html = html.replace('</body>', afmModalHtml + '</body>');
  console.log('✅ Injected #afmTopicsModal dialog before </body>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('🎉 index.html updated successfully with AFM integration!');

