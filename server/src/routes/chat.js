import { Router } from 'express';
import ChatController from '../controllers/ChatController';
import { catchAsync } from '../middlewares/errors';

const router = Router();

router.get('/conversations/:userId', catchAsync(ChatController.getConversations));
router.get('/conversation/:id/messages/part/:part', catchAsync(ChatController.getMessages));
router.post('/conversation/message', catchAsync(ChatController.storeMessage));
router.post('/conversation', catchAsync(ChatController.storeConversation));
router.delete('/conversation/:id', catchAsync(ChatController.deleteConversation));

export default router;