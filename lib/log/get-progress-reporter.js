'use strict';

const ensureString = require('type/string/ensure');
const createRandomString = require('ext/string/random');
const uniGlobal = require('uni-global')('serverless/serverless/202110');
const memoizee = require('memoizee');
const logLevels = require('log/levels');

const progressEmitter = (() => {
  if (!uniGlobal.progressEmitter) uniGlobal.progressEmitter = require('event-emitter')();
  return uniGlobal.progressEmitter;
})();

module.exports = memoizee(
  (namespace) => {
    return {
      get: memoizee(
        (name) => {
          name = ensureString(name, { name: 'name' });
          const progress = {
            namespace,
            name,
            remove: () => {
              progressEmitter.emit('remove', { namespace, name });
            },
          };
          const levelsMeta = [
            { levelName: 'info', levelIndex: logLevels.indexOf('info') },
            { levelName: 'notice', levelIndex: logLevels.indexOf('notice') },
          ];
          for (const { levelName, levelIndex } of levelsMeta) {
            progress[levelName] = (textTokens, options = null) => {
              progressEmitter.emit('update', {
                namespace,
                name,
                level: levelName,
                levelIndex,
                textTokens,
                options,
              });
            };
          }
          progress.update = progress.notice;
          return progress;
        },
        namespace,
        { primitive: true }
      ),
      create(initialMessage = null) {
        initialMessage = ensureString(initialMessage, { isOptional: true });
        const progress = this.get(`unnamed-${createRandomString({ isUnique: true })}`);
        if (initialMessage != null) progress.notice(initialMessage);
        return progress;
      },
    };
  },
  { primitive: true }
);

module.exports.emitter = progressEmitter;
