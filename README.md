# Serverless Utils

General serverless utilities for our projects.

This module is meant for use by serverless components, plugins as well as used by the core of serverless. It allows components and plugins to depend directly upon these utility methods and avoid issues when the core of serverless changes.

It also supplies a number of our basic utilities (data, error, fetch, fs, path, etc). We pull these utilities from here so that when we want to improve how one of these methods works we don't have to traverse through all of our code bases and change the imports.

[Website](https://serverless.com) • [Slack](https://serverless.com/slack) • [Newsletter](https://eepurl.com/b8dv4P) • [Forum](https://forum.serverless.com) • [Meetups](https://serverless.com/community/meetups/) • [Twitter](https://twitter.com/goserverless) • [We're Hiring](https://serverless.com/company/jobs/)

## Project Status
[![serverless](http://public.serverless.com/badges/v3.svg)](https://serverless.com)
[![Build Status](https://travis-ci.org/serverless/utils.svg?branch=master)](https://travis-ci.org/serverless/utils)
[![license](https://img.shields.io/npm/l/@serverless/utils.svg)](https://www.npmjs.com/package/@serverless/utils)
[![coverage](https://img.shields.io/codecov/c/github/serverless/utils.svg)](https://codecov.io/gh/serverless/utils)


## Documentation

Please review the [API](./docs/API.md) documentation.


## Install
```sh
npm install --save @serverless/utils
```

## Usage
```js
import { reduce } from '@serverless/utils'

const array = [ 'foo', 'bar' ]
const result = reduce(
  (acc, val) => acc + val,
  '',
  array
)

console.log(result) //=> 'foobar'
```
