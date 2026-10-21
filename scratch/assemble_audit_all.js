const fs = require('fs');
const path = require('path');
const { AUDIT_TOPICS } = require('./audit_topics_def');

console.log('================================================================');
console.log('📦 ASSEMBLING ADVANCED AUDITING, ASSURANCE & PROFESSIONAL ETHICS (AAAPE) DATASET');
console.log('================================================================');

const allQuestions = [];
const topicFilesMap = {};

AUDIT_TOPICS.forEach(topic => {
  const filePath = path.join('data', 'audit', topic.fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing expected topic file: ${filePath}`);
  }
  const qList = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (qList.length !== 20) {
    throw new Error(`Topic ${topic.topicId} (${topic.fileName}) has ${qList.length} questions, expected 20!`);
  }
  topicFilesMap[topic.topicId] = qList;
  allQuestions.push(...qList);
  console.log(`✅ Topic ${topic.topicId}: ${topic.topicTitle} -> 20 Questions Verified`);
});

console.log(`\nTotal questions across all 11 topics: ${allQuestions.length} (Expected: 220)`);
if (allQuestions.length !== 220) {
  throw new Error(`Total questions count ${allQuestions.length} !== 220`);
}

// 1. Write master database files
fs.writeFileSync('data/audit/advanced_auditing_all_questions.json', JSON.stringify(allQuestions, null, 2));
fs.writeFileSync('data/advanced_auditing_all_questions.json', JSON.stringify(allQuestions, null, 2));
console.log('✅ Saved master database: data/audit/advanced_auditing_all_questions.json');
console.log('✅ Saved root copy: data/advanced_auditing_all_questions.json');

// 2. Build 100-Question Full Exam:
// Proportional distribution across 11 topics:
// Topics 1 to 10: 9 questions each = 90 questions
// Topic 11: 10 questions = 10 questions
// Total = 100 questions!
const fullMockQuestions = [];
let fullMockId = 1;

for (let tId = 1; tId <= 11; tId++) {
  const tQuestions = topicFilesMap[tId];
  const countToPick = tId === 11 ? 10 : 9;
  const picked = tQuestions.slice(0, countToPick);
  picked.forEach(q => {
    fullMockQuestions.push({
      ...q,
      fullExamQuestionNumber: fullMockId++,
      examType: "Audit Full Mock 100Q Exam"
    });
  });
}

console.log(`\nFull Mock Questions selected: ${fullMockQuestions.length} (Expected: 100)`);
if (fullMockQuestions.length !== 100) {
  throw new Error(`Full mock questions count ${fullMockQuestions.length} !== 100`);
}

const fullMockPayload = {
  subject: "Advanced Auditing, Assurance and Professional Ethics",
  paper: "Paper 3",
  examTitle: "ICAI CA Final Advanced Auditing, Assurance and Professional Ethics (AAAPE) — Full 100-Question Comprehensive Examination",
  questionCount: 100,
  timeLimitMinutes: 180,
  totalMarks: 200,
  marksPerQuestion: 2,
  negativeMarking: 0,
  difficulty: "Difficult",
  coverage: "All 11 Syllabus Modules of ICAI CA Final AAAPE (Standards on Auditing, Entities, Reporting, Assurance, Forensic, Digital, Governance & Ethics)",
  questions: fullMockQuestions
};

fs.writeFileSync('data/audit/audit_full_paper_100q.json', JSON.stringify(fullMockPayload, null, 2));
fs.writeFileSync('data/audit_full_paper_100q.json', JSON.stringify(fullMockPayload, null, 2));
console.log('✅ Saved 100Q Full Exam: data/audit/audit_full_paper_100q.json (180 Mins, 200 Marks)');
console.log('✅ Saved root copy: data/audit_full_paper_100q.json');

// 3. Build Topics Catalog Descriptor
const catalog = {
  subject: "Advanced Auditing, Assurance and Professional Ethics",
  paper: "Paper 3",
  group: "Group 1",
  totalTopics: 11,
  totalQuestionsInBank: 220,
  fullMockExam: {
    title: "AAAPE Comprehensive 100Q Full Exam",
    questionCount: 100,
    timeLimitMinutes: 180,
    totalMarks: 200,
    marksPerQuestion: 2,
    negativeMarking: 0,
    fileName: "audit_full_paper_100q.json"
  },
  topics: AUDIT_TOPICS.map(t => ({
    topicId: t.topicId,
    topicTitle: t.topicTitle,
    shortTitle: t.shortTitle,
    fileName: t.fileName,
    questionCount: 20,
    timeLimitMinutes: 15,
    totalMarks: 40,
    marksPerQuestion: 2,
    negativeMarking: 0,
    difficulty: "Difficult",
    pattern: "Case-Based PYQs",
    syllabus: t.syllabus
  }))
};

fs.writeFileSync('data/audit/audit_topics_catalog.json', JSON.stringify(catalog, null, 2));
console.log('✅ Saved Topics Catalog: data/audit/audit_topics_catalog.json');
console.log('================================================================');
