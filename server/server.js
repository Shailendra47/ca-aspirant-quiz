require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const path = require('path');
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
  userAnswers: { type: Map, of: Number },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);
const Attempt = mongoose.model('Attempt', AttemptSchema);
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

async function autoSeedDatabase() {
  try {
    const existingCount = await Question.countDocuments();
    console.log(`🌱 Syncing quiz_db questions (${existingCount} currently in database) with all 25 advanced ICAI ethics questions...`);
    const bulkOps = INITIAL_QUESTIONS.map(q => ({
      replaceOne: {
        filter: { id: q.id },
        replacement: q,
        upsert: true
      }
    }));
    await Question.bulkWrite(bulkOps);
    console.log('✅ Successfully updated all 25 advanced ICAI ethics questions in quiz_db.questions');
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
    const { studentIdentifier, score, total, percentage, timeSpentFormatted, userAnswers } = req.body;
    const newAttempt = new Attempt({
      user: req.auth.sub,
      studentIdentifier: req.auth.name || studentIdentifier || 'CA-Aspirant',
      score,
      total,
      percentage,
      timeSpentFormatted,
      userAnswers
    });
    await newAttempt.save();
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

// Manual re-seed endpoint
app.post('/api/seed', async (req, res) => {
  try {
    await Question.deleteMany({});
    await Question.insertMany(INITIAL_QUESTIONS);
    res.json({ message: 'Successfully re-seeded quiz_db with standard ICAI questions' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to seed database', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CA Ethics Quiz Server running on http://localhost:${PORT}`);
  console.log(`📡 Questions endpoint: http://localhost:${PORT}/api/questions`);
  console.log(`📊 Attempts endpoint:  http://localhost:${PORT}/api/attempts`);
});
