'use strict';

const log = require('../log');

const logMode = isFinite(process.env.SLS_DEV_LOG_MODE) ? Number(process.env.SLS_DEV_LOG_MODE) : 0;

if (logMode & 2) {
  // Hide legacy logs
  log.legacy.write = () => {};
}

if (!(logMode & 1)) return;

// Show modern logs

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
log.logLevelIndex = logLevelIndex;

// Substantial output (not subject to filtering)
outputEmitter.on('write', ({ mode, textTokens }) => {
  if (mode === 'text') process.stdout.write(joinTextTokens(textTokens));
});

log.isInteractive = isInteractive;
if (isInteractive) {
  require('../lib/log-reporters/node/progress-reporter')({ logLevelIndex });
}
