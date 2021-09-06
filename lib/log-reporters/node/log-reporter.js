'use strict';

const chalk = require('chalk');
const NodeLogReporter = require('log-node/lib/writer');
const logLevels = require('log/levels');
const colorsSupportLevel = require('supports-color').stderr.level || 0;

const WARNING_LEVEL_INDEX = logLevels.indexOf('warning');
const ERROR_LEVEL_INDEX = logLevels.indexOf('error');

class ServerlessLogReporter extends NodeLogReporter {
  constructor({ logLevelIndex, debugNamespaces }) {
    super({
      env: { LOG_LEVEL: logLevels[logLevelIndex], LOG_DEBUG: debugNamespaces },
      defaultNamespace: 'serverless',
    });
  }
  isLoggerEnabled(logger) {
    return logger.namespaceTokens[0] === 'serverless' && logger.isEnabled;
  }
  setupLevelMessageDecorator(levelLogger) {
    if (levelLogger.levelIndex === ERROR_LEVEL_INDEX) {
      levelLogger.messageContentDecorator = chalk.red;
    } else if (levelLogger.levelIndex === WARNING_LEVEL_INDEX) {
      levelLogger.messageContentDecorator = chalk.hex('#FF8800');
    }
  }
  resolveMessageTimestamp() {
    // No log timestamp reporting at this point
  }
}

ServerlessLogReporter.levelPrefixes = {
  error: chalk.red(process.platform !== 'win32' && colorsSupportLevel >= 2 ? '✖' : '×'),
  warning: chalk.hex('#FF8800')('Warning:'),
};

ServerlessLogReporter.resolveNamespaceMessagePrefix = function (logger) {
  if (logger.level !== 'debug') return null;
  if (logger.namespaceTokens.length < 2) return null;
  return `${logger.namespaceTokens.slice(1).join(':')}:`;
};

module.exports = (config) => new ServerlessLogReporter(config);
