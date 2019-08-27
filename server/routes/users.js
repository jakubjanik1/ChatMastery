const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');
const { catchAsync } = require('../middlewares/errors');

router.get('/search/:query', catchAsync(UsersController.search));

router.get('/me', UsersController.getLoggedInUser);

router.post('/signup', UsersController.validate, catchAsync(UsersController.signup));

router.post('/login', UsersController.login);

router.get('/logout', UsersController.logout);

router.put('/:id', UsersController.validate, catchAsync(UsersController.update));

router.post('/forgotPassword', catchAsync(UsersController.forgotPassword));

module.exports = router;