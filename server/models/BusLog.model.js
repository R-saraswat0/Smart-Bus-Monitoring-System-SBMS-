const mongoose = require('mongoose');

const busLogSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  guard: { type: String, required: true },
  guardId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['entry', 'exit'], required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  gate: { type: String, required: true },
  occupancy: { type: Number, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ['on-time', 'late', 'overcrowded'], default: 'on-time' },
  isLate: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('BusLog', busLogSchema);
