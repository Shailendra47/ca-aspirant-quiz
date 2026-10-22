const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const scripts = [...html.matchAll(/<script(?:\s+type="text\/javascript"|\s+defer)?\s*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
const code = scripts[1];

const vm = require('vm');
const sandbox = {};
vm.createContext(sandbox);

const arrNames = [
  'QUESTIONS',
  'FR_FULL_MOCK_QUESTIONS',
  'AFM_FULL_MOCK_QUESTIONS',
  'AUDIT_FULL_MOCK_QUESTIONS',
  'CEL_FULL_MOCK_QUESTIONS',
  'GROUP1_P1_QUESTIONS',
  'GROUP1_P2_QUESTIONS',
  'GROUP1_P3_QUESTIONS'
];

arrNames.forEach(name => {
  const m = code.match(new RegExp('(?:const|let|var)\\s+' + name + '\\s*=\\s*(\\[[\\s\\S]*?\\n\\s*\\]);'));
  if (m) {
    try {
      const arr = vm.runInContext(m[1], sandbox);
      console.log(`Checking ${name} (${arr.length} Qs)...`);
      let badCount = 0;
      arr.forEach((q, idx) => {
        if (!q || !q.question || !Array.isArray(q.options) || q.options.length !== 4 || typeof q.correct !== 'number') {
          console.error(`  BAD question at index ${idx}:`, q);
          badCount++;
        }
      });
      if (badCount === 0) console.log(`  All ${arr.length} questions in ${name} are VALID!`);
    } catch(err) {
      console.error(`Error loading ${name}:`, err.message);
    }
  } else {
    console.warn(`Could not extract ${name}`);
  }
});
