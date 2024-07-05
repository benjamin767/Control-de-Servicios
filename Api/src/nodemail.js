const nodemailer = require('nodemailer');
const cron = require('node-cron');
const { scheduleJob } = require('node-schedule');
require('dotenv').config();
const { google } = require('googleapis');
const { REDIRECT_URI, ACESS_TOKEN, REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET, EMAIL_USER, EMAIL_PASS } = process.env;

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(to) {
    // const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: EMAIL_PASS,
            pass: EMAIL_USER,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: ACESS_TOKEN
        }
    });
    
    const mailOptions = {
        from: EMAIL_USER,
        to: `${to}`,
        subject: 'Scheduled Email',
        text: 'This is an automatically scheduled email.'
    };
    
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else console.log('Email sent: ' + info);
        
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
    scheduleEmail: async (date, recipient) =>  {
        scheduleJob(date, async () => {
            await sendMail(recipient);
            console.log(`Email scheduled to ${recipient} at ${date}`);
        });
    },
    sendMail,
};