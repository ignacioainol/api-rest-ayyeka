const express = require('express');
const app = express();

app.use('/api/pools', require('./pool.routes.js'));
app.use('/api/auth', require('./auth.routes.js'));

module.exports = app;