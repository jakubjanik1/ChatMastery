import nodemailer from 'nodemailer';
import pug from 'pug';
import juice from 'juice';

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_PROVIDER,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

export function sendMail(options) {
    options.html = pug.renderFile(`${ __dirname }/../views/emails/${ options.template }.pug`, options.locals);
    options.html = juice(options.html);

    return transporter.sendMail(options);
};