import bunyan from 'bunyan';
import { client } from './client/client.js';
import { log } from './custom_modules/Printer.js';
import { stringify } from './custom_modules/ObjectUtils.js';

const logger = bunyan.createLogger({
  name: 'Index.js file',
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

const myargs = process.argv;
const parsedMyargs = myargs.splice(2);
const size = parsedMyargs.length;
const postOptions = {};
const getOptions = {};
const putOptions = {};
const deleteOptions = {};

switch (size) {
  case 4:
    logger.info(`Received ${size} arguments`);
    switch (parsedMyargs[3].toLowerCase()) {
      case 'post':
        createPostOptions(parsedMyargs);
        break;

      case 'put':
        createPutOptions(parsedMyargs);
        break;

      case 'delete':
        createDeleteOptions(parsedMyargs);
        break;

      case 'get':
        createGetOptions(parsedMyargs);
        break;
    }
    break;

  case 5:
    logger.info(`Received ${size} arguments`);
    switch (parsedMyargs[3].toLowerCase()) {
      case 'post':
        createPostOptions(parsedMyargs);
        break;

      case 'put':
        createPutOptions(parsedMyargs);
        break;

      case 'delete':
        createDeleteOptions(parsedMyargs);
        break;

      case 'get':
        createGetOptions(parsedMyargs);
        break;
    }
    break;

  case 6:
    logger.info(`Received ${size} arguments`);
    switch (parsedMyargs[3].toLowerCase()) {
      case 'post':
        createPostOptions(parsedMyargs);
        break;

      case 'put':
        createPutOptions(parsedMyargs);
        break;

      case 'delete':
        createDeleteOptions(parsedMyargs);
        break;

      case 'get':
        createGetOptions(parsedMyargs);
        break;
    }
    break;

  default:
    break;
}

function createPostOptions(args) {
  const strArgs = stringify(args);
  const postOptions = {};
  const body = args[4];
  const strBody = stringify(body);

  postOptions.hostname = args[0];
  postOptions.port = args[1];
  postOptions.path = args[2];
  postOptions.method = args[3];
  postOptions.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(body),
  };

  logger.info(
    `Method createPostOptions invoked with these arguments: ${strArgs}`
  );

  const Client = new client();

  Client.makeRequest(postOptions, strBody, (data) => {
    logger.info(`Data received from server: ${data}`);
  });
}

function createPutOptions(args) {
  const strArgs = stringify(args);
  logger.info(
    `Method createPutOptions invoked with these arguments: ${strArgs}`
  );
}

function createDeleteOptions(args) {
  const strArgs = stringify(args);
  logger.info(
    `Method createDeleteOptions invoked with these arguments: ${strArgs}`
  );
}

function createGetOptions(args) {
  const strArgs = stringify(args);
  logger.info(
    `Method createGetOptions invoked with these arguments: ${strArgs}`
  );
}
