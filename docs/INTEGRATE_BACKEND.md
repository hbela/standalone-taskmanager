# 🔗 Integrating Backend with Mobile App

This guide shows how to connect your mobile app to the Fastify API server for backend authentication.

## 📋 Overview

After Google Sign-In, you'll:
1. Send the Google ID token to your server
2. Receive a session token from the server
3. Store the session token securely
4. Use the session token for authenticated API calls

## 🛠️ Implementation Steps

### Step 1: Add Server URL to Environment

Add to your main `.env` file:
```env
EXPO_PUBLIC_API_URL=http://192.168.1.1:3001
```

Replace `192.168.1.1` with your computer's local IP address.

### Step 2: Create API Utility

Create `utils/api.ts`:

```typescript
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Make authenticated API request
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // Get session token from secure storage
    const sessionToken = await SecureStore.getItemAsync('sessionToken');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add authorization header if token exists
    if (sessionToken) {
      headers['Authorization'] = `Bearer ${sessionToken}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Request failed',
        message: data.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.error('API Error:', error);
    return {
      success: false,
      error: 'Network error',
      message: error.message,
    };
  }
}

/**
 * Authenticate with Google ID token
 */
export async function authenticateWithGoogle(idToken: string) {
  const response = await apiFetch('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  });

  if (response.success && response.data?.sessionToken) {
    // Store session token securely
    await SecureStore.setItemAsync('sessionToken', response.data.sessionToken);
  }

  return response;
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  return apiFetch('/auth/me');
}

/**
 * Logout
 */
export async function logout() {
  await apiFetch('/auth/logout', { method: 'POST' });
  await SecureStore.deleteItemAsync('sessionToken');
}
```

### Step 3: Install expo-secure-store

```bash
npx expo install expo-secure-store
```

### Step 4: Update Google Sign-In Component

Update `components/google-sign-in-button.tsx`:

```typescript
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { authenticateWithGoogle, logout as apiLogout } from '@/utils/api';

export function GoogleSignInButton() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const signIn = async () => {
    try {
      setIsSigningIn(true);
      
      // 1. Sign in with Google
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      
      // 2. Get ID token
      const idToken = user.data?.idToken;
      
      if (!idToken) {
        throw new Error('No ID token received');
      }

      console.log('Google Sign-In successful, authenticating with backend...');
      
      // 3. Authenticate with backend
      const authResponse = await authenticateWithGoogle(idToken);
      
      if (!authResponse.success) {
        throw new Error(authResponse.error || 'Backend authentication failed');
      }

      console.log('Backend authentication successful!');
      console.log('User:', authResponse.data?.user);
      console.log('Session token stored securely');
      
      setUserInfo(user.data);
      
      Alert.alert(
        'Sign-In Successful!',
        `Welcome ${user.data?.user.name || 'User'}!\n\nSession token has been stored securely.`,
        [{ text: 'OK' }]
      );
    } catch (error: any) {
      console.error('Sign-In Error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign-In Cancelled', 'You cancelled the sign-in process.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign-In In Progress', 'Sign-in is already in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          'Play Services Not Available',
          'Google Play Services is not available or outdated on this device.'
        );
      } else {
        Alert.alert('Sign-In Error', error.message || 'An unknown error occurred.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    try {
      // Sign out from Google
      await GoogleSignin.signOut();
      
      // Logout from backend (clears session token)
      await apiLogout();
      
      setUserInfo(null);
      Alert.alert('Signed Out', 'You have been signed out successfully.');
    } catch (error: any) {
      console.error('Sign-Out Error:', error);
      Alert.alert('Sign-Out Error', error.message || 'Failed to sign out.');
    }
  };

  if (userInfo) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.userInfoContainer}>
          <ThemedText type="subtitle">Signed in as:</ThemedText>
          <ThemedText type="defaultSemiBold">{userInfo.user.name}</ThemedText>
          <ThemedText>{userInfo.user.email}</ThemedText>
          <ThemedText style={styles.successText}>✅ Backend authenticated</ThemedText>
        </ThemedView>
        
        <TouchableOpacity
          style={[styles.button, styles.signOutButton]}
          onPress={signOut}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.buttonText}>Sign Out</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.signInButton]}
        onPress={signIn}
        disabled={isSigningIn}
        activeOpacity={0.8}
      >
        {isSigningIn ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.buttonText}>🔐 Sign in with Google</ThemedText>
        )}
      </TouchableOpacity>
      
      <ThemedText style={styles.helpText}>
        Sign in to access your personalized experience
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginVertical: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  signInButton: {
    backgroundColor: '#4285F4',
  },
  signOutButton: {
    backgroundColor: '#EA4335',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  helpText: {
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 14,
  },
  userInfoContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(66, 133, 244, 0.1)',
    gap: 4,
  },
  successText: {
    color: '#34A853',
    fontSize: 12,
    marginTop: 4,
  },
});
```

### Step 5: Update .env File

Add the API URL to your main `.env`:
```env
EXPO_PUBLIC_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
EXPO_PUBLIC_API_URL=http://192.168.1.1:3001
```

## 🧪 Testing the Integration

### 1. Start the Server
```bash
cd server
npm run dev
```

### 2. Start the Mobile App
```bash
npx expo start --dev-client
```

### 3. Test the Flow
1. Open the app on your phone
2. Tap "Sign in with Google"
3. Select your Google account
4. Check the console logs:
   - "Google Sign-In successful, authenticating with backend..."
   - "Backend authentication successful!"
   - "Session token stored securely"

### 4. Verify in Server Logs
You should see in the server console:
```
POST /auth/google 200
```

## 🔍 Troubleshooting

### "Network error" or "Failed to fetch"
- **Check**: Is the server running? (`npm run dev` in server folder)
- **Check**: Is the API_URL correct in your .env?
- **Check**: Are your phone and computer on the same network?
- **Fix**: Update `EXPO_PUBLIC_API_URL` with your computer's IP

### "Invalid Google token"
- **Check**: Is `GOOGLE_CLIENT_ID` in server/.env the same as `EXPO_PUBLIC_WEB_CLIENT_ID`?
- **Fix**: Copy the Web Client ID to both .env files

### Session token not persisting
- **Check**: Did you install `expo-secure-store`?
- **Fix**: Run `npx expo install expo-secure-store` and rebuild

## 🎯 Next Steps

Now that backend integration is complete, you can:

1. **Add Protected Routes**: Create screens that require authentication
2. **Persist Sessions**: Check for session token on app launch
3. **Add More Endpoints**: Create user-specific API endpoints
4. **Error Handling**: Implement token refresh logic
5. **Production**: Deploy your server and update API_URL

## 📚 Example: Making Authenticated Requests

```typescript
import { apiFetch } from '@/utils/api';

// Get current user
const response = await apiFetch('/auth/me');
if (response.success) {
  console.log('User:', response.data.user);
}

// Make any authenticated request
const data = await apiFetch('/api/some-endpoint', {
  method: 'POST',
  body: JSON.stringify({ foo: 'bar' }),
});
```

---

**Integration complete!** Your mobile app now authenticates with your backend! 🎉
