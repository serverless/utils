'use strict';

const outputEmitter = require('event-emitter')();
const memoizee = require('memoizee');

module.exports = memoizee(
  (namespace) => {
    return {
      get: memoizee(
        (mode) =>
          (text, ...textTokens) => {
            outputEmitter.emit('write', {
              namespace,
              mode,
              textTokens: [text, ...textTokens],
            });
          },
        { primitive: true }
      ),
    };
  },
  { primitive: true }
);

module.exports.emitter = outputEmitter;
