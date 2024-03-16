
const express = require("express");
const router = express.Router();
const { saveMessage, getMessage } = require("../Controllers/messageController");
router.post("/saveMessage", saveMessage);
router.get('/getMessage', getMessage)
module.exports = router;
