'use strict';

module.exports = {
  env: 'production',
  ip:   process.env.IP || '0.0.0.0',
  port: process.env.PORT || 2000,
  mongo: {
      uri: 'mongodb://192.68.0.133:27017/nodejs-employee'
  }
};