const mongoose = require('mongoose');

module.exports.connect = (uri, opts) => {
  mongoose.connect(uri, opts);
  mongoose.Promise = require('bluebird')

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  // require('./plant');
};
