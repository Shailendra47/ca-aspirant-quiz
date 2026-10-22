const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

console.log('Line 23-35:');
console.log(lines.slice(22, 35).join('\n'));

console.log('Line 5165-5175:');
console.log(lines.slice(5164, 5175).join('\n'));

console.log('Where are the question constants defined?');
lines.forEach((l, i) => {
  if (l.includes('const FR_FULL_MOCK_QUESTIONS') || l.includes('const AFM_FULL_MOCK_QUESTIONS') || l.includes('const AUDIT_FULL_MOCK_QUESTIONS') || l.includes('const CEL_FULL_MOCK_QUESTIONS') || l.includes('const QUESTIONS =')) {
    console.log(`Line ${i+1}: ${l.trim().substring(0, 60)}`);
  }
});
