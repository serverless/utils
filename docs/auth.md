## Serverless Inc. authentication utilities

### `login`

Initialize login session (which opens login window in a browser). After user logs in, CLI receives refresh token, which in furtger turn can be used to [retrieve short living id tokens (for further interaction with Serverless Inc. API)](#resolveidtoken)

```javascript
const login = require('@serverless/utils/auth/login');
...
await login();
// User logged in successfully
```

### `logout`

Logout (clear stored refresh token). Returns `true` if there was a logged in user, `false` in case of no-op.

```javascript
const logout = require('@serverless/utils/auth/logout');
...
logout();
// No logged in user
```

### `resolveIdToken`

Resolve valid `idToken` required for any exchange with Serverless Inc. API.
Once resolved, tokens are cached for instant resolution until they expire.

_Note: Resolved token should never be stored in outer logic. In all cases all calls to API should hit this utility directly to retrieve the id token._

Token is resolved either via _refresh token_ stored for logged-in CLI users or is assumed from `SLS_ORG_TOKEN` environment variable where in CI/CD cases non expiring token is expected to be provided

```javascript
const resolveIdToken = require('@serverless/utils/auth/resolve-id-token');
...
const responseData = await someServerlessIncApiCall.request({
  idToken: await resolveIdToken()
});
```

### `getOrgId`

Resolve _org id_ for provided _org name_ (which in regular case should be read from service `org` setting, or `org` CLI param).

Request will fail if logged in user does not belong to passed org.

_Org id_ is needed for CLI communication with Console backend

```javascript
const getOrgId = require('@serverless/utils/auth/get-org-id');
...
const orgId = await getOrgId(orgName)
```

### `isAuthenticated`

Confirm wether user is logged in (we have access to valid `idToken`)

```javascript
const isAuthenticated = require('@serverless/utils/auth/is-authenticated');
...
if (await isAuthenticated()) console.log("User logged in");
else console.log("No user logged in");
```
