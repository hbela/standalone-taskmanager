/**
 * Debug utility for Google Drive authentication
 * Use this in your app to clear tokens and test authentication
 */

import { clearGoogleDriveToken, isGoogleDriveAuthenticated } from '../lib/export/googleDriveService';

export async function debugGoogleDriveAuth() {
  console.log('🔍 Checking Google Drive authentication status...');
  
  const isAuthenticated = await isGoogleDriveAuthenticated();
  console.log('Is authenticated:', isAuthenticated);
  
  if (isAuthenticated) {
    console.log('🗑️ Clearing stored token...');
    await clearGoogleDriveToken();
    console.log('✅ Token cleared. Try authentication again.');
  } else {
    console.log('ℹ️ No valid token found. Ready for fresh authentication.');
  }
}

// You can call this from your app to reset authentication:
// import { debugGoogleDriveAuth } from './utils/debugGoogleDrive';
// await debugGoogleDriveAuth();
