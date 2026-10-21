const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const indexPath = path.join(rootDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

console.log('--- 1. Updating Group 1 Paper Cards (FR, AFM, Audit) ---');

// Replace Paper 1 card Section A details and button
const oldP1Card = `<div class="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs font-serif">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section A (30M):</span>
                  <span class="font-mono text-emerald-800 font-bold">15 Case MCQs • No Neg.</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section B (70M):</span>
                  <span class="font-mono text-stone-700 font-semibold">Ind AS Consolidation &amp; Cases</span>
                </div>
              </div>
            </div>

            <div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2">
              <button onclick="openPreTestInstructions('REAL_PAPER_1')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1">
                <span>✍️</span><span>Section A (30M)</span>
              </button>`;

const newP1Card = `<div class="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs font-serif">
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
              </button>`;

// Replace Paper 2 card Section A details and button
const oldP2Card = `<div class="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs font-serif">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section A (30M):</span>
                  <span class="font-mono text-emerald-800 font-bold">15 Case MCQs • No Neg.</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section B (70M):</span>
                  <span class="font-mono text-stone-700 font-semibold">Valuation &amp; Risk Numerical Qs</span>
                </div>
              </div>
            </div>

            <div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2">
              <button onclick="openPreTestInstructions('REAL_PAPER_2')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1">
                <span>✍️</span><span>Section A (30M)</span>
              </button>`;

const newP2Card = `<div class="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs font-serif">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section A (40M):</span>
                  <span class="font-mono text-emerald-800 font-bold">20 Case MCQs • 15 Mins • Difficult PYQs</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section B (60M):</span>
                  <span class="font-mono text-stone-700 font-semibold">Valuation &amp; Risk Numerical Qs</span>
                </div>
              </div>
            </div>

            <div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2">
              <button onclick="openPreTestInstructions('REAL_PAPER_2')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1">
                <span>✍️</span><span>Section A (20 Qs • 15 Mins)</span>
              </button>`;

// Replace Paper 3 card Section A details and button
const oldP3Card = `<div class="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs font-serif">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section A (30M):</span>
                  <span class="font-mono text-emerald-800 font-bold">15 Case MCQs • No Neg.</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section B (70M):</span>
                  <span class="font-mono text-stone-700 font-semibold">5 Descriptive Qs • Model Answers</span>
                </div>
              </div>
            </div>

            <div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2">
              <button onclick="openPreTestInstructions('REAL_PAPER_3')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1">
                <span>✍️</span><span>Section A (30M)</span>
              </button>`;

const newP3Card = `<div class="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs font-serif">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section A (40M):</span>
                  <span class="font-mono text-emerald-800 font-bold">20 Case MCQs • 15 Mins • Difficult PYQs</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-bold text-icai-navy">Section B (60M):</span>
                  <span class="font-mono text-stone-700 font-semibold">5 Descriptive Qs • Model Answers</span>
                </div>
              </div>
            </div>

            <div class="mt-5 pt-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2">
              <button onclick="openPreTestInstructions('REAL_PAPER_3')" class="w-full sm:flex-1 py-2 px-2.5 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs shadow-xs border border-icai-gold/40 transition flex items-center justify-center gap-1">
                <span>✍️</span><span>Section A (20 Qs • 15 Mins)</span>
              </button>`;

html = html.replace(oldP1Card, newP1Card);
html = html.replace(oldP2Card, newP2Card);
html = html.replace(oldP3Card, newP3Card);

console.log('--- 2. Updating Chapter Test Cards (Chapters 1 to 6) ---');
// Update Section title
html = html.replace(
  '<p class="text-xs text-stone-600 font-serif">20 Questions • 20 Minutes • 40 Marks (+2.00/Q, No Negative Marking) for targeted chapter-wise mastery.</p>',
  '<p class="text-xs text-stone-600 font-serif">20 Questions • 15 Minutes • 40 Marks (+2.00/Q, No Negative Marking) • High-Difficulty Case-Based PYQs.</p>'
);

// Update all 6 chapter cards
for (let ch = 1; ch <= 6; ch++) {
  // Update badge if 20-20 Sectional Test
  html = html.replace(
    `<span class="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">20-20 Sectional Test</span>`,
    `<span class="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">20-20 Sectional (15 Mins)</span>`
  );

  // Update 20 Mins to 15 Mins in meta row
  html = html.replace(
    `<span class="font-bold text-icai-burgundy">20 Mins</span>`,
    `<span class="font-bold text-icai-burgundy">15 Mins</span>`
  );

  // Update button text
  html = html.replace(
    `Attempt 20-20 Test (20 Qs • 20 Mins)`,
    `Attempt 20-20 Test (20 Qs • 15 Mins)`
  );
}

console.log('--- 3. Updating openPreTestInstructions & launchCbtExam ---');

const oldPreTestLogic = `      if (meta.isRealPaper) {
        if (typeBadge) typeBadge.textContent = 'Official Govt. of India (MCA) & ICAI Gazette Standard';
        if (govtBannerTitle) govtBannerTitle.textContent = 'Statutory Examination Guidelines — Ministry of Corporate Affairs (MCA) & ICAI';
        if (govtBannerText) govtBannerText.textContent = 'Notified in the Gazette of India under the Chartered Accountants (Amendment) Regulations, 2023 (Act No. 38 of 1949). Overall Paper: 100 Marks | Total Duration: 3 Hours (180 Minutes) + 15 Minutes Advance Reading Time (1:45 PM – 2:00 PM IST). Section A: 30 Marks Objective Assessment + Section B: 70 Marks Descriptive Examination.';
        document.getElementById('instDuration').textContent = '180';
        if (durationUnit) durationUnit.textContent = 'Mins + 15M Reading';
        document.getElementById('instTimeLimit').textContent = meta.time || '45';
        document.getElementById('instMaxMarks').textContent = '100 Marks (30M Sec A + 70M Sec B)';
        document.getElementById('instTotalQs').textContent = \`\${currentTestQuestions.length} MCQs (Sec A) + 6 Descriptive Qs (Sec B)\`;
      } else {
        if (typeBadge) typeBadge.textContent = 'ICAI CA Final 20-20 Sectional Test Standard';
        if (govtBannerTitle) govtBannerTitle.textContent = '20-20 Sectional Sprint Standard — Chapter Mastery';
        if (govtBannerText) govtBannerText.textContent = '20 Questions | 20 Minutes | 40 Marks (+2.00 Marks per Question). Designed under official ICAI CA Final New Scheme testing parameters with zero negative marking.';
        document.getElementById('instDuration').textContent = meta.time || 20;
        if (durationUnit) durationUnit.textContent = 'Mins (Sprint)';
        document.getElementById('instTimeLimit').textContent = meta.time || 20;
        document.getElementById('instMaxMarks').textContent = \`\${maxMarks} Marks (+2.00/Q, 0 Neg.)\`;
        document.getElementById('instTotalQs').textContent = \`\${currentTestQuestions.length} Questions (20-20 Standard)\`;
      }

      // Dynamic rules list conforming to official ICAI CA Final New Scheme
      const rulesList = document.getElementById('instRulesList');
      if (rulesList) {
        if (meta.isRealPaper) {
          rulesList.innerHTML = \`
            <li><strong>Statutory Authority &amp; Gazette Mandate:</strong> The CA Final Examination is conducted strictly in accordance with the <em>Chartered Accountants (Amendment) Regulations, 2023</em> framed under the <em>Chartered Accountants Act, 1949</em> (Act No. 38 of 1949) with approval from the <strong>Ministry of Corporate Affairs (MCA), Government of India</strong>.</li>
            <li><strong>Overall Time &amp; Advance Reading Time:</strong> The total examination duration is <strong>3 Hours (180 Minutes)</strong> (4 Hours for Paper 6 IBS). In accordance with Government and ICAI guidelines, <strong>15 Minutes Advance Reading Time (1:45 PM to 2:00 PM IST)</strong> is provided to review question papers prior to writing. Answering commences strictly at 2:00 PM IST.</li>
            <li><strong>Section A (30% Objective Assessment — 30 Marks):</strong> Comprises <strong>15 Case-Scenario and Knowledge-Based Multiple Choice Questions (MCQs)</strong> carrying <strong>2.00 Marks each</strong> (Total: 30 Marks). All questions in Section A are compulsory. (Allotted CBT sprint time: <span class="font-bold text-icai-burgundy">\${meta.time || 45} Minutes</span>).</li>
            <li><strong>Official Marking Scheme — ZERO NEGATIVE MARKING (0.00 Penalty):</strong> In strict accordance with the official Gazette notification for the ICAI New Scheme of Education and Training, there is <strong>NO negative marking</strong> for incorrect responses. Candidates are advised to attempt all questions.</li>
            <li><strong>Section B (70% Descriptive Examination — 70 Marks):</strong> Question No. 1 is <strong>COMPULSORY (14 Marks)</strong>. Candidates are required to answer <strong>any 4 questions out of Questions No. 2 to 6 (14 Marks each = 56 Marks)</strong>. Candidates can access Section B with the interactive candidate workspace and model suggested answers.</li>
            <li><strong>Step-Marking &amp; Statutory Citations:</strong> Answers are evaluated using official <strong>step-wise marking</strong>. Clear working notes, numerical computations, statutory sections (Companies Act, Income Tax Act, CGST Act), and Indian Accounting Standards (Ind AS) / Standards on Auditing (SAs) citations form an integral part of the evaluation.</li>
            <li><strong>Statutory Passing Standard (Regulation 38):</strong> A candidate is declared to have passed if they secure a minimum of <strong>40% marks in each individual paper</strong> (40/100) and a minimum of <strong>50% marks in aggregate</strong> across all papers of the Group (150/300). Scoring 60% or more qualifies for statutory paper exemption.</li>
            <li><strong>Permitted Examination Aids &amp; Calculator Norms:</strong> Only battery-operated, silent, non-programmable portable calculators with up to <strong>6 functions, 12 digits, and 2 memory registers</strong> are permitted. Programmable calculators, mobile phones, and smart watches are strictly prohibited.</li>
            <li>Ensure you submit your answers before you navigate away or close your browser.</li>
          \`;
        } else {
          rulesList.innerHTML = \`
            <li><strong>20-20 Sectional Standard:</strong> This test comprises exactly <strong>20 Questions</strong> to be completed within <strong>20 Minutes</strong> for rapid concept evaluation and speed conditioning.</li>
            <li><strong>Marks Allocation:</strong> Each question carries <strong>2.00 Marks</strong> (Total Maximum Marks: <strong>40 Marks</strong>).</li>
            <li><strong>Zero Negative Marking (0.00 Penalty):</strong> In strict accordance with ICAI New Scheme regulations, there is <strong>no negative marking</strong> for incorrect answers.</li>
            <li><strong>Comprehensive Syllabus Coverage:</strong> Questions are rigorously mapped to the official ICAI Study Material, Revision Test Papers (RTP), Mock Test Papers (MTP), and recent examination case scenarios.</li>
            <li><strong>Authoritative Statutory Solutions:</strong> Comprehensive model explanations with applicable sections, Ind AS, and Standards on Auditing (SAs) references are displayed immediately upon submission.</li>
            <li>Ensure you submit your test before you navigate away or close your browser.</li>
          \`;
        }
      }`;

const newPreTestLogic = `      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(testKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(testKey));
      const testTime = meta.time || ((isG1Paper || isG1Chapter) ? 15 : 20);

      if (isG1Paper) {
        if (typeBadge) typeBadge.textContent = 'Group I • Difficult Case-Based Previous Year Questions (PYQs)';
        if (govtBannerTitle) govtBannerTitle.textContent = 'ICAI CA Final Group I — 20-20 Section A Case-Scenario Examination (PYQs)';
        if (govtBannerText) govtBannerText.textContent = 'Authentic Case Scenarios from ICAI CA Final Previous Year Questions (May 2024, Nov 2023, May 2023, Nov 2022). Total 20 Case Questions | 15 Minutes CBT Timing | 40 Marks (+2.00, Zero Negative Marking) • High-Difficulty Level.';
        document.getElementById('instDuration').textContent = '15';
        if (durationUnit) durationUnit.textContent = 'Mins (15:00 Countdown)';
        document.getElementById('instTimeLimit').textContent = '15';
        document.getElementById('instMaxMarks').textContent = '40 Marks (20 Qs × 2M • 0 Neg.)';
        document.getElementById('instTotalQs').textContent = \`\${currentTestQuestions.length} Questions (Case-Based PYQs)\`;
      } else if (meta.isRealPaper) {
        if (typeBadge) typeBadge.textContent = 'Official Govt. of India (MCA) & ICAI Gazette Standard';
        if (govtBannerTitle) govtBannerTitle.textContent = 'Statutory Examination Guidelines — Ministry of Corporate Affairs (MCA) & ICAI';
        if (govtBannerText) govtBannerText.textContent = 'Notified in the Gazette of India under the Chartered Accountants (Amendment) Regulations, 2023 (Act No. 38 of 1949). Overall Paper: 100 Marks | Total Duration: 3 Hours (180 Minutes) + 15 Minutes Advance Reading Time (1:45 PM – 2:00 PM IST). Section A: 30 Marks Objective Assessment + Section B: 70 Marks Descriptive Examination.';
        document.getElementById('instDuration').textContent = '180';
        if (durationUnit) durationUnit.textContent = 'Mins + 15M Reading';
        document.getElementById('instTimeLimit').textContent = meta.time || '45';
        document.getElementById('instMaxMarks').textContent = '100 Marks (30M Sec A + 70M Sec B)';
        document.getElementById('instTotalQs').textContent = \`\${currentTestQuestions.length} MCQs (Sec A) + 6 Descriptive Qs (Sec B)\`;
      } else {
        if (typeBadge) typeBadge.textContent = isG1Chapter ? 'Group I • 20-20 Sectional Test (15 Mins • Difficult PYQs)' : 'ICAI CA Final 20-20 Sectional Test Standard';
        if (govtBannerTitle) govtBannerTitle.textContent = isG1Chapter ? 'Group I Sectional Sprint Standard — 15 Mins PYQ Mastery' : '20-20 Sectional Sprint Standard — Chapter Mastery';
        if (govtBannerText) govtBannerText.textContent = \`20 Questions | \${testTime} Minutes | 40 Marks (+2.00 Marks per Question). Difficult Case-Based Questions sourced from authentic ICAI Previous Year Questions with zero negative marking.\`;
        document.getElementById('instDuration').textContent = testTime;
        if (durationUnit) durationUnit.textContent = 'Mins (Sprint)';
        document.getElementById('instTimeLimit').textContent = testTime;
        document.getElementById('instMaxMarks').textContent = \`\${maxMarks} Marks (+2.00/Q, 0 Neg.)\`;
        document.getElementById('instTotalQs').textContent = \`\${currentTestQuestions.length} Questions (20-20 Difficult PYQs)\`;
      }

      // Dynamic rules list conforming to official ICAI CA Final New Scheme
      const rulesList = document.getElementById('instRulesList');
      if (rulesList) {
        if (isG1Paper) {
          rulesList.innerHTML = \`
            <li><strong>Group 1 Dedicated 20-20 Standard:</strong> Comprises strictly <strong>20 Difficult Level Case-Scenario Multiple Choice Questions (MCQs)</strong> sourced from authentic ICAI CA Final Previous Year Question papers.</li>
            <li><strong>Strict 15-Minute Countdown Timing:</strong> In accordance with speed-mastery benchmarks, candidates are allotted strictly <strong>15 Minutes</strong> to complete all 20 questions (active real-time countdown).</li>
            <li><strong>Marks Allocation:</strong> Each question carries <strong>2.00 Marks</strong> (Total Maximum Marks: <strong>40 Marks</strong>).</li>
            <li><strong>Zero Negative Marking (0.00 Penalty):</strong> In strict accordance with the official Gazette notification for the ICAI New Scheme, there is <strong>NO negative marking</strong> for incorrect responses. Candidates are encouraged to attempt every question.</li>
            <li><strong>Difficult Case-Based PYQs:</strong> Every problem is framed as a multi-layered corporate case study with practical nuances (Ind AS, Forex arbitrage, Auditing ethics, etc.).</li>
            <li><strong>Authoritative Statutory Solutions:</strong> Step-by-step mathematical workings and statutory references (Companies Act, Ind AS, SAs, Code of Ethics) are provided upon submission.</li>
            <li>Ensure you submit your test before you navigate away or close your browser.</li>
          \`;
        } else if (meta.isRealPaper) {
          rulesList.innerHTML = \`
            <li><strong>Statutory Authority &amp; Gazette Mandate:</strong> The CA Final Examination is conducted strictly in accordance with the <em>Chartered Accountants (Amendment) Regulations, 2023</em> framed under the <em>Chartered Accountants Act, 1949</em> (Act No. 38 of 1949) with approval from the <strong>Ministry of Corporate Affairs (MCA), Government of India</strong>.</li>
            <li><strong>Overall Time &amp; Advance Reading Time:</strong> The total examination duration is <strong>3 Hours (180 Minutes)</strong> (4 Hours for Paper 6 IBS). In accordance with Government and ICAI guidelines, <strong>15 Minutes Advance Reading Time (1:45 PM to 2:00 PM IST)</strong> is provided to review question papers prior to writing. Answering commences strictly at 2:00 PM IST.</li>
            <li><strong>Section A (30% Objective Assessment — 30 Marks):</strong> Comprises <strong>15 Case-Scenario and Knowledge-Based Multiple Choice Questions (MCQs)</strong> carrying <strong>2.00 Marks each</strong> (Total: 30 Marks). All questions in Section A are compulsory. (Allotted CBT sprint time: <span class="font-bold text-icai-burgundy">\${meta.time || 45} Minutes</span>).</li>
            <li><strong>Official Marking Scheme — ZERO NEGATIVE MARKING (0.00 Penalty):</strong> In strict accordance with the official Gazette notification for the ICAI New Scheme of Education and Training, there is <strong>NO negative marking</strong> for incorrect responses. Candidates are advised to attempt all questions.</li>
            <li><strong>Section B (70% Descriptive Examination — 70 Marks):</strong> Question No. 1 is <strong>COMPULSORY (14 Marks)</strong>. Candidates are required to answer <strong>any 4 questions out of Questions No. 2 to 6 (14 Marks each = 56 Marks)</strong>. Candidates can access Section B with the interactive candidate workspace and model suggested answers.</li>
            <li><strong>Step-Marking &amp; Statutory Citations:</strong> Answers are evaluated using official <strong>step-wise marking</strong>. Clear working notes, numerical computations, statutory sections (Companies Act, Income Tax Act, CGST Act), and Indian Accounting Standards (Ind AS) / Standards on Auditing (SAs) citations form an integral part of the evaluation.</li>
            <li><strong>Statutory Passing Standard (Regulation 38):</strong> A candidate is declared to have passed if they secure a minimum of <strong>40% marks in each individual paper</strong> (40/100) and a minimum of <strong>50% marks in aggregate</strong> across all papers of the Group (150/300). Scoring 60% or more qualifies for statutory paper exemption.</li>
            <li><strong>Permitted Examination Aids &amp; Calculator Norms:</strong> Only battery-operated, silent, non-programmable portable calculators with up to <strong>6 functions, 12 digits, and 2 memory registers</strong> are permitted. Programmable calculators, mobile phones, and smart watches are strictly prohibited.</li>
            <li>Ensure you submit your answers before you navigate away or close your browser.</li>
          \`;
        } else {
          rulesList.innerHTML = \`
            <li><strong>Group 1 20-20 Sectional Standard:</strong> This test comprises exactly <strong>20 Questions</strong> to be completed within <strong>\${testTime} Minutes</strong> for rapid concept evaluation and speed conditioning.</li>
            <li><strong>Marks Allocation:</strong> Each question carries <strong>2.00 Marks</strong> (Total Maximum Marks: <strong>40 Marks</strong>).</li>
            <li><strong>Zero Negative Marking (0.00 Penalty):</strong> In strict accordance with ICAI New Scheme regulations, there is <strong>no negative marking</strong> for incorrect answers.</li>
            <li><strong>Difficult Case-Based PYQs:</strong> Rigorously mapped to authentic ICAI Previous Year Questions, Study Material, RTP, and MTP case scenarios.</li>
            <li><strong>Authoritative Statutory Solutions:</strong> Comprehensive model explanations with applicable sections, Ind AS, and Standards on Auditing (SAs) references are displayed immediately upon submission.</li>
            <li>Ensure you submit your test before you navigate away or close your browser.</li>
          \`;
        }
      }`;

html = html.replace(oldPreTestLogic, newPreTestLogic);

// CBT launch header / tags
const oldCbtLabels = `      // Update Section badge and marking label in CBT bar
      const marksPerQ = meta.marksPerQ || 2;
      const sectionTag = document.getElementById('cbtSectionTagBtn');
      if (sectionTag) {
        sectionTag.textContent = meta.isRealPaper ? 'Section A: MCQs (30 Marks)' : '20-20 Sectional MCQs (40 Marks)';
      }
      const markingSchemeLabel = document.getElementById('cbtMarkingSchemeLabel');
      if (markingSchemeLabel) {
        markingSchemeLabel.textContent = meta.isRealPaper 
          ? \`Official ICAI Scheme: +\${marksPerQ}.00 Marks • No Negative Marking\`
          : \`20-20 Scheme: 20 Questions • 20 Mins • +\${marksPerQ}.00 Marks • No Negative Marking\`;
      }`;

const newCbtLabels = `      // Update Section badge and marking label in CBT bar
      const marksPerQ = meta.marksPerQ || 2;
      const isG1Paper = ['REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3'].includes(currentTestKey);
      const isG1Chapter = [1, 2, 3, 4, 5, 6].includes(Number(currentTestKey));
      const sectionTag = document.getElementById('cbtSectionTagBtn');
      if (sectionTag) {
        if (isG1Paper) {
          sectionTag.textContent = 'Section A: 20 Case MCQs (40 Marks • 15 Mins)';
        } else if (isG1Chapter) {
          sectionTag.textContent = '20-20 Sectional MCQs (40 Marks • 15 Mins)';
        } else {
          sectionTag.textContent = meta.isRealPaper ? 'Section A: MCQs (30 Marks)' : '20-20 Sectional MCQs (40 Marks)';
        }
      }
      const markingSchemeLabel = document.getElementById('cbtMarkingSchemeLabel');
      if (markingSchemeLabel) {
        if (isG1Paper || isG1Chapter) {
          markingSchemeLabel.textContent = \`Group 1 Standard: 20 Questions • 15 Mins • +\${marksPerQ}.00 Marks • No Negative Marking • Difficult PYQs\`;
        } else {
          markingSchemeLabel.textContent = meta.isRealPaper 
            ? \`Official ICAI Scheme: +\${marksPerQ}.00 Marks • No Negative Marking\`
            : \`20-20 Scheme: 20 Questions • 20 Mins • +\${marksPerQ}.00 Marks • No Negative Marking\`;
        }
      }`;

html = html.replace(oldCbtLabels, newCbtLabels);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully updated index.html UI, Pre-test views, and CBT interface!');

