'use strict';

const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const random = require('ext/string/random');
const log = require('../../log').log.get('test');
const configUtils = require('../../config');

describe('test/auth/login.test.js', () => {
  let refreshToken;
  let login;
  before(async () => {
    const sessionId = random();
    let expiresAt;
    let refreshInvocationRequests = 2;
    login = proxyquire('../../auth/login', {
      'open': () => {},
      'node-fetch': sinon.stub().callsFake(async (url, { method } = { method: 'GET' }) => {
        log.debug('fetch request %s %o', url, method);
        switch (method) {
          case 'POST':
            if (url.endsWith('/auth/login-sessions')) {
              expiresAt = new Date(Date.now() + 1000 * 60 * 10).toISOString();
              return {
                ok: true,
                json: async () => ({
                  sessionId,
                  status: 'PENDING',
                  expiresAt,
                }),
              };
            }
            break;
          case 'GET':
            if (url.endsWith(`/auth/login-sessions/${sessionId}`)) {
              if (--refreshInvocationRequests) {
                return {
                  ok: true,
                  json: async () => ({
                    sessionId,
                    status: 'PENDING',
                    expiresAt,
                  }),
                };
              }
              refreshToken = random();
              return {
                ok: true,
                json: async () => ({
                  sessionId,
                  status: 'SUCCESS',
                  refreshToken,
                }),
              };
            }
            break;
          default:
        }
        throw new Error(`Unexpected request: ${url} method: ${method}`);
      }),
    });
  });

  it('should login', async () => {
    await login();
    expect(configUtils.get('auth.refreshToken')).to.equal(refreshToken);
  });
});
