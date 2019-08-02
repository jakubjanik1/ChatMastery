const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const { check, validationResult } = require('express-validator');
const emailValidator = require('email-validator');
const passport = require('../auth/passport');

exports.search = async (req, res) => {
    const regex = new RegExp(`.*${req.params.query}.*`, 'i');
    
    const users = await User.find({ name: regex });
    return res.json(users);
}

exports.getLoggedInUser = (req, res) => {
    return res.json(req.user);
}

exports.validate = [
    check('email')
        .if(check('email').exists())
        .custom((email, { req }) => User.find({ email }).then(users => {
            if (! email) {
                return Promise.reject(req.body.socialAuth ? '' : 'Email is required');
            } else if (! emailValidator.validate(email)) {
                return Promise.reject('Please enter the valid email');
            } else if (users.length && users[0]._id != req.body._id) {
                return Promise.reject('Email already in use');
            }
        })),

    check('password')
        .if(check('password').exists())
        .isLength({ min: 6 }).withMessage('Your password must be at least 6 characters')
        .not().isEmpty().withMessage('Password is required'),

    check('name')
        .not().isEmpty().withMessage('Name is required')
]

exports.signup = async (req, res) => {
    if (! isValidate(req)) {
        return res.json(getValidationErrors(req));
    }

    const user = new User(req.body);
    user._id = ObjectId().toHexString();

    const response = await user.save();
    return res.json(response);
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

exports.update = async (req, res) => {
    if (! isValidate(req)) {
        return res.json(getValidationErrors(req));
    }

    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    
    return res.json(user);
}

function isValidate(req) {
    const errors = validationResult(req);
    return errors.isEmpty();
}

function getValidationErrors(req) {
    const parseErrors = errors => {
        const result = {};
        errors.map(err => {
            if (err.msg != 'Invalid value') {
                result[err.param] = err.msg
            }
        });

        return result;
    };

    const errors = validationResult(req);
    return { errors: parseErrors(errors.array()) };
}