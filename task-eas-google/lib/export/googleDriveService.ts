/**
 * Google Drive Service
 * Handles Google Drive authentication and file upload
 */

import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
const TOKEN_KEY = 'google_drive_token';

interface GoogleDriveToken {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
}

/**
 * Get OAuth configuration from environment
 */
function getOAuthConfig() {
  const clientId = Constants.expoConfig?.extra?.googleDriveClientId || 
                   process.env.EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID;
  
  if (!clientId) {
    throw new Error('Google Drive Client ID not configured. Please add EXPO_PUBLIC_GOOGLE_DRIVE_CLIENT_ID to .env');
  }
  
  return {
    clientId,
    // Hardcoded redirect URI to match the new owner 'elyscom'
    redirectUri: 'https://auth.expo.io/@elyscom/new-taskmanager',
  };
}

/**
 * Authenticate with Google Drive using OAuth 2.0
 */
export async function authenticateGoogleDrive(): Promise<GoogleDriveToken> {
  try {
    const { clientId, redirectUri } = getOAuthConfig();
    
    console.log('🔐 Starting Google Drive authentication...');
    console.log('📍 Client ID:', clientId);
    console.log('📍 Redirect URI:', redirectUri);
    console.log('📍 Expo Owner:', Constants.expoConfig?.owner);
    console.log('📍 Expo Slug:', Constants.expoConfig?.slug);
    
    const discovery = {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
    };
    
    // Create and execute auth request
    const authRequest = new AuthSession.AuthRequest({
      clientId,
      scopes: [GOOGLE_DRIVE_SCOPE],
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      usePKCE: true,
      extraParams: {
        access_type: 'offline', // Get refresh token
        prompt: 'consent', // Force consent screen to get refresh token
      }
    });
    
    // Log the redirect URI from multiple sources
    console.log('🔗 Redirect URI (from variable):', redirectUri);
    console.log('🔗 Redirect URI (from authRequest):', authRequest.redirectUri);
    console.log('🔗 Redirect URI length:', redirectUri.length);
    console.log('🔗 Redirect URI charCodes:', Array.from(redirectUri).map(c => c.charCodeAt(0)).join(','));
    
    const result = await authRequest.promptAsync(discovery);
    
    console.log('📋 Auth result type:', result.type);
    console.log('📋 Full auth result:', JSON.stringify(result, null, 2));
    
    if (result.type !== 'success') {
      console.error('❌ Authentication failed with type:', result.type);
      if (result.type === 'error') {
        console.error('Error details:', result.error);
        console.error('Error params:', result.params);
        console.error('Full error object:', JSON.stringify(result, null, 2));
      }
      throw new Error(`Authentication ${result.type}: ${result.type === 'error' ? result.error?.message || 'Unknown error' : 'User cancelled or dismissed'}`);
    }
    
    console.log('✅ Auth code received, exchanging for token...');
    
    // Exchange code for token
    const tokenResponse = await AuthSession.exchangeCodeAsync(
      {
        clientId,
        code: result.params.code,
        redirectUri,
        extraParams: {
          code_verifier: authRequest.codeVerifier || '',
        },
      },
      discovery
    );
    
    const token: GoogleDriveToken = {
      access_token: tokenResponse.accessToken,
      refresh_token: tokenResponse.refreshToken,
      expires_in: tokenResponse.expiresIn || 3600,
      expires_at: Date.now() + (tokenResponse.expiresIn || 3600) * 1000,
      token_type: tokenResponse.tokenType || 'Bearer',
    };
    
    // Store token securely
    await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(token));
    
    console.log('✅ Google Drive authentication successful');
    return token;
  } catch (error) {
    console.error('❌ Google Drive Authentication Error:', error);
    if (error instanceof Error) {
      throw error; // Re-throw with original message
    }
    throw new Error('Failed to authenticate with Google Drive');
  }
}

/**
 * Get stored token or authenticate if needed
 */
export async function getGoogleDriveToken(): Promise<GoogleDriveToken> {
  try {
    const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
    
    if (storedToken) {
      const token: GoogleDriveToken = JSON.parse(storedToken);
      
      // Check if token is expired
      if (token.expires_at && token.expires_at > Date.now()) {
        console.log('✅ Using stored Google Drive token');
        return token;
      }
      
      console.log('⚠️ Token expired, re-authenticating...');
    }
    
    // No token stored or expired, authenticate
    return await authenticateGoogleDrive();
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
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
