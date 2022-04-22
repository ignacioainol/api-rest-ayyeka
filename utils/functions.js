const fs = require('fs');

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
            resolve(token);
            fs.writeFile('access_token.json', stdout, (err) => {
                if (err) throw err;
                console.log('Token Saved!');
            });
        })
    })
}

module.exports = {
    getToken
}