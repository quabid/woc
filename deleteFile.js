import { log } from './custom_modules/index.js';
import { deleteFile } from './custom_modules/filesystem/FileDeleter.js';

/* deleteFile('./test_file.txt', true)
  .then((res) => log(`${res.status ? res.payload : res.cause}`))
  .catch((err) => log(`${err.message}`)); */

deleteFile('./test_file.txt', false)
  .then((res) => log(`${res.status ? res.payload : res.cause}`))
  .catch((err) => log(`${err}`));
