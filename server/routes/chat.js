const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController');

router.get('/conversations/:userId', ChatController.getConversations);

module.exports = router;