import fs from 'fs';
import { cap } from '../Capper.js';
import { cls, error, log } from '../Printer.js';
import { generateToken, verifyToken } from '../JwtMaker.js';
import { isMethod } from '../index.js';

export const retrieveFileStats = (path, asynchronous = true, cb) => {
  if (isMethod(cb)) {
    if (asynchronous) {
      // Getting information for a file
      fs.stat(path, (error, stats) => {
        if (error) {
          log(error.message);
          return cb({ status: false, cause: error.cause || error.message });
        } else {
          return cb({
            status: true,
            payload: Object.assign(
              {},
              {
                isFIFO: stats.isFIFO(),
                isCharacterDevice: stats.isCharacterDevice(),
                isBlockDevice: stats.isBlockDevice(),
                isSymbolicLink: stats.isSymbolicLink(),
                isSocket: stats.isSymbolicLink(),
                isFile: stats.isFile(),
                isDirectory: stats.isDirectory(),
                ...stats,
              }
            ),
          });
        }
      });
    } else {
      // Getting information for a file
      try {
        const stat = fs.statSync(path);
        cb({
          status: true,
          payload: Object.assign(
            {},
            {
              isFIFO: stats.isFIFO(),
              isCharacterDevice: stats.isCharacterDevice(),
              isBlockDevice: stats.isBlockDevice(),
              isSymbolicLink: stats.isSymbolicLink(),
              isSocket: stats.isSymbolicLink(),
              isFile: stats.isFile(),
              isDirectory: stats.isDirectory(),
              ...stats,
            }
          ),
        });
      } catch (err) {
        cb({ status: false, cause: err.cause || err.message });
      }
    }
  } else {
    if (asynchronous) {
      return new Promise((resolve, reject) => {
        // Getting information for a file
        fs.stat(path, (error, stats) => {
          if (error) {
            log(error.message);
            return reject({
              status: false,
              cause: error.cause || error.message,
            });
          } else {
            return resolve({
              status: true,
              payload: Object.assign(
                {},
                {
                  isFIFO: stats.isFIFO(),
                  isCharacterDevice: stats.isCharacterDevice(),
                  isBlockDevice: stats.isBlockDevice(),
                  isSymbolicLink: stats.isSymbolicLink(),
                  isSocket: stats.isSymbolicLink(),
                  isFile: stats.isFile(),
                  isDirectory: stats.isDirectory(),
                  ...stats,
                }
              ),
            });
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        try {
          const stat = fs.statSync(path);
          return resolve({
            status: true,
            payload: Object.assign(
              {},
              {
                isFIFO: stats.isFIFO(),
                isCharacterDevice: stats.isCharacterDevice(),
                isBlockDevice: stats.isBlockDevice(),
                isSymbolicLink: stats.isSymbolicLink(),
                isSocket: stats.isSymbolicLink(),
                isFile: stats.isFile(),
                isDirectory: stats.isDirectory(),
                ...stats,
              }
            ),
          });
        } catch (err) {
          log(err.message);
          return reject({ status: false, cause: err.cause || err.message });
        }
      });
    }
  }
};
