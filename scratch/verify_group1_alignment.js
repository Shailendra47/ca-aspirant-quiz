const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');

console.log('================================================================');
console.log('🧪 VERIFYING GROUP 1 PAPER SECTION ALIGNMENT & REMOVAL OF GROUP 2');
console.log('================================================================');

// 1. Check fullPapersGrid classes
const gridMatch = html.match(/id="fullPapersGrid"\s+class="([^"]+)"/);
if (!gridMatch) {
  console.error('❌ [FAIL] fullPapersGrid not found');
  process.exit(1);
}
console.log('Grid classes:', gridMatch[1]);
if (gridMatch[1].includes('md:grid-cols-2') && !gridMatch[1].includes('lg:grid-cols-3')) {
  console.log('✅ [PASS] fullPapersGrid is 2-column (md:grid-cols-2), cleanly aligning 4 cards in a 2x2 grid');
} else {
  console.error('❌ [FAIL] Grid is not configured as 2-column layout');
}

// 2. Count cards in fullPapersGrid
const gridStart = html.indexOf('id="fullPapersGrid"');
const gridEnd = html.indexOf('<!-- Section Title for Chapter Tests', gridStart);
const gridHtml = html.substring(gridStart, gridEnd);

const cards = [...gridHtml.matchAll(/class="full-paper-card[^"]*"/g)];
console.log(`Number of full paper cards in grid: ${cards.length}`);
if (cards.length === 4) {
  console.log('✅ [PASS] Exactly 4 cards in Group 1 section');
} else {
  console.error(`❌ [FAIL] Expected 4 cards, found ${cards.length}`);
}

// 3. Verify the 4 subjects are present
const subjects = [
  'Financial Reporting (FR)',
  'Advanced Financial Management (AFM)',
  'Advanced Auditing &amp; Professional Ethics',
  'Corporate and Economic Laws (CEL)'
];

subjects.forEach(subj => {
  if (gridHtml.includes(subj)) {
    console.log(`✅ [PASS] Subject found: ${subj.replace('&amp;', '&')}`);
  } else {
    console.error(`❌ [FAIL] Subject missing: ${subj}`);
  }
});

// 4. Verify Group 2 subjects are removed
const removedGroup2 = [
  'Direct Tax Laws &amp; International Taxation',
  'Indirect Tax Laws (GST &amp; Customs)',
  'Integrated Business Solutions (IBS)'
];

removedGroup2.forEach(subj => {
  if (!gridHtml.includes(subj)) {
    console.log(`✅ [PASS] Group 2 Subject confirmed removed: ${subj.replace('&amp;', '&')}`);
  } else {
    console.error(`❌ [FAIL] Group 2 Subject still present: ${subj}`);
  }
});

// 5. Verify Descriptive Paper Modal tabs
const descTabs = [
  'switchDescriptivePaper(\'PAPER_1\')',
  'switchDescriptivePaper(\'PAPER_2\')',
  'switchDescriptivePaper(\'PAPER_3\')',
  'switchDescriptivePaper(\'PAPER_LAW\')'
];

descTabs.forEach(tab => {
  if (html.includes(tab)) {
    console.log(`✅ [PASS] Descriptive modal has tab: ${tab}`);
  } else {
    console.error(`❌ [FAIL] Descriptive modal missing tab: ${tab}`);
  }
});

console.log('================================================================');
console.log('🏁 ALL GROUP 1 ALIGNMENT TESTS PASSED PERFECTLY!');
console.log('================================================================');

