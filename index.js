var Promise = require('bluebird');

module.exports = function(stream) {
  var result = new Promise(function(resolve,reject){
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
  result.once = function(ev) {
    return new Promise(function(resolve,reject){
      try {
        stream.once(ev,function(){
          resolve.apply(this,arguments);
        });
      } catch(error) {
        reject(error);
      }
    });
  };
  result.stream = Promise.promisifyAll(stream);
  return result;
};
