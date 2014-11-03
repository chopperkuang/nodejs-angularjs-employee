'use strict';

module.exports = {
  env: 'production',
  ip:   process.env.IP || '0.0.0.0',
  port: process.env.PORT || 2000,
  mongo: {
      uri: 'mongodb://kuang:123@ds047950.mongolab.com:47950/front-demo'
  }
};