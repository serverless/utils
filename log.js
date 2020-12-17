'use strict';
const chalk = require('chalk');

module.exports = (message, options = {}) => {
  const { underline = false, bold = false, color = null, entity = 'Serverless' } = options;

  let print = chalk.yellow;

  if (color) print = chalk.keyword(color);
  if (underline) print = print.underline;
  if (bold) print = print.bold;

  process.stdout.write(`${entity}: ${print(message)}\n`);
};
