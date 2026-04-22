const Bus = require('../models/Bus.model');

exports.getAll = async (req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: 1 }).lean();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch buses' });
  }
};

exports.create = async (req, res) => {
  try {
    const busNumber    = String(req.body.busNumber    || '').trim();
    const capacity     = Number(req.body.capacity     || 0);
    const driver       = String(req.body.driver       || '').trim();
    const mobileNumber = String(req.body.mobileNumber || '').trim();
    const route        = String(req.body.route        || '').trim();
    const plate        = String(req.body.plate        || '').trim();
    const health       = req.body.health || 'good';
    const fuelLevel    = Number(req.body.fuelLevel) || 100;
    const lastService  = String(req.body.lastService  || '').trim();

    if (!busNumber || !capacity) return res.status(400).json({ error: 'busNumber and capacity required' });

    const existing = await Bus.findOne({ busNumber }).lean();
    if (existing) return res.status(400).json({ error: 'Bus number already exists' });

    const bus = await Bus.create({ busNumber, capacity, driver, mobileNumber, route, plate, health, fuelLevel, lastService, status: 'active' });
    res.status(201).json(bus);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create bus' });
  }
};

exports.update = async (req, res) => {
  try {
    const bus = await Bus.findOneAndUpdate(
      { busNumber: req.params.busNumber },
      { $set: req.body },
      { new: true, runValidators: true }
    ).lean();
    if (!bus) return res.status(404).json({ error: 'Bus not found' });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update bus' });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Bus.findOneAndDelete({ busNumber: req.params.busNumber }).lean();
    if (!deleted) return res.status(404).json({ error: 'Bus not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete bus' });
  }
};
