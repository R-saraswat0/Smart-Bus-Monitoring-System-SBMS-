const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  severity: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  busNumber: { type: String, default: 'N/A' },
  time: { type: String, required: true },
  owner: { type: String, default: 'System' },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
