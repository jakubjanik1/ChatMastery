const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');

router.get('/search/:query', UsersController.search);

router.get('/me', UsersController.getLoggedInUser);

module.exports = router;