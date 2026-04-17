const Bus = require('../models/Bus.model');

exports.getAll = async (req, res) => {
  const buses = await Bus.find().sort({ createdAt: 1 }).lean();
  res.json(buses);
};

exports.create = async (req, res) => {
  const { busNumber, capacity, driver, mobileNumber, route, plate, health, fuelLevel, lastService } = req.body;
  if (!busNumber || !capacity) return res.status(400).json({ error: 'busNumber and capacity required' });

  const existing = await Bus.findOne({ busNumber: String(busNumber).trim() }).lean();
  if (existing) {
    return res.status(400).json({ error: 'Bus number already exists' });
  }

  const bus = await Bus.create({
    busNumber: String(busNumber).trim(),
    capacity: Number(capacity),
    driver,
    mobileNumber,
    route,
    plate,
    health: health || 'good',
    fuelLevel: fuelLevel || '100%',
    lastService,
    status: 'active',
  });

  res.status(201).json(bus);
};

exports.update = async (req, res) => {
  const bus = await Bus.findOneAndUpdate(
    { busNumber: req.params.busNumber },
    { $set: req.body },
    { new: true, runValidators: true }
  ).lean();

  if (!bus) return res.status(404).json({ error: 'Bus not found' });

  res.json(bus);
};

exports.remove = async (req, res) => {
  const deleted = await Bus.findOneAndDelete({ busNumber: req.params.busNumber }).lean();
  if (!deleted) return res.status(404).json({ error: 'Bus not found' });

  res.json({ success: true });
};
