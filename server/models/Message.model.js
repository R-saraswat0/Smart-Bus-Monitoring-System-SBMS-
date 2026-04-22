const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true }, // "All Guards" or guard name
  text: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
