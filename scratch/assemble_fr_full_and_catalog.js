const fs = require('fs');
const path = require('path');

const frDir = path.join(__dirname, '..', 'data', 'fr');
const rootDir = path.join(__dirname, '..');

const topicFiles = [
  { id: 1, file: 'topic_1_conceptual_framework.json', title: 'Conceptual Framework for Financial Reporting', count: 8 },
  { id: 2, file: 'topic_2_general_presentation_inventories.json', title: 'Ind AS for General & Specialised Entities (Presentation, Inventories, Cash Flows, Policies)', count: 8 },
  { id: 3, file: 'topic_3_ppe_intangibles_impairment.json', title: 'Property, Plant and Equipment (PPE), Intangible Assets, and Impairment', count: 8 },
  { id: 4, file: 'topic_4_revenue_recognition.json', title: 'Revenue Recognition and Construction Contracts (Ind AS 115)', count: 8 },
  { id: 5, file: 'topic_5_leases_employee_sharebased_tax.json', title: 'Leases, Employee Benefits, Share-Based Payments, and Income Taxes', count: 8 },
  { id: 6, file: 'topic_6_provisions_contingencies_events.json', title: 'Provisions, Contingent Liabilities, and Events After the Reporting Period', count: 8 },
  { id: 7, file: 'topic_7_financial_instruments.json', title: 'Financial Instruments: Recognition, Measurement, and Classification', count: 8 },
  { id: 8, file: 'topic_8_business_combinations_consolidation.json', title: 'Business Combinations and Consolidated Financial Statements', count: 8 },
  { id: 9, file: 'topic_9_associates_joint_arrangements.json', title: 'Associates and Joint Arrangements (Ind AS 28, 111)', count: 8 },
  { id: 10, file: 'topic_10_forex_hyperinflation.json', title: 'Foreign Currency Transactions and Hyperinflation (Ind AS 21, 29)', count: 7 },
  { id: 11, file: 'topic_11_grants_borrowing_costs.json', title: 'Accounting for Government Grants and Borrowing Costs (Ind AS 20, 23)', count: 7 },
  { id: 12, file: 'topic_12_interim_segment_reporting.json', title: 'Interim and Segment Reporting (Ind AS 34, 108)', count: 7 },
  { id: 13, file: 'topic_13_insurance_banking_nbfc.json', title: 'Accounting for Insurance, Banking, and Non-Banking Financial Company (NBFC) Entities', count: 7 }
];

let allFrQuestions = [];
let fullMock100 = [];
const catalog = {
  subject: "Financial Reporting (FR)",
  group: "Group I",
  paperCode: "PAPER_1",
  totalTopics: 13,
  questionsPerTopic: 20,
  timePerTopicMinutes: 15,
  totalTopicQuestions: 260,
  fullExam: {
    title: "Paper 1: Financial Reporting (FR) - Comprehensive Grand Examination",
    totalQuestions: 100,
    timeLimitMinutes: 180,
    totalMarks: 200,
    marksPerQuestion: 2,
    negativeMarking: 0,
    fileName: "fr_full_paper_100q.json",
    coverage: "All 13 Financial Reporting Topics Included"
  },
  topics: []
};

let qIndexCounter = 1;

topicFiles.forEach(tf => {
  const filePath = path.join(frDir, tf.file);
  const qs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`Loaded Topic ${tf.id}: ${tf.title} (${qs.length} questions)`);

  allFrQuestions.push(...qs);

  // Take tf.count questions for the 100-question full exam
  const selectedForMock = qs.slice(0, tf.count);
  selectedForMock.forEach(q => {
    fullMock100.push({
      ...q,
      id: qIndexCounter++,
      examType: "FR_FULL_MOCK_100Q",
      examTitle: "Financial Reporting Full Paper (100 Qs • 3 Hours)",
      timeLimitMinutes: 180
    });
  });

  catalog.topics.push({
    topicId: tf.id,
    topicTitle: tf.title,
    questionCount: qs.length,
    timeLimitMinutes: 15,
    totalMarks: 40,
    difficulty: "Difficult",
    pattern: "Case-Based PYQs",
    fileName: tf.file,
    path: `data/fr/${tf.file}`
  });
});

console.log(`Total FR Questions compiled: ${allFrQuestions.length}`);
console.log(`Total Full Mock Questions assembled: ${fullMock100.length}`);

// Save files
fs.writeFileSync(path.join(frDir, 'fr_full_paper_100q.json'), JSON.stringify(fullMock100, null, 2), 'utf8');
fs.writeFileSync(path.join(frDir, 'fr_topics_catalog.json'), JSON.stringify(catalog, null, 2), 'utf8');
fs.writeFileSync(path.join(frDir, 'financial_reporting_all_questions.json'), JSON.stringify(allFrQuestions, null, 2), 'utf8');
fs.writeFileSync(path.join(rootDir, 'data', 'financial_reporting_all_questions.json'), JSON.stringify(allFrQuestions, null, 2), 'utf8');
fs.writeFileSync(path.join(rootDir, 'data', 'fr_full_paper_100q.json'), JSON.stringify(fullMock100, null, 2), 'utf8');

console.log('Successfully saved:');
console.log(' - data/fr/fr_full_paper_100q.json (100 Qs)');
console.log(' - data/fr/fr_topics_catalog.json (Catalog)');
console.log(' - data/fr/financial_reporting_all_questions.json (260 Qs)');
console.log(' - data/financial_reporting_all_questions.json (260 Qs)');

