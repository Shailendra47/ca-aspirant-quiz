const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Check question counts in constants
const scripts = [...html.matchAll(/<script(?:\s+type="text\/javascript"|\s+defer)?\s*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
const code = scripts[1];

// We can check with regex lengths of arrays
const mockVars = ['FR_FULL_MOCK_QUESTIONS', 'AFM_FULL_MOCK_QUESTIONS', 'AUDIT_FULL_MOCK_QUESTIONS', 'CEL_FULL_MOCK_QUESTIONS'];
mockVars.forEach(v => {
  const match = code.match(new RegExp('const\\s+' + v + '\\s*=\\s*(\\[[\\s\\S]*?\\n\\s*\\]);'));
  if (match) {
    try {
      const arr = JSON.parse(match[1]);
      console.log(`${v}: ${arr.length} questions`);
    } catch(e) {
      console.log(`${v} JSON parse error:`, e.message);
    }
  } else {
    console.log(`${v} declaration not matched`);
  }
});
