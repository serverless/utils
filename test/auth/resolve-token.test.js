'use strict';

const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const requireUncached = require('ncjsm/require-uncached');

const { expect } = chai;
chai.use(require('chai-as-promised'));

const log = require('../../log').log.get('test');
const configUtils = require('../../config');

const activeIdToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTTFMiLCJpYXQiOjE2MTE3NDAzNTgsImV4cCI6MTk1ODgwOTE1OCwiYXVkIjoic2xzIiwic3ViIjoic2xzQHNscy5jb20ifQ.fy_DY4cWWADDREVYrSy3U5-p7cKT4evEOCjQtQJl9ww';
const expiredIdToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTTFMyIiwiaWF0IjoxNjExNzQwMzU4LCJleHAiOjE2MTE3NTAzNTgsImF1ZCI6InNscyIsInN1YiI6InNsc0BzbHMuY29tIn0.lHIztOZK5TaqVsNfc1BAA6whNU1E3ON5TxBpRlqpyuc';
let resolveIdToken;

describe('test/auth/resolve-token.test.js', () => {
  describe('regular', () => {
    beforeEach(() => {
      resolveIdToken = requireUncached(() =>
        proxyquire('../../auth/resolve-token', {
          'node-fetch': sinon
            .stub()
            .callsFake(async (url, { method, body } = { method: 'GET' }) => {
              log.debug('fetch request %s %o', url, method);
              switch (method) {
                case 'POST':
                  if (url.endsWith('/auth/tokens/refresh')) {
                    const bodyObject = JSON.parse(body);
                    return {
                      ok: true,
                      json: async () => ({
                        idToken: activeIdToken,
                        refreshToken: bodyObject.refreshToken,
                      }),
                    };
                  }
                  break;

                default:
              }
              throw new Error(`Unexpected request: ${url} method: ${method}`);
            }),
        })
      );
    });
    afterEach(() => {
      configUtils.delete('auth');
    });

    it('should resolve and store new token when no token stored', async () => {
      configUtils.set('auth', { refreshToken: 'refreshToken' });
      expect(await resolveIdToken()).to.equal(activeIdToken);
      expect(configUtils.get('auth.idToken')).to.equal(activeIdToken);
    });

    it('should return active token when stored', async () => {
      configUtils.set('auth', { refreshToken: 'refreshToken', idToken: activeIdToken });
      expect(await resolveIdToken()).to.equal(activeIdToken);
    });

    it('should resolve token when expired token stored', async () => {
      configUtils.set('auth', { refreshToken: 'refreshToken', idToken: expiredIdToken });
      expect(await resolveIdToken()).to.equal(activeIdToken);
      expect(configUtils.get('auth.idToken')).to.equal(activeIdToken);
    });

    it('should crash when not logged in', async () =>
      expect(resolveIdToken()).to.eventually.be.rejected.and.have.property(
        'code',
        'CONSOLE_LOGGED_OUT'
      ));
  });

  describe('CI/CD', () => {
    before(() => {
      process.env.SLS_ORG_TOKEN = 'foo';
      resolveIdToken = requireUncached(() => require('../../auth/resolve-token'));
    });

    after(() => {
      delete process.env.SLS_ORG_TOKEN;
    });

    it('should support non-expiring token provided via env variable', async () => {
      expect(await resolveIdToken()).to.equal('foo');
    });
  });
});
