/**
 * Quick Test Script for Google Drive Authentication
 * 
 * Add this temporarily to your app to test the auth flow
 * You can add a button in your UI to call this function
 */

import { Alert } from 'react-native';
import {
    authenticateGoogleDrive,
    clearGoogleDriveToken,
    isGoogleDriveAuthenticated
} from '../lib/export/googleDriveService';

export async function testGoogleDriveAuth() {
  console.log('🧪 Starting Google Drive authentication test...');
  
  try {
    // Step 1: Check current auth status
    console.log('Step 1: Checking authentication status...');
    const isAuth = await isGoogleDriveAuthenticated();
    console.log('Currently authenticated:', isAuth);
    
    if (isAuth) {
      Alert.alert(
        'Already Authenticated',
        'You are already authenticated with Google Drive. Clear token and try again?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Clear & Re-auth',
            onPress: async () => {
              await clearGoogleDriveToken();
              console.log('✅ Token cleared');
              await testGoogleDriveAuth(); // Retry
            }
          }
        ]
      );
      return;
    }
    
    // Step 2: Authenticate
    console.log('Step 2: Starting authentication...');
    Alert.alert(
      'Google Drive Test',
      'This will open Google sign-in. Please complete the authentication flow.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Auth',
          onPress: async () => {
            try {
              const token = await authenticateGoogleDrive();
              console.log('✅ Authentication successful!');
              console.log('Token expires at:', new Date(token.expires_at || 0).toLocaleString());
              
              Alert.alert(
                'Success! ✅',
                `Authentication successful!\n\nToken type: ${token.token_type}\nExpires: ${new Date(token.expires_at || 0).toLocaleString()}`,
                [{ text: 'OK' }]
              );
            } catch (error) {
              console.error('❌ Authentication failed:', error);
              const errorMsg = error instanceof Error ? error.message : 'Unknown error';
              Alert.alert(
                'Authentication Failed ❌',
                `Error: ${errorMsg}\n\nCheck console logs for details.`,
                [{ text: 'OK' }]
              );
            }
          }
        }
      ]
    );
  } catch (error) {
    console.error('❌ Test error:', error);
    Alert.alert('Test Error', error instanceof Error ? error.message : 'Unknown error');
  }
}

/**
 * Test file upload (requires authentication first)
 */
export async function testGoogleDriveUpload() {
  console.log('🧪 Starting Google Drive upload test...');
  
  try {
    // Check if authenticated
    const isAuth = await isGoogleDriveAuthenticated();
    if (!isAuth) {
      Alert.alert(
        'Not Authenticated',
        'Please authenticate with Google Drive first.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Create a simple test file
    Alert.alert(
      'Upload Test',
      'This test requires an actual file. Please use the export feature from the tasks screen instead.',
      [{ text: 'OK' }]
    );
  } catch (error) {
    console.error('❌ Upload test error:', error);
    Alert.alert('Upload Test Error', error instanceof Error ? error.message : 'Unknown error');
  }
}

/**
 * Clear authentication
 */
export async function clearGoogleDriveAuth() {
  try {
    await clearGoogleDriveToken();
    console.log('✅ Google Drive token cleared');
    Alert.alert('Success', 'Google Drive authentication cleared.');
  } catch (error) {
    console.error('❌ Clear token error:', error);
    Alert.alert('Error', 'Failed to clear token');
  }
}
