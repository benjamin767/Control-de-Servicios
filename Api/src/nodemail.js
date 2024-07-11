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

async function sendMail(to, rubro, empresa, descripcion, vencimiento, importe, moneda) {
    // const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });
    
    const mailOptions = {
        from: EMAIL_USER,
        to: `${to}`,
        subject: `Vence factura de ${rubro} - ${empresa}`,
        html: `<p>
            Este mail fue programado para informar y recordar que la factura de los servicios de ${rubro}/${descripcion} de la empresa ${empresa}, 
            vence con un total a pagar de $${importe} ${moneda} en la fecha: ${vencimiento}.
        </p>`
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
    scheduleEmail: (date, recipient, rubro, empresa, descripcion, vencimiento, importe, moneda) =>  {
        scheduleJob(date, async () => {
            sendMail(recipient, rubro, empresa, descripcion, vencimiento, importe, moneda);
            console.log(`Email scheduled to ${recipient} at ${date}`);
        });
    },
    sendMail,
};