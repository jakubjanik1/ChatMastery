import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/User';

export const facebookStrategy = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.SERVER_URL}auth/facebook/callback`
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate(
        { _id: profile.id }, 
        { 
            name: profile.displayName,
            avatar: `http://graph.facebook.com/${ profile.id }/picture?width=200&height=200&access_token=${ accessToken}`,
            socialAuth: true
        }, 
        (err, user) => done(err, user)
    );
});