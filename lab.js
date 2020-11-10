import { client } from './client/client.js';
import { log } from './custom_modules/Printer.js';
import { stringify } from './custom_modules/ObjectUtils.js';

const myargs = process.argv;
const parsedMyargs = myargs.splice(2);

const body = stringify({
  userId: '1333344444',
  title: 'deez nuts',
  'first name': 'rick',
  'last name': 'walker',
  email: 'rick@email.net',
});

const getOptions = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 443,
    path: '/todos',
    method: 'GET',
  },
  postOptions = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 443,
    path: '/users',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
    },
  };

const Client = new client();

Client.makeRequest(postOptions, body, (data) => {
  log(data);
});
