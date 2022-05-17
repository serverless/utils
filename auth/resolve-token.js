'use strict';

const _ = require('lodash');
const jwtDecode = require('jwt-decode');
const fetch = require('node-fetch');
const configUtils = require('../config');
const log = require('../log').log.get('auth');
const ServerlessError = require('../serverless-error');
const backendUrl = require('../lib/auth/urls').backend;
const logout = require('./logout');

// Assume single user session per process
const data = {};
let idTokenExpiresAt;

if (process.env.SLS_ORG_TOKEN) {
  data.idToken = process.env.SLS_ORG_TOKEN;
  idTokenExpiresAt = Infinity;
  log.debug('consume org token');
}

module.exports = async () => {
  if (!data.idToken) {
    Object.assign(data, configUtils.get('auth'));
    if (data.idToken) {
      const idTokenData = jwtDecode(data.idToken);
      log.debug('id token data: %o', idTokenData);
      idTokenExpiresAt = idTokenData.exp * 1000;
    }
  }
  if (data.idToken) {
    if (idTokenExpiresAt > Date.now() + 500) {
      log.debug('return valid token');
      return data.idToken;
    }
    log.debug('token expired');
    configUtils.delete('auth.idToken');
    idTokenExpiresAt = null;
  }
  if (!data.refreshToken) Object.assign(data, configUtils.get('auth'));
  if (!data.refreshToken) {
    throw new ServerlessError(
      'You are not currently logged in. To log in, use: $ serverless login',
      'CONSOLE_LOGGED_OUT'
    );
  }

  const response = await (async () => {
    try {
      return await fetch(`${backendUrl}/api/identity/auth/tokens/refresh`, {
        method: 'POST',
        body: JSON.stringify({ refreshToken: data.refreshToken }),
        headers: { 'Content-Type': 'application/json' },
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
    log.debug('Canot resolve idToken', response.status);
    const responseText = await response.text();
    if (response.status < 500) {
      logout();
      delete data.refreshToken;
      throw new Error(`Console server error: ${responseText}`);
    }
    throw new ServerlessError(
      'Cannot resolve Console authentication token, please try again later',
      'CONSOLE_SERVER_REQUEST_FAILED'
    );
  }
  const responseObject = await (async () => {
    try {
      return await response.json();
    } catch (error) {
      log.debug('Canot resolve response JSON', error);
      try {
        log.debug('Server response text', await response.text());
      } catch {
        /* ignore */
      }
      throw new ServerlessError(
        'Cannot resolve Console authentication token, please try again later',
        'CONSOLE_ID_TOKEN_RETRIEVAL_UNEXPECTED_RESPONSE_TYPE'
      );
    }
  })();
  const idToken = _.get(responseObject, 'idToken');
  if (!idToken || !responseObject.refreshToken) {
    log.debug('Unexpected response value', responseObject);
    throw new ServerlessError(
      'Cannot initialize login session due to unexpected server response, please try again later',
      'CONSOLE_ID_TOKEN_RETRIEVAL_INVALID_RESPONSE'
    );
  }
  data.idToken = idToken;
  const idTokenData = jwtDecode(data.idToken);
  log.debug('id token data: %o', idTokenData);
  idTokenExpiresAt = idTokenData.exp * 1000;
  configUtils.set({ auth: { idToken, refreshToken: responseObject.refreshToken } });
  return idToken;
};
