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

//cron 
schedule.scheduleJob("*/1 * * * *", () => {
    getToken();
});

schedule.scheduleJob("*/3 * * * *", () => {
    insertDataStream();
})

app.listen(port, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})