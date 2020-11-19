import fs from 'fs';
import { cap } from '../Capper.js';
import { cls, error, log } from '../Printer.js';
import { generateToken, verifyToken } from '../JwtMaker.js';
import { isMethod } from '../index.js';

/** Unlink file. Callback returns error object.
 * @param path: file path
 * @param deleteSynchronously: boolean - true to use synchronous. defaults false
 * @param cb: optional callback
 */
export const deleteFile = (path, deleteSynchronously = false, cb) => {
  if (isMethod(cb)) {
    if (!deleteSynchronously) {
      try {
        fs.unlinkSync(path, cb);
      } catch (err) {
        cb({ status: false, cause: err.cause || err.message });
      }
    } else {
      fs.unlink(path, cb);
    }
  } else {
    if (!deleteSynchronously) {
      return new Promise((resolve, reject) => {
        try {
          fs.unlinkSync(path, (err) => {
            if (err) {
              return reject({
                status: false,
                cause: err.cause || err.message,
              });
            }
            return resolve({ status: true });
          });
        } catch (error) {
          log(`Error: ${error.message}`);
          return reject({
            status: false,
            cause: error.cause || error.message,
          });
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
          if (err) {
            log(`Error: ${err.message}`);
            return reject({
              status: false,
              cause: err.cause || err.message,
            });
          }
          return resolve({ status: true });
        });
      });
    }
  }
};
