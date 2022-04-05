const axios = require('axios');
const express = require('express');
const router = express.Router();
const { access_token } = require('../access_token.json');
const Sample = require('../models/Sample');
const streamsData = require('../utils/streamsData');
require('dotenv').config()

//
router.get('/getStreamBySiteId', async (req, res) => {

    const getSampleByStream = async (idStream) => {
        const { data } = await axios.get(`${process.env.AYYEKA_URI}/stream/${idStream}/sample/last`);
        return data.value;
    }

    try {
        const { data: infoSites } = await axios.get(`${process.env.BASE_URL}/api/sites/`);

        const { data: streams } = await axios.get(`${process.env.AYYEKA_URI}/stream`, {
            headers: { 'Authorization': access_token }
        });

        const streamsBySite = infoSites.map(infoSite => {
            const streamByIdSite = streams.filter((stream) => {
                if (stream.site_id === infoSite.siteId) {
                    if (stream.display_name === 'Level' || stream.display_name === 'Totalizer 1' || stream.display_name === 'Absolute Volumeflow') {
                        delete stream.creation_date;
                        delete stream.status_id;
                        delete stream.type_id;
                        delete stream.value_scale;
                        delete stream.type_display_name;
                        delete stream.units;
                        delete stream.siteName;
                        stream.siteName = infoSite.siteName
                        // stream.sampleValue = data.value;
                        return stream;
                    }
                }
            });
            return streamByIdSite;
        });

        console.log(streamsBySite);
        res.send(streamsBySite);
    } catch (error) {
        res.send(error.message);
    }

});

router.get('/prepareInsert', async (req, res) => {

    try {
        let siteDataToSave = {};
        for (let i = 0; i < streamsData.length; i++) {
            const siteId = streamsData[i][0].site_id;
            const namePool = streamsData[i][0].siteName;

            siteDataToSave.siteId = siteId;
            siteDataToSave.namePool = namePool;

            for (let y = 0; y < streamsData[i].length; y++) {
                const streamId = streamsData[i][y].id;
                const valueSample = await axios.get(`${process.env.AYYEKA_URI}/stream/${streamId}/sample/last`, {
                    headers: { Authorization: access_token }
                });
                streamsData[i][y].sampleValue = valueSample.data.value;
            }

            // console.log(streamsData[0][0].sampleValue);
            siteDataToSave.absoluteVolumenflow = streamsData[i][0].sampleValue;
            siteDataToSave.totalizer1 = streamsData[i][1].sampleValue;
            siteDataToSave.level = streamsData[i][2].sampleValue;
            siteDataToSave.createAt = Date.now();

            const newSample = new Sample(siteDataToSave);
            await newSample.save();
        }




        res.send(streamsData);

    } catch (error) {
        res.send(error.message)
    }
})



module.exports = router;