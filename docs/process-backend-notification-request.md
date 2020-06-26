# processBackendNotificationRequest

Out of all applicable notifications as returned by backend. Resolves one that applies mostly to user at given moment.

Logic depends purely on history of previously shown notifications.

```javascript
const processBackendNotificationRequest = require('@serverless/utils/process-backend-notification-request');

const notification = processBackendNotificationRequest(notifiations);

if (notification) printNotifiation(notifications);
```
