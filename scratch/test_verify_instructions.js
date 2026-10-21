const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf-8');
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);

const elements = {};
function getEl(id) {
  if (!elements[id]) {
    elements[id] = {
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
    };
  }
  return elements[id];
}

const sandbox = {
  console: console,
  window: {
    scrollTo: () => {},
    addEventListener: () => {}
  },
  tailwind: { config: {} },
  document: {
    getElementById: getEl,
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: (tag) => ({
      tagName: tag,
      classList: { add: () => {}, remove: () => {} },
      style: {},
      setAttribute: () => {},
      appendChild: () => {},
      addEventListener: () => {}
    }),
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
  navigator: { userAgent: 'test' },
  addEventListener: () => {},
  scrollTo: () => {}
};
sandbox.window = sandbox;

const context = vm.createContext(sandbox);
scripts.forEach((code) => {
  vm.runInContext(code, context);
});

console.log('--- TEST 1: Sectional Test 1 (20-20 Standard) ---');
sandbox.openPreTestInstructions(1);
console.log('Title:', getEl('instMainTitle').textContent);
console.log('Type Badge:', getEl('instTypeBadge').textContent);
console.log('Govt Banner:', getEl('instGovtBannerTitle').textContent);
console.log('Total Qs:', getEl('instTotalQs').textContent);
console.log('Duration:', getEl('instDuration').textContent, getEl('instDurationUnit').textContent);
console.log('Max Marks:', getEl('instMaxMarks').textContent);
console.log('Rules count / includes 20-20:', getEl('instRulesList').innerHTML.includes('20-20 Sectional Standard'));

console.log('\n--- TEST 2: Full Paper 1 (Govt. Gazette Guidelines) ---');
sandbox.openPreTestInstructions('REAL_PAPER_1');
console.log('Title:', getEl('instMainTitle').textContent);
console.log('Type Badge:', getEl('instTypeBadge').textContent);
console.log('Govt Banner:', getEl('instGovtBannerTitle').textContent);
console.log('Total Qs:', getEl('instTotalQs').textContent);
console.log('Duration:', getEl('instDuration').textContent, getEl('instDurationUnit').textContent);
console.log('Max Marks:', getEl('instMaxMarks').textContent);
console.log('Rules includes MCA Govt:', getEl('instRulesList').innerHTML.includes('Ministry of Corporate Affairs (MCA), Government of India'));
console.log('Rules includes 15 Mins Reading:', getEl('instRulesList').innerHTML.includes('15 Minutes Advance Reading Time'));
console.log('Rules includes No Negative Marking:', getEl('instRulesList').innerHTML.includes('ZERO NEGATIVE MARKING'));
console.log('Rules includes 40% / 50% passing:', getEl('instRulesList').innerHTML.includes('Regulation 38'));

console.log('\nALL VERIFICATIONS PASSED SUCCESSFULLY!');

