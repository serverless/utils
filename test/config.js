'use strict';

const { expect } = require('chai');
const config = require('../config');

describe('Config', () => {
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
