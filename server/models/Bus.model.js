const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber:    { type: String, required: true, unique: true },
  capacity:     { type: Number, required: true },
  driver:       { type: String, default: 'Unassigned' },
  mobileNumber: { type: String, default: '' },
  route:        { type: String, default: '' },
  plate:        { type: String, default: '' },
  status:       { type: String, enum: ['active','standby','maintenance-due','on-campus','departed','overcrowded','late','incoming'], default: 'active' },
  health:       { type: String, enum: ['good','warning','critical'], default: 'good' },
  fuelLevel:    { type: Number, min: 0, max: 100, default: 100 },
  lastService:  { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
