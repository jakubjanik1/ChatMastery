const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController');
const multipart = require('connect-multiparty')();

router.get('/conversations/:userId', ChatController.getConversations);
router.get('/conversation/:id/messages', ChatController.getMessages);
router.post('/conversation/message', ChatController.storeMessage);
router.post('/conversation', ChatController.storeConversation);
router.post('/conversation/message/image', multipart, ChatController.storeMessageImage);

module.exports = router;