/**
 * Google Drive Service
 * Handles Google Drive authentication and file upload
 */

import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

const GOOGLE_DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
const TOKEN_KEY = 'google_drive_token';

// Configure Google Sign-In
GoogleSignin.configure({
  scopes: [GOOGLE_DRIVE_SCOPE],
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  offlineAccess: true, // Needed to get access_token and refresh_token
  forceCodeForRefreshToken: true,
});

interface GoogleDriveToken {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  expires_at?: number; // timestamp
}

/**
 * Authenticate with Google Drive using Native Google Sign-In
 */
export async function authenticateGoogleDrive(): Promise<GoogleDriveToken> {
  try {
    console.log('🔐 Starting Google Drive authentication via Native Module...');
    
    // Check for Play Services
    await GoogleSignin.hasPlayServices();
    
    // Sign In
    const response = await GoogleSignin.signIn();
    // Check if response has data (v13+)
    if (response.type === 'success' && response.data) {
      console.log('✅ User Info obtained:', response.data.user.email);
    } else {
       // If cancelled or no data, it might be an issue, but usually we throw on cancel.
       // Continue to get Tokens if we think we are signed in, or maybe response IS the user object in some versions?
       // Let's assume v13 structure where response.data holds the info.
    }
    
    // Get Tokens
    const tokens = await GoogleSignin.getTokens();
    console.log('✅ Tokens obtained');

    // Sign in to Firebase (optional, but requested)
    if (tokens.idToken) {
      try {
        console.log('🔥 Signing in to Firebase...');
        const googleCredential = auth.GoogleAuthProvider.credential(tokens.idToken);
        await auth().signInWithCredential(googleCredential);
        console.log('✅ Firebase Signed In');
      } catch (firebaseError) {
        console.warn('⚠️ Firebase Sign-In failed (continuing with Drive token):', firebaseError);
      }
    }

    const tokenData: GoogleDriveToken = {
      access_token: tokens.accessToken,
      // GoogleSignin might not return refresh token on subsequent logins unless forceCodeForRefreshToken is used or cache cleared
      // But for Drive API calls we mainly need accessToken.
      // We can also retrieve idToken if we wanted to auth with Firebase: tokens.idToken
      refresh_token: undefined, // Native SDK handles refresh mostly internally? No, we get a new access token by calling getTokens() or signInSilently()
      expires_in: 3600, // Default assumption, or we might not get this explicitly
      expires_at: Date.now() + 3600 * 1000, 
    };

    // Store token securely
    await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokenData));
    
    return tokenData;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled the login flow');
      throw new Error('User cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Operation (e.g. sign in) is in progress already');
      throw new Error('Sign in in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play services not available or outdated');
      throw new Error('Play services not available');
    } else {
      console.error('❌ Native Google Sign-In Error:', error);
      throw error;
    }
  }
}

/**
 * Get stored token or authenticate if needed/silent sign in
 */
export async function getGoogleDriveToken(): Promise<GoogleDriveToken> {
  try {
    // try silent sign in to get fresh tokens
    const hasPreviousSignIn = await GoogleSignin.hasPreviousSignIn();
    if (hasPreviousSignIn) {
      try {
        await GoogleSignin.signInSilently(); // Ensure we have a valid session
        const tokens = await GoogleSignin.getTokens();
        return {
           access_token: tokens.accessToken,
           expires_in: 3600,
           expires_at: Date.now() + 3600 * 1000
        };
      } catch (e) {
        console.log('Silent sign-in failed, falling back to interactive', e);
      }
    }

    // Not signed in, force full auth
    return await authenticateGoogleDrive();
  } catch (error) {
    console.error('Error getting token:', error);
    // Fallback to manual auth if silent fails
    return await authenticateGoogleDrive();
  }
}

/**
 * Upload file to Google Drive
 * @param fileUri - Local file URI
 * @param fileName - Name for the file in Google Drive
 * @returns Object with file ID and web view link
 */
export async function uploadToGoogleDrive(
  fileUri: string,
  fileName: string
): Promise<{ id: string; webViewLink: string }> {
  try {
    console.log('📤 Starting upload to Google Drive...');
    console.log('File:', fileName);
    
    const token = await getGoogleDriveToken();
    
    // Read file as base64 using new API
    const file = new FileSystem.File(fileUri);
    const base64Content = await file.base64();
    
    // Create multipart request body
    const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;
    
    const metadata = {
      name: fileName,
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };
    
    const multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\r\n' +
      'Content-Transfer-Encoding: base64\r\n\r\n' +
      base64Content +
      closeDelimiter;
    
    // Upload to Google Drive
    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.access_token}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body: multipartRequestBody,
      }
    );
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Drive upload error:', error);
      
      // If token expired, clear it and throw error
      if (response.status === 401) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        throw new Error('Authentication expired. Please try again.');
      }
      
      throw new Error(`Failed to upload file to Google Drive: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('✅ File uploaded successfully to Google Drive');
    console.log('File ID:', result.id);
    
    return result;
  } catch (error) {
    console.error('❌ Upload to Google Drive Error:', error);
    throw error;
  }
}

/**
 * Clear stored token (for logout or re-authentication)
 */
export async function clearGoogleDriveToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  console.log('🗑️ Google Drive token cleared');
}

/**
 * Check if user is authenticated with Google Drive
 */
export async function isGoogleDriveAuthenticated(): Promise<boolean> {
  try {
    const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
    if (!storedToken) return false;
    
    const token: GoogleDriveToken = JSON.parse(storedToken);
    return token.expires_at ? token.expires_at > Date.now() : false;
  } catch {
    return false;
  }
}
