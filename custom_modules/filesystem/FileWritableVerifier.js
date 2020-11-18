import fs from 'fs';
import { cap } from '../Capper.js';
import { cls, error, log } from '../Printer.js';
import { generateToken, verifyToken } from '../JwtMaker.js';
import { isMethod } from '../index.js';

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
