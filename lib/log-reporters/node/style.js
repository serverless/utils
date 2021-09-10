'use strict';

const chalk = require('chalk');
const { style } = require('../../../log');
const joinTextTokens = require('../../log/join-text-tokens');

const cliStyle = {
  aside: chalk.rgb(140, 141, 145),
  noticeSymbol: chalk.rgb(253, 87, 80),
  warning: chalk.rgb(255, 165, 0),
  error: chalk.rgb(253, 87, 80),
};

for (const key of Object.keys(style)) {
  const decorator = cliStyle[key];
  if (!decorator) continue;
  module.exports[key] = style[key] = (text, ...textTokens) =>
    decorator(joinTextTokens([text, ...textTokens]).slice(0, -1));
}
