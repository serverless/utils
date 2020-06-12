'use strict';

const p = require('path');
const os = require('os');
const fs = require('fs');

const _ = require('lodash');
const rc = require('rc');
const chalk = require('chalk');
const writeFileAtomic = require('write-file-atomic');
const uuid = require('uuid');

let rcFileBase = 'serverless';
let serverlessrcPath = p.join(os.homedir(), `.${rcFileBase}rc`);

if (process.env.SERVERLESS_PLATFORM_STAGE && process.env.SERVERLESS_PLATFORM_STAGE !== 'prod') {
  rcFileBase = 'serverlessdev';
  serverlessrcPath = p.join(os.homedir(), `.${rcFileBase}rc`);
}

function storeConfig(config) {
  try {
    writeFileAtomic.sync(serverlessrcPath, JSON.stringify(config, null, 2));
  } catch (error) {
    if (process.env.SLS_DEBUG) {
      process.stdout.write(`${chalk.red(error.stack)}\n`);
      process.stdout.write(
        `Serverless: ${chalk.red(`Unable to store serverless config due to ${error.code} error`)}\n`
      );
    }
    try {
      return JSON.parse(fs.readFileSync(serverlessrcPath));
    } catch (readError) {
      // Ignore
    }
    return {};
  }
  return config;
}

function createConfig() {
  // set default config options
  const config = {
    userId: null, // currentUserId
    frameworkId: uuid.v1(),
    trackingDisabled: false,
    enterpriseDisabled: false,
    meta: {
      created_at: Math.round(Date.now() / 1000), // config file creation date
      updated_at: null, // config file updated date
    },
  };

  // save new config
  return storeConfig(config);
}

// check for global .serverlessrc file
function hasConfigFile() {
  const stats = (() => {
    try {
      return fs.lstatSync(serverlessrcPath);
    } catch (error) {
      if (error.code === 'ENOENT') return null;
      if (process.env.SLS_DEBUG) {
        process.stdout.write(`${chalk.red(error.stack)}\n`);
        process.stdout.write(
          `Serverless: ${chalk.red(`Unable to read config due to ${error.code} error`)}\n`
        );
      }
      return null;
    }
  })();
  if (!stats) return false;
  return stats.isFile();
}

// get global + local .serverlessrc config
// 'rc' module merges local config over global
function getConfig() {
  if (!hasConfigFile()) {
    // create config first
    createConfig();
  }
  // then return config merged via rc module

  return rc(rcFileBase, null, /* Ensure to not read options from CLI */ {});
}

function getGlobalConfig() {
  if (hasConfigFile()) {
    return JSON.parse(fs.readFileSync(serverlessrcPath));
  }
  // else create and return it
  return createConfig();
}

// set global .serverlessrc config value.
function set(key, value) {
  let config = getGlobalConfig();
  if (key && typeof key === 'string' && typeof value !== 'undefined') {
    config = _.set(config, key, value);
  } else if (_.isObject(key)) {
    config = _.merge(config, key);
  } else if (typeof value !== 'undefined') {
    config = _.merge(config, value);
  }
  // update config meta
  config.meta = config.meta || {};
  config.meta.updated_at = Math.round(Date.now() / 1000);
  // write to .serverlessrc file
  return storeConfig(config);
}

function deleteValue(key) {
  let config = getGlobalConfig();
  if (key && typeof key === 'string') {
    config = _.omit(config, [key]);
  } else if (key && Array.isArray(key)) {
    config = _.omit(config, key);
  }
  // write to .serverlessrc file
  return storeConfig(config);
}

/* Get config value with object path */
function get(path) {
  const config = getConfig();
  return _.get(config, path);
}

module.exports = {
  set,
  get,
  delete: deleteValue,
  getConfig,
  getGlobalConfig,
  CONFIG_FILE_PATH: serverlessrcPath,
};
