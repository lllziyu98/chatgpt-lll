'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CUSTOM_CONFIG: {
    API_BASE_URL: '"/v1/rest"',
  }
})
