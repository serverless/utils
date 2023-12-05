'use strict';

const isObject = require('type/object/is');

const inquirer = require('./');

/**
 * Prompt for input with stored step history
 * @typedef {Object} StepHistory
 * @property {(name: string) => void} start
 * @property {(name: string, answerToRecord: string) => void} finalize
 * @typedef {Object} PromptWithHistoryRequest
 * @property {string} message
 * @property {string} name
 * @property {StepHistory} stepHistory
 * @property {string} type
 * @property {boolean} recordRawAnswerInHistory
 *
 * @param {PromptWithHistoryRequest} options
 * @returns {string}
 */
const promptWithHistory = async (options = {}) => {
  const { message, name, stepHistory, type, recordRawAnswerInHistory, ...restOfOptions } = options;

  stepHistory.start(name);

  let answer = (
    await inquirer.prompt({
      message,
      name,
      type,
      ...restOfOptions,
    })
  )[name];
  const isStringAnswer = typeof answer === 'string';
  if (isStringAnswer) {
    answer = answer.trim();
  }
  const answerToRecord = (() => {
    if (
      recordRawAnswerInHistory ||
      (!isStringAnswer && !isObject(answer)) ||
      (isStringAnswer && answer.startsWith('_'))
    ) {
      return answer;
    }

    if (answer === '') {
      return '_continuation_';
    }

    if (type === 'list') {
      return '_user_choice_';
    }

    return '_user_input_';
  })();
  stepHistory.finalize(name, answerToRecord);
  return answer;
};

module.exports = promptWithHistory;
