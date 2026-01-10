# 🚨 Fixing DEVELOPER_ERROR

## Error Message
```
ERROR Sign-In Error: [Error: DEVELOPER_ERROR: Follow troubleshooting instructions at https://react-native-google-signin.github.io/docs/troubleshooting]
```

## ✅ What This Means
Google Sign-In is working, but Google Cloud Console configuration doesn't match your app.

---

## 🔧 Step-by-Step Fix

### 1. Verify Google Cloud Console Configuration

Go to: https://console.cloud.google.com/apis/credentials

#### Check Your **Android OAuth 2.0 Client ID**:

**Required Settings:**
```
Application type: Android
Package name: com.taskmanager.app
SHA-1 certificate fingerprint: 0F:66:FE:E8:7B:65:DF:8C:77:29:F8:B5:00:D6:D7:A1:30:70:DF:9D
```

### 2. Common Mistakes to Check

#### ❌ Mistake 1: Wrong Package Name
**Check**: The package name in Google Cloud Console must be **exactly**:
```
com.taskmanager.app
```

**Verify in your app.json**:
```json
"android": {
  "package": "com.taskmanager.app"
}
```

#### ❌ Mistake 2: SHA-1 Not Updated
**Check**: Did you add the SHA-1 fingerprint from your EAS build?
```
0F:66:FE:E8:7B:65:DF:8C:77:29:F8:B5:00:D6:D7:A1:30:70:DF:9D
```

**How to verify**:
1. Go to Google Cloud Console → Credentials
2. Click on your Android OAuth client
3. Check if the SHA-1 is there
4. Click **Save** if you just added it

#### ❌ Mistake 3: Using Wrong Client ID Type
**Check**: You need **TWO** OAuth clients:

1. **Web Application Client** (for your .env file)
   - Type: Web application
   - This is what you put in `EXPO_PUBLIC_WEB_CLIENT_ID`

2. **Android Client** (for the app authentication)
   - Type: Android
   - Package: `com.taskmanager.app`
   - SHA-1: `0F:66:FE:E8:7B:65:DF:8C:77:29:F8:B5:00:D6:D7:A1:30:70:DF:9D`

#### ❌ Mistake 4: Changes Not Propagated
**Wait Time**: Google needs **5-10 minutes** to propagate changes

**When did you update the SHA-1?**
- If less than 10 minutes ago → **Wait and try again**
- If more than 10 minutes ago → **Check other issues**

---

## 🎯 Quick Verification Checklist

### In Google Cloud Console:

- [ ] **Android OAuth Client exists**
  - Go to: APIs & Services → Credentials
  - Look for: "Android client" or similar name

- [ ] **Package name is correct**: `com.taskmanager.app`

- [ ] **SHA-1 fingerprint is added**: `0F:66:FE:E8:7B:65:DF:8C:77:29:F8:B5:00:D6:D7:A1:30:70:DF:9D`

- [ ] **Web Client ID is in your .env file**
  - Check: `.env` file has `EXPO_PUBLIC_WEB_CLIENT_ID=...`

- [ ] **Clicked "Save"** after making changes

- [ ] **Waited 5-10 minutes** after saving

### In Your App:

- [ ] **Rebuilt the app** after updating .env (if you changed it)
  - Development builds don't auto-update environment variables
  - You need to rebuild: `eas build --profile development --platform android`

---

## 🔍 Detailed Verification Steps

### Step 1: Check Your .env File

Open `.env` and verify you have the **Web Client ID** (not Android Client ID):

```bash
# Should look like this (with your actual ID):
EXPO_PUBLIC_WEB_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
```

**Common mistake**: Using the Android Client ID instead of Web Client ID

### Step 2: Verify Google Cloud Console

1. Go to: https://console.cloud.google.com/apis/credentials
2. You should see **at least 2 OAuth clients**:
   - One "Web client" (for backend)
   - One "Android" (for mobile app)

3. Click on the **Android** client and verify:
   ```
   Package name: com.taskmanager.app
   SHA-1: 0F:66:FE:E8:7B:65:DF:8C:77:29:F8:B5:00:D6:D7:A1:30:70:DF:9D
   ```

### Step 3: Enable Google Sign-In API

Make sure the API is enabled:
1. Go to: APIs & Services → Library
2. Search for: "Google Sign-In API" or "Google+ API"
3. Click **Enable** if not already enabled

---

## 🚨 If Still Not Working

### Option 1: Delete and Recreate Android OAuth Client

Sometimes the client gets corrupted:

1. **In Google Cloud Console**:
   - Delete the existing Android OAuth client
   - Create a new one with:
     - Type: Android
     - Package: `com.taskmanager.app`
     - SHA-1: `0F:66:FE:E8:7B:65:DF:8C:77:29:F8:B5:00:D6:D7:A1:30:70:DF:9D`

2. **Wait 10 minutes** and test again

### Option 2: Check Build Profile

Did you build with the correct profile?

```bash
# Make sure you built with development profile
eas build --profile development --platform android
```

Different profiles might use different keystores!

### Option 3: Verify Environment Variable is Loaded

Add a console log to check if the Web Client ID is loaded:

In `app/_layout.tsx`, temporarily add:
```typescript
useEffect(() => {
  console.log('Web Client ID:', process.env.EXPO_PUBLIC_WEB_CLIENT_ID);
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    offlineAccess: true,
  });
}, []);
```

Check the console - if it shows `undefined`, your .env isn't being loaded.

---

## 📋 Most Common Solution

**90% of the time, this error is fixed by:**

1. ✅ Adding the correct SHA-1 to Google Cloud Console
2. ✅ Waiting 10 minutes
3. ✅ Trying again

**Did you update the SHA-1 less than 10 minutes ago?**
→ **Just wait a bit longer!** ⏱️

---

## 🎯 Quick Test

After verifying everything, try this:

1. **Close the app completely** on your phone
2. **Wait 10 minutes** (if you just updated Google Cloud Console)
3. **Open the app again**
4. **Try signing in**

---

## 📞 Need More Info?

If still not working, check:
- What's in your `.env` file? (the Web Client ID)
- How long ago did you update the SHA-1 in Google Cloud Console?
- Did you rebuild the app after changing .env?

---

**Most likely cause**: SHA-1 was just updated and needs time to propagate. Wait 10 minutes! ⏰
