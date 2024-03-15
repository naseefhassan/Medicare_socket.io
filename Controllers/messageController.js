const MessageModel = require("../Model/MessageSchema");
const object = {
  saveMessage: async (req, res) => {
    console.log('hi');
    try {
      const { message, sender, receiver } = req.body;
      console.log(req.body);
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
};
module.exports = object;