# log

## General logging utility

The purpose of `log` is to provide a unified way to emit formatted logs. It outputs messages in form of `<entity>: <formatted message>\n`.

By default, `entity` is set to `Serverless`, but it can be customized. In addition, it supports bolding, underlining and allows to customize colors, as supported by [chalk](https://github.com/chalk/chalk).

```javascript
const log = require('@serverless/utils/log);
```

### `log(message)`

Log message with default formatting

### `log(message, { bold: true })`

Log bolded message

### `log(message, { underline: true })`

Log underlined message

### `log(message, { color: 'red' })`

Log message with custom color

### `log(message, { entity: 'Custom' })`

Log message with custom entity

### `log(message, { entity: null })`

Log message with disabled entity, outputs messages in form of `<formatted message>\n`
