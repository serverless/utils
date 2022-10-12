'use strict';

const ensureString = require('type/string/ensure');
const isObject = require('type/object/is');
const ensurePlainObject = require('type/plain-object/ensure');
const fetch = require('node-fetch');
const log = require('./log').log.get('api');
const ServerlessError = require('./serverless-error');
const urls = require('./lib/auth/urls');
const resolveAuthToken = require('./auth/resolve-token');
const resolveAuthMethod = require('./auth/resolve-mode');

let requestIdCounter = 0;

module.exports = async (pathname, options = {}) => {
  pathname = ensureString(pathname, { name: 'pathname' });
  if (!isObject(options)) options = {};
  const method = ensureString(options.method, { name: 'options.method', default: 'GET' });
  const body = ensurePlainObject(options.body, { name: 'options.body', isOptional: true });
  const authMethod = await resolveAuthMethod();
  if (!authMethod) throw new Error('Not authenticated to send request to the Console server');
  const requestId = ++requestIdCounter;
  const response = await (async () => {
    const url = `${urls[options.urlName] || urls.backend}${pathname}`;
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
    log.debug('[%d] %s, options: %o', requestId, url, fetchOptions);
    try {
      return await fetch(url, fetchOptions);
    } catch (error) {
      log.debug('Server unavailable', error);
      throw new ServerlessError(
        'Console server is not available, please try again later',
        'CONSOLE_SERVER_UNAVAILABLE'
      );
    }
  })();
  log.debug('[%d] %d, %o', requestId, response.status, response.headers);
  if (!response.ok) {
    const responseText = await response.text();
    log.debug('[%d] %s', requestId, responseText);
    if (response.status < 500) {
      if (response.status === 401) {
        if (authMethod === 'org') {
          throw Object.assign(
            new ServerlessError(
              'Unauthorized request: Either org token is invalid, ' +
                'or org token is not supported for this command ' +
                '(run the command as logged-in user instead)',
              'CONSOLE_ORG_AUTH_REJECTED'
            ),
            { httpStatusCode: 401 }
          );
        }
        throw Object.assign(
          new ServerlessError(
            'Unauthorized request: Run "sls login --console" to authenticate',
            'CONSOLE_USER_AUTH_REJECTED'
          ),
          { httpStatusCode: 401 }
        );
      }
      throw Object.assign(new Error(`Console server error: [${response.status}] ${responseText}`), {
        code: `CONSOLE_SERVER_ERROR_${response.status}`,
        httpStatusCode: response.status,
      });
    }
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
        log.debug('[%d] %s', requestId, responseText);
        throw new Error(`Console server error: received unexpected response: ${responseText}`);
      }
    })();
    log.debug('[%d] %o', requestId, responseData);
    return responseData;
  }
  return await response.text();
};
