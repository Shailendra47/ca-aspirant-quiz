const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const indexPath = path.join(rootDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const frCatalog = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'fr', 'fr_topics_catalog.json'), 'utf8'));
const fullMockQs = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'fr', 'fr_full_paper_100q.json'), 'utf8'));

// Load all 13 topics
const allTopicsMap = {};
for (let tId = 1; tId <= 13; tId++) {
  const tFile = frCatalog.topics.find(t => t.topicId === tId).fileName;
  allTopicsMap[tId] = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'fr', tFile), 'utf8'));
}

console.log(`Loaded Catalog (13 topics), Full Mock (${fullMockQs.length} Qs), and all 13 topic datasets.`);

// 1. Inject FR Data before CHAPTER_META
const frDataInjection = `    // =========================================================================
    // FINANCIAL REPORTING (FR) GROUP 1 SPECIALIZED DATA (13 TOPICS & 100Q FULL MOCK)
    // =========================================================================
    const FR_CATALOG = ${JSON.stringify(frCatalog, null, 2)};
    const FR_FULL_MOCK_QUESTIONS = ${JSON.stringify(fullMockQs, null, 2)};
    const FR_TOPIC_QUESTIONS = ${JSON.stringify(allTopicsMap, null, 2)};

`;

const metaMarker = '    // Chapter & Real Paper Metadata (Official ICAI 100-Mark Pattern)';
if (!html.includes('const FR_FULL_MOCK_QUESTIONS =')) {
  html = html.replace(metaMarker, frDataInjection + metaMarker);
  console.log('Injected FR_CATALOG, FR_FULL_MOCK_QUESTIONS, and FR_TOPIC_QUESTIONS into index.html');
}

// 2. Add FR_FULL_MOCK and FR_TOPIC_1..13 to CHAPTER_META
const metaTarget = "      'REAL_PAPER_1': {";
const frMetaAdditions = `      'FR_FULL_MOCK': {
        title: "Paper 1: Financial Reporting (FR) - Comprehensive Grand Examination",
        shortTitle: "FR Full Exam (100 Qs)",
        total: 100,
        marksPerQ: 2,
        totalMarks: 200,
        time: 180,
        isRealPaper: true,
        group: "Group I",
        difficulty: "Difficult",
        pattern: "Comprehensive 13-Topic Examination"
      },
      'FR_TOPIC_1': { title: "FR Topic 1: Conceptual Framework for Financial Reporting", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_TOPIC_2': { title: "FR Topic 2: Ind AS for General & Specialised Entities", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_TOPIC_3': { title: "FR Topic 3: PPE, Intangible Assets, and Impairment", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_TOPIC_4': { title: "FR Topic 4: Revenue Recognition and Construction Contracts", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_TOPIC_5': { title: "FR Topic 5: Leases, Employee Benefits, Share-Based Payments, and Taxes", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_TOPIC_6': { title: "FR Topic 6: Provisions, Contingent Liabilities, and Events After Reporting Period", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_TOPIC_7': { title: "FR Topic 7: Financial Instruments: Recognition, Measurement, and Classification", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_TOPIC_8': { title: "FR Topic 8: Business Combinations and Consolidated Financial Statements", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_TOPIC_9': { title: "FR Topic 9: Associates and Joint Arrangements (Ind AS 28, 111)", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_TOPIC_10': { title: "FR Topic 10: Foreign Currency Transactions and Hyperinflation", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_TOPIC_11': { title: "FR Topic 11: Government Grants and Borrowing Costs", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_TOPIC_12': { title: "FR Topic 12: Interim and Segment Reporting (Ind AS 34, 108)", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'FR_TOPIC_13': { title: "FR Topic 13: Insurance, Banking, and NBFC Entities", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
`;

if (!html.includes("'FR_FULL_MOCK': {")) {
  html = html.replace(metaTarget, frMetaAdditions + metaTarget);
  console.log('Added FR_FULL_MOCK and FR_TOPIC_1..13 to CHAPTER_META');
}

// 3. Update Paper 1 Card HTML
const oldP1CardFull = `          <!-- PAPER 1 (Group I) -->
          <div class="full-paper-card paper-texture rounded-2xl border-2 border-icai-gold p-5 sm:p-6 shadow-book hover:shadow-xl transition flex flex-col justify-between relative overflow-hidden" data-group="G1">
            <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-800 via-icai-navy to-indigo-600"></div>
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-icai-navy text-amber-200 text-[10px] font-bold uppercase tracking-wider">Group I • Paper 1</span>
                <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold">100 Marks</span>
              </div>
              <h3 class="text-base sm:text-lg font-bold font-display text-icai-navy">Financial Reporting (FR)</h3>
              <p class="text-xs text-stone-600 mt-2 font-serif leading-relaxed">
                Ind AS 115 Revenue, Ind AS 103 Business Combinations, Ind AS 110 Consolidation, Ind AS 109 Financial Instruments, Ind AS 116 Leases &amp; First-time Adoption.
              </p>
              
              <div class="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs font-serif">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section A (40M):</span>
                  <span class="font-mono text-emerald-800 font-bold">20 Case MCQs • 15 Mins • Difficult PYQs</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section B (60M):</span>
                  <span class="font-mono text-stone-700 font-semibold">Ind AS Consolidation &amp; Cases</span>
                </div>
              </div>
            </div>

            <div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2">
              <button onclick="openPreTestInstructions('REAL_PAPER_1')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1">
                <span>✍️</span><span>Section A (20 Qs • 15 Mins)</span>
              </button>
              <button onclick="openDescriptivePaperModal('PAPER_1')" class="w-full sm:flex-1 py-2 px-2.5 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-lg text-xs border border-stone-300 transition flex items-center justify-center gap-1">
                <span>📄</span><span>Section B (70M)</span>
              </button>
            </div>
          </div>`;

const newP1CardFull = `          <!-- PAPER 1 (Group I) -->
          <div class="full-paper-card paper-texture rounded-2xl border-2 border-icai-gold p-5 sm:p-6 shadow-book hover:shadow-xl transition flex flex-col justify-between relative overflow-hidden" data-group="G1">
            <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-800 via-icai-navy to-indigo-600"></div>
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-icai-navy text-amber-200 text-[10px] font-bold uppercase tracking-wider">Group I • Paper 1</span>
                <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold">100 / 200 Marks</span>
              </div>
              <h3 class="text-base sm:text-lg font-bold font-display text-icai-navy">Financial Reporting (FR)</h3>
              <p class="text-xs text-stone-600 mt-2 font-serif leading-relaxed">
                Complete 13-Topic Coverage: Conceptual Framework, General &amp; Specialised Entities, PPE/Intangibles, Ind AS 115, Leases/Taxes, Provisions, Financial Instruments, Business Combinations, Associates, Forex, Grants, Segments &amp; Banking/NBFC.
              </p>
              
              <div class="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs font-serif">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Full Test (13 Topics):</span>
                  <span class="font-mono text-emerald-800 font-bold">100 Qs • 3 Hours • 200 Marks</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">13 Topic Tests:</span>
                  <span class="font-mono text-stone-700 font-semibold">20 Qs • 15 Mins Each • 40M</span>
                </div>
              </div>
            </div>

            <div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col gap-2">
              <div class="flex flex-col sm:flex-row items-center gap-2">
                <button onclick="openPreTestInstructions('FR_FULL_MOCK')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1.5">
                  <span>⚡</span><span>Full Test (100 Qs • 3 Hours)</span>
                </button>
                <button onclick="openFrTopicsModal()" class="w-full sm:flex-1 py-2 px-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold rounded-lg text-xs border border-amber-300 transition flex items-center justify-center gap-1.5 shadow-2xs">
                  <span>📚</span><span>13 Topic Tests (20-20 Qs)</span>
                </button>
              </div>
              <div class="flex flex-col sm:flex-row items-center gap-2">
                <button onclick="openPreTestInstructions('REAL_PAPER_1')" class="w-full sm:flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg text-[11px] border border-stone-300 transition flex items-center justify-center gap-1">
                  <span>✍️</span><span>Section A Sprint (20 Qs • 15M)</span>
                </button>
                <button onclick="openDescriptivePaperModal('PAPER_1')" class="w-full sm:flex-1 py-1.5 px-2 bg-white hover:bg-stone-100 text-stone-800 font-semibold rounded-lg text-[11px] border border-stone-300 transition flex items-center justify-center gap-1">
                  <span>📄</span><span>Section B (70M Descriptive)</span>
                </button>
              </div>
            </div>
          </div>`;

html = html.replace(oldP1CardFull, newP1CardFull);
console.log('Replaced Paper 1 card with Full Test (100 Qs • 3 Hours) and Topic Tests launcher');

// 4. Update openPreTestInstructions question loading & meta display
const oldFilterCode = `if (testKey === 'REAL_PAPER_1') {
        currentTestQuestions = (typeof GROUP1_P1_QUESTIONS !== 'undefined' && GROUP1_P1_QUESTIONS.length) ? GROUP1_P1_QUESTIONS : QUESTIONS.slice(0, 20);`;

const newFilterCode = `if (testKey === 'FR_FULL_MOCK') {
        currentTestQuestions = (typeof FR_FULL_MOCK_QUESTIONS !== 'undefined' && FR_FULL_MOCK_QUESTIONS.length) ? FR_FULL_MOCK_QUESTIONS : QUESTIONS.slice(0, 100);
      } else if (String(testKey).startsWith('FR_TOPIC_')) {
        const tId = Number(String(testKey).replace('FR_TOPIC_', ''));
        currentTestQuestions = (typeof FR_TOPIC_QUESTIONS !== 'undefined' && FR_TOPIC_QUESTIONS[tId]) ? FR_TOPIC_QUESTIONS[tId] : QUESTIONS.slice(0, 20);
      } else if (testKey === 'REAL_PAPER_1') {
        currentTestQuestions = (typeof GROUP1_P1_QUESTIONS !== 'undefined' && GROUP1_P1_QUESTIONS.length) ? GROUP1_P1_QUESTIONS : QUESTIONS.slice(0, 20);`;

html = html.replace(oldFilterCode, newFilterCode);

// Update PreTest Instructions Display for FR_FULL_MOCK and FR_TOPIC
const oldPreTestBranch = `      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(testKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(testKey));
      const testTime = meta.time || ((isG1Paper || isG1Chapter) ? 15 : 20);

      if (isG1Paper) {`;

const newPreTestBranch = `      const isFrFullMock = (testKey === 'FR_FULL_MOCK');
      const isFrTopic = String(testKey).startsWith('FR_TOPIC_');
      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(testKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(testKey));
      const testTime = meta.time || ((isG1Paper || isG1Chapter || isFrTopic) ? 15 : 20);

      if (isFrFullMock) {
        if (typeBadge) typeBadge.textContent = 'Group I • Paper 1 Financial Reporting (FR) Full Examination';
        if (govtBannerTitle) govtBannerTitle.textContent = 'Paper 1: Financial Reporting (FR) Comprehensive Grand Test (100 Questions • 3 Hours)';
        if (govtBannerText) govtBannerText.textContent = 'All 13 Financial Reporting Topics Included: Conceptual Framework, Ind AS 115, PPE, Financial Instruments, Business Combinations, Consolidation, Leases, Taxes, Provisions, Associates, Forex, Grants, Segments & Sectoral Standards. Total 100 Questions | 3 Hours (180 Minutes) | 200 Marks (+2.00/Q, No Negative Marking).';
        document.getElementById('instDuration').textContent = '180';
        if (durationUnit) durationUnit.textContent = 'Mins (3 Hours Active Countdown)';
        document.getElementById('instTimeLimit').textContent = '180';
        document.getElementById('instMaxMarks').textContent = '200 Marks (100 Qs × 2M • 0 Neg.)';
        document.getElementById('instTotalQs').textContent = '100 Questions (All 13 Topics Covered)';
      } else if (isFrTopic) {
        if (typeBadge) typeBadge.textContent = 'Group I • Financial Reporting (FR) Topic-Wise Practice Test';
        if (govtBannerTitle) govtBannerTitle.textContent = 'FR Topic-Wise 20-20 Standard — 15 Mins Speed Mastery';
        if (govtBannerText) govtBannerText.textContent = '20 Case-Based Difficult Questions | 15 Minutes CBT Timing | 40 Marks (+2.00, Zero Negative Marking). Sourced from authentic ICAI CA Final Previous Year Question papers.';
        document.getElementById('instDuration').textContent = '15';
        if (durationUnit) durationUnit.textContent = 'Mins (15:00 Countdown)';
        document.getElementById('instTimeLimit').textContent = '15';
        document.getElementById('instMaxMarks').textContent = '40 Marks (20 Qs × 2M • 0 Neg.)';
        document.getElementById('instTotalQs').textContent = '20 Questions (Case-Based PYQs)';
      } else if (isG1Paper) {`;

html = html.replace(oldPreTestBranch, newPreTestBranch);

// Add rules list condition for isFrFullMock and isFrTopic
const oldRulesBranch = `      if (rulesList) {
        if (isG1Paper) {`;

const newRulesBranch = `      if (rulesList) {
        if (isFrFullMock) {
          rulesList.innerHTML = \`
            <li><strong>Comprehensive 13-Topic Coverage:</strong> This examination comprises exactly <strong>100 High-Difficulty Multiple Choice Questions</strong> drawn proportionately across all 13 core Financial Reporting topics.</li>
            <li><strong>Strict 3-Hour (180 Minutes) Timing:</strong> Full-length national mock simulation. The CBT timer counts down from <strong>03:00:00 (180 minutes)</strong>.</li>
            <li><strong>Marking Scheme:</strong> Each question carries <strong>2.00 Marks</strong> (Total Maximum Marks: <strong>200 Marks</strong>).</li>
            <li><strong>Zero Negative Marking (0.00 Penalty):</strong> In strict accordance with the official ICAI New Scheme regulations, there is <strong>NO negative marking</strong> for incorrect responses. Attempt all questions.</li>
            <li><strong>Difficult Case-Based PYQs:</strong> Features realistic corporate case studies with complex computations (PPA calculations, lease modifications, effective interest rates, deferred tax adjustments).</li>
            <li><strong>Authoritative Statutory Solutions:</strong> Comprehensive step-by-step mathematical working notes and Ind AS citations are displayed immediately upon submission.</li>
            <li>Ensure you submit your answers before you navigate away or close your browser.</li>
          \`;
        } else if (isFrTopic) {
          rulesList.innerHTML = \`
            <li><strong>20-20 Topic Mastery Standard:</strong> This test comprises exactly <strong>20 Difficult Level Case-Scenario Multiple Choice Questions</strong> dedicated exclusively to this specific Financial Reporting module.</li>
            <li><strong>Strict 15-Minute Countdown Timing:</strong> Designed for rapid speed conditioning and deep conceptual mastery. The exam timer counts down from <strong>15:00 minutes</strong>.</li>
            <li><strong>Marks Allocation:</strong> Each question carries <strong>2.00 Marks</strong> (Total Maximum Marks: <strong>40 Marks</strong>).</li>
            <li><strong>Zero Negative Marking:</strong> No negative marking for incorrect responses.</li>
            <li><strong>Authoritative Statutory Solutions:</strong> Step-by-step workings and Ind AS paragraph citations are provided upon submission.</li>
            <li>Ensure you complete the test before submitting.</li>
          \`;
        } else if (isG1Paper) {`;

html = html.replace(oldRulesBranch, newRulesBranch);

// 5. Update launchCbtExam section tags
const oldCbtLabels = `      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(currentTestKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(currentTestKey));`;

const newCbtLabels = `      const isFrFullMock = (currentTestKey === 'FR_FULL_MOCK');
      const isFrTopic = String(currentTestKey).startsWith('FR_TOPIC_');
      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(currentTestKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(currentTestKey));`;

html = html.replace(oldCbtLabels, newCbtLabels);

const oldSectionTagLogic = `        if (isG1Paper) {
          sectionTag.textContent = 'Section A: 20 Case MCQs (40 Marks • 15 Mins)';
        } else if (isG1Chapter) {
          sectionTag.textContent = '20-20 Sectional MCQs (40 Marks • 15 Mins)';
        } else {
          sectionTag.textContent = meta.isRealPaper ? 'Section A: MCQs (30 Marks)' : '20-20 Sectional MCQs (40 Marks)';
        }`;

const newSectionTagLogic = `        if (isFrFullMock) {
          sectionTag.textContent = 'Financial Reporting Full Exam (100 Qs • 3 Hours • 200 Marks)';
        } else if (isFrTopic) {
          sectionTag.textContent = 'FR Topic Test (20 Qs • 15 Mins • 40 Marks)';
        } else if (isG1Paper) {
          sectionTag.textContent = 'Section A: 20 Case MCQs (40 Marks • 15 Mins)';
        } else if (isG1Chapter) {
          sectionTag.textContent = '20-20 Sectional MCQs (40 Marks • 15 Mins)';
        } else {
          sectionTag.textContent = meta.isRealPaper ? 'Section A: MCQs (30 Marks)' : '20-20 Sectional MCQs (40 Marks)';
        }`;

html = html.replace(oldSectionTagLogic, newSectionTagLogic);

// 6. Add Financial Reporting 13 Topics Modal in HTML body
const modalHTML = `
  <!-- ==================== FINANCIAL REPORTING (FR) 13 TOPICS MODAL ==================== -->
  <div id="frTopicsModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
    <div class="paper-texture bg-[#FDFBF7] rounded-2xl border-2 border-icai-gold shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
      <!-- Modal Header -->
      <div class="px-6 py-4 bg-gradient-to-r from-icai-navy via-blue-900 to-indigo-950 text-amber-50 flex items-center justify-between border-b border-icai-gold/40">
        <div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="px-2 py-0.5 rounded bg-icai-gold/30 text-amber-200 text-[10px] font-bold uppercase tracking-wider">Group I • Paper 1</span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">13 Separate Topic Tests</span>
          </div>
          <h3 class="text-lg font-bold font-display text-white">Financial Reporting (FR) — Topic-Wise Practice Tests</h3>
          <p class="text-xs text-amber-200/80 font-serif">Each topic features 20 Questions • 15 Minutes • 40 Marks (+2.00, No Negative Marking) • Difficult Case-Based PYQs.</p>
        </div>
        <button onclick="closeFrTopicsModal()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition">
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
              <span class="text-stone-600 font-serif">Attempt all 13 topics combined in a single 100-question, 3-hour national mock test.</span>
            </div>
          </div>
          <button onclick="closeFrTopicsModal(); openPreTestInstructions('FR_FULL_MOCK')" class="px-4 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shrink-0 shadow-xs border border-icai-gold/40 transition">
            Attempt Full Test (100 Qs • 3 Hrs)
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1" id="frTopicsContainer">
          <!-- Populated by JavaScript or fallback static cards -->
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
        <span class="font-serif">Total 260 Case-Based PYQs across 13 Specialized Modules</span>
        <button onclick="closeFrTopicsModal()" class="px-4 py-1.5 rounded-lg bg-stone-300 hover:bg-stone-400 text-stone-800 font-bold transition">
          Close
        </button>
      </div>
    </div>
  </div>
`;

if (!html.includes('id="frTopicsModal"')) {
  html = html.replace('</body>', modalHTML + '\n</body>');
  console.log('Injected frTopicsModal HTML');
}

// 7. Add helper functions for FR Topics Modal in JavaScript
const modalJs = `
    function openFrTopicsModal() {
      const modal = document.getElementById('frTopicsModal');
      const container = document.getElementById('frTopicsContainer');
      if (!modal) return;

      if (container && typeof FR_CATALOG !== 'undefined' && FR_CATALOG.topics) {
        container.innerHTML = FR_CATALOG.topics.map(t => \`
          <div class="p-4 rounded-xl border border-stone-300 bg-white hover:border-icai-gold hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-[11px] mb-1.5">
                <span class="font-bold text-icai-burgundy font-serif">Topic \${t.topicId}</span>
                <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">20 Qs • 15 Mins</span>
              </div>
              <h4 class="font-bold text-icai-navy text-xs sm:text-sm font-display leading-snug">\${t.topicTitle}</h4>
              <div class="mt-2 text-[11px] text-stone-600 flex items-center gap-2 font-serif">
                <span class="font-semibold text-emerald-800">40 Marks (+2.00, 0 Neg.)</span>
                <span>•</span>
                <span class="text-amber-800 font-medium">Difficult PYQs</span>
              </div>
            </div>
            <button onclick="closeFrTopicsModal(); openPreTestInstructions('FR_TOPIC_\${t.topicId}')" class="w-full mt-3 py-1.5 px-3 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30 flex items-center justify-center gap-1">
              <span>✍️</span><span>Attempt Test (20 Qs • 15 Mins)</span>
            </button>
          </div>
        \`).join('');
      }

      modal.classList.remove('hidden');
    }

    function closeFrTopicsModal() {
      const modal = document.getElementById('frTopicsModal');
      if (modal) modal.classList.add('hidden');
    }
`;

if (!html.includes('function openFrTopicsModal')) {
  html = html.replace('// Global Active State', modalJs + '\n    // Global Active State');
  console.log('Injected openFrTopicsModal and closeFrTopicsModal functions');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully updated index.html with all 13 FR Topics & 100-Question 3-Hour Full Test!');

