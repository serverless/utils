'use strict';

const ensureString = require('type/string/ensure');
const fetch = require('node-fetch');
const log = require('./log').log.get('auth');
const ServerlessError = require('./serverless-error');
const backendUrl = require('./lib/auth/urls').backend;
const resolveAuthToken = require('./auth/resolve-token');
const resolveAuthMethod = require('./auth/resolve-mode');

module.exports = async (pathname) => {
  pathname = ensureString(pathname, { name: 'pathname' });
  const authMethod = await resolveAuthMethod();
  if (!authMethod) throw new Error('Not authenticated to send request to the Console server');
  const response = await (async () => {
    try {
      const headers = { Authorization: `Bearer ${await resolveAuthToken()}` };
      if (authMethod === 'org') headers['sls-token-type'] = 'orgToken';
      return await fetch(`${backendUrl}/api/identity${pathname}`, {
        method: 'GET',
        headers,
      });
    } catch (error) {
      log.debug('Server unavailable', error);
      throw new ServerlessError(
        'Console server is not avaiable, please try again later',
        'CONSOLE_SERVER_UNAVAILABLE'
      );
    }
  })();
  if (!response.ok) {
    const responseText = await response.text();
    if (response.status < 500) {
      throw new Error(`Console server error: [${response.status}] ${responseText}`);
    }
    log.debug('Console server error %d %s', response.status, responseText);
    throw new ServerlessError(
      'Console server is unavailable, please try again later',
      'CONSOLE_SERVER_REQUEST_FAILED'
    );
  }
  try {
    return await response.json();
  } catch (error) {
    const responseText = await response.text();
    log.debug('Canot resolve response JSON', error);
    throw new Error(`Console server error: received unexpected response: ${responseText}`);
  }
};
