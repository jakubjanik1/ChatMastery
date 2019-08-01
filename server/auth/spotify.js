const SpotifyStartegy = require('passport-spotify').Strategy;
const User = require('../models/User');

module.exports = new SpotifyStartegy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}auth/spotify/callback`
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate(
        { _id: profile.id }, 
        { 
            name: profile.displayName, 
            ...(profile.photos.length && { avatar: profile.photos[0].url })
        }, 
        (err, user) => done(err, user)
    );
});