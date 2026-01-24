# Google Cloud Console Configuration - Visual Guide

## Step-by-Step: Configure Web OAuth Client for Testing

### Step 1: Access Google Cloud Console

1. Open browser and go to: **https://console.cloud.google.com/apis/credentials**
2. Make sure you're in the correct project
3. You should see the "Credentials" page

### Step 2: Find Your Web OAuth Client

Look for a table with your OAuth 2.0 Client IDs:

```
Name                          Type        Client ID
────────────────────────────────────────────────────────────────
Web client 1                  Web         77457674566-el2ljsr4ol583ms6pp33o3apsohib8th
```

**Find the row** with Client ID: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`

### Step 3: Edit the OAuth Client

1. Click the **pencil icon** (✏️) on the right side of that row
2. The "Edit OAuth client" page will open

### Step 4: Add Authorized Redirect URI

Scroll down to the section: **Authorized redirect URIs**

You should see:
```
Authorized redirect URIs
URIs 1 ⓘ
────────────────────────────────────────
[Empty or existing URIs]

+ ADD URI
```

1. Click **+ ADD URI**
2. A new text field will appear
3. Type **exactly**: `https://auth.expo.io/@elyscom/new-taskmanager`
4. Press Enter or click outside the field

**IMPORTANT**:
- ✅ Correct: `https://auth.expo.io/@elyscom/new-taskmanager`
- ❌ Wrong: `https://auth.expo.io/@elyscom/new-taskmanager/` (trailing slash)
- ❌ Wrong: `http://auth.expo.io/@elyscom/new-taskmanager` (http instead of https)
- ❌ Wrong: `https://auth.expo.io/@elyscom/new-taskmanager ` (extra space)

### Step 5: Add Authorized JavaScript Origin

Scroll to the section: **Authorized JavaScript origins**

You should see:
```
Authorized JavaScript origins
URIs ⓘ
────────────────────────────────────────
[Empty or existing URIs]

+ ADD URI
```

1. Click **+ ADD URI**
2. A new text field will appear
3. Type **exactly**: `https://auth.expo.io`
4. Press Enter or click outside the field

**IMPORTANT**:
- ✅ Correct: `https://auth.expo.io`
- ❌ Wrong: `https://auth.expo.io/` (trailing slash)
- ❌ Wrong: `http://auth.expo.io` (http instead of https)

### Step 6: Save Changes

1. Scroll to the bottom of the page
2. Click the blue **SAVE** button
3. Wait for the success message: "OAuth client updated"

### Step 7: Verify Google Drive API is Enabled

1. Go to: **https://console.cloud.google.com/apis/library**
2. In the search box, type: `Google Drive API`
3. Click on **Google Drive API** from the results
4. You should see one of these:
   - ✅ **"API enabled"** with a green checkmark - Good! You're done.
   - ⚠️ **"ENABLE" button** - Click it to enable the API

---

## Visual Reference

### What You're Looking For:

**OAuth Client Edit Page**:
```
Edit OAuth client                                                    [SAVE]

Name
Web client 1

Client ID
77457674566-el2ljsr4ol583ms6pp33o3apsohib8th

Client secret
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                              [SHOW]

Authorized JavaScript origins
URIs ⓘ
────────────────────────────────────────
https://auth.expo.io                                                  [×]

+ ADD URI

Authorized redirect URIs
URIs 1 ⓘ
────────────────────────────────────────
https://auth.expo.io/@elyscom/new-taskmanager                        [×]

+ ADD URI

                                                    [CANCEL]  [SAVE]
```

---

## After Configuration

### Verification Checklist

Once you've saved the changes, verify:

- [ ] Redirect URI added: `https://auth.expo.io/@elyscom/new-taskmanager`
- [ ] JavaScript origin added: `https://auth.expo.io`
- [ ] Changes saved successfully
- [ ] Google Drive API is enabled

### Next Steps

1. **Close Google Cloud Console** (changes are saved)

2. **Restart Metro bundler**:
   ```powershell
   # Kill Node processes
   Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
   
   # Start Metro with cache cleared
   npx expo start --clear
   ```

3. **Open your app** on the device

4. **Test the export feature**:
   - Go to Tasks screen
   - Click the green Export button
   - Complete Google sign-in
   - Watch console logs

---

## Troubleshooting Google Cloud Console

### Can't Find the OAuth Client?

**Check**:
1. Are you in the correct Google Cloud project?
2. Look at the top of the page - project name should be visible
3. Click the project dropdown to switch projects if needed

**Search**:
1. Use the search box at the top
2. Type: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`
3. It should show the OAuth client

### Can't Edit the OAuth Client?

**Check Permissions**:
- You need "Editor" or "Owner" role on the project
- Contact the project owner if you don't have access

### Changes Not Saving?

**Try**:
1. Refresh the page
2. Clear browser cache
3. Try a different browser
4. Check for error messages at the top of the page

### Redirect URI Already Exists?

**Good!** Someone already added it. Verify it's exactly:
`https://auth.expo.io/@elyscom/new-taskmanager`

If it's different, remove the old one and add the correct one.

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Trailing Slash
```
Wrong: https://auth.expo.io/@elyscom/new-taskmanager/
Right: https://auth.expo.io/@elyscom/new-taskmanager
```

### ❌ Mistake 2: Wrong Protocol
```
Wrong: http://auth.expo.io/@elyscom/new-taskmanager
Right: https://auth.expo.io/@elyscom/new-taskmanager
```

### ❌ Mistake 3: Typo in Username
```
Wrong: https://auth.expo.io/@elyscom/new-taskmanager
Wrong: https://auth.expo.io/@elycom/new-taskmanager
Right: https://auth.expo.io/@elyscom/new-taskmanager
```

### ❌ Mistake 4: Typo in Slug
```
Wrong: https://auth.expo.io/@elyscom/new-task-manager
Wrong: https://auth.expo.io/@elyscom/taskmanager
Right: https://auth.expo.io/@elyscom/new-taskmanager
```

### ❌ Mistake 5: Extra Spaces
```
Wrong: https://auth.expo.io/@elyscom/new-taskmanager 
Right: https://auth.expo.io/@elyscom/new-taskmanager
```

---

## Quick Links

- **Credentials Page**: https://console.cloud.google.com/apis/credentials
- **API Library**: https://console.cloud.google.com/apis/library
- **OAuth Consent Screen**: https://console.cloud.google.com/apis/credentials/consent
- **Google Drive API**: https://console.cloud.google.com/apis/library/drive.googleapis.com

---

## Summary

**What to Add**:
1. Redirect URI: `https://auth.expo.io/@elyscom/new-taskmanager`
2. JavaScript Origin: `https://auth.expo.io`

**Where to Add**:
- Google Cloud Console → APIs & Services → Credentials
- Edit OAuth client: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`

**After Adding**:
- Save changes
- Enable Google Drive API (if not already enabled)
- Restart Metro bundler
- Test export feature

**Time Required**: 2-3 minutes

**Difficulty**: Easy ⭐☆☆☆☆
