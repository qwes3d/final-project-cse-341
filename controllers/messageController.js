const Message = require ( "../models/Message.js");

// Send a message
 const sendMessage = async (req, res) => {
  try {
    const { recipient, content } = req.body;

    const message = new Message({
      sender: req.user.id,   // from auth middleware
      recipient,
      content,
    });

    await message.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get messages for logged-in user
 const getMyMessages = async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.user.id })
      .populate("sender", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get messages a user has sent
 const getSentMessages = async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.user.id })
      .populate("recipient", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  sendMessage,
  getMyMessages,
  getSentMessages,};
