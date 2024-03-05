const ChatModel = require('../Model/ChatSchema')

const object = {
    createChat: async (req, res) => {
        const newChat = new ChatModel({
            members: [req.body.senderId, req.body.receiverId]
        })

        try {
            const result = await newChat.save()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    userChats: async (req, res) => {
        try {
            const chat = await ChatModel.find({
                members: { $in: [req.params.userId] }
            })
            res.status(200).json(chat)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    findChat: async (req, res) => {
        try {
            const chat = await ChatModel.find({
                members: { $all: [req.params.firstId, req.params.secondId] }
            })
            res.status(200).json(chat)
        } catch (error) {
            res.status(500).json(error)

        }
    }
}

module.exports = object
