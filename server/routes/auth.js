const express = require('express');
const router = express.Router();
const passportGithub = require('../auth/github');
const passportGoogle = require('../auth/google');

router.get('/github', passportGithub.authenticate('github'));
router.get('/github/callback', passportGithub.authenticate('github', { successRedirect: 'http://localhost:3000' }));

router.get('/google', passportGithub.authenticate('google',  { scope: [ 'profile' ] }));
router.get('/google/callback', passportGithub.authenticate('google', { successRedirect: 'http://localhost:3000' }));

module.exports = router;