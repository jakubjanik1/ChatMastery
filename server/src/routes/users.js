import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { catchAsync } from '../middlewares/errors';

const router = Router();

router.get('/search/:query', catchAsync(UsersController.search));
router.get('/me', UsersController.getLoggedInUser);
router.post('/signup', UsersController.validate, catchAsync(UsersController.signup));
router.post('/login', UsersController.login);
router.get('/logout', UsersController.logout);
router.put('/:id', UsersController.validate, catchAsync(UsersController.update));
router.post('/forgotPassword', catchAsync(UsersController.forgotPassword));
router.post('/resetPassword', catchAsync(UsersController.resetPassword));
router.post('/updatePassword', UsersController.validatePassword, catchAsync(UsersController.updatePassword));

export default router;