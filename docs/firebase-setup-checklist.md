# Firebase Android App Setup - Checklist

## ✅ Completed Steps

1. **Created Firebase Android App** - Generated `google-services.json`
2. **Placed google-services.json** - File is in the project root
3. **Updated app.json** - Added Firebase configuration

## 🔧 Configuration Updates Made

### 1. Added `googleServicesFile` Reference
In `app.json` under `android` section:
```json
"googleServicesFile": "./google-services.json"
```

### 2. Added Android Intent Filters for OAuth
In `app.json` under `android` section:
```json
"intentFilters": [
  {
    "action": "VIEW",
    "data": [
      {
        "scheme": "com.googleusercontent.apps.903850631580-YOUR_CLIENT_ID"
      }
    ],
    "category": ["BROWSABLE", "DEFAULT"]
  }
]
```

**⚠️ IMPORTANT:** Replace `YOUR_CLIENT_ID` with your actual OAuth Client ID from Google Cloud Console.

### 3. Added expo-auth-session Plugin
Added to the `plugins` array in `app.json`:
```json
"expo-auth-session"
```

## 📋 Next Steps Required

### Step 1: Verify Client Configuration

**⚠️ Crucial Note: You have two different Google Projects configured:**

1. **Web Client ID (Auth)**: 
   - ID: `77457674566-el2ljsr4ol583ms6pp33o3apsohib8th.apps.googleusercontent.com`
   - Source: `.env` file
   - Usage: Used for expo-auth-session proxy authentication

2. **Android Client ID (Firebase)**:
   - ID: `903850631580-889buo98b75cknun3gn14ghsobe8s7ap`
   - Source: `google-services.json`
   - Usage: Used for native Android integration (intent filters)

### Step 2: Ensure Google Cloud Console Setup

For the **Web Client ID (77457674566...)**:
1. Go to Google Cloud Console > Credentials
2. Edit the **Web application** client
3. Ensure **Authorized redirect URIs** includes:
   `https://auth.expo.io/@elyscom/new-taskmanager`

For the **Android Client ID (903850631580...):**
1. This is configured via Firebase, ensure the SHA-1 fingerprint matches your EAS build keystore.

### Step 3: Rebuild Your App
The `app.json` has been updated with the correct owner (`elyscom`) and scheme.
Rebuild with:
```bash
eas build --platform android --profile development
```

### Step 4: Rebuild Your App
After updating the intent filter, rebuild with EAS:
```bash
eas build --platform android --profile development
```

Or for production:
```bash
eas build --platform android --profile production
```

## 🔍 How to Get SHA-1 Fingerprint

### For Development Build:
```bash
eas credentials
```
Then select your project and view Android credentials.

### For Local Debug Keystore:
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

## 📦 Dependencies Already Installed
- ✅ `expo-auth-session` (v7.0.10)
- ✅ `expo-crypto` (v15.0.8)
- ✅ `expo-file-system` (v19.0.21)
- ✅ `exceljs` (v4.4.0)
- ✅ `xlsx` (v0.18.5)

## 🎯 Implementation Ready
Once you complete the steps above, you'll be ready to implement:
- Google Drive OAuth authentication
- Task export to Excel (.xlsx)
- Upload to Google Drive

Refer to `task-export-firebase.md` for implementation code examples.
