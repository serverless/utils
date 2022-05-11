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
  beforeEach(() => {
    api = requireUncached(() =>
      proxyquire('../api-request', {
        './auth/resolve-token': async () => 'token',
        './auth/resolve-mode': async () => 'user',
        'node-fetch': sinon.stub().callsFake(async (url, { method } = { method: 'GET' }) => {
          log.debug('fetch request %s %o', url, method);
          switch (method) {
            case 'GET':
              if (url.includes('/server-unavailable/')) {
                throw new Error('Server error');
              }
              if (url.includes('/server-error/')) {
                return {
                  status: 500,
                  text: async () => 'Server Error',
                };
              }
              if (url.includes('/programmer-error/')) {
                return {
                  status: 400,
                  text: async () => 'Programmer Error',
                };
              }
              if (url.includes('/unexpected-response/')) {
                return {
                  ok: true,
                  json: async () => {
                    throw new Error('Parse Error');
                  },
                  text: async () => 'Unexpected response',
                };
              }
              if (url.includes('/success/')) {
                return {
                  ok: true,
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

  it('should handle success response', async () => {
    expect(await api('/success/')).to.deep.equal({ foo: 'bar' });
  });

  it('should handle server unavailability', async () => {
    expect(api('/server-unavailable/')).to.eventually.be.rejected.and.have.property(
      'code',
      'CONSOLE_SERVER_UNAVAILABLE'
    );
  });

  it('should handle server error', async () => {
    expect(api('/server-error/')).to.eventually.be.rejected.and.have.property(
      'code',
      'CONSOLE_SERVER_REQUEST_FAILED'
    );
  });

  it('should handle programmer error', async () => {
    expect(api('/programmer-error/')).to.eventually.be.rejectedWith('Programmer Error');
  });

  it('should handle unexpected response', async () => {
    expect(api('/unexpected-response/')).to.eventually.be.rejectedWith('Unexpected response');
  });
});
