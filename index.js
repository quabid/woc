import { client } from './client/client.js';
import { log } from './custom_modules/Printer.js';
import { stringify } from './custom_modules/ObjectUtils.js';

const myargs = process.argv;
const parsedMyargs = myargs.splice(2);

const body = stringify({
  'first name': 'rick',
  'last name': 'walker',
  email: 'rick@email.net',
});

const getOptions = {
    hostname: 'www.yahoo.com',
    port: 443,
    path: '/index.html',
    method: 'GET',
  },
  postOptions = {
    hostname: 'yahoo.com',
    port: 5000,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  };

const Client = new client();

Client.makeRequest(getOptions, body, data => {
  log(data);
});
