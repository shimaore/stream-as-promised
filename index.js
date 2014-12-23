var Promise = require('bluebird');

module.exports = function(stream) {
  return new Promise(function(resolve,reject){
    try {
      /* Readable stream */
      stream.on('end',resolve);
      /* Writable stream */
      stream.on('finish',resolve);
      /* Any stream */
      stream.on('error',reject);
    } catch(error) {
      reject(error);
    }
  });
};
