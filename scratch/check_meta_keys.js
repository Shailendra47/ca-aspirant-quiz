const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('const CHAPTER_META = {');
const end = html.indexOf('};', start);
const metaCode = html.substring(start, end + 2);

console.log('Has FR_FULL_MOCK in CHAPTER_META?', metaCode.includes("'FR_FULL_MOCK'") || metaCode.includes('"FR_FULL_MOCK"'));
console.log('Has AFM_FULL_MOCK in CHAPTER_META?', metaCode.includes("'AFM_FULL_MOCK'") || metaCode.includes('"AFM_FULL_MOCK"'));
console.log('Has AUDIT_FULL_MOCK in CHAPTER_META?', metaCode.includes("'AUDIT_FULL_MOCK'") || metaCode.includes('"AUDIT_FULL_MOCK"'));
console.log('Has CEL_FULL_MOCK in CHAPTER_META?', metaCode.includes("'CEL_FULL_MOCK'") || metaCode.includes('"CEL_FULL_MOCK"'));
console.log('Has ALL in CHAPTER_META?', metaCode.includes("'ALL'") || metaCode.includes('"ALL"'));
console.log('Has REAL_PAPER_1 in CHAPTER_META?', metaCode.includes("'REAL_PAPER_1'") || metaCode.includes('"REAL_PAPER_1"'));
console.log('Has REAL_PAPER_4 in CHAPTER_META?', metaCode.includes("'REAL_PAPER_4'") || metaCode.includes('"REAL_PAPER_4"'));
console.log('Has REAL_PAPER_5 in CHAPTER_META?', metaCode.includes("'REAL_PAPER_5'") || metaCode.includes('"REAL_PAPER_5"'));
console.log('Has REAL_PAPER_6 in CHAPTER_META?', metaCode.includes("'REAL_PAPER_6'") || metaCode.includes('"REAL_PAPER_6"'));
