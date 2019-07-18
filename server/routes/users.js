const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');

router.get('/search/:query', UsersController.search);

router.get('/me', UsersController.getLoggedInUser);

router.post('/signup', UsersController.validate, UsersController.signup);

router.post('/login', UsersController.login);

router.get('/logout', UsersController.logout);

module.exports = router;