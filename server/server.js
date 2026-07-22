require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sbms';

if (!process.env.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET not set in .env — using insecure fallback. Set it before deploying.');
}

// Security headers
app.use(helmet());

const allowedOrigins = [
  'http://localhost:5102',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:4173',
  'https://smart-bus-monitoring-system-sbms.onrender.com',
  'https://smart-bus-monitoring-system-sbms.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(o => origin.startsWith(o)) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: { error: 'Too many OTP requests. Please wait 5 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes
app.use('/api/auth', authLimiter, require('./routes/auth.routes'));
app.use('/api/buses', require('./routes/bus.routes'));
app.use('/api/logs', require('./routes/busLog.routes'));
app.use('/api/guards', require('./routes/guard.routes'));
app.use('/api/alerts', require('./routes/alert.routes'));
app.use('/api/messages', require('./routes/message.routes'));
app.use('/api/student', otpLimiter, require('./routes/student.routes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const server = app.listen(PORT, () => {
      console.log(`🚀 SBMS backend running on port ${PORT}`);
    });

    // Graceful EADDRINUSE handling — prevents nodemon crash loop
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use!`);
        console.error(`   Another server is already running on port ${PORT}.`);
        console.error(`   Fix: Close the other terminal/process using port ${PORT} first.\n`);
        process.exit(1);
      } else {
        throw err;
      }
    });
  } catch (error) {
    console.error('❌ Failed to connect MongoDB:', error.message);
    process.exit(1);
  }
}

start();

