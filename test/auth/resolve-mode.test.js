'use strict';

const chai = require('chai');
const proxyquire = require('proxyquire');
const requireUncached = require('ncjsm/require-uncached');
const ServerlessError = require('../../serverless-error');

const { expect } = chai;
chai.use(require('chai-as-promised'));

describe('test/auth/resolve-mode.test.js', () => {
  let resolveAuthenticationToken;
  const getResolveAuthenticationMode = () =>
    requireUncached(() =>
      proxyquire('../../auth/resolve-mode', {
        './resolve-token': async () => resolveAuthenticationToken(),
      })
    );
  beforeEach(() => {
    resolveAuthenticationToken = () => {
      throw new ServerlessError('Not logged in', 'CONSOLE_LOGGED_OUT');
    };

    delete process.env.SLS_ORG_TOKEN;
  });

  it('should return "user" when user is logged in', async () => {
    resolveAuthenticationToken = () => 'token';
    expect(await getResolveAuthenticationMode()()).to.equal('user');
  });

  it('should return "org" when authenticated via org token', async () => {
    process.env.SLS_ORG_TOKEN = 'foo';
    resolveAuthenticationToken = () => 'token';
    expect(await getResolveAuthenticationMode()()).to.equal('org');
  });

  it('should return null, when not authenticated', async () => {
    expect(await getResolveAuthenticationMode()()).to.be.null;
  });
});
