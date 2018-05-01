// eslint-disable-next-line no-underscore-dangle
if (!global._babelPolyfill) {
  // eslint-disable-next-line global-require
  require('babel-polyfill')
}
// eslint-disable-next-line global-require
require('source-map-support/register')

const config = require('./config')
const data = require('./data')
const fs = require('./fs')

module.exports = {
  ...config,
  ...data,
  ...fs
}
