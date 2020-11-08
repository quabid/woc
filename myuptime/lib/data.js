/* Library used for storing and editing data */

// Dependencies
const fs = require('fs');
const path = require('path');

const stringify = (obj = {}) => JSON.stringify(obj);
const table = console.table.bind(console);
const cls = console.clear.bind(console);
const log = console.log.bind(console);

// Container
const lib = {};
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = (dir, fileName, data, cb) => {
  // Open the file for writing
  fs.open(`${lib.baseDir}${dir}/${fileName}.json`, 'wx', (err, fd) => {
    if (!err && fd) {
      // Convert data to a string
      const stringData = stringify(data);

      // Write to file, then close it
      fs.writeFile(fd, stringData, err => {
        if (!err) {
          // Close file
          fs.close(fd, err => {
            if (!err) {
              cb(false);
            } else {
              cb('Error closing new file');
            }
          });
        } else {
          cb('Error writing to new file');
        }
      });
    } else {
      cb('Could not create new file, it may already exist');
    }
  });
};

// Export
module.exports = lib;
