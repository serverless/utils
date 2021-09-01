'use strict';

const chalk = require('chalk');

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
