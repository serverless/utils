# log-reporters

Environment specific reporters

## log-reporters/node

Node.js based CLI dedicated reporter.

If intention is to display logs (as written with logging interfaces exposed at `log` util), this module needs to be loaded as one of the first things in the main process.

_CLI main module:_

```javascript
#!/usr/bin/env node

'use strict';

require('@serverless/utils/log-reporters/node');

// Now all written logs will be displayed in a console per SLS_LOG_LEVEL and SLS_LOG_DEBUG settings
```

### Log display mode

Currently we're in experimental mode and all modern logs are by default hidden. To expose them and at same time hide corresponding legacy mode set `SLS_DEV_LOG_MODE=3` environment variable.

### Modern logs

_Note: Modern logs are hidden by default. Ensure to enable them (as explained above) to have below settings applicable_

#### Log levels

For event logs, by default `debug` and `info` level logs are hidden.

To reveal all `info` logs (verbose mode) set `SLS_LOG_LEVEL=info` environment variable

To reveal all `info` and `debug` logs set `SLS_LOG_LEVEL=debug` environment variables.

Depending on triggered logic, debug logs can be very noisy, therefore instead of exposing all of them via `SLS_LOG_LEVEL=debug`, just specific namespaces can be revelead with `SLS_LOG_DEBUG=namespace1,namespece2,...` setting.
