const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Check script execution of openPreTestInstructions and launchCbtExam
const scriptMatches = [...html.matchAll(/<script(?:\s+type="text\/javascript"|\s+defer)?\s*>([\s\S]*?)<\/script>/gi)];
console.log('Script tags count:', scriptMatches.length);

// Let's inspect the questions variables in script #1 (the inlined data script)
const dataScript = scriptMatches[0][1];
console.log('Has FR_FULL_MOCK_QUESTIONS?', dataScript.includes('FR_FULL_MOCK_QUESTIONS'));
console.log('Has AFM_FULL_MOCK_QUESTIONS?', dataScript.includes('AFM_FULL_MOCK_QUESTIONS'));
console.log('Has AUDIT_FULL_MOCK_QUESTIONS?', dataScript.includes('AUDIT_FULL_MOCK_QUESTIONS'));
console.log('Has CEL_FULL_MOCK_QUESTIONS?', dataScript.includes('CEL_FULL_MOCK_QUESTIONS'));
console.log('Has QUESTIONS?', dataScript.includes('const QUESTIONS =') || dataScript.includes('var QUESTIONS =') || dataScript.includes('let QUESTIONS ='));
