const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');

console.log('================================================================');
console.log('🧪 VERIFYING ADVANCED FINANCIAL MANAGEMENT (AFM) 11 TOPICS & 100Q FULL TEST');
console.log('================================================================');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ [FAIL] ${message}`);
    process.exit(1);
  }
  console.log(`✅ [PASS] ${message}`);
}

const html = fs.readFileSync('index.html', 'utf8');

// 1. Verify Paper 2 Card Buttons
assert(html.includes("openPreTestInstructions('AFM_FULL_MOCK')") && html.includes("Full Test (100 Qs • 3 Hours)"), 'Paper 2 card contains "Full Test (100 Qs • 3 Hours)" button');
assert(html.includes("openAfmTopicsModal()") && html.includes("11 Topic Tests (20-20 Qs)"), 'Paper 2 card contains "11 Topic Tests (20-20 Qs)" button');

// 2. Verify Modal HTML
assert(html.includes('id="afmTopicsModal"'), 'index.html contains #afmTopicsModal for browsing all 11 topics');

// 3. Load Environment and sandbox
const domElements = {};
function getOrCreateEl(id) {
  if (!domElements[id]) {
    domElements[id] = {
      id,
      textContent: '',
      innerHTML: '',
      value: '',
      className: '',
      classList: {
        contains: (c) => (domElements[id].className || '').includes(c),
        add: (c) => { domElements[id].className += ' ' + c; },
        remove: (c) => { domElements[id].className = (domElements[id].className || '').replace(new RegExp('\\b' + c + '\\b', 'g'), '').trim(); }
      },
      style: {},
      setAttribute: () => {},
      removeAttribute: () => {},
      children: [],
      appendChild: () => {},
      querySelector: () => null,
      querySelectorAll: () => []
    };
  }
  return domElements[id];
}

const sandbox = {
  console,
  scrollTo: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  setTimeout: (fn) => setTimeout(fn, 0),
  clearTimeout: () => {},
  setInterval: () => 123,
  clearInterval: () => {},
  Date,
  Math,
  parseInt,
  parseFloat,
  Number,
  String,
  Boolean,
  Array,
  Object,
  RegExp,
  JSON,
  document: {
    getElementById: (id) => getOrCreateEl(id),
    querySelector: () => ({ getBoundingClientRect: () => ({ top: 0, left: 0 }) }),
    querySelectorAll: () => [],
    createElement: (tag) => getOrCreateEl('dynamic_' + tag),
    body: getOrCreateEl('body'),
    title: ''
  },
  window: {
    scrollTo: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    }
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  showToast: () => {},
  confetti: () => {}
};
sandbox.window = sandbox;

const context = vm.createContext(sandbox);

const scriptMatches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];
scriptMatches.forEach((m) => {
  try {
    vm.runInContext(m[1], context);
  } catch (e) {
    // ignore harmless DOM re-render errors
  }
});

// 4. Test Modal Opening & Closing
sandbox.openAfmTopicsModal();
assert(!domElements['afmTopicsModal'].classList.contains('hidden'), 'openAfmTopicsModal() executed successfully');
sandbox.closeAfmTopicsModal();
assert(domElements['afmTopicsModal'].classList.contains('hidden'), 'closeAfmTopicsModal() executed successfully');

// 5. Verify AFM Full Mock (100 Questions, 180 Minutes, 200 Marks)
sandbox.openPreTestInstructions('AFM_FULL_MOCK');
let curQuestions = vm.runInContext('currentTestQuestions', context);
assert(curQuestions.length === 100, 'AFM Full Mock loaded exactly 100 questions');
assert(domElements['instDuration'].textContent === '180', 'AFM Full Mock duration is 180 Mins (3 Hours)');
assert(domElements['instMaxMarks'].textContent.includes('200 Marks'), 'AFM Full Mock max marks is 200 Marks');
assert(domElements['instTotalQs'].textContent.includes('100 Questions'), 'AFM Full Mock displays 100 Questions');
assert(domElements['instTypeBadge'].textContent.includes('Full Examination'), 'AFM Full Mock badge indicates Full Examination');

sandbox.launchCbtExam();
assert(vm.runInContext('examTotalSeconds', context) === 10800, 'AFM Full Mock CBT exam clock initialized to 10,800s (3 Hours countdown)');
assert(curQuestions.every(q => q.subject.includes('Financial Management')), 'AFM Full Mock: All questions belong to Advanced Financial Management');
assert(curQuestions.every(q => q.difficulty === 'Difficult'), 'AFM Full Mock: All 100 questions are Difficult level');

// 6. Verify Each of the 11 Topics (20 Questions, 15 Minutes, 40 Marks)
for (let tId = 1; tId <= 11; tId++) {
  const testKey = `AFM_TOPIC_${tId}`;
  sandbox.openPreTestInstructions(testKey);
  curQuestions = vm.runInContext('currentTestQuestions', context);
  assert(curQuestions.length === 20, `AFM Topic ${tId} loaded exactly 20 questions`);
  assert(domElements['instDuration'].textContent === '15', `AFM Topic ${tId} Pre-Test duration is 15 Mins`);
  assert(domElements['instMaxMarks'].textContent.includes('40 Marks'), `AFM Topic ${tId} max marks is 40 Marks`);

  sandbox.launchCbtExam();
  assert(vm.runInContext('examTotalSeconds', context) === 900, `AFM Topic ${tId} CBT exam clock initialized to 900s (15:00 countdown)`);
  assert(curQuestions.every(q => q.topicId === tId), `AFM Topic ${tId}: All questions correspond to Topic ID ${tId}`);
  assert(curQuestions.every(q => q.difficulty === 'Difficult'), `AFM Topic ${tId}: All questions are Difficult level`);
  assert(curQuestions.every(q => q.isCaseBased === true || q.type === 'Case-Based PYQ'), `AFM Topic ${tId}: All questions are Case-Based PYQs`);
}

// 7. Verify JSON Files on Disk
const catalog = JSON.parse(fs.readFileSync('data/afm/afm_topics_catalog.json', 'utf8'));
assert(catalog.topics.length === 11, 'afm_topics_catalog.json lists all 11 topics');
assert(catalog.fullMockExam.questionCount === 100 && catalog.fullMockExam.timeLimitMinutes === 180, 'afm_topics_catalog.json confirms 100 questions and 180 minutes for full exam');

const full100 = JSON.parse(fs.readFileSync('data/afm/afm_full_paper_100q.json', 'utf8'));
assert(full100.questions.length === 100, 'data/afm/afm_full_paper_100q.json contains exactly 100 questions');

const all220 = JSON.parse(fs.readFileSync('data/afm/advanced_financial_management_all_questions.json', 'utf8'));
assert(all220.length === 220, 'data/afm/advanced_financial_management_all_questions.json contains exactly 220 questions (11 × 20)');

// 8. Verify Live Backend REST API
function testApi(urlPath, validator, label) {
  return new Promise((resolve) => {
    http.get({ host: 'localhost', port: 5000, path: urlPath }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          assert(res.statusCode === 200 && validator(json), label);
          resolve(true);
        } catch (e) {
          assert(false, `${label} (Error: ${e.message})`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      assert(false, `${label} (Connection Error: ${err.message})`);
      resolve(false);
    });
  });
}

(async () => {
  await testApi('/api/afm/topics', j => j.topics && j.topics.length === 11, 'API /api/afm/topics returns 11 topics');
  await testApi('/api/afm/full-test', j => j.questions && j.questions.length === 100 && j.timeLimitMinutes === 180, 'API /api/afm/full-test returns 100 Qs and 180 minutes');
  await testApi('/api/afm/topic/1', j => j.questions && j.questions.length === 20 && j.timeLimitMinutes === 15, 'API /api/afm/topic/1 returns 20 Qs and 15 mins');
  await testApi('/api/afm/topic/11', j => j.questions && j.questions.length === 20 && j.timeLimitMinutes === 15, 'API /api/afm/topic/11 returns 20 Qs and 15 mins');
  await testApi('/api/afm/questions', j => j.questions && j.questions.length === 220, 'API /api/afm/questions returns 220 total questions');

  console.log('================================================================');
  console.log('🏁 SUMMARY: ALL AFM TESTS PASSED SUCCESSFULLY!');
  console.log('================================================================');
  process.exit(0);
})();
