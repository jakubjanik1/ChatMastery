const GithubStartegy = require('passport-github').Strategy;
const User = require('../models/User');

module.exports = new GithubStartegy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate(
        { _id: profile.id }, 
        { name: profile.displayName, avatar: profile._json.avatar_url }, 
        (err, user) => done(err, user)
    );
});