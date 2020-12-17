'use strict';

const chalk = require('chalk');
const overrideStdoutWrite = require('process-utils/override-stdout-write');
const expect = require('chai').expect;
const log = require('../log');

describe('log', () => {
  it('supports message without custom options', () => {
    let stdoutData = '';
    overrideStdoutWrite(
      (data) => (stdoutData += data),
      () => log('basic message')
    );
    expect(stdoutData).to.have.string('basic message');
    expect(stdoutData.startsWith('Serverless')).to.be.true;
  });

  it('supports message with custom entity', () => {
    let stdoutData = '';
    overrideStdoutWrite(
      (data) => (stdoutData += data),
      () => log('basic message', { entity: 'NotServerless' })
    );
    expect(stdoutData.startsWith('NotServerless')).to.be.true;
    expect(stdoutData).to.have.string(chalk.yellow('basic message'));
  });

  it('supports message with custom color', () => {
    let stdoutData = '';
    overrideStdoutWrite(
      (data) => (stdoutData += data),
      () => log('basic message', { color: 'green' })
    );
    expect(stdoutData.startsWith('Serverless')).to.be.true;
    expect(stdoutData).to.include(chalk.keyword('green')('basic message'));
  });

  it('supports underlined message', () => {
    let stdoutData = '';
    overrideStdoutWrite(
      (data) => (stdoutData += data),
      () => log('basic message', { underline: true })
    );
    expect(stdoutData.startsWith('Serverless')).to.be.true;
    expect(stdoutData).to.have.string(chalk.yellow.underline('basic message'));
  });

  it('supports bolded message', () => {
    let stdoutData = '';
    overrideStdoutWrite(
      (data) => (stdoutData += data),
      () => log('basic message', { bold: true })
    );
    expect(stdoutData.startsWith('Serverless')).to.be.true;
    expect(stdoutData).to.have.string(chalk.yellow.bold('basic message'));
  });
});
