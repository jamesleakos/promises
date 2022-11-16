/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

const fs = require('fs');
const Promise = require('bluebird');
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  return Promise.all(
    filePaths.map((filePath) => {
      return readFile(filePath, 'utf8');
    })
  )
    .then((files) => {
      var str = '';
      for (let i = 0; i < files.length; i++) {
        str += files[i].split('\n')[0] + ((i < files.length - 1) ? '\n' : '');
      }
      return writeFile(writePath, str);
    });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};