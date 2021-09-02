'use strict';

const logMode = isFinite(process.env.SLS_DEV_LOG_MODE) ? Number(process.env.SLS_DEV_LOG_MODE) : 0;

if (!(logMode & 1)) return;

// Show modern logs
require('../lib/log-reporters/node/log-reporter')();
