# Google Drive Export - Fix Summary

## Problem
Google Drive authentication was failing with error:
```
ERROR  ❌ Google Drive Authentication Error: [Error: Authentication cancelled or failed]
LOG  Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
```

## Root Causes Identified

### 1. Code Bug: Duplicate `promptAsync` Call ✅ FIXED
**Location**: `lib/export/googleDriveService.ts` line 71-73

**Issue**: The authentication function was calling `promptAsync` twice:
```typescript
await authRequest.promptAsync(discovery);  // First call (not properly awaited)
const result = await authRequest.promptAsync(discovery);  // Second call
```

This caused the authentication flow to fail because the first call interfered with the second.

**Fix Applied**: Removed the duplicate call, keeping only one:
```typescript
const result = await authRequest.promptAsync(discovery);
```

### 2. Google Cloud Console Configuration ⚠️ NEEDS VERIFICATION
The redirect URI must be properly configured in Google Cloud Console.

## Changes Made

### ✅ Fixed Files

1. **`lib/export/googleDriveService.ts`**
   - Removed duplicate `promptAsync` call
   - Enhanced error logging with detailed error types and messages
   - Better error propagation to show specific failure reasons

2. **Created Documentation**
   - `docs/google-drive-oauth-setup.md` - Setup guide
   - `docs/google-drive-troubleshooting.md` - Comprehensive troubleshooting guide

3. **Created Debug Utilities**
   - `utils/debugGoogleDrive.ts` - Token management utilities
   - `utils/testGoogleDrive.ts` - Authentication testing functions

## Next Steps - ACTION REQUIRED

### Step 1: Configure Google Cloud Console 🔧

You **MUST** configure your Google OAuth client properly:

#### Option A: Web Client (Quick Setup)
1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your Web OAuth client: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`
3. Click **Edit**
4. Under **Authorized redirect URIs**, add:
   ```
   https://auth.expo.io/@elyscom/new-taskmanager
   ```
5. Under **Authorized JavaScript origins**, add:
   ```
   https://auth.expo.io
   ```
6. Click **Save**

#### Option B: Android Client (Recommended for Production)
1. Create new OAuth client
2. Type: **Android**
3. Package name: `com.taskmanager.app`
4. SHA-1: `B4:89:CC:E0:56:D5:4F:5C:54:8D:D0:3F:32:96:7D:E9:7F:21:7B:7E`
5. Update `.env`:
   ```env
   EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=YOUR_NEW_ANDROID_CLIENT_ID
   ```

### Step 2: Enable Google Drive API 🔧
1. Go to: https://console.cloud.google.com/apis/library
2. Search: "Google Drive API"
3. Click **ENABLE** (if not already enabled)

### Step 3: Verify OAuth Consent Screen 🔧
1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. If app is in "Testing" mode:
   - Add your Google account as a test user
   - Or publish the app to "Production"

### Step 4: Clear Cached Token and Test 🧪

After configuring Google Cloud Console:

1. **Clear the cached token**:
   ```typescript
   // Add this temporarily to your app
   import { clearGoogleDriveToken } from './lib/export/googleDriveService';
   await clearGoogleDriveToken();
   ```

2. **Restart Metro**:
   ```bash
   # Kill all node processes
   Get-Process -Name node | Stop-Process -Force
   
   # Start fresh
   npx expo start --clear
   ```

3. **Test the export**:
   - Open your app
   - Go to tasks screen
   - Click the Export button
   - Complete the Google sign-in flow
   - Watch console logs for detailed error messages

## Expected Behavior After Fix

### Success Flow:
```
🔐 Starting Google Drive authentication...
Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
📋 Auth result type: success
✅ Auth code received, exchanging for token...
✅ Google Drive authentication successful
📤 Starting upload to Google Drive...
File: tasks_export_2026-01-23.xlsx
✅ File uploaded successfully to Google Drive
File ID: 1abc...xyz
```

### If Still Failing:

The enhanced error logging will now show:
```
📋 Auth result type: error
❌ Authentication failed with type: error
Error details: { message: "redirect_uri_mismatch" }
```

This tells you exactly what's wrong:
- `redirect_uri_mismatch` → Add redirect URI to Google Cloud Console
- `invalid_client` → Check Client ID in `.env`
- `access_denied` → Check OAuth consent screen settings

## Testing Tools

### Debug Authentication Status
```typescript
import { debugGoogleDriveAuth } from './utils/debugGoogleDrive';
await debugGoogleDriveAuth();
```

### Test Authentication Flow
```typescript
import { testGoogleDriveAuth } from './utils/testGoogleDrive';
await testGoogleDriveAuth();
```

### Clear Token
```typescript
import { clearGoogleDriveAuth } from './utils/testGoogleDrive';
await clearGoogleDriveAuth();
```

## Configuration Checklist

Before testing, verify:

- [ ] Code fix applied (duplicate `promptAsync` removed)
- [ ] Google Drive API enabled in Google Cloud Console
- [ ] Redirect URI added to OAuth client: `https://auth.expo.io/@elyscom/new-taskmanager`
- [ ] JavaScript origin added (if using Web client): `https://auth.expo.io`
- [ ] Client ID in `.env` matches Google Cloud Console
- [ ] OAuth consent screen configured
- [ ] Test user added (if app in Testing mode)
- [ ] Cached token cleared
- [ ] Metro restarted with `--clear` flag

## Current Configuration

**Expo Configuration**:
- Owner: `elyscom`
- Slug: `new-taskmanager`
- Package: `com.taskmanager.app`

**OAuth Configuration**:
- Redirect URI: `https://auth.expo.io/@elyscom/new-taskmanager`
- Client ID (from .env): `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com`

**Environment Variables**:
```env
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_SECRET=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
```

⚠️ **Note**: Client Secret is not needed for mobile OAuth and should not be included in the app. It's only used for server-side OAuth flows.

## Support Resources

- [Google OAuth Setup Guide](./google-drive-oauth-setup.md)
- [Troubleshooting Guide](./google-drive-troubleshooting.md)
- [Expo AuthSession Docs](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Google Drive API Docs](https://developers.google.com/drive/api/guides/about-sdk)

## Summary

**What was fixed**: Removed duplicate `promptAsync` call that was causing authentication to fail

**What you need to do**: Configure the redirect URI in Google Cloud Console

**How to test**: Clear token, restart Metro, try export again

**How to debug**: Check the enhanced console logs for specific error messages
