require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = new Set([
  process.env.CLIENT_ORIGIN,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5000'
].filter(Boolean));
app.use(cors({ origin: (origin, callback) => {
  if (!origin || allowedOrigins.has(origin) || /^https:\/\/[a-z0-9-]+\.ngrok-free\.(?:app|dev)$/i.test(origin)) return callback(null, true);
  callback(new Error('Origin not allowed by CORS'));
} }));
app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
if (!MONGO_URI || !JWT_SECRET) {
  console.error('Set MONGODB_URI and JWT_SECRET in server/.env before starting the API.');
  process.exit(1);
}

const QuestionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  chapter: { type: Number, required: true },
  chapterTitle: { type: String, required: true },
  tag: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct: { type: Number, required: true },
  ref: { type: String, required: true },
  explanation: { type: String, required: true }
}, { timestamps: true });

const AttemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  studentIdentifier: { type: String, default: 'CA-Aspirant' },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  percentage: { type: Number, required: true },
  timeSpentFormatted: { type: String, required: true },
  timeSpentSeconds: { type: Number, default: 0 },
  chapterCode: { type: String, default: 'ALL', index: true },
  userAnswers: { type: Map, of: Number },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const LeaderboardEntrySchema = new mongoose.Schema({
  chapterCode: { type: String, required: true, index: true },
  studentName: { type: String, required: true },
  location: { type: String, default: 'All-India' },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  percentage: { type: Number, required: true },
  timeSpentFormatted: { type: String, required: true },
  timeSpentSeconds: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);
const Attempt = mongoose.model('Attempt', AttemptSchema);
const LeaderboardEntry = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);
const User = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false }
}, { timestamps: true }));

function makeToken(user) {
  return jwt.sign({ sub: user._id.toString(), name: user.name }, JWT_SECRET, { expiresIn: '7d' });
}
function requireAuth(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  try {
    if (!token || !JWT_SECRET) throw new Error('Missing token or JWT secret');
    req.auth = jwt.verify(token, JWT_SECRET);
    next();
  } catch { res.status(401).json({ error: 'Please sign in to continue.' }); }
}

const INITIAL_QUESTIONS = require(path.join(__dirname, '..', 'data', 'questions.json'));

async function seedLeaderboardBenchmarks() {
  try {
    const count = await LeaderboardEntry.countDocuments();
    if (count >= 30) return; // already seeded

    const sampleAspirants = [
      { name: "Akshat Goyal (AIR 1)", location: "Jaipur (Northern Region)" },
      { name: "Rahul Sharma (AIR 3)", location: "Delhi (Northern Region)" },
      { name: "Sneha Patel (AIR 7)", location: "Ahmedabad (Western Region)" },
      { name: "Karthik Subramanian (AIR 12)", location: "Chennai (Southern Region)" },
      { name: "Ananya Deshmukh", location: "Pune (Western Region)" },
      { name: "Vikram Singhania", location: "Kolkata (Eastern Region)" },
      { name: "Pooja Chhabra", location: "Mumbai Central (Western Region)" },
      { name: "Aditya Nair", location: "Kochi (Southern Region)" },
      { name: "Divya Reddy", location: "Hyderabad (Southern Region)" },
      { name: "Mehul Biyani", location: "Jaipur (Northern Region)" },
      { name: "Siddharth Sen", location: "Bhubaneswar (Eastern Region)" },
      { name: "Tarun Grover", location: "Chandigarh (Northern Region)" }
    ];

    const entries = [];
    const fullMockScores = [115, 112, 108, 104, 99, 94, 88, 83, 77, 72, 66, 58];
    const fullMockSecs = [2410, 2535, 2730, 2830, 2980, 3080, 3165, 3250, 3310, 3360, 3450, 3530];
    sampleAspirants.forEach((asp, i) => {
      const sc = fullMockScores[i];
      const s = fullMockSecs[i];
      entries.push({
        chapterCode: 'ALL',
        studentName: asp.name,
        location: asp.location,
        score: sc,
        total: 120,
        percentage: Math.round((sc / 120) * 100),
        timeSpentFormatted: `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`,
        timeSpentSeconds: s,
        submittedAt: new Date(Date.now() - (i + 1) * 3600000 * 4)
      });
    });

    const chScores = [19, 19, 18, 17, 16, 15, 14, 13, 13, 12, 11, 10];
    const chSecs = [720, 785, 840, 890, 930, 980, 1020, 1050, 1090, 1120, 1150, 1180];
    for (let c = 1; c <= 6; c++) {
      sampleAspirants.forEach((asp, i) => {
        const sc = Math.max(10, chScores[i] - (c % 2 === 0 ? (i % 2) : 0));
        const s = chSecs[i];
        entries.push({
          chapterCode: String(c),
          studentName: asp.name,
          location: asp.location,
          score: sc,
          total: 20,
          percentage: Math.round((sc / 20) * 100),
          timeSpentFormatted: `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`,
          timeSpentSeconds: s,
          submittedAt: new Date(Date.now() - (i + 1) * 3600000 * 2)
        });
      });
    }

    await LeaderboardEntry.insertMany(entries);
    console.log(`✅ Seeded ${entries.length} All-India benchmark competitor records in quiz_db.leaderboardentries`);
  } catch (err) {
    console.warn('Leaderboard benchmark seeding note:', err.message);
  }
}

async function autoSeedDatabase() {
  try {
    const existingCount = await Question.countDocuments();
    console.log(`🌱 Syncing quiz_db questions (${existingCount} currently in database) with all ${INITIAL_QUESTIONS.length} CA Final questions across 6 chapters...`);
    const bulkOps = INITIAL_QUESTIONS.map(q => ({
      replaceOne: {
        filter: { id: q.id },
        replacement: q,
        upsert: true
      }
    }));
    await Question.bulkWrite(bulkOps);
    await Question.deleteMany({ id: { $gt: INITIAL_QUESTIONS.length } });
    console.log(`✅ Successfully updated all ${INITIAL_QUESTIONS.length} CA Final questions in quiz_db.questions`);
    await seedLeaderboardBenchmarks();
  } catch (err) {
    console.error('❌ Error during auto-seeding:', err.message);
  }
}

mongoose.connect(MONGO_URI, {
  dbName: 'quiz_db'
})
.then(() => {
  console.log('🌿 Connected successfully to MongoDB Atlas database: quiz_db');
  autoSeedDatabase();
})
.catch((err) => {
  console.error('❌ MongoDB Atlas connection failed:', err.message);
});


app.post('/api/auth/register', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (name.length < 2 || name.length > 80) return res.status(400).json({ error: 'Enter a name between 2 and 80 characters.' });
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address.' });
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) });
    res.status(201).json({ token: makeToken(user), user: { id: user._id.toString(), name: user.name, email: user.email } });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'An account with this email already exists.' });
    console.error('Account registration failed:', err.message);
    res.status(500).json({ error: 'Could not create account. Check the database connection and try again.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user || !(await bcrypt.compare(String(req.body.password || ''), user.passwordHash)))
      return res.status(401).json({ error: 'Email or password is incorrect.' });
    res.json({ token: makeToken(user), user: { id: user._id.toString(), name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login failed:', err.message);
    res.status(500).json({ error: 'Could not sign in. Check the database connection and try again.' });
  }
});

app.post('/api/auth/otp-login', async (req, res) => {
  try {
    const mobile = String(req.body.mobile || '9068978137').trim();
    const name = String(req.body.name || 'Shailendrasingh deo').trim();
    const cleanNum = mobile.replace(/\D/g, '') || '9068978137';
    const email = `mobile_${cleanNum}@testbook.com`;
    let user = await User.findOne({ email });
    if (!user) {
      const dummyHash = await bcrypt.hash('Testbook@123', 10);
      user = await User.create({ name, email, passwordHash: dummyHash });
    } else if (name && user.name !== name) {
      user.name = name;
      await user.save();
    }
    const token = makeToken(user);
    res.json({ token, user: { id: user._id.toString(), name: user.name, mobile, email } });
  } catch (err) {
    console.error('OTP login failed:', err.message);
    res.status(500).json({ error: 'Could not sign in with OTP.' });
  }
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.auth.sub).select('name email');
    if (!user) return res.status(401).json({ error: 'Account not found.' });
    res.json({ id: user._id.toString(), name: user.name, email: user.email });
  } catch { res.status(401).json({ error: 'Please sign in again.' }); }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: 'quiz_db',
    readyState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// GET all questions from quiz_db
app.get('/api/questions', async (req, res) => {
  try {
    const chapter = req.query.chapter;
    let query = {};
    if (chapter && chapter !== 'ALL') {
      query.chapter = Number(chapter);
    }
    const questions = await Question.find(query).sort({ id: 1 }).lean();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions from database', details: err.message });
  }
});

// GET single question by ID
app.get('/api/questions/:id', async (req, res) => {
  try {
    const question = await Question.findOne({ id: Number(req.params.id) }).lean();
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// POST record student exam attempt
app.post('/api/attempts', requireAuth, async (req, res) => {
  try {
    const { studentIdentifier, score, total, percentage, timeSpentFormatted, timeSpentSeconds, chapterCode, userAnswers } = req.body;
    const mode = String(chapterCode || 'ALL');
    const studentName = req.auth.name || studentIdentifier || 'CA-Aspirant';
    const durationSec = Number(timeSpentSeconds) || 0;

    const newAttempt = new Attempt({
      user: req.auth.sub,
      studentIdentifier: studentName,
      score,
      total,
      percentage,
      timeSpentFormatted,
      timeSpentSeconds: durationSec,
      chapterCode: mode,
      userAnswers
    });
    await newAttempt.save();

    // Also record in Leaderboard for All-India rankings
    await LeaderboardEntry.create({
      chapterCode: mode,
      studentName,
      location: 'My Attempt',
      score,
      total,
      percentage,
      timeSpentFormatted,
      timeSpentSeconds: durationSec,
      submittedAt: new Date()
    });

    res.status(201).json({ message: 'Attempt saved in quiz_db.attempts', attemptId: newAttempt._id });
  } catch (err) {
    res.status(400).json({ error: 'Failed to record attempt', details: err.message });
  }
});

// GET all past student attempts
app.get('/api/attempts', requireAuth, async (req, res) => {
  try {
    const attempts = await Attempt.find({ user: req.auth.sub }).sort({ createdAt: -1 }).limit(50).lean();
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attempts', details: err.message });
  }
});

// GET Leaderboard per test with All-India Benchmark Comparison
app.get('/api/leaderboard', async (req, res) => {
  try {
    const chapterCode = String(req.query.testMode || 'ALL');
    let entries = await LeaderboardEntry.find({ chapterCode })
      .sort({ score: -1, timeSpentSeconds: 1, createdAt: -1 })
      .limit(50)
      .lean();

    if (entries.length === 0) {
      await seedLeaderboardBenchmarks();
      entries = await LeaderboardEntry.find({ chapterCode })
        .sort({ score: -1, timeSpentSeconds: 1, createdAt: -1 })
        .limit(50)
        .lean();
    }

    const totalCompetitors = entries.length;
    const scores = entries.map(e => e.score);
    const avgScore = totalCompetitors > 0 ? (scores.reduce((a, b) => a + b, 0) / totalCompetitors).toFixed(1) : 0;
    const topper = entries[0] || null;

    res.json({
      testMode: chapterCode,
      totalCompetitors,
      nationalAverageScore: Number(avgScore),
      topper,
      rankings: entries.map((entry, idx) => ({
        rank: idx + 1,
        ...entry
      }))
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard', details: err.message });
  }
});

// GET User Analytics
app.get('/api/analytics', requireAuth, async (req, res) => {
  try {
    const attempts = await Attempt.find({ user: req.auth.sub }).sort({ createdAt: 1 }).lean();
    res.json({ attempts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics', details: err.message });
  }
});

// ==================== ADMIN QUESTION CRUD ====================
// CREATE new question
app.post('/api/admin/questions', async (req, res) => {
  try {
    const { chapter, chapterTitle, tag, question, options, correct, ref, explanation } = req.body;
    if (!chapter || !question || !options || options.length !== 4 || correct === undefined) {
      return res.status(400).json({ error: 'Missing required question fields or options length != 4' });
    }

    const maxQ = await Question.findOne().sort({ id: -1 }).lean();
    const newId = (maxQ && maxQ.id ? maxQ.id : 0) + 1;

    const newQuestion = new Question({
      id: newId,
      chapter: Number(chapter),
      chapterTitle: chapterTitle || `Chapter ${chapter}`,
      tag: tag || 'General Topic',
      question: String(question).trim(),
      options: options.map(o => String(o).trim()),
      correct: Number(correct),
      ref: ref ? String(ref).trim() : 'Authoritative ICAI Syllabus Reference',
      explanation: explanation ? String(explanation).trim() : 'Refer to authoritative ICAI literature.'
    });

    await newQuestion.save();

    // Persist to questions.json
    try {
      const qFile = path.join(__dirname, '..', 'data', 'questions.json');
      const allQs = await Question.find().sort({ id: 1 }).lean();
      fs.writeFileSync(qFile, JSON.stringify(allQs, null, 2), 'utf8');
    } catch (fErr) {
      console.warn('Could not update questions.json:', fErr.message);
    }

    res.status(201).json({ message: 'Question created successfully in database and file', question: newQuestion });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create question', details: err.message });
  }
});

// UPDATE existing question
app.put('/api/admin/questions/:id', async (req, res) => {
  try {
    const qId = Number(req.params.id);
    const { chapter, chapterTitle, tag, question, options, correct, ref, explanation } = req.body;

    const updated = await Question.findOneAndUpdate(
      { id: qId },
      {
        $set: {
          chapter: Number(chapter),
          chapterTitle,
          tag,
          question: String(question).trim(),
          options: options.map(o => String(o).trim()),
          correct: Number(correct),
          ref: ref ? String(ref).trim() : 'Authoritative ICAI Syllabus Reference',
          explanation: explanation ? String(explanation).trim() : 'Refer to authoritative ICAI literature.'
        }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Persist to questions.json
    try {
      const qFile = path.join(__dirname, '..', 'data', 'questions.json');
      const allQs = await Question.find().sort({ id: 1 }).lean();
      fs.writeFileSync(qFile, JSON.stringify(allQs, null, 2), 'utf8');
    } catch (fErr) {
      console.warn('Could not update questions.json:', fErr.message);
    }

    res.json({ message: 'Question updated successfully', question: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update question', details: err.message });
  }
});

// DELETE question
app.delete('/api/admin/questions/:id', async (req, res) => {
  try {
    const qId = Number(req.params.id);
    const deleted = await Question.findOneAndDelete({ id: qId });
    if (!deleted) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Persist to questions.json
    try {
      const qFile = path.join(__dirname, '..', 'data', 'questions.json');
      const allQs = await Question.find().sort({ id: 1 }).lean();
      fs.writeFileSync(qFile, JSON.stringify(allQs, null, 2), 'utf8');
    } catch (fErr) {
      console.warn('Could not update questions.json:', fErr.message);
    }

    res.json({ message: 'Question deleted successfully', id: qId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete question', details: err.message });
  }
});

// Manual re-seed endpoint
app.post('/api/seed', async (req, res) => {
  try {
    await Question.deleteMany({});
    await Question.insertMany(INITIAL_QUESTIONS);
    await LeaderboardEntry.deleteMany({});
    await seedLeaderboardBenchmarks();
    res.json({ message: 'Successfully re-seeded quiz_db with standard ICAI questions and leaderboard' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to seed database', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CA Ethics Quiz Server running on http://localhost:${PORT}`);
  console.log(`📡 Questions endpoint: http://localhost:${PORT}/api/questions`);
  console.log(`📊 Attempts endpoint:  http://localhost:${PORT}/api/attempts`);
});
