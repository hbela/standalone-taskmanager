/**
 * Google Drive Service
 * Handles Google Drive authentication and file upload
 */

import { GoogleSignin } from '@react-native-google-signin/google-signin';

// 1. Configure Google Sign-In ONLY ONCE
// CRITICAL: Request the 'drive.file' scope to allow uploading files.
GoogleSignin.configure({
  webClientId: '13205155505-h8notg3rkd4bgr1151s4re3fn4s6u6f1.apps.googleusercontent.com', // From .env or app.json
  scopes: ['https://www.googleapis.com/auth/drive.file'], 
});

/**
 * Get a valid Google Access Token for Drive API
 * Handles silent sign-in or forces interactive sign-in if needed
 */
async function getAccessToken(): Promise<string> {
  // Try to get tokens silently first
  let tokens;
  try {
    // Check if we have a current user first to avoid unnecessary calls if clearly not logged in
    // But GoogleSignin state is separate from Firebase auth state in some flows.
    // The guide uses getTokens() directly.
    tokens = await GoogleSignin.getTokens();
  } catch (err) {
    // If silent fails, we might need to sign in explicitly
    // If user isn't signed in to Firebase, we should throw or prompt.
    // But here we focus on Google Sign In state.
    
    try {
       // If getTokens fails, try silent sign in just in case
       const userInfo = await GoogleSignin.signInSilently();
       tokens = await GoogleSignin.getTokens();
    } catch (silentError) {
       // Silent failed, force interactive sign in
       const userInfo = await GoogleSignin.signIn();
       tokens = await GoogleSignin.getTokens();
    }
  }

  const accessToken = tokens.accessToken;

  if (!accessToken) {
    throw new Error('Could not retrieve access token.');
  }
  
  return accessToken;
}

/**
 * Upload file to Google Drive
 * @param fileUri - Local file URI
 * @param fileName - Name for the file in Google Drive
 * @returns Object with file ID
 */
export async function uploadToGoogleDrive(
  fileUri: string,
  fileName: string
): Promise<{ id: string; webViewLink?: string }> {
  try {
    console.log('📤 Starting upload to Google Drive...');
    
    // 1. Get Access Token
    const accessToken = await getAccessToken();

    // 2. Prepare Metadata and File for Multipart Upload
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
    // We need to pass the file URI. Fetch usually handles 'uri' in FormData for React Native.
    formData.append('file', {
      uri: fileUri,
      name: fileName,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    } as any);

    // 3. Upload to Google Drive
    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink', {
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

    console.log('✅ File uploaded successfully to Google Drive');
    return result; 

  } catch (error) {
    console.error('❌ Upload to Google Drive Error:', error);
    throw error;
  }
}
