'use strict';

const chalk = require('chalk');
const { style } = require('../../../log');

module.exports = {
  aside: chalk.rgb(140, 141, 145),
  noticeSymbol: chalk.rgb(253, 87, 80),
  warning: chalk.rgb(255, 165, 0),
  error: chalk.rgb(253, 87, 80),
};

for (const key of Object.keys(style)) {
  if (module.exports[key]) style[key] = module.exports[key];
}
