const mongoose = require('mongoose');

const busArrivalVerificationLogSchema = new mongoose.Schema({
  bus_number: { type: String, required: true },
  arrival_log_id: { type: String, required: true },
  student_id: { type: String, required: false },
  mobile_number: { type: String, required: false },
  purpose: { type: String, required: false },
  verified_at: { type: Date, default: Date.now },
  verification_status: { type: String, enum: ['VERIFIED', 'MANUAL_CHECK', 'INVALID', 'GUEST'], default: 'VERIFIED' },
  guard_id: { type: String, required: true },
  face_match_score: { type: Number, default: null }
}, { timestamps: true });

busArrivalVerificationLogSchema.index({ arrival_log_id: 1, student_id: 1 }, { unique: true, sparse: true });
busArrivalVerificationLogSchema.index({ arrival_log_id: 1, mobile_number: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('BusArrivalVerificationLog', busArrivalVerificationLogSchema);
