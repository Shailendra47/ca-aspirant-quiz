const fs = require('fs');
const path = require('path');

console.log('Reading index.html and Audit datasets...');
let html = fs.readFileSync('index.html', 'utf8');

const auditCatalog = JSON.parse(fs.readFileSync('data/audit/audit_topics_catalog.json', 'utf8'));
const auditFullMock = JSON.parse(fs.readFileSync('data/audit/audit_full_paper_100q.json', 'utf8'));
const auditTopicQuestions = {};
for (let i = 1; i <= 11; i++) {
  const fName = auditCatalog.topics.find(t => t.topicId === i).fileName;
  auditTopicQuestions[i] = JSON.parse(fs.readFileSync(path.join('data', 'audit', fName), 'utf8'));
}

console.log('Audit datasets loaded successfully.');

// 1. Update Paper 3 Card buttons in index.html
const oldPaper3Buttons = `<div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2">
              <button onclick="openPreTestInstructions('REAL_PAPER_3')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1">
                <span>✍️</span><span>Section A</span>
              </button>
              <button onclick="openDescriptivePaperModal('PAPER_3')" class="w-full sm:flex-1 py-2 px-2.5 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-lg text-xs border border-stone-300 transition flex items-center justify-center gap-1">
                <span>📄</span><span>Section B (70M)</span>
              </button>
            </div>`;

const newPaper3Buttons = `<div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col gap-2">
              <div class="flex flex-col sm:flex-row items-center gap-2">
                <button onclick="openPreTestInstructions('AUDIT_FULL_MOCK')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1.5">
                  <span>⚡</span><span>Full Test (100 Qs • 3 Hours)</span>
                </button>
                <button onclick="openAuditTopicsModal()" class="w-full sm:flex-1 py-2 px-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold rounded-lg text-xs border border-amber-300 transition flex items-center justify-center gap-1.5 shadow-2xs">
                  <span>📚</span><span>11 Topic Tests (20-20 Qs)</span>
                </button>
              </div>
              <div class="flex flex-col sm:flex-row items-center gap-2">
                <button onclick="openPreTestInstructions('REAL_PAPER_3')" class="w-full sm:flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg text-[11px] border border-stone-300 transition flex items-center justify-center gap-1">
                  <span>✍️</span><span>Section A</span>
                </button>
                <button onclick="openDescriptivePaperModal('PAPER_3')" class="w-full sm:flex-1 py-1.5 px-2 bg-white hover:bg-stone-100 text-stone-800 font-semibold rounded-lg text-[11px] border border-stone-300 transition flex items-center justify-center gap-1">
                  <span>📄</span><span>Section B (70M Descriptive)</span>
                </button>
              </div>
            </div>`;

if (html.includes(oldPaper3Buttons)) {
  html = html.replace(oldPaper3Buttons, newPaper3Buttons);
  console.log('✅ Updated Paper 3 Card dual action buttons');
} else {
  console.warn('⚠️ oldPaper3Buttons target not found directly, checking...');
}

// 2. Add openAuditTopicsModal and closeAuditTopicsModal functions
const oldAfmModalFns = `    function openAfmTopicsModal() {`;
const auditModalFns = `    function openAuditTopicsModal() {
      const modal = document.getElementById('auditTopicsModal');
      const container = document.getElementById('auditTopicsContainer');
      if (!modal) return;

      if (container && typeof AUDIT_CATALOG !== 'undefined' && AUDIT_CATALOG.topics) {
        container.innerHTML = AUDIT_CATALOG.topics.map(t => \`
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
            <button onclick="closeAuditTopicsModal(); openPreTestInstructions('AUDIT_TOPIC_\${t.topicId}')" class="w-full mt-3 py-1.5 px-3 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30 flex items-center justify-center gap-1">
              <span>✍️</span><span>Attempt Test (20 Qs • 15 Mins)</span>
            </button>
          </div>
        \`).join('');
      }

      modal.classList.remove('hidden');
    }

    function closeAuditTopicsModal() {
      const modal = document.getElementById('auditTopicsModal');
      if (modal) modal.classList.add('hidden');
    }

    function openAfmTopicsModal() {`;

if (html.includes(oldAfmModalFns) && !html.includes('openAuditTopicsModal')) {
  html = html.replace(oldAfmModalFns, auditModalFns);
  console.log('✅ Injected openAuditTopicsModal and closeAuditTopicsModal functions');
}

// 3. Inject AUDIT_CATALOG, AUDIT_FULL_MOCK_QUESTIONS, and AUDIT_TOPIC_QUESTIONS
const chapterMetaMarker = `    // Chapter & Real Paper Metadata (Official ICAI 100-Mark Pattern)\n    const CHAPTER_META = {`;

const auditDataInjection = `    // =========================================================================
    // ADVANCED AUDITING, ASSURANCE & PROFESSIONAL ETHICS (AAAPE) DATA (11 TOPICS & 100Q FULL MOCK)
    // =========================================================================
    const AUDIT_CATALOG = ${JSON.stringify(auditCatalog, null, 2)};
    const AUDIT_FULL_MOCK_QUESTIONS = ${JSON.stringify(auditFullMock.questions, null, 2)};
    const AUDIT_TOPIC_QUESTIONS = ${JSON.stringify(auditTopicQuestions, null, 2)};

    // Chapter & Real Paper Metadata (Official ICAI 100-Mark Pattern)
    const CHAPTER_META = {`;

if (html.includes(chapterMetaMarker) && !html.includes('const AUDIT_CATALOG =')) {
  html = html.replace(chapterMetaMarker, auditDataInjection);
  console.log('✅ Injected AUDIT_CATALOG, AUDIT_FULL_MOCK_QUESTIONS, and AUDIT_TOPIC_QUESTIONS');
}

// 4. Add AUDIT_FULL_MOCK and AUDIT_TOPIC_1 to 11 to CHAPTER_META
const afmFullMockEntry = `      'AFM_FULL_MOCK': {`;
const auditChapterMetaEntries = `      'AUDIT_FULL_MOCK': {
        title: "Paper 3: Advanced Auditing, Assurance and Professional Ethics (AAAPE) - Full Grand Examination",
        shortTitle: "AAAPE Full Exam (100 Qs)",
        total: 100,
        marksPerQ: 2,
        totalMarks: 200,
        time: 180,
        isRealPaper: true,
        group: "Group I",
        difficulty: "Difficult",
        pattern: "Comprehensive 11-Topic Examination"
      },
      'AUDIT_TOPIC_1': { title: "AAAPE Topic 1: Standards on Auditing (SA) and Audit Process", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AUDIT_TOPIC_2': { title: "AAAPE Topic 2: Audit Planning, Risk Assessment & Internal Control", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AUDIT_TOPIC_3': { title: "AAAPE Topic 3: Audit of Specific Entities: Banks, Insurance & Govt", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AUDIT_TOPIC_4': { title: "AAAPE Topic 4: Group Audits and the Work of Other Auditors", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AUDIT_TOPIC_5': { title: "AAAPE Topic 5: Audit Documentation, Reporting & Modified Opinions", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AUDIT_TOPIC_6': { title: "AAAPE Topic 6: Assurance Engagements and Attestation Services", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AUDIT_TOPIC_7': { title: "AAAPE Topic 7: Internal Audit and Forensic Audit", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AUDIT_TOPIC_8': { title: "AAAPE Topic 8: Due Diligence and Special Purpose Audits", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AUDIT_TOPIC_9': { title: "AAAPE Topic 9: Digital Auditing and CAATs (Rule 11(g) Audit Trail)", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AUDIT_TOPIC_10': { title: "AAAPE Topic 10: Corporate Governance and Quality Control (SQC 1)", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AUDIT_TOPIC_11': { title: "AAAPE Topic 11: Code of Ethics and Professional Misconduct", total: 20, marksPerQ: 2, totalMarks: 40, time: 15, group: "Group I", difficulty: "Difficult", pattern: "Case-Based PYQs" },
      'AFM_FULL_MOCK': {`;

if (html.includes(afmFullMockEntry) && !html.includes('AUDIT_FULL_MOCK')) {
  html = html.replace(afmFullMockEntry, auditChapterMetaEntries);
  console.log('✅ Added AUDIT_FULL_MOCK and AUDIT_TOPIC_1 to 11 to CHAPTER_META');
}

// 5. Update openPreTestInstructions to resolve Audit questions
const afmPreTestFilter = `      } else if (String(testKey).startsWith('AFM_TOPIC_')) {
        const tId = Number(String(testKey).replace('AFM_TOPIC_', ''));
        currentTestQuestions = (typeof AFM_TOPIC_QUESTIONS !== 'undefined' && AFM_TOPIC_QUESTIONS[tId]) ? AFM_TOPIC_QUESTIONS[tId] : QUESTIONS.slice(0, 20);
      }`;

const newAuditPreTestFilter = `      } else if (String(testKey).startsWith('AFM_TOPIC_')) {
        const tId = Number(String(testKey).replace('AFM_TOPIC_', ''));
        currentTestQuestions = (typeof AFM_TOPIC_QUESTIONS !== 'undefined' && AFM_TOPIC_QUESTIONS[tId]) ? AFM_TOPIC_QUESTIONS[tId] : QUESTIONS.slice(0, 20);
      } else if (testKey === 'AUDIT_FULL_MOCK') {
        currentTestQuestions = (typeof AUDIT_FULL_MOCK_QUESTIONS !== 'undefined' && AUDIT_FULL_MOCK_QUESTIONS.length) ? AUDIT_FULL_MOCK_QUESTIONS : QUESTIONS.slice(0, 100);
      } else if (String(testKey).startsWith('AUDIT_TOPIC_')) {
        const tId = Number(String(testKey).replace('AUDIT_TOPIC_', ''));
        currentTestQuestions = (typeof AUDIT_TOPIC_QUESTIONS !== 'undefined' && AUDIT_TOPIC_QUESTIONS[tId]) ? AUDIT_TOPIC_QUESTIONS[tId] : QUESTIONS.slice(0, 20);
      }`;

if (html.includes(afmPreTestFilter) && !html.includes("testKey === 'AUDIT_FULL_MOCK'")) {
  html = html.replace(afmPreTestFilter, newAuditPreTestFilter);
  console.log('✅ Updated openPreTestInstructions question loading for Audit');
}

// 6. Update openPreTestInstructions flags and banner
const oldFlags = `      const isFrFullMock = (testKey === 'FR_FULL_MOCK');
      const isFrTopic = String(testKey).startsWith('FR_TOPIC_');
      const isAfmFullMock = (testKey === 'AFM_FULL_MOCK');
      const isAfmTopic = String(testKey).startsWith('AFM_TOPIC_');
      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(testKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(testKey));
      const testTime = meta.time || ((isG1Paper || isG1Chapter || isFrTopic || isAfmTopic) ? 15 : 20);`;

const newFlags = `      const isFrFullMock = (testKey === 'FR_FULL_MOCK');
      const isFrTopic = String(testKey).startsWith('FR_TOPIC_');
      const isAfmFullMock = (testKey === 'AFM_FULL_MOCK');
      const isAfmTopic = String(testKey).startsWith('AFM_TOPIC_');
      const isAuditFullMock = (testKey === 'AUDIT_FULL_MOCK');
      const isAuditTopic = String(testKey).startsWith('AUDIT_TOPIC_');
      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(testKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(testKey));
      const testTime = meta.time || ((isG1Paper || isG1Chapter || isFrTopic || isAfmTopic || isAuditTopic) ? 15 : 20);`;

if (html.includes(oldFlags)) {
  html = html.replace(oldFlags, newFlags);
  console.log('✅ Updated openPreTestInstructions isAuditFullMock and isAuditTopic flags');
}

const oldBannerChain = `      } else if (isAfmTopic) {
        if (typeBadge) typeBadge.textContent = 'Group I • Advanced Financial Management (AFM) Topic-Wise Practice Test';
        if (govtBannerTitle) govtBannerTitle.textContent = 'AFM Topic-Wise 20-20 Standard — 15 Mins Speed Mastery';
        if (govtBannerText) govtBannerText.textContent = '20 Case-Based Difficult Questions | 15 Minutes CBT Timing | 40 Marks (+2.00, Zero Negative Marking). Sourced from authentic ICAI CA Final Previous Year Question papers.';
        document.getElementById('instDuration').textContent = '15';
        if (durationUnit) durationUnit.textContent = 'Mins (15:00 Countdown)';
        document.getElementById('instTimeLimit').textContent = '15';
        document.getElementById('instMaxMarks').textContent = '40 Marks (20 Qs × 2M • 0 Neg.)';
        document.getElementById('instTotalQs').textContent = '20 Questions (Case-Based PYQs)';
      } else if (isG1Paper) {`;

const newBannerChain = `      } else if (isAfmTopic) {
        if (typeBadge) typeBadge.textContent = 'Group I • Advanced Financial Management (AFM) Topic-Wise Practice Test';
        if (govtBannerTitle) govtBannerTitle.textContent = 'AFM Topic-Wise 20-20 Standard — 15 Mins Speed Mastery';
        if (govtBannerText) govtBannerText.textContent = '20 Case-Based Difficult Questions | 15 Minutes CBT Timing | 40 Marks (+2.00, Zero Negative Marking). Sourced from authentic ICAI CA Final Previous Year Question papers.';
        document.getElementById('instDuration').textContent = '15';
        if (durationUnit) durationUnit.textContent = 'Mins (15:00 Countdown)';
        document.getElementById('instTimeLimit').textContent = '15';
        document.getElementById('instMaxMarks').textContent = '40 Marks (20 Qs × 2M • 0 Neg.)';
        document.getElementById('instTotalQs').textContent = '20 Questions (Case-Based PYQs)';
      } else if (isAuditFullMock) {
        if (typeBadge) typeBadge.textContent = 'Group I • Paper 3 Advanced Auditing & Professional Ethics (AAAPE) Full Examination';
        if (govtBannerTitle) govtBannerTitle.textContent = 'Paper 3: Advanced Auditing, Assurance and Professional Ethics Comprehensive Grand Test (100 Questions • 3 Hours)';
        if (govtBannerText) govtBannerText.textContent = 'All 11 AAAPE Topics Included: Standards on Auditing, Audit Planning & Risk, Banks & Insurance, Group Audits, Documentation & Opinions, Assurance & Attestation, Internal & Forensic Audit, Due Diligence, Digital Auditing & CAATs, Corporate Governance & Quality Control, and Code of Ethics. Total 100 Questions | 3 Hours (180 Minutes) | 200 Marks (+2.00/Q, No Negative Marking).';
        document.getElementById('instDuration').textContent = '180';
        if (durationUnit) durationUnit.textContent = 'Mins (3 Hours Active Countdown)';
        document.getElementById('instTimeLimit').textContent = '180';
        document.getElementById('instMaxMarks').textContent = '200 Marks (100 Qs × 2M • 0 Neg.)';
        document.getElementById('instTotalQs').textContent = '100 Questions (All 11 Topics Covered)';
      } else if (isAuditTopic) {
        if (typeBadge) typeBadge.textContent = 'Group I • Advanced Auditing (AAAPE) Topic-Wise Practice Test';
        if (govtBannerTitle) govtBannerTitle.textContent = 'AAAPE Topic-Wise 20-20 Standard — 15 Mins Speed Mastery';
        if (govtBannerText) govtBannerText.textContent = '20 Case-Based Difficult Questions | 15 Minutes CBT Timing | 40 Marks (+2.00, Zero Negative Marking). Sourced from authentic ICAI CA Final Previous Year Question papers.';
        document.getElementById('instDuration').textContent = '15';
        if (durationUnit) durationUnit.textContent = 'Mins (15:00 Countdown)';
        document.getElementById('instTimeLimit').textContent = '15';
        document.getElementById('instMaxMarks').textContent = '40 Marks (20 Qs × 2M • 0 Neg.)';
        document.getElementById('instTotalQs').textContent = '20 Questions (Case-Based PYQs)';
      } else if (isG1Paper) {`;

if (html.includes(oldBannerChain)) {
  html = html.replace(oldBannerChain, newBannerChain);
  console.log('✅ Injected openPreTestInstructions banner blocks for Audit');
}

// 7. Update rulesList for Audit
const oldRulesChain = `        } else if (isAfmTopic) {
          rulesList.innerHTML = \`
            <li><strong>20-20 Topic Mastery Standard:</strong> This test comprises exactly <strong>20 Difficult Level Case-Scenario Multiple Choice Questions</strong> dedicated exclusively to this specific Advanced Financial Management module.</li>
            <li><strong>Strict 15-Minute Countdown Timing:</strong> Designed for rapid speed conditioning and quantitative problem-solving mastery. The exam timer counts down from <strong>15:00 minutes</strong>.</li>
            <li><strong>Marks Allocation:</strong> Each question carries <strong>2.00 Marks</strong> (Total Maximum Marks: <strong>40 Marks</strong>).</li>
            <li><strong>Zero Negative Marking:</strong> No negative marking for incorrect responses.</li>
            <li><strong>Authoritative Financial Workings:</strong> Step-by-step formulas, mathematical derivations, and working notes are provided upon submission.</li>
            <li>Ensure you complete the test before submitting.</li>
          \`;
        } else if (isG1Paper) {`;

const newRulesChain = `        } else if (isAfmTopic) {
          rulesList.innerHTML = \`
            <li><strong>20-20 Topic Mastery Standard:</strong> This test comprises exactly <strong>20 Difficult Level Case-Scenario Multiple Choice Questions</strong> dedicated exclusively to this specific Advanced Financial Management module.</li>
            <li><strong>Strict 15-Minute Countdown Timing:</strong> Designed for rapid speed conditioning and quantitative problem-solving mastery. The exam timer counts down from <strong>15:00 minutes</strong>.</li>
            <li><strong>Marks Allocation:</strong> Each question carries <strong>2.00 Marks</strong> (Total Maximum Marks: <strong>40 Marks</strong>).</li>
            <li><strong>Zero Negative Marking:</strong> No negative marking for incorrect responses.</li>
            <li><strong>Authoritative Financial Workings:</strong> Step-by-step formulas, mathematical derivations, and working notes are provided upon submission.</li>
            <li>Ensure you complete the test before submitting.</li>
          \`;
        } else if (isAuditFullMock) {
          rulesList.innerHTML = \`
            <li><strong>Comprehensive 11-Topic Coverage:</strong> This examination comprises exactly <strong>100 High-Difficulty Multiple Choice Questions</strong> drawn proportionately across all 11 core Advanced Auditing, Assurance, and Professional Ethics modules.</li>
            <li><strong>Strict 3-Hour (180 Minutes) Timing:</strong> Full-length national mock simulation. The CBT timer counts down from <strong>03:00:00 (180 minutes)</strong>.</li>
            <li><strong>Marking Scheme:</strong> Each question carries <strong>2.00 Marks</strong> (Total Maximum Marks: <strong>200 Marks</strong>).</li>
            <li><strong>Zero Negative Marking (0.00 Penalty):</strong> In strict accordance with official ICAI New Scheme regulations, there is <strong>NO negative marking</strong> for incorrect responses. Attempt all questions.</li>
            <li><strong>Difficult Case-Based PYQs:</strong> Features realistic corporate audit scenarios (SA 701 KAM, modified opinions, CARO 2020 clauses, digital forensics, Benford's Law, Section 143(12) ADT-4, and Chartered Accountants Act misconduct).</li>
            <li><strong>Authoritative Statutory Solutions:</strong> Comprehensive step-by-step statutory citations, SA paragraphs, and ethical rulings are displayed immediately upon submission.</li>
            <li>Ensure you submit your answers before you navigate away or close your browser.</li>
          \`;
        } else if (isAuditTopic) {
          rulesList.innerHTML = \`
            <li><strong>20-20 Topic Mastery Standard:</strong> This test comprises exactly <strong>20 Difficult Level Case-Scenario Multiple Choice Questions</strong> dedicated exclusively to this specific Auditing &amp; Ethics module.</li>
            <li><strong>Strict 15-Minute Countdown Timing:</strong> Designed for rapid speed conditioning and statutory analytical mastery. The exam timer counts down from <strong>15:00 minutes</strong>.</li>
            <li><strong>Marks Allocation:</strong> Each question carries <strong>2.00 Marks</strong> (Total Maximum Marks: <strong>40 Marks</strong>).</li>
            <li><strong>Zero Negative Marking:</strong> No negative marking for incorrect responses.</li>
            <li><strong>Authoritative Statutory Solutions:</strong> Step-by-step reasoning, SA citations, and regulatory provisions are provided upon submission.</li>
            <li>Ensure you complete the test before submitting.</li>
          \`;
        } else if (isG1Paper) {`;

if (html.includes(oldRulesChain)) {
  html = html.replace(oldRulesChain, newRulesChain);
  console.log('✅ Injected rulesList for Audit');
}

// 8. Update launchCbtExam
const oldCbtTags = `      const isFrFullMock = (currentTestKey === 'FR_FULL_MOCK');
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

const newCbtTags = `      const isFrFullMock = (currentTestKey === 'FR_FULL_MOCK');
      const isFrTopic = String(currentTestKey).startsWith('FR_TOPIC_');
      const isAfmFullMock = (currentTestKey === 'AFM_FULL_MOCK');
      const isAfmTopic = String(currentTestKey).startsWith('AFM_TOPIC_');
      const isAuditFullMock = (currentTestKey === 'AUDIT_FULL_MOCK');
      const isAuditTopic = String(currentTestKey).startsWith('AUDIT_TOPIC_');
      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(currentTestKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(currentTestKey));
      const sectionTag = document.getElementById('cbtSectionTagBtn');
      if (sectionTag) {
        if (isFrFullMock) {
          sectionTag.textContent = 'Financial Reporting Full Exam (100 Qs • 3 Hours • 200 Marks)';
        } else if (isAfmFullMock) {
          sectionTag.textContent = 'Advanced Financial Management Full Exam (100 Qs • 3 Hours • 200 Marks)';
        } else if (isAuditFullMock) {
          sectionTag.textContent = 'Advanced Auditing Full Exam (100 Qs • 3 Hours • 200 Marks)';
        } else if (isFrTopic) {
          sectionTag.textContent = 'FR Topic Test (20 Qs • 15 Mins • 40 Marks)';
        } else if (isAfmTopic) {
          sectionTag.textContent = 'AFM Topic Test (20 Qs • 15 Mins • 40 Marks)';
        } else if (isAuditTopic) {
          sectionTag.textContent = 'Audit Topic Test (20 Qs • 15 Mins • 40 Marks)';`;

if (html.includes(oldCbtTags)) {
  html = html.replace(oldCbtTags, newCbtTags);
  console.log('✅ Injected launchCbtExam sectionTags for Audit');
}

const oldMarkingScheme = `      const markingSchemeLabel = document.getElementById('cbtMarkingSchemeLabel');
      if (markingSchemeLabel) {
        if (isFrFullMock || isAfmFullMock) {
          markingSchemeLabel.textContent = \`Grand Mock Exam: 100 Questions • 3 Hours (180 Mins) • +\${marksPerQ}.00 Marks • No Negative Marking • Difficult Case PYQs\`;
        } else if (isFrTopic || isAfmTopic) {
          markingSchemeLabel.textContent = \`Topic Sprint: 20 Questions • 15 Mins • +\${marksPerQ}.00 Marks • No Negative Marking • Difficult Case PYQs\`;`;

const newMarkingScheme = `      const markingSchemeLabel = document.getElementById('cbtMarkingSchemeLabel');
      if (markingSchemeLabel) {
        if (isFrFullMock || isAfmFullMock || isAuditFullMock) {
          markingSchemeLabel.textContent = \`Grand Mock Exam: 100 Questions • 3 Hours (180 Mins) • +\${marksPerQ}.00 Marks • No Negative Marking • Difficult Case PYQs\`;
        } else if (isFrTopic || isAfmTopic || isAuditTopic) {
          markingSchemeLabel.textContent = \`Topic Sprint: 20 Questions • 15 Mins • +\${marksPerQ}.00 Marks • No Negative Marking • Difficult Case PYQs\`;`;

if (html.includes(oldMarkingScheme)) {
  html = html.replace(oldMarkingScheme, newMarkingScheme);
  console.log('✅ Injected markingSchemeLabel for Audit');
}

// 9. Inject #auditTopicsModal dialog before </body>
const auditModalHtml = `  <!-- ==================== ADVANCED AUDITING, ASSURANCE & ETHICS (AAAPE) 11 TOPICS MODAL ==================== -->
  <div id="auditTopicsModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
    <div class="paper-texture bg-[#FDFBF7] rounded-2xl border-2 border-icai-gold shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
      <!-- Modal Header -->
      <div class="px-6 py-4 bg-gradient-to-r from-icai-navy via-slate-900 to-amber-950 text-amber-50 flex items-center justify-between border-b border-icai-gold/40">
        <div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="px-2 py-0.5 rounded bg-icai-gold/30 text-amber-200 text-[10px] font-bold uppercase tracking-wider">Group I • Paper 3</span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">11 Separate Topic Tests</span>
          </div>
          <h3 class="text-lg font-bold font-display text-white">Advanced Auditing &amp; Professional Ethics — Topic-Wise Practice Tests</h3>
          <p class="text-xs text-amber-200/80 font-serif">Each topic features 20 Questions • 15 Minutes • 40 Marks (+2.00, No Negative Marking) • Difficult Case-Based PYQs.</p>
        </div>
        <button onclick="closeAuditTopicsModal()" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition">
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
          <button onclick="closeAuditTopicsModal(); openPreTestInstructions('AUDIT_FULL_MOCK')" class="px-4 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shrink-0 shadow-xs border border-icai-gold/40 transition">
            Attempt Full Test (100 Qs • 3 Hrs)
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1" id="auditTopicsContainer">
          <!-- Populated by JavaScript -->
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
        <span class="font-serif">Total 220 Case-Based PYQs across 11 Specialized AAAPE Modules</span>
        <button onclick="closeAuditTopicsModal()" class="px-4 py-1.5 rounded-lg bg-stone-300 hover:bg-stone-400 text-stone-800 font-bold transition">
          Close
        </button>
      </div>
    </div>
  </div>\n\n`;

if (!html.includes('id="auditTopicsModal"')) {
  html = html.replace('</body>', auditModalHtml + '</body>');
  console.log('✅ Injected #auditTopicsModal dialog before </body>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('🎉 index.html updated successfully with Audit integration!');
