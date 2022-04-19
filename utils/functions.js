const axios = require('axios');
const fs = require('fs');


const executeCommand = async () => {
    const { exec } = require("child_process");

    const args = " -X POST https://restapi.ayyeka.com/auth/token \
            -H 'Authorization: Basic RTY3QTkzQTMzODIxNEYwNjgwMzEzQkVCQUU5MzZBMkQ6MGV3VG10MjNqMFRQZmFIdW5ob2RMaDBETFNUSDdGZWk3MmNEMHgweThZST0=' \
            -H 'Cache-Control: no-cache' \
            -H 'Content-Type: application/x-www-form-urlencoded' \
            -H 'Postman-Token: b0ee4f16-ac32-4429-b1e1-c39ee4793444' \
            -H 'cache-control: no-cache' \
            -d 'grant_type=client_credentials'";

    const valueToken = exec('curl' + args, async function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        const token = await JSON.parse(stdout).access_token;
        fs.writeFile('access_token.json', stdout, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        console.log(token);
        return token;
    })

    return valueToken;
}

const getToken = async () => {
    const buff = new Buffer.from('E67A93A338214F0680313BEBAE936A2D:0ewTmt23j0TPfaHunhodLh0DLSTH7Fei72cD0x0y8YI=');
    const base64data = buff.toString('base64');

    console.log(base64data);

    const createToken = await axios({
        method: 'POST',
        url: 'https://restapi.ayyeka.com/auth/token',
        headers: {
            Authorization: `Basic ${base64data}`,
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Postman-Token': 'b0ee4f16-ac32-4429-b1e1-c39ee4793444',
            'cache-control': 'no-cache'
        },
        data: { 'grant_type': 'client_credentials' }
    });

    return createToken;
}

module.exports = {
    executeCommand,
    getToken
}