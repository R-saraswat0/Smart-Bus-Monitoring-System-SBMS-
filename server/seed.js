require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User.model');
const Bus = require('./models/Bus.model');
const BusLog = require('./models/BusLog.model');
const Alert = require('./models/Alert.model');
const Message = require('./models/Message.model');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sbms';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Bus.deleteMany({}),
    BusLog.deleteMany({}),
    Alert.deleteMany({}),
    Message.deleteMany({}),
  ]);

  // Seed users
  await User.create([
    { name: 'Anita Reddy', email: 'admin@sbms.local', password: 'admin123', role: 'admin', title: 'Transport Admin' },
    { name: 'Rajesh Kumar', email: 'guard@sbms.local', password: 'guard123', role: 'guard', title: 'Main Gate Guard', gate: 'Main Gate', shift: 'Morning Shift' },
    { name: 'Amit Sharma', email: 'amit@sbms.local', password: 'guard123', role: 'guard', title: 'North Gate Guard', gate: 'North Gate', shift: 'Morning Shift' },
    { name: 'Suresh Patil', email: 'suresh@sbms.local', password: 'guard123', role: 'guard', title: 'East Gate Guard', gate: 'East Gate', shift: 'Day Shift' },
    { name: 'Vikram Singh', email: 'vikram@sbms.local', password: 'guard123', role: 'guard', title: 'South Gate Guard', gate: 'South Gate', shift: 'Day Shift' },
    { name: 'Meena Joshi', email: 'meena@sbms.local', password: 'guard123', role: 'guard', title: 'West Gate Guard', gate: 'West Gate', shift: 'Evening Shift', status: 'scheduled' },
  ]);

  // Seed fleet
  await Bus.create([
    { busNumber: 'BUS-101', capacity: 45, driver: 'Arun Patel', route: 'Krishnapuri to GLA', plate: 'KA-01-HZ-1451', lastService: 'Jan 28, 2026', fuelLevel: '74%', health: 'good', status: 'active' },
    { busNumber: 'BUS-205', capacity: 50, driver: 'Kishore Singh', route: 'Raya to GLA', plate: 'KA-09-AB-2301', lastService: 'Feb 04, 2026', fuelLevel: '48%', health: 'warning', status: 'active' },
    { busNumber: 'BUS-308', capacity: 40, driver: 'Imran Shaikh', route: 'Gokul to GLA', plate: 'KA-05-QM-8814', lastService: 'Feb 11, 2026', fuelLevel: '67%', health: 'good', status: 'active' },
    { busNumber: 'BUS-412', capacity: 45, driver: 'Deepak Nair', route: 'Mathura to GLA', plate: 'KA-02-RT-5583', lastService: 'Jan 31, 2026', fuelLevel: '82%', health: 'good', status: 'active' },
    { busNumber: 'BUS-508', capacity: 50, driver: 'Ravi Prakash', route: 'Vrindavan to GLA', plate: 'KA-07-UV-1092', lastService: 'Jan 19, 2026', fuelLevel: '29%', health: 'warning', status: 'maintenance-due' },
    { busNumber: 'BUS-611', capacity: 42, driver: 'Mohan Rao', route: 'West Gate to Auditorium', plate: 'KA-10-HP-7765', lastService: 'Feb 09, 2026', fuelLevel: '88%', health: 'good', status: 'standby' },
  ]);

  // Seed logs
  await BusLog.create([
    { busNumber: 'BUS-101', guard: 'Rajesh Kumar', type: 'entry', time: '09:15 AM', date: 'Feb 14, 2026', gate: 'Main Gate', occupancy: 38, capacity: 45, status: 'on-time' },
    { busNumber: 'BUS-205', guard: 'Amit Sharma', type: 'entry', time: '09:22 AM', date: 'Feb 14, 2026', gate: 'North Gate', occupancy: 52, capacity: 50, status: 'overcrowded' },
    { busNumber: 'BUS-308', guard: 'Suresh Patil', type: 'exit', time: '09:35 AM', date: 'Feb 14, 2026', gate: 'East Gate', occupancy: 28, capacity: 40, status: 'on-time' },
    { busNumber: 'BUS-412', guard: 'Vikram Singh', type: 'entry', time: '09:42 AM', date: 'Feb 14, 2026', gate: 'Main Gate', occupancy: 41, capacity: 45, status: 'late' },
    { busNumber: 'BUS-101', guard: 'Rajesh Kumar', type: 'exit', time: '10:05 AM', date: 'Feb 14, 2026', gate: 'South Gate', occupancy: 35, capacity: 45, status: 'on-time' },
    { busNumber: 'BUS-508', guard: 'Amit Sharma', type: 'entry', time: '10:18 AM', date: 'Feb 14, 2026', gate: 'North Gate', occupancy: 48, capacity: 50, status: 'late' },
    { busNumber: 'BUS-205', guard: 'Amit Sharma', type: 'exit', time: '10:26 AM', date: 'Feb 14, 2026', gate: 'North Gate', occupancy: 33, capacity: 50, status: 'on-time' },
    { busNumber: 'BUS-412', guard: 'Vikram Singh', type: 'exit', time: '10:41 AM', date: 'Feb 14, 2026', gate: 'East Gate', occupancy: 26, capacity: 45, status: 'on-time' },
  ]);

  // Seed alerts
  await Alert.create([
    { title: 'Today 5 buses out of capacity', severity: 'high', busNumber: 'Multiple', time: '09:22 AM', owner: 'Transport Admin', description: 'Occupancy reached over capacity limits on 5 different bus rotations today.' },
    { title: 'Today 3 buses late', severity: 'medium', busNumber: 'Multiple', time: '09:42 AM', owner: 'Operations Team', description: 'Three buses have crossed the delay threshold while entering through the gates.' },
    { title: 'Missed update from West Gate', severity: 'low', busNumber: 'N/A', time: '08:15 AM', owner: 'Security Desk', description: 'Expected guard confirmation for the early shift has not yet been logged.' },
  ]);

  // Seed messages
  await Message.create([
    { sender: 'Transport Admin', receiver: 'All Guards', text: 'Please work properly and verify all arriving bus IDs. Pay special attention to check bus id xyz properly.', time: '08:15 AM', date: 'Feb 14, 2026' },
  ]);

  console.log('✅ Seed complete');
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
