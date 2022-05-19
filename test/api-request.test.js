'use strict';

const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const requireUncached = require('ncjsm/require-uncached');

const { expect } = chai;
chai.use(require('chai-as-promised'));

const log = require('../log').log.get('test');

let api;
describe('test/api-request.test.js', () => {
  let lastMethod;
  let lastRequestHeaders;
  let lastRequestBody;
  let authMode = 'user';
  beforeEach(() => {
    const responseHeaders = new Map([['content-type', 'application/json; charset=utf-8']]);
    api = requireUncached(() =>
      proxyquire('../api-request', {
        './auth/resolve-token': async () => 'token',
        './auth/resolve-mode': async () => authMode,
        'node-fetch': sinon
          .stub()
          .callsFake(async (url, { method, headers: requestHeaders, body } = { method: 'GET' }) => {
            log.debug('fetch request %s %o', url, method);
            lastMethod = method;
            lastRequestHeaders = requestHeaders;
            lastRequestBody = body;
            switch (method) {
              case 'GET':
                if (url.includes('/server-unavailable/')) {
                  throw new Error('Server error');
                }
                if (url.includes('/server-error/')) {
                  return {
                    status: 500,
                    headers: responseHeaders,
                    text: async () => 'Server Error',
                  };
                }
                if (url.includes('/programmer-error/')) {
                  return {
                    status: 400,
                    headers: responseHeaders,
                    text: async () => 'Programmer Error',
                  };
                }
                if (url.includes('/org-auth-error/')) {
                  return {
                    status: 401,
                    headers: responseHeaders,
                    text: async () => 'Org auth error',
                  };
                }
                if (url.includes('/user-auth-error/')) {
                  return {
                    status: 401,
                    headers: responseHeaders,
                    text: async () => 'User auth Error',
                  };
                }
                if (url.includes('/unexpected-response/')) {
                  return {
                    status: 200,
                    ok: true,
                    headers: responseHeaders,
                    json: async () => {
                      throw new Error('Parse Error');
                    },
                    text: async () => 'Unexpected response',
                  };
                }
                if (url.includes('/success/')) {
                  return {
                    status: 200,
                    ok: true,
                    headers: responseHeaders,
                    json: async () => ({ foo: 'bar' }),
                  };
                }
                break;
              case 'POST':
                if (url.includes('/submission/')) {
                  return {
                    status: 200,
                    ok: true,
                    headers: responseHeaders,
                    json: async () => ({ foo: 'bar' }),
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
    authMode = 'user';
  });

  it('should handle success response', async () => {
    expect(await api('/success/')).to.deep.equal({ foo: 'bar' });
    expect(lastMethod).to.equal('GET');
  });

  it('should handle post requests', async () => {
    expect(await api('/submission/', { method: 'POST', body: { foo: 'bar' } })).to.deep.equal({
      foo: 'bar',
    });
    expect(lastMethod).to.equal('POST');
    expect(lastRequestHeaders['Content-Type']).to.equal('application/json');
    expect(lastRequestBody).to.equal('{"foo":"bar"}');
  });

  it('should handle server unavailability', async () =>
    expect(api('/server-unavailable/')).to.eventually.be.rejected.and.have.property(
      'code',
      'CONSOLE_SERVER_UNAVAILABLE'
    ));

  it('should handle server error', async () =>
    expect(api('/server-error/')).to.eventually.be.rejected.and.have.property(
      'code',
      'CONSOLE_SERVER_REQUEST_FAILED'
    ));

  it('should handle programmer error', async () =>
    expect(api('/programmer-error/')).to.eventually.be.rejected.and.have.property(
      'code',
      'CONSOLE_SERVER_ERROR_400'
    ));

  it('should handle org auth error', async () => {
    authMode = 'org';
    await expect(api('/org-auth-error/')).to.eventually.be.rejected.and.have.property(
      'code',
      'CONSOLE_ORG_AUTH_REJECTED'
    );
  });

  it('should handle user auth error', async () =>
    expect(api('/user-auth-error/')).to.eventually.be.rejected.and.have.property(
      'code',
      'CONSOLE_USER_AUTH_REJECTED'
    ));
  it('should handle unexpected response', async () =>
    expect(api('/unexpected-response/')).to.eventually.be.rejectedWith('Unexpected response'));
});
