const passport = require('passport');
const googleStrategy = require('./google');
const githubStrategy = require('../auth/github');
const localStrategy = require('../auth/local');

passport.use(googleStrategy);
passport.use(githubStrategy);
passport.use(localStrategy);

passport.serializeUser((user, done) => {
    return done(null, user);
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;