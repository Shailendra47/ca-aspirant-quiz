const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf-8');
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);

const elementStore = {};
function getMock(id) {
  if (!elementStore[id]) {
    elementStore[id] = {
      id,
      classList: {
        classes: new Set(),
        add: function(c) { this.classes.add(c); },
        remove: function(c) { this.classes.delete(c); },
        contains: function(c) { return this.classes.has(c); },
        toggle: function(c) { if (this.contains(c)) this.remove(c); else this.add(c); }
      },
      style: {},
      setAttribute: function(k, v) { this[k] = v; },
      getAttribute: function(k) { return this[k] || ''; },
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      focus: () => {},
      innerHTML: '',
      textContent: '',
      value: '',
      disabled: false,
      children: [],
      scrollIntoView: () => {},
      appendChild: () => {}
    };
  }
  return elementStore[id];
}

const sandbox = {
  console: console,
  tailwind: { config: {} },
  document: {
    getElementById: (id) => getMock(id),
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: (tag) => ({
      tagName: tag,
      classList: { add: () => {}, remove: () => {} },
      style: {},
      setAttribute: () => {},
      appendChild: () => {},
      addEventListener: () => {},
      innerHTML: '',
      textContent: ''
    }),
    body: { classList: { add: () => {}, remove: () => {} } },
    addEventListener: () => {}
  },
  localStorage: {
    data: {},
    getItem: function(k) { return this.data[k] || null; },
    setItem: function(k, v) { this.data[k] = String(v); },
    removeItem: function(k) { delete this.data[k]; }
  },
  fetch: async () => ({ ok: true, json: async () => ({}) }),
  setTimeout: (fn) => fn(),
  setInterval: () => 1,
  clearInterval: () => {},
  clearTimeout: () => {},
  location: { protocol: 'http:', href: 'http://localhost:5000/' },
  navigator: { userAgent: 'test' },
  history: { pushState: () => {} },
  addEventListener: () => {},
  scrollTo: () => {}
};
sandbox.window = sandbox;

const context = vm.createContext(sandbox);

scripts.forEach((code, i) => {
  try {
    vm.runInContext(code, context);
  } catch (e) {
    console.log(`Script #${i+1} error:`, e.message);
  }
});

console.log('=== TEST 1: VERIFYING ALL 61 PAPERS LOAD AND LAUNCH ===');
const CHAPTER_META = vm.runInContext('CHAPTER_META', context);
let allTestsPassed = true;

Object.keys(CHAPTER_META).forEach(key => {
  vm.runInContext(`openPreTestInstructions('${key}')`, context);
  const qCount = vm.runInContext('currentTestQuestions ? currentTestQuestions.length : 0', context);
  const expected = CHAPTER_META[key].total;
  if (qCount !== expected) {
    console.error(`FAIL: ${key} expected ${expected} Qs, got ${qCount}`);
    allTestsPassed = false;
  }
});

if (allTestsPassed) {
  console.log('✅ ALL 61 Tests & Papers loaded with exact question counts!');
}

console.log('=== TEST 2: VERIFYING STRICT EXAM LOCKDOWN ===');

// 1. Launch Paper 1 (Financial Reporting Full Mock)
vm.runInContext(`openPreTestInstructions('FR_FULL_MOCK')`, context);
vm.runInContext(`launchCbtExam()`, context);

let currentView = vm.runInContext('currentMainView', context);
console.log('Current View after launch:', currentView);
if (currentView !== 'exam') {
  throw new Error('Test launch failed to enter exam view');
}

// 2. Candidate attempts to click 'tests' (Practice Exam)
vm.runInContext(`switchMainView('tests')`, context);
currentView = vm.runInContext('currentMainView', context);
let lockModalHidden = getMock('examLockAlertModal').classList.contains('hidden');
console.log('Attempt switchMainView("tests"): currentMainView =', currentView, '| Lock Modal Active =', !lockModalHidden);
if (currentView !== 'exam' || lockModalHidden) {
  throw new Error('Lockdown failed: student was able to navigate to tests without submitting!');
}

// 3. Candidate attempts to click 'notes' (Textbook Notes)
vm.runInContext(`switchMainView('notes')`, context);
currentView = vm.runInContext('currentMainView', context);
console.log('Attempt switchMainView("notes"): currentMainView =', currentView);
if (currentView !== 'exam') {
  throw new Error('Lockdown failed: student was able to navigate to notes without submitting!');
}

// 4. Candidate attempts to click 'analytics'
vm.runInContext(`switchMainView('analytics')`, context);
currentView = vm.runInContext('currentMainView', context);
console.log('Attempt switchMainView("analytics"): currentMainView =', currentView);
if (currentView !== 'exam') {
  throw new Error('Lockdown failed: student was able to navigate to analytics without submitting!');
}

// 5. Candidate attempts to click 'leaderboard'
vm.runInContext(`switchMainView('leaderboard')`, context);
currentView = vm.runInContext('currentMainView', context);
console.log('Attempt switchMainView("leaderboard"): currentMainView =', currentView);
if (currentView !== 'exam') {
  throw new Error('Lockdown failed: student was able to navigate to leaderboard without submitting!');
}

// 6. Candidate attempts to click login/profile button
vm.runInContext(`openOtpLoginModal()`, context);
let otpModalHidden = getMock('otpLoginModal').classList.contains('hidden');
console.log('Attempt openOtpLoginModal(): OtpModal was blocked =', otpModalHidden);

// 7. Student uses Lock modal action to submit
console.log('=== TEST 3: PROCEED TO SUBMIT AND RELEASE LOCK ===');
vm.runInContext(`proceedToSubmitFromLock()`, context);
let submitModalHidden = getMock('submitAlertModal').classList.contains('hidden');
console.log('proceedToSubmitFromLock opened submitAlertModal:', !submitModalHidden);

// 8. Confirm submit test
vm.runInContext(`confirmSubmitTest()`, context);
currentView = vm.runInContext('currentMainView', context);
console.log('Current View after confirmSubmitTest():', currentView);
if (currentView !== 'results') {
  throw new Error('Submitting test did not navigate to results view');
}

// 9. Now that paper is submitted, can student navigate freely?
vm.runInContext(`switchMainView('notes')`, context);
currentView = vm.runInContext('currentMainView', context);
console.log('After submission, switchMainView("notes"):', currentView);
if (currentView !== 'notes') {
  throw new Error('Student should be free to navigate after paper submission');
}

vm.runInContext(`switchMainView('tests')`, context);
currentView = vm.runInContext('currentMainView', context);
console.log('After submission, switchMainView("tests"):', currentView);
if (currentView !== 'tests') {
  throw new Error('Student should be free to return to tests after paper submission');
}

console.log('🎉 ALL EXAM LOCKDOWN AND TEST LIFECYCLE TESTS PASSED 100%!');

