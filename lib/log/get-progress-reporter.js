'use strict';

const ensureString = require('type/string/ensure');
const progressEmitter = require('event-emitter')();
const memoizee = require('memoizee');
const logLevels = require('log/levels');

module.exports = memoizee(
  (namespace) => {
    return {
      get: memoizee(
        (name) => {
          name = ensureString(name, { name: 'name' });
          const id = `${namespace}:${name}`;
          const progress = {
            namespace,
            name,
            remove: () => {
              progressEmitter.emit('remove', { id });
            },
          };
          const levelsMeta = [
            { levelName: 'info', levelIndex: logLevels.indexOf('info') },
            { levelName: 'notice', levelIndex: logLevels.indexOf('notice') },
          ];
          for (const { levelName, levelIndex } of levelsMeta) {
            progress[levelName] = (text, ...textTokens) => {
              progressEmitter.emit('update', {
                id,
                level: levelName,
                levelIndex,
                textTokens: [text, ...textTokens],
              });
            };
          }
          return progress;
        },
        { primitive: true }
      ),
    };
  },
  { primitive: true }
);

module.exports.emitter = progressEmitter;
