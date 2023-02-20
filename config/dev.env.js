'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CUSTOM_CONFIG: {
    BASE_URL: '"http://192.9.224.130:9939/chat"',
    API_BASE_URL: '"/chat"',
  }
});
