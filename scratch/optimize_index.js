const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Optimize splitScenarioAndPrompt with memoization cache
const oldSplitFunc = `    // Helper: Split Scenario vs Specific Prompt
    function splitScenarioAndPrompt(text) {
      if (!text) return { scenario: '', prompt: '' };

      const protectedText = text
        .replace(/CA\\.\\s*/g, 'CA_DOT_ ')
        .replace(/M\\/s\\.\\s*/g, 'MS_DOT_ ')
        .replace(/Pvt\\.\\s*/g, 'PVT_DOT_ ')
        .replace(/Ltd\\.\\s*/g, 'LTD_DOT_ ')
        .replace(/FY\\.\\s*/g, 'FY_DOT_ ')
        .replace(/Sec\\.\\s*/g, 'SEC_DOT_ ')
        .replace(/vs\\.\\s*/g, 'VS_DOT_ ')
        .replace(/Mr\\.\\s*/g, 'MR_DOT_ ')
        .replace(/Mrs\\.\\s*/g, 'MRS_DOT_ ')
        .replace(/Dr\\.\\s*/g, 'DR_DOT_ ');

      const sentences = protectedText.match(/[^.!?]+[.!?]+/g) || [protectedText];

      const restore = str => str
        .replace(/CA_DOT_\\s*/g, 'CA. ')
        .replace(/MS_DOT_\\s*/g, 'M/s. ')
        .replace(/PVT_DOT_\\s*/g, 'Pvt. ')
        .replace(/LTD_DOT_\\s*/g, 'Ltd. ')
        .replace(/FY_DOT_\\s*/g, 'FY. ')
        .replace(/SEC_DOT_\\s*/g, 'Sec. ')
        .replace(/VS_DOT_\\s*/g, 'vs. ')
        .replace(/MR_DOT_\\s*/g, 'Mr. ')
        .replace(/MRS_DOT_\\s*/g, 'Mrs. ')
        .replace(/DR_DOT_\\s*/g, 'Dr. ');

      if (sentences.length <= 1) {
        return { scenario: text, prompt: text };
      }

      const lastSentence = restore(sentences[sentences.length - 1].trim());
      const prevSentences = restore(sentences.slice(0, sentences.length - 1).join(' ').trim());

      return { scenario: prevSentences, prompt: lastSentence };
    }`;

const newSplitFunc = `    // Helper: Split Scenario vs Specific Prompt (Memoized for O(1) performance)
    const scenarioPromptCache = new Map();
    function splitScenarioAndPrompt(text) {
      if (!text) return { scenario: '', prompt: '' };
      const cached = scenarioPromptCache.get(text);
      if (cached) return cached;

      const protectedText = text
        .replace(/CA\\.\\s*/g, 'CA_DOT_ ')
        .replace(/M\\/s\\.\\s*/g, 'MS_DOT_ ')
        .replace(/Pvt\\.\\s*/g, 'PVT_DOT_ ')
        .replace(/Ltd\\.\\s*/g, 'LTD_DOT_ ')
        .replace(/FY\\.\\s*/g, 'FY_DOT_ ')
        .replace(/Sec\\.\\s*/g, 'SEC_DOT_ ')
        .replace(/vs\\.\\s*/g, 'VS_DOT_ ')
        .replace(/Mr\\.\\s*/g, 'MR_DOT_ ')
        .replace(/Mrs\\.\\s*/g, 'MRS_DOT_ ')
        .replace(/Dr\\.\\s*/g, 'DR_DOT_ ');

      const sentences = protectedText.match(/[^.!?]+[.!?]+/g) || [protectedText];

      const restore = str => str
        .replace(/CA_DOT_\\s*/g, 'CA. ')
        .replace(/MS_DOT_\\s*/g, 'M/s. ')
        .replace(/PVT_DOT_\\s*/g, 'Pvt. ')
        .replace(/LTD_DOT_\\s*/g, 'Ltd. ')
        .replace(/FY_DOT_\\s*/g, 'FY. ')
        .replace(/SEC_DOT_\\s*/g, 'Sec. ')
        .replace(/VS_DOT_\\s*/g, 'vs. ')
        .replace(/MR_DOT_\\s*/g, 'Mr. ')
        .replace(/MRS_DOT_\\s*/g, 'Mrs. ')
        .replace(/DR_DOT_\\s*/g, 'Dr. ');

      let result;
      if (sentences.length <= 1) {
        result = { scenario: text, prompt: text };
      } else {
        const lastSentence = restore(sentences[sentences.length - 1].trim());
        const prevSentences = restore(sentences.slice(0, sentences.length - 1).join(' ').trim());
        result = { scenario: prevSentences, prompt: lastSentence };
      }

      scenarioPromptCache.set(text, result);
      return result;
    }`;

if (!html.includes('const scenarioPromptCache = new Map();')) {
  if (!html.includes(oldSplitFunc)) {
    throw new Error('Could not find oldSplitFunc');
  }
  html = html.replace(oldSplitFunc, newSplitFunc);
}

// 2. Optimize startExamClock (caching DOM lookups)
const oldStartExamClock = `    function startExamClock() {
      if (examClockInterval) clearInterval(examClockInterval);

      const tick = () => {
        if (examTimeRemainingSeconds <= 0) {
          clearInterval(examClockInterval);
          openSubmitAlertModal();
          return;
        }
        examTimeRemainingSeconds--;

        const h = Math.floor(examTimeRemainingSeconds / 3600);
        const m = Math.floor((examTimeRemainingSeconds % 3600) / 60);
        const s = examTimeRemainingSeconds % 60;

        document.getElementById('cbtClockH').textContent = String(h).padStart(2, '0');
        document.getElementById('cbtClockM').textContent = String(m).padStart(2, '0');
        document.getElementById('cbtClockS').textContent = String(s).padStart(2, '0');
      };

      tick();
      examClockInterval = setInterval(tick, 1000);
    }`;

const newStartExamClock = `    function startExamClock() {
      if (examClockInterval) clearInterval(examClockInterval);

      const elH = document.getElementById('cbtClockH');
      const elM = document.getElementById('cbtClockM');
      const elS = document.getElementById('cbtClockS');

      const tick = () => {
        if (examTimeRemainingSeconds <= 0) {
          clearInterval(examClockInterval);
          openSubmitAlertModal();
          return;
        }
        examTimeRemainingSeconds--;

        const h = Math.floor(examTimeRemainingSeconds / 3600);
        const m = Math.floor((examTimeRemainingSeconds % 3600) / 60);
        const s = examTimeRemainingSeconds % 60;

        if (elH) elH.textContent = String(h).padStart(2, '0');
        if (elM) elM.textContent = String(m).padStart(2, '0');
        if (elS) elS.textContent = String(s).padStart(2, '0');
      };

      tick();
      examClockInterval = setInterval(tick, 1000);
    }`;

if (!html.includes('const elH = document.getElementById(\'cbtClockH\');')) {
  if (!html.includes(oldStartExamClock)) {
    throw new Error('Could not find oldStartExamClock');
  }
  html = html.replace(oldStartExamClock, newStartExamClock);
}

// 3. Optimize renderCbtPalette with DocumentFragment batching
const oldRenderCbtPalette = `    function renderCbtPalette() {
      const grids = [
        document.getElementById('cbtPaletteGrid'),
        document.getElementById('cbtMobilePaletteGrid')
      ].filter(Boolean);

      grids.forEach(g => { g.innerHTML = ''; });

      // Update mobile badge
      const mobBadge = document.getElementById('mobilePaletteBadge');
      if (mobBadge && currentTestQuestions.length > 0) {
        mobBadge.textContent = \`\${currentQIndex + 1}/\${currentTestQuestions.length}\`;
      }

      currentTestQuestions.forEach((q, idx) => {
        const state = questionStates[q.id] || 'not_visited';
        const isCurrent = idx === currentQIndex;

        // State styles matching Image 3 (with our theme palette):
        let styleClass = 'bg-stone-200 text-stone-800 border border-stone-300';
        if (state === 'answered') styleClass = 'bg-emerald-700 text-white shadow-xs';
        else if (state === 'not_answered') styleClass = 'bg-rose-700 text-white shadow-xs';
        else if (state === 'marked') styleClass = 'bg-purple-700 text-white rounded-full shadow-xs';
        else if (state === 'marked_answered') styleClass = 'bg-purple-700 text-white rounded-full relative shadow-xs';

        const ring = isCurrent ? 'ring-2 ring-icai-navy ring-offset-1 font-bold scale-105' : '';

        grids.forEach(grid => {
          const btn = document.createElement('button');
          btn.onclick = () => jumpToCbtQuestion(idx);
          btn.textContent = (idx + 1);
          btn.className = \`w-9 h-8 text-xs font-semibold rounded flex items-center justify-center transition \${styleClass} \${ring} active:scale-95\`;
          if (state === 'marked_answered') {
            btn.innerHTML = \`\${idx + 1}<span class="w-2 h-2 rounded-full bg-emerald-400 absolute bottom-0.5 right-0.5 border border-white"></span>\`;
          }
          grid.appendChild(btn);
        });
      });
    }`;

const newRenderCbtPalette = `    function renderCbtPalette() {
      const desktopGrid = document.getElementById('cbtPaletteGrid');
      const mobileGrid = document.getElementById('cbtMobilePaletteGrid');

      // Update mobile badge
      const mobBadge = document.getElementById('mobilePaletteBadge');
      if (mobBadge && currentTestQuestions.length > 0) {
        mobBadge.textContent = \`\${currentQIndex + 1}/\${currentTestQuestions.length}\`;
      }

      const desktopFrag = desktopGrid ? document.createDocumentFragment() : null;
      const mobileFrag = mobileGrid ? document.createDocumentFragment() : null;

      currentTestQuestions.forEach((q, idx) => {
        const state = questionStates[q.id] || 'not_visited';
        const isCurrent = idx === currentQIndex;

        // State styles matching Image 3 (with our theme palette):
        let styleClass = 'bg-stone-200 text-stone-800 border border-stone-300';
        if (state === 'answered') styleClass = 'bg-emerald-700 text-white shadow-xs';
        else if (state === 'not_answered') styleClass = 'bg-rose-700 text-white shadow-xs';
        else if (state === 'marked') styleClass = 'bg-purple-700 text-white rounded-full shadow-xs';
        else if (state === 'marked_answered') styleClass = 'bg-purple-700 text-white rounded-full relative shadow-xs';

        const ring = isCurrent ? 'ring-2 ring-icai-navy ring-offset-1 font-bold scale-105' : '';
        const baseClass = \`w-9 h-8 text-xs font-semibold rounded flex items-center justify-center transition \${styleClass} \${ring} active:scale-95\`;

        const makeBtn = () => {
          const btn = document.createElement('button');
          btn.onclick = () => jumpToCbtQuestion(idx);
          btn.className = baseClass;
          if (state === 'marked_answered') {
            btn.innerHTML = \`\${idx + 1}<span class="w-2 h-2 rounded-full bg-emerald-400 absolute bottom-0.5 right-0.5 border border-white"></span>\`;
          } else {
            btn.textContent = (idx + 1);
          }
          return btn;
        };

        if (desktopFrag) desktopFrag.appendChild(makeBtn());
        if (mobileFrag) mobileFrag.appendChild(makeBtn());
      });

      if (desktopGrid) {
        desktopGrid.innerHTML = '';
        desktopGrid.appendChild(desktopFrag);
      }
      if (mobileGrid) {
        mobileGrid.innerHTML = '';
        mobileGrid.appendChild(mobileFrag);
      }
    }`;

if (!html.includes('const desktopFrag = desktopGrid ? document.createDocumentFragment()')) {
  if (!html.includes(oldRenderCbtPalette)) {
    throw new Error('Could not find oldRenderCbtPalette');
  }
  html = html.replace(oldRenderCbtPalette, newRenderCbtPalette);
}

// 4. Optimize renderSolutionsReview with DocumentFragment batching
const oldRenderSolutions = `    function renderSolutionsReview() {
      const container = document.getElementById('solutionsListContainer');
      if (!container) return;
      container.innerHTML = '';

      const optionLetters = ['A', 'B', 'C', 'D'];
      const meta = CHAPTER_META[currentTestKey] || CHAPTER_META['ALL'];
      const marksPerQ = meta.marksPerQ || 2;

      currentTestQuestions.forEach((q, idx) => {
        const userChoice = userAnswers[q.id];
        const isAnswered = userChoice !== undefined;
        const isCorrect = isAnswered && userChoice === q.correct;
        const isWrong = isAnswered && userChoice !== q.correct;

        let statusBadge = '<span class="px-2.5 py-0.5 rounded bg-stone-200 text-stone-700 text-xs font-bold font-serif">Skipped (0.00)</span>';
        if (isCorrect) statusBadge = \`<span class="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold font-serif">+\${marksPerQ}.00 Correct</span>\`;
        else if (isWrong) statusBadge = '<span class="px-2.5 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold font-serif">0.00 Incorrect (No Negative Marking)</span>';

        const parts = splitScenarioAndPrompt(q.question);

        const card = document.createElement('div');
        card.className = "paper-texture rounded-xl border border-icai-border p-6 shadow-book space-y-4";

        let optionsHtml = '';
        q.options.forEach((optText, optIdx) => {
          let optStyle = 'border-stone-300 bg-white text-stone-800';
          let icon = '';

          if (optIdx === q.correct) {
            optStyle = 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-semibold';
            icon = '✅ <span class="text-xs font-bold text-emerald-800">Correct Answer</span>';
          } else if (optIdx === userChoice) {
            optStyle = 'border-rose-600 bg-rose-50/80 text-rose-950';
            icon = '❌ <span class="text-xs font-bold text-rose-800">Your Answer</span>';
          }

          optionsHtml += \`
            <div class="p-3.5 rounded-lg border \${optStyle} flex items-start justify-between text-xs sm:text-sm font-serif">
              <div class="flex items-start space-x-2">
                <span class="font-bold">\${optionLetters[optIdx]}.</span>
                <span>\${optText}</span>
              </div>
              <div class="ml-2 shrink-0 font-sans">\${icon}</div>
            </div>
          \`;
        });

        card.innerHTML = \`
          <div class="flex items-center justify-between border-b border-stone-200 pb-3">
            <div class="flex items-center space-x-2">
              <span class="font-bold font-display text-icai-navy text-sm">Question \${idx + 1}</span>
              <span class="text-[11px] text-stone-600 font-serif italic">Ch \${q.chapter}: \${q.chapterTitle}</span>
            </div>
            <div>\${statusBadge}</div>
          </div>

          <!-- Scenario -->
          <div class="bg-amber-50/60 p-4 rounded-lg border border-amber-200/80 text-xs sm:text-sm text-stone-800 font-serif leading-relaxed">
            <span class="font-bold font-sans block text-icai-navy mb-1">Case Scenario:</span>
            \${parts.scenario}
          </div>

          <!-- Prompt -->
          <div class="font-bold text-stone-900 text-sm font-serif">
            \${parts.prompt}
          </div>

          <!-- Options -->
          <div class="space-y-2">
            \${optionsHtml}
          </div>

          <!-- Statutory Explanation -->
          <div class="bg-[#F8F5EC] border-l-4 border-icai-gold p-4 rounded-r-lg text-xs leading-relaxed text-stone-800">
            <div class="font-bold text-icai-navy mb-1 flex items-center justify-between">
              <span>ICAI Commentary &amp; Statutory Rationale:</span>
              <span class="font-mono text-stone-600 text-[10px] font-normal">\${q.ref || ''}</span>
            </div>
            <p class="font-serif text-stone-800 whitespace-pre-line">\${q.explanation}</p>
          </div>
        \`;

        container.appendChild(card);
      });
    }`;

const newRenderSolutions = `    function renderSolutionsReview() {
      const container = document.getElementById('solutionsListContainer');
      if (!container) return;
      container.innerHTML = '';

      const optionLetters = ['A', 'B', 'C', 'D'];
      const meta = CHAPTER_META[currentTestKey] || CHAPTER_META['ALL'];
      const marksPerQ = meta.marksPerQ || 2;
      const solutionsFrag = document.createDocumentFragment();

      currentTestQuestions.forEach((q, idx) => {
        const userChoice = userAnswers[q.id];
        const isAnswered = userChoice !== undefined;
        const isCorrect = isAnswered && userChoice === q.correct;
        const isWrong = isAnswered && userChoice !== q.correct;

        let statusBadge = '<span class="px-2.5 py-0.5 rounded bg-stone-200 text-stone-700 text-xs font-bold font-serif">Skipped (0.00)</span>';
        if (isCorrect) statusBadge = \`<span class="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold font-serif">+\${marksPerQ}.00 Correct</span>\`;
        else if (isWrong) statusBadge = '<span class="px-2.5 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold font-serif">0.00 Incorrect (No Negative Marking)</span>';

        const parts = splitScenarioAndPrompt(q.question);

        const card = document.createElement('div');
        card.className = "paper-texture rounded-xl border border-icai-border p-6 shadow-book space-y-4";

        let optionsHtml = '';
        q.options.forEach((optText, optIdx) => {
          let optStyle = 'border-stone-300 bg-white text-stone-800';
          let icon = '';

          if (optIdx === q.correct) {
            optStyle = 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-semibold';
            icon = '✅ <span class="text-xs font-bold text-emerald-800">Correct Answer</span>';
          } else if (optIdx === userChoice) {
            optStyle = 'border-rose-600 bg-rose-50/80 text-rose-950';
            icon = '❌ <span class="text-xs font-bold text-rose-800">Your Answer</span>';
          }

          optionsHtml += \`
            <div class="p-3.5 rounded-lg border \${optStyle} flex items-start justify-between text-xs sm:text-sm font-serif">
              <div class="flex items-start space-x-2">
                <span class="font-bold">\${optionLetters[optIdx]}.</span>
                <span>\${optText}</span>
              </div>
              <div class="ml-2 shrink-0 font-sans">\${icon}</div>
            </div>
          \`;
        });

        card.innerHTML = \`
          <div class="flex items-center justify-between border-b border-stone-200 pb-3">
            <div class="flex items-center space-x-2">
              <span class="font-bold font-display text-icai-navy text-sm">Question \${idx + 1}</span>
              <span class="text-[11px] text-stone-600 font-serif italic">Ch \${q.chapter}: \${q.chapterTitle}</span>
            </div>
            <div>\${statusBadge}</div>
          </div>

          <!-- Scenario -->
          <div class="bg-amber-50/60 p-4 rounded-lg border border-amber-200/80 text-xs sm:text-sm text-stone-800 font-serif leading-relaxed">
            <span class="font-bold font-sans block text-icai-navy mb-1">Case Scenario:</span>
            \${parts.scenario}
          </div>

          <!-- Prompt -->
          <div class="font-bold text-stone-900 text-sm font-serif">
            \${parts.prompt}
          </div>

          <!-- Options -->
          <div class="space-y-2">
            \${optionsHtml}
          </div>

          <!-- Statutory Explanation -->
          <div class="bg-[#F8F5EC] border-l-4 border-icai-gold p-4 rounded-r-lg text-xs leading-relaxed text-stone-800">
            <div class="font-bold text-icai-navy mb-1 flex items-center justify-between">
              <span>ICAI Commentary &amp; Statutory Rationale:</span>
              <span class="font-mono text-stone-600 text-[10px] font-normal">\${q.ref || ''}</span>
            </div>
            <p class="font-serif text-stone-800 whitespace-pre-line">\${q.explanation}</p>
          </div>
        \`;

        solutionsFrag.appendChild(card);
      });

      container.appendChild(solutionsFrag);
    }`;

if (!html.includes('const solutionsFrag = document.createDocumentFragment();')) {
  if (!html.includes(oldRenderSolutions)) {
    throw new Error('Could not find oldRenderSolutions');
  }
  html = html.replace(oldRenderSolutions, newRenderSolutions);
}

fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('Successfully optimized index.html frontend performance!');

