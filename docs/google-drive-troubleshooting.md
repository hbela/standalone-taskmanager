# Google Drive Export Troubleshooting

## Current Error
```
ERROR  ❌ Google Drive Authentication Error: [Error: Authentication cancelled or failed]
LOG  Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
```

## Root Cause
The authentication was failing due to:
1. **Duplicate `promptAsync` call** - Fixed ✅
2. **Redirect URI not configured in Google Cloud Console** - Needs verification
3. **Possible OAuth client type mismatch** - Needs verification

## Fixes Applied

### 1. Fixed Duplicate promptAsync Call ✅
**File**: `lib/export/googleDriveService.ts`

**Before**:
```typescript
await authRequest.promptAsync(discovery);  // ❌ Not awaited properly
const result = await authRequest.promptAsync(discovery);  // Called twice!
```

**After**:
```typescript
const result = await authRequest.promptAsync(discovery);  // ✅ Single call
```

### 2. Enhanced Error Logging ✅
Now you'll see detailed error information:
- Auth result type (success, error, cancel, dismiss)
- Error details and parameters
- Specific error messages

## Next Steps: Google Cloud Console Configuration

### Option A: Use Web Client (Recommended for Quick Testing)

1. **Go to Google Cloud Console**:
   - Navigate to: https://console.cloud.google.com/apis/credentials
   - Find your Web OAuth client: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`

2. **Add Authorized Redirect URI**:
   ```
   https://auth.expo.io/@elyscom/new-taskmanager
   ```
   
   **Important**: 
   - No trailing slash
   - Exact match required
   - Case-sensitive

3. **Add Authorized JavaScript Origin**:
   ```
   https://auth.expo.io
   ```

4. **Enable Google Drive API**:
   - Go to: https://console.cloud.google.com/apis/library
   - Search: "Google Drive API"
   - Click **ENABLE**

### Option B: Create Android Client (Better for Production)

1. **Create New OAuth Client**:
   - Type: **Android**
   - Name: `Task Manager Android`
   - Package name: `com.taskmanager.app`
   - SHA-1 fingerprint: `B4:89:CC:E0:56:D5:4F:5C:54:8D:D0:3F:32:96:7D:E9:7F:21:7B:7E`
     (This is Google's default Expo SHA-1)

2. **Update .env**:
   ```env
   EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=YOUR_ANDROID_CLIENT_ID_HERE
   ```

## Testing Steps

### Step 1: Clear Cached Token
Add this to your app temporarily (e.g., in a button or on app start):

```typescript
import { clearGoogleDriveToken } from './lib/export/googleDriveService';

// Clear token before testing
await clearGoogleDriveToken();
console.log('✅ Token cleared, ready for fresh auth');
```

### Step 2: Check Environment Variables
Verify your `.env` file:

```bash
# In terminal
cat .env
```

Expected output:
```env
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
```

### Step 3: Restart Metro
```bash
# Kill Metro
# Windows PowerShell:
Get-Process -Name node | Stop-Process -Force

# Restart
npx expo start --clear
```

### Step 4: Test Export
1. Open the app
2. Try to export tasks to Google Drive
3. Watch the console logs for detailed error messages

## Expected Console Output (Success)

```
🔐 Starting Google Drive authentication...
Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
📋 Auth result type: success
✅ Auth code received, exchanging for token...
✅ Google Drive authentication successful
📤 Starting upload to Google Drive...
File: tasks_export_2026-01-23.xlsx
✅ Using stored Google Drive token
✅ File uploaded successfully to Google Drive
File ID: 1abc...xyz
```

## Expected Console Output (Failure)

### If Redirect URI Mismatch:
```
📋 Auth result type: error
❌ Authentication failed with type: error
Error details: { message: "redirect_uri_mismatch" }
```
**Solution**: Add redirect URI to Google Cloud Console

### If User Cancels:
```
📋 Auth result type: cancel
❌ Authentication failed with type: cancel
Authentication cancel: User cancelled or dismissed
```
**Solution**: User needs to complete the OAuth flow

### If Invalid Client:
```
📋 Auth result type: error
❌ Authentication failed with type: error
Error details: { message: "invalid_client" }
```
**Solution**: Check Client ID in `.env` file

## Quick Verification Checklist

- [ ] Fixed duplicate `promptAsync` call in `googleDriveService.ts`
- [ ] Google Drive API is enabled in Google Cloud Console
- [ ] Redirect URI `https://auth.expo.io/@elyscom/new-taskmanager` is added to OAuth client
- [ ] Client ID in `.env` matches Google Cloud Console
- [ ] Cleared cached token using `clearGoogleDriveToken()`
- [ ] Restarted Metro bundler with `--clear` flag
- [ ] OAuth consent screen is configured (if app is in testing mode, your Google account must be added as test user)

## Common Issues & Solutions

### Issue: "redirect_uri_mismatch"
**Cause**: Redirect URI not configured in Google Cloud Console  
**Solution**: Add `https://auth.expo.io/@elyscom/new-taskmanager` to authorized redirect URIs

### Issue: "invalid_client"
**Cause**: Wrong Client ID or client not found  
**Solution**: Verify Client ID in `.env` matches Google Cloud Console

### Issue: "access_denied"
**Cause**: OAuth consent screen restrictions  
**Solution**: 
- If app is in "Testing" mode, add your Google account as a test user
- Or publish the app (move to "Production")

### Issue: User sees "This app isn't verified"
**Cause**: OAuth consent screen not verified by Google  
**Solution**: 
- Click "Advanced" → "Go to [App Name] (unsafe)" for testing
- For production, submit app for verification

### Issue: Authentication succeeds but upload fails with 401
**Cause**: Token expired or invalid  
**Solution**: Token will auto-refresh. If persists, clear token and re-authenticate

## Debug Utility

Use the debug utility to check authentication status:

```typescript
import { debugGoogleDriveAuth } from './utils/debugGoogleDrive';

// Call this to check status and clear token if needed
await debugGoogleDriveAuth();
```

## Additional Resources

- [Google OAuth 2.0 for Mobile Apps](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Expo AuthSession Documentation](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Google Drive API Documentation](https://developers.google.com/drive/api/guides/about-sdk)
