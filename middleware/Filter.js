import colors from 'colors';
import bunyan from 'bunyan';
import { log } from '../custom_modules/Printer.js';
import { stringify } from '../custom_modules/ObjectUtils.js';

const logger = bunyan.createLogger({
  name: 'Filter Module',
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

export const filterHeaders = (response) => {
  logger.info(`filterHeaders method invoked`);
  return Array.isArray(response.headers)
    ? response.headers
    : (() => {
        const headers = [];
        for (let h in response.headers) {
          const objH = response.headers[h];
          headers.push({ h: objH });
        }
        return headers;
      })();
};
