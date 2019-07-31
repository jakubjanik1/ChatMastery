const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

module.exports = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.SERVER_URL}auth/facebook/callback`
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate(
        { _id: profile.id }, 
        { name: profile.displayName }, 
        (err, user) => done(err, user)
    );
});