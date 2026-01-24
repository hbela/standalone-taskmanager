**To export tasks from your Expo app to Google Drive, configure Google Cloud for the Drive API and integrate via expo-auth-session for OAuth2 authentication.** This enables secure file uploads without full app auth, using service account or user consent flows. [docs.expo](https://docs.expo.dev/versions/latest/sdk/contacts/)

## Google Cloud Console Setup
1. Go to [console.cloud.google.com](https://console.cloud.google.com), create/select a project.
2. Enable "Google Drive API": APIs & Services > Library > search "Drive API" > Enable. [docs.expo](https://docs.expo.dev/versions/latest/)
3. Create OAuth2 credentials: APIs & Services > Credentials > + Create Credentials > OAuth client ID.
   - App type: Android (for native app).
   - Package name: From `android.package` in app.json (e.g., com.yourapp.taskmanager).
   - SHA-1: Run `eas credentials` or `keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android` for debug/production. [github](https://github.com/expo/expo/issues/39866)
4. Download `google-services.json`, place in project root (or use EAS secrets for builds). [github](https://github.com/expo/expo/issues/37527)
5. Add Drive API scope: `https://www.googleapis.com/auth/drive.file` (minimal for app-specific files). [reddit](https://www.reddit.com/r/expo/comments/1937a7p/error_cannot_find_native_module_mymodule/)

## Expo App Configuration
Add to `app.json` plugins:
```
"plugins": [
  ...,
  [
    "expo-auth-session",
    {
      "manifestAndroid": {
        "package": "com.yourapp.taskmanager",
        "googleServicesFile": "./google-services.json"
      }
    }
  ]
]
```
Set Android intent filters for OAuth redirect:
```
"android": {
  "intentFilters": [{
    "action": "VIEW",
    "data": [{
      "scheme": "com.googleusercontent.apps.YOUR_CLIENT_ID"
    }],
    "category": ["BROWSABLE", "DEFAULT"]
  }]
}
```
Rebuild with `eas build --platform android`. [npmjs](https://www.npmjs.com/package/expo-contacts?activeTab=dependents)

## Implementation Steps
Install `expo-auth-session expo-crypto expo-document-picker` (for CSV export).
```tsx
import * as Google from 'expo-auth-session/providers/google';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

// WebClientId from your OAuth credentials (Android/iOS specific)
Google.useAuthRequest({
  expoClientId: 'YOUR_WEB_CLIENT_ID.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

// After auth, upload CSV:
const uploadToDrive = async (accessToken, csvPath) => {
  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'text/csv',
    },
    body: await FileSystem.readAsStringAsync(csvPath),
  });
};
```
Generate CSV from tasks with `papaparse` or manual stringify, pick Drive folder via API. [reddit](https://www.reddit.com/r/expo/comments/1nff3bw/app_not_opening_after_upgrading_to_expo_sdk_54/)

## Permissions & Testing
Request `READ_EXTERNAL_STORAGE` if needed via config plugin. Test OAuth in dev client; production APK requires rebuild. Use `drive.file` scope to limit access to exported files only. [github](https://github.com/expo/expo/issues/28121)

To export your Expo app's Tasks table as an Excel spreadsheet (.xlsx) to Google Drive, use the `xlsx` library to generate the file locally, then upload via the Drive API with your existing OAuth setup. This keeps everything client-side without server needs. [youtube](https://www.youtube.com/watch?v=iH9cMDfysOw)

## Install Dependencies
```
npx expo install xlsx expo-file-system expo-sharing expo-crypto
```
`xlsx` works in Expo via JS, generating binary Excel files with sheets, styles, and formulas. [youtube](https://www.youtube.com/watch?v=iH9cMDfysOw)

## Generate Excel Code
Convert tasks to worksheet data, then write as base64:
```tsx
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import * as Sharing from 'expo-sharing';

const generateTasksExcel = async (tasks: any[]) => {
  const ws = XLSX.utils.json_to_sheet(tasks);  // Headers: id, title, completed, etc.
  
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
  
  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: 'xlsx'
  });
  
  const uri = `${FileSystem.documentDirectory}tasks.xlsx`;
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64
  });
  
  return uri;
};
```
Call: `const excelUri = await generateTasksExcel(tasksArray);` [stackoverflow](https://stackoverflow.com/questions/51309125/react-native-how-to-create-excel-file-from-code)

## Upload to Google Drive
Use your `accessToken` from expo-auth-session:
```tsx
const uploadExcelToDrive = async (accessToken: string, excelUri: string) => {
  const base64 = await FileSystem.readAsStringAsync(excelUri, {
    encoding: FileSystem.EncodingType.Base64
  });
  
  const metadata = {
    name: 'Tasks.xlsx',
    parents: ['FOLDER_ID']  // Optional Drive folder ID
  };
  
  const formData = new FormData();
  formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  formData.append('file', {
    uri: excelUri,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    name: 'Tasks.xlsx'
  } as any);
  
  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  });
  
  if (res.ok) {
    console.log('Uploaded to Drive:', await res.json());
  }
};
```
Scope `https://www.googleapis.com/auth/drive.file` suffices. [stackoverflow](https://stackoverflow.com/questions/76674900/uploading-file-to-specific-google-drive-folder-using-expo-app-auth)

## Full Flow Example
```
<Button title="Export Tasks to Drive" onPress={async () => {
  const excelUri = await generateTasksExcel(tasks);
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(excelUri);  // Optional local share first
  }
  await uploadExcelToDrive(discovery.accessToken, excelUri);
}} />
```
Rebuild APK after config changes. Test sharing to confirm Excel opens properly. [youtube](https://www.youtube.com/watch?v=iH9cMDfysOw)