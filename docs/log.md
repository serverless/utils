# log

## Log and general output writing utilities

### Main function (considered as _legacy interface_)

_Note: This function is scheduled to be removed at some point in a future, per work specified at [serverless#9860](https://github.com/serverless/serverless/issues/9860)_

The purpose of `log` is to provide a unified way to emit formatted logs. It outputs messages in form of `<entity>: <formatted message>\n`.

By default, `entity` is set to `Serverless`, but it can be customized. In addition, it supports bolding, underlining and allows to customize colors, as supported by [chalk](https://github.com/chalk/chalk).

```javascript
const log = require('@serverless/utils/log);
```

#### `log(message)`

Log message with default formatting

#### `log(message, { bold: true })`

Log bolded message

#### `log(message, { underline: true })`

Log underlined message

#### `log(message, { color: 'red' })`

Log message with custom color

#### `log(message, { entity: 'Custom' })`

Log message with custom entity

#### `log(message, { entity: null })`

Log message with disabled entity, outputs messages in form of `<formatted message>\n`

### `legacy` interface (for logs to be shown conditionally)

_Note: This interface is scheduled to be removed at some point in a future, per work specified at [serverless#9860](https://github.com/serverless/serverless/issues/9860)_

Interface dedicated for logs, which have modern logs counterpart configured.

#### `legacy.write(message)`

_Dedicated to replace current `process.stdout.write` usage (in places where alternative corresponding log messages were configured with modern interface)_

_This function is expected to be overriden into no-op if instruction is to output only logs as configured with modern interface_

When expected to be in effect, works exactly as `process.stdout.write`

#### `legacy.consoleLog(message)`

_Dedicated to replace current `serverless.cli.consoleLog` usage (in places where alternative corresponding log messages were configured with modern interface)_

When expected to be in effect, works exactly as `` process.stdout.write(`${message}\n`) ``

#### `legacy.log(message)`

_Dedicated to replace current `serverless.cli.log` and `@serverles/utils/log` usage (in places where alternative corresponding log messages were configured with modern interface)_

When expected to be in effect, works exactly as main log functions (as exported by this module directly)

### `log` Event logging interface

_Note this part of an API is still experimental and subject to changes (not advertised to be used by external plugins)_

An instance of [log](https://github.com/medikoo/log) message logger, namespaced to `serverless`, which allows to write messages at different log levels and allows further namespacing of them.

Basic API exposes:

- `debug`, `info`, `notice`, `warn`, `error` - functions to write messages at given levels
- `get` - Function to obtain additionally namespaced logger (e.g. `log.get('aws-deploy'))` will return a logger additionally namespace to `aws-deploy` (full namespace will be `serverless:aws-deploy`). Returned logger shares same interface as described in this points
