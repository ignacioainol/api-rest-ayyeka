const axios = require('axios');
const express = require('express');
const router = express.Router();
const { access_token } = require('../access_token.json');
require('dotenv').config()

//Devuelve todos los sites. Cada site es un pozo
router.get('/', async (req, res) => {

    try {
        const url = `${process.env.AYYEKA_URI}/site`;

        const sites = await axios.get(url, {
            headers: { 'Authorization': access_token }
        })

        const response = await sites.data;
        res.send(response);
    } catch (error) {
        res.send(error.message);
    }

});


// Return all site's id
router.get('/ids', async (req, res) => {

    try {
        const { data: sites } = await axios.get(`${process.env.BASE_URL}/api/sites`);
        const allIds = sites.map(site => site.id);
        res.send(allIds);
    } catch (error) {
        res.send(error.message);
    }

})


module.exports = router;