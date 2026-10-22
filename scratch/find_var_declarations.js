const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const vars = [
  'FR_FULL_MOCK_QUESTIONS',
  'AFM_FULL_MOCK_QUESTIONS',
  'AUDIT_FULL_MOCK_QUESTIONS',
  'CEL_FULL_MOCK_QUESTIONS',
  'QUESTIONS',
  'GROUP1_P1_QUESTIONS',
  'GROUP1_P2_QUESTIONS',
  'GROUP1_P3_QUESTIONS'
];

vars.forEach(v => {
  const count = (html.match(new RegExp('\\b' + v + '\\b', 'g')) || []).length;
  console.log(`${v}: ${count} occurrences`);
  // Find where it's assigned (= [ or = {)
  const assignMatch = html.match(new RegExp('(?:const|let|var|window\\.)\\s*' + v + '\\s*=', 'g'));
  console.log(`  Declarations: ${assignMatch ? assignMatch.join(', ') : 'NONE'}`);
});
