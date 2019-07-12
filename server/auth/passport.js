const passport = require('passport');

passport.serializeUser((user, done) => {
    return done(null, user);
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;