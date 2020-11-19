import fs from 'fs';
import { cap } from '../Capper.js';
import { cls, error, log } from '../Printer.js';
import { generateToken, verifyToken } from '../JwtMaker.js';
import { isMethod } from '../index.js';

/** Verify file is readable. The callback contains only an error parameter.
 *  Promise returns resolve true & reject false
 * @param path: file path
 * @param cb: optional callback - will return a promise if no callback
 */
export const fileReadable = (path, cb) => {
  if (!isMethod(cb)) {
    return new Promise((resolve, reject) => {
      return fs.access(path, fs.constants.R_OK, (err) => {
        return err ? reject(false) : resolve(true);
      });
    });
  } else {
    fs.access(path, fs.constants.R_OK, cb);
  }
};
