const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf-8');
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);

const sandbox = {
  console: console,
  tailwind: { config: {} },
  document: {
    getElementById: (id) => ({
      id,
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
      focus: () => {},
      innerHTML: '',
      textContent: '',
      value: '',
      disabled: false,
      children: [],
      scrollIntoView: () => {},
      appendChild: () => {}
    }),
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
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  fetch: async () => ({ ok: true, json: async () => ({}) }),
  setTimeout: () => {},
  setInterval: () => 1,
  clearInterval: () => {},
  clearTimeout: () => {},
  location: { protocol: 'http:', href: 'http://localhost:5000/' },
  navigator: { userAgent: 'test' },
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

const CHAPTER_META = vm.runInContext('CHAPTER_META', context);
console.log('Total CHAPTER_META keys found:', Object.keys(CHAPTER_META).length);

let passCount = 0;
let failCount = 0;

Object.keys(CHAPTER_META).forEach(key => {
  try {
    vm.runInContext(`openPreTestInstructions('${key}')`, context);
    const qCount = vm.runInContext('currentTestQuestions ? currentTestQuestions.length : 0', context);
    const expected = CHAPTER_META[key].total;

    if (qCount !== expected) {
      console.error(`[FAIL] ${key}: Expected ${expected} questions, got ${qCount}`);
      failCount++;
      return;
    }

    // Launch CBT exam
    vm.runInContext('launchCbtExam()', context);
    const currentView = vm.runInContext('currentMainView', context);
    if (currentView !== 'exam') {
      console.error(`[FAIL] ${key}: currentMainView is not 'exam' after launch (got ${currentView})`);
      failCount++;
      return;
    }

    passCount++;
  } catch (err) {
    console.error(`[ERROR] ${key}:`, err.message);
    failCount++;
  }
});

console.log(`Results: ${passCount} / ${Object.keys(CHAPTER_META).length} tests passed! (Fails: ${failCount})`);

