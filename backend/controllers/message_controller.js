const asyncHandler = require("express-async-handler");
const Message = require("../models/message_model");
const Conversation = require("../models/conversation_model");

exports.send_message = asyncHandler(async (req, res, next) => {
    const recipient = req.body.header_name;
    const content = req.body.type_message;
    const sender = req.user.username;
  
    // Create a new message
    const newMessage = new Message({
      recipient: recipient,
      sender: sender,
      content: content,
    });
  
    await newMessage.save();
  
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, recipient] },
    });
  
    if (!conversation) {
      conversation = new Conversation({
        participants: [sender, recipient],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
    }
  
    await conversation.save();
  
    res.status(200).json({ message: "Message sent successfully" });
  });