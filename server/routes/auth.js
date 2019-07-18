const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { successRedirect: 'http://localhost:3000' }));

router.get('/google', passport.authenticate('google',  { scope: [ 'profile' ] }));
router.get('/google/callback', passport.authenticate('google', { successRedirect: 'http://localhost:3000' }));

module.exports = router;