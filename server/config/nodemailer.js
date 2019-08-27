const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    service: process.env.EMAIL_PROVIDER,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});