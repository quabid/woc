import { Client } from './client/client.js';
import { log } from './custom_modules/Printer.js';

const myargs = process.argv;
const parsedMyargs = myargs.splice(2);
const options = {
  port: 5000,
  host: 'localhost',
  url: 'http://localhost',
  method: 'GET',
  path: '/',
};

const client = new Client();

try {
  client.makeRequest(options, null, data => {
    log(data);
  });
} catch (err) {
  log(err);
}

process.exit(0);
