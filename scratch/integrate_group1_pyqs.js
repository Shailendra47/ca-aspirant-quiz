const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const p1Qs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'group1_paper1_fr_pyq.json'), 'utf8'));
const p2Qs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'group1_paper2_afm_pyq.json'), 'utf8'));
const p3Qs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'group1_paper3_audit_pyq.json'), 'utf8'));

console.log(`Loaded: P1 (${p1Qs.length}), P2 (${p2Qs.length}), P3 (${p3Qs.length})`);

// 1. Inject Group 1 Dedicated PYQ Questions before CHAPTER_META
const injectionMarker = '    // Chapter & Real Paper Metadata (Official ICAI 100-Mark Pattern)';
if (!content.includes('const GROUP1_P1_QUESTIONS =')) {
  const injection = `    // Group 1 Dedicated 20-Question Case-Based PYQs (15-Minute Sprint)
    const GROUP1_P1_QUESTIONS = ${JSON.stringify(p1Qs, null, 2)};
    const GROUP1_P2_QUESTIONS = ${JSON.stringify(p2Qs, null, 2)};
    const GROUP1_P3_QUESTIONS = ${JSON.stringify(p3Qs, null, 2)};

`;
  content = content.replace(injectionMarker, injection + injectionMarker);
  console.log('Injected GROUP1_P1_QUESTIONS, GROUP1_P2_QUESTIONS, GROUP1_P3_QUESTIONS');
}

// 2. Update CHAPTER_META for Group 1 (Papers 1, 2, 3 and Chapters 1 to 6)
// Replace REAL_PAPER_1, 2, 3 in CHAPTER_META
const oldRealPaper1 = `'REAL_PAPER_1': {
        title: "Paper 1: Financial Reporting (FR) - Section A",
        shortTitle: "Paper 1: FR",
        total: 15,
        marksPerQ: 2,
        totalMarks: 30,
        time: 45,
        isRealPaper: true,
        group: "Group I"
      },`;
const newRealPaper1 = `'REAL_PAPER_1': {
        title: "Paper 1: Financial Reporting (FR) - Group 1 Case-Based PYQs",
        shortTitle: "Paper 1: FR (PYQs)",
        total: 20,
        marksPerQ: 2,
        totalMarks: 40,
        time: 15,
        isRealPaper: true,
        group: "Group I",
        difficulty: "Difficult",
        pattern: "Case-Based PYQs"
      },`;

const oldRealPaper2 = `'REAL_PAPER_2': {
        title: "Paper 2: Advanced Financial Management (AFM) - Section A",
        shortTitle: "Paper 2: AFM",
        total: 15,
        marksPerQ: 2,
        totalMarks: 30,
        time: 45,
        isRealPaper: true,
        group: "Group I"
      },`;
const newRealPaper2 = `'REAL_PAPER_2': {
        title: "Paper 2: Advanced Financial Management (AFM) - Group 1 Case-Based PYQs",
        shortTitle: "Paper 2: AFM (PYQs)",
        total: 20,
        marksPerQ: 2,
        totalMarks: 40,
        time: 15,
        isRealPaper: true,
        group: "Group I",
        difficulty: "Difficult",
        pattern: "Case-Based PYQs"
      },`;

const oldRealPaper3 = `'REAL_PAPER_3': {
        title: "Paper 3: Advanced Auditing, Assurance & Professional Ethics - Section A",
        shortTitle: "Paper 3: Audit & Ethics",
        total: 15,
        marksPerQ: 2,
        totalMarks: 30,
        time: 45,
        isRealPaper: true,
        group: "Group I"
      },`;
const newRealPaper3 = `'REAL_PAPER_3': {
        title: "Paper 3: Advanced Auditing, Assurance & Ethics - Group 1 Case-Based PYQs",
        shortTitle: "Paper 3: Audit (PYQs)",
        total: 20,
        marksPerQ: 2,
        totalMarks: 40,
        time: 15,
        isRealPaper: true,
        group: "Group I",
        difficulty: "Difficult",
        pattern: "Case-Based PYQs"
      },`;

content = content.replace(oldRealPaper1, newRealPaper1);
content = content.replace(oldRealPaper2, newRealPaper2);
content = content.replace(oldRealPaper3, newRealPaper3);

// Update chapter metadata times to 15 mins for Group 1 chapters
for (let i = 1; i <= 6; i++) {
  content = content.replace(new RegExp(`${i}:\\s*\\{[^}]*time:\\s*20[^}]*\\}`), (m) => {
    return m.replace(/time:\s*20/, 'time: 15');
  });
}

// 3. Update question filtering in openPreTestInstructions
const oldFilter = `if (testKey === 'REAL_PAPER_3') {
        const pool = QUESTIONS.filter(q => [1, 2, 3, 4].includes(q.chapter));
        currentTestQuestions = pool.slice(0, 15);
      } else if (testKey === 'REAL_PAPER_2') {
        const pool = QUESTIONS.filter(q => [5, 6].includes(q.chapter));
        currentTestQuestions = pool.slice(0, 15);
      } else if (testKey === 'REAL_PAPER_1') {
        currentTestQuestions = QUESTIONS.slice(0, 15);`;

const newFilter = `if (testKey === 'REAL_PAPER_1') {
        currentTestQuestions = (typeof GROUP1_P1_QUESTIONS !== 'undefined' && GROUP1_P1_QUESTIONS.length) ? GROUP1_P1_QUESTIONS : QUESTIONS.slice(0, 20);
      } else if (testKey === 'REAL_PAPER_2') {
        currentTestQuestions = (typeof GROUP1_P2_QUESTIONS !== 'undefined' && GROUP1_P2_QUESTIONS.length) ? GROUP1_P2_QUESTIONS : QUESTIONS.filter(q => [5, 6].includes(q.chapter)).slice(0, 20);
      } else if (testKey === 'REAL_PAPER_3') {
        currentTestQuestions = (typeof GROUP1_P3_QUESTIONS !== 'undefined' && GROUP1_P3_QUESTIONS.length) ? GROUP1_P3_QUESTIONS : QUESTIONS.filter(q => [1, 2, 3, 4].includes(q.chapter)).slice(0, 20);`;

content = content.replace(oldFilter, newFilter);

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully updated index.html with Group 1 20-20 PYQs and 15min timing!');

