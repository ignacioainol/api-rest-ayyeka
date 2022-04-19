const express = require('express');
const axios = require('axios');
const { executeCommand } = require('../utils/functions');
const fetch = require('node-fetch');
const router = express.Router();

// router.get('/', async (req, res) => {
//     // const buff = new Buffer.from('E67A93A338214F0680313BEBAE936A2D:0ewTmt23j0TPfaHunhodLh0DLSTH7Fei72cD0x0y8YI=');
//     const mixKeys = 'E67A93A338214F0680313BEBAE936A2D:0ewTmt23j0TPfaHunhodLh0DLSTH7Fei72cD0x0y8YI=';
//     const base64data = mixKeys.toString('base64');

//     try {
//         const createToken = await axios.post('http://restapi.ayyeka.com/auth/token', {
//             headers: {
//                 'Authorization': `Basic ${base64data}`,
//                 'Cache-Control': 'no-cache',
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Postman-Token': 'b0ee4f16-ac32-4429-b1e1-c39ee4793444',
//                 'cache-control': 'no-cache'
//             },
//             data: JSON.stringify({ 'grant_type': 'client_credentials' })
//         });

//         const token = await createToken.data;

//         res.send(token);

//     } catch (error) {
//         console.log(error);
//         res.status(401).send(error);
//     }


//     // const response = await fetch('https://restapi.ayyeka.com/auth/token', {
//     //     method: 'POST',
//     //     headers: {
//     //         'Authorization': `Basic ${base64data}`,
//     //         'Cache-Control': 'no-cache',
//     //         'Content-Type': 'application/x-www-form-urlencoded',
//     //         'Postman-Token': 'b0ee4f16-ac32-4429-b1e1-c39ee4793444',
//     //         'cache-control': 'no-cache'
//     //     },
//     //     data: { 'grant_type': 'client_credentials' }
//     // });

//     // // const data = await response.json();

//     // res.send(response);
// })

router.get('/', async (req, res) => {
    await executeCommand();
    res.send('Token creado');
})

module.exports = router;
