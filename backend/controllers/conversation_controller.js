const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversation_model");
const Message = require("../models/message_model"); // Import the Message model

exports.get_conversation = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const user = req.user.username;

  const conversation = await Conversation.findOne({
    participants: { $all: [name, user] },
  }).populate("messages");

  if (!conversation) {
    return res.status(404).json({ message: "Conversation not found" });
  }

  res.status(200).json({ conversation, me: user });
});
