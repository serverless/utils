# config

## Handler of user config files (stored in `.sererlessrc`)

By default config is stored in home directory, but user may host it in any other location as supported by [rc search rules](https://github.com/dominictarr/rc#standards)

Ensures no exception on eventual access issues (altough errors are logged with `SLS_DEBUG` env var on).

```javascript
const config = require('@serverless/utils/config');
```

Exposes following _sync_ access methods:

### `get(propertyPath)`

Retrieve stored property

### `set(propertyPath, value)`

Store given property (can be any JSON value)

### `delete(propertyPath)`

Delete given property

### `getConfig()`

Returns whole structure of config file

### `getGlobalConfig()`

Returns whole structure of global `~/.serverlessrc` config
