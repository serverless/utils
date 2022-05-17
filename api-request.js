'use strict';

const ensureString = require('type/string/ensure');
const isObject = require('type/object/is');
const ensurePlainObject = require('type/plain-object/ensure');
const fetch = require('node-fetch');
const log = require('./log').log.get('auth');
const ServerlessError = require('./serverless-error');
const backendUrl = require('./lib/auth/urls').backend;
const resolveAuthToken = require('./auth/resolve-token');
const resolveAuthMethod = require('./auth/resolve-mode');

module.exports = async (pathname, options = {}) => {
  pathname = ensureString(pathname, { name: 'pathname' });
  if (!isObject(options)) options = {};
  const method = ensureString(options.method, { name: 'options.method', default: 'GET' });
  const body = ensurePlainObject(options.body, { name: 'options.body', isOptional: true });
  const authMethod = await resolveAuthMethod();
  if (!authMethod) throw new Error('Not authenticated to send request to the Console server');
  const response = await (async () => {
    const url = `${backendUrl}${pathname}`;
    const headers = {
      'Authorization': `Bearer ${await resolveAuthToken()}`,
      'Content-Type': 'application/json',
    };
    if (authMethod === 'org') headers['sls-token-type'] = 'orgToken';
    const fetchOptions = {
      method,
      headers,
    };
    if (body) fetchOptions.body = JSON.stringify(body);
    log.debug('request: %s, options: %o', url, fetchOptions);
    try {
      return await fetch(url, fetchOptions);
    } catch (error) {
      log.debug('Server unavailable', error);
      throw new ServerlessError(
        'Console server is not avaiable, please try again later',
        'CONSOLE_SERVER_UNAVAILABLE'
      );
    }
  })();
  log.debug('response: %d, headers: %o', response.status, response.headers);
  if (!response.ok) {
    const responseText = await response.text();
    if (response.status < 500) {
      throw Object.assign(new Error(`Console server error: [${response.status}] ${responseText}`), {
        code: `CONSOLE_SERVER_ERROR_${response.status}`,
      });
    }
    log.debug('Console server error %d %s', response.status, responseText);
    throw new ServerlessError(
      'Console server is unavailable, please try again later',
      'CONSOLE_SERVER_REQUEST_FAILED'
    );
  }
  if ((response.headers.get('content-type') || '').includes('application/json')) {
    const responseData = await (async () => {
      try {
        return await response.json();
      } catch (error) {
        const responseText = await response.text();
        log.debug('Canot resolve response JSON', error);
        throw new Error(`Console server error: received unexpected response: ${responseText}`);
      }
    })();
    log.debug('response: %o', responseData);
    return responseData;
  }
  return await response.text();
};
