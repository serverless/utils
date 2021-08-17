# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [5.7.0](https://github.com/serverless/utils/compare/v5.6.0...v5.7.0) (2021-08-17)

### Features

- Introduce `get-notifications-mode` util ([#100](https://github.com/serverless/utils/pull/100)) ([a1585c9](https://github.com/serverless/utils/commit/a1585c971d821fc53c4238b35dc50a041652f27b)) ([Piotr Grzesik](https://github.com/pgrzesik))

## [5.6.0](https://github.com/serverless/utils/compare/v5.5.0...v5.6.0) (2021-07-21)

### Features

- Recognize continue prompts in history with `_continuation_` ([#94](https://github.com/serverless/utils/pull/94)) ([5cd0414](https://github.com/serverless/utils/commit/5cd04148e066b80c2135edf9eb05fb4fb5b09e56)) ([Piotr Grzesik](https://github.com/pgrzesik))

## [5.5.0](https://github.com/serverless/utils/compare/v5.4.0...v5.5.0) (2021-07-20)

### Features

- Add `prompt-with-history` ([#92](https://github.com/serverless/utils/pull/92)) ([7f094ef](https://github.com/serverless/utils/commit/7f094ef659f9295884c5679c398f609da8dd1ba7)) ([Piotr Grzesik](https://github.com/pgrzesik))
- Add support for recording `startedAt` and `finalizedAt` in `StepHistory` ([#92](https://github.com/serverless/utils/pull/92)) ([483cb08](https://github.com/serverless/utils/commit/483cb082eaa9d049d862554e6a7d6290031d58db)) ([Piotr Grzesik](https://github.com/pgrzesik))

## [5.4.0](https://github.com/serverless/utils/compare/v5.3.0...v5.4.0) (2021-07-16)

### Features

- **Backend notifications resolver:**
  - Introduce alternative notifications mode settings ([#90](https://github.com/serverless/utils/pull/90)) ([d3ffc7a](https://github.com/serverless/utils/commit/d3ffc7aac78e8a3adf0d2a126c2ba8e2df2592f6)) ([Mariusz Nowak](https://github.com/medikoo))
  - Support forcing display of notifications ([#90](https://github.com/serverless/utils/pull/90)) ([84c9599](https://github.com/serverless/utils/commit/84c9599864f288389101e8876aba4b8ac6683493)) ([Mariusz Nowak](https://github.com/medikoo))

## [5.3.0](https://github.com/serverless/utils/compare/v5.2.0...v5.3.0) (2021-06-15)

### Features

- Add `StepHistory` class in `telemetry` ([#88](https://github.com/serverless/utils/pull/88)) ([20b8df5](https://github.com/serverless/utils/commit/20b8df5ba5ec71328930290348ddd99f0938145a)) ([Piotr Grzesik](https://github.com/pgrzesik))

## [5.2.0](https://github.com/serverless/utils/compare/v5.1.0...v5.2.0) (2021-05-27)

### Features

- Support disabling entity in `log` util ([#86](https://github.com/serverless/utils/pull/86)) ([df601f5](https://github.com/serverless/utils/commit/df601f5aca5ea7a3ecd8e9a8ddde9f233864acc1)) ([Piotr Grzesik](https://github.com/pgrzesik))

## [5.1.0](https://github.com/serverless/utils/compare/v5.0.0...v5.1.0) (2021-05-19)

### Features

- Add `download` util ([#84](https://github.com/serverless/utils/pull/84)) ([888a583](https://github.com/serverless/utils/commit/888a58328099f1860fac8305fe32bb05325f039a)) ([Piotr Grzesik](https://github.com/pgrzesik))

## [5.0.0](https://github.com/serverless/utils/compare/v4.1.0...v5.0.0) (2021-05-12)

### ⚠ BREAKING CHANGES

- Inquirer prompt will have no prefix instead of `Serverless:`. If you wish, to still use `Serverless:` prefix, override it on the client side.

### Features

- Remove `Serverless:` prefix from `inquirer` ([#82](https://github.com/serverless/utils/pull/82)) ([edb8593](https://github.com/serverless/utils/commit/edb8593fbd2524c3ba0e08fc1e143eb872cf9b86)) ([Piotr Grzesik](https://github.com/pgrzesik))

## [4.1.0](https://github.com/serverless/utils/compare/v4.0.1...v4.1.0) (2021-04-20)

### Features

- Allow disabling backend notifications via `SLS_NOTIFICATIONS_MODE` env var ([#80](https://github.com/serverless/utils/pull/80)) ([e822033](https://github.com/serverless/utils/commit/e822033a4025415cc076f3bb367e1dea9bec28f1)) ([Piotr Grzesik](https://github.com/pgrzesik))

## [4.0.1](https://github.com/serverless/utils/compare/v4.0.0...v4.0.1) (2021-04-01)

### Features

- Add a dev env metrics url for China user

## [4.0.0](https://github.com/serverless/utils/compare/v3.1.0...v4.0.0) (2021-03-11)

### ⚠ BREAKING CHANGES

- Expose analytics server URL unconditionally (and not just in non-CI environments). It is breaking as it might impact how analytics reporting works in older version of the Framework and might pollute data with unexpected events coming from CI deployments. Additonally, it will cause notifications to be triggered in CI environments as well.

### Features

- Expose analytics server URL unconditionally (and not just in non-CI environments) ([#76](https://github.com/serverless/utils/pull/76)) ([9f7143e](https://github.com/serverless/utils/commit/9f7143e8bdc5f036251ca4f6b54e7292c0803648)) ([Piotr Grzesik](https://github.com/pgrzesik))

## [3.1.0](https://github.com/serverless/utils/compare/v3.0.0...v3.1.0) (2021-01-29)

### Features

- Add account-related methods ([#73](https://github.com/serverless/utils/pull/73)) ([c77df3c](https://github.com/serverless/utils/commit/c77df3ccf45e96b790ef508a50939ce29394eded)) ([Piotr Grzesik](https://github.com/pgrzesik))

## [3.0.0](https://github.com/serverless/utils/compare/v2.2.0...v3.0.0) (2021-01-26)

### ⚠ BREAKING CHANGES

- **Config:**
  - Removed `getGlobalConfig`
  - Removed support for all `rc`-discoverable files (only supports local folder, `~/` and `~/.config` locations)
  - Update will modify local configuration file if found, otherwise it will modify global (previously it always modified global config)

### Features

- **Config:** Introduce new config resolution ([#70](https://github.com/serverless/utils/pull/70)) ([3bff1b4](https://github.com/serverless/utils/commit/3bff1b4fe70e0d011ddb185f3fe6b206ced03aad)) ([Piotr Grzesik](https://github.com/pgrzesik))

## [2.2.0](https://github.com/serverless/utils/compare/v2.1.0...v2.2.0) (2021-01-05)

### Features

- `cloudformationSchema` util ([#66](https://github.com/serverless/utils/issues/66)) ([74adfa8](https://github.com/serverless/utils/commit/74adfa8d5a59f4838cd9c59d0b049ed12d5daa38)) ([Frédéric Barthelet](https://github.com/fredericbarthelet))

## [2.1.0](https://github.com/serverless/utils/compare/v2.0.0...v2.1.0) (2020-12-22)

### Features

- Add general logging utility ([#63](https://github.com/serverless/utils/issues/63)) ([58ccc3c](https://github.com/serverless/utils/commit/58ccc3c0ec741ce173982eb4b897cca2af6135b6)) ([Piotr Grzesik](https://github.com/pgrzesik))

### Bug Fixes

- Ensure that getConfig falls back to getGlobalConfig on error ([#62](https://github.com/serverless/utils/pull/62)) ([4f1251d](https://github.com/serverless/utils/commit/4f1251dc0500bb6f8c357832f243ca0524476fd9)) ([Piotr Grzesik](https://github.com/pgrzesik))
- Ensure that invalid user config is handled gracefully ([#62](https://github.com/serverless/utils/pull/62)) ([9537df2](https://github.com/serverless/utils/commit/9537df2b06bb7560ff0f0ad8f5dc4779cfcf9332)) ([Piotr Grzesik](https://github.com/pgrzesik))

## [2.0.0](https://github.com/serverless/utils/compare/v1.2.0...v2.0.0) (2020-09-21)

### ⚠ BREAKING CHANGES

- Node.js version 10 or later is required (dropped support for v6 and v8)

### Features

- Integrate @serverless/inquirer project ([#59](https://github.com/serverless/utils/pull/59)) ([3fc274a](https://github.com/serverless/utils/commit/3fc274a413ac04f34daee2abeff1b969686182c6)) ([Mariusz Nowak](https://github.com/medikoo))
- Drop support for Node.js v8 ([6cba266](https://github.com/serverless/utils/commit/6cba266861c9c55e4e897f896bb76cd265b0f80a)) ([Mariusz Nowak](https://github.com/medikoo))

## [1.2.0](https://github.com/serverless/utils/compare/v1.1.0...v1.2.0) (2020-06-26)

### Features

- Smarter notification resolution logic, also with support for unconditional notifications ([#56](https://github.com/serverless/utils/pull/56)) ([6329b1a](https://github.com/serverless/utils/commit/6329b1a03ce1ed57c8c922ea021a26f911d6e5c3)) ([Mariusz Nowak](https://github.com/medikoo))
- Configure AWS metrics URL ([#56](https://github.com/serverless/utils/pull/56)) ([c271b3f](https://github.com/serverless/utils/commit/c271b3f0a0e0901a3c45d5726c3e32b54a5a36ba)) ([Mariusz Nowak](https://github.com/medikoo))
- Provide eventual fallback to extended response format ([#56](https://github.com/serverless/utils/pull/56)) ([86ddb95](https://github.com/serverless/utils/commit/86ddb9575d635cdcf326436fe571cc1b2c5818b7)) ([Mariusz Nowak](https://github.com/medikoo))

## [1.1.0](https://github.com/serverless/utils/compare/v1.0.0...v1.1.0) (2020-06-15)

### Features

- **Analytics & Notifications URL**
  - By default do not expose analytics url in CI environment ([05ea565](https://github.com/serverless/utils/commit/05ea565a1642a9da10cb4770ef75ae70c4443a22)) ([Mariusz Nowak](https://github.com/medikoo))
  - Support override of analytics url via `SLS_ANALYTICS_URL` env var ([66ff290](https://github.com/serverless/utils/commit/66ff290a5c06b1b082e377eb3d8ead46b42c4f95)) ([Mariusz Nowak](https://github.com/medikoo))

### [1.0.0](https://github.com/serverless/utils/compare/v0.0.20...v1.0.0) (2020-06-12)

A new beginning. All old utilities were removed. Project now serves high level utilities for Serverless Framework and Component CLI's

### Features

- `analyticsAndNotificationsUrl` util ([b581cef](https://github.com/serverless/utils/commit/b581cef03961a0ee29e2fc9da577a7c0e600e915))
- `config` util ([aeb48d5](https://github.com/serverless/utils/commit/aeb48d58dab279e8c84db2f84b3515ba71815575))
- `isInChina` util ([c457d8c](https://github.com/serverless/utils/commit/c457d8c4e9829d9ab6d38a84e0f7c41809379f43))
- `processBackendNotificationRequest` util ([5249e2b](https://github.com/serverless/utils/commit/5249e2b9a09e72126382e902abeea38d9a089398))
