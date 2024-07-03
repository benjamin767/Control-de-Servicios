const nodemailer = require('nodemailer');
const cron = require('node-cron');
const { scheduleJob } = require('node-schedule');
require('dotenv').config();
const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_PASS,
        pass: EMAIL_USER,
    }
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: '',
    subject: 'Scheduled Email',
    text: 'This is an automatically scheduled email.'
};

function sendMail(to) {
    mailOptions.to = to;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
}

// cron.schedule('0 9 * * *', () => {
//     console.log('Running Cron Job at 9 AM');
//     sendMail('recipient-email@example.com');
// }, {
//     scheduled: true,
//     timezone: "America/New_York"
// });

module.exports = {
    scheduleEmail: function (date, recipient) {
        scheduleJob(date, () => {
            sendMail(recipient);
            console.log(`Email scheduled to ${recipient} at ${date}`);
        });
    },
};