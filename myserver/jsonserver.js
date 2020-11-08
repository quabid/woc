import dotenv from 'dotenv';
import http from 'http';
import bunyan from 'bunyan';
import url from 'url';
import colors from 'colors';
import { customAlphabet } from 'nanoid';
import str_dec, { StringDecoder } from 'string_decoder';
import { log, cls } from '../custom_modules/Printer.js';

dotenv.config();

const logger = bunyan.createLogger({
  name: 'JSON Server Module',
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
const PORT = process.env.SERVER_PORT || 5000;
const stringDecoder = str_dec.StringDecoder;
const nanoid = customAlphabet('02468ouqtyminv*^#%`~[;>|\\', 13);

// All server logic for both http and https
const unifiedServer = (req, res) => {
  res.setHeader('Cache-Control', 'no-cache,no-store,max-age=0,must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '-1');
  res.setHeader('X-XSS-Protection', '1;mode=block');
  res.setHeader('keep-alive', '-1');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Content-Security-Policy', "script-src 'self'");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('x-powered-by', 'Deez Nuts');
  res.setHeader('ETag', `${nanoid()}`);

  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path from the URL
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryString = parsedUrl.query;

  // Get HTTP method
  const method = req.method.toLowerCase();

  // Get the Headers as an object
  const headers = req.headers;

  // Get existing payloads
  const decoder = new stringDecoder('utf-8');
  let buffer = '';

  req
    .on('data', function (data) {
      buffer += decoder.write(data);
      log(`Buffer received: ${buffer}`);
    })
    .on('end', () => {
      buffer += decoder.end();

      // Constructor the data object to send to the handler
      const data = {
        trimmedPath: trimmedPath,
        queryString: queryString,
        method: method,
        headers: headers,
        payload: buffer,
      };

      const strPayload = JSON.stringify(data);

      // res.write(strPayload);
      res.end(strPayload, () => {
        logger.info(`Server response ended`);
      });
    });
};

const status = (msg = '') => log.log(msg);

const server = http.createServer((req, res) => {
  unifiedServer(req, res);
});

server.listen(PORT, () => {
  cls();
  log(`\n\tServer listening on port ${PORT}\n`.toUpperCase().green.bold);
});
