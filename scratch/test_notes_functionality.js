const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf-8');
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);

const createdElements = {};
function mockElement(id) {
  if (!createdElements[id]) {
    createdElements[id] = {
      id,
      classList: {
        classes: new Set(),
        add(c) { this.classes.add(c); },
        remove(c) { this.classes.delete(c); },
        contains(c) { return this.classes.has(c); },
        toggle(c) { if (this.classes.has(c)) this.classes.delete(c); else this.classes.add(c); }
      },
      style: {},
      setAttribute: (k, v) => {},
      getAttribute: (k) => '',
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
  return createdElements[id];
}

const sandbox = {
  console: console,
  window: {
    scrollTo: () => {},
    addEventListener: () => {},
    print: () => {}
  },
  tailwind: { config: {} },
  document: {
    getElementById: (id) => mockElement(id),
    querySelectorAll: (sel) => {
      if (sel === '.note-side-item' || sel === '.notes-chapter-card') {
        const fakeItems = [];
        for (let i = 0; i < 25; i++) {
          fakeItems.push({
            id: `fake-${i}`,
            getAttribute: () => 'fake',
            classList: { add: () => {}, remove: () => {} }
          });
        }
        return fakeItems;
      }
      return [];
    },
    querySelector: () => null,
    createElement: (tag) => mockElement(tag + Math.random()),
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

console.log('================================================================');
console.log('🧪 TESTING TEXTBOOK NOTES (GROUP I & GROUP II) CONTROLLER');
console.log('================================================================');

const allTopics = [
  // Group I (FR)
  'g1-fr-framework',
  'g1-fr-consolidation',
  'g1-fr-business-combinations',
  'g1-fr-financial-instruments',
  // Group I (SFM)
  'g1-sfm-capital-budgeting',
  'g1-sfm-cost-of-capital',
  'g1-sfm-derivatives',
  'g1-sfm-portfolio',
  'g1-sfm-valuation',
  // Group I (Audit)
  'g1-aud-process',
  'g1-aud-standards',
  'g1-aud-ethics',
  // Group II (CEL)
  'g2-law-companies-act',
  'g2-law-sebi',
  'g2-law-fema',
  'g2-law-competition',
  'g2-law-ibc',
  // Group II (SCMPE)
  'g2-scm-abc',
  'g2-scm-target-costing',
  'g2-scm-decision-tools',
  'g2-scm-performance',
  // Folio
  'all'
];

let passCount = 0;
let failCount = 0;

allTopics.forEach(tId => {
  try {
    sandbox.switchNotesTopic(tId);
    console.log(`✅ [PASS] switchNotesTopic('${tId}') executed`);
    passCount++;
  } catch (e) {
    console.error(`❌ [FAIL] switchNotesTopic('${tId}'):`, e.message);
    failCount++;
  }
});

// Test backward compatibility switchNotesChapter(1..6)
[1, 2, 3, 4, 5, 6, 'all'].forEach(ch => {
  try {
    sandbox.switchNotesChapter(ch);
    console.log(`✅ [PASS] switchNotesChapter(${ch}) executed`);
    passCount++;
  } catch (e) {
    console.error(`❌ [FAIL] switchNotesChapter(${ch}):`, e.message);
    failCount++;
  }
});

// Test filterNotesByGroup
['ALL', 'G1', 'G2'].forEach(grp => {
  try {
    sandbox.filterNotesByGroup(grp);
    console.log(`✅ [PASS] filterNotesByGroup('${grp}') executed`);
    passCount++;
  } catch (e) {
    console.error(`❌ [FAIL] filterNotesByGroup('${grp}'):`, e.message);
    failCount++;
  }
});

// Test search
['ind as', 'sebi', 'abc', ''].forEach(query => {
  try {
    sandbox.handleNotesSearch(query);
    console.log(`✅ [PASS] handleNotesSearch('${query}') executed`);
    passCount++;
  } catch (e) {
    console.error(`❌ [FAIL] handleNotesSearch('${query}'):`, e.message);
    failCount++;
  }
});

console.log('================================================================');
console.log(`🏁 SUMMARY: ${passCount} PASSED, ${failCount} FAILED.`);
console.log('================================================================');

if (failCount > 0) process.exit(1);

