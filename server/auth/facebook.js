const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

module.exports = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.SERVER_URL}auth/facebook/callback`
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate(
        { _id: profile.id }, 
        { 
            name: profile.displayName,
            avatar: `http://graph.facebook.com/${ profile.id }/picture?width=200&height=200&access_token=${ accessToken}`
        }, 
        (err, user) => done(err, user)
    );
});