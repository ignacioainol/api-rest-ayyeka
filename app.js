const express = require('express');
const app = express();
require('./database');
const morgan = require('morgan');
const { getToken } = require('./utils/functions');
require('dotenv').config();

//config
const port = process.env.PORT || 3002;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(require('./routes'));


app.listen(port, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})