const mongoose = require('mongoose')

const ChatModel = new mongoose.Schema({
    members: { type: Array }

},
    {
        timestamps:true
    }
)

const ChatSchema = mongoose.model('Chat',ChatModel)

module.exports = ChatSchema