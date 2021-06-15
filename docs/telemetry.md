## Utilities related to telemetry

```javascript
const telemetryUtils = require('@serverless/utils/telemetry');
```

Exposes following classes and methods:

### `StepHistory`

Helper class for recording step history for recording telemetry steps in Interactive CLI flow. It extends `Map` class by adding `timestamp` and wrapping value in an object with timestamp and offers `toJSON` method that formats map into JSON-serializable object, as well as `valuesMap` that returns `Map` object that maps original keys to provided `value`. It also offers `valuesMap` method, which just returns regular `Map` without `timestamp`.
