'use strict';

const { expect } = require('chai');
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
  const backupConfigFilePath = `${config.CONFIG_FILE_PATH}.bak`;

  beforeEach(async () => {
    await fs.promises.writeFile(config.CONFIG_FILE_PATH, malformedConfigJson);
  });

  afterEach(async () => {
    await fs.promises.unlink(backupConfigFilePath);
  });

  it('should handle malformed config file and fallback to getGlobalConfig', async () => {
    const conf = config.getConfig();

    const configFile = await fs.promises.readFile(config.CONFIG_FILE_PATH);
    expect(JSON.parse(configFile)).to.deep.equal(conf);
  });

  it('should handle malformed config file and regenerate it when using getGlobalConfig', async () => {
    const conf = config.getGlobalConfig();

    expect(conf).to.not.be.empty;

    const [backupConfigFile, regeneratedConfigFile] = await Promise.all([
      fs.promises.readFile(backupConfigFilePath, 'utf-8'),
      fs.promises.readFile(config.CONFIG_FILE_PATH),
    ]);
    expect(backupConfigFile).to.equal(malformedConfigJson);
    expect(JSON.parse(regeneratedConfigFile)).to.deep.equal(conf);
  });
});
