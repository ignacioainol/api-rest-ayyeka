const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
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
    // const emptyToken = { "access_token": '' };
    // fs.writeFile('access_token.json', JSON.stringify(emptyToken), (err) => {
    //     if (err) throw err;
    //     console.log('Token Cleaned!');
    // });
    getToken().then(token => {
        console.log(`Token ${token}`);
        insertDataStream(token);
    })
});

// CREA EL INSERT A LA BASE DE DATOS
// schedule.scheduleJob("*/2 * * * *", () => {
//     insertDataStream();
// })

app.listen(port, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})