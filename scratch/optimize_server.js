const fs = require('fs');
const path = require('path');

const serverFilePath = path.join(__dirname, '..', 'server', 'server.js');
let serverCode = fs.readFileSync(serverFilePath, 'utf8');

// 1. Add compound indexes
const oldSchemaEnd = `const Question = mongoose.model('Question', QuestionSchema);
const Attempt = mongoose.model('Attempt', AttemptSchema);
const LeaderboardEntry = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);`;

const newSchemaEnd = `// Compound & Field Indexes for maximum query velocity
QuestionSchema.index({ chapter: 1, id: 1 });
AttemptSchema.index({ user: 1, createdAt: -1 });
LeaderboardEntrySchema.index({ chapterCode: 1, submittedAt: -1 });
LeaderboardEntrySchema.index({ chapterCode: 1, score: -1, timeSpentSeconds: 1 });

const Question = mongoose.model('Question', QuestionSchema);
const Attempt = mongoose.model('Attempt', AttemptSchema);
const LeaderboardEntry = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);`;

if (!serverCode.includes('QuestionSchema.index({ chapter: 1, id: 1 });')) {
  serverCode = serverCode.replace(oldSchemaEnd, newSchemaEnd);
}

// 2. Add getCachedJson helper after INITIAL_QUESTIONS
const cacheHelperCode = `
// High-performance In-Memory JSON Cache with mtime auto-invalidation
const jsonFileCache = new Map();

function getCachedJson(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const stat = fs.statSync(filePath);
    const cached = jsonFileCache.get(filePath);
    if (cached && cached.mtimeMs === stat.mtimeMs) {
      return cached.data;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    jsonFileCache.set(filePath, { mtimeMs: stat.mtimeMs, data });
    return data;
  } catch (err) {
    return null;
  }
}

function invalidateJsonCache(filePath) {
  if (filePath) {
    jsonFileCache.delete(filePath);
  } else {
    jsonFileCache.clear();
  }
}
`;

if (!serverCode.includes('function getCachedJson(')) {
  serverCode = serverCode.replace(
    "const INITIAL_QUESTIONS = require(path.join(__dirname, '..', 'data', 'questions.json'));",
    "const INITIAL_QUESTIONS = require(path.join(__dirname, '..', 'data', 'questions.json'));\n" + cacheHelperCode
  );
}

// 3. Optimize /api/questions/chapters
const oldQChapters = `app.get('/api/questions/chapters', async (req, res) => {
  try {
    const questionsFile = path.join(__dirname, '..', 'data', 'questions.json');
    let allQs = [];
    if (fs.existsSync(questionsFile)) {
      allQs = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
    } else {
      allQs = await Question.find().sort({ id: 1 }).lean();
    }`;

const newQChapters = `app.get('/api/questions/chapters', async (req, res) => {
  try {
    const questionsFile = path.join(__dirname, '..', 'data', 'questions.json');
    let allQs = getCachedJson(questionsFile);
    if (!allQs) {
      allQs = await Question.find().sort({ id: 1 }).lean();
    }`;

serverCode = serverCode.replace(oldQChapters, newQChapters);

// 4. Optimize /api/questions/chapter/:id
const oldQChapterId = `app.get('/api/questions/chapter/:id', async (req, res) => {
  try {
    const chId = Number(req.params.id);
    const questionsFile = path.join(__dirname, '..', 'data', 'questions.json');
    if (fs.existsSync(questionsFile)) {
      const allQs = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
      const filtered = allQs.filter(q => q.chapter === chId);`;

const newQChapterId = `app.get('/api/questions/chapter/:id', async (req, res) => {
  try {
    const chId = Number(req.params.id);
    const questionsFile = path.join(__dirname, '..', 'data', 'questions.json');
    const allQs = getCachedJson(questionsFile);
    if (allQs) {
      const filtered = allQs.filter(q => q.chapter === chId);`;

serverCode = serverCode.replace(oldQChapterId, newQChapterId);

// 5. Optimize /api/questions/group1
const oldQGroup1 = `app.get('/api/questions/group1', (req, res) => {
  try {
    const dataDir = path.join(__dirname, '..', 'data');
    const p1 = JSON.parse(fs.readFileSync(path.join(dataDir, 'group1_paper1_fr_pyq.json'), 'utf8'));
    const p2 = JSON.parse(fs.readFileSync(path.join(dataDir, 'group1_paper2_afm_pyq.json'), 'utf8'));
    const p3 = JSON.parse(fs.readFileSync(path.join(dataDir, 'group1_paper3_audit_pyq.json'), 'utf8'));`;

const newQGroup1 = `app.get('/api/questions/group1', (req, res) => {
  try {
    const dataDir = path.join(__dirname, '..', 'data');
    const p1 = getCachedJson(path.join(dataDir, 'group1_paper1_fr_pyq.json')) || [];
    const p2 = getCachedJson(path.join(dataDir, 'group1_paper2_afm_pyq.json')) || [];
    const p3 = getCachedJson(path.join(dataDir, 'group1_paper3_audit_pyq.json')) || [];`;

serverCode = serverCode.replace(oldQGroup1, newQGroup1);

// 6. Optimize /api/questions/group1/paper/:paper
const oldQG1Paper = `    const qs = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));`;
const newQG1Paper = `    const qs = getCachedJson(path.join(dataDir, file));
    if (!qs) {
      return res.status(404).json({ error: 'Group 1 Paper questions file not found.' });
    }`;
serverCode = serverCode.replace(oldQG1Paper, newQG1Paper);

// 7. Optimize FR endpoints
const oldFrTopics = `app.get('/api/fr/topics', (req, res) => {
  try {
    const catalogPath = path.join(__dirname, '..', 'data', 'fr', 'fr_topics_catalog.json');
    if (fs.existsSync(catalogPath)) {
      const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      return res.json(catalog);
    }
    res.status(404).json({ error: 'FR Topics catalog not found' });`;

const newFrTopics = `app.get('/api/fr/topics', (req, res) => {
  try {
    const catalogPath = path.join(__dirname, '..', 'data', 'fr', 'fr_topics_catalog.json');
    const catalog = getCachedJson(catalogPath);
    if (catalog) {
      return res.json(catalog);
    }
    res.status(404).json({ error: 'FR Topics catalog not found' });`;

serverCode = serverCode.replace(oldFrTopics, newFrTopics);

const oldFrTopicId = `    const fileName = topicFileMap[topicId];
    const filePath = path.join(__dirname, '..', 'data', 'fr', fileName);
    if (fs.existsSync(filePath)) {
      const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return res.json({`;

const newFrTopicId = `    const fileName = topicFileMap[topicId];
    const filePath = path.join(__dirname, '..', 'data', 'fr', fileName);
    const questions = getCachedJson(filePath);
    if (questions) {
      return res.json({`;

serverCode = serverCode.replace(oldFrTopicId, newFrTopicId);

const oldFrFullTest = `app.get('/api/fr/full-test', (req, res) => {
  try {
    const fullTestPath = path.join(__dirname, '..', 'data', 'fr', 'fr_full_paper_100q.json');
    if (fs.existsSync(fullTestPath)) {
      const questions = JSON.parse(fs.readFileSync(fullTestPath, 'utf8'));
      return res.json({`;

const newFrFullTest = `app.get('/api/fr/full-test', (req, res) => {
  try {
    const fullTestPath = path.join(__dirname, '..', 'data', 'fr', 'fr_full_paper_100q.json');
    const questions = getCachedJson(fullTestPath);
    if (questions) {
      return res.json({`;

serverCode = serverCode.replace(oldFrFullTest, newFrFullTest);

const oldFrQuestions = `app.get('/api/fr/questions', (req, res) => {
  try {
    const allQsPath = path.join(__dirname, '..', 'data', 'fr', 'financial_reporting_all_questions.json');
    if (fs.existsSync(allQsPath)) {
      const questions = JSON.parse(fs.readFileSync(allQsPath, 'utf8'));
      return res.json({`;

const newFrQuestions = `app.get('/api/fr/questions', (req, res) => {
  try {
    const allQsPath = path.join(__dirname, '..', 'data', 'fr', 'financial_reporting_all_questions.json');
    const questions = getCachedJson(allQsPath);
    if (questions) {
      return res.json({`;

serverCode = serverCode.replace(oldFrQuestions, newFrQuestions);

// 8. Optimize AFM endpoints
const oldAfmTopics = `app.get('/api/afm/topics', (req, res) => {
  try {
    const catalogPath = path.join(__dirname, '..', 'data', 'afm', 'afm_topics_catalog.json');
    if (fs.existsSync(catalogPath)) {
      const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      return res.json(catalog);
    }
    res.status(404).json({ error: 'AFM Topics catalog not found' });`;

const newAfmTopics = `app.get('/api/afm/topics', (req, res) => {
  try {
    const catalogPath = path.join(__dirname, '..', 'data', 'afm', 'afm_topics_catalog.json');
    const catalog = getCachedJson(catalogPath);
    if (catalog) {
      return res.json(catalog);
    }
    res.status(404).json({ error: 'AFM Topics catalog not found' });`;

serverCode = serverCode.replace(oldAfmTopics, newAfmTopics);

const oldAfmTopicId = `    const fileName = afmTopicFileMap[topicId];
    const filePath = path.join(__dirname, '..', 'data', 'afm', fileName);
    if (fs.existsSync(filePath)) {
      const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return res.json({`;

const newAfmTopicId = `    const fileName = afmTopicFileMap[topicId];
    const filePath = path.join(__dirname, '..', 'data', 'afm', fileName);
    const questions = getCachedJson(filePath);
    if (questions) {
      return res.json({`;

serverCode = serverCode.replace(oldAfmTopicId, newAfmTopicId);

const oldAfmFullTest = `app.get('/api/afm/full-test', (req, res) => {
  try {
    const fullTestPath = path.join(__dirname, '..', 'data', 'afm', 'afm_full_paper_100q.json');
    if (fs.existsSync(fullTestPath)) {
      const data = JSON.parse(fs.readFileSync(fullTestPath, 'utf8'));
      return res.json(data);
    }
    res.status(404).json({ error: 'AFM Full Test file not found' });`;

const newAfmFullTest = `app.get('/api/afm/full-test', (req, res) => {
  try {
    const fullTestPath = path.join(__dirname, '..', 'data', 'afm', 'afm_full_paper_100q.json');
    const data = getCachedJson(fullTestPath);
    if (data) {
      return res.json(data);
    }
    res.status(404).json({ error: 'AFM Full Test file not found' });`;

serverCode = serverCode.replace(oldAfmFullTest, newAfmFullTest);

const oldAfmQuestions = `app.get('/api/afm/questions', (req, res) => {
  try {
    const allQsPath = path.join(__dirname, '..', 'data', 'afm', 'advanced_financial_management_all_questions.json');
    if (fs.existsSync(allQsPath)) {
      const questions = JSON.parse(fs.readFileSync(allQsPath, 'utf8'));
      return res.json({`;

const newAfmQuestions = `app.get('/api/afm/questions', (req, res) => {
  try {
    const allQsPath = path.join(__dirname, '..', 'data', 'afm', 'advanced_financial_management_all_questions.json');
    const questions = getCachedJson(allQsPath);
    if (questions) {
      return res.json({`;

serverCode = serverCode.replace(oldAfmQuestions, newAfmQuestions);

// 9. Optimize AUDIT endpoints
const oldAuditTopics = `app.get('/api/audit/topics', (req, res) => {
  try {
    const catalogPath = path.join(__dirname, '..', 'data', 'audit', 'audit_topics_catalog.json');
    if (fs.existsSync(catalogPath)) {
      const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      return res.json(catalog);
    }
    res.status(404).json({ error: 'Audit Topics catalog not found' });`;

const newAuditTopics = `app.get('/api/audit/topics', (req, res) => {
  try {
    const catalogPath = path.join(__dirname, '..', 'data', 'audit', 'audit_topics_catalog.json');
    const catalog = getCachedJson(catalogPath);
    if (catalog) {
      return res.json(catalog);
    }
    res.status(404).json({ error: 'Audit Topics catalog not found' });`;

serverCode = serverCode.replace(oldAuditTopics, newAuditTopics);

const oldAuditTopicId = `    const fileName = auditTopicFileMap[topicId];
    const filePath = path.join(__dirname, '..', 'data', 'audit', fileName);
    if (fs.existsSync(filePath)) {
      const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return res.json({`;

const newAuditTopicId = `    const fileName = auditTopicFileMap[topicId];
    const filePath = path.join(__dirname, '..', 'data', 'audit', fileName);
    const questions = getCachedJson(filePath);
    if (questions) {
      return res.json({`;

serverCode = serverCode.replace(oldAuditTopicId, newAuditTopicId);

const oldAuditFullTest = `app.get('/api/audit/full-test', (req, res) => {
  try {
    const fullTestPath = path.join(__dirname, '..', 'data', 'audit', 'audit_full_paper_100q.json');
    if (fs.existsSync(fullTestPath)) {
      const data = JSON.parse(fs.readFileSync(fullTestPath, 'utf8'));
      return res.json(data);
    }
    res.status(404).json({ error: 'Audit Full Test file not found' });`;

const newAuditFullTest = `app.get('/api/audit/full-test', (req, res) => {
  try {
    const fullTestPath = path.join(__dirname, '..', 'data', 'audit', 'audit_full_paper_100q.json');
    const data = getCachedJson(fullTestPath);
    if (data) {
      return res.json(data);
    }
    res.status(404).json({ error: 'Audit Full Test file not found' });`;

serverCode = serverCode.replace(oldAuditFullTest, newAuditFullTest);

const oldAuditQuestions = `app.get('/api/audit/questions', (req, res) => {
  try {
    const allQsPath = path.join(__dirname, '..', 'data', 'audit', 'advanced_auditing_all_questions.json');
    if (fs.existsSync(allQsPath)) {
      const questions = JSON.parse(fs.readFileSync(allQsPath, 'utf8'));
      return res.json({`;

const newAuditQuestions = `app.get('/api/audit/questions', (req, res) => {
  try {
    const allQsPath = path.join(__dirname, '..', 'data', 'audit', 'advanced_auditing_all_questions.json');
    const questions = getCachedJson(allQsPath);
    if (questions) {
      return res.json({`;

serverCode = serverCode.replace(oldAuditQuestions, newAuditQuestions);

// 10. Optimize CEL endpoints
const oldCelTopics = `app.get('/api/cel/topics', (req, res) => {
  try {
    const catalogPath = path.join(__dirname, '..', 'data', 'cel', 'cel_topics_catalog.json');
    if (fs.existsSync(catalogPath)) {
      const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      return res.json(catalog);
    }
    res.status(404).json({ error: 'Corporate and Economic Laws (CEL) Topics catalog not found' });`;

const newCelTopics = `app.get('/api/cel/topics', (req, res) => {
  try {
    const catalogPath = path.join(__dirname, '..', 'data', 'cel', 'cel_topics_catalog.json');
    const catalog = getCachedJson(catalogPath);
    if (catalog) {
      return res.json(catalog);
    }
    res.status(404).json({ error: 'Corporate and Economic Laws (CEL) Topics catalog not found' });`;

serverCode = serverCode.replace(oldCelTopics, newCelTopics);

const oldCelTopicId = `    const fileName = celTopicFileMap[topicId];
    const filePath = path.join(__dirname, '..', 'data', 'cel', fileName);
    if (fs.existsSync(filePath)) {
      const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return res.json({`;

const newCelTopicId = `    const fileName = celTopicFileMap[topicId];
    const filePath = path.join(__dirname, '..', 'data', 'cel', fileName);
    const questions = getCachedJson(filePath);
    if (questions) {
      return res.json({`;

serverCode = serverCode.replace(oldCelTopicId, newCelTopicId);

const oldCelFullTest = `app.get('/api/cel/full-test', (req, res) => {
  try {
    const fullTestPath = path.join(__dirname, '..', 'data', 'cel', 'cel_full_paper_100q.json');
    if (fs.existsSync(fullTestPath)) {
      const data = JSON.parse(fs.readFileSync(fullTestPath, 'utf8'));
      return res.json(data);
    }
    res.status(404).json({ error: 'CEL Full Test file not found' });`;

const newCelFullTest = `app.get('/api/cel/full-test', (req, res) => {
  try {
    const fullTestPath = path.join(__dirname, '..', 'data', 'cel', 'cel_full_paper_100q.json');
    const data = getCachedJson(fullTestPath);
    if (data) {
      return res.json(data);
    }
    res.status(404).json({ error: 'CEL Full Test file not found' });`;

serverCode = serverCode.replace(oldCelFullTest, newCelFullTest);

const oldCelQuestions = `app.get('/api/cel/questions', (req, res) => {
  try {
    const allQsPath = path.join(__dirname, '..', 'data', 'cel', 'corporate_and_economic_laws_all_questions.json');
    if (fs.existsSync(allQsPath)) {
      const questions = JSON.parse(fs.readFileSync(allQsPath, 'utf8'));
      return res.json({`;

const newCelQuestions = `app.get('/api/cel/questions', (req, res) => {
  try {
    const allQsPath = path.join(__dirname, '..', 'data', 'cel', 'corporate_and_economic_laws_all_questions.json');
    const questions = getCachedJson(allQsPath);
    if (questions) {
      return res.json({`;

serverCode = serverCode.replace(oldCelQuestions, newCelQuestions);

// 11. Optimize getNotesCatalog()
const oldNotesCatalog = `let cachedNotesCatalog = null;
function getNotesCatalog() {
  if (!cachedNotesCatalog) {
    const catalogPath = path.join(__dirname, '..', 'data', 'notes', 'textbook_notes_catalog.json');
    if (fs.existsSync(catalogPath)) {
      cachedNotesCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    }
  }
  return cachedNotesCatalog;
}`;

const newNotesCatalog = `function getNotesCatalog() {
  const catalogPath = path.join(__dirname, '..', 'data', 'notes', 'textbook_notes_catalog.json');
  return getCachedJson(catalogPath);
}`;

serverCode = serverCode.replace(oldNotesCatalog, newNotesCatalog);

// 12. Invalidate cache on syncQuestionJsonFiles
const oldSync = `    const dataDir = path.join(__dirname, '..', 'data');
    const allQs = await Question.find().sort({ id: 1 }).lean();
    fs.writeFileSync(path.join(dataDir, 'questions.json'), JSON.stringify(allQs, null, 2), 'utf8');`;

const newSync = `    const dataDir = path.join(__dirname, '..', 'data');
    const questionsFile = path.join(dataDir, 'questions.json');
    const allQs = await Question.find().sort({ id: 1 }).lean();
    fs.writeFileSync(questionsFile, JSON.stringify(allQs, null, 2), 'utf8');
    invalidateJsonCache(questionsFile);`;

serverCode = serverCode.replace(oldSync, newSync);

fs.writeFileSync(serverFilePath, serverCode, 'utf8');
console.log('Successfully optimized server/server.js!');

