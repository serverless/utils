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

// Event logs
logReporter();
