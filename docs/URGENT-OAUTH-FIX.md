# 🔴 URGENT: OAuth Callback Error Fix

## Your Current Error
"Something went wrong trying to finish signing in. Please close this screen to go back to the app."

## Most Likely Cause
**Redirect URI mismatch** in Google Cloud Console (90% probability)

## IMMEDIATE ACTION REQUIRED

### Step 1: Verify Redirect URI in Google Cloud Console

1. **Open**: https://console.cloud.google.com/apis/credentials

2. **Find your OAuth client**: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`

3. **Click the Edit button** (pencil icon)

4. **Scroll to "Authorized redirect URIs"**

5. **Check if you have EXACTLY this**:
   ```
   https://auth.expo.io/@elyscom/new-taskmanager
   ```

6. **Common mistakes to avoid**:
   - ❌ `https://auth.expo.io/@elyscom/new-taskmanager/` (trailing slash)
   - ❌ `https://auth.expo.io/@elyscom/new-task-manager` (hyphen)
   - ❌ Any typos in "elyscom" or "new-taskmanager"

7. **If it's not there or wrong**:
   - Click "+ ADD URI"
   - Type EXACTLY: `https://auth.expo.io/@elyscom/new-taskmanager`
   - Click SAVE

8. **Also verify "Authorized JavaScript origins"**:
   - Should have: `https://auth.expo.io`
   - If not, add it

9. **Click SAVE** at the bottom

10. **WAIT 1-2 MINUTES** for changes to propagate

### Step 2: Check Console Logs

Now that I've added more debugging, restart Metro and try again:

```powershell
# Kill Metro
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Restart
npx expo start --clear
```

Try the export again and look for these logs:

```
🔐 Starting Google Drive authentication...
📍 Client ID: 77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
📍 Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
📍 Expo Owner: elyscom
📍 Expo Slug: new-taskmanager
```

**Verify**:
- Client ID matches Google Cloud Console ✅
- Redirect URI matches Google Cloud Console ✅
- Owner is "elyscom" ✅
- Slug is "new-taskmanager" ✅

### Step 3: Check for Error Details

After the authentication fails, look for:

```
📋 Auth result type: error
❌ Authentication failed with type: error
Error details: { ... }
```

**Copy the error details** and share them.

## Alternative Solutions

### If Redirect URI is Correct

If the redirect URI is definitely correct in Google Cloud Console, try these:

#### Option A: Check OAuth Consent Screen

1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. If status is "Testing":
   - Click "ADD USERS"
   - Add your Google account email
   - Save
3. Try authentication again

#### Option B: Wait for Propagation

Sometimes Google Cloud Console changes take a few minutes:
- Wait 5 minutes
- Clear browser cache
- Try again

#### Option C: Use Custom Scheme

If `auth.expo.io` redirect isn't working, we can try a custom scheme:

1. Update `googleDriveService.ts` line 39:
   ```typescript
   redirectUri: 'com.taskmanager.app:/oauth2redirect/google',
   ```

2. Add this to Google Cloud Console redirect URIs:
   ```
   com.taskmanager.app:/oauth2redirect/google
   ```

3. Rebuild the app (this requires EAS build)

## What to Share

If still not working, please provide:

1. **Console logs** (especially the 📍 lines and error details)
2. **Screenshot** of Google Cloud Console "Authorized redirect URIs" section
3. **OAuth consent screen status** (Testing or Production)
4. **Browser URL** when error appears (if visible)

## Quick Checklist

Before trying again:

- [ ] Redirect URI added to Google Cloud Console
- [ ] No trailing slash in redirect URI
- [ ] Exact spelling: `elyscom` and `new-taskmanager`
- [ ] JavaScript origin added: `https://auth.expo.io`
- [ ] Clicked SAVE in Google Cloud Console
- [ ] Waited 1-2 minutes
- [ ] Restarted Metro with `--clear`
- [ ] Checked console logs for error details

## Expected Success

When it works, you'll see:

```
🔐 Starting Google Drive authentication...
📍 Client ID: 77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com
📍 Redirect URI: https://auth.expo.io/@elyscom/new-taskmanager
📍 Expo Owner: elyscom
📍 Expo Slug: new-taskmanager
📋 Auth result type: success
✅ Auth code received, exchanging for token...
✅ Google Drive authentication successful
```

And the alert will show "Export successful!"
