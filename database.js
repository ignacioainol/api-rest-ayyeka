require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ayyeka-db')
    .then(db => console.log('DB is connected'))
    .catch(console.log);