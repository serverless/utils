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
const fetch = require('./fetch')
const fs = require('./fs')
const ip = require('./ip')
const lang = require('./lang')
const path = require('./path')
const resolve = require('./resolve')

module.exports = {
  ...common,
  ...config,
  ...data,
  ...error,
  ...fetch,
  ...fs,
  ...ip,
  ...lang,
  ...path,
  ...resolve
}
