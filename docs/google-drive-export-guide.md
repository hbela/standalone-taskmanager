# Implement Google Drive Export with Google Sign-In

This guide explains how to implement the "Export to Google Drive" feature using Firebase Authentication and the Google Sign-In library. This technique involves authenticating with Google, retrieving an OAuth access token, generating an Excel file, and uploading it directly to the Google Drive API.

## 1. Prerequisites & Dependencies

First, install the required packages in your other app.

```bash
# Core Expo & React Native Firebase dependencies
npx expo install expo-dev-client expo-file-system expo-sharing
npx expo install @react-native-firebase/app @react-native-firebase/auth
npx expo install @react-native-google-signin/google-signin

# Excel generation library
npm install xlsx
```

## 2. Configuration (`app.json`)

You must configure the native plugins in your `app.json` to handle the Google Sign-In flow and Firebase initialization.

Add the following to your `plugins` section:

```json
"plugins": [
  "expo-dev-client",
  "expo-file-system",
  "@react-native-firebase/app",
  "@react-native-firebase/auth",
  [
    "@react-native-google-signin/google-signin",
    {
      "webClientId": "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
      "iosUrlScheme": "com.googleusercontent.apps.YOUR_IOS_CLIENT_ID"
    }
  ],
  // ... other plugins
],
"android": {
  "package": "com.yourname.yourapp",
  "googleServicesFile": "./google-services.json"
}
```

> **Important**: You must generate a `google-services.json` file from the Firebase Console for your specific package name and place it in your project root.

## 3. Google Cloud Console Setup

1.  **SHA-1 Fingerprint**: Get your development keystore SHA-1 fingerprint:
    ```bash
    cd android && ./gradlew signingReport
    ```
    Add this fingerprint to your **Firebase Console > Project Settings > Your App**.
2.  **Enable Google Sign-In**: In Firebase Console > Authentication > Sign-in method, enable **Google**.
3.  **Scopes**: For Google Drive access, we will request specific scopes programmatically (seen in the code below), but ensure your OAuth consent screen in Google Cloud Console includes the `.../auth/drive.file` scope if you are verifying your app (for dev/personal use, just requesting it in code is enough).

## 4. Implementation Details

The core logic requires two standard steps and one "trick":
1.  **Google Sign-In**: Standard flow to get an ID token for Firebase.
2.  **Firebase Auth**: Sign in to Firebase with that credential.
3.  **The "Technic" (Drive Upload)**: We use `GoogleSignin.getTokens()` to retrieve a **Google Access Token** (not the Firebase token) to call the Google Drive API directly.

### A. The Export Function logic

Here is the complete logic you can drop into your screen or a service file.

```typescript
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';

// 1. Configure Google Sign-In ONLY ONCE (e.g., in a useEffect or generic initialization file)
// CRITICAL: Request the 'drive.file' scope to allow uploading files.
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/drive.file'], 
});

// The main export function
export async function exportDataToDrive(data: any[], fileName: string = 'export.xlsx') {
  try {
    // ---------------------------------------------------------
    // STEP 1: Ensure User is Authenticated & Get Access Token
    // ---------------------------------------------------------
    // Try to get tokens silently first
    let tokens;
    try {
      tokens = await GoogleSignin.getTokens();
    } catch (err) {
      // If silent fails, we might need to sign in explicitly
      // Note: In a real app, you probably want to trigger the UI Sign-In flow here
      // if the user isn't dirty.
      if (!auth().currentUser) {
         throw new Error("User not signed in");
      }
      // If user IS signed in to Firebase but we can't get tokens, 
      // it usually means we need to re-authorize or sign in again to GoogleSignin.
      const userInfo = await GoogleSignin.signIn();
      tokens = await GoogleSignin.getTokens();
    }

    const accessToken = tokens.accessToken;

    if (!accessToken) {
      throw new Error('Could not retrieve access token.');
    }

    // ---------------------------------------------------------
    // STEP 2: Generate the Excel File
    // ---------------------------------------------------------
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Export");

    // Write to a binary string/array compatible format
    const wbBase64 = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    
    // Save to local cache directory first
    const fileUri = FileSystem.cacheDirectory + fileName;
    await FileSystem.writeAsStringAsync(fileUri, wbBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // ---------------------------------------------------------
    // STEP 3: Upload to Google Drive (Multipart Request)
    // ---------------------------------------------------------
    const metadata = {
      name: fileName,
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };

    const formData = new FormData();
    
    // Part 1: Metadata
    formData.append('metadata', {
      string: JSON.stringify(metadata),
      type: 'application/json',
      name: 'metadata.json'
    } as any);

    // Part 2: The File
    formData.append('file', {
      uri: fileUri,
      name: fileName,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    } as any);

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Content-Type is inferred by FormData as multipart/form-data; boundary=...
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || 'Drive upload failed');
    }

    return result.id; // Returns the Drive File ID

  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}
```

### B. The Sign-In & Sign-Out (UI Logic)

You'll need UI buttons to handle the initial sign-in if the user hasn't authenticated yet.

```typescript
// Sign In Function
const handleGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    // Prompt the modal
    const { data } = await GoogleSignin.signIn();
    const idToken = data?.idToken;
    
    if (idToken) {
      // Create Firebase credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign in to Firebase
      await auth().signInWithCredential(googleCredential);
    }
  } catch (error) {
    console.error(error);
  }
};

// Sign Out Function
const handleSignOut = async () => {
  try {
    // Verify services
    await GoogleSignin.signOut(); // Sign out from Google Layer
    await auth().signOut();       // Sign out from Firebase Layer
  } catch (error) {
    console.error(error);
  }
};
```

## 5. Build & Test

Since this uses native code (`@react-native-firebase` and `google-signin`), you **cannot** run this in Expo Go. You must rebuild your development client:

```bash
eas build --profile development --platform android
# or
npx expo run:android
```

Then install the new build on your device/emulator.

## Summary Checklist

- [ ] Installed packages (`firebase`, `google-signin`, `xlsx`).
- [ ] Added plugins to `app.json`.
- [ ] Placed `google-services.json` in root.
- [ ] Configured `GoogleSignin.configure({ scopes: ['.../auth/drive.file'] })`.
- [ ] Implemented the `multipart` fetch logic using the Access Token from `GoogleSignin.getTokens()`.
