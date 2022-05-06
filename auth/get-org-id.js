'use strict';

const _ = require('lodash');
const ensureString = require('type/string/ensure');
const memoizee = require('memoizee');
const fetch = require('node-fetch');
const log = require('../log').log.get('auth');
const ServerlessError = require('../serverless-error');
const backendUrl = require('../lib/auth/urls').backend;
const resolveIdToken = require('./resolve-id-token');

module.exports = memoizee(
  async (name) => {
    name = ensureString(name, { name: 'name' });
    const response = await (async () => {
      try {
        return await fetch(`${backendUrl}/api/identity/orgs/name/${name}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${await resolveIdToken()}`,
          },
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
      log.debug('Canot resolve org', response.status);
      const responseText = await response.text();
      if (response.status < 500) throw new Error(`Console server error: ${responseText}`);
      throw new ServerlessError(
        'Console server is unavailable, please try again later',
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
          'Console server is not responding as expected, please try again later',
          'CONSOLE_ORG_ID_RETRIEVAL_UNEXPECTED_RESPONSE_TYPE'
        );
      }
    })();
    const orgId = _.get(responseObject, 'orgId');
    if (!orgId) {
      log.debug('Unexpected response value', responseObject);
      throw new ServerlessError(
        'Console server is not responding as expected, please try again later',
        'CONSOLE_ORG_ID_RETRIEVAL_INVALID_RESPONSE'
      );
    }
    return orgId;
  },
  { primitive: true, promise: true }
);
