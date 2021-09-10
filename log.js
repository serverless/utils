'use strict';

const ensureString = require('type/string/ensure');
const memoizee = require('memoizee');
const chalk = require('chalk');
const log = require('log').get('serverless');
const logLevels = require('log/levels');
const getOutputReporter = require('./lib/log/get-output-reporter');
const getProgressReporter = require('./lib/log/get-progress-reporter');

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

// Note: Do not assign prebound function as it breaks in tests mocking of process.stdout.write
module.exports = getLegacyLog((...args) => process.stdout.write(...args));

// Legacy interface, used for old logs which have counterpart in new logs
// (are to be shown exchangeably)
const legacy = {
  // Note: Do not assign prebound function as it breaks in tests mocking of process.stdout.write
  write: (...args) => process.stdout.write(...args),
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

// Whether we're in context of interactive terminal (to be overriden by process main module)
module.exports.isInteractive = false;

module.exports.writeText = getOutputReporter('serverless').get('text');

module.exports.progress = getProgressReporter('serverless');
// Method intended to clear and close indefinitely any progress writing
// Overriden with intended logic in reporter
module.exports.progress.clear = () => {};

module.exports.getPluginWriters = memoizee(
  (pluginName) => {
    pluginName = ensureString(pluginName, { name: 'pluginName' });
    // "log" namespace can contain only [a-z0-9-] chars, therefore we normalize plugin name to
    // avoid exceptions
    const pluginLog = log.get('plugin').get(pluginName.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
    pluginLog.pluginName = pluginName;
    return {
      log: pluginLog,
      writeText: getOutputReporter(`serverless:plugin:${pluginName}`).get('text'),
      progress: getProgressReporter(`serverless:plugin:${pluginName}`),
    };
  },
  { primitive: true }
);

module.exports.style = {
  aside: (text, ...textTokens) => [text, ...textTokens],
  noticeSymbol: (text, ...textTokens) => [text, ...textTokens],
  warning: (text, ...textTokens) => [text, ...textTokens],
  error: (text, ...textTokens) => [text, ...textTokens],
};
