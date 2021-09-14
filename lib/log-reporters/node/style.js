'use strict';

const chalk = require('chalk');
const { level: colorSupportLevel } = require('supports-color');
const { style } = require('../../../log');
const joinTextTokens = require('../../log/join-text-tokens');

const cliStyle = {
  aside: colorSupportLevel > 2 ? chalk.rgb(140, 141, 145) : chalk.gray,
  noticeSymbol: colorSupportLevel > 2 ? chalk.rgb(253, 87, 80) : chalk.redBright,
  warning: chalk.rgb(255, 165, 0),
  error: colorSupportLevel > 2 ? chalk.rgb(253, 87, 80) : chalk.redBright,
};

for (const key of Object.keys(style)) {
  const decorator = cliStyle[key];
  if (!decorator) continue;
  module.exports[key] = style[key] = (text, ...textTokens) =>
    decorator(joinTextTokens([text, ...textTokens]).slice(0, -1));
}
