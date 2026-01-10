# Google Sign-In Setup Guide

This guide will help you set up Google Sign-In for your Android app.

## Prerequisites

1. **Google Cloud Console Project**: You need a project set up in [Google Cloud Console](https://console.cloud.google.com/)
2. **Android Package Name**: `com.taskmanager.app` (already configured in `app.json`)

## Step-by-Step Setup

### 1. Get Your Web Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Find your **Web Client ID** (it should look like: `123456789-abc123.apps.googleusercontent.com`)
5. Copy this Web Client ID

### 2. Configure Your Android OAuth Client

1. In Google Cloud Console → **Credentials**, create or verify your **Android OAuth 2.0 Client ID**
2. Set the **Package name** to: `com.taskmanager.app`
3. Get your **SHA-1 certificate fingerprint**:

   **For Development (Debug):**
   ```bash
   # On Windows
   keytool -list -v -keystore %USERPROFILE%\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android
   
   # On macOS/Linux
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```

   **For EAS Build:**
   ```bash
   eas credentials
   ```
   Select your project, then Android, then view your keystore details.

4. Add the SHA-1 fingerprint to your Android OAuth client in Google Cloud Console

### 3. Update Your .env File

1. Open the `.env` file in the root of your project
2. Replace `YOUR_WEB_CLIENT_ID_HERE` with your actual Web Client ID:
   ```
   EXPO_PUBLIC_WEB_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
   ```

### 4. Build Your Development App

Now you're ready to build your app with EAS:

```bash
# Build for Android
eas build --profile development --platform android
```

This will create a development build that you can install on your Android device.

### 5. Install and Test

1. Once the build completes, download the APK to your Android device
2. Install the app
3. Open the app and tap the "Sign in with Google" button
4. Select your Google account
5. You should see a success message with your account details!

## Troubleshooting

### "Sign-In Error: Developer Error"
- **Cause**: The SHA-1 fingerprint doesn't match or the package name is incorrect
- **Solution**: Double-check your SHA-1 fingerprint and package name in Google Cloud Console

### "Play Services Not Available"
- **Cause**: Google Play Services is not installed or outdated on the device
- **Solution**: Update Google Play Services on your Android device

### "Sign-In Cancelled"
- **Cause**: User cancelled the sign-in flow
- **Solution**: This is normal user behavior, no action needed

### Environment Variable Not Loading
- **Cause**: The `.env` file might not be properly loaded
- **Solution**: 
  1. Make sure the `.env` file is in the root directory
  2. Restart your development server
  3. For production builds, use EAS Secrets instead:
     ```bash
     eas secret:create --name EXPO_PUBLIC_WEB_CLIENT_ID --value your-client-id
     ```

## File Structure

```
task-eas-google/
├── .env                          # Your credentials (DO NOT COMMIT)
├── .env.example                  # Template for other developers
├── app/
│   ├── _layout.tsx              # Google Sign-In configuration
│   └── (tabs)/
│       └── index.tsx            # Home screen with sign-in button
├── components/
│   └── google-sign-in-button.tsx # Reusable sign-in component
└── app.json                     # App configuration with plugin
```

## Next Steps

- Implement backend authentication using the ID token
- Add user profile management
- Store user session securely
- Add sign-out functionality (already included in the component)

## Resources

- [Google Sign-In Documentation](https://github.com/react-native-google-signin/google-signin)
- [Google Cloud Console](https://console.cloud.google.com/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
