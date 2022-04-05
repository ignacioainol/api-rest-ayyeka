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

        const { data } = await sites;

        const dataSites = data.map(site => {
            return {
                siteId: site.id,
                siteName: site.display_name.substring(site.display_name.indexOf(' ') + 1)
            }
        })
        res.send(dataSites);
    } catch (error) {
        res.send(error.message);
    }

});


module.exports = router;