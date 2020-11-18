import fs from 'fs';
import { cap } from '../Capper.js';
import { cls, error, log } from '../Printer.js';
import { generateToken, verifyToken } from '../JwtMaker.js';
import { isMethod } from '../index.js';
import { stringify } from '../ObjectUtils.js';

/** Create file then write to it. The callback contains only an error parameter.
 * @param destination: where to create the file
 * @param content: what to write to the file
 * @param append: whether to append if file exists or not - defaults to false
 * @param cb: optional callback - will return a promise if no callback
 */
export const writeFile = (
  destination = './',
  filename,
  content,
  append = false,
  cb
) => {
  if (isMethod(cb)) {
    if (!append) {
      fs.writeFile(`${destination}${filename}`, content, cb);
    }
  } else {
    if (!append) {
      return new Promise((resolve, reject) => {
        try {
          fs.writeFile(`${destination}${filename}`, content, (err) => {
            if (err) {
              log(err);
              return reject({
                status: 'failed',
                cause: err.cause || err.message,
              });
            }
            return resolve({ status: 'success' });
          });
        } catch (err) {
          log(err);
          return reject({ status: 'failed', cause: err.cause || err.message });
        }
      });
    }
  }
};
