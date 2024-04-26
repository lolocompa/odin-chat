const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{ type: String }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  // Add more fields as needed
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;