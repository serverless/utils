'use strict';

const { expect } = require('chai');
const requireUncached = require('ncjsm/require-uncached');
const overrideStdoutWrite = require('process-utils/override-stdout-write');
const overrideStderrWrite = require('process-utils/override-stderr-write');
const overrideEnv = require('process-utils/override-env');

const getLog = () =>
  requireUncached(() => {
    require('../../log-reporters/node');
    return require('../../log');
  });

describe('log-reporters/node.js', () => {
  it('should let write legacy logs by default', () => {
    let stdoutData = '';
    overrideStdoutWrite(
      (data) => (stdoutData += data),
      () => {
        const { legacy } = getLog();
        legacy.write('foo');
      }
    );
    expect(stdoutData).to.equal('foo');
  });

  it('should not write legacy logs  if instructed via SLS_DEV_LOG_MODE', () => {
    let stdoutData = '';
    overrideEnv(() => {
      process.env.SLS_DEV_LOG_MODE = 2;
      return overrideStdoutWrite(
        (data) => (stdoutData += data),
        () => {
          const { legacy } = getLog();
          legacy.write('foo');
        }
      );
    });
    expect(stdoutData).to.equal('');
  });

  it('should not write modern logs by default', () => {
    let stdoutData = '';
    overrideStdoutWrite(
      (data) => (stdoutData += data),
      () => {
        const { log } = getLog();
        log.error('Hey!');
      }
    );
    expect(stdoutData).to.equal('');
  });

  describe('Modern logs: Default visibility', () => {
    let log;
    let restoreEnv;
    before(() => {
      ({ restoreEnv } = overrideEnv());
      process.env.SLS_DEV_LOG_MODE = 1;
      ({ log } = getLog());
    });
    after(() => restoreEnv());

    it('should write logs of notice, warn and error levels', () => {
      let stderrData = '';
      overrideStderrWrite(
        (data) => (stderrData += data),
        () => {
          log.notice('Notice log');
          log.warn('Warn log');
          log.error('Error log');
        }
      );
      expect(stderrData).to.include('Notice log');
      expect(stderrData).to.include('Warn log');
      expect(stderrData).to.include('Error log');
    });

    it('should not write logs of debug and info levels', () => {
      let stderrData = '';
      overrideStderrWrite(
        (data) => (stderrData += data),
        () => {
          log.info('Info log');
          log.debug('Debug log');
        }
      );
      expect(stderrData).to.equal('');
    });
  });

  describe('Modern logs: Extended visibility', () => {
    let log;
    let restoreEnv;
    before(() => {
      ({ restoreEnv } = overrideEnv());
      process.env.SLS_DEV_LOG_MODE = 1;
      process.env.SLS_LOG_LEVEL = 'debug';
      ({ log } = getLog());
    });
    after(() => restoreEnv());

    it('should write logs of all levels', () => {
      let stdoutData = '';
      overrideStderrWrite(
        (data) => (stdoutData += data),
        () => {
          log.info('Info log');
          log.debug('Debug log');
          log.notice('Notice log');
          log.warn('Warn log');
          log.error('Error log');
        }
      );
      expect(stdoutData).to.include('Debug log');
      expect(stdoutData).to.include('Info log');
      expect(stdoutData).to.include('Notice log');
      expect(stdoutData).to.include('Warn log');
      expect(stdoutData).to.include('Error log');
    });
  });
});
