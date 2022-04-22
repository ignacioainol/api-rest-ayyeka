const express = require('express');
const { getToken } = require('../utils/functions');
const router = express.Router();

// Generate JWT to get data from Ayyeka
router.get('/', async (req, res) => {
    const token = await getToken();
    res.send(token);
});

module.exports = router;
