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

//  CREA TOKEN PARA PODER EXTRAER DATOS DE LA API DE AYYEKA
let countCreateToken = 0;
schedule.scheduleJob("* */1 * * *", () => {
    getToken()
        .then(token => {
            countCreateToken = countCreateToken + 1;
            console.log(`Token ${token}`);
            console.log(`Times token generated ${countCreateToken}`);
            insertDataStream(token);
        })
        .catch(err => console.log(err));
});

app.listen(port, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})