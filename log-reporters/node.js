'use strict';

const uniGlobal = require('uni-global')('serverless/serverless/202110');

if (uniGlobal.logLevelIndex != null) {
  // An edge case, of log reporter being setup second time for Node.js process
  // The only known scenario is `sls --version` being run with global v2 `serverless`
  // installation, which falls back to locally installed v2 `serverless` installation
  return;
}

const logMode = isFinite(process.env.SLS_DEV_LOG_MODE) ? Number(process.env.SLS_DEV_LOG_MODE) : 0;

if (logMode & 2) {
  // Hide legacy logs
  uniGlobal.legacyLogWrite = () => {};
}

if (!(logMode & 1)) return;

// Show modern logs

if (!process.env.SLS_LOG_LEVEL && process.argv.includes('--verbose') && logMode & 2) {
  process.env.SLS_LOG_LEVEL = 'info';
  process.argv.splice(process.argv.indexOf('--verbose'), 1);
}

const logReporter = require('../lib/log-reporters/node/log-reporter');
const { emitter: outputEmitter } = require('../lib/log/get-output-reporter');
const joinTextTokens = require('../lib/log/join-text-tokens');
const logLevels = require('log/levels');

const logLevelIndex = logLevels.includes(process.env.SLS_LOG_LEVEL)
  ? logLevels.indexOf(process.env.SLS_LOG_LEVEL)
  : logLevels.indexOf('notice');

const isInteractive = process.stdin.isTTY || process.env.SLS_INTERACTIVE_SETUP_ENABLE;

// Apply style decorators
require('../lib/log-reporters/node/style');

// Event logs
logReporter({ logLevelIndex, debugNamespaces: process.env.SLS_LOG_DEBUG });
uniGlobal.logLevelIndex = logLevelIndex;

// Substantial output (not subject to filtering)
outputEmitter.on('write', ({ mode, textTokens }) => {
  if (mode === 'text') process.stdout.write(joinTextTokens(textTokens));
});

uniGlobal.logIsInteractive = isInteractive;
if (isInteractive) {
  require('../lib/log-reporters/node/progress-reporter')({ logLevelIndex });
}
