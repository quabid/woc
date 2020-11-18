import fs from 'fs';
import { cap } from '../Capper.js';
import { cls, error, log } from '../Printer.js';
import { generateToken, verifyToken } from '../JwtMaker.js';
import { isMethod } from '../index.js';

/* export const fileExists = (path, asynchronous = false) =>
  asynchronous
    ? fs.access(path, fs.constants.F_OK, (err) => (err ? false : true))
    : fs.existsSync(path); */

export const fileExists = (path, asynchronous = false, cb = null) => {
  if (asynchronous) {
    if (isMethod(cb)) {
      fs.access(path, fs.constants.F_OK, cb);
    } else {
      return new Promise((resolve, reject) => {
        return fs.access(path, fs.constants.F_OK, (err) => {
          if (err) {
            return reject(false);
          }

          return resolve(true);
        });
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
