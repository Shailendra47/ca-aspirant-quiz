const fs = require('fs');
const path = require('path');
const { AFM_TOPICS } = require('./afm_topics_def');

console.log('================================================================');
console.log('📦 ASSEMBLING ADVANCED FINANCIAL MANAGEMENT (AFM) DATASET');
console.log('================================================================');

const allQuestions = [];
const topicFilesMap = {};

AFM_TOPICS.forEach(topic => {
  const filePath = path.join('data', 'afm', topic.fileName);
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
fs.writeFileSync('data/afm/advanced_financial_management_all_questions.json', JSON.stringify(allQuestions, null, 2));
fs.writeFileSync('data/advanced_financial_management_all_questions.json', JSON.stringify(allQuestions, null, 2));
console.log('✅ Saved master database: data/afm/advanced_financial_management_all_questions.json');
console.log('✅ Saved root copy: data/advanced_financial_management_all_questions.json');

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
      examType: "AFM Full Mock 100Q Exam"
    });
  });
}

console.log(`\nFull Mock Questions selected: ${fullMockQuestions.length} (Expected: 100)`);
if (fullMockQuestions.length !== 100) {
  throw new Error(`Full mock questions count ${fullMockQuestions.length} !== 100`);
}

const fullMockPayload = {
  subject: "Advanced Financial Management",
  paper: "Paper 2",
  examTitle: "ICAI CA Final Advanced Financial Management (AFM) — Full 100-Question Comprehensive Examination",
  questionCount: 100,
  timeLimitMinutes: 180,
  totalMarks: 200,
  marksPerQuestion: 2,
  negativeMarking: 0,
  difficulty: "Difficult",
  coverage: "All 11 Syllabus Modules of ICAI CA Final AFM",
  questions: fullMockQuestions
};

fs.writeFileSync('data/afm/afm_full_paper_100q.json', JSON.stringify(fullMockPayload, null, 2));
fs.writeFileSync('data/afm_full_paper_100q.json', JSON.stringify(fullMockPayload, null, 2));
console.log('✅ Saved 100Q Full Exam: data/afm/afm_full_paper_100q.json (180 Mins, 200 Marks)');
console.log('✅ Saved root copy: data/afm_full_paper_100q.json');

// 3. Build Topics Catalog Descriptor
const catalog = {
  subject: "Advanced Financial Management",
  paper: "Paper 2",
  group: "Group 1",
  totalTopics: 11,
  totalQuestionsInBank: 220,
  fullMockExam: {
    title: "AFM Comprehensive 100Q Full Exam",
    questionCount: 100,
    timeLimitMinutes: 180,
    totalMarks: 200,
    marksPerQuestion: 2,
    negativeMarking: 0,
    fileName: "afm_full_paper_100q.json"
  },
  topics: AFM_TOPICS.map(t => ({
    topicId: t.topicId,
    topicTitle: t.topicTitle,
    shortTitle: t.shortTitle,
    questionCount: 20,
    timeLimitMinutes: 15,
    totalMarks: 40,
    difficulty: "Difficult",
    pattern: "Case-Based PYQs",
    syllabus: t.syllabus,
    fileName: t.fileName,
    path: `data/afm/${t.fileName}`
  }))
};

fs.writeFileSync('data/afm/afm_topics_catalog.json', JSON.stringify(catalog, null, 2));
console.log('✅ Saved catalog: data/afm/afm_topics_catalog.json');

console.log('\n================================================================');
console.log('🎉 ALL AFM DATASETS GENERATED AND VERIFIED SUCCESSFULLY!');
console.log('================================================================');

