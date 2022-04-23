const fs = require('fs');
const axios = require('axios');
const streamsData = require('../utils/streamsData');
// const { access_token } = require('../access_token.json');
const Sample = require('../models/Sample');

const getToken = () => {
    const { exec } = require("child_process");

    return new Promise((resolve) => {
        const args = " -X POST https://restapi.ayyeka.com/auth/token \
        -H 'Authorization: Basic RTY3QTkzQTMzODIxNEYwNjgwMzEzQkVCQUU5MzZBMkQ6MGV3VG10MjNqMFRQZmFIdW5ob2RMaDBETFNUSDdGZWk3MmNEMHgweThZST0=' \
        -H 'Cache-Control: no-cache' \
        -H 'Content-Type: application/x-www-form-urlencoded' \
        -H 'Postman-Token: b0ee4f16-ac32-4429-b1e1-c39ee4793444' \
        -H 'cache-control: no-cache' \
        -d 'grant_type=client_credentials'";

        exec('curl' + args, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            fs.writeFile('access_token.json', stdout, (err) => {
                if (err) throw err;
                console.log('Token Saved!');
            });
            const token = JSON.parse(stdout).access_token;
            resolve(token);
        })
    })
}

const insertDataStream = async (token) => {
    let siteDataToSave = {};
    for (let i = 0; i < streamsData.length; i++) {
        const siteId = streamsData[i][0].site_id;
        const namePool = streamsData[i][0].siteName;

        siteDataToSave.siteId = siteId;
        siteDataToSave.namePool = namePool;

        for (let y = 0; y < streamsData[i].length; y++) {
            const streamId = streamsData[i][y].id;
            const valueSample = await axios.get(`${process.env.AYYEKA_URI}/stream/${streamId}/sample/last`, {
                headers: { Authorization: token }
            });
            streamsData[i][y].sampleValue = valueSample.data.value;
        }

        // console.log(streamsData[0][0].sampleValue);
        siteDataToSave.absoluteVolumenflow = streamsData[i][0].sampleValue;
        siteDataToSave.totalizer1 = streamsData[i][1].sampleValue;
        siteDataToSave.level = streamsData[i][2].sampleValue;
        siteDataToSave.createdAt = new Date().toISOString()

        const newSample = new Sample(siteDataToSave);
        await newSample.save();
        console.log("Inserted Sample!")
    }
}

module.exports = {
    getToken,
    insertDataStream
}