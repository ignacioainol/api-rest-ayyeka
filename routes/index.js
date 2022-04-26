const express = require('express');
const app = express();

app.use('/api/auth', require('./auth.routes'));
// app.use('/api/sites', require('./sites.routes'));
app.use('/api/streams', require('./streams.routes'));

module.exports = app;