import passport from 'passport';
import { googleStrategy } from './google';
import { githubStrategy } from './github';
import { localStrategy } from './local';
import { facebookStrategy } from './facebook';
import { spotifyStrategy } from './spotify';
import User from '../models/User';

passport.use(googleStrategy);
passport.use(githubStrategy);
passport.use(localStrategy);
passport.use(facebookStrategy);
passport.use(spotifyStrategy);

passport.serializeUser((user, done) => {
    return done(null, user);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

export default passport;