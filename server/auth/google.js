const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}auth/google/callback`
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate(
        { _id: profile.id }, 
        { 
            name: profile.displayName,
            avatar: profile._json.picture,
            socialAuth: true
        }, 
        (err, user) => done(err, user)
    );
});