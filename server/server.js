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

// One-time seed endpoint — protected by SEED_SECRET env var
app.get('/api/seed', async (req, res) => {
  if (process.env.SEED_SECRET && req.query.secret !== process.env.SEED_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const User    = require('./models/User.model');
    const Bus     = require('./models/Bus.model');
    const BusLog  = require('./models/BusLog.model');
    const Alert   = require('./models/Alert.model');
    const Message = require('./models/Message.model');

    await Promise.all([User.deleteMany({}), Bus.deleteMany({}), BusLog.deleteMany({}), Alert.deleteMany({}), Message.deleteMany({})]);

    await User.create([
      { name: 'Anita Reddy',   email: 'admin@sbms.local',  password: 'admin123', role: 'admin', title: 'Transport Admin' },
      { name: 'Rajesh Kumar',  email: 'guard@sbms.local',  password: 'guard123', role: 'guard', title: 'Main Gate Guard',  gate: 'Main Gate',  shift: 'Morning Shift' },
      { name: 'Amit Sharma',   email: 'amit@sbms.local',   password: 'guard123', role: 'guard', title: 'North Gate Guard', gate: 'North Gate', shift: 'Morning Shift' },
      { name: 'Suresh Patil',  email: 'suresh@sbms.local', password: 'guard123', role: 'guard', title: 'East Gate Guard',  gate: 'East Gate',  shift: 'Day Shift' },
      { name: 'Vikram Singh',  email: 'vikram@sbms.local', password: 'guard123', role: 'guard', title: 'South Gate Guard', gate: 'South Gate', shift: 'Day Shift' },
      { name: 'Meena Joshi',   email: 'meena@sbms.local',  password: 'guard123', role: 'guard', title: 'West Gate Guard',  gate: 'West Gate',  shift: 'Evening Shift', status: 'scheduled' },
    ]);

    await Bus.create([
      { busNumber: 'BUS-101', capacity: 45, driver: 'Arun Patel',    route: 'Krishnapuri to GLA', plate: 'KA-01-HZ-1451', fuelLevel: 74, health: 'good',    status: 'active' },
      { busNumber: 'BUS-205', capacity: 50, driver: 'Kishore Singh', route: 'Raya to GLA',        plate: 'KA-09-AB-2301', fuelLevel: 48, health: 'warning', status: 'active' },
      { busNumber: 'BUS-308', capacity: 40, driver: 'Imran Shaikh',  route: 'Gokul to GLA',       plate: 'KA-05-QM-8814', fuelLevel: 67, health: 'good',    status: 'active' },
      { busNumber: 'BUS-412', capacity: 45, driver: 'Deepak Nair',   route: 'Mathura to GLA',     plate: 'KA-02-RT-5583', fuelLevel: 82, health: 'good',    status: 'active' },
      { busNumber: 'BUS-508', capacity: 50, driver: 'Ravi Prakash',  route: 'Vrindavan to GLA',   plate: 'KA-07-UV-1092', fuelLevel: 29, health: 'warning', status: 'maintenance-due' },
      { busNumber: 'BUS-611', capacity: 42, driver: 'Mohan Rao',     route: 'West Gate to Auditorium', plate: 'KA-10-HP-7765', fuelLevel: 88, health: 'good', status: 'standby' },
    ]);

    await BusLog.create([
      { busNumber: 'BUS-101', guard: 'Rajesh Kumar', type: 'entry', time: '09:15 AM', date: 'Feb 14, 2026', gate: 'Main Gate',  occupancy: 38, capacity: 45, status: 'on-time' },
      { busNumber: 'BUS-205', guard: 'Amit Sharma',  type: 'entry', time: '09:22 AM', date: 'Feb 14, 2026', gate: 'North Gate', occupancy: 52, capacity: 50, status: 'overcrowded' },
      { busNumber: 'BUS-308', guard: 'Suresh Patil', type: 'exit',  time: '09:35 AM', date: 'Feb 14, 2026', gate: 'East Gate',  occupancy: 28, capacity: 40, status: 'on-time' },
      { busNumber: 'BUS-412', guard: 'Vikram Singh', type: 'entry', time: '09:42 AM', date: 'Feb 14, 2026', gate: 'Main Gate',  occupancy: 41, capacity: 45, status: 'late' },
      { busNumber: 'BUS-101', guard: 'Rajesh Kumar', type: 'exit',  time: '10:05 AM', date: 'Feb 14, 2026', gate: 'South Gate', occupancy: 35, capacity: 45, status: 'on-time' },
      { busNumber: 'BUS-508', guard: 'Amit Sharma',  type: 'entry', time: '10:18 AM', date: 'Feb 14, 2026', gate: 'North Gate', occupancy: 48, capacity: 50, status: 'late' },
      { busNumber: 'BUS-205', guard: 'Amit Sharma',  type: 'exit',  time: '10:26 AM', date: 'Feb 14, 2026', gate: 'North Gate', occupancy: 33, capacity: 50, status: 'on-time' },
      { busNumber: 'BUS-412', guard: 'Vikram Singh', type: 'exit',  time: '10:41 AM', date: 'Feb 14, 2026', gate: 'East Gate',  occupancy: 26, capacity: 45, status: 'on-time' },
    ]);

    await Alert.create([
      { title: 'Today 5 buses out of capacity', severity: 'high',   busNumber: 'Multiple', time: '09:22 AM', owner: 'Transport Admin',  description: 'Occupancy reached over capacity limits on 5 different bus rotations today.' },
      { title: 'Today 3 buses late',            severity: 'medium', busNumber: 'Multiple', time: '09:42 AM', owner: 'Operations Team',   description: 'Three buses have crossed the delay threshold while entering through the gates.' },
      { title: 'Missed update from West Gate',  severity: 'low',    busNumber: 'N/A',      time: '08:15 AM', owner: 'Security Desk',     description: 'Expected guard confirmation for the early shift has not yet been logged.' },
    ]);

    await Message.create([
      { sender: 'Transport Admin', receiver: 'All Guards', text: 'Please work properly and verify all arriving bus IDs.', time: '08:15 AM', date: 'Feb 14, 2026' },
    ]);

    res.json({ success: true, message: 'Database seeded successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

