import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

export const googleStrategy = new GoogleStrategy({
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