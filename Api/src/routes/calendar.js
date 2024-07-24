const express = require("express");
const { google } = require("googleapis");
const dayjs = require("dayjs");
const router = express.Router();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, API_KEY } = process.env;
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const calendar = google.calendar({
    version: "v3",
    auth: API_KEY
});

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

router.get("/", async (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
    });
    res.redirect(url);
});

router.get("/redirect", async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        await oauth2Client.setCredentials(tokens);
        res.send({msg: "You have successfully logged in"}); 
    }catch(error) {
        console.log(error);
        res.status(400).send("Locura de error, pero tranqui lo vas a solucionar");
    }
});

router.get("/schedule_event", async (req, res) => {
    let { fecha, empresa, rubro, descripcion } = req.query;
    fecha = fecha.split("-").map(e => Number(e));
    fecha = new Date(fecha[0], fecha[1]-1, fecha[2], 9, 30, 0);
    try {
        await calendar.events.insert({
            calendarId: "primary",
            auth: oauth2Client,
            requestBody: {
                summary: `Vencimiento de la Factura de la ${empresa} - ${rubro} - ${descripcion}`,
                description: `Averiguar si la factura ${empresa} - ${rubro} esta paga`,
                start: {
                    dateTime: dayjs(fecha).toISOString(),
                    timeZone: "America/Argentina/Buenos_Aires"
                },
                end: {
                    dateTime: dayjs(fecha).add(1, "hour").toISOString(),
                    timeZone: "America/Argentina/Buenos_Aires"
                },
                attendees: [
                    {
                        email: "administracion@frecom.com.ar",
                    },
                    {
                        email: "it@frecom.com.ar"
                    },
                ]
            }
        });
        res.status(200).json({ msg: "Perfecto, Recordatorio de vencimiento de la factura creado!"})
    } catch(error) {
        res.status(400).send(error.message)
    }
}); 

module.exports = router;