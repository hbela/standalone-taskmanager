# Native Module Installation - expo-crypto

## ⚠️ Important: Rebuild Required

Since `expo-crypto` is a **native module**, you need to rebuild your development build to include it.

## Option 1: Quick Fix - Use Expo Go (Development Only)

If you just want to test quickly:

```bash
npm start
```

Then scan the QR code with **Expo Go** app. This will work for development testing.

**Note:** Expo Go has limitations and may not include all features.

## Option 2: Rebuild Development Build (Recommended)

Since you're using EAS development builds, you need to rebuild:

### For Android:

```bash
eas build --profile development --platform android
```

Then install the new APK on your device.

### For iOS (if applicable):

```bash
eas build --profile development --platform ios
```

## Option 3: Local Development Build

If you have Android Studio set up:

```bash
npx expo run:android
```

This will build and install the app locally with the new native module.

## Why This Happened

- `expo-auth-session` requires `expo-crypto` for secure OAuth operations
- `expo-crypto` is a native module (not pure JavaScript)
- Native modules require rebuilding the app binary

## What's Installed

✅ `expo-crypto` - Provides cryptographic functions for OAuth PKCE flow

## After Rebuilding

The Google Drive export feature will work perfectly:
1. Excel file generation ✅ (works without rebuild)
2. Google OAuth authentication ✅ (needs rebuild for expo-crypto)
3. File upload to Drive ✅ (works after OAuth)

## Alternative: Skip OAuth for Now

If you want to test Excel generation without rebuilding, you can temporarily comment out the Google Drive upload and just test the Excel file generation locally.

Would you like me to create a temporary version that saves the Excel file locally for testing?
