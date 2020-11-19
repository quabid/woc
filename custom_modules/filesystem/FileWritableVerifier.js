import fs from 'fs';
import { cap } from '../Capper.js';
import { cls, error, log } from '../Printer.js';
import { generateToken, verifyToken } from '../JwtMaker.js';
import { isMethod } from '../index.js';

/** Verify file is writable. The callback contains only an error parameter.
 *  Promise returns resolve true & reject false
 * @param path: file path
 * @param cb: optional callback - will return a promise if no callback
 */
export const fileWritable = (path, cb) => {
  if (!isMethod(cb)) {
    return new Promise((resolve, reject) => {
      return fs.access(path, fs.constants.W_OK, (err) => {
        return err ? reject(false) : resolve(true);
      });
    });
  } else {
    fs.access(path, fs.constants.W_OK, cb);
  }
};
