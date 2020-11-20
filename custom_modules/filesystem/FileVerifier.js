import fs from 'fs';
import { cap } from '../Capper.js';
import { cls, error, log } from '../Printer.js';
import { generateToken, verifyToken } from '../JwtMaker.js';
import { isMethod } from '../index.js';

/** Verify file exists. The callback contains only an error parameter.
 * @param path: file path
 * @param asynchronous: boolean - true to use asynchronous. defaults false
 * @param cb: optional callback - will return a promise if no callback
 */
export const fileExists = (path, asynchronous = false, cb = null) => {
  if (asynchronous) {
    if (isMethod(cb)) {
      fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
          return cb({ status: false, cause: err.cause || err.message || err });
        }
        return cb({ status: true });
      });
    } else {
      return new Promise((resolve, reject) => {
        return fs.promises
          .access(path, fs.constants.F_OK)
          .then((results) => resolve(true))
          .catch((err) => reject(false));
      });
    }
  } else {
    if (isMethod(cb)) {
      cb(fs.existsSync(path));
    } else {
      return new Promise((resolve, reject) => {
        try {
          return resolve(fs.existsSync(path));
        } catch (error) {
          log(error.message);
          return reject(error.message);
        }
      });
    }
  }
};
