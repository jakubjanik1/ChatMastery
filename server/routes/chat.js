const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController');

router.get('/conversations/:userId', ChatController.getConversations);
router.get('/conversation/:id/messages', ChatController.getMessages);

module.exports = router;