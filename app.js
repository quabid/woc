import {
  fileReadable,
  fileExists,
  fileWritable,
  readFile,
} from './custom_modules/filesystem/index.js';
import { log } from './custom_modules/Printer.js';

/* fileExists('./myserver/cerct.pem', false, null)
  .then((res) => log(res))
  .catch((err) => log(err));

fileExists('./myserver/cert.pem', false, null)
  .then((res) => log(res))
  .catch((err) => log(err));

fileExists('./myserver/cerct.pem', false, (results) => log(results));

fileExists('./myserver/cert.pem', false, (results) => log(results));

fileExists('./myserver/cert.pem', true, null)
  .then((res) => log(res))
  .catch((err) => log(err));

fileWritable('./myserver/cert.pem', (err) => log(err ? false : true));

fileReadable('./myserver/cert.pem', (err) => log(err ? false : true));

fileReadable('./myserver/cert.pem')
  .then((data) => log(data))
  .catch((err) => log(err)); */

readFile('./myserver/cert.pem', true, (data) => {
  data.status === 'success'
    ? log(`Success\n\t${data.payload}`)
    : log(`Failed: ${data.cause}`);
});

readFile('./myserver/cert.pem', false, (data) => {
  data.status === 'success'
    ? log(`Success\n\t${data.payload}`)
    : log(`Failed: ${data.cause}`);
});

readFile('./myserver/cert.pem', true)
  .then((data) =>
    data.status === 'success'
      ? log(`Success: \n\t${data.payload}`)
      : log(`Failed: ${data.cause}`)
  )
  .catch((err) => log(`Error: ${err.cause}`));

readFile('./myserver/cert.pem', false)
  .then((data) =>
    data.status === 'success'
      ? log(`Success: \n\t${data.payload}`)
      : log(`Failed: ${data.cause}`)
  )
  .catch((err) => log(`Error: ${err.cause}`));
