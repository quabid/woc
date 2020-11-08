require('dotenv').config();
const http = require('http');
const {
    log,
    table
} = require('../custom_modules/log');

const status = (msg = '') => {
    log(msg);
};

module.exports = (options = {
    port: process.env.PORT,
    name: process.env.NAME,
    address: process.env.ADDRESS
}) => { 
    const server = http.createServer((req, res) => {
        require('../routers/public/index')(req, res);
    });

    server.listen(options.port, () => {
        status(`\n\tServer listening on port ${options.port}\n`);
    });
};