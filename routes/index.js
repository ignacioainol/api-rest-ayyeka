const express = require('express');
const app = express();

app.use('/api/pools', require('./pool.routes'));

module.exports = app;