'use strict';

const getCliProgressFooter = require('cli-progress-footer');
const chalk = require('chalk');
const { emitter } = require('../../log/get-progress-reporter');
const joinTextTokens = require('../../log/join-text-tokens');

module.exports = ({ logLevelIndex }) => {
  const cliProgressFooter = getCliProgressFooter();
  cliProgressFooter.shouldAddProgressAnimationPrefix = true;
  cliProgressFooter.progressAnimationPrefixFrames =
    cliProgressFooter.progressAnimationPrefixFrames.map((frame) => chalk.red(frame));

  const ongoing = new Map();
  const repaint = () => cliProgressFooter.updateProgress(Array.from(ongoing.values()));

  emitter.on('update', ({ namespace, name, levelIndex, textTokens }) => {
    if (levelIndex > logLevelIndex) return;
    ongoing.set(`${namespace}:${name}`, joinTextTokens(textTokens).slice(0, -1));
    repaint();
  });
  emitter.on('remove', ({ namespace, name }) => {
    ongoing.delete(`${namespace}:${name}`);
    repaint();
  });
};
