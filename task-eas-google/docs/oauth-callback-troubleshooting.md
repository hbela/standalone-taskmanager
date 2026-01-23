# OAuth Callback Error - Troubleshooting Guide

## Error Message
"Something went wrong trying to finish signing in. Please close this screen to go back to the app."

This error appears in the browser/WebView after you grant permissions to Google Drive.

## Root Cause Analysis

This error occurs during the **OAuth callback phase** when:
1. User grants permissions ✅
2. Google redirects back to your app ❌ **FAILS HERE**
3. App exchanges authorization code for access token

## Most Common Causes (in order)

### 1. Redirect URI Mismatch (90% of cases)

**Problem**: The redirect URI in Google Cloud Console doesn't exactly match what the app is using.

**Your app is using**: `https://auth.expo.io/@elyscom/new-taskmanager`

**Check Google Cloud Console**:
1. Go to: https://console.cloud.google.com/apis/credentials
2. Find OAuth client: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`
3. Click Edit (pencil icon)
4. Scroll to "Authorized redirect URIs"
5. **Must have EXACTLY**: `https://auth.expo.io/@elyscom/new-taskmanager`

**Common mistakes**:
```
❌ https://auth.expo.io/@elyscom/new-taskmanager/     (trailing slash)
❌ https://auth.expo.io/@elyscom/new-task-manager     (hyphen)
❌ https://auth.expo.io/@elycom/new-taskmanager       (typo in username)
❌ http://auth.expo.io/@elyscom/new-taskmanager       (http instead of https)
✅ https://auth.expo.io/@elyscom/new-taskmanager      (CORRECT)
```

### 2. OAuth Consent Screen Not Configured

**Problem**: OAuth consent screen is incomplete or has restrictions.

**Check**:
1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Verify the consent screen is configured
3. If in "Testing" mode:
   - Add your Google account as a test user
   - Or publish to "Production"

### 3. Google Drive API Not Enabled

**Problem**: The API isn't enabled for your project.

**Check**:
1. Go to: https://console.cloud.google.com/apis/library/drive.googleapis.com
2. Should show "API enabled"
3. If not, click "ENABLE"

### 4. Client ID Mismatch

**Problem**: The Client ID in your .env doesn't match Google Cloud Console.

**Check your .env**:
```env
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
```

**Verify in Google Cloud Console**:
- The Client ID should be exactly the same

## Step-by-Step Verification

### Step 1: Verify Google Cloud Console Configuration

**Redirect URI**:
1. Go to: https://console.cloud.google.com/apis/credentials
2. Find: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`
3. Click Edit
4. Under "Authorized redirect URIs", verify you have:
   ```
   https://auth.expo.io/@elyscom/new-taskmanager
   ```
5. If not there, add it and click SAVE

**JavaScript Origin**:
1. Under "Authorized JavaScript origins", verify you have:
   ```
   https://auth.expo.io
   ```
2. If not there, add it and click SAVE

**IMPORTANT**: After adding/changing URIs, wait 1-2 minutes for changes to propagate.

### Step 2: Verify OAuth Consent Screen

1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Check the status:
   - **Testing**: Add your Google account under "Test users"
   - **In production**: Should work for all users
3. Verify scopes include Google Drive

### Step 3: Verify Google Drive API

1. Go to: https://console.cloud.google.com/apis/library/drive.googleapis.com
2. Should show "API enabled"
3. If not, click ENABLE

### Step 4: Check Console Logs

Look at Metro bundler console for these logs:

**What you should see**:
```
🔐 Starting Google Drive authentication...
Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
📋 Auth result type: success
✅ Auth code received, exchanging for token...
✅ Google Drive authentication successful
```

**If you see an error**:
```
📋 Auth result type: error
❌ Authentication failed with type: error
Error details: { ... }
```

**Copy the error details** and share them.

### Step 5: Test with Fresh Token

Clear any cached tokens:

```typescript
// Add this to your app temporarily
import { clearGoogleDriveToken } from './lib/export/googleDriveService';
await clearGoogleDriveToken();
console.log('Token cleared');
```

Then try the export again.

## Specific Error Messages

### "redirect_uri_mismatch"
**Console shows**: `Error details: { message: "redirect_uri_mismatch" }`
**Solution**: Add the exact redirect URI to Google Cloud Console

### "invalid_client"
**Console shows**: `Error details: { message: "invalid_client" }`
**Solution**: Verify Client ID in .env matches Google Cloud Console

### "access_denied"
**Console shows**: `Error details: { message: "access_denied" }`
**Solution**: 
- Add your Google account as test user
- Or publish OAuth consent screen to production

### "Something went wrong" (in browser, no console error)
**This is your current error**
**Most likely cause**: Redirect URI mismatch
**Solution**: 
1. Double-check redirect URI in Google Cloud Console
2. Wait 1-2 minutes after saving changes
3. Clear app cache and try again

## Advanced Debugging

### Check the Actual Redirect URI Being Used

Add this log to `googleDriveService.ts` line 51:

```typescript
console.log('🔍 Using redirect URI:', redirectUri);
console.log('🔍 Using client ID:', clientId);
```

This will show you exactly what the app is sending to Google.

### Check Browser URL

When the error appears in the browser, look at the URL bar. It might contain error information:

```
https://auth.expo.io/@elyscom/new-taskmanager?error=...&error_description=...
```

Copy the entire URL and share it (remove any sensitive tokens first).

## Quick Fix Checklist

- [ ] Redirect URI in Google Cloud Console: `https://auth.expo.io/@elyscom/new-taskmanager`
- [ ] JavaScript origin in Google Cloud Console: `https://auth.expo.io`
- [ ] No trailing slashes in URIs
- [ ] Exact spelling (elyscom, new-taskmanager)
- [ ] Google Drive API enabled
- [ ] OAuth consent screen configured
- [ ] Test user added (if in Testing mode)
- [ ] Client ID in .env matches Google Cloud Console
- [ ] Waited 1-2 minutes after saving changes
- [ ] Cleared cached tokens
- [ ] Restarted Metro bundler

## Still Not Working?

### Provide These Details:

1. **Console logs** from Metro (especially the error details)
2. **Screenshot** of Google Cloud Console OAuth client configuration
3. **Browser URL** when the error appears
4. **OAuth consent screen** status (Testing or Production)
5. **Test users** added (if in Testing mode)

### Try Alternative: Use makeRedirectUri

If the hardcoded redirect URI isn't working, we can try using `makeRedirectUri`:

```typescript
// In googleDriveService.ts, replace line 39 with:
redirectUri: AuthSession.makeRedirectUri({
  scheme: 'new-taskmanager',
  path: 'redirect'
}),
```

Then add this redirect URI to Google Cloud Console:
```
new-taskmanager://redirect
```

## Summary

**Most likely issue**: Redirect URI mismatch in Google Cloud Console  
**Quick fix**: Verify and add exact URI: `https://auth.expo.io/@elyscom/new-taskmanager`  
**Wait time**: 1-2 minutes after saving changes  
**Next step**: Share console logs if still failing  
