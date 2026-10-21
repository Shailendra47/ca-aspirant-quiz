const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');

console.log('================================================================');
console.log('🧪 VERIFYING FINANCIAL REPORTING (FR) 13 TOPICS & 100Q FULL TEST');
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

// 1. Verify index.html UI markup
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('Full Test (100 Qs • 3 Hours)'), 'Paper 1 card contains "Full Test (100 Qs • 3 Hours)" button');
assert(html.includes('13 Topic Tests (20-20 Qs)'), 'Paper 1 card contains "13 Topic Tests (20-20 Qs)" button');
assert(html.includes('id="frTopicsModal"'), 'index.html contains #frTopicsModal for browsing all 13 topics');

// 2. Verify VM execution of index.html JavaScript
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
        contains: () => false
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
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
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

// Test FR Topics Modal
sandbox.openFrTopicsModal();
assert(domElements['frTopicsModal'] !== undefined, 'openFrTopicsModal() executed successfully');
sandbox.closeFrTopicsModal();
assert(domElements['frTopicsModal'] !== undefined, 'closeFrTopicsModal() executed successfully');

// Test FR Full Mock Test (100 Questions • 3 Hours • 200 Marks)
sandbox.openPreTestInstructions('FR_FULL_MOCK');
let curQuestions = vm.runInContext('currentTestQuestions', context);
assert(curQuestions.length === 100, 'FR Full Mock loaded exactly 100 questions');
assert(domElements['instDuration'].textContent === '180', 'FR Full Mock duration is 180 Mins (3 Hours)');
assert(domElements['instMaxMarks'].textContent.includes('200 Marks'), 'FR Full Mock max marks is 200 Marks');
assert(domElements['instTotalQs'].textContent.includes('100 Questions'), 'FR Full Mock displays 100 Questions');
assert(domElements['instTypeBadge'].textContent.includes('Financial Reporting (FR) Full Examination'), 'FR Full Mock badge indicates Full Examination');

sandbox.launchCbtExam();
assert(vm.runInContext('examTotalSeconds', context) === 10800, 'FR Full Mock CBT exam clock initialized to 10,800s (3 Hours countdown)');
assert(curQuestions.every(q => q.subject === 'Financial Reporting'), 'FR Full Mock: All questions belong to Financial Reporting');
assert(curQuestions.every(q => q.difficulty === 'Difficult'), 'FR Full Mock: All 100 questions are Difficult level');

// Test Each of the 13 FR Topic Tests (20 Questions • 15 Mins • 40 Marks each)
for (let tId = 1; tId <= 13; tId++) {
  sandbox.openPreTestInstructions(`FR_TOPIC_${tId}`);
  curQuestions = vm.runInContext('currentTestQuestions', context);
  assert(curQuestions.length === 20, `FR Topic ${tId} loaded exactly 20 questions`);
  assert(domElements['instDuration'].textContent === '15', `FR Topic ${tId} Pre-Test duration is 15 Mins`);
  assert(domElements['instMaxMarks'].textContent.includes('40 Marks'), `FR Topic ${tId} max marks is 40 Marks`);
  
  sandbox.launchCbtExam();
  assert(vm.runInContext('examTotalSeconds', context) === 900, `FR Topic ${tId} CBT exam clock initialized to 900s (15:00 countdown)`);
  assert(curQuestions.every(q => q.topicId === tId), `FR Topic ${tId}: All questions correspond to Topic ID ${tId}`);
  assert(curQuestions.every(q => q.difficulty === 'Difficult'), `FR Topic ${tId}: All questions are Difficult level`);
  assert(curQuestions.every(q => q.type === 'Case-Based PYQ'), `FR Topic ${tId}: All questions are Case-Based PYQs`);
}

// 3. Verify JSON Data Files
const catalog = JSON.parse(fs.readFileSync('data/fr/fr_topics_catalog.json', 'utf8'));
assert(catalog.totalTopics === 13, 'fr_topics_catalog.json lists all 13 topics');
assert(catalog.fullExam.totalQuestions === 100 && catalog.fullExam.timeLimitMinutes === 180, 'fr_topics_catalog.json confirms 100 questions and 180 minutes for full exam');

const fullMockFile = JSON.parse(fs.readFileSync('data/fr/fr_full_paper_100q.json', 'utf8'));
assert(fullMockFile.length === 100, 'data/fr/fr_full_paper_100q.json contains exactly 100 questions');

const allQsFile = JSON.parse(fs.readFileSync('data/fr/financial_reporting_all_questions.json', 'utf8'));
assert(allQsFile.length === 260, 'data/fr/financial_reporting_all_questions.json contains exactly 260 questions (13 × 20)');

// 4. Verify API Endpoints on localhost:5000
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
  const topicsRes = await getJson('/api/fr/topics');
  assert(topicsRes.status === 200 && topicsRes.body.totalTopics === 13, 'API /api/fr/topics returns 13 topics');

  const fullTestRes = await getJson('/api/fr/full-test');
  assert(fullTestRes.status === 200 && fullTestRes.body.questionCount === 100 && fullTestRes.body.timeLimitMinutes === 180, 'API /api/fr/full-test returns 100 Qs and 180 minutes');

  const topic1Res = await getJson('/api/fr/topic/1');
  assert(topic1Res.status === 200 && topic1Res.body.questionCount === 20 && topic1Res.body.timeLimitMinutes === 15, 'API /api/fr/topic/1 returns 20 Qs and 15 mins');

  const topic13Res = await getJson('/api/fr/topic/13');
  assert(topic13Res.status === 200 && topic13Res.body.questionCount === 20 && topic13Res.body.timeLimitMinutes === 15, 'API /api/fr/topic/13 returns 20 Qs and 15 mins');

  const allQsRes = await getJson('/api/fr/questions');
  assert(allQsRes.status === 200 && allQsRes.body.totalQuestions === 260, 'API /api/fr/questions returns 260 total questions');

  console.log('================================================================');
  console.log(`🏁 SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log('================================================================');

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
})();

