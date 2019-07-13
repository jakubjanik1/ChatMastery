const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');

router.get('/search/:query', UsersController.search);

router.get('/me', UsersController.getLoggedInUser);

router.get('/logout', UsersController.logout);

module.exports = router;