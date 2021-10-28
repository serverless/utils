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

- `debug`, `info` (aliased with `verbose`), `notice`, `warn`, `error` - functions to write messages at given levels
- `get` - Function to obtain additionally namespaced logger (e.g. `log.get('aws-deploy'))` will return a logger additionally namespace to `aws-deploy` (full namespace will be `serverless:aws-deploy`). Returned logger shares same interface as described in this points

#### Special log events

Special log events which are subject to dedicated decoration:

- `log.notice.success` (aliased with `log.success`) - To inform on success of command major operation
- `log.notice.skip` - To inform that intention is already fulfilled and there's nothing to do

### Environment characteristics

Ideally we should not deal with a situation where characteristics of environment influence how log messages are constructed.
Still we cannot seclude scenario where intention will be to e.g. show some messages exchangably depending on wether we're in verbose mode or not. It's the reason below interface was introduced, they should be used as last resort.

- `logLevelIndex` - Index of used log level (An array index from [levels](https://github.com/medikoo/log/blob/master/levels.json) list)
- `isVerboseMode` - Whether we're in verbose mode or not (verbose mode is assumed if log level is set to _info_ or _debug_)
- `isInteractive` - Whether we're in context of interactive terminal

### `writeText(textToken, ..textTokens)` Interface to write final outcome of the command

_Note this part of an API is still experimental and subject to changes (not advertised to be used by external plugins)_

Function through which output as returned by command should be written.

It's not about any progress notifications but about substantial output as expected to be eventually returned by the command, e.g. `sls print` returns content of service configuration, `sls invoke` returns result as returned by invoked lambda, `sls deploy` returns generated (or updated) deployment outputs.

This function by default is no-op. Main module of a process is expected to override it if intention is to write the output to the console (or other mean, depending on the environment)

```javascript
const { writeText } = require('@serverless/utils/log');

writeText('Command result');

// Multiline results can be pased with different text tokens (each will be presented on new line)
writeText('Command multiline result', 'Second line', 'Third line');

// Lines of texts can also injected with arrays (they're recursively flattened)
writeText(['Command multiline result', 'Second line', 'Third line']);
```

### `progress` Interface to report dynamic progress updates on ongoing operations

_Note this part of an API is still experimental and subject to changes (not advertised to be used by external plugins)_

#### `progress.get(name)`

Returns named progress interface dedicated for single ongoing operation. Any updates reported in its context will override previous updates.

For given `name`, always same progress instance is returned

#### `progress.create(options)`

Returns newly created progress interface dedicated for single ongoing operation. Any updates reported in its context will override previous updates.

Supported options:

- `name`: Name for progress Running `progress.create({ name })` is equivalent to `progress.get(name)`, with only difference that `create` will throw if given progress already exists
- `message`: Initial progress message to print

Initial progress message can be configured with `message` option

_`progress.get(name)` and `progress.create()` return object which exposes three methods:_

##### `info(text, options = {})` & `notice(text, options = {})` (aliased by `update(text, options = {})`)

Write progress update on given item. Each update will overwrite previous update. Updates written with `info` will only be presented with _verbose_ mode (either `info` or `debug` log level visibility applied).

Options are supported only in case of main progress (described below)

##### `remove()`

Clear operation from progress bar (calling it means that processing of it ended)

#### `progress.get('main')`

Returns special instance of progress item, dedicated to cover progress of a complete command. It shares same interface as above, but (through reporter implementation) it behaves differently:

- It's guaranteed to always be displayed at the top
- Time counter is displayed aside of it (starting counting from first write)
- It's not removed until command ends processing (`remove` is not effective, progress is cleared only after `progress.clear`)
- Supports `isMainEvent` option. If set to true. Given progress event will also be reflected as verbose log

#### `progress.clear()`

Clears all the progress and prevents further writing to it.

_Note: Not exposed to plugins and not intended to be used in their context_

### `getPluginWriters(pluginName)` Get log & output writing functions dedicated for external plugins

_Note this part of an API is still experimental and subject to changes (not advertised to be used by external plugins)_

Returns `{ log, writeText, progress }` interface, same as one documented above (excluding `progress.clear`), but dedicated to be used in context of external (named via `pluginName`) plugins. Calling function again, with same plugin name, will return previously created interface.

### `style` Style decorators

_Note this part of an API is still experimental and subject to changes (not advertised to be used by external plugins)_

Decorators that ensure that in given environment intended style can be reproduced. Multiline input can be pased with different text tokens (each will be presented on new line)

Available style functions:

- `aside(text, ...textTokens)` - for messsage side content
- `noticeSymbol(text, ...textTokens)` - for symbols shown aside of regular notifications
- `warning(text, ...textTokens)` - for warnings
- `error(text, ...textTokens)` - for errors
