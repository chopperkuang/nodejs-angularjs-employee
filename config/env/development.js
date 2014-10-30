'use strict';

module.exports = {
  env: 'development',
    port: process.env.PORT || 2000,
  mongo: {
    uri: 'mongodb://192.168.0.133:27017/nodejs-employee'
  }
};