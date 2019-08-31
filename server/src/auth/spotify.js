import { Strategy as SpotifyStrategy } from 'passport-spotify';
import User from '../models/User';

export const spotifyStrategy = new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}auth/spotify/callback`
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate(
        { _id: profile.id }, 
        { 
            name: profile.displayName, 
            ...(profile.photos.length && { avatar: profile.photos[0].url }),
            socialAuth: true
        }, 
        (err, user) => done(err, user)
    );
});