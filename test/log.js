'use strict';

const chalk = require('chalk');
const overrideStdoutWrite = require('process-utils/override-stdout-write');
const expect = require('chai').expect;
const log = require('../log');

describe('log', () => {
  const testLegacyLog = (getLegacyLog) => {
    it('should supports message without custom options', () => {
      let stdoutData = '';
      overrideStdoutWrite(
        (data) => (stdoutData += data),
        () => getLegacyLog()('basic message')
      );
      expect(stdoutData).to.have.string('basic message');
      expect(stdoutData.startsWith('Serverless: ')).to.be.true;
    });

    it('should support message with custom entity', () => {
      let stdoutData = '';
      overrideStdoutWrite(
        (data) => (stdoutData += data),
        () => getLegacyLog()('basic message', { entity: 'NotServerless' })
      );
      expect(stdoutData.startsWith('NotServerless: ')).to.be.true;
      expect(stdoutData).to.have.string(chalk.yellow('basic message'));
    });

    it('should support message with disabled entity', () => {
      let stdoutData = '';
      overrideStdoutWrite(
        (data) => (stdoutData += data),
        () => getLegacyLog()('basic message', { entity: null })
      );
      expect(stdoutData).to.equal(`${chalk.yellow('basic message')}\n`);
    });

    it('should support message with custom color', () => {
      let stdoutData = '';
      overrideStdoutWrite(
        (data) => (stdoutData += data),
        () => getLegacyLog()('basic message', { color: 'green' })
      );
      expect(stdoutData.startsWith('Serverless')).to.be.true;
      expect(stdoutData).to.include(chalk.keyword('green')('basic message'));
    });

    it('should support underlined message', () => {
      let stdoutData = '';
      overrideStdoutWrite(
        (data) => (stdoutData += data),
        () => getLegacyLog()('basic message', { underline: true })
      );
      expect(stdoutData.startsWith('Serverless: ')).to.be.true;
      expect(stdoutData).to.have.string(chalk.yellow.underline('basic message'));
    });

    it('should support bolded message', () => {
      let stdoutData = '';
      overrideStdoutWrite(
        (data) => (stdoutData += data),
        () => getLegacyLog()('basic message', { bold: true })
      );
      expect(stdoutData.startsWith('Serverless: ')).to.be.true;
      expect(stdoutData).to.have.string(chalk.yellow.bold('basic message'));
    });
  };

  describe('Legacy: Main function', () => {
    beforeEach(() => {
      delete require.cache[require.resolve('../log')];
    });
    testLegacyLog(() => require('../log'));
  });

  describe('`legacy` (interchangeable interface)', () => {
    let originalWrite;
    before(() => {
      originalWrite = log.legacy.write;
    });
    beforeEach(() => {
      log.legacy.write = originalWrite;
    });

    describe('`legacy.write`', () => {
      it('should by default write to stdout', () => {
        delete require.cache[require.resolve('../log')];
        let stdoutData = '';
        overrideStdoutWrite(
          (data) => (stdoutData += data),
          () => require('../log').legacy.write('some test')
        );
        expect(stdoutData).to.equal('some test');
      });
    });
    describe('`legacy.consoleLog`', () => {
      it('should write new line', () => {
        delete require.cache[require.resolve('../log')];
        let stdoutData = '';
        overrideStdoutWrite(
          (data) => (stdoutData += data),
          () => require('../log').legacy.consoleLog('some test')
        );
        expect(stdoutData).to.equal('some test\n');
      });
      it('should have overridable writer', () => {
        let stdoutData = '';
        log.legacy.write = (data) => (stdoutData += data);
        log.legacy.consoleLog('some test');
        expect(stdoutData).to.equal('some test\n');
      });
    });
    describe('`legacy.log`', () => {
      it('should write formatted log', () => {
        delete require.cache[require.resolve('../log')];
        let stdoutData = '';
        overrideStdoutWrite(
          (data) => (stdoutData += data),
          () => require('../log').legacy.log('some test')
        );
        expect(stdoutData).to.have.string('some test');
        expect(stdoutData.startsWith('Serverless: ')).to.be.true;
      });
      it('should have overridable writer', () => {
        let stdoutData = '';
        log.legacy.write = (data) => (stdoutData += data);
        log.legacy.log('some test');
        expect(stdoutData).to.have.string('some test');
        expect(stdoutData.startsWith('Serverless: ')).to.be.true;
      });
    });
  });
});
