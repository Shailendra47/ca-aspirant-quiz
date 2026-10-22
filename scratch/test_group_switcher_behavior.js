const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');

// Parse DOM cards and elements from HTML string
const cardMatches = [...html.matchAll(/class="[^"]*full-paper-card[^"]*"[^>]*data-group="([^"]+)"/g)];
console.log('DOM check: Total full-paper-cards in index.html:', cardMatches.length);

const cardMocks = cardMatches.map(m => {
  const group = m[1];
  return {
    group,
    getAttribute: (a) => (a === 'data-group' ? group : ''),
    classList: {
      hidden: group === 'G2',
      add: function(c) { if (c === 'hidden') this.hidden = true; },
      remove: function(c) { if (c === 'hidden') this.hidden = false; }
    }
  };
});

const elementMap = {
  tabGroupAll: { className: '' },
  tabGroup1: { className: '' },
  tabGroup2: { className: '' },
  papersSectionTitle: { textContent: '' },
  papersSectionSub: { textContent: '' },
  groupStandardPill: { textContent: '' }
};

const sandbox = {
  console: console,
  document: {
    querySelectorAll: (sel) => {
      if (sel === '.full-paper-card') return cardMocks;
      return [];
    },
    getElementById: (id) => elementMap[id] || { className: '', textContent: '', classList: { add: () => {}, remove: () => {} } },
    addEventListener: () => {}
  },
  window: { addEventListener: () => {} },
  localStorage: { getItem: () => null, setItem: () => {} },
  setTimeout: () => {},
  setInterval: () => 1,
  clearInterval: () => {}
};
sandbox.window = sandbox;

const context = vm.createContext(sandbox);
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
scripts.forEach(s => {
  try { vm.runInContext(s, context); } catch(e) {}
});

// 1. Switch to G1
console.log('\n--- Testing switchFullPapersGroup("G1") ---');
vm.runInContext('switchFullPapersGroup("G1")', context);
let visibleG1 = cardMocks.filter(c => c.group === 'G1' && !c.classList.hidden).length;
let visibleG2 = cardMocks.filter(c => c.group === 'G2' && !c.classList.hidden).length;
console.log(`G1 active: ${visibleG1} G1 cards visible, ${visibleG2} G2 cards visible`);
console.log('Title:', elementMap.papersSectionTitle.textContent);
console.log('Pill:', elementMap.groupStandardPill.textContent);

if (visibleG1 !== 4 || visibleG2 !== 0) throw new Error('G1 view failed');

// 2. Switch to G2
console.log('\n--- Testing switchFullPapersGroup("G2") ---');
vm.runInContext('switchFullPapersGroup("G2")', context);
visibleG1 = cardMocks.filter(c => c.group === 'G1' && !c.classList.hidden).length;
visibleG2 = cardMocks.filter(c => c.group === 'G2' && !c.classList.hidden).length;
console.log(`G2 active: ${visibleG1} G1 cards visible, ${visibleG2} G2 cards visible`);
console.log('Title:', elementMap.papersSectionTitle.textContent);
console.log('Pill:', elementMap.groupStandardPill.textContent);

if (visibleG1 !== 0 || visibleG2 !== 3) throw new Error('G2 view failed');

// 3. Switch to ALL
console.log('\n--- Testing switchFullPapersGroup("ALL") ---');
vm.runInContext('switchFullPapersGroup("ALL")', context);
visibleG1 = cardMocks.filter(c => c.group === 'G1' && !c.classList.hidden).length;
visibleG2 = cardMocks.filter(c => c.group === 'G2' && !c.classList.hidden).length;
console.log(`ALL active: ${visibleG1} G1 cards visible, ${visibleG2} G2 cards visible (Total: ${visibleG1 + visibleG2})`);
console.log('Title:', elementMap.papersSectionTitle.textContent);

if (visibleG1 !== 4 || visibleG2 !== 3) throw new Error('ALL view failed');

console.log('\n✅ ALL GROUP SWITCHER BEHAVIOR TESTS PASSED 100%!');

