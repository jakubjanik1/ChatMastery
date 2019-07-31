const passport = require('passport');
const googleStrategy = require('./google');
const githubStrategy = require('../auth/github');
const localStrategy = require('../auth/local');
const User = require('../models/User');

passport.use(googleStrategy);
passport.use(githubStrategy);
passport.use(localStrategy);

passport.serializeUser((user, done) => {
    return done(null, user);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;