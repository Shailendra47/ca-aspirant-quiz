const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');

console.log('================================================================');
console.log('🧪 VERIFYING CORPORATE & ECONOMIC LAWS (CEL) 9 TOPICS & FULL TEST');
console.log('================================================================');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`❌ [FAIL] ${message}`);
  }
}

// 1. Verify JSON Files on Disk
const catalogPath = path.join('data', 'cel', 'cel_topics_catalog.json');
assert(fs.existsSync(catalogPath), 'data/cel/cel_topics_catalog.json exists');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
assert(catalog.totalTopics === 9, 'Catalog defines exactly 9 topics');
assert(catalog.topics.length === 9, 'Catalog contains 9 topic descriptors');

const fullPaperPath = path.join('data', 'cel_full_paper_100q.json');
assert(fs.existsSync(fullPaperPath), 'data/cel_full_paper_100q.json exists');
const fullPaper = JSON.parse(fs.readFileSync(fullPaperPath, 'utf8'));
assert(fullPaper.questionCount === 100, 'Full paper has questionCount === 100');
assert(fullPaper.timeLimitMinutes === 180, 'Full paper timeLimitMinutes === 180 (3 Hours)');
assert(fullPaper.totalMarks === 200, 'Full paper totalMarks === 200');
assert(fullPaper.questions.length === 100, 'Full paper contains exactly 100 questions');

const allQuestionsPath = path.join('data', 'corporate_and_economic_laws_all_questions.json');
assert(fs.existsSync(allQuestionsPath), 'data/corporate_and_economic_laws_all_questions.json exists');
const allQs = JSON.parse(fs.readFileSync(allQuestionsPath, 'utf8'));
assert(allQs.length === 180, 'Master database contains exactly 180 topic questions');

// Verify each of the 9 topic files
catalog.topics.forEach(t => {
  const tFilePath = path.join('data', 'cel', t.fileName);
  assert(fs.existsSync(tFilePath), `Topic file ${t.fileName} exists`);
  const tQuestions = JSON.parse(fs.readFileSync(tFilePath, 'utf8'));
  assert(tQuestions.length === 20, `Topic ${t.topicId} (${t.topicTitle}) contains exactly 20 questions`);
  assert(tQuestions.every(q => q.timeLimitMinutes === 15), `Topic ${t.topicId}: all 20 questions have 15-minute timing`);
  assert(tQuestions.every(q => q.difficulty === 'Difficult'), `Topic ${t.topicId}: all 20 questions have Difficult difficulty`);
  assert(tQuestions.every(q => q.options && q.options.length === 4), `Topic ${t.topicId}: all questions have 4 options`);
  assert(tQuestions.every(q => q.correct !== undefined && q.correct >= 0 && q.correct <= 3), `Topic ${t.topicId}: all questions have valid correct answer index (0-3)`);
});

// 2. Verify VM execution of index.html
const html = fs.readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);

const domElements = {};
function getOrCreateEl(id) {
  if (!domElements[id]) {
    domElements[id] = {
      id,
      textContent: '',
      innerHTML: '',
      value: '',
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false,
        toggle: () => {}
      },
      style: {},
      setAttribute: () => {},
      getAttribute: () => '',
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      appendChild: () => {},
      scrollIntoView: () => {}
    };
  }
  return domElements[id];
}

const sandbox = {
  console,
  addEventListener: () => {},
  removeEventListener: () => {},
  scrollTo: () => {},
  tailwind: { config: {} },
  document: {
    getElementById: getOrCreateEl,
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: (t) => getOrCreateEl(t),
    body: { classList: { add: () => {}, remove: () => {} } }
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  fetch: async () => ({ ok: true, json: async () => ({}) }),
  setTimeout: () => {},
  setInterval: () => {},
  clearInterval: () => {},
  clearTimeout: () => {},
  location: { protocol: 'http:', href: 'http://localhost:5000/' },
  navigator: { userAgent: 'test' }
};
sandbox.window = sandbox;
const context = vm.createContext(sandbox);
scripts.forEach(code => vm.runInContext(code, context));

// Test CEL Modal functions
sandbox.openCelTopicsModal();
assert(true, 'openCelTopicsModal() executed without error');
sandbox.closeCelTopicsModal();
assert(true, 'closeCelTopicsModal() executed without error');

// Test CEL Full Mock Instructions & CBT launch
sandbox.openPreTestInstructions('CEL_FULL_MOCK');
let curQuestions = vm.runInContext('currentTestQuestions', context);
assert(curQuestions.length === 100, 'CEL_FULL_MOCK loaded exactly 100 questions');
assert(domElements['instDuration'].textContent === '180', 'CEL_FULL_MOCK Pre-Test duration is 180 Mins (3 Hours)');
assert(domElements['instMaxMarks'].textContent.includes('200 Marks'), 'CEL_FULL_MOCK Pre-Test max marks is 200 Marks');
assert(domElements['instTotalQs'].textContent.includes('100 Questions'), 'CEL_FULL_MOCK Pre-Test total questions displays 100 Questions');

sandbox.launchCbtExam();
assert(vm.runInContext('examTotalSeconds', context) === 10800, 'CEL_FULL_MOCK CBT exam clock initialized to 10,800s (3 Hours countdown)');

// Test all 9 CEL Topic Tests
for (let tId = 1; tId <= 9; tId++) {
  sandbox.openPreTestInstructions(`CEL_TOPIC_${tId}`);
  curQuestions = vm.runInContext('currentTestQuestions', context);
  assert(curQuestions.length === 20, `CEL_TOPIC_${tId} loaded exactly 20 questions`);
  assert(domElements['instDuration'].textContent === '15', `CEL_TOPIC_${tId} Pre-Test duration is 15 Mins`);
  assert(domElements['instMaxMarks'].textContent.includes('40 Marks'), `CEL_TOPIC_${tId} Pre-Test max marks is 40 Marks`);
  sandbox.launchCbtExam();
  assert(vm.runInContext('examTotalSeconds', context) === 900, `CEL_TOPIC_${tId} CBT clock initialized to 900s (15:00 countdown)`);
}

// 3. Verify API Endpoints on localhost:5000
function getJson(urlPath) {
  return new Promise((resolve) => {
    http.get('http://localhost:5000' + urlPath, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { resolve({ status: res.statusCode, error: e.message }); }
      });
    }).on('error', err => resolve({ status: 500, error: err.message }));
  });
}

(async () => {
  const topicsRes = await getJson('/api/cel/topics');
  assert(topicsRes.status === 200 && topicsRes.body.totalTopics === 9, 'API /api/cel/topics returns 9 topics');

  for (let tId = 1; tId <= 9; tId++) {
    const tRes = await getJson(`/api/cel/topic/${tId}`);
    assert(tRes.status === 200 && tRes.body.questionCount === 20 && tRes.body.timeLimitMinutes === 15, `API /api/cel/topic/${tId} returns 20 Qs with 15 min timing`);
  }

  const fullMockRes = await getJson('/api/cel/full-mock');
  assert(fullMockRes.status === 200 && fullMockRes.body.questionCount === 100 && fullMockRes.body.timeLimitMinutes === 180, 'API /api/cel/full-mock returns 100 Qs with 180 min (3 Hours) timing');

  const allQsRes = await getJson('/api/cel/questions');
  assert(allQsRes.status === 200 && allQsRes.body.totalQuestions === 180, 'API /api/cel/questions returns all 180 topic questions');

  console.log('================================================================');
  console.log(`🏁 SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log('================================================================');

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
})();

