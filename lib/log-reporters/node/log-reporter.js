'use strict';

const NodeLogReporter = require('log-node/lib/writer');
const logLevels = require('log/levels');
const logEmitter = require('log/lib/emitter');
const colorsSupportLevel = require('supports-color').stderr.level || 0;
const style = require('./style');

const WARNING_LEVEL_INDEX = logLevels.indexOf('warning');
const ERROR_LEVEL_INDEX = logLevels.indexOf('error');

class ServerlessLogReporter extends NodeLogReporter {
  constructor({ logLevelIndex, debugNamespaces }) {
    super({
      env: { LOG_LEVEL: logLevels[logLevelIndex], LOG_DEBUG: debugNamespaces },
      defaultNamespace: 'serverless',
    });

    // Prevent "Warning:" prefix on deprecation warnings
    logEmitter.on('init', ({ logger }) => {
      if (logger.namespace === 'serverless:deprecation') {
        logger.levelMessagePrefix = null;
      }
    });
  }
  isLoggerEnabled(logger) {
    return logger.namespaceTokens[0] === 'serverless' && logger.isEnabled;
  }
  setupLevelMessageDecorator(levelLogger) {
    if (levelLogger.levelIndex === ERROR_LEVEL_INDEX) {
      levelLogger.messageContentDecorator = style.error;
    } else if (levelLogger.levelIndex === WARNING_LEVEL_INDEX) {
      levelLogger.messageContentDecorator = style.warning;
    }
  }
  resolveMessageTimestamp() {
    // No log timestamp reporting at this point
  }
}

ServerlessLogReporter.levelPrefixes = {
  error: style.error(process.platform !== 'win32' && colorsSupportLevel >= 2 ? '✖' : '×'),
  warning: style.warning('Warning:'),
};

ServerlessLogReporter.resolveNamespaceMessagePrefix = function (logger) {
  if (logger.level !== 'debug') return null;
  if (logger.namespaceTokens.length < 2) return null;
  return `${logger.namespaceTokens.slice(1).join(':')}:`;
};

module.exports = (config) => new ServerlessLogReporter(config);
