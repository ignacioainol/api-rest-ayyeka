const express = require('express');
const app = express();
const morgan = require('morgan');
const puppeteer = require('puppeteer');
require('dotenv').config();

//config
const port = process.env.PORT || 3002;
const base_url = 'https://restapi.ayyeka.com/v2.0/';


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(require('./routes'));


app.listen(port, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})