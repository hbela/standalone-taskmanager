# Google Drive Export - Testing & Production Checklist

## Phase 1: Testing with Web Client (NOW)

### ✅ Prerequisites Checklist

- [x] Code fix applied (removed duplicate `promptAsync` call)
- [x] `.env` file properly configured
- [ ] Google Cloud Console - Web Client configured
- [ ] Metro bundler restarted
- [ ] App running on device
- [ ] Test export feature

### Step 1: Configure Google Cloud Console

**IMPORTANT**: You must complete this step before testing!

1. **Open Google Cloud Console**:
   - Go to: https://console.cloud.google.com/apis/credentials
   - Select your project

2. **Find your Web OAuth Client**:
   - Look for Client ID: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`
   - Click the **Edit** (pencil) icon

3. **Add Authorized Redirect URI**:
   - Under "Authorized redirect URIs", click **+ ADD URI**
   - Add exactly: `https://auth.expo.io/@elyscom/new-taskmanager`
   - ⚠️ **Important**: No trailing slash, exact match required

4. **Add Authorized JavaScript Origin**:
   - Under "Authorized JavaScript origins", click **+ ADD URI**
   - Add exactly: `https://auth.expo.io`

5. **Save Changes**:
   - Click **SAVE** at the bottom
   - Wait for confirmation message

6. **Verify Google Drive API is Enabled**:
   - Go to: https://console.cloud.google.com/apis/library
   - Search: "Google Drive API"
   - Should show "API enabled" (if not, click ENABLE)

### Step 2: Restart Metro Bundler

Clear cache and restart Metro to pick up `.env` changes:

```powershell
# Kill all Node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Clear Metro cache and restart
npx expo start --clear
```

### Step 3: Test on Device

1. **Open your app** on the physical device

2. **Navigate to Tasks screen**

3. **Create some test tasks** (if you don't have any)

4. **Click the Export button** (green cloud upload button)

5. **Watch the console logs** for detailed output

### Expected Console Output (Success)

```
🔐 Starting Google Drive authentication...
Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
📋 Auth result type: success
✅ Auth code received, exchanging for token...
✅ Google Drive authentication successful
📊 Generating Excel file...
☁️ Uploading to Google Drive...
📤 Starting upload to Google Drive...
File: tasks_export_2026-01-23.xlsx
✅ Using stored Google Drive token
✅ File uploaded successfully to Google Drive
File ID: 1abc...xyz
```

### Expected Console Output (Failure - Redirect URI Mismatch)

```
🔐 Starting Google Drive authentication...
Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
📋 Auth result type: error
❌ Authentication failed with type: error
Error details: { message: "redirect_uri_mismatch" }
```

**Solution**: Go back to Step 1 and verify redirect URI is correctly configured

### Step 4: Verify Export Success

After successful authentication and upload:

1. **Alert should appear**: "Export successful!"
2. **Click "View in Drive"** button
3. **Google Drive should open** in browser/app
4. **Verify the Excel file** is there

### Troubleshooting

#### Issue: "redirect_uri_mismatch"
- **Cause**: Redirect URI not configured in Google Cloud Console
- **Solution**: Complete Step 1 above
- **Verify**: URI must be exactly `https://auth.expo.io/@elyscom/new-taskmanager`

#### Issue: "invalid_client"
- **Cause**: Client ID mismatch
- **Solution**: Verify `.env` has correct Client ID
- **Check**: `EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com`

#### Issue: "access_denied"
- **Cause**: OAuth consent screen restrictions
- **Solution**: 
  - Go to: https://console.cloud.google.com/apis/credentials/consent
  - If in "Testing" mode, add your Google account as test user
  - Or publish to "Production"

#### Issue: User sees "This app isn't verified"
- **Expected**: This is normal for testing
- **Solution**: Click "Advanced" → "Go to [App Name] (unsafe)"
- **For Production**: Submit app for Google verification

#### Issue: Authentication succeeds but upload fails
- **Check**: Google Drive API is enabled
- **Check**: Token hasn't expired (should auto-refresh)
- **Solution**: Clear token and re-authenticate

### Clear Token (If Needed)

If you need to test authentication again:

```typescript
// Add this temporarily to your app (e.g., in a button)
import { clearGoogleDriveToken } from './lib/export/googleDriveService';

await clearGoogleDriveToken();
console.log('✅ Token cleared');
```

Or use the debug utility:

```typescript
import { debugGoogleDriveAuth } from './utils/debugGoogleDrive';
await debugGoogleDriveAuth();
```

---

## Phase 2: Production Setup with Android Client (LATER)

### ✅ Production Checklist

- [ ] Create Android OAuth client in Google Cloud Console
- [ ] Get Android Client ID
- [ ] Update `.env` file
- [ ] Rebuild app with EAS Build
- [ ] Test on device
- [ ] Deploy to production

### Step 1: Create Android OAuth Client

1. **Open Google Cloud Console**:
   - Go to: https://console.cloud.google.com/apis/credentials

2. **Create Credentials**:
   - Click **+ CREATE CREDENTIALS**
   - Select **OAuth client ID**

3. **Configure Android Client**:
   - Application type: **Android**
   - Name: `Task Manager - Android`
   - Package name: `com.taskmanager.app`
   - SHA-1 certificate fingerprint: `B4:89:CC:E0:56:D5:4F:5C:54:8D:D0:3F:32:96:7D:E9:7F:21:7B:7E`

4. **Create**:
   - Click **CREATE**
   - Copy the Client ID (format: `xxxxx.apps.googleusercontent.com`)

### Step 2: Update .env File

Update your `.env` file:

```env
# Update line 16
EXPO_PUBLIC_GOOGLE_DRIVE_ANDROID_CLIENT_ID=<paste_your_android_client_id_here>

# Update line 31 (switch to Android client)
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=<paste_your_android_client_id_here>
```

Or keep both and comment out the Web client:

```env
# Web Client (for development/testing)
# EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com

# Android Client (for production)
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=YOUR_ANDROID_CLIENT_ID
```

### Step 3: Rebuild App

Android OAuth clients require a native build:

```bash
# Build for Android
eas build --platform android --profile preview

# Or for production
eas build --platform android --profile production
```

### Step 4: Test Production Build

1. Download and install the new build
2. Clear any cached tokens
3. Test export feature
4. Verify authentication works with Android client

### Step 5: Deploy

Once verified:

```bash
# Submit to Google Play Store
eas submit --platform android
```

---

## Quick Command Reference

### Restart Metro (Clear Cache)
```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
npx expo start --clear
```

### Check Environment Variables
```powershell
cat .env
```

### Build for Production
```bash
eas build --platform android --profile production
```

### View Console Logs
Metro bundler will show logs automatically. Watch for:
- `🔐 Starting Google Drive authentication...`
- `📋 Auth result type: ...`
- `✅ Google Drive authentication successful`

---

## Summary

### For Testing NOW:
1. ✅ Configure Web Client in Google Cloud Console (redirect URI)
2. ✅ Restart Metro with `--clear`
3. ✅ Test export on device
4. ✅ Watch console logs for errors

### For Production LATER:
1. Create Android OAuth client
2. Update `.env` with Android Client ID
3. Rebuild app with EAS
4. Test and deploy

---

## Current Status

**Configuration**:
- ✅ Code fixed (duplicate `promptAsync` removed)
- ✅ `.env` properly configured
- ⏳ Google Cloud Console - **YOU NEED TO DO THIS**
- ⏳ Testing - **READY TO TEST AFTER GOOGLE CLOUD CONFIG**

**Next Action**: Configure Google Cloud Console redirect URI, then test!
