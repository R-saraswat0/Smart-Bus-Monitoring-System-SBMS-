const Message = require('../models/Message.model');

exports.getAll = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 }).lean();
  res.json(messages);
};

exports.create = async (req, res) => {
  const { receiver, text } = req.body;
  if (!receiver || !text) return res.status(400).json({ error: 'receiver and text required' });

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const msg = await Message.create({ sender: req.user ? req.user.name : 'Unknown', receiver, text, time, date });
  res.status(201).json(msg);
};
