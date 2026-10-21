const fs = require('fs');
const path = require('path');

console.log('Reading index.html and CEL datasets...');
let html = fs.readFileSync('index.html', 'utf8');

const celCatalog = JSON.parse(fs.readFileSync('data/cel/cel_topics_catalog.json', 'utf8'));
const celFullMock = JSON.parse(fs.readFileSync('data/cel/cel_full_paper_100q.json', 'utf8'));
const celTopicQuestions = {};
for (let i = 1; i <= 9; i++) {
  const fName = celCatalog.topics.find(t => t.topicId === i).fileName;
  celTopicQuestions[i] = JSON.parse(fs.readFileSync(path.join('data', 'cel', fName), 'utf8'));
}

console.log('CEL datasets loaded successfully.');

// 1. Insert CEL Card in Group 1 (Between Paper 3 and Paper 4)
const paper3EndMarker = `<!-- PAPER 4 (Group II) -->`;
const celCardHtml = `<!-- CORPORATE AND ECONOMIC LAWS (CEL) (Group I) -->
          <div class="full-paper-card paper-texture rounded-2xl border-2 border-icai-gold p-5 sm:p-6 shadow-book hover:shadow-xl transition flex flex-col justify-between relative overflow-hidden" data-group="G1">
            <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600"></div>
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-icai-navy text-amber-200 text-[10px] font-bold uppercase tracking-wider">Group I • Corporate &amp; Economic Laws</span>
                <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold">100 / 200 Marks</span>
              </div>
              <h3 class="text-base sm:text-lg font-bold font-display text-icai-navy">Corporate and Economic Laws (CEL)</h3>
              <p class="text-xs text-stone-600 mt-2 font-serif leading-relaxed">
                Complete 9-Topic Coverage: Companies Act 2013 (Management &amp; Meetings), Winding Up &amp; NCLT/NCLAT, LLP Act 2008, IBC 2016, SEBI Act &amp; Regulations, FEMA 1999, Competition Act 2002, Indian Contract Act 1872 &amp; Consumer Protection Act 2019.
              </p>
              
              <div class="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs font-serif">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Full Test (9 Topics):</span>
                  <span class="font-mono text-emerald-800 font-bold">100 Qs • 3 Hours • 200 Marks</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">9 Topic Tests:</span>
                  <span class="font-mono text-stone-700 font-semibold">20 Qs • 15 Mins Each • 40M</span>
                </div>
              </div>
            </div>

            <div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col gap-2">
              <div class="flex flex-col sm:flex-row items-center gap-2">
                <button onclick="openPreTestInstructions('CEL_FULL_MOCK')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1.5">
                  <span>⚡</span><span>Full Test (100 Qs • 3 Hours)</span>
                </button>
                <button onclick="openCelTopicsModal()" class="w-full sm:flex-1 py-2 px-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold rounded-lg text-xs border border-amber-300 transition flex items-center justify-center gap-1.5 shadow-2xs">
                  <span>📚</span><span>9 Topic Tests (20-20 Qs)</span>
                </button>
              </div>
              <div class="flex flex-col sm:flex-row items-center gap-2">
                <button onclick="openPreTestInstructions('CEL_TOPIC_1')" class="w-full sm:flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg text-[11px] border border-stone-300 transition flex items-center justify-center gap-1">
                  <span>✍️</span><span>Section A (20 Qs • 15 Mins)</span>
                </button>
                <button onclick="openDescriptivePaperModal('PAPER_LAW')" class="w-full sm:flex-1 py-1.5 px-2 bg-white hover:bg-stone-100 text-stone-800 font-semibold rounded-lg text-[11px] border border-stone-300 transition flex items-center justify-center gap-1">
                  <span>📄</span><span>Section B (70M Descriptive)</span>
                </button>
              </div>
            </div>
          </div>

          <!-- PAPER 4 (Group II) -->`;

if (html.includes(paper3EndMarker) && !html.includes('openCelTopicsModal()')) {
  html = html.replace(paper3EndMarker, celCardHtml);
  console.log('✅ Injected Corporate and Economic Laws (CEL) Group 1 Card');
}

// 2. Add openCelTopicsModal and closeCelTopicsModal functions
const oldAuditModalFns = `    function openAuditTopicsModal() {`;
const celModalFns = `    function openCelTopicsModal() {
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

if (html.includes(oldAuditModalFns) && !html.includes('openCelTopicsModal')) {
  html = html.replace(oldAuditModalFns, celModalFns);
  console.log('✅ Injected openCelTopicsModal and closeCelTopicsModal functions');
}

// 3. Insert celTopicsModal markup
const auditModalMarker = `  <!-- Modal: Advanced Auditing & Professional Ethics (AAAPE) 11 Topic-Wise Tests -->`;
const celModalHtml = `  <!-- Modal: Corporate and Economic Laws (CEL) 9 Topic-Wise Tests -->
  <div id="celTopicsModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
    <div class="paper-texture bg-[#FDFBF7] rounded-2xl border-2 border-icai-gold shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
      <!-- Modal Header -->
      <div class="px-6 py-4 bg-gradient-to-r from-icai-navy via-slate-900 to-amber-950 text-amber-50 flex items-center justify-between border-b border-icai-gold/40">
        <div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="px-2 py-0.5 rounded bg-icai-gold/30 text-amber-200 text-[10px] font-bold uppercase tracking-wider">Group I • Corporate &amp; Economic Laws</span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">9 Separate Topic Tests</span>
          </div>
          <h3 class="text-lg font-bold font-display text-white">Corporate and Economic Laws (CEL) - Topic-Wise Practice Tests</h3>
          <p class="text-xs text-amber-200/80 font-serif">Each topic features 20 Questions • 15 Minutes • 40 Marks (+2.00, No Negative Marking) • Difficult Case-Based PYQs.</p>
        </div>
        <button onclick="closeCelTopicsModal()" class="w-8 h-8 rounded-full bg-stone-800/80 hover:bg-stone-700 text-amber-200 flex items-center justify-center text-sm font-bold border border-icai-gold/30 transition">
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
      <div id="celTopicsContainer" class="p-5 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <!-- Dynamically populated via openCelTopicsModal() -->
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-3 bg-stone-100 border-t border-stone-300 flex items-center justify-between text-xs text-stone-600 font-serif">
        <span>Total Bank: 180 Topic Questions + 100 Full Exam Questions = 280 Questions</span>
        <button onclick="closeCelTopicsModal()" class="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-lg transition">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- Modal: Advanced Auditing & Professional Ethics (AAAPE) 11 Topic-Wise Tests -->`;

if (html.includes(auditModalMarker) && !html.includes('id="celTopicsModal"')) {
  html = html.replace(auditModalMarker, celModalHtml);
  console.log('✅ Injected celTopicsModal markup into index.html');
}

// 4. Update tab switcher label to show Group I (Papers 1–3 & CEL)
const oldG1TabBtn = `<button onclick="switchFullPapersGroup('G1')" id="tabGroup1" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition text-stone-700 hover:text-stone-900 hover:bg-stone-300/60">
              Group I (Papers 1–3)
            </button>`;
const newG1TabBtn = `<button onclick="switchFullPapersGroup('G1')" id="tabGroup1" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition text-stone-700 hover:text-stone-900 hover:bg-stone-300/60">
              Group I (Papers 1–3 &amp; CEL)
            </button>`;
if (html.includes(oldG1TabBtn)) {
  html = html.replace(oldG1TabBtn, newG1TabBtn);
  console.log('✅ Updated Group 1 Tab switcher button label');
}

// 5. Inject CEL_CATALOG, CEL_FULL_MOCK_QUESTIONS, and CEL_TOPIC_QUESTIONS into JavaScript
const auditCatalogMarker = `    const AUDIT_CATALOG = {`;
const celDataInjection = `    const CEL_CATALOG = ${JSON.stringify(celCatalog, null, 2)};
    const CEL_FULL_MOCK_QUESTIONS = ${JSON.stringify(celFullMock.questions, null, 2)};
    const CEL_TOPIC_QUESTIONS = ${JSON.stringify(celTopicQuestions, null, 2)};

    const AUDIT_CATALOG = {`;

if (html.includes(auditCatalogMarker) && !html.includes('const CEL_CATALOG =')) {
  html = html.replace(auditCatalogMarker, celDataInjection);
  console.log('✅ Injected CEL_CATALOG, CEL_FULL_MOCK_QUESTIONS, and CEL_TOPIC_QUESTIONS into script');
}

// 6. Update openPreTestInstructions in index.html to support CEL_FULL_MOCK and CEL_TOPIC_
const oldAuditFilter = `      } else if (testKey === 'AUDIT_FULL_MOCK') {
        currentTestQuestions = (typeof AUDIT_FULL_MOCK_QUESTIONS !== 'undefined' && AUDIT_FULL_MOCK_QUESTIONS.length) ? AUDIT_FULL_MOCK_QUESTIONS : QUESTIONS.slice(0, 100);
      } else if (String(testKey).startsWith('AUDIT_TOPIC_')) {
        const tId = Number(String(testKey).replace('AUDIT_TOPIC_', ''));
        currentTestQuestions = (typeof AUDIT_TOPIC_QUESTIONS !== 'undefined' && AUDIT_TOPIC_QUESTIONS[tId]) ? AUDIT_TOPIC_QUESTIONS[tId] : QUESTIONS.slice(0, 20);`;

const newCelFilter = `      } else if (testKey === 'AUDIT_FULL_MOCK') {
        currentTestQuestions = (typeof AUDIT_FULL_MOCK_QUESTIONS !== 'undefined' && AUDIT_FULL_MOCK_QUESTIONS.length) ? AUDIT_FULL_MOCK_QUESTIONS : QUESTIONS.slice(0, 100);
      } else if (String(testKey).startsWith('AUDIT_TOPIC_')) {
        const tId = Number(String(testKey).replace('AUDIT_TOPIC_', ''));
        currentTestQuestions = (typeof AUDIT_TOPIC_QUESTIONS !== 'undefined' && AUDIT_TOPIC_QUESTIONS[tId]) ? AUDIT_TOPIC_QUESTIONS[tId] : QUESTIONS.slice(0, 20);
      } else if (testKey === 'CEL_FULL_MOCK') {
        currentTestQuestions = (typeof CEL_FULL_MOCK_QUESTIONS !== 'undefined' && CEL_FULL_MOCK_QUESTIONS.length) ? CEL_FULL_MOCK_QUESTIONS : QUESTIONS.slice(0, 100);
      } else if (String(testKey).startsWith('CEL_TOPIC_')) {
        const tId = Number(String(testKey).replace('CEL_TOPIC_', ''));
        currentTestQuestions = (typeof CEL_TOPIC_QUESTIONS !== 'undefined' && CEL_TOPIC_QUESTIONS[tId]) ? CEL_TOPIC_QUESTIONS[tId] : QUESTIONS.slice(0, 20);`;

if (html.includes(oldAuditFilter) && !html.includes("testKey === 'CEL_FULL_MOCK'")) {
  html = html.replace(oldAuditFilter, newCelFilter);
  console.log('✅ Updated test filter in openPreTestInstructions for CEL');
}

// 7. Update instructions banners and timing in openPreTestInstructions
const oldAuditTimingChecks = `      const isAuditFullMock = (testKey === 'AUDIT_FULL_MOCK');
      const isAuditTopic = String(testKey).startsWith('AUDIT_TOPIC_');`;

const newCelTimingChecks = `      const isAuditFullMock = (testKey === 'AUDIT_FULL_MOCK');
      const isAuditTopic = String(testKey).startsWith('AUDIT_TOPIC_');
      const isCelFullMock = (testKey === 'CEL_FULL_MOCK');
      const isCelTopic = String(testKey).startsWith('CEL_TOPIC_');`;

if (html.includes(oldAuditTimingChecks) && !html.includes('const isCelFullMock =')) {
  html = html.replace(oldAuditTimingChecks, newCelTimingChecks);
  console.log('✅ Added isCelFullMock and isCelTopic checks');
}

const oldTestTimeFormula = `const testTime = meta.time || ((isG1Paper || isG1Chapter || isFrTopic || isAfmTopic || isAuditTopic) ? 15 : 20);`;
const newTestTimeFormula = `const testTime = meta.time || ((isG1Paper || isG1Chapter || isFrTopic || isAfmTopic || isAuditTopic || isCelTopic) ? 15 : 20);`;
if (html.includes(oldTestTimeFormula)) {
  html = html.replace(oldTestTimeFormula, newTestTimeFormula);
  console.log('✅ Updated testTime formula to include isCelTopic');
}

// Add banner block for CEL
const oldAuditBannerBlock = `      } else if (isAuditTopic) {
        if (typeBadge) typeBadge.textContent = 'Group I • Advanced Auditing (AAAPE) Topic-Wise Practice Test';
        if (govtBannerTitle) govtBannerTitle.textContent = 'AAAPE Topic-Wise 20-20 Standard — 15 Mins Speed Mastery';
        if (govtBannerText) govtBannerText.textContent = '20 Case-Based Difficult Questions | 15 Minutes CBT Timing | 40 Marks (+2.00, Zero Negative Marking). Sourced from authentic ICAI CA Final Previous Year Question papers.';
        document.getElementById('instDuration').textContent = '15';
        if (durationUnit) durationUnit.textContent = 'Mins (15:00 Countdown)';
        document.getElementById('instTimeLimit').textContent = '15';
        document.getElementById('instMaxMarks').textContent = '40 Marks (20 Qs × 2M • 0 Neg.)';
        document.getElementById('instTotalQs').textContent = '20 Questions (Case-Based PYQs)';`;

const newCelBannerBlock = `      } else if (isAuditTopic) {
        if (typeBadge) typeBadge.textContent = 'Group I • Advanced Auditing (AAAPE) Topic-Wise Practice Test';
        if (govtBannerTitle) govtBannerTitle.textContent = 'AAAPE Topic-Wise 20-20 Standard — 15 Mins Speed Mastery';
        if (govtBannerText) govtBannerText.textContent = '20 Case-Based Difficult Questions | 15 Minutes CBT Timing | 40 Marks (+2.00, Zero Negative Marking). Sourced from authentic ICAI CA Final Previous Year Question papers.';
        document.getElementById('instDuration').textContent = '15';
        if (durationUnit) durationUnit.textContent = 'Mins (15:00 Countdown)';
        document.getElementById('instTimeLimit').textContent = '15';
        document.getElementById('instMaxMarks').textContent = '40 Marks (20 Qs × 2M • 0 Neg.)';
        document.getElementById('instTotalQs').textContent = '20 Questions (Case-Based PYQs)';
      } else if (isCelFullMock) {
        if (typeBadge) typeBadge.textContent = 'Group I • Corporate & Economic Laws (CEL) Full Examination';
        if (govtBannerTitle) govtBannerTitle.textContent = 'Corporate and Economic Laws (CEL) Comprehensive Grand Test (100 Questions • 3 Hours)';
        if (govtBannerText) govtBannerText.textContent = 'All 9 CEL Topics Included: Companies Act 2013 (Management & Meetings), Winding Up & NCLT/NCLAT, LLP Act 2008, IBC 2016, SEBI Act & Regulations, FEMA 1999, Competition Act 2002, Indian Contract Act 1872 & Consumer Protection Act 2019. Total 100 Questions | 3 Hours (180 Minutes) | 200 Marks (+2.00/Q, No Negative Marking).';
        document.getElementById('instDuration').textContent = '180';
        if (durationUnit) durationUnit.textContent = 'Mins (3 Hours Active Countdown)';
        document.getElementById('instTimeLimit').textContent = '180';
        document.getElementById('instMaxMarks').textContent = '200 Marks (100 Qs × 2M • 0 Neg.)';
        document.getElementById('instTotalQs').textContent = '100 Questions (All 9 Topics Covered)';
      } else if (isCelTopic) {
        if (typeBadge) typeBadge.textContent = 'Group I • Corporate & Economic Laws (CEL) Topic-Wise Practice Test';
        if (govtBannerTitle) govtBannerTitle.textContent = 'CEL Topic-Wise 20-20 Standard — 15 Mins Speed Mastery';
        if (govtBannerText) govtBannerText.textContent = '20 Case-Based Difficult Questions | 15 Minutes CBT Timing | 40 Marks (+2.00, Zero Negative Marking). Sourced from authentic ICAI CA Final Previous Year Question papers.';
        document.getElementById('instDuration').textContent = '15';
        if (durationUnit) durationUnit.textContent = 'Mins (15:00 Countdown)';
        document.getElementById('instTimeLimit').textContent = '15';
        document.getElementById('instMaxMarks').textContent = '40 Marks (20 Qs × 2M • 0 Neg.)';
        document.getElementById('instTotalQs').textContent = '20 Questions (Case-Based PYQs)';`;

if (html.includes(oldAuditBannerBlock) && !html.includes('else if (isCelFullMock)')) {
  html = html.replace(oldAuditBannerBlock, newCelBannerBlock);
  console.log('✅ Injected CEL banner blocks in openPreTestInstructions');
}

// 8. Add CEL metadata to CHAPTER_META
const oldChapterMetaEnd = `      'AUDIT_TOPIC_11': { title: "AAAPE Topic 11: Code of Ethics and Professional Misconduct", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },`;

const newCelChapterMeta = `      'AUDIT_TOPIC_11': { title: "AAAPE Topic 11: Code of Ethics and Professional Misconduct", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'CEL_FULL_MOCK': {
        title: "Corporate and Economic Laws (CEL) - Comprehensive Grand Examination",
        shortTitle: "CEL Full Exam (100 Qs)",
        total: 100,
        marksPerQ: 2,
        totalMarks: 200,
        time: 180,
        group: "Group I",
        difficulty: "Difficult",
        pattern: "All 9 Modules Comprehensive Examination"
      },
      'CEL_TOPIC_1': { title: "Companies Act: Incorporation, Management & Meetings", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'CEL_TOPIC_2': { title: "Winding up, and the role of the NCLT and NCLAT", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'CEL_TOPIC_3': { title: "Limited Liability Partnership Act, 2008", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'CEL_TOPIC_4': { title: "Insolvency and Bankruptcy Code, 2016", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'CEL_TOPIC_5': { title: "SEBI Act and key SEBI regulations", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'CEL_TOPIC_6': { title: "Foreign Exchange Management Act (FEMA), 1999", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'CEL_TOPIC_7': { title: "Competition Act, 2002", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'CEL_TOPIC_8': { title: "Indian Contract Act, 1872, and related economic laws", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'CEL_TOPIC_9': { title: "Consumer protection and other economic legislation", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },`;

if (html.includes(oldChapterMetaEnd) && !html.includes("'CEL_FULL_MOCK':")) {
  html = html.replace(oldChapterMetaEnd, newCelChapterMeta);
  console.log('✅ Injected CEL metadata entries into CHAPTER_META');
}

// 9. Add PAPER_LAW into DESCRIPTIVE_PAPERS
const oldPaper6DescEnd = `"PAPER_6": {`;
const lawDescPaper = `"PAPER_LAW": {
    "paperCode": "Paper 4 / Law",
    "subject": "Corporate and Economic Laws (CEL)",
    "group": "Group I",
    "totalMarks": 70,
    "time": "2 Hours 15 Minutes",
    "instructions": "Total Marks: 70 • Time: 2 Hours 15 Mins. Question No. 1 is compulsory (14 Marks). Attempt any 4 questions from Questions No. 2 to 6 (14 Marks each). Working notes and statutory citations (Companies Act 2013, IBC 2016, FEMA 1999, Competition Act 2002) form an integral part of evaluation with step-marking.",
    "questions": [
      {
        "qNum": 1,
        "title": "Question 1 (Compulsory - 14 Marks)",
        "isCompulsory": true,
        "parts": [
          {
            "part": "(a)",
            "marks": 9,
            "text": "The Board of Directors of Zenith Infra Ltd. comprises 8 directors. At a meeting convened on 15th April 2024 to consider a major contract of supply with Delta Logistics Pvt. Ltd., 5 directors disclosed their interest under Section 184(2) as being shareholders and directors in Delta Logistics Pvt. Ltd. Only 3 non-interested directors were present at the meeting. After detailed discussion, 2 non-interested directors voted in favor of the resolution and 1 voted against.\\nRequired:\\n(i) Examine whether valid quorum was present for transacting this business under Section 174(3).\\n(ii) Analyze whether the resolution was validly passed in accordance with the Companies Act, 2013.\\n(iii) What would be the legal consequence if an interested director participated and voted without disclosing his interest under Section 184(1)?",
            "solution": {
              "heading": "ICAI Suggested Model Solution & Statutory Analysis",
              "reference": "Sections 174(3), 184, and 167 of the Companies Act, 2013",
              "points": [
                "<strong>(i) Quorum under Section 174(3):</strong> Under Section 174(3), where at any time the number of interested directors exceeds or is equal to two-thirds of the total strength of the Board, the number of directors who are not interested and present at the meeting, being not less than two, shall be the quorum during such time for that business. Here, total strength = 8. Two-thirds = 5.33 (i.e. 6). Since 5 directors are interested (not >= 6), Section 174(3) does not trigger. General quorum under Section 174(1) is 1/3rd of total strength (8/3 = 2.67 -> 3 directors) or 2 directors, whichever is higher, being 3 directors. Since 3 disinterested directors were present, <strong>valid quorum was present</strong>.",
                "<strong>(ii) Passing of Resolution:</strong> Under Section 174, interested directors cannot participate or vote on the contract. Of the 3 disinterested directors present, 2 voted in favor and 1 against. Since the votes cast in favor exceed the votes cast against, the resolution is <strong>validly passed</strong> as an Ordinary Board Resolution.",
                "<strong>(iii) Non-disclosure of Interest:</strong> Under Section 184(3), the contract shall be voidable at the option of the company. Under Section 184(4), the defaulting director shall be punishable with fine up to ₹1,00,000. Furthermore, under Section 167(1)(c), the director shall automatically vacate his office."
              ],
              "marking": "3 Marks for Quorum analysis; 3 Marks for Resolution validity; 3 Marks for non-disclosure consequences."
            }
          },
          {
            "part": "(b)",
            "marks": 5,
            "text": "An operational creditor delivers a statutory demand notice under Section 8 of the Insolvency and Bankruptcy Code, 2016 demanding payment of unpaid invoices of ₹1.80 Crores. The corporate debtor replies within 8 days enclosing email correspondence dated 3 months prior to the demand notice showing repeated complaints of substandard quality and rejection of 25% of goods.\\nExamine whether the Adjudicating Authority (NCLT) will admit the application under Section 9 of IBC.",
            "solution": {
              "heading": "ICAI Suggested Model Solution & Judicial Precedent",
              "reference": "Section 9(5)(ii)(d) of IBC, 2016 read with Mobilox Innovations Pvt. Ltd. v. Kirusa Software Pvt. Ltd. (SC)",
              "points": [
                "<strong>Pre-existing Dispute:</strong> Under Section 9(5)(ii)(d) of the IBC, 2016, the Adjudicating Authority shall reject an application if notice of dispute has been received by the operational creditor or there is a record of dispute in information utility.",
                "<strong>Mobilox Innovations Doctrine:</strong> The Supreme Court in Mobilox Innovations held that the Adjudicating Authority must only examine whether there is a plausible contention requiring further investigation and that the dispute is not a patently feeble legal argument or an assertion of unsupported facts. The defense must be truly existing prior to the Section 8 demand notice.",
                "<strong>Conclusion:</strong> Since the rejection and quality complaints were recorded 3 months prior to the Section 8 notice, a genuine pre-existing dispute exists. Therefore, the NCLT <strong>shall reject the Section 9 application</strong>."
              ],
              "marking": "2 Marks for Section 9 provisions; 2 Marks for Mobilox Innovations ruling; 1 Mark for Conclusion."
            }
          }
        ]
      }
    ]
  },
  "PAPER_6": {`;

if (html.includes(oldPaper6DescEnd) && !html.includes('"PAPER_LAW":')) {
  html = html.replace(oldPaper6DescEnd, lawDescPaper);
  console.log('✅ Injected PAPER_LAW into DESCRIPTIVE_PAPERS');
}

// Write updated index.html
fs.writeFileSync('index.html', html, 'utf8');
console.log('🎉 index.html successfully updated with Corporate and Economic Laws (CEL)!');

