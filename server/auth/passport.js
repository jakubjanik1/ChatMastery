const passport = require('passport');
const googleStrategy = require('./google');
const githubStrategy = require('../auth/github');
const localStrategy = require('../auth/local');
const facebookStrategy = require('../auth/facebook');
const spotifyStrategy = require('../auth/spotify');
const User = require('../models/User');

passport.use(googleStrategy);
passport.use(githubStrategy);
passport.use(localStrategy);
passport.use(facebookStrategy);
passport.use(spotifyStrategy);

passport.serializeUser((user, done) => {
    return done(null, user);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;