const moongoose =require('mongoose')

const MessageSchema = new moongoose.Schema({
    ChatId: { type: String },
    SenderId: { type: String },
    text: { type: String },

}, {
    timestamps: true
}
)

const MessageModel = moongoose.model('message',MessageSchema)

module.exports =  MessageModel