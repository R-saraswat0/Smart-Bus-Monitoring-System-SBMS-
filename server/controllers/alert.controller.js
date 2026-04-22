const Alert = require('../models/Alert.model');

exports.getAll = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 }).lean();
    const normalized = alerts.map((a) => ({ id: String(a._id), ...a }));
    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

exports.create = async (req, res) => {
  try {
    const title       = String(req.body.title       || '').trim();
    const description = String(req.body.description || '').trim();
    const time        = String(req.body.time        || '').trim();
    const severity    = req.body.severity  || 'medium';
    const busNumber   = String(req.body.busNumber   || 'N/A').trim();
    const owner       = String(req.body.owner       || 'System').trim();

    if (!title || !description || !time) return res.status(400).json({ error: 'title, description, time required' });

    const alert = await Alert.create({ title, severity, busNumber, time, owner, description });
    res.status(201).json({ id: String(alert._id), ...alert.toObject() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

exports.resolve = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, { $set: { resolved: true } }, { new: true }).lean();
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.json({ id: String(alert._id), ...alert });
  } catch (err) {
    res.status(500).json({ error: 'Failed to resolve alert' });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Alert.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return res.status(404).json({ error: 'Alert not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete alert' });
  }
};
