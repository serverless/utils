'use strict';

const chalk = require('chalk');
const log = require('log').get('serverless');
const logLevels = require('log/levels');

// Legacy interface, of which usage is scheduled to be replaced by modern one
const getLegacyLog =
  (write) =>
  (message, options = {}) => {
    const { underline = false, bold = false, color = null, entity = 'Serverless' } = options;

    let print = chalk.yellow;

    if (color) print = chalk.keyword(color);
    if (underline) print = print.underline;
    if (bold) print = print.bold;

    // In order to support stripping entity prefix by passing "entity: null"
    if (entity) write(`${entity}: ${print(message)}\n`);
    else write(`${print(message)}\n`);
  };

module.exports = getLegacyLog(process.stdout.write.bind(process.stdout));

// Legacy interface, used for old logs which have counterpart in new logs
// (are to be shown exchangeably)
const legacy = {
  write: process.stdout.write.bind(process.stdout),
  consoleLog: (message) => {
    legacy.write(`${message}\n`);
  },
  log: getLegacyLog((data) => legacy.write(data)),
};

module.exports.legacy = legacy;

// Modern logging interface (to which old logs are currently migrated)
module.exports.log = log;

// Endpoints which expose currently set log level
// (`logLevelIndex` is to be overriden by main process module)
module.exports.logLevelIndex = logLevels.indexOf('notice');
Object.defineProperty(module.exports, 'isVerboseMode', {
  get: () => module.exports.logLevelIndex > logLevels.indexOf('notice'),
  enumerable: true,
});
