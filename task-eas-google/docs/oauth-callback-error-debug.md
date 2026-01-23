# Debugging OAuth Callback Failure

## Error Message
"Something went wrong trying to finish signing in. Please close this screen to go back to the app."

This error occurs during the OAuth callback phase, after the user has granted permissions.

## Common Causes

1. **Redirect URI mismatch** - Most common
2. **Invalid authorization code**
3. **PKCE verification failure**
4. **Token exchange failure**

## Immediate Actions

### 1. Check Console Logs

Look for these specific log messages in Metro:

```
🔐 Starting Google Drive authentication...
Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
📋 Auth result type: [what does it say here?]
```

**What to look for**:
- Does it say `type: error`?
- Does it say `type: cancel`?
- Does it say `type: success`?
- Any error details?

### 2. Verify Redirect URI Configuration

**Double-check Google Cloud Console**:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find client: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`
3. Check "Authorized redirect URIs" section
4. Must have EXACTLY: `https://auth.expo.io/@elyscom/new-taskmanager`

**Common mistakes**:
- ❌ `https://auth.expo.io/@elyscom/new-taskmanager/` (trailing slash)
- ❌ `https://auth.expo.io/@elycom/new-taskmanager` (typo in username)
- ❌ `https://auth.expo.io/@elyscom/new-task-manager` (hyphen instead of no hyphen)
- ✅ `https://auth.expo.io/@elyscom/new-taskmanager` (correct)

### 3. Check App Configuration

Verify your `app.json`:
- Owner: `elyscom`
- Slug: `new-taskmanager`

These MUST match the redirect URI.

## Next Steps

Please provide the console logs from Metro so I can see the exact error.
