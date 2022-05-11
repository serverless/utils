## Serverless Inc. API request

### `apiRequest(pathname)`

Issue a request to Serverless Inc. API.

At this point only basic GET requests are supported

```javascript
const apiRequest = require('@serverless/utils/api-request');

const { orgId: myOrgId } = await apiRequest('/orgs/name/my-org-name');
```
