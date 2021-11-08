'use strict';

const ensureString = require('type/string/ensure');
const isObject = require('type/object/is');
const d = require('d');
const memoizee = require('memoizee');
const chalk = require('chalk');
const logLevels = require('log/levels');
const uniGlobal = require('uni-global')('serverless/serverless/202110');
const getOutputReporter = require('./lib/log/get-output-reporter');
const getProgressReporter = require('./lib/log/get-progress-reporter');

const log = (() => {
  if (!uniGlobal.log) uniGlobal.log = require('log').get('serverless').notice;
  return uniGlobal.log;
})();

if (!uniGlobal.legacyLogWrite) {
  uniGlobal.legacyLogWrite = (...args) => process.stdout.write(...args);
}

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
  write: (...args) => uniGlobal.legacyLogWrite(...args),
  consoleLog: (message) => {
    legacy.write(`${message}\n`);
  },
};
const legacyLog = getLegacyLog((data) => legacy.write(data));
legacy.log = (message, entity, opts) => {
  if (isObject(entity)) legacyLog(message, entity);
  else legacyLog(message, { ...opts, entity: entity || 'Serverless' });
};

module.exports.legacy = legacy;

// Modern logging interface (to which old logs are currently migrated)
module.exports.log = log;

if (!log.verbose) {
  // Intialize log instance (we do not share one setup over `uniGlobal`)

  // Notice level message common message decorators
  Object.defineProperties(log, {
    success: d.gs(function () {
      return this.notice;
    }),
    skip: d.gs(function () {
      return this.notice;
    }),
  });

  Object.defineProperties(log, {
    verbose: d.gs(function () {
      return this.info;
    }),
  });
}

const defaultLogLevelIndex = logLevels.indexOf('notice');
Object.defineProperties(module.exports, {
  logLevelIndex: d.gs(() => {
    return uniGlobal.logLevelIndex == null ? defaultLogLevelIndex : uniGlobal.logLevelIndex;
  }),
  isVerboseMode: d.gs(() => module.exports.logLevelIndex > defaultLogLevelIndex),
  isInteractive: d.gs(() => {
    return uniGlobal.logIsInteractive == null ? false : uniGlobal.logIsInteractive;
  }),
});

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
      log: pluginLog.notice,
      writeText: getOutputReporter(`serverless:plugin:${pluginName}`).get('text'),
      progress: getProgressReporter(`serverless:plugin:${pluginName}`),
    };
  },
  { primitive: true }
);

const style = {
  aside: (text, ...textTokens) => [text, ...textTokens],
  error: (text, ...textTokens) => [text, ...textTokens],
  link: (text, ...textTokens) => [text, ...textTokens],
  linkStrong: (text, ...textTokens) => [text, ...textTokens],
  noticeSymbol: (text, ...textTokens) => [text, ...textTokens],
  strong: (text, ...textTokens) => [text, ...textTokens],
  title: (text, ...textTokens) => [text, ...textTokens],
  warning: (text, ...textTokens) => [text, ...textTokens],
};

if (uniGlobal.logStyle) {
  module.exports.style = uniGlobal.logStyle;
  for (const key of Object.keys(style)) {
    if (!uniGlobal.logStyle[key]) uniGlobal.logStyle[key] = style[key];
  }
} else {
  module.exports.style = uniGlobal.logStyle = style;
}
