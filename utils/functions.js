const fs = require('fs');
const axios = require('axios');
const streamsData = require('../utils/streamsData');
// const { access_token } = require('../access_token.json');
const Sample = require('../models/Sample');

const getToken = () => {
    const { exec } = require("child_process");

    return new Promise((resolve, reject) => {
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

            const token = JSON.parse(stdout).access_token;
            if (token !== undefined) {
                resolve(token);
            } else {
                reject('Token is undefined');
            }
        })
    })
}

const insertDataStream = async (token) => {
    let siteDataToSave = {};
    for (let i = 0; i < streamsData.length; i++) {
        const siteId = streamsData[i][0].site_id;
        const namePool = streamsData[i][0].siteName;

        siteDataToSave.siteId = siteId;
        siteDataToSave.codigoObra = streamsData[i][0].codigo_obra;
        siteDataToSave.namePool = namePool;

        for (let y = 0; y < streamsData[i].length; y++) {
            const streamId = streamsData[i][y].id;
            const valueSample = await axios.get(`${process.env.AYYEKA_URI}/stream/${streamId}/sample/last`, {
                headers: { Authorization: token }
            });
            streamsData[i][y].sampleValue = valueSample.data.value;
        }

        const absoluteVolumenflowFormated = Math.trunc(streamsData[i][0].sampleValue).toString().length > 4 ?
                                             (Number(streamsData[i][0].sampleValue) / 1000).toFixed(2) 
                                             : Number(streamsData[i][0].sampleValue).toFixed(2);
        const totalizerFormated           = Math.trunc(streamsData[i][1].sampleValue);
        const levelFormated               = Number(streamsData[i][2].sampleValue).toFixed(2);

        //const volumenFlow = Math.trunc(streamsData[i][0].sampleValue); //volumenFlow.toString().length + " valor stringify";
        siteDataToSave.absoluteVolumenflow = absoluteVolumenflowFormated; 
        siteDataToSave.totalizer1 = totalizerFormated;
        siteDataToSave.level = levelFormated;
        siteDataToSave.createdAt = Date(new Date());

        const newSample = new Sample(siteDataToSave);
        await newSample.save();
        console.log("Inserted Sample!")
    }
}

module.exports = {
    getToken,
    insertDataStream
}
