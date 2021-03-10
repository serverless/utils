'use strict';

if (process.env.SLS_ANALYTICS_URL) {
  module.exports = process.env.SLS_ANALYTICS_URL;
  return;
}

const isInChina = require('./is-in-china');

module.exports = isInChina
  ? 'https://service-9p6tdp4y-1300963013.gz.apigw.tencentcs.com/release/'
  : 'https://sp-notifications-and-metrics-v1.serverless-platform.com';
