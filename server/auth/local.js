const LocalStartegy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = new LocalStartegy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                return done(err);
            } else if (! user || ! user.verifyPassword(password)) {
                return done(null, false, { message: 'Incorrect email or password' });
            } else {
                return done(null, user);  
            }
        });
});