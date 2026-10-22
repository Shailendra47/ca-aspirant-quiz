const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Read CHAPTER_META and question sources
const metaMatch = content.match(/const CHAPTER_META = (\{[\s\S]*?\n\s*\};)/);
if (!metaMatch) {
  console.error('CHAPTER_META not found');
  process.exit(1);
}

// Evaluate CHAPTER_META in a safe context
const metaCode = metaMatch[0];
const fn = new Function(metaCode + '; return CHAPTER_META;');
const CHAPTER_META = fn();

console.log('Total CHAPTER_META keys:', Object.keys(CHAPTER_META).length);

// Categorize keys
const categories = {
  fullMocks: [],
  realPapers: [],
  frTopics: [],
  afmTopics: [],
  auditTopics: [],
  celTopics: [],
  chapters: [],
  allMock: []
};

Object.keys(CHAPTER_META).forEach(k => {
  if (k.endsWith('_FULL_MOCK')) categories.fullMocks.push(k);
  else if (k.startsWith('REAL_PAPER_') || k === 'PAPER_LAW') categories.realPapers.push(k);
  else if (k.startsWith('FR_TOPIC_')) categories.frTopics.push(k);
  else if (k.startsWith('AFM_TOPIC_')) categories.afmTopics.push(k);
  else if (k.startsWith('AUDIT_TOPIC_')) categories.auditTopics.push(k);
  else if (k.startsWith('CEL_TOPIC_')) categories.celTopics.push(k);
  else if (['1','2','3','4','5','6'].includes(String(k))) categories.chapters.push(k);
  else if (k === 'ALL') categories.allMock.push(k);
});

console.log('Categories summary:');
console.log('Full Mocks (100 Qs):', categories.fullMocks);
console.log('Real Papers (Section A):', categories.realPapers);
console.log('FR Topics (20 Qs):', categories.frTopics.length);
console.log('AFM Topics (20 Qs):', categories.afmTopics.length);
console.log('Audit Topics (20 Qs):', categories.auditTopics.length);
console.log('CEL Topics (20 Qs):', categories.celTopics.length);
console.log('Chapter Tests (20 Qs):', categories.chapters.length);
console.log('Speed Mock ALL:', categories.allMock.length);

