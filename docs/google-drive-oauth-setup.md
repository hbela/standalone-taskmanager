# Google Drive OAuth Setup Guide

## Issue
The authentication is failing with "Authentication cancelled or failed" error because the OAuth redirect URI is not properly configured in Google Cloud Console.

## Solution

### Step 1: Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **APIs & Services** → **Credentials**

### Step 2: Create/Update OAuth 2.0 Client ID

You need to create an **Android** OAuth client (not Web client) for Expo apps:

1. Click **"+ CREATE CREDENTIALS"** → **OAuth client ID**
2. Select **Android** as the application type
3. Fill in the following:
   - **Name**: `Task Manager Android (Expo)`
   - **Package name**: `com.taskmanager.app` (from your app.json)
   - **SHA-1 certificate fingerprint**: Get this from Expo

#### Getting SHA-1 Certificate Fingerprint

Run this command to get your Expo development SHA-1:
```bash
npx expo credentials:manager -p android
```

Or use the Google's default Expo SHA-1:
```
B4:89:CC:E0:56:D5:4F:5C:54:8D:D0:3F:32:96:7D:E9:7F:21:7B:7E
```

### Step 3: Configure Authorized Redirect URIs

For the **Web Client** (the one you're currently using), add these redirect URIs:

1. Go to your existing Web OAuth client
2. Under **Authorized redirect URIs**, add:
   ```
   https://auth.expo.io/@elyscom/new-taskmanager
   ```

### Step 4: Enable Google Drive API

1. Navigate to **APIs & Services** → **Library**
2. Search for "Google Drive API"
3. Click **ENABLE**

### Step 5: Update Your .env File

After creating the Android OAuth client, update your `.env`:

```env
# Use the Android Client ID for Expo apps
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=YOUR_ANDROID_CLIENT_ID_HERE

# Keep the Web Client ID for fallback
EXPO_PUBLIC_GOOGLE_DRIVE_WEB_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
```

## Alternative: Use Web Client with Proper Configuration

If you want to continue using the Web Client ID, ensure:

1. **Authorized JavaScript origins**:
   ```
   https://auth.expo.io
   ```

2. **Authorized redirect URIs**:
   ```
   https://auth.expo.io/@elyscom/new-taskmanager
   ```

## Testing

After configuration:

1. Clear any stored tokens:
   ```typescript
   import { clearGoogleDriveToken } from './lib/export/googleDriveService';
   await clearGoogleDriveToken();
   ```

2. Restart your app
3. Try the export again

## Common Issues

### "redirect_uri_mismatch" Error
- Ensure the redirect URI in Google Cloud Console **exactly matches** `https://auth.expo.io/@elyscom/new-taskmanager`
- No trailing slashes
- Case-sensitive

### "invalid_client" Error
- Double-check your Client ID in `.env`
- Ensure you're using the correct client type (Android vs Web)

### "access_denied" Error
- Make sure Google Drive API is enabled
- Check that the OAuth consent screen is properly configured
- Ensure your Google account has access to the app (if in testing mode)

## Current Configuration

Your current redirect URI: `https://auth.expo.io/@elyscom/new-taskmanager`
Your Expo slug: `new-taskmanager`
Your Expo owner: `elyscom`

This redirect URI is correct for your Expo configuration.
