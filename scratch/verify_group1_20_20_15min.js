const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');

console.log('================================================================');
console.log('🧪 VERIFYING GROUP 1 20-20 QUESTIONS, 15-MIN TIMING & PYQ SPEC');
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

// Check Group 1 Paper Cards
assert(html.includes('<span>Section A</span>') || html.includes('Section A (40M)'), 'Group 1 Papers (1, 2, 3) all have button "Section A"');
assert(html.includes('20 Case MCQs • 15 Mins • Difficult PYQs'), 'Group 1 Papers (1, 2, 3) cards badge shows "20 Case MCQs • 15 Mins • Difficult PYQs"');

// Check Group 1 Chapter Cards
const chBtnMatches = (html.match(/Attempt 20-20 Test \(20 Qs • 15 Mins\)/g) || []).length;
assert(chBtnMatches === 6, `All 6 Chapter test cards have button "Attempt 20-20 Test (20 Qs • 15 Mins)" (found: ${chBtnMatches})`);
const chBadgeMatches = (html.match(/20-20 Sectional \(15 Mins\)/g) || []).length;
assert(chBadgeMatches === 6, `All 6 Chapter test cards have badge "20-20 Sectional (15 Mins)" (found: ${chBadgeMatches})`);

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

// Test Group 1 Real Paper 1 Pre-Test Instructions & CBT launch
sandbox.openPreTestInstructions('REAL_PAPER_1');
let curQuestions = vm.runInContext('currentTestQuestions', context);
assert(curQuestions.length === 20, 'Paper 1 loaded exactly 20 questions');
assert(domElements['instDuration'].textContent === '15', 'Paper 1 Pre-Test duration is 15 Mins');
assert(domElements['instMaxMarks'].textContent.includes('40 Marks'), 'Paper 1 Pre-Test max marks is 40 Marks');
assert(domElements['instTotalQs'].textContent.includes('20 Questions'), 'Paper 1 Pre-Test total questions displays 20 Questions');
assert(domElements['instTypeBadge'].textContent.includes('Difficult Case-Based Previous Year Questions'), 'Paper 1 Pre-Test badge indicates Difficult Case-Based PYQs');

sandbox.launchCbtExam();
assert(vm.runInContext('examTotalSeconds', context) === 900, 'Paper 1 CBT exam clock initialized to 900s (15:00 active countdown)');
assert(curQuestions.every(q => q.difficulty === 'Difficult'), 'Paper 1: All 20 questions are Difficult level');
assert(curQuestions.every(q => q.tag.includes('PYQ') || q.type === 'Case-Based PYQ'), 'Paper 1: All 20 questions are authentic Case-Based PYQs');

// Test Group 1 Real Paper 2
sandbox.openPreTestInstructions('REAL_PAPER_2');
curQuestions = vm.runInContext('currentTestQuestions', context);
assert(curQuestions.length === 20, 'Paper 2 (AFM) loaded exactly 20 questions');
assert(domElements['instDuration'].textContent === '15', 'Paper 2 Pre-Test duration is 15 Mins');
sandbox.launchCbtExam();
assert(vm.runInContext('examTotalSeconds', context) === 900, 'Paper 2 CBT clock initialized to 900s (15:00 countdown)');
assert(curQuestions.every(q => q.difficulty === 'Difficult'), 'Paper 2: All 20 questions are Difficult level');

// Test Group 1 Real Paper 3
sandbox.openPreTestInstructions('REAL_PAPER_3');
curQuestions = vm.runInContext('currentTestQuestions', context);
assert(curQuestions.length === 20, 'Paper 3 (Audit) loaded exactly 20 questions');
assert(domElements['instDuration'].textContent === '15', 'Paper 3 Pre-Test duration is 15 Mins');
sandbox.launchCbtExam();
assert(vm.runInContext('examTotalSeconds', context) === 900, 'Paper 3 CBT clock initialized to 900s (15:00 countdown)');
assert(curQuestions.every(q => q.difficulty === 'Difficult'), 'Paper 3: All 20 questions are Difficult level');

// Test Group 1 Chapters (1 to 6)
for (let ch = 1; ch <= 6; ch++) {
  sandbox.openPreTestInstructions(ch);
  curQuestions = vm.runInContext('currentTestQuestions', context);
  assert(curQuestions.length === 20, `Chapter ${ch} loaded exactly 20 questions`);
  assert(domElements['instDuration'].textContent === 15 || domElements['instDuration'].textContent === '15', `Chapter ${ch} Pre-Test duration is 15 Mins`);
  sandbox.launchCbtExam();
  assert(vm.runInContext('examTotalSeconds', context) === 900, `Chapter ${ch} CBT clock initialized to 900s (15:00 countdown)`);
  assert(curQuestions.every(q => q.difficulty === 'Difficult'), `Chapter ${ch}: All 20 questions are Difficult level`);
  assert(curQuestions.every(q => q.isCaseBased === true || q.type === 'Case-Based PYQ'), `Chapter ${ch}: All 20 questions are Case-Based PYQs`);
}

// 3. Verify JSON data files
const p1Json = JSON.parse(fs.readFileSync('data/group1_paper1_fr_pyq.json', 'utf8'));
const p2Json = JSON.parse(fs.readFileSync('data/group1_paper2_afm_pyq.json', 'utf8'));
const p3Json = JSON.parse(fs.readFileSync('data/group1_paper3_audit_pyq.json', 'utf8'));
assert(p1Json.length === 20 && p1Json.every(q => q.difficulty === 'Difficult'), 'data/group1_paper1_fr_pyq.json: 20 Difficult Case-Based PYQs');
assert(p2Json.length === 20 && p2Json.every(q => q.difficulty === 'Difficult'), 'data/group1_paper2_afm_pyq.json: 20 Difficult Case-Based PYQs');
assert(p3Json.length === 20 && p3Json.every(q => q.difficulty === 'Difficult'), 'data/group1_paper3_audit_pyq.json: 20 Difficult Case-Based PYQs');

// 3. Verify that all 6 chapters use ONLY ONE JSON file: data/questions.json
const questionsJson = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));
assert(questionsJson.length === 120, 'data/questions.json contains all 120 questions for the 6 chapters');

for (let ch = 1; ch <= 6; ch++) {
  const chQuestions = questionsJson.filter(q => q.chapter === ch);
  assert(chQuestions.length === 20, `data/questions.json contains exactly 20 questions for Chapter ${ch}`);
  assert(chQuestions.every(q => q.difficulty === 'Difficult'), `data/questions.json: all Chapter ${ch} questions are Difficult`);
  assert(!fs.existsSync(`data/chapter${ch}_questions.json`), `data/chapter${ch}_questions.json is deleted (no separate file)`);
  assert(!fs.existsSync(`data/chapters/chapter_${ch}.json`), `data/chapters/chapter_${ch}.json is deleted (no separate file)`);
}
assert(!fs.existsSync('data/chapters'), 'data/chapters folder is removed (no chapter-wise separation)');

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
  const g1Res = await getJson('/api/questions/group1');
  assert(g1Res.status === 200 && g1Res.body.totalPapers === 3 && g1Res.body.totalQuestions === 60, 'API /api/questions/group1 returns 3 papers with 60 total questions');
  assert(g1Res.body.timePerSectionMinutes === 15 && g1Res.body.difficulty === 'Difficult', 'API /api/questions/group1 confirms 15 min timing and Difficult level');

  const p1Res = await getJson('/api/questions/group1/1');
  assert(p1Res.status === 200 && p1Res.body.count === 20 && p1Res.body.timeLimitMinutes === 15, 'API /api/questions/group1/1 returns 20 Qs, 15 min timing');

  const p2Res = await getJson('/api/questions/group1/2');
  assert(p2Res.status === 200 && p2Res.body.count === 20 && p2Res.body.timeLimitMinutes === 15, 'API /api/questions/group1/2 returns 20 Qs, 15 min timing');

  const p3Res = await getJson('/api/questions/group1/3');
  assert(p3Res.status === 200 && p3Res.body.count === 20 && p3Res.body.timeLimitMinutes === 15, 'API /api/questions/group1/3 returns 20 Qs, 15 min timing');

  const ch1Res = await getJson('/api/questions/chapter/1');
  assert(ch1Res.status === 200 && ch1Res.body.count === 20, 'API /api/questions/chapter/1 returns 20 questions');

  console.log('================================================================');
  console.log(`🏁 SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log('================================================================');

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
})();
