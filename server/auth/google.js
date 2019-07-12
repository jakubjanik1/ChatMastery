const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('./passport');
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate(
        { _id: profile.id }, 
        { name: profile.displayName, avatar: profile._json.picture }, 
        (err, user) => done(err, user)
    );
}));

module.exports = passport;