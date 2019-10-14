import nodemailer from 'nodemailer';
import mjml2html from 'mjml';
import fs from 'fs';
import ejs from 'ejs';

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_PROVIDER,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

export function sendMail(options) {
    const mjml = fs.readFileSync(`${ __dirname }/../views/emails/${ options.template }.mjml`, 'utf-8');
    const html = mjml2html(mjml).html;

    options.html = ejs.render(html, options.locals);
    
    return transporter.sendMail(options);
};