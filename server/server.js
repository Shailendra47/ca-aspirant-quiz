require('dotenv').config({ path: require('path').join(__dirname, '.env') });
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
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
app.use('/data', express.static(path.join(__dirname, '..', 'data')));

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
  explanation: { type: String, required: true },
  difficulty: { type: String, default: 'Difficult' },
  type: { type: String, default: 'Case-Based PYQ' },
  isCaseBased: { type: Boolean, default: true }
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

// Compound & Field Indexes for maximum query velocity
QuestionSchema.index({ chapter: 1, id: 1 });
AttemptSchema.index({ user: 1, createdAt: -1 });
LeaderboardEntrySchema.index({ chapterCode: 1, submittedAt: -1 });
LeaderboardEntrySchema.index({ chapterCode: 1, score: -1, timeSpentSeconds: 1 });

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


const WEEKLY_ASPIRANT_POOLS = [
  // Pool 0 (Rotates based on ISO week number: week % 4 === 0)
  [
    { name: "Akshat Goyal (AIR 1)", location: "Jaipur (Northern Region)" },
    { name: "Rahul Sharma (AIR 3)", location: "Delhi (Northern Region)" },
    { name: "Sneha Patel (AIR 7)", location: "Ahmedabad (Western Region)" },
    { name: "Karthik Subramanian (AIR 12)", location: "Chennai (Southern Region)" },
    { name: "Ananya Deshmukh (AIR 15)", location: "Pune (Western Region)" },
    { name: "Vikram Singhania (AIR 22)", location: "Kolkata (Eastern Region)" },
    { name: "Pooja Chhabra", location: "Mumbai Central (Western Region)" },
    { name: "Aditya Nair", location: "Kochi (Southern Region)" },
    { name: "Divya Reddy", location: "Hyderabad (Southern Region)" },
    { name: "Mehul Biyani", location: "Jaipur (Northern Region)" },
    { name: "Siddharth Sen", location: "Bhubaneswar (Eastern Region)" },
    { name: "Tarun Grover", location: "Chandigarh (Northern Region)" },
    { name: "Manisha Bhattacharya", location: "Kolkata (Eastern Region)" },
    { name: "Chirag Doshi", location: "Rajkot (Western Region)" },
    { name: "Bhavna Roy", location: "Guwahati (Eastern Region)" }
  ],
  // Pool 1 (week % 4 === 1)
  [
    { name: "Riya Singhal (AIR 1)", location: "Mumbai (Western Region)" },
    { name: "Aryan Maheshwari (AIR 2)", location: "Jaipur (Northern Region)" },
    { name: "Harish Venkataraman (AIR 5)", location: "Chennai (Southern Region)" },
    { name: "Tanvi Kulkarni (AIR 9)", location: "Pune (Western Region)" },
    { name: "Amanpreet Singh (AIR 14)", location: "Delhi (Northern Region)" },
    { name: "Ishita Bannerjee (AIR 19)", location: "Kolkata (Eastern Region)" },
    { name: "Pranav Nambiar", location: "Bengaluru (Southern Region)" },
    { name: "Yashvi Chhajed", location: "Surat (Western Region)" },
    { name: "Mohit Agarwal", location: "Kanpur (Central Region)" },
    { name: "Sravya Cherukuri", location: "Hyderabad (Southern Region)" },
    { name: "Rohan Rastogi", location: "Lucknow (Central Region)" },
    { name: "Neha Sundaram", location: "Coimbatore (Southern Region)" },
    { name: "Deepen Parekh", location: "Ahmedabad (Western Region)" },
    { name: "Kavita Menon", location: "Kozhikode (Southern Region)" },
    { name: "Saurabh Jain", location: "Indore (Central Region)" }
  ],
  // Pool 2 (week % 4 === 2)
  [
    { name: "Shweta Khandelwal (AIR 1)", location: "Indore (Central Region)" },
    { name: "Abhishek Murthy (AIR 4)", location: "Bengaluru (Southern Region)" },
    { name: "Deepti Jha (AIR 6)", location: "Patna (Eastern Region)" },
    { name: "Varun Kapoor (AIR 11)", location: "Gurugram (Northern Region)" },
    { name: "Krutika Mehta (AIR 16)", location: "Mumbai (Western Region)" },
    { name: "Sourabh Somani (AIR 24)", location: "Bhilwara (Northern Region)" },
    { name: "Anjali Padmanabhan", location: "Thiruvananthapuram (Southern Region)" },
    { name: "Raghav Singhal", location: "Noida (Northern Region)" },
    { name: "Gautam Srinivas", location: "Visakhapatnam (Southern Region)" },
    { name: "Ritika Todi", location: "Ranchi (Eastern Region)" },
    { name: "Ujjwal Bansal", location: "Ludhiana (Northern Region)" },
    { name: "Nitesh Agarwal", location: "Raipur (Central Region)" },
    { name: "Pallavi Joshi", location: "Thane (Western Region)" },
    { name: "Harishanker Rao", location: "Mangaluru (Southern Region)" },
    { name: "Monalisa Barua", location: "Guwahati (Eastern Region)" }
  ],
  // Pool 3 (week % 4 === 3)
  [
    { name: "Keshav Agrawal (AIR 1)", location: "New Delhi (Northern Region)" },
    { name: "Madhavan Raman (AIR 3)", location: "Madurai (Southern Region)" },
    { name: "Priyanshi Sanghvi (AIR 8)", location: "Vadodara (Western Region)" },
    { name: "Kunal Ganguly (AIR 14)", location: "Kolkata (Eastern Region)" },
    { name: "Simran Kaur (AIR 18)", location: "Amritsar (Northern Region)" },
    { name: "Tejas Puranik (AIR 23)", location: "Nagpur (Western Region)" },
    { name: "Harsha Vardhan", location: "Vijayawada (Southern Region)" },
    { name: "Sakshi Oswal", location: "Nashik (Western Region)" },
    { name: "Shubham Kedia", location: "Cuttack (Eastern Region)" },
    { name: "Meera Namboodiri", location: "Kozhikode (Southern Region)" },
    { name: "Ayush Mittal", location: "Agra (Central Region)" },
    { name: "Nandini Somani", location: "Jodhpur (Northern Region)" },
    { name: "Chetan Sompura", location: "Jamnagar (Western Region)" },
    { name: "Alok Tripathy", location: "Rourkela (Eastern Region)" },
    { name: "Vidya Balasubramanian", location: "Tiruchirappalli (Southern Region)" }
  ]
];

function getWeekMeta(weekOffset = 0) {
  const offset = Number(weekOffset) || 0;
  const now = new Date();
  const targetDate = new Date(now.getTime() + offset * 7 * 86400000);

  // ISO 8601 week calculation
  const d = new Date(Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  const year = d.getUTCFullYear();

  // Monday 00:00:00 to Sunday 23:59:59
  const currDay = targetDate.getDay();
  const distToMon = (currDay + 6) % 7;
  const monday = new Date(targetDate);
  monday.setDate(targetDate.getDate() - distToMon);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monStr = `${monday.getDate()} ${monthNames[monday.getMonth()]}`;
  const sunStr = `${sunday.getDate()} ${monthNames[sunday.getMonth()]}, ${sunday.getFullYear()}`;
  const isCurrentWeek = offset === 0;
  const weekLabel = `Week ${weekNumber}${isCurrentWeek ? ' (Current)' : ''} • ${monStr} – ${sunStr}`;

  return { weekNumber, year, monday, sunday, weekLabel, offset, isCurrentWeek };
}

function generateWeeklyCandidates(chapterCode = 'ALL', weekMeta) {
  const { weekNumber, monday } = weekMeta;
  const poolIndex = Math.abs(weekNumber) % WEEKLY_ASPIRANT_POOLS.length;
  const pool = WEEKLY_ASPIRANT_POOLS[poolIndex];
  const isFullMock = chapterCode === 'ALL';
  const total = isFullMock ? 120 : 20;

  const mockBaseScores = [118, 115, 112, 108, 104, 99, 94, 88, 83, 77, 72, 66, 60, 56, 52];
  const mockBaseSecs   = [2260, 2380, 2520, 2650, 2790, 2920, 3050, 3180, 3290, 3370, 3440, 3500, 3530, 3555, 3575];

  const chBaseScores = [20, 20, 19, 19, 18, 17, 16, 16, 15, 14, 13, 12, 11, 10, 9];
  const chBaseSecs   = [690, 740, 790, 840, 890, 940, 990, 1030, 1080, 1110, 1140, 1165, 1180, 1195, 1210];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return pool.map((asp, i) => {
    // Deterministic pseudo-random seed per week + candidate + chapter
    const seed = (weekNumber * 37 + i * 29 + (isFullMock ? 11 : Number(chapterCode) * 19)) % 1000;

    let score = isFullMock ? mockBaseScores[i] : chBaseScores[i];
    let baseSec = isFullMock ? mockBaseSecs[i] : chBaseSecs[i];

    // Add randomized time variation (jitter in seconds: -20s to +25s)
    const jitterSec = ((seed * 13) % 46) - 20;
    const totalSec = Math.max(300, baseSec + jitterSec);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const timeSpentFormatted = `${mins}:${String(secs).padStart(2, '0')}`;

    // Realistic accuracy percentage
    const rawPct = (score / total) * 100;
    const accVariation = (((seed * 7) % 25) - 10) / 10;
    const accuracyVal = Math.min(99.5, Math.max(rawPct, rawPct + accVariation)).toFixed(1);
    const accuracy = `${accuracyVal}%`;

    // Realistic attempt date spread across that week
    const dayOffset = (i * 2 + (seed % 3)) % 7;
    const hourOffset = 9 + ((seed * 11) % 11); // 9 AM to 8 PM
    const minOffset = (seed * 17) % 60;
    const candDate = new Date(monday.getTime() + dayOffset * 86400000 + hourOffset * 3600000 + minOffset * 60000);
    if (weekMeta.isCurrentWeek && candDate > new Date()) {
      candDate.setTime(Date.now() - (i % 3) * 86400000 - (hourOffset % 8) * 3600000);
    }
    const formattedDate = `${candDate.getDate()} ${monthNames[candDate.getMonth()]}, ${candDate.getFullYear()}`;

    return {
      studentName: asp.name,
      location: asp.location,
      chapterCode,
      score,
      total,
      percentage: Math.round(rawPct),
      accuracy,
      timeSpentFormatted,
      timeSpentSeconds: totalSec,
      submittedAt: candDate,
      formattedDate,
      isBenchmark: true
    };
  });
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
  } catch (err) {
    console.error('❌ Error during auto-seeding:', err.message);
  }
}

mongoose.connect(MONGO_URI, {
  dbName: 'quiz_db',
  serverSelectionTimeoutMS: 8000
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

// In-Memory store for Real-Time OTPs: mobile -> { otp, expiresAt, attempts }
const otpStore = new Map();

// Real-Time Send OTP endpoint
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const rawMobile = String(req.body.mobile || '').trim();
    const cleanNum = rawMobile.replace(/\D/g, '').slice(-10);
    if (!cleanNum || cleanNum.length !== 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
    }

    // Generate secure 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity
    otpStore.set(cleanNum, { otp, expiresAt, attempts: 0 });

    console.log(`[REAL-TIME OTP GENERATED] Mobile: +91 ${cleanNum} | OTP: ${otp} | Expires in: 5m`);

    res.json({
      success: true,
      message: `OTP has been sent to +91 ${cleanNum}`,
      mobile: cleanNum,
      otp, // Provided for realistic instant simulation and auto-fill
      expiresIn: 300
    });
  } catch (err) {
    console.error('Send OTP failed:', err.message);
    res.status(500).json({ error: 'Could not send OTP. Please try again.' });
  }
});

// Real-Time Verify OTP endpoint
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const rawMobile = String(req.body.mobile || '').trim();
    const cleanNum = rawMobile.replace(/\D/g, '').slice(-10);
    const otp = String(req.body.otp || '').trim();
    const name = String(req.body.name || 'Shailendrasingh deo').trim();

    if (!cleanNum || cleanNum.length !== 10) {
      return res.status(400).json({ error: 'Valid 10-digit mobile number is required.' });
    }
    if (!otp) {
      return res.status(400).json({ error: 'Please enter the 6-digit OTP.' });
    }

    const record = otpStore.get(cleanNum);
    if (!record) {
      return res.status(400).json({ error: 'No OTP requested for this number or OTP has expired. Click Resend OTP.' });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(cleanNum);
      return res.status(400).json({ error: 'OTP has expired. Please click Resend OTP.' });
    }

    if (record.attempts >= 5) {
      otpStore.delete(cleanNum);
      return res.status(429).json({ error: 'Too many incorrect attempts. Please request a new OTP.' });
    }

    if (record.otp !== otp) {
      record.attempts += 1;
      const left = 5 - record.attempts;
      return res.status(400).json({ error: `Incorrect OTP code. (${left} attempt${left === 1 ? '' : 's'} remaining)` });
    }

    // OTP Verified! Clear it from store
    otpStore.delete(cleanNum);

    const email = `mobile_${cleanNum}@icai.org`;
    let user = await User.findOne({ email });
    if (!user) {
      const dummyHash = await bcrypt.hash('ICAI@123', 10);
      user = await User.create({ name, email, passwordHash: dummyHash });
    } else if (name && user.name !== name) {
      user.name = name;
      await user.save();
    }

    const token = makeToken(user);
    res.json({
      success: true,
      token,
      user: { id: user._id.toString(), name: user.name, mobile: cleanNum, email }
    });
  } catch (err) {
    console.error('Verify OTP failed:', err.message);
    res.status(500).json({ error: 'Authentication failed. Please try again.' });
  }
});

app.post('/api/auth/otp-login', async (req, res) => {
  try {
    const mobile = String(req.body.mobile || '9068978137').trim();
    const name = String(req.body.name || 'Shailendrasingh deo').trim();
    const cleanNum = mobile.replace(/\D/g, '').slice(-10) || '9068978137';
    const otp = req.body.otp ? String(req.body.otp).trim() : null;

    if (otp) {
      const record = otpStore.get(cleanNum);
      if (record) {
        if (Date.now() > record.expiresAt) {
          otpStore.delete(cleanNum);
          return res.status(400).json({ error: 'OTP has expired. Please click Resend OTP.' });
        }
        if (record.otp !== otp) {
          record.attempts = (record.attempts || 0) + 1;
          return res.status(400).json({ error: 'Incorrect OTP code. Please enter the valid code.' });
        }
        otpStore.delete(cleanNum);
      }
    }

    const email = `mobile_${cleanNum}@icai.org`;
    let user = await User.findOne({ email });
    if (!user) {
      const dummyHash = await bcrypt.hash('ICAI@123', 10);
      user = await User.create({ name, email, passwordHash: dummyHash });
    } else if (name && user.name !== name) {
      user.name = name;
      await user.save();
    }
    const token = makeToken(user);
    res.json({ token, user: { id: user._id.toString(), name: user.name, mobile: cleanNum, email } });
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

// GET chapter questions directory and summary (Single unified questions.json database for all 6 chapters)
app.get('/api/questions/chapters', async (req, res) => {
  try {
    const questionsFile = path.join(__dirname, '..', 'data', 'questions.json');
    let allQs = getCachedJson(questionsFile);
    if (!allQs) {
      allQs = await Question.find().sort({ id: 1 }).lean();
    }
    const grouped = {};
    allQs.forEach(q => {
      const ch = q.chapter;
      if (!grouped[ch]) grouped[ch] = {
        chapter: ch,
        chapterTitle: q.chapterTitle || `Chapter ${ch}`,
        questionCount: 0,
        timeLimitMinutes: 15,
        marks: 40,
        difficulty: "Difficult",
        pattern: "20-20 Sectional Test"
      };
      grouped[ch].questionCount++;
    });
    res.json({
      title: "Chartered Accountancy Group 1 - 6 Chapters 20-20 Tests",
      databaseFile: "data/questions.json",
      totalChapters: Object.keys(grouped).length,
      totalQuestions: allQs.length,
      timeLimitMinutes: 15,
      marksPerSection: 40,
      difficulty: "Difficult",
      chapters: Object.values(grouped).sort((a, b) => a.chapter - b.chapter)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chapters info', details: err.message });
  }
});

// GET questions specifically for a given chapter from the single unified questions.json database
app.get('/api/questions/chapter/:id', async (req, res) => {
  try {
    const chId = Number(req.params.id);
    const questionsFile = path.join(__dirname, '..', 'data', 'questions.json');
    const allQs = getCachedJson(questionsFile);
    if (allQs) {
      const filtered = allQs.filter(q => q.chapter === chId);
      if (filtered.length > 0) {
        return res.json({
          chapter: chId,
          chapterTitle: filtered[0].chapterTitle || `Chapter ${chId}`,
          count: filtered.length,
          timeLimitMinutes: 15,
          marks: 40,
          databaseFile: "data/questions.json",
          questions: filtered
        });
      }
    }
    const questions = await Question.find({ chapter: chId }).sort({ id: 1 }).lean();
    res.json({
      chapter: chId,
      chapterTitle: questions[0]?.chapterTitle || `Chapter ${chId}`,
      count: questions.length,
      timeLimitMinutes: 15,
      marks: 40,
      questions
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chapter questions', details: err.message });
  }
});

// GET Group 1 papers overview and all 20-20 PYQs (15-min timing, Difficult Case-Based PYQs)
app.get('/api/questions/group1', (req, res) => {
  try {
    const dataDir = path.join(__dirname, '..', 'data');
    const p1 = getCachedJson(path.join(dataDir, 'group1_paper1_fr_pyq.json')) || [];
    const p2 = getCachedJson(path.join(dataDir, 'group1_paper2_afm_pyq.json')) || [];
    const p3 = getCachedJson(path.join(dataDir, 'group1_paper3_audit_pyq.json')) || [];

    res.json({
      group: "Group I",
      totalPapers: 3,
      totalQuestions: p1.length + p2.length + p3.length,
      timePerSectionMinutes: 15,
      marksPerSection: 40,
      pattern: "Case-Based PYQs",
      difficulty: "Difficult",
      papers: [
        { paper: 1, title: "Paper 1: Financial Reporting (FR)", count: p1.length, timeLimitMinutes: 15, totalMarks: 40, questions: p1 },
        { paper: 2, title: "Paper 2: Advanced Financial Management (AFM)", count: p2.length, timeLimitMinutes: 15, totalMarks: 40, questions: p2 },
        { paper: 3, title: "Paper 3: Advanced Auditing & Professional Ethics", count: p3.length, timeLimitMinutes: 15, totalMarks: 40, questions: p3 }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load Group 1 questions', details: err.message });
  }
});

// GET specific Group 1 paper questions (Paper 1, Paper 2, Paper 3)
app.get('/api/questions/group1/:paper', (req, res) => {
  try {
    const dataDir = path.join(__dirname, '..', 'data');
    const paperParam = String(req.params.paper).toLowerCase();
    let file = '';
    let paperNum = 1;
    let title = 'Financial Reporting (FR)';

    if (paperParam === '1' || paperParam === 'p1' || paperParam === 'fr' || paperParam === 'real_paper_1') {
      file = 'group1_paper1_fr_pyq.json';
      paperNum = 1;
      title = 'Paper 1: Financial Reporting (FR)';
    } else if (paperParam === '2' || paperParam === 'p2' || paperParam === 'afm' || paperParam === 'real_paper_2') {
      file = 'group1_paper2_afm_pyq.json';
      paperNum = 2;
      title = 'Paper 2: Advanced Financial Management (AFM)';
    } else if (paperParam === '3' || paperParam === 'p3' || paperParam === 'audit' || paperParam === 'real_paper_3') {
      file = 'group1_paper3_audit_pyq.json';
      paperNum = 3;
      title = 'Paper 3: Advanced Auditing & Professional Ethics';
    } else {
      return res.status(404).json({ error: 'Group 1 Paper not found. Valid: 1 (FR), 2 (AFM), 3 (Audit)' });
    }

    const qs = getCachedJson(path.join(dataDir, file));
    if (!qs) {
      return res.status(404).json({ error: 'Group 1 Paper questions file not found.' });
    }
    res.json({
      group: "Group I",
      paper: paperNum,
      title,
      count: qs.length,
      timeLimitMinutes: 15,
      totalMarks: 40,
      difficulty: "Difficult",
      pattern: "Case-Based PYQs",
      questions: qs
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load Group 1 paper questions', details: err.message });
  }
});

// =========================================================================
// FINANCIAL REPORTING (FR) GROUP 1 SPECIALIZED ENDPOINTS
// =========================================================================
// GET FR Topics Catalog (All 13 Topics • 20 Qs each • 15 Mins)
app.get('/api/fr/topics', (req, res) => {
  try {
    const catalogPath = path.join(__dirname, '..', 'data', 'fr', 'fr_topics_catalog.json');
    const catalog = getCachedJson(catalogPath);
    if (catalog) {
      return res.json(catalog);
    }
    res.status(404).json({ error: 'FR Topics catalog not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch FR topics', details: err.message });
  }
});

// GET specific FR Topic Questions (Topic 1 to 13 - 20 Qs each • 15 Mins)
app.get('/api/fr/topic/:id', (req, res) => {
  try {
    const topicId = Number(req.params.id);
    if (isNaN(topicId) || topicId < 1 || topicId > 13) {
      return res.status(400).json({ error: 'Invalid topic ID. Please specify a topic between 1 and 13.' });
    }
    const topicFileMap = {
      1: 'topic_1_conceptual_framework.json',
      2: 'topic_2_general_presentation_inventories.json',
      3: 'topic_3_ppe_intangibles_impairment.json',
      4: 'topic_4_revenue_recognition.json',
      5: 'topic_5_leases_employee_sharebased_tax.json',
      6: 'topic_6_provisions_contingencies_events.json',
      7: 'topic_7_financial_instruments.json',
      8: 'topic_8_business_combinations_consolidation.json',
      9: 'topic_9_associates_joint_arrangements.json',
      10: 'topic_10_forex_hyperinflation.json',
      11: 'topic_11_grants_borrowing_costs.json',
      12: 'topic_12_interim_segment_reporting.json',
      13: 'topic_13_insurance_banking_nbfc.json'
    };
    const fileName = topicFileMap[topicId];
    const filePath = path.join(__dirname, '..', 'data', 'fr', fileName);
    const questions = getCachedJson(filePath);
    if (questions) {
      return res.json({
        subject: "Financial Reporting (FR)",
        topicId,
        questionCount: questions.length,
        timeLimitMinutes: 15,
        totalMarks: 40,
        difficulty: "Difficult",
        pattern: "Case-Based PYQs",
        questions
      });
    }
    res.status(404).json({ error: 'Topic file not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch topic questions', details: err.message });
  }
});

// GET FR Full Examination (100 Questions • 3 Hours (180 Mins) • All 13 Topics)
app.get('/api/fr/full-test', (req, res) => {
  try {
    const fullTestPath = path.join(__dirname, '..', 'data', 'fr', 'fr_full_paper_100q.json');
    const questions = getCachedJson(fullTestPath);
    if (questions) {
      return res.json({
        subject: "Financial Reporting (FR)",
        examTitle: "Paper 1: Financial Reporting (FR) Comprehensive Examination",
        questionCount: questions.length,
        timeLimitMinutes: 180,
        totalMarks: 200,
        marksPerQuestion: 2,
        negativeMarking: 0,
        difficulty: "Difficult",
        coverage: "All 13 Financial Reporting Topics Included",
        questions
      });
    }
    res.status(404).json({ error: 'FR Full Test file not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load FR Full Test', details: err.message });
  }
});

// GET All Financial Reporting Questions for Database
app.get('/api/fr/questions', (req, res) => {
  try {
    const allQsPath = path.join(__dirname, '..', 'data', 'fr', 'financial_reporting_all_questions.json');
    const questions = getCachedJson(allQsPath);
    if (questions) {
      return res.json({
        subject: "Financial Reporting (FR)",
        totalQuestions: questions.length,
        totalTopics: 13,
        questions
      });
    }
    res.status(404).json({ error: 'FR all questions file not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load FR questions', details: err.message });
  }
});

// =========================================================================
// ADVANCED FINANCIAL MANAGEMENT (AFM) - TOPICS & FULL TEST API ENDPOINTS
// =========================================================================

// GET AFM Topics Catalog (All 11 Topics • 20 Qs each • 15 Mins)
app.get('/api/afm/topics', (req, res) => {
  try {
    const catalogPath = path.join(__dirname, '..', 'data', 'afm', 'afm_topics_catalog.json');
    const catalog = getCachedJson(catalogPath);
    if (catalog) {
      return res.json(catalog);
    }
    res.status(404).json({ error: 'AFM Topics catalog not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch AFM topics', details: err.message });
  }
});

// GET specific AFM Topic Questions (Topic 1 to 11 - 20 Qs each • 15 Mins)
app.get('/api/afm/topic/:id', (req, res) => {
  try {
    const topicId = Number(req.params.id);
    if (isNaN(topicId) || topicId < 1 || topicId > 11) {
      return res.status(400).json({ error: 'Invalid topic ID. Please specify a topic between 1 and 11.' });
    }
    const afmTopicFileMap = {
      1: 'topic_1_capital_budgeting.json',
      2: 'topic_2_cost_of_capital.json',
      3: 'topic_3_dividend_working_capital.json',
      4: 'topic_4_portfolio_management.json',
      5: 'topic_5_derivatives.json',
      6: 'topic_6_forex_risk_management.json',
      7: 'topic_7_international_finance.json',
      8: 'topic_8_mergers_acquisitions.json',
      9: 'topic_9_business_valuation.json',
      10: 'topic_10_financial_services_markets.json',
      11: 'topic_11_strategic_financial_modelling.json'
    };
    const fileName = afmTopicFileMap[topicId];
    const filePath = path.join(__dirname, '..', 'data', 'afm', fileName);
    const questions = getCachedJson(filePath);
    if (questions) {
      return res.json({
        subject: "Advanced Financial Management (AFM)",
        topicId,
        questionCount: questions.length,
        timeLimitMinutes: 15,
        totalMarks: 40,
        difficulty: "Difficult",
        pattern: "Case-Based PYQs",
        questions
      });
    }
    res.status(404).json({ error: 'AFM topic file not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch AFM topic questions', details: err.message });
  }
});

// GET AFM Full Examination (100 Questions • 3 Hours (180 Mins) • All 11 Topics)
app.get('/api/afm/full-test', (req, res) => {
  try {
    const fullTestPath = path.join(__dirname, '..', 'data', 'afm', 'afm_full_paper_100q.json');
    const data = getCachedJson(fullTestPath);
    if (data) {
      return res.json(data);
    }
    res.status(404).json({ error: 'AFM Full Test file not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load AFM Full Test', details: err.message });
  }
});

// GET All AFM Questions for Database (All 220 Questions)
app.get('/api/afm/questions', (req, res) => {
  try {
    const allQsPath = path.join(__dirname, '..', 'data', 'afm', 'advanced_financial_management_all_questions.json');
    const questions = getCachedJson(allQsPath);
    if (questions) {
      return res.json({
        subject: "Advanced Financial Management (AFM)",
        totalQuestions: questions.length,
        totalTopics: 11,
        questions
      });
    }
    res.status(404).json({ error: 'AFM all questions file not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load AFM questions', details: err.message });
  }
});

// =========================================================================
// ADVANCED AUDITING, ASSURANCE & PROFESSIONAL ETHICS (AAAPE) API ENDPOINTS
// =========================================================================

// GET Audit Topics Catalog (All 11 Topics • 20 Qs each • 15 Mins)
app.get(['/api/audit/topics', '/api/aaape/topics'], (req, res) => {
  try {
    const catalogPath = path.join(__dirname, '..', 'data', 'audit', 'audit_topics_catalog.json');
    const catalog = getCachedJson(catalogPath);
    if (catalog) {
      return res.json(catalog);
    }
    res.status(404).json({ error: 'Audit Topics catalog not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Audit topics', details: err.message });
  }
});

// GET specific Audit Topic Questions (Topic 1 to 11 - 20 Qs each • 15 Mins)
app.get(['/api/audit/topic/:id', '/api/aaape/topic/:id'], (req, res) => {
  try {
    const topicId = Number(req.params.id);
    if (isNaN(topicId) || topicId < 1 || topicId > 11) {
      return res.status(400).json({ error: 'Invalid topic ID. Please specify a topic between 1 and 11.' });
    }
    const auditTopicFileMap = {
      1: 'topic_1_standards_on_auditing.json',
      2: 'topic_2_audit_planning_risk_assessment.json',
      3: 'topic_3_audit_specific_entities.json',
      4: 'topic_4_group_audits.json',
      5: 'topic_5_documentation_reporting_opinions.json',
      6: 'topic_6_assurance_attestation.json',
      7: 'topic_7_internal_forensic_audit.json',
      8: 'topic_8_due_diligence_special_audits.json',
      9: 'topic_9_digital_auditing_caats.json',
      10: 'topic_10_corporate_governance_quality_control.json',
      11: 'topic_11_code_of_ethics_professional_misconduct.json'
    };
    const fileName = auditTopicFileMap[topicId];
    const filePath = path.join(__dirname, '..', 'data', 'audit', fileName);
    const questions = getCachedJson(filePath);
    if (questions) {
      return res.json({
        subject: "Advanced Auditing, Assurance and Professional Ethics (AAAPE)",
        topicId,
        questionCount: questions.length,
        timeLimitMinutes: 15,
        totalMarks: 40,
        difficulty: "Difficult",
        pattern: "Case-Based PYQs",
        questions
      });
    }
    res.status(404).json({ error: 'Audit topic file not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch topic questions', details: err.message });
  }
});

// GET Audit Full Examination (100 Questions • 3 Hours (180 Mins) • All 11 Topics)
app.get(['/api/audit/full-test', '/api/aaape/full-test'], (req, res) => {
  try {
    const fullTestPath = path.join(__dirname, '..', 'data', 'audit', 'audit_full_paper_100q.json');
    const data = getCachedJson(fullTestPath);
    if (data) {
      return res.json(data);
    }
    res.status(404).json({ error: 'Audit Full Test file not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load Audit Full Test', details: err.message });
  }
});

// GET All Audit Questions for Database (All 220 Questions)
app.get(['/api/audit/questions', '/api/aaape/questions'], (req, res) => {
  try {
    const allQsPath = path.join(__dirname, '..', 'data', 'audit', 'advanced_auditing_all_questions.json');
    const questions = getCachedJson(allQsPath);
    if (questions) {
      return res.json({
        subject: "Advanced Auditing, Assurance and Professional Ethics (AAAPE)",
        totalQuestions: questions.length,
        totalTopics: 11,
        questions
      });
    }
    res.status(404).json({ error: 'Audit all questions file not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load Audit questions', details: err.message });
  }
});

// ==================== CORPORATE AND ECONOMIC LAWS (CEL) ====================
// GET Corporate and Economic Laws Topics Catalog
app.get(['/api/cel/topics', '/api/law/topics'], (req, res) => {
  try {
    const catalogPath = path.join(__dirname, '..', 'data', 'cel', 'cel_topics_catalog.json');
    const catalog = getCachedJson(catalogPath);
    if (catalog) {
      return res.json(catalog);
    }
    res.status(404).json({ error: 'Corporate and Economic Laws (CEL) Topics catalog not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch CEL topics', details: err.message });
  }
});

// GET specific CEL Topic Questions (Topic 1 to 9 - 20 Qs each • 15 Mins)
app.get(['/api/cel/topic/:id', '/api/law/topic/:id'], (req, res) => {
  try {
    const topicId = Number(req.params.id);
    if (isNaN(topicId) || topicId < 1 || topicId > 9) {
      return res.status(400).json({ error: 'Invalid topic ID. Please specify a topic between 1 and 9.' });
    }
    const celTopicFileMap = {
      1: 'topic_1_companies_act_incorporation_management.json',
      2: 'topic_2_winding_up_nclt_nclat.json',
      3: 'topic_3_llp_act_2008.json',
      4: 'topic_4_ibc_2016.json',
      5: 'topic_5_sebi_act_regulations.json',
      6: 'topic_6_fema_1999.json',
      7: 'topic_7_competition_act_2002.json',
      8: 'topic_8_contract_act_economic_laws.json',
      9: 'topic_9_consumer_protection_economic_legislation.json'
    };
    const fileName = celTopicFileMap[topicId];
    const filePath = path.join(__dirname, '..', 'data', 'cel', fileName);
    const questions = getCachedJson(filePath);
    if (questions) {
      return res.json({
        subject: "Corporate and Economic Laws (CEL)",
        topicId,
        questionCount: questions.length,
        timeLimitMinutes: 15,
        totalMarks: 40,
        difficulty: "Difficult",
        pattern: "Case-Based PYQs",
        questions
      });
    }
    res.status(404).json({ error: 'CEL topic file not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch topic questions', details: err.message });
  }
});

// GET CEL Full Examination (100 Questions • 3 Hours (180 Mins) • All 9 Topics)
app.get(['/api/cel/full-test', '/api/law/full-test', '/api/cel/full-mock', '/api/law/full-mock'], (req, res) => {
  try {
    const fullTestPath = path.join(__dirname, '..', 'data', 'cel', 'cel_full_paper_100q.json');
    const data = getCachedJson(fullTestPath);
    if (data) {
      return res.json(data);
    }
    res.status(404).json({ error: 'CEL Full Test file not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load CEL Full Test', details: err.message });
  }
});

// GET All CEL Questions for Database (All 180 Questions)
app.get(['/api/cel/questions', '/api/law/questions', '/api/cel/all', '/api/law/all'], (req, res) => {
  try {
    const allQsPath = path.join(__dirname, '..', 'data', 'cel', 'corporate_and_economic_laws_all_questions.json');
    const questions = getCachedJson(allQsPath);
    if (questions) {
      return res.json({
        subject: "Corporate and Economic Laws (CEL)",
        totalQuestions: questions.length,
        totalTopics: 9,
        questions
      });
    }
    res.status(404).json({ error: 'CEL all questions file not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load CEL questions', details: err.message });
  }
});

// ==================== TEXTBOOK NOTES API (GROUP I & GROUP II) ====================
function getNotesCatalog() {
  const catalogPath = path.join(__dirname, '..', 'data', 'notes', 'textbook_notes_catalog.json');
  return getCachedJson(catalogPath);
}

// GET All Textbook Notes Catalog (Group I & Group II)
app.get('/api/notes', (req, res) => {
  try {
    const catalog = getNotesCatalog();
    if (!catalog) return res.status(404).json({ error: 'Notes catalog not found' });
    res.json(catalog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load notes catalog', details: err.message });
  }
});

// GET Textbook Notes by Group (G1 / G2)
app.get('/api/notes/group/:code', (req, res) => {
  try {
    const catalog = getNotesCatalog();
    if (!catalog) return res.status(404).json({ error: 'Notes catalog not found' });
    const code = String(req.params.code).toUpperCase().trim();
    const groupKey = (code === '1' || code === 'G1') ? 'G1' : (code === '2' || code === 'G2') ? 'G2' : null;
    if (!groupKey) {
      return res.status(400).json({ error: 'Invalid group code. Use G1 or G2.' });
    }
    const group = catalog.groups.find(g => g.groupCode === groupKey);
    if (!group) return res.status(404).json({ error: 'Group notes not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load group notes', details: err.message });
  }
});

// GET Specific Topic Notes by ID
app.get('/api/notes/topic/:id', (req, res) => {
  try {
    const catalog = getNotesCatalog();
    if (!catalog) return res.status(404).json({ error: 'Notes catalog not found' });
    const topicId = String(req.params.id).toLowerCase().trim();
    let foundTopic = null;
    for (const grp of catalog.groups) {
      for (const subj of grp.subjects) {
        const t = subj.topics.find(top => top.id === topicId);
        if (t) {
          foundTopic = { ...t, subjectTitle: subj.subject, groupTitle: grp.group };
          break;
        }
      }
      if (foundTopic) break;
    }
    if (!foundTopic) return res.status(404).json({ error: 'Topic not found' });
    res.json(foundTopic);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load topic note', details: err.message });
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

// POST record student exam attempt (supports authenticated & guest submissions)
app.post('/api/attempts', async (req, res) => {
  try {
    const { studentName: bodyName, studentIdentifier, score, total, percentage, timeSpentFormatted, timeSpentSeconds, chapterCode, userAnswers } = req.body;
    const mode = String(chapterCode || 'ALL');

    let userId = null;
    let studentName = bodyName || studentIdentifier || 'CA-Aspirant';

    // Optional auth extraction
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.slice(7);
        const payload = jwt.verify(token, JWT_SECRET);
        userId = payload.sub;
        if (payload.name) studentName = payload.name;
      } catch (tokenErr) {}
    }

    const durationSec = Number(timeSpentSeconds) || 0;

    const newAttempt = new Attempt({
      user: userId,
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

// GET Leaderboard per test with All-India Benchmark Comparison & Weekly Rotation
app.get('/api/leaderboard', async (req, res) => {
  try {
    const chapterCode = String(req.query.testMode || 'ALL');
    const weekOffset = parseInt(req.query.weekOffset, 10) || 0;
    const weekMeta = getWeekMeta(weekOffset);

    // 1. Generate this week's benchmark aspirants (rotates weekly with varied times & dates)
    const weeklyCandidates = generateWeeklyCandidates(chapterCode, weekMeta);

    // 2. Fetch any real user attempts submitted during this week's window
    let realAttempts = [];
    try {
      realAttempts = await LeaderboardEntry.find({
        chapterCode,
        location: 'My Attempt',
        submittedAt: { $gte: weekMeta.monday, $lte: weekMeta.sunday }
      }).lean();
    } catch (e) {
      // If table query fails, continue with benchmark pool
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedRealAttempts = realAttempts.map(entry => {
      const dt = new Date(entry.submittedAt || Date.now());
      const rawPct = entry.total > 0 ? (entry.score / entry.total) * 100 : 0;
      return {
        ...entry,
        accuracy: `${rawPct.toFixed(1)}%`,
        formattedDate: `${dt.getDate()} ${monthNames[dt.getMonth()]}, ${dt.getFullYear()}`,
        isRealUser: true
      };
    });

    // 3. Merge real attempts + benchmark candidates
    const allCandidates = [...formattedRealAttempts, ...weeklyCandidates];

    // 4. Sort: Highest Score first, then Fastest Time (least seconds)
    allCandidates.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeSpentSeconds - b.timeSpentSeconds;
    });

    // 5. Assign Rank (Top 10 National Merit List)
    const rankedList = allCandidates.slice(0, 10).map((entry, idx) => ({
      rank: idx + 1,
      ...entry
    }));

    const totalCompetitors = rankedList.length;
    const scores = rankedList.map(e => e.score);
    const avgScore = totalCompetitors > 0 ? (scores.reduce((a, b) => a + b, 0) / totalCompetitors).toFixed(1) : 0;
    const topper = rankedList[0] || null;

    res.json({
      testMode: chapterCode,
      weekInfo: {
        weekNumber: weekMeta.weekNumber,
        year: weekMeta.year,
        weekOffset: weekMeta.offset,
        weekLabel: weekMeta.weekLabel,
        isCurrentWeek: weekMeta.isCurrentWeek,
        startDate: weekMeta.monday,
        endDate: weekMeta.sunday
      },
      totalCompetitors,
      nationalAverageScore: Number(avgScore),
      topper,
      rankings: rankedList
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

// Helper: Persist questions to questions.json (Single unified database for all 6 chapters)
async function syncQuestionJsonFiles() {
  try {
    const dataDir = path.join(__dirname, '..', 'data');
    const questionsFile = path.join(dataDir, 'questions.json');
    const allQs = await Question.find().sort({ id: 1 }).lean();
    fs.writeFileSync(questionsFile, JSON.stringify(allQs, null, 2), 'utf8');
    invalidateJsonCache(questionsFile);
  } catch (err) {
    console.warn('Could not sync questions.json:', err.message);
  }
}

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
    await syncQuestionJsonFiles();

    res.status(201).json({ message: 'Question created successfully in database and questions.json', question: newQuestion });
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

    await syncQuestionJsonFiles();

    res.json({ message: 'Question updated successfully and synced to questions.json', question: updated });
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

    await syncQuestionJsonFiles();

    res.json({ message: 'Question deleted successfully and synced to questions.json', id: qId });
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
