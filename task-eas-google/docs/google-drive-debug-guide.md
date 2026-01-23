# Google Drive OAuth Debugging Guide

## Current Configuration

### Environment Variables (.env)
- **Active Client ID:** `748565427378-889buo98b75cknun3gn14ghsobe8s7ap.apps.googleusercontent.com`
- **Redirect URI:** `https://auth.expo.io/@hajzerbela/new-taskmanager`

### App Configuration (app.json)
- **Package Name:** `com.taskmanager.app`
- **Expo Owner:** `hajzerbela`
- **Expo Slug:** `new-taskmanager`

### EAS Keystore
- **SHA-1 Fingerprint:** `2D:BD:E0:C7:BA:B5:3F:FC:36:24:F3:71:BF:49:4C:4D:51:84:39:32`

---

## Google Cloud Console Checklist

### For Android OAuth Client (`748565427378-889buo98b75cknun3gn14ghsobe8s7ap`)

1. **Application Type:** Android
2. **Package Name:** `com.taskmanager.app` ✓
3. **SHA-1 Certificate Fingerprint:** `2D:BD:E0:C7:BA:B5:3F:FC:36:24:F3:71:BF:49:4C:4D:51:84:39:32` ✓
4. **Google Drive API Enabled:** ❓ (Please verify)

### Important Notes:
- Android OAuth clients **DO NOT** use redirect URIs
- They authenticate using Package Name + SHA-1 fingerprint only
- The redirect URI `https://auth.expo.io/@hajzerbela/new-taskmanager` is only for Web OAuth clients

---

## Steps to Debug

### 1. Restart Metro and Reload App
```bash
# Stop Metro (Ctrl+C)
# Clear cache
npx expo start -c
```

### 2. Check Metro Logs
After restarting, you should see:
```
📍 Client ID: 748565427378-889buo98b75cknun3gn14ghsobe8s7ap.apps.googleusercontent.com
```
(NOT the old `748565427378-7grplag7b4g748mubf6li27a5diba37p`)

### 3. Try Authentication Again
The enhanced logging will now show:
- Full auth result object
- Detailed error information if it fails

### 4. Common Issues to Check

#### Issue: "Something went wrong trying to finish signing in"
**Possible Causes:**
1. **Wrong SHA-1 fingerprint** in Google Cloud Console
   - Verify: `2D:BD:E0:C7:BA:B5:3F:FC:36:24:F3:71:BF:49:4C:4D:51:84:39:32`
   
2. **Wrong package name** in Google Cloud Console
   - Verify: `com.taskmanager.app`
   
3. **Google Drive API not enabled**
   - Go to: APIs & Services → Library → Search "Google Drive API" → Enable
   
4. **OAuth consent screen not configured**
   - Check: APIs & Services → OAuth consent screen
   - Add test users if in testing mode

5. **Client ID mismatch**
   - The app must use: `748565427378-889buo98b75cknun3gn14ghsobe8s7ap`

---

## Verification Steps

### Step 1: Verify Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find client ID: `748565427378-889buo98b75cknun3gn14ghsobe8s7ap`
4. Verify:
   - Type: Android
   - Package: `com.taskmanager.app`
   - SHA-1: `2D:BD:E0:C7:BA:B5:3F:FC:36:24:F3:71:BF:49:4C:4D:51:84:39:32`

### Step 2: Enable Google Drive API
1. Go to **APIs & Services** → **Library**
2. Search for "Google Drive API"
3. Click **Enable** (if not already enabled)

### Step 3: Check OAuth Consent Screen
1. Go to **APIs & Services** → **OAuth consent screen**
2. If in "Testing" mode, add your Google account as a test user
3. Verify scopes include Google Drive

### Step 4: Restart and Test
1. Stop Metro bundler
2. Run: `npx expo start -c`
3. Reload app on device
4. Try Google Drive export again
5. Check Metro logs for detailed error information

---

## Expected Log Output (Success)

```
🔐 Starting Google Drive authentication...
📍 Client ID: 748565427378-889buo98b75cknun3gn14ghsobe8s7ap.apps.googleusercontent.com
📍 Redirect URI: https://auth.expo.io/@hajzerbela/new-taskmanager
📍 Expo Owner: hajzerbela
📍 Expo Slug: new-taskmanager
📋 Auth result type: success
📋 Full auth result: { ... }
✅ Auth code received, exchanging for token...
✅ Google Drive authentication successful
```

---

## If Still Failing

Share the complete Metro log output, especially:
- The "Full auth result" JSON
- Any error messages
- The exact error type

This will help identify the specific issue.
