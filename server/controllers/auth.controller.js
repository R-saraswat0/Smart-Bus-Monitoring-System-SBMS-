const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = '7d';

exports.login = async (req, res) => {
  try {
    const email    = String(req.body.email    || '').trim().toLowerCase();
    const password = String(req.body.password || '').trim();
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: String(user._id), role: user.role, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        title: user.title,
        gate: user.gate,
        shift: user.shift,
        status: user.status,
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      title: user.title,
      gate: user.gate,
      shift: user.shift,
      status: user.status,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
