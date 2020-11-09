import https from 'https';
import bunyan from 'bunyan';
import url from 'url';
import { StringDecoder } from 'string_decoder';
import { isMethod, isString } from '../custom_modules/Utils.js';
import { stringify } from '../custom_modules/ObjectUtils.js';

const logger = bunyan.createLogger({
  name: 'Client Class Module',
  streams: [
    {
      level: 'info',
      stream: process.stdout, // log INFO and above to stdout
    },
    {
      level: 'error',
      stream: process.stderr,
      //   path: '/var/tmp/myapp-error.log', // log ERROR and above to a file
    },
    {
      level: 'warn',
      stream: process.stdout,
      //   path: '/var/tmp/myapp-error.log', // log ERROR and above to a file
    },
  ],
});
const decoder = new StringDecoder('utf-8');

class Client {
  constructor() {
    logger.info(`Client class instantiated`);
  }

  async makeRequest(options, body = null, cb = null) {
    logger.info(`Method makeRequest invoked`);

    const optGood = options.hasOwnProperty('hostname') ? true : false;
    let buffer = '';

    if (!optGood) {
      logger.warn('Bad options argument');
      throw new Error('Options argument missing host property');
    }

    const req = await https.request(options, res => {
      logger.info(`Invoked request method on http object`);

      res
        .on('data', data => {
          buffer += decoder.write(data);
          logger.info(`Receiving data from response object: ${buffer}`);
        })
        .on('end', () => {
          logger.info(`Requester response ended`);

          if (isMethod(cb)) {
            cb(
              stringify({
                status: res.statusMessage,
                statusCode: res.statusCode,
                payload: buffer,
              })
            );
          }
        })
        .on('error', err => {
          const errorMessage =
            // @ts-ignore
            err.response && err.response.data.message
              ? // @ts-ignore
                err.response.data.message
              : err.message;

          logger.error(`Error: ${errorMessage} `);
          return cb({ status: errorMessage });
        });
    });

    if (null != body && options.method.toLowerCase() !== 'get') {
      req.write(
        typeof body !== 'string' && body.length ? stringify(body) : body
      );
    }

    req.end(() => {
      logger.info(`Request ended: ${buffer}`);
    });
  }

  toString() {
    return 'client';
  }
}

export const client = Client;
// const Client = new client();

/* const body = stringify({
  'first name': 'rick',
  'last name': 'walker',
  email: 'rick@email.net',
});

const getOptions = {
    hostname: '127.0.0.1',
    port: 5000,
    path: '/',
    method: 'GET',
  },
  postOptions = {
    hostname: '127.0.0.1',
    port: 5000,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  }; */

/*
Client.makeRequest(postOptions, body, data => {
  console.log(`\n\n\n\tReceived from server: ${data}`);
}); //*/

/*
 Client.makeRequest(getOptions, body, data => {
  console.log(`\n\n\tReceived from server: ${data}`);
}); //*/
