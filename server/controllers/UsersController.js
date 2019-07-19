const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const { check, validationResult } = require('express-validator');
const passport = require('../auth/passport');

exports.search = (req, res) => {
    const regex = new RegExp(`.*${req.params.query}.*`, 'i');
    
    User.find({ name: regex })
        .then(users => res.json(users));
}

exports.getLoggedInUser = (req, res) => {
    return res.json(req.user);
}

exports.validate = [
    check('email')
        .custom(email => User.find({ email }).then(users => {
            if (users.length) {
                return Promise.reject('Email already in use');
            }
        }))
        .isEmail().withMessage('Please enter a valid email address')
        .not().isEmpty().withMessage('Email is required'),

    check('password')
        .isLength({ min: 6 }).withMessage('Your password must be at least 6 characters')
        .not().isEmpty().withMessage('Password is required'),

    check('name')
        .not().isEmpty().withMessage('Name is required')
]

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }

    const user = new User(req.body);
    user._id = ObjectId().toHexString();

    user.save().then(user => res.json(user))
}

exports.login = (req, res) => {
    passport.authenticate('local', { badRequestMessage: 'Please fill in all fields' },
        (err, user, info) => {
            if (! user) {
                return res.json({ error: info.message });
            }
            
            req.logIn(user, () => res.json(user));
    })(req, res);
}

exports.logout = (req, res) => {
    req.logout();
    return res.redirect(process.env.CLIENT_URL);
}