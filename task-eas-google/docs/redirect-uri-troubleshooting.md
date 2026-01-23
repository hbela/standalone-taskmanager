# Redirect URI Mismatch Troubleshooting

## Error: 400.redirect_uri_mismatch

This error means the redirect URI being sent doesn't match what's configured in Google Cloud Console.

---

## Step 1: Check What Redirect URI is Being Sent

Look at your Metro logs. You should see:
```
📍 Redirect URI: https://auth.expo.io/@hajzerbela/new-taskmanager
```

**Important:** Copy this EXACT URI (including the `@` symbol and exact casing).

---

## Step 2: Verify Google Cloud Console Configuration

### For Web OAuth Client: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find client ID: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`
4. Click **Edit** (pencil icon)
5. Scroll to **Authorized redirect URIs**

### Add EXACTLY this URI:
```
https://auth.expo.io/@hajzerbela/new-taskmanager
```

### Common Mistakes to Avoid:
- ❌ `https://auth.expo.io/@hajzerbela/new-taskmanager/` (trailing slash)
- ❌ `https://auth.expo.io/@Hajzerbela/new-taskmanager` (wrong casing)
- ❌ `https://auth.expo.io/hajzerbela/new-taskmanager` (missing @)
- ✅ `https://auth.expo.io/@hajzerbela/new-taskmanager` (CORRECT)

---

## Step 3: Possible Owner Mismatch

The redirect URI uses `@hajzerbela`, but if your app is published under a different owner, the URI might be different.

### Check your actual Expo owner:
```bash
eas whoami
```

### Check app.json:
```json
"owner": "hajzerbela"
```

These MUST match!

---

## Step 4: Alternative - Use Dynamic Redirect URI

If the hardcoded redirect URI keeps failing, we can try using `AuthSession.makeRedirectUri()` instead.

This would require modifying `googleDriveService.ts` to use:
```typescript
const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'new-taskmanager',
  path: 'redirect'
});
```

Then you'd need to add the generated URI to Google Cloud Console.

---

## Step 5: Check for Typos in Google Cloud Console

Common issues:
1. **Extra spaces** before or after the URI
2. **Wrong protocol** (http vs https)
3. **Wrong domain** (auth.expo.io vs expo.io)
4. **Case sensitivity** in username or slug

---

## Step 6: Wait for Propagation

After adding the redirect URI in Google Cloud Console:
1. **Save** the changes
2. **Wait 1-2 minutes** for Google's servers to propagate the changes
3. **Clear Metro cache**: `npx expo start -c`
4. **Reload the app**
5. **Try again**

---

## Step 7: Verify the Error Details

When you get the error, Google usually shows:
- The redirect URI that was sent
- The redirect URIs that are configured

**Please share:**
1. What redirect URI is shown in the error?
2. What redirect URIs are configured in Google Cloud Console?
3. Screenshot of the error (if possible)

---

## Quick Checklist

- [ ] Metro logs show: `https://auth.expo.io/@hajzerbela/new-taskmanager`
- [ ] Google Cloud Console has EXACTLY: `https://auth.expo.io/@hajzerbela/new-taskmanager`
- [ ] No trailing slash
- [ ] Correct casing (@hajzerbela, not @Hajzerbela)
- [ ] Saved changes in Google Cloud Console
- [ ] Waited 1-2 minutes after saving
- [ ] Cleared Metro cache and restarted
- [ ] Reloaded app on device
- [ ] Client ID is: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th`
