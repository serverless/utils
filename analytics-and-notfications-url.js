'use strict';

const isInChina = require('./is-in-china');

module.exports = isInChina
  ? 'https://service-9p6tdp4y-1300963013.gz.apigw.tencentcs.com/release/'
  : null;
