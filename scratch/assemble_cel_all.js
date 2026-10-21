const fs = require('fs');
const path = require('path');
const { CEL_TOPICS } = require('./cel_topics_def');

console.log('================================================================');
console.log('📦 ASSEMBLING CORPORATE AND ECONOMIC LAWS (CEL) DATASET');
console.log('================================================================');

const allQuestions = [];
const topicFilesMap = {};

CEL_TOPICS.forEach(topic => {
  const filePath = path.join('data', 'cel', topic.fileName);
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

console.log(`\nTotal questions across all 9 topics: ${allQuestions.length} (Expected: 180)`);
if (allQuestions.length !== 180) {
  throw new Error(`Total questions count ${allQuestions.length} !== 180`);
}

// 1. Write master database files
fs.writeFileSync('data/cel/corporate_and_economic_laws_all_questions.json', JSON.stringify(allQuestions, null, 2));
fs.writeFileSync('data/corporate_and_economic_laws_all_questions.json', JSON.stringify(allQuestions, null, 2));
console.log('✅ Saved master database: data/cel/corporate_and_economic_laws_all_questions.json');
console.log('✅ Saved root copy: data/corporate_and_economic_laws_all_questions.json');

// 2. Build 100-Question Full Exam:
// Distribution across 9 topics:
// Topic 1: 12 Qs
// Topic 2: 11 Qs
// Topic 3: 11 Qs
// Topic 4: 12 Qs
// Topic 5: 11 Qs
// Topic 6: 11 Qs
// Topic 7: 11 Qs
// Topic 8: 11 Qs
// Topic 9: 10 Qs
// Total = 100 Qs!
const pickCounts = {
  1: 12,
  2: 11,
  3: 11,
  4: 12,
  5: 11,
  6: 11,
  7: 11,
  8: 11,
  9: 10
};

const fullMockQuestions = [];
let fullMockId = 1;

for (let tId = 1; tId <= 9; tId++) {
  const tQuestions = topicFilesMap[tId];
  const countToPick = pickCounts[tId];
  const picked = tQuestions.slice(0, countToPick);
  picked.forEach(q => {
    fullMockQuestions.push({
      ...q,
      fullExamQuestionNumber: fullMockId++,
      examType: "CEL Full Mock 100Q Exam"
    });
  });
}

console.log(`\nFull Mock Questions selected: ${fullMockQuestions.length} (Expected: 100)`);
if (fullMockQuestions.length !== 100) {
  throw new Error(`Full mock questions count ${fullMockQuestions.length} !== 100`);
}

const fullMockPayload = {
  subject: "Corporate and Economic Laws",
  paper: "Corporate & Economic Laws",
  examTitle: "ICAI CA Final Corporate and Economic Laws (CEL) — Full 100-Question Comprehensive Examination",
  questionCount: 100,
  timeLimitMinutes: 180,
  totalMarks: 200,
  marksPerQuestion: 2,
  negativeMarking: 0,
  difficulty: "Difficult",
  coverage: "All 9 Syllabus Modules of ICAI CA Final Corporate and Economic Laws (Companies Act, Winding Up/NCLT, LLP, IBC, SEBI, FEMA, Competition Act, Contract Act, Consumer Protection & Economic Legislation)",
  questions: fullMockQuestions
};

fs.writeFileSync('data/cel/cel_full_paper_100q.json', JSON.stringify(fullMockPayload, null, 2));
fs.writeFileSync('data/cel_full_paper_100q.json', JSON.stringify(fullMockPayload, null, 2));
console.log('✅ Saved 100Q Full Exam: data/cel/cel_full_paper_100q.json (180 Mins, 200 Marks)');
console.log('✅ Saved root copy: data/cel_full_paper_100q.json');

// 3. Build Topics Catalog Descriptor
const catalog = {
  subject: "Corporate and Economic Laws",
  paper: "Corporate & Economic Laws",
  group: "Group 1",
  totalTopics: 9,
  totalQuestionsInBank: 180,
  fullMockExam: {
    title: "CEL Comprehensive 100Q Full Exam",
    questionCount: 100,
    timeLimitMinutes: 180,
    totalMarks: 200,
    marksPerQuestion: 2,
    negativeMarking: 0,
    fileName: "cel_full_paper_100q.json"
  },
  topics: CEL_TOPICS.map(t => ({
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

fs.writeFileSync('data/cel/cel_topics_catalog.json', JSON.stringify(catalog, null, 2));
console.log('✅ Saved Topics Catalog: data/cel/cel_topics_catalog.json');
console.log('\n🎉 ALL CORPORATE AND ECONOMIC LAWS (CEL) DATASET ASSEMBLED SUCCESSFULLY!');

