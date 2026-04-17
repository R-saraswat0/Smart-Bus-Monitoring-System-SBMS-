const User = require('../models/User.model');

exports.getGuards = async (req, res) => {
  const guards = await User.find({ role: 'guard' }).select('-password').sort({ createdAt: 1 }).lean();
  const normalized = guards.map((guard) => ({
    id: String(guard._id),
    ...guard,
  }));
  res.json(normalized);
};

exports.addGuard = async (req, res) => {
  const { name, email, password, gate, shift } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' });

  const normalizedEmail = String(email).trim().toLowerCase();
  const existing = await User.findOne({ email: normalizedEmail }).lean();
  if (existing) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  const guard = await User.create({
    name,
    email: normalizedEmail,
    password,
    role: 'guard',
    title: 'Security Guard',
    gate: gate || '',
    shift: shift || 'Morning Shift',
    status: 'active',
  });

  const safeGuard = {
    id: String(guard._id),
    name: guard.name,
    email: guard.email,
    role: guard.role,
    title: guard.title,
    gate: guard.gate,
    shift: guard.shift,
    status: guard.status,
  };
  res.status(201).json(safeGuard);
};

exports.removeGuard = async (req, res) => {
  const deleted = await User.findOneAndDelete({ _id: req.params.id, role: 'guard' }).lean();
  if (!deleted) return res.status(404).json({ error: 'Guard not found' });

  res.json({ success: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword) return res.status(400).json({ error: 'newPassword required' });

  const guard = await User.findOne({ _id: req.params.id, role: 'guard' });
  if (!guard) return res.status(404).json({ error: 'Guard not found' });

  guard.password = newPassword;
  await guard.save();

  res.json({ success: true });
};
