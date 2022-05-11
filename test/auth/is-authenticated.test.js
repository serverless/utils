'use strict';

const chai = require('chai');
const proxyquire = require('proxyquire');
const requireUncached = require('ncjsm/require-uncached');
const ServerlessError = require('../../serverless-error');

const { expect } = chai;
chai.use(require('chai-as-promised'));

let isAutenticated;
describe('test/auth/is-authenticated.test.js', () => {
  let resolveAuthenticationToken;
  beforeEach(() => {
    isAutenticated = requireUncached(() =>
      proxyquire('../../auth/is-authenticated', {
        './resolve-token': async () => resolveAuthenticationToken(),
      })
    );
  });

  it('should return true, when id token provided', async () => {
    resolveAuthenticationToken = () => 'token';
    expect(await isAutenticated()).to.be.true;
  });

  it('should return false, when logged out', async () => {
    resolveAuthenticationToken = () => {
      throw new ServerlessError('Not logged in', 'CONSOLE_LOGGED_OUT');
    };
    expect(await isAutenticated()).to.be.false;
  });
});
