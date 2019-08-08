const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/ChatController');
const multipart = require('connect-multiparty')();
const { catchAsync } = require('../middlewares/errors')

router.get('/conversations/:userId', catchAsync(ChatController.getConversations));
router.get('/conversation/:id/messages/part/:part', catchAsync(ChatController.getMessages));
router.post('/conversation/message', catchAsync(ChatController.storeMessage));
router.post('/conversation', catchAsync(ChatController.storeConversation));

module.exports = router;