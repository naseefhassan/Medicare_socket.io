const MessageModel = require("../Model/MessageSchema");
const object = {
  saveMessage: async (req, res) => {
    try {
      const { message, sender, receiver } = req.body;
      const messages = await MessageModel({
        message,
        sender,
        receiver,
        timestamp: Date.now(),
      });
      await messages.save();
      res.status(200).json({ message: "Message saved successfuly" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  },
  getMessage: async (req, res) => {
    try {
      const message = await MessageModel.find();
      res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ message: "fetching failed" });
      console.error(error);
    }
  },
};
module.exports = object;
