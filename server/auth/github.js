const GithubStartegy = require('passport-github').Strategy;
const passport = require('passport');
const User = require('../models/User');

passport.serializeUser((user, done) => {
    return done(null, user);
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GithubStartegy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://192.168.0.103:8080/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate(
        { _id: profile.id }, 
        { name: profile.displayName, avatar: profile._json.avatar_url }, 
        (err, user) => done(err, user)
    );
}));

module.exports = passport;