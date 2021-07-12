const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  roomId: String,
  content: String,
  sender:String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);