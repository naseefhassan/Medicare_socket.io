
const express = require("express");
const router = express.Router();
const { saveMessage } = require("../Controllers/messageController");
router.post("/saveMessage", saveMessage);
module.exports = router;
