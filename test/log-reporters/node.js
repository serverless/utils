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
    let writeText;
    let restoreEnv;
    before(() => {
      ({ restoreEnv } = overrideEnv());
      process.env.SLS_DEV_LOG_MODE = 1;
      ({ log, writeText } = getLog());
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

    it('should write level prefixes', () => {
      let stderrData = '';
      overrideStderrWrite(
        (data) => (stderrData += data),
        () => {
          log.warn('Warn log');
        }
      );
      expect(stderrData).to.include('Warning: ');
    });

    it('should not write level prefixes on deprecation logs', () => {
      let stderrData = '';
      overrideStderrWrite(
        (data) => (stderrData += data),
        () => {
          log.get('deprecation').warn('Warn log');
        }
      );
      expect(stderrData).to.not.include('Warning: ');
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

    it('should write text output', () => {
      let stdoutData = '';
      overrideStdoutWrite(
        (data) => (stdoutData += data),
        () => {
          writeText('foo', 'bar', ['other', 'stuff']);
        }
      );
      expect(stdoutData).to.equal('foo\nbar\nother\nstuff\n');
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
      let stderrData = '';
      overrideStderrWrite(
        (data) => (stderrData += data),
        () => {
          log.info('Info log');
          log.debug('Debug log');
          log.notice('Notice log');
          log.warn('Warn log');
          log.error('Error log');
        }
      );
      expect(stderrData).to.include('Debug log');
      expect(stderrData).to.include('Info log');
      expect(stderrData).to.include('Notice log');
      expect(stderrData).to.include('Warn log');
      expect(stderrData).to.include('Error log');
    });
  });

  describe('Modern logs: Style', () => {
    let style;
    let restoreEnv;
    before(() => {
      ({ restoreEnv } = overrideEnv());
      process.env.SLS_DEV_LOG_MODE = 1;
      ({ style } = getLog());
    });
    after(() => restoreEnv());

    it('style function should return input', () => {
      expect(style.aside('foo')).to.include('foo');
      expect(style.noticeSymbol('foo')).to.include('foo');
      expect(style.warning('foo')).to.include('foo');
      expect(style.error('foo')).to.include('foo');
    });
  });

  describe('Modern logs: Progress', () => {
    let progress;
    let restoreEnv;
    let stdoutData = '';
    let restoreStdoutWrite;
    before(() => {
      ({ restoreEnv } = overrideEnv());
      ({ restoreStdoutWrite } = overrideStdoutWrite((data, originalWrite) => {
        stdoutData += data;
        originalWrite(data);
      }));
      process.env.SLS_DEV_LOG_MODE = 1;
      process.env.SLS_INTERACTIVE_SETUP_ENABLE = 1;
      ({ progress } = getLog());
    });
    beforeEach(() => {
      stdoutData = '';
    });

    after(() => {
      progress.clear();
      restoreStdoutWrite();
      restoreEnv();
    });

    it('should write progress of notice levels', () => {
      const progressItem = progress.get('first');
      progressItem.notice('Notice progress');
      progressItem.remove();
      expect(stdoutData).to.include('Notice progress');
    });

    it('should not write progress of info levels', () => {
      const progressItem = progress.get('first');
      progressItem.info('Info progress');
      progressItem.remove();
      expect(stdoutData).to.not.include('Info progress');
    });

    it('should write main progress', () => {
      const progressItem = progress.get('main');
      progressItem.notice('Packaging');
      expect(stdoutData).to.include('Packaging (0s)');
    });

    it('should prevent any writing after `clear` method is invoked', () => {
      const progressItem = progress.get('first');
      progress.clear();
      progressItem.notice('Notice progress');
      progressItem.remove();
      expect(stdoutData).to.not.include('Notice progress');
    });
  });

  describe('Modern logs: Progress: Verbose', () => {
    let progress;
    let restoreEnv;
    let stdoutData = '';
    let restoreStdoutWrite;
    before(() => {
      ({ restoreEnv } = overrideEnv());
      ({ restoreStdoutWrite } = overrideStdoutWrite((data, originalWrite) => {
        stdoutData += data;
        originalWrite(data);
      }));
      process.env.SLS_DEV_LOG_MODE = 1;
      process.env.SLS_LOG_LEVEL = 'info';
      process.env.SLS_INTERACTIVE_SETUP_ENABLE = 1;
      ({ progress } = getLog());
    });

    after(() => {
      restoreStdoutWrite();
      restoreEnv();
    });

    it('should write progress of notice levels', () => {
      const progressItem = progress.get('first');
      progressItem.notice('Notice progress');
      progressItem.remove();
      expect(stdoutData).to.include('Notice progress');
    });

    it('should write progress of info levels', () => {
      const progressItem = progress.get('first');
      progressItem.info('Info progress');
      progressItem.remove();
      expect(stdoutData).to.include('Info progress');
    });
  });
});
