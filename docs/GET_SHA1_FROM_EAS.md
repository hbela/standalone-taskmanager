# 🔐 Getting SHA-1 from EAS Build Keystore

## Method 1: Using EAS CLI (Recommended)

### Step 1: Run the credentials command
```bash
eas credentials
```

### Step 2: Follow the interactive prompts
1. **Select platform**: Choose `Android`
2. **Select action**: Choose `Keystore: Manage everything related to your keystore`
3. **Select keystore action**: Choose `View keystore information`

### Step 3: Copy the SHA-1 fingerprint
You'll see output like this:
```
Keystore credentials
  Keystore password: ••••••••••••••••
  Key alias:         ••••••••••••••••
  Key password:      ••••••••••••••••
  
  SHA1 Fingerprint:  AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD
  SHA256 Fingerprint: ...
```

**Copy the SHA1 Fingerprint** (the one with colons)

---

## Method 2: Using EAS Build Logs

### Step 1: Check your recent build
```bash
eas build:list
```

### Step 2: View build details
```bash
eas build:view [BUILD_ID]
```

The SHA-1 should be displayed in the build details or logs.

---

## Method 3: Download and Extract Keystore

### Step 1: Download the keystore
```bash
eas credentials -p android
```
Then select "Download credentials" → "Keystore"

This will download a file like `keystore.jks` or `keystore.keystore`

### Step 2: Get SHA-1 from the downloaded keystore
```bash
keytool -list -v -keystore ./keystore.jks -alias [YOUR_ALIAS] -storepass [YOUR_PASSWORD] -keypass [YOUR_PASSWORD]
```

Look for the line that says:
```
SHA1: AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD
```

---

## Method 4: Using Expo Dashboard (Easiest!)

### Step 1: Go to Expo Dashboard
1. Visit: https://expo.dev/
2. Sign in to your account
3. Select your project: **task-eas-google**

### Step 2: Navigate to Credentials
1. Click on **Credentials** in the left sidebar
2. Select **Android**
3. You'll see your keystore information including the SHA-1 fingerprint

---

## 🎯 What to Do After Getting SHA-1

### 1. Go to Google Cloud Console
https://console.cloud.google.com/

### 2. Navigate to Credentials
**APIs & Services** → **Credentials**

### 3. Update Your Android OAuth Client
1. Click on your **Android OAuth 2.0 Client ID**
2. Update the **SHA-1 certificate fingerprint** with the new one
3. Click **Save**

### 4. Wait a Few Minutes
Google needs a few minutes to propagate the changes (usually 5-10 minutes)

---

## 📝 Important Notes

- **Development vs Production**: You might have different keystores for development and production builds
- **Multiple SHA-1s**: You can add multiple SHA-1 fingerprints to the same Android OAuth client (useful for dev + prod)
- **Build Profiles**: Check which build profile you used (`development`, `preview`, or `production`)

---

## 🔍 Quick Verification

After updating the SHA-1 in Google Cloud Console:

1. ✅ Package name: `com.taskmanager.app`
2. ✅ SHA-1 fingerprint: [Your new SHA-1 from EAS]
3. ✅ Wait 5-10 minutes for changes to propagate
4. ✅ Test the sign-in flow again

---

## 💡 Pro Tip: Add Both SHA-1s

If you have both a local debug keystore and an EAS keystore, you can add **both** SHA-1 fingerprints to your Android OAuth client:

1. Local debug SHA-1 (for `npx expo run:android`)
2. EAS build SHA-1 (for `eas build`)

This way, both builds will work! 🎉
