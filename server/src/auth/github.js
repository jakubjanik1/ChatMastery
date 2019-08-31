import { Strategy as GithubStrategy } from 'passport-github';
import User from '../models/User';

export const githubStrategy = new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}auth/github/callback`
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate(
        { _id: profile.id }, 
        { 
            name: profile.displayName, 
            avatar: profile._json.avatar_url,
            socialAuth: true
        }, 
        (err, user) => done(err, user)
    );
});