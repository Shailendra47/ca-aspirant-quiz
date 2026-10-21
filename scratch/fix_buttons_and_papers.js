const fs = require('fs');
const path = require('path');
const vm = require('vm');

const indexPath = path.resolve('index.html');
const allPapersPath = 'C:/Users/ACER/.gemini/antigravity/brain/dba9f733-5305-430f-bcce-5d7fb9739df6/scratch/all_descriptive_papers.js';

let html = fs.readFileSync(indexPath, 'utf-8');
const papers = require(allPapersPath);

// 1. Locate start and end of DESCRIPTIVE_PAPERS in html
const startMarker = 'const DESCRIPTIVE_PAPERS = {';
const endMarker = 'let currentDescPaper = \'PAPER_3\';';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find markers for DESCRIPTIVE_PAPERS');
  process.exit(1);
}

// Format the replacement for DESCRIPTIVE_PAPERS
const papersJson = JSON.stringify(papers, null, 2);
const newDescriptivePapersCode = `const DESCRIPTIVE_PAPERS = ${papersJson};\n\n    `;

html = html.slice(0, startIndex) + newDescriptivePapersCode + html.slice(endIndex);

// 2. Add missing scorecard functions if not present
if (!html.includes('function closeScorecardModal')) {
  const scorecardFunctions = `
    // ==================== SCORECARD MODAL HANDLERS ====================
    function closeScorecardModal() {
      const modal = document.getElementById('scorecardModal');
      if (modal) modal.classList.add('hidden');
    }

    function resetQuizState() {
      userSelections = {};
      questionStatus = {};
      currentQuestionIndex = 0;
      visitedQuestions = new Set([0]);
      switchMainView('tests');
      showToast('Session reset. Choose any paper or chapter to start!', '🔄');
    }

    function retryIncorrectQuestions() {
      const wrongIndices = [];
      currentTestQuestions.forEach((q, idx) => {
        if (userSelections[idx] !== q.correct) {
          wrongIndices.push(idx);
        }
      });
      if (wrongIndices.length === 0) {
        showToast('Congratulations! You had no incorrect answers.', '🎉');
        return;
      }
      currentTestQuestions = wrongIndices.map(idx => currentTestQuestions[idx]);
      userSelections = {};
      questionStatus = {};
      currentQuestionIndex = 0;
      visitedQuestions = new Set([0]);
      closeScorecardModal();
      switchMainView('exam');
      renderQuestion();
      renderPalette();
      startExamTimer();
      showToast(\`Retrying \${wrongIndices.length} incorrect question(s)!\`, '🎯');
    }
  `;

  // Insert before </script> in Script #4
  const lastScriptClose = html.lastIndexOf('</script>');
  html = html.slice(0, lastScriptClose) + scorecardFunctions + '\n  ' + html.slice(lastScriptClose);
}

// 3. Save updated html
fs.writeFileSync(indexPath, html, 'utf-8');
console.log('Successfully updated index.html!');

// 4. Validate syntax of all script tags
const scriptMatches = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
console.log('Total scripts found:', scriptMatches.length);

const sandbox = {
  console: console,
  window: {},
  tailwind: { config: {} },
  document: {
    getElementById: (id) => ({
      id,
      classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
      style: {},
      setAttribute: () => {},
      getAttribute: () => '',
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      focus: () => {},
      innerHTML: '',
      textContent: '',
      value: '',
      disabled: false,
      children: []
    }),
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: () => ({
      classList: { add: () => {}, remove: () => {} },
      style: {},
      setAttribute: () => {},
      appendChild: () => {},
      addEventListener: () => {}
    }),
    body: { classList: { add: () => {}, remove: () => {} } }
  },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  fetch: async () => ({ ok: true, json: async () => ({}) }),
  setTimeout: () => {}, setInterval: () => {}, clearInterval: () => {}, clearTimeout: () => {},
  location: { protocol: 'http:', href: 'http://localhost:5000/' }
};
sandbox.window = sandbox;

const context = vm.createContext(sandbox);
let allOk = true;

scriptMatches.forEach((code, i) => {
  try {
    vm.runInContext(code, context);
    console.log('Script #' + (i + 1) + ' evaluated OK!');
  } catch (err) {
    allOk = false;
    console.error('Script #' + (i + 1) + ' FAILED:', err.message, err.stack);
  }
});

if (allOk) {
  console.log('ALL SCRIPTS EVALUATED WITHOUT ERRORS IN BROWSER ENVIRONMENT!');
} else {
  process.exit(1);
}

