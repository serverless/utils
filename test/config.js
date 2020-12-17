'use strict';

const { expect } = require('chai');
const overrideStdoutWrite = require('process-utils/override-stdout-write');
const config = require('../config');
const fs = require('fs');

describe('config', () => {
  it('should have CONFIG_FILE_PATH', () => {
    const configPath = config.CONFIG_FILE_PATH;
    expect(configPath).to.exist; // eslint-disable-line
  });

  describe('When using config.getConfig', () => {
    it('should have userId key', () => {
      const conf = config.getConfig();
      expect(conf).to.have.nested.property('userId');
    });

    it('should have frameworkId key', () => {
      const conf = config.getConfig();
      expect(conf).to.have.nested.property('frameworkId');
    });

    it('should have trackingDisabled key', () => {
      const conf = config.getConfig();
      expect(conf).to.have.nested.property('trackingDisabled');
    });
  });

  describe('When using config.get', () => {
    it('should have frameworkId', () => {
      const frameworkId = config.get('frameworkId');
      expect(frameworkId).to.exist; // eslint-disable-line
    });
    it('should have not have a value that doesnt exist', () => {
      const doesntExist = config.get('frameworkIdzzzz');
      expect(doesntExist).to.not.exist; // eslint-disable-line
    });
  });

  describe('When using config.set', () => {
    it('should add new properties with "set"', () => {
      config.set('foo', true);
      const foo = config.get('foo');
      expect(foo).to.equal(true);
    });

    it('should delete properties with "delete"', () => {
      // cleanup foo
      config.delete('foo');
      const zaz = config.get('foo');
      expect(zaz).to.equal(undefined);
    });
  });
});

describe('malformed config', () => {
  const malformedConfigJson = '{"userId":null';

  before(async () => {
    await fs.promises.writeFile(config.CONFIG_FILE_PATH, malformedConfigJson);
  });

  it('should handle malformed config file and log warning when using getConfig', () => {
    let conf;
    let stdoutData = '';
    overrideStdoutWrite(
      (data) => (stdoutData += data),
      () => {
        conf = config.getConfig();
      }
    );

    expect(conf).to.deep.equal({});
    expect(stdoutData).to.include('Unable to read config');
  });

  it('should handle malformed config file, regenerate it and log warning when using getGlobalConfig', async () => {
    let conf;
    let stdoutData = '';
    overrideStdoutWrite(
      (data) => (stdoutData += data),
      () => {
        conf = config.getGlobalConfig();
      }
    );

    const backupConfigFilePath = `${config.CONFIG_FILE_PATH}.bak`;

    expect(conf).to.not.be.empty;
    expect(stdoutData).to.include('Unable to read global config');
    expect(stdoutData).to.include(`Your previous config was renamed to ${backupConfigFilePath}`);
    expect(stdoutData).to.include(
      `Default global config will be recreated under ${config.CONFIG_FILE_PATH}`
    );

    const [backupConfigFile, regeneratedConfigFile] = await Promise.all([
      fs.promises.readFile(backupConfigFilePath, 'utf-8'),
      fs.promises.readFile(config.CONFIG_FILE_PATH),
    ]);
    expect(backupConfigFile).to.equal(malformedConfigJson);
    expect(JSON.parse(regeneratedConfigFile)).to.deep.equal(conf);
  });
});
