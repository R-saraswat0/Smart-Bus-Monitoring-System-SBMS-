const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  bus_assigned: { type: String, default: 'Not Assigned' },
  photo_url: { type: String, default: '' },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
