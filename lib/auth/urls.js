'use strict';

const config = new Map([
  [
    'dev',
    {
      backend: 'https://core.serverless-dev.com',
      frontend: 'https://console.serverless-dev.com',
    },
  ],
  [
    'prod',
    {
      backend: 'https://core.serverless.com',
      frontend: 'https://console.serverless.com',
    },
  ],
]);

const stage = config.has(process.env.SERVERLESS_PLATFORM_STAGE)
  ? process.env.SERVERLESS_PLATFORM_STAGE
  : 'prod';

module.exports = config.get(stage);
