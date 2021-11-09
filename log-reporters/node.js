'use strict';

const uniGlobal = require('uni-global')('serverless/serverless/202110');

// Hide legacy logs
// TODO: Remove once all legacy logs are removed from the core
uniGlobal.legacyLogWrite = () => {};

// Show modern logs

if (process.env.SLS_LOG_LEVEL !== 'debug' && process.argv.includes('--verbose')) {
  process.env.SLS_LOG_LEVEL = 'info';
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
