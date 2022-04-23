const express = require('express');
const morgan = require('morgan');
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
// app.use(require('./routes'));

//  CREA TOKEN PARA PODER EXTRAER DATOS DE LA API DE AYYEKA
schedule.scheduleJob("*/1 * * * *", () => {
    getToken().then(data => {
        console.log(`Token ${data}`);
        insertDataStream();
    })
});

// CREA EL INSERT A LA BASE DE DATOS
// schedule.scheduleJob("*/2 * * * *", () => {
//     insertDataStream();
// })

app.listen(port, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})