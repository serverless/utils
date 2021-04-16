# cloudformationSchema

## Utilities for js-yaml library use with AWS cloudformation specific YAML types

YAML schema including AWS Cloudformation specific short-hand syntaxes (i.e. `!Ref` or `!GetAtt`).
It can then be passed as option to `js-yaml` library `load` method:

```javascript
const yaml = require('js-yaml');
const fs   = require('fs');
const cloudFormationSchema = require('@serverless/utils/cloudformationSchema');

yaml.load(fs.readFileSync('serverless.yml', { schema: cloudformationSchema });
```

## !merge tag

This schema also defines the `!merge` tag, which takes a `sequence` of either objects or arrays.

When the provided sequence is a list of arrays, the arrays are concatenated together to form a
single array.

When the provided sequence is a list of objects, the objects are merged into a single object.
Duplicate keys will result in an error being thrown to avoid accidental overwriting.
