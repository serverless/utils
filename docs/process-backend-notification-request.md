# processBackendNotificationRequest

Out of all applicable notifications as returned by backend, resolves one that applies mostly to user at given moment for each of notification types. Currently backend will return only two types of notifications: `promotional` and `update`.

Logic depends purely on history of previously shown notifications.

```javascript
const processBackendNotificationRequest = require('@serverless/utils/process-backend-notification-request');

const notifications = processBackendNotificationRequest(notifiations);

printNotifiations(notifications);
```

## Notifications mode

Notifications presentation mode can be tweaked depending on given environment needs.

Check [Telemetry and notifications](https://www.serverless.com/framework/docs/telemetry#adjustingdisabling-notifications) documentation for details
