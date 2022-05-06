'use strict';

const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const requireUncached = require('ncjsm/require-uncached');

const { expect } = chai;
chai.use(require('chai-as-promised'));

const log = require('../../log').log.get('test');

let getOrgId;
describe('test/auth/get-org-id.test.js', () => {
  beforeEach(() => {
    getOrgId = requireUncached(() =>
      proxyquire('../../auth/get-org-id', {
        './resolve-id-token': async () => 'token',
        'node-fetch': sinon.stub().callsFake(async (url, { method } = { method: 'GET' }) => {
          log.debug('fetch request %s %o', url, method);
          switch (method) {
            case 'GET':
              if (url.includes('identity/orgs/name/')) {
                return {
                  ok: true,
                  json: async () => ({
                    orgId: `orgId4${url.split('/').pop()}`,
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

  it('should resolve orgId', async () => {
    expect(await getOrgId('foo')).to.equal('orgId4foo');
  });
});
