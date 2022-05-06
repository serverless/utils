'use strict';

const log = require('../log').log.get('auth');
const configUtils = require('../config');

module.exports = () => {
  if (!configUtils.get('auth.refreshToken')) {
    log.notice.skip('You are already logged out');
    return false;
  }
  configUtils.delete('auth');
  log.notice('Logging into the Serverless Console via the browser');

  log.notice.success('You are now logged out of the Serverless Console');
  return true;
};
