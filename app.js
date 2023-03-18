const express = require('express');
const morgan = require('morgan');
// const fs = require('fs');
const schedule = require('node-schedule');

const app = express();

const { getToken, insertDataStream } = require('./utils/functions');
require('./database');
require('dotenv').config();

//config
const port = process.env.PORT || 3002;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(require('./routes'));

app.get('/', (req, res) => {
    res.send('Hello world Ayyeka API :D !!');
});

//  CREA TOKEN PARA PODER EXTRAER DATOS DE LA API DE AYYEKA
let countCreateToken = 0;
// schedule.scheduleJob("1 * * * *", () => {
let date_ob = new Date();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

let currentTime = `${hours}:${minutes}:${seconds}`;

getToken()
    .then(token => {
        countCreateToken = countCreateToken + 1;
        console.log(`Token ${token}`);
        console.log(`Times token generated ${countCreateToken} at ${currentTime}`);
        insertDataStream(token);
    })
    .catch(err => console.log(err));
// });

app.listen(port, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})
