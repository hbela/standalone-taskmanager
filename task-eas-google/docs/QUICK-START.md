# 🚀 Quick Start - Test Google Drive Export NOW

## What Was Fixed

✅ **Code Bug**: Removed duplicate `promptAsync` call in `googleDriveService.ts`  
✅ **Environment**: Cleaned up `.env` file with proper configuration  
✅ **Documentation**: Created comprehensive guides  
✅ **Error Handling**: Enhanced logging for better debugging  

## What You Need to Do (5 minutes)

### 1️⃣ Configure Google Cloud Console (2 minutes)

**Go to**: https://console.cloud.google.com/apis/credentials

**Find**: OAuth client `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`

**Add these two URIs**:
```
Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
JavaScript Origin: https://auth.expo.io
```

**Save** the changes.

**Enable**: Google Drive API at https://console.cloud.google.com/apis/library

📖 **Detailed guide**: See `docs/google-cloud-console-visual-guide.md`

### 2️⃣ Restart Metro (1 minute)

```powershell
# Kill Node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Start fresh
npx expo start --clear
```

### 3️⃣ Test on Device (2 minutes)

1. Open app on your device
2. Go to Tasks screen
3. Click the green **Export** button
4. Complete Google sign-in
5. Watch console logs

## Expected Result

### ✅ Success
```
🔐 Starting Google Drive authentication...
📋 Auth result type: success
✅ Auth code received, exchanging for token...
✅ Google Drive authentication successful
📤 Starting upload to Google Drive...
✅ File uploaded successfully to Google Drive
```

Alert: "Export successful!" with "View in Drive" button

### ❌ If It Fails

Check console logs for specific error:

**Error: "redirect_uri_mismatch"**
- Solution: Go back to Step 1, verify redirect URI is correct

**Error: "invalid_client"**
- Solution: Check `.env` has correct Client ID

**Error: "access_denied"**
- Solution: Add your Google account as test user in OAuth consent screen

## Troubleshooting

### Clear Cached Token

If you need to test authentication again:

```typescript
// Add this code temporarily in your app
import { clearGoogleDriveToken } from './lib/export/googleDriveService';
await clearGoogleDriveToken();
```

Or use the debug utility:

```typescript
import { debugGoogleDriveAuth } from './utils/debugGoogleDrive';
await debugGoogleDriveAuth();
```

## Documentation Reference

All documentation is in the `docs/` folder:

| Document | Purpose |
|----------|---------|
| `google-drive-fix-summary.md` | Complete summary of fixes |
| `google-cloud-console-visual-guide.md` | Step-by-step Google Cloud setup |
| `testing-production-checklist.md` | Full testing and production checklist |
| `oauth-client-types-guide.md` | Understanding OAuth client types |
| `env-configuration-reference.md` | .env configuration reference |
| `google-drive-troubleshooting.md` | Detailed troubleshooting guide |

## Current Configuration

**App**:
- Owner: `elyscom`
- Slug: `new-taskmanager`
- Package: `com.taskmanager.app`

**OAuth**:
- Client ID: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com`
- Redirect URI: `https://auth.expo.io/@elyscom/new-taskmanager`

**Environment** (`.env`):
```env
EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID=77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
```

## Next Steps After Testing

### For Production (Later)

1. Create Android OAuth client in Google Cloud Console
2. Update `.env` with Android Client ID
3. Rebuild app with EAS Build
4. Deploy

📖 **See**: `docs/testing-production-checklist.md` for details

## Summary

**Status**: ✅ Code fixed, ready to test  
**Blocker**: ⏳ Need to configure Google Cloud Console redirect URI  
**Time**: 5 minutes total  
**Next**: Configure Google Cloud Console → Restart Metro → Test  

---

**Questions?** Check the documentation in `docs/` folder or review console logs for specific error messages.
