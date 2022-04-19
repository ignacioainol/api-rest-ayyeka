const axios = require('axios');
const express = require('express');
const router = express.Router();
const { access_token } = require('../access_token.json');
require('dotenv').config()

//
router.get('/getStreamBySiteId', async (req, res) => {

    try {
        const { data: idSites } = await axios.get(`${process.env.BASE_URL}/api/sites/ids`);

        const { data: streams } = await axios.get(`${process.env.AYYEKA_URI}/stream`, {
            headers: { 'Authorization': access_token }
        });

        // Almacena los stream segun el id del site (site es cada pozo)
        const streamsBySite = idSites.map(idSite => {
            const streamByIdSite = streams.filter(stream => {
                if (stream.site_id === idSite) {
                    if (stream.display_name === 'Level' || stream.display_name === 'Totalizer 1' || stream.display_name === 'Absolute Volumeflow') {
                        return stream;
                    }
                }
            });

            return streamByIdSite;
        });

        res.send(streamsBySite);
    } catch (error) {
        res.send(error.message);
    }

});



module.exports = router;