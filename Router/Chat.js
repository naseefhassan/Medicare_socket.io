const express = require('express');

const router = express.Router()
const{createChat,userChats,findChat}=require('../Controller/ChatController')

router.post('/', createChat)
router.get('/:userId', userChats)
router.get('/find/:firstId/:secondId', findChat)

module.exports=router