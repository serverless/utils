// eslint-disable-next-line no-underscore-dangle
if (!global._babelPolyfill) {
  // eslint-disable-next-line global-require
  require('babel-polyfill')
}
// eslint-disable-next-line global-require
// require('source-map-support/register')

const common = require('./common')
const config = require('./config')
const data = require('./data')
const error = require('./error')
const fs = require('./fs')
const lang = require('./lang')
const path = require('./path')

module.exports = {
  ...common,
  ...config,
  ...data,
  ...error,
  ...fs,
  ...lang,
  ...path
}
