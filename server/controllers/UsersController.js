const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const { check, validationResult } = require('express-validator');
const emailValidator = require('email-validator');
const passport = require('../auth/passport');
const crypto = require('crypto');
const mailer = require('../config/nodemailer');

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

    check('repeatedPassword')
        .custom((repeatedPassword, { req }) => {
            if (repeatedPassword != req.body.password) {
                return Promise.reject('Password does not match')
            }
        }),

    check('name')
        .not().isEmpty().withMessage('Name is required')
]

exports.signup = async (req, res) => {
    if (! isValidate(req)) {
        return res.json(getValidationErrors(req));
    }

    delete req.body.repeatedPassword;
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

exports.forgotPassword = async (req, res) => {
    if (req.body.email === '') {
        return res.status(400).send('Email is required');
    }

    const user = await User.findOne({ email: req.body.email, socialAuth: { $in: [ false, undefined ]}});

    if (user === null) {
        return res.status(403).send('User with this email does not exist');
    }
    
    const token = crypto.randomBytes(20).toString('hex');
    await user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000
    }).exec();

    const mailOptions = {
        to: user.email,
        from: 'ChatMastery',
        subject: 'ChatMastery - reset password',
        template: 'resetPassword',
        locals: {
            url: `${ process.env.CLIENT_URL }users/resetPassword/${ token }`
        }
    };

    await mailer.sendMail(mailOptions);
    return res.status(200).send('Recovery email sent');
}

function isValidate(req) {
    const errors = validationResult(req);
    
    return ! errors.array().filter(err => err.msg != 'Invalid value').length;
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