import { Router } from 'express';
import UploadController from '../controllers/UploadController';
import { catchAsync } from '../middlewares/errors';
import multipart from 'connect-multiparty';

const router = Router();

router.post('/image', multipart(), catchAsync(UploadController.uploadImage));

export default router;