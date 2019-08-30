const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_PROVIDER,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

exports.sendMail = (options) => {
    options.html = pug.renderFile(`${ __dirname }/../views/emails/${ options.template }.pug`, options.locals);
    options.html = juice(options.html);

    return transporter.sendMail(options);
};