const express = require('express');
const router = express.Router();
const passportGithub = require('../auth/github');

router.get('/github', passportGithub.authenticate('github'));

router.get('/github/callback', passportGithub.authenticate('github', { successRedirect: 'http://192.168.0.103:3000' }));

module.exports = router;