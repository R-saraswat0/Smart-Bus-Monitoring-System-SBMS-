const Alert = require('../models/Alert.model');

exports.getAll = async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 }).lean();
  const normalized = alerts.map((alert) => ({
    id: String(alert._id),
    ...alert,
  }));
  res.json(normalized);
};

exports.create = async (req, res) => {
  const { title, severity, busNumber, time, owner, description } = req.body;
  if (!title || !description || !time) return res.status(400).json({ error: 'title, description, time required' });

  const alert = await Alert.create({ title, severity, busNumber, time, owner, description });

  res.status(201).json(alert);
};

exports.remove = async (req, res) => {
  const deleted = await Alert.findByIdAndDelete(req.params.id).lean();
  if (!deleted) return res.status(404).json({ error: 'Alert not found' });

  res.json({ success: true });
};
