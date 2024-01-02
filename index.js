const express = require('express');
const lt = require('localtunnel');

const app = express();

app.use((req, res) => {
    console.log(req.query);
    console.log(req.body);
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
    lt({
        port: 3000,
        allow_invalid_certs: true,
        subdomain: 'stripe',
    }).then((tunnel) => {
        console.log('tunnel: ', tunnel.url);

    });
});