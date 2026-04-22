const User = require('../models/User.model');

exports.getGuards = async (req, res) => {
  try {
    const guards = await User.find({ role: 'guard' }).select('-password').sort({ createdAt: 1 }).lean();
    const normalized = guards.map((g) => ({ id: String(g._id), ...g }));
    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch guards' });
  }
};

exports.addGuard = async (req, res) => {
  try {
    const name  = String(req.body.name  || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '').trim();
    const gate  = String(req.body.gate  || '').trim();
    const shift = String(req.body.shift || 'Morning Shift').trim();

    if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const existing = await User.findOne({ email }).lean();
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    const guard = await User.create({ name, email, password, role: 'guard', title: 'Security Guard', gate, shift, status: 'active' });
    res.status(201).json({ id: String(guard._id), name: guard.name, email: guard.email, role: guard.role, title: guard.title, gate: guard.gate, shift: guard.shift, status: guard.status });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add guard' });
  }
};

exports.removeGuard = async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ _id: req.params.id, role: 'guard' }).lean();
    if (!deleted) return res.status(404).json({ error: 'Guard not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove guard' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const newPassword = String(req.body.newPassword || '').trim();
    if (!newPassword || newPassword.length < 6) return res.status(400).json({ error: 'newPassword must be at least 6 characters' });

    const guard = await User.findOne({ _id: req.params.id, role: 'guard' });
    if (!guard) return res.status(404).json({ error: 'Guard not found' });

    guard.password = newPassword;
    await guard.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
};
