import fs from 'fs';
import { cap } from '../Capper.js';
import { cls, error, log } from '../Printer.js';
import { generateToken, verifyToken } from '../JwtMaker.js';
import { isMethod } from '../index.js';

export const readFile = (path, readSynchronously = true, cb) => {
  if (isMethod(cb)) {
    // Read synchronously
    if (readSynchronously) {
      try {
        const data = fs.readFileSync(path, 'utf8');
        // console.log(data);
        cb({ status: 'success', payload: data });
      } catch (e) {
        console.log('Error:', e.stack);
        cb({ status: 'failed', cause: e.cause || e.message });
      }
    } else {
      // Read asynchronously
      let data = '';
      const readStream = fs.createReadStream(path, 'utf8');

      readStream
        .on('data', (chunk) => {
          data += chunk;
        })
        .on('end', () => {
          cb({ status: 'success', payload: data });
        })
        .on('error', (err) => {
          cb({ status: 'failed', cause: err.cause || err.message });
        });
    }
  } else {
    if (readSynchronously) {
      return new Promise((resolve, reject) => {
        try {
          const data = fs.readFileSync(path, 'utf8');
          //   console.log(data);
          return resolve({ status: 'success', payload: data });
        } catch (err) {
          console.log(err.message);
          return reject({ status: 'failed', cause: err.cause || err.message });
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        // Read asynchronously
        let data = '';
        const readStream = fs.createReadStream(path, 'utf8');

        readStream
          .on('data', (chunk) => {
            data += chunk;
          })
          .on('end', () => {
            return resolve({ status: 'success', payload: data });
          })
          .on('error', (err) => {
            return reject({
              status: 'failed',
              cause: err.cause || err.message,
            });
          });
      });
    }
  }
};
