import http from 'http';
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

class client {
  constructor() {
    logger.info(`Client class initialized`);
  }

  makeRequest(options, data = null, cb = null) {
    logger.info(`Method makeRequest invoked`);
    const optGood = options.hasOwnProperty('host') ? true : false;
    let buffer = '';

    if (!optGood) {
      logger.warn('Bad options argument');
      throw new Error('Options argument missing host property');
    }

    const req = http.request(options, res => {
      logger.info(`Invoked request method on http object`);

      res
        .on('data', data => {
          logger.info(`Receiving data from response object`);
          buffer += decoder.write(data);
        })
        .on('end', data => {
          logger.info('Request response ended');
          if (isMethod(cb)) {
            return cb({
              status: res.statusMessage,
              statusCode: res.statusCode,
              payload: buffer,
            });
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

    req.end(buffer, () => {
      logger.info(`Request ended ${buffer}`);
    });
  }

  toString() {
    return 'client';
  }
}

export const Client = client;
