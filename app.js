const express = require('express');
const app = express();
const morgan = require('morgan');
const puppeteer = require('puppeteer');
require('dotenv').config();

//config
const port = process.env.PORT || 3002;
const base_url = 'https://restapi.ayyeka.com/v2.0/';

app.listen(port, (req, res) => {
    console.log(`Server running on port ${process.env.PORT}`);
    res.send(`Server running on port ${process.env.PORT}`);
})